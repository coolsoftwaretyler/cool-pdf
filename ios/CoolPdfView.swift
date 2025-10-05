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
  private var pendingPage: Int = 1
  private var gestureRecognizer: UITapGestureRecognizer?
  private var isInitialLoad: Bool = false
  private var needsPageNavigation: Bool = false
  private var pendingScale: Double = 1.0
  private var pendingMinScale: Double = 1.0
  private var pendingMaxScale: Double = 3.0

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

    // Perform pending page navigation after layout (like react-native-pdf does in reactSetFrame)
    if needsPageNavigation {
      needsPageNavigation = false
      performPageNavigation()
    }
  }

  private func applyScaleSettings() {
    guard let document = pdfView.document, let firstPage = document.page(at: 0) else {
      print("🔵 CoolPDF applyScaleSettings: no document or first page")
      return
    }

    print("🔵 CoolPDF applying scale settings:")
    print("🔵   pendingMinScale: \(pendingMinScale)")
    print("🔵   pendingMaxScale: \(pendingMaxScale)")
    print("🔵   pendingScale: \(pendingScale)")
    print("🔵   view frame size: \(self.frame.size)")

    var pdfPageRect = firstPage.bounds(for: .cropBox)

    // Adjust for rotation like react-native-pdf does (lines 416-418)
    if firstPage.rotation == 90 || firstPage.rotation == 270 {
      pdfPageRect = CGRect(x: 0, y: 0, width: pdfPageRect.height, height: pdfPageRect.width)
    }

    print("🔵   PDF page rect (adjusted): \(pdfPageRect)")
    print("🔵   PDF page rotation: \(firstPage.rotation)")

    // React-native-pdf calculates a fixScaleFactor based on fit policy
    // Default fitPolicy is 2 (BOTH) - see line 261 in RNPDFPdfView.mm
    // Lines 431-443 show the calculation for fitPolicy = 2 (BOTH)
    let pageAspect = pdfPageRect.width / pdfPageRect.height
    let viewAspect = self.frame.width / self.frame.height

    let fixScaleFactor: CGFloat
    if viewAspect > pageAspect {
      // Height is the limiting factor
      fixScaleFactor = self.frame.height / pdfPageRect.height
    } else {
      // Width is the limiting factor
      fixScaleFactor = self.frame.width / pdfPageRect.width
    }

    print("🔵   pageAspect: \(pageAspect), viewAspect: \(viewAspect)")
    print("🔵   fixScaleFactor: \(fixScaleFactor)")

    // Set min/max scale factors multiplied by fixScaleFactor (lines 436, 437, 441, 442)
    pdfView.minScaleFactor = fixScaleFactor * CGFloat(pendingMinScale)
    pdfView.maxScaleFactor = fixScaleFactor * CGFloat(pendingMaxScale)

    // Apply scale with bounds checking (like react-native-pdf lines 448-451)
    var finalScale = CGFloat(pendingScale) * fixScaleFactor
    if finalScale > pdfView.maxScaleFactor {
      finalScale = pdfView.maxScaleFactor
    }
    if finalScale < pdfView.minScaleFactor {
      finalScale = pdfView.minScaleFactor
    }

    print("🔵   finalScale before applying: \(finalScale)")

    let wasAutoScaling = pdfView.autoScales
    pdfView.autoScales = false
    pdfView.scaleFactor = finalScale
    pdfView.autoScales = wasAutoScaling

    print("🔵 CoolPDF after applying scale:")
    print("🔵   scaleFactor: \(pdfView.scaleFactor)")
    print("🔵   minScaleFactor: \(pdfView.minScaleFactor)")
    print("🔵   maxScaleFactor: \(pdfView.maxScaleFactor)")
    print("🔵   autoScales: \(pdfView.autoScales)")
  }

  private func performPageNavigation() {
    guard let document = pdfView.document else { return }

    // Navigate to the pending page (matching react-native-pdf logic)
    if let page = document.page(at: pendingPage - 1), pendingPage >= 1 && pendingPage <= document.pageCount {
      if pendingPage == 1 {
        // Special case for page 1 - use goToRect with max Y to align to top
        DispatchQueue.main.async {
          self.pdfView.go(to: CGRect(x: 0, y: CGFloat(Int.max), width: 1, height: 1), on: page)
        }
      } else {
        // For other pages, use goToDestination
        let pdfPageRect = page.bounds(for: .cropBox)

        // Handle page rotation
        var adjustedRect = pdfPageRect
        if page.rotation == 90 || page.rotation == 270 {
          adjustedRect = CGRect(x: 0, y: 0, width: pdfPageRect.size.height, height: pdfPageRect.size.width)
        }

        let pointLeftTop = CGPoint(x: 0, y: adjustedRect.size.height)
        let pdfDest = PDFDestination(page: page, at: pointLeftTop)
        pdfView.go(to: pdfDest)
      }
      currentPage = pendingPage

      // Layout the document view after navigation
      pdfView.layoutDocumentView()
    }
  }

  @objc private func handlePageChanged(_ notification: Notification) {
    // Suppress automatic page change notifications during initial load
    // We'll fire it manually after onLoadComplete
    if isInitialLoad {
      return
    }

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
      // Handle bundle-assets:// URIs
      if uri.hasPrefix("bundle-assets://") {
        if let bundleURL = resolveAssetPath(uri) {
          document = PDFDocument(url: bundleURL)
        } else {
          onError([
            "error": "Asset not found in bundle: \(uri)"
          ])
          return
        }
      }
      // Handle remote URLs
      else if uri.hasPrefix("http://") || uri.hasPrefix("https://") {
        if let url = URL(string: uri) {
          let cache = source["cache"] as? Bool ?? false
          let cacheFileName = source["cacheFileName"] as? String
          let expiration = source["expiration"] as? Int
          let method = source["method"] as? String ?? "GET"
          loadRemotePdf(from: url, headers: source["headers"] as? [String: String], method: method, cache: cache, cacheFileName: cacheFileName, expiration: expiration)
          return
        }
      }
      // Handle other file URLs
      else if let url = URL(string: uri) {
        document = PDFDocument(url: url)
      }
    } else if let path = source["path"] as? String {
      let url = URL(fileURLWithPath: path)
      document = PDFDocument(url: url)
    } else if let base64 = source["base64"] as? String,
              let data = Data(base64Encoded: base64) {
      document = PDFDocument(data: data)
    }

    if let document = document {
      // Suppress automatic pageChanged notification during initial load
      isInitialLoad = true
      pdfView.document = document

      // Mark that we need to navigate to the page after layout
      needsPageNavigation = true
      currentPage = (pendingPage >= 1 && pendingPage <= document.pageCount) ? pendingPage : 1

      // Get dimensions using rowSize (like react-native-pdf does)
      // This returns the display size with layout transformations applied
      let dimensions: [String: Any]
      if let firstPage = document.page(at: 0) {
        let pageSize = pdfView.rowSize(for: firstPage)
        dimensions = [
          "width": pageSize.width,
          "height": pageSize.height
        ]
      } else {
        dimensions = ["width": 0, "height": 0]
      }

      // Apply scale settings after document loads (like react-native-pdf does)
      applyScaleSettings()

      // Get table of contents
      let tableContents = extractTableOfContents(from: document)

      onLoadComplete([
        "numberOfPages": document.pageCount,
        "path": source["uri"] as? String ?? source["path"] as? String ?? "",
        "dimensions": dimensions,
        "tableContents": tableContents
      ])

      // Fire onPageChanged for initial page (after loadComplete)
      onPageChanged([
        "page": currentPage,
        "numberOfPages": document.pageCount
      ])

      // Re-enable automatic page change notifications
      isInitialLoad = false
    } else {
      onError([
        "error": "Failed to load PDF document"
      ])
    }
  }

  private func loadRemotePdf(from url: URL, headers: [String: String]?, method: String, cache: Bool, cacheFileName: String?, expiration: Int?) {
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

    // If caching is enabled and file exists, check expiration
    if cache && FileManager.default.fileExists(atPath: cacheURL.path) {
      var shouldUseCache = true

      // Check expiration if set
      if let expiration = expiration, expiration > 0 {
        do {
          let attributes = try FileManager.default.attributesOfItem(atPath: cacheURL.path)
          if let modificationDate = attributes[.modificationDate] as? Date {
            let expirationTime = modificationDate.addingTimeInterval(TimeInterval(expiration))
            let currentTime = Date()
            if currentTime > expirationTime {
              // Cache has expired
              shouldUseCache = false
            }
          }
        } catch {
          // If we can't get attributes, treat as expired
          shouldUseCache = false
        }
      }

      if shouldUseCache, let document = PDFDocument(url: cacheURL) {
        // Suppress automatic pageChanged notification during initial load
        self.isInitialLoad = true
        self.pdfView.document = document

        // Mark that we need to navigate to the page after layout
        self.needsPageNavigation = true
        self.currentPage = (self.pendingPage >= 1 && self.pendingPage <= document.pageCount) ? self.pendingPage : 1

        // Apply scale settings after document loads (like react-native-pdf does)
        self.applyScaleSettings()

        // Get dimensions using rowSize (like react-native-pdf does)
        let dimensions: [String: Any]
        if let firstPage = document.page(at: 0) {
          let pageSize = self.pdfView.rowSize(for: firstPage)
          dimensions = [
            "width": pageSize.width,
            "height": pageSize.height
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

        // Fire onPageChanged for initial page (after loadComplete)
        self.onPageChanged([
          "page": self.currentPage,
          "numberOfPages": document.pageCount
        ])

        // Re-enable automatic page change notifications
        self.isInitialLoad = false
        return
      }
    }

    var request = URLRequest(url: url)
    request.httpMethod = method
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

        // Suppress automatic pageChanged notification during initial load
        self.isInitialLoad = true
        self.pdfView.document = document

        // Mark that we need to navigate to the page after layout
        self.needsPageNavigation = true
        self.currentPage = (self.pendingPage >= 1 && self.pendingPage <= document.pageCount) ? self.pendingPage : 1

        // Apply scale settings after document loads (like react-native-pdf does)
        self.applyScaleSettings()

        // Get dimensions using rowSize (like react-native-pdf does)
        let dimensions: [String: Any]
        if let firstPage = document.page(at: 0) {
          let pageSize = self.pdfView.rowSize(for: firstPage)
          dimensions = [
            "width": pageSize.width,
            "height": pageSize.height
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

        // Fire onPageChanged for initial page (after loadComplete)
        self.onPageChanged([
          "page": self.currentPage,
          "numberOfPages": document.pageCount
        ])

        // Re-enable automatic page change notifications
        self.isInitialLoad = false
      }
    }.resume()
  }

  func setPage(_ pageNumber: Int) {
    // Store the pending page for when the PDF loads
    pendingPage = pageNumber

    // If document is already loaded, navigate immediately
    guard let document = pdfView.document,
          pageNumber > 0,
          pageNumber <= document.pageCount,
          let page = document.page(at: pageNumber - 1) else {
      return
    }
    pdfView.go(to: page)
    currentPage = pageNumber
  }

  func setScale(_ scale: Double) {
    print("🔵 CoolPDF setScale called with: \(scale)")
    pendingScale = scale
    // Will be applied after document loads
  }

  func setMinScale(_ minScale: Double) {
    print("🔵 CoolPDF setMinScale called with: \(minScale)")
    pendingMinScale = minScale
    // Will be applied after document loads
  }

  func setMaxScale(_ maxScale: Double) {
    print("🔵 CoolPDF setMaxScale called with: \(maxScale)")
    pendingMaxScale = maxScale
    // Will be applied after document loads
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

  func setShowsVerticalScrollIndicator(_ shows: Bool) {
    // Recursively find and update all UIScrollView subviews
    setScrollIndicators(pdfView, vertical: shows)
  }

  private func setScrollIndicators(_ view: UIView, vertical: Bool) {
    // If this view is a scroll view, update its indicator
    if let scrollView = view as? UIScrollView {
      scrollView.showsVerticalScrollIndicator = vertical
    }

    // Recursively check all subviews
    for subview in view.subviews {
      setScrollIndicators(subview, vertical: vertical)
    }
  }

  func setScrollEnabled(_ enabled: Bool) {
    // Find and update all UIScrollView subviews (matching react-native-pdf)
    for subview in pdfView.subviews {
      if let scrollView = subview as? UIScrollView {
        scrollView.isScrollEnabled = enabled
      }
    }
  }

  private func resolveAssetPath(_ uri: String) -> URL? {
    // Strip bundle-assets:// prefix
    let assetPath = uri.replacingOccurrences(of: "bundle-assets://", with: "")

    // Split into filename and extension
    let pathURL = URL(fileURLWithPath: assetPath)
    let fileName = pathURL.deletingPathExtension().lastPathComponent
    let fileExtension = pathURL.pathExtension

    // Use Bundle.main to locate the resource
    return Bundle.main.url(forResource: fileName, withExtension: fileExtension)
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
