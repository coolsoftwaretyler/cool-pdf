package expo.modules.coolpdf

import android.content.Context
import android.graphics.Bitmap
import android.graphics.pdf.PdfRenderer
import android.os.ParcelFileDescriptor
import android.view.GestureDetector
import android.view.MotionEvent
import android.view.View
import android.widget.ImageView
import android.widget.ScrollView
import android.widget.LinearLayout
import expo.modules.kotlin.AppContext
import expo.modules.kotlin.viewevent.EventDispatcher
import expo.modules.kotlin.views.ExpoView
import kotlinx.coroutines.*
import java.io.File
import java.io.FileOutputStream
import java.net.URL
import android.util.Base64

class CoolPdfView(context: Context, appContext: AppContext) : ExpoView(context, appContext) {
  private val onLoadComplete by EventDispatcher()
  private val onPageChanged by EventDispatcher()
  private val onError by EventDispatcher()
  private val onPageSingleTap by EventDispatcher()

  private var pdfRenderer: PdfRenderer? = null
  private var currentPage: Int = 0
  private var parcelFileDescriptor: ParcelFileDescriptor? = null
  private val scope = CoroutineScope(Dispatchers.Main + SupervisorJob())

  private val scrollView = ScrollView(context).apply {
    layoutParams = LayoutParams(LayoutParams.MATCH_PARENT, LayoutParams.MATCH_PARENT)
  }

  private val contentLayout = LinearLayout(context).apply {
    layoutParams = LayoutParams(LayoutParams.MATCH_PARENT, LayoutParams.WRAP_CONTENT)
    orientation = LinearLayout.VERTICAL
  }

  private var enablePaging: Boolean = false
  private var horizontal: Boolean = false
  private var pageSpacing: Int = 10

  init {
    scrollView.addView(contentLayout)
    addView(scrollView)
  }

  fun loadPdf(source: Map<String, Any?>) {
    scope.launch {
      try {
        val file = when {
          source.containsKey("uri") -> {
            val uri = source["uri"] as? String ?: return@launch
            if (uri.startsWith("http://") || uri.startsWith("https://")) {
              downloadPdf(uri, source["headers"] as? Map<String, String>)
            } else {
              File(uri)
            }
          }
          source.containsKey("path") -> {
            File(source["path"] as String)
          }
          source.containsKey("base64") -> {
            val base64 = source["base64"] as? String ?: return@launch
            val bytes = Base64.decode(base64, Base64.DEFAULT)
            val tempFile = File.createTempFile("pdf", ".pdf", context.cacheDir)
            FileOutputStream(tempFile).use { it.write(bytes) }
            tempFile
          }
          else -> {
            onError(mapOf("error" to "Invalid source"))
            return@launch
          }
        }

        if (file == null || !file.exists()) {
          onError(mapOf("error" to "PDF file not found"))
          return@launch
        }

        renderPdf(file)
      } catch (e: Exception) {
        onError(mapOf("error" to (e.message ?: "Unknown error")))
      }
    }
  }

  private suspend fun downloadPdf(urlString: String, headers: Map<String, String>?): File? = withContext(Dispatchers.IO) {
    try {
      val url = URL(urlString)
      val connection = url.openConnection()
      headers?.forEach { (key, value) ->
        connection.setRequestProperty(key, value)
      }

      val tempFile = File.createTempFile("pdf", ".pdf", context.cacheDir)
      connection.getInputStream().use { input ->
        FileOutputStream(tempFile).use { output ->
          input.copyTo(output)
        }
      }
      tempFile
    } catch (e: Exception) {
      null
    }
  }

  private suspend fun renderPdf(file: File) = withContext(Dispatchers.Main) {
    try {
      closePdf()

      parcelFileDescriptor = ParcelFileDescriptor.open(file, ParcelFileDescriptor.MODE_READ_ONLY)
      pdfRenderer = PdfRenderer(parcelFileDescriptor!!)

      val pageCount = pdfRenderer?.pageCount ?: 0

      onLoadComplete(mapOf(
        "numberOfPages" to pageCount,
        "path" to file.absolutePath
      ))

      renderPages()
    } catch (e: Exception) {
      onError(mapOf("error" to "Failed to render PDF: ${e.message}"))
    }
  }

  private fun renderPages() {
    contentLayout.removeAllViews()

    val renderer = pdfRenderer ?: return
    val pageCount = renderer.pageCount

    for (i in 0 until pageCount) {
      val page = renderer.openPage(i)

      // Create bitmap with appropriate size
      val bitmap = Bitmap.createBitmap(
        page.width * 2,
        page.height * 2,
        Bitmap.Config.ARGB_8888
      )

      page.render(bitmap, null, null, PdfRenderer.Page.RENDER_MODE_FOR_DISPLAY)
      page.close()

      val imageView = ImageView(context).apply {
        setImageBitmap(bitmap)
        layoutParams = LinearLayout.LayoutParams(
          LinearLayout.LayoutParams.MATCH_PARENT,
          LinearLayout.LayoutParams.WRAP_CONTENT
        ).apply {
          setMargins(0, pageSpacing, 0, pageSpacing)
        }
        scaleType = ImageView.ScaleType.FIT_CENTER

        // Add tap gesture
        val gestureDetector = GestureDetector(context, object : GestureDetector.SimpleOnGestureListener() {
          override fun onSingleTapConfirmed(e: MotionEvent): Boolean {
            onPageSingleTap(mapOf("page" to (i + 1)))
            return true
          }
        })

        setOnTouchListener { _, event ->
          gestureDetector.onTouchEvent(event)
          true
        }
      }

      contentLayout.addView(imageView)
    }
  }

  fun setPage(pageNumber: Int) {
    val renderer = pdfRenderer ?: return
    if (pageNumber < 1 || pageNumber > renderer.pageCount) return

    currentPage = pageNumber

    // Scroll to the page
    val pageIndex = pageNumber - 1
    scrollView.post {
      val child = contentLayout.getChildAt(pageIndex)
      if (child != null) {
        scrollView.smoothScrollTo(0, child.top)
        onPageChanged(mapOf(
          "page" to pageNumber,
          "numberOfPages" to renderer.pageCount
        ))
      }
    }
  }

  fun setScale(scale: Float) {
    contentLayout.scaleX = scale
    contentLayout.scaleY = scale
  }

  fun setHorizontal(isHorizontal: Boolean) {
    horizontal = isHorizontal
    contentLayout.orientation = if (isHorizontal) LinearLayout.HORIZONTAL else LinearLayout.VERTICAL
  }

  fun setEnablePaging(enabled: Boolean) {
    enablePaging = enabled
    // Note: Full paging support would require a ViewPager or similar
  }

  fun setSpacing(spacing: Int) {
    pageSpacing = spacing
    // Rerender pages with new spacing if PDF is loaded
    if (pdfRenderer != null) {
      renderPages()
    }
  }

  private fun closePdf() {
    pdfRenderer?.close()
    pdfRenderer = null
    parcelFileDescriptor?.close()
    parcelFileDescriptor = null
  }

  override fun onDetachedFromWindow() {
    super.onDetachedFromWindow()
    closePdf()
    scope.cancel()
  }
}
