import ExpoModulesCore
import PDFKit
import CommonCrypto

// This view will be used as a native component. Make sure to inherit from `ExpoView`
// to apply the proper styling (e.g. border radius and shadows).
class CoolPdfView: ExpoView {
  let pdfView = PDFView()
  let onLoadComplete = EventDispatcher()
  let onPageChanged = EventDispatcher()
  let onError = EventDispatcher()
  let onPageSingleTap = EventDispatcher()

  private var currentPage: Int = 0
  private var gestureRecognizer: UITapGestureRecognizer?

  required init(appContext: AppContext? = nil) {
    super.init(appContext: appContext)
    clipsToBounds = true

    // Configure PDF view
    pdfView.autoScales = true
    pdfView.displayMode = .singlePageContinuous
    pdfView.displayDirection = .vertical

    addSubview(pdfView)

    // Setup tap gesture
    gestureRecognizer = UITapGestureRecognizer(target: self, action: #selector(handleSingleTap(_:)))
    gestureRecognizer?.numberOfTapsRequired = 1
    if let recognizer = gestureRecognizer {
      pdfView.addGestureRecognizer(recognizer)
    }

    // Listen for page change notifications
    NotificationCenter.default.addObserver(
      self,
      selector: #selector(handlePageChanged(_:)),
      name: .PDFViewPageChanged,
      object: pdfView
    )
  }

  deinit {
    NotificationCenter.default.removeObserver(self)
  }

  override func layoutSubviews() {
    super.layoutSubviews()
    pdfView.frame = bounds
  }

  @objc private func handlePageChanged(_ notification: Notification) {
    guard let currentPDFPage = pdfView.currentPage,
          let document = pdfView.document else {
      return
    }

    let pageIndex = document.index(for: currentPDFPage)
    let newPage = pageIndex + 1
    if newPage != currentPage {
      currentPage = newPage
      onPageChanged([
        "page": newPage,
        "numberOfPages": document.pageCount
      ])
    }
  }

  @objc private func handleSingleTap(_ recognizer: UITapGestureRecognizer) {
    onPageSingleTap([
      "page": currentPage
    ])
  }

  func loadPdf(from source: [String: Any]) {
    var document: PDFDocument?

    if let uri = source["uri"] as? String {
      if let url = URL(string: uri) {
        // Handle remote URL
        if uri.hasPrefix("http://") || uri.hasPrefix("https://") {
          let cache = source["cache"] as? Bool ?? false
          let cacheFileName = source["cacheFileName"] as? String
          loadRemotePdf(from: url, headers: source["headers"] as? [String: String], cache: cache, cacheFileName: cacheFileName)
          return
        } else {
          // Handle file URL
          document = PDFDocument(url: url)
        }
      }
    } else if let path = source["path"] as? String {
      let url = URL(fileURLWithPath: path)
      document = PDFDocument(url: url)
    } else if let base64 = source["base64"] as? String,
              let data = Data(base64Encoded: base64) {
      document = PDFDocument(data: data)
    }

    if let document = document {
      pdfView.document = document
      currentPage = 1

      // Get dimensions from first page
      let dimensions: [String: Any]
      if let firstPage = document.page(at: 0) {
        let bounds = firstPage.bounds(for: .mediaBox)
        dimensions = [
          "width": Int(bounds.width),
          "height": Int(bounds.height)
        ]
      } else {
        dimensions = ["width": 0, "height": 0]
      }

      // Get table of contents
      let tableContents = extractTableOfContents(from: document)

      onLoadComplete([
        "numberOfPages": document.pageCount,
        "path": source["uri"] as? String ?? source["path"] as? String ?? "",
        "dimensions": dimensions,
        "tableContents": tableContents
      ])
      // Fire onPageChanged for initial page
      onPageChanged([
        "page": 1,
        "numberOfPages": document.pageCount
      ])
    } else {
      onError([
        "error": "Failed to load PDF document"
      ])
    }
  }

  private func loadRemotePdf(from url: URL, headers: [String: String]?, cache: Bool, cacheFileName: String?) {
    // Determine cache file name
    let fileName: String
    if let customFileName = cacheFileName {
      fileName = customFileName
    } else {
      // Generate SHA-1 hash of URL for cache filename (like react-native-pdf does)
      let urlString = url.absoluteString
      let data = urlString.data(using: .utf8)!
      var digest = [UInt8](repeating: 0, count: Int(CC_SHA1_DIGEST_LENGTH))
      data.withUnsafeBytes {
        _ = CC_SHA1($0.baseAddress, CC_LONG(data.count), &digest)
      }
      fileName = digest.map { String(format: "%02x", $0) }.joined()
    }

    let cacheURL = FileManager.default.urls(for: .cachesDirectory, in: .userDomainMask)[0]
      .appendingPathComponent("\(fileName).pdf")

    // If caching is enabled and file exists, use it
    if cache && FileManager.default.fileExists(atPath: cacheURL.path) {
      if let document = PDFDocument(url: cacheURL) {
        self.pdfView.document = document
        self.currentPage = 1

        // Get dimensions from first page
        let dimensions: [String: Any]
        if let firstPage = document.page(at: 0) {
          let bounds = firstPage.bounds(for: .mediaBox)
          dimensions = [
            "width": Int(bounds.width),
            "height": Int(bounds.height)
          ]
        } else {
          dimensions = ["width": 0, "height": 0]
        }

        // Get table of contents
        let tableContents = self.extractTableOfContents(from: document)

        self.onLoadComplete([
          "numberOfPages": document.pageCount,
          "path": cacheURL.path,
          "dimensions": dimensions,
          "tableContents": tableContents
        ])
        self.onPageChanged([
          "page": 1,
          "numberOfPages": document.pageCount
        ])
        return
      }
    }

    var request = URLRequest(url: url)
    headers?.forEach { key, value in
      request.setValue(value, forHTTPHeaderField: key)
    }

    URLSession.shared.dataTask(with: request) { [weak self] data, response, error in
      DispatchQueue.main.async {
        guard let self = self else { return }

        if let error = error {
          self.onError([
            "error": error.localizedDescription
          ])
          return
        }

        guard let data = data, let document = PDFDocument(data: data) else {
          self.onError([
            "error": "Failed to load PDF from URL"
          ])
          return
        }

        // Save to cache if caching is enabled
        if cache {
          try? data.write(to: cacheURL)
        }

        self.pdfView.document = document
        self.currentPage = 1

        // Get dimensions from first page
        let dimensions: [String: Any]
        if let firstPage = document.page(at: 0) {
          let bounds = firstPage.bounds(for: .mediaBox)
          dimensions = [
            "width": Int(bounds.width),
            "height": Int(bounds.height)
          ]
        } else {
          dimensions = ["width": 0, "height": 0]
        }

        // Get table of contents
        let tableContents = self.extractTableOfContents(from: document)

        self.onLoadComplete([
          "numberOfPages": document.pageCount,
          "path": cache ? cacheURL.path : url.absoluteString,
          "dimensions": dimensions,
          "tableContents": tableContents
        ])
        // Fire onPageChanged for initial page
        self.onPageChanged([
          "page": 1,
          "numberOfPages": document.pageCount
        ])
      }
    }.resume()
  }

  func setPage(_ pageNumber: Int) {
    guard let document = pdfView.document,
          pageNumber > 0,
          pageNumber <= document.pageCount,
          let page = document.page(at: pageNumber - 1) else {
      return
    }
    pdfView.go(to: page)
  }

  func setScale(_ scale: Double) {
    pdfView.scaleFactor = CGFloat(scale)
  }

  func setMinScale(_ minScale: Double) {
    pdfView.minScaleFactor = CGFloat(minScale)
  }

  func setMaxScale(_ maxScale: Double) {
    pdfView.maxScaleFactor = CGFloat(maxScale)
  }

  func setHorizontal(_ horizontal: Bool) {
    pdfView.displayDirection = horizontal ? .horizontal : .vertical
  }

  func setEnablePaging(_ enablePaging: Bool) {
    pdfView.displayMode = enablePaging ? .singlePage : .singlePageContinuous
  }

  func setSpacing(_ spacing: Double) {
    pdfView.pageBreakMargins = UIEdgeInsets(
      top: CGFloat(spacing),
      left: CGFloat(spacing),
      bottom: CGFloat(spacing),
      right: CGFloat(spacing)
    )
  }

  private func extractTableOfContents(from document: PDFDocument) -> [[String: Any]] {
    guard let outline = document.outlineRoot else {
      return []
    }
    return extractOutlineItems(outline)
  }

  private func extractOutlineItems(_ outline: PDFOutline) -> [[String: Any]] {
    var items: [[String: Any]] = []

    for i in 0..<outline.numberOfChildren {
      guard let child = outline.child(at: i) else { continue }

      var item: [String: Any] = [
        "title": child.label ?? "",
        "pageIdx": 0,
        "children": extractOutlineItems(child)
      ]

      // Get page index for this outline item
      if let destination = child.destination,
         let page = destination.page,
         let document = pdfView.document {
        item["pageIdx"] = document.index(for: page)
      }

      items.append(item)
    }

    return items
  }
}
