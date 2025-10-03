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
import android.util.Log

class CoolPdfView(context: Context, appContext: AppContext) : ExpoView(context, appContext) {
  private val onLoadComplete by EventDispatcher()
  private val onPageChanged by EventDispatcher()
  private val onError by EventDispatcher()
  private val onPageSingleTap by EventDispatcher()

  private var pdfRenderer: PdfRenderer? = null
  private var currentPage: Int = 0
  private var parcelFileDescriptor: ParcelFileDescriptor? = null
  private val scope = CoroutineScope(Dispatchers.Main + SupervisorJob())

  companion object {
    private const val TAG = "CoolPdfView"
  }

  private val scrollView = ScrollView(context).apply {
    layoutParams = LayoutParams(LayoutParams.MATCH_PARENT, LayoutParams.MATCH_PARENT)
  }

  private val contentLayout = LinearLayout(context).apply {
    layoutParams = LinearLayout.LayoutParams(
      LinearLayout.LayoutParams.MATCH_PARENT,
      LinearLayout.LayoutParams.WRAP_CONTENT
    )
    orientation = LinearLayout.VERTICAL
  }

  private var enablePaging: Boolean = false
  private var horizontal: Boolean = false
  private var pageSpacing: Int = 10

  init {
    scrollView.addView(contentLayout)
    addView(scrollView)
  }

  override fun onLayout(changed: Boolean, left: Int, top: Int, right: Int, bottom: Int) {
    super.onLayout(changed, left, top, right, bottom)
    Log.d(TAG, "onLayout: changed=$changed, bounds=($left,$top,$right,$bottom), size=${right-left}x${bottom-top}")
    Log.d(TAG, "scrollView size: ${scrollView.width}x${scrollView.height}, visibility: ${scrollView.visibility}")
    Log.d(TAG, "contentLayout size: ${contentLayout.width}x${contentLayout.height}, childCount: ${contentLayout.childCount}")
  }

  fun loadPdf(source: Map<String, Any?>) {
    Log.d(TAG, "loadPdf called with source: $source")
    scope.launch(Dispatchers.IO) {
      try {
        val file = when {
          source.containsKey("uri") -> {
            val uri = source["uri"] as? String ?: run {
              Log.e(TAG, "URI is null or not a string")
              withContext(Dispatchers.Main) {
                onError(mapOf("error" to "URI is null or not a string"))
              }
              return@launch
            }
            Log.d(TAG, "Loading PDF from URI: $uri")
            if (uri.startsWith("http://") || uri.startsWith("https://")) {
              Log.d(TAG, "Downloading PDF from URL: $uri")
              downloadPdf(uri, source["headers"] as? Map<String, String>)
            } else {
              Log.d(TAG, "Loading PDF from local file: $uri")
              File(uri)
            }
          }
          source.containsKey("path") -> {
            val path = source["path"] as String
            Log.d(TAG, "Loading PDF from path: $path")
            File(path)
          }
          source.containsKey("base64") -> {
            val base64 = source["base64"] as? String ?: run {
              Log.e(TAG, "Base64 is null or not a string")
              withContext(Dispatchers.Main) {
                onError(mapOf("error" to "Base64 is null or not a string"))
              }
              return@launch
            }
            Log.d(TAG, "Loading PDF from base64 (length: ${base64.length})")
            val bytes = Base64.decode(base64, Base64.DEFAULT)
            val tempFile = File.createTempFile("pdf", ".pdf", context.cacheDir)
            FileOutputStream(tempFile).use { it.write(bytes) }
            tempFile
          }
          else -> {
            Log.e(TAG, "Invalid source - no uri, path, or base64 found")
            withContext(Dispatchers.Main) {
              onError(mapOf("error" to "Invalid source"))
            }
            return@launch
          }
        }

        if (file == null) {
          Log.e(TAG, "File is null after processing source")
          withContext(Dispatchers.Main) {
            onError(mapOf("error" to "Failed to get PDF file"))
          }
          return@launch
        }

        if (!file.exists()) {
          Log.e(TAG, "PDF file does not exist: ${file.absolutePath}")
          withContext(Dispatchers.Main) {
            onError(mapOf("error" to "PDF file not found: ${file.absolutePath}"))
          }
          return@launch
        }

        Log.d(TAG, "PDF file exists, size: ${file.length()} bytes")
        renderPdf(file)
      } catch (e: Exception) {
        Log.e(TAG, "Error loading PDF", e)
        withContext(Dispatchers.Main) {
          onError(mapOf("error" to "${e.javaClass.simpleName}: ${e.message ?: "Unknown error"}"))
        }
      }
    }
  }

