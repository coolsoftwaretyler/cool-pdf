package expo.modules.coolpdf

import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition
import expo.modules.kotlin.types.Either

class CoolPdfModule : Module() {
  // Each module class must implement the definition function. The definition consists of components
  // that describes the module's functionality and behavior.
  // See https://docs.expo.dev/modules/module-api for more details about available components.
  override fun definition() = ModuleDefinition {
    // Sets the name of the module that JavaScript code will use to refer to the module. Takes a string as an argument.
    // Can be inferred from module's class name, but it's recommended to set it explicitly for clarity.
    // The module will be accessible from `requireNativeModule('CoolPdf')` in JavaScript.
    Name("CoolPdf")

    // Defines constant property on the module.
    Constant("PI") {
      Math.PI
    }

    // Defines event names that the module can send to JavaScript.
    Events("onChange")

    // Defines a JavaScript synchronous function that runs the native code on the JavaScript thread.
    Function("hello") {
      "Hello world! 👋"
    }

    // Defines a JavaScript function that always returns a Promise and whose native code
    // is by default dispatched on the different thread than the JavaScript runtime runs on.
    AsyncFunction("setValueAsync") { value: String ->
      // Send an event to JavaScript.
      sendEvent("onChange", mapOf(
        "value" to value
      ))
    }

    // Enables the module to be used as a native view. Definition components that are accepted as part of
    // the view definition: Prop, Events.
    View(CoolPdfView::class) {
      // Defines a setter for the `source` prop - can be a string URL or an object with uri/path/base64
      Prop("source") { view: CoolPdfView, source: Any ->
        val sourceMap = when (source) {
          is String -> mapOf("uri" to source)
          is Map<*, *> -> source as Map<String, Any?>
          else -> mapOf<String, Any?>()
        }
        view.loadPdf(sourceMap)
      }

      Prop("page") { view: CoolPdfView, page: Int ->
        view.setPage(page)
      }

      Prop("scale") { view: CoolPdfView, scale: Float ->
        view.setScale(scale)
      }

      Prop("minScale") { view: CoolPdfView, minScale: Float ->
        view.setMinScale(minScale)
      }

      Prop("maxScale") { view: CoolPdfView, maxScale: Float ->
        view.setMaxScale(maxScale)
      }

      Prop("horizontal") { view: CoolPdfView, horizontal: Boolean ->
        view.setHorizontal(horizontal)
      }

      Prop("enablePaging") { view: CoolPdfView, enablePaging: Boolean ->
        view.setEnablePaging(enablePaging)
      }

      Prop("spacing") { view: CoolPdfView, spacing: Int ->
        view.setSpacing(spacing)
      }

      Prop("password") { view: CoolPdfView, password: String? ->
        view.setPassword(password)
      }

      Prop("fitPolicy") { view: CoolPdfView, fitPolicy: Int ->
        view.setFitPolicy(fitPolicy)
      }

      Prop("singlePage") { view: CoolPdfView, singlePage: Boolean ->
        view.setSinglePage(singlePage)
      }

      Prop("enableDoubleTapZoom") { view: CoolPdfView, enableDoubleTapZoom: Boolean ->
        view.setEnableDoubleTapZoom(enableDoubleTapZoom)
      }

      // Defines events that the view can send to JavaScript.
      Events("onLoadComplete", "onLoadProgress", "onPageChanged", "onError", "onPageSingleTap")
    }
  }
}
