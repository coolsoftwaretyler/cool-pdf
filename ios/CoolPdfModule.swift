import ExpoModulesCore

public class CoolPdfModule: Module {
  // Each module class must implement the definition function. The definition consists of components
  // that describes the module's functionality and behavior.
  // See https://docs.expo.dev/modules/module-api for more details about available components.
  public func definition() -> ModuleDefinition {
    // Sets the name of the module that JavaScript code will use to refer to the module. Takes a string as an argument.
    // Can be inferred from module's class name, but it's recommended to set it explicitly for clarity.
    // The module will be accessible from `requireNativeModule('CoolPdf')` in JavaScript.
    Name("CoolPdf")

    // Defines constant property on the module.
    Constant("PI") {
      Double.pi
    }

    // Defines event names that the module can send to JavaScript.
    Events("onChange")

    // Defines a JavaScript synchronous function that runs the native code on the JavaScript thread.
    Function("hello") {
      return "Hello world! 👋"
    }

    // Defines a JavaScript function that always returns a Promise and whose native code
    // is by default dispatched on the different thread than the JavaScript runtime runs on.
    AsyncFunction("setValueAsync") { (value: String) in
      // Send an event to JavaScript.
      self.sendEvent("onChange", [
        "value": value
      ])
    }

    // Enables the module to be used as a native view. Definition components that are accepted as part of the
    // view definition: Prop, Events.
    View(CoolPdfView.self) {
      // Defines a setter for the `source` prop - can be a string URL or an object with uri/path/base64
      Prop("source") { (view: CoolPdfView, source: Either<String, [String: Any]>) in
        if let urlString: String = source.get() {
          view.loadPdf(from: ["uri": urlString])
        } else if let sourceDict: [String: Any] = source.get() {
          view.loadPdf(from: sourceDict)
        }
      }

      Prop("page") { (view: CoolPdfView, page: Int) in
        view.setPage(page)
      }

      Prop("scale") { (view: CoolPdfView, scale: Double) in
        view.setScale(scale)
      }

      Prop("minScale") { (view: CoolPdfView, minScale: Double) in
        view.setMinScale(minScale)
      }

      Prop("maxScale") { (view: CoolPdfView, maxScale: Double) in
        view.setMaxScale(maxScale)
      }

      Prop("horizontal") { (view: CoolPdfView, horizontal: Bool) in
        view.setHorizontal(horizontal)
      }

      Prop("enablePaging") { (view: CoolPdfView, enablePaging: Bool) in
        view.setEnablePaging(enablePaging)
      }

      Prop("spacing") { (view: CoolPdfView, spacing: Double) in
        view.setSpacing(spacing)
      }

      Prop("password") { (view: CoolPdfView, password: String?) in
        view.setPassword(password)
      }

      Prop("fitPolicy") { (view: CoolPdfView, fitPolicy: Int) in
        view.setFitPolicy(fitPolicy)
      }

      Prop("singlePage") { (view: CoolPdfView, singlePage: Bool) in
        view.setSinglePage(singlePage)
      }

      Prop("showsVerticalScrollIndicator") { (view: CoolPdfView, showsVerticalScrollIndicator: Bool) in
        view.setShowsVerticalScrollIndicator(showsVerticalScrollIndicator)
      }

      Prop("scrollEnabled") { (view: CoolPdfView, scrollEnabled: Bool) in
        view.setScrollEnabled(scrollEnabled)
      }

      Prop("enableDoubleTapZoom") { (view: CoolPdfView, enableDoubleTapZoom: Bool) in
        view.setEnableDoubleTapZoom(enableDoubleTapZoom)
      }

      Events("onLoadComplete", "onLoadProgress", "onPageChanged", "onScaleChanged", "onError", "onPageSingleTap")
    }
  }
}
