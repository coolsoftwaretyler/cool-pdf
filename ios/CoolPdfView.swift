import ExpoModulesCore
import PDFKit

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
          let document = pdfView.document,
          let pageIndex = document.index(for: currentPDFPage) else {
      return
    }

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
          loadRemotePdf(from: url, headers: source["headers"] as? [String: String])
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
      onLoadComplete([
        "numberOfPages": document.pageCount,
        "path": source["uri"] as? String ?? source["path"] as? String ?? ""
      ])
    } else {
      onError([
        "error": "Failed to load PDF document"
      ])
    }
  }

  private func loadRemotePdf(from url: URL, headers: [String: String]?) {
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

        self.pdfView.document = document
        self.currentPage = 1
        self.onLoadComplete([
          "numberOfPages": document.pageCount,
          "path": url.absoluteString
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
}