  private suspend fun downloadPdf(urlString: String, headers: Map<String, String>?): File? = withContext(Dispatchers.IO) {
    try {
      Log.d(TAG, "Starting download from: $urlString")
      val url = URL(urlString)
      val connection = url.openConnection()
      headers?.forEach { (key, value) ->
        connection.setRequestProperty(key, value)
      }

      val tempFile = File.createTempFile("pdf", ".pdf", context.cacheDir)
      Log.d(TAG, "Downloading to temp file: ${tempFile.absolutePath}")

      var totalBytes = 0L
      connection.getInputStream().use { input ->
        FileOutputStream(tempFile).use { output ->
          val buffer = ByteArray(8192)
          var bytesRead: Int
          while (input.read(buffer).also { bytesRead = it } != -1) {
            output.write(buffer, 0, bytesRead)
            totalBytes += bytesRead
          }
        }
      }

      Log.d(TAG, "Download complete: $totalBytes bytes written")
      tempFile
    } catch (e: Exception) {
      Log.e(TAG, "Error downloading PDF", e)
      withContext(Dispatchers.Main) {
        onError(mapOf("error" to "Download failed: ${e.message}"))
      }
      null
    }
  }

  private suspend fun renderPdf(file: File) = withContext(Dispatchers.Main) {
    try {
      Log.d(TAG, "renderPdf called for: ${file.absolutePath}")
      closePdf()

      Log.d(TAG, "Opening ParcelFileDescriptor")
      parcelFileDescriptor = ParcelFileDescriptor.open(file, ParcelFileDescriptor.MODE_READ_ONLY)

      Log.d(TAG, "Creating PdfRenderer")
      pdfRenderer = PdfRenderer(parcelFileDescriptor!!)

      val pageCount = pdfRenderer?.pageCount ?: 0
      Log.d(TAG, "PDF has $pageCount pages")

      onLoadComplete(mapOf(
        "numberOfPages" to pageCount,
        "path" to file.absolutePath
      ))

      Log.d(TAG, "Starting to render pages")
      renderPages()
      Log.d(TAG, "Finished rendering all pages")
    } catch (e: Exception) {
      Log.e(TAG, "Error rendering PDF", e)
      onError(mapOf("error" to "Failed to render PDF: ${e.javaClass.simpleName}: ${e.message}"))
    }
  }

  private fun renderPages() {
    contentLayout.removeAllViews()

    val renderer = pdfRenderer ?: run {
      Log.e(TAG, "pdfRenderer is null in renderPages")
      return
    }
    val pageCount = renderer.pageCount
    Log.d(TAG, "Rendering $pageCount pages")

    for (i in 0 until pageCount) {
      Log.d(TAG, "Rendering page ${i + 1}/$pageCount")
      val page = renderer.openPage(i)

      // Create bitmap with appropriate size
      val width = page.width * 2
      val height = page.height * 2
      Log.d(TAG, "Page ${i + 1} dimensions: ${page.width}x${page.height}, bitmap: ${width}x${height}")

      val bitmap = Bitmap.createBitmap(
        width,
        height,
        Bitmap.Config.ARGB_8888
      )

      page.render(bitmap, null, null, PdfRenderer.Page.RENDER_MODE_FOR_DISPLAY)
      page.close()

      // Calculate the height needed to maintain aspect ratio within the view width
      val viewWidth = this.width
      val aspectRatio = height.toFloat() / width.toFloat()
      val calculatedHeight = (viewWidth * aspectRatio).toInt()

      Log.d(TAG, "ImageView will be sized: width=MATCH_PARENT($viewWidth), height=$calculatedHeight")

      val imageView = ImageView(context).apply {
        setImageBitmap(bitmap)
        layoutParams = LinearLayout.LayoutParams(
          LinearLayout.LayoutParams.MATCH_PARENT,
          calculatedHeight
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

      Log.d(TAG, "ImageView created with bitmap size: ${bitmap.width}x${bitmap.height}")

      contentLayout.addView(imageView)
    }

    // Force measure and layout to ensure views are displayed
    val widthSpec = View.MeasureSpec.makeMeasureSpec(scrollView.width, View.MeasureSpec.EXACTLY)
    val heightSpec = View.MeasureSpec.makeMeasureSpec(0, View.MeasureSpec.UNSPECIFIED)
    contentLayout.measure(widthSpec, heightSpec)
    contentLayout.layout(0, 0, contentLayout.measuredWidth, contentLayout.measuredHeight)

    scrollView.requestLayout()
    invalidate()
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
