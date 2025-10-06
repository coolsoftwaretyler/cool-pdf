package expo.modules.coolpdf

import android.content.Context
import android.util.Base64
import android.util.Log
import com.github.barteksc.pdfviewer.PDFView
import com.github.barteksc.pdfviewer.listener.OnErrorListener
import com.github.barteksc.pdfviewer.listener.OnLoadCompleteListener
import com.github.barteksc.pdfviewer.listener.OnPageChangeListener
import com.github.barteksc.pdfviewer.listener.OnTapListener
import com.github.barteksc.pdfviewer.scroll.DefaultScrollHandle
import expo.modules.kotlin.AppContext
import expo.modules.kotlin.viewevent.EventDispatcher
import expo.modules.kotlin.views.ExpoView
import kotlinx.coroutines.*
import java.io.File
import java.io.FileOutputStream
import java.net.HttpURLConnection
import java.net.URL

class CoolPdfView(context: Context, appContext: AppContext) : ExpoView(context, appContext) {
  private val onLoadComplete by EventDispatcher()
  private val onLoadProgress by EventDispatcher()
  private val onPageChanged by EventDispatcher()
  private val onError by EventDispatcher()
  private val onPageSingleTap by EventDispatcher()

  private val scope = CoroutineScope(Dispatchers.Main + SupervisorJob())
  private var currentPage: Int = 0
  private var totalPages: Int = 0
  private var pendingPage: Int = 1

  companion object {
    private const val TAG = "CoolPdfView"
  }

  private val pdfView = PDFView(context, null).apply {
    layoutParams = LayoutParams(LayoutParams.MATCH_PARENT, LayoutParams.MATCH_PARENT)
  }

  private var enablePaging: Boolean = false
  private var horizontal: Boolean = false
  private var pageSpacing: Int = 10
  private var minScale: Float = 1.0f
  private var maxScale: Float = 3.0f
  private var scale: Float = 1.0f
  private var fitPolicy: com.github.barteksc.pdfviewer.util.FitPolicy = com.github.barteksc.pdfviewer.util.FitPolicy.WIDTH
  private var currentFile: File? = null
  private var password: String? = null
  private var enableDoubleTapZoom: Boolean = true
  private var singlePage: Boolean = false

  init {
    addView(pdfView)
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
            when {
              uri.startsWith("bundle-assets://") -> {
                // Extract asset path (remove bundle-assets:// prefix)
                val assetPath = uri.removePrefix("bundle-assets://")
                Log.d(TAG, "Loading PDF from assets: $assetPath")
                copyAssetToCache(assetPath)
              }
              uri.startsWith("http://") || uri.startsWith("https://") -> {
                Log.d(TAG, "Downloading PDF from URL: $uri")
                val cache = source["cache"] as? Boolean ?: false
                val cacheFileName = source["cacheFileName"] as? String
                val expiration = (source["expiration"] as? Double)?.toInt()
                val method = source["method"] as? String ?: "GET"
                downloadPdf(uri, source["headers"] as? Map<String, String>, method, cache, cacheFileName, expiration)
              }
              else -> {
                Log.d(TAG, "Loading PDF from local file: $uri")
                File(uri)
              }
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
        withContext(Dispatchers.Main) {
          currentFile = file
          renderPdf(file)
        }
      } catch (e: Exception) {
        Log.e(TAG, "Error loading PDF", e)
        withContext(Dispatchers.Main) {
          onError(mapOf("error" to "${e.javaClass.simpleName}: ${e.message ?: "Unknown error"}"))
        }
      }
    }
  }

  private suspend fun downloadPdf(
    urlString: String,
    headers: Map<String, String>?,
    method: String,
    cache: Boolean,
    cacheFileName: String?,
    expiration: Int?
  ): File? = withContext(Dispatchers.IO) {
    try {
      // Determine cache file name
      val fileName = cacheFileName ?: run {
        // Generate SHA-1 hash of URL for cache filename (like react-native-pdf does)
        val digest = java.security.MessageDigest.getInstance("SHA-1")
        val hash = digest.digest(urlString.toByteArray())
        hash.joinToString("") { "%02x".format(it) }
      }

      val cacheFile = File(context.cacheDir, "$fileName.pdf")

      // If caching is enabled and file exists, check expiration
      if (cache && cacheFile.exists()) {
        var shouldUseCache = true

        // Check expiration if set
        if (expiration != null && expiration > 0) {
          val lastModified = cacheFile.lastModified()
          val expirationTimeMs = lastModified + (expiration * 1000L)
          val currentTimeMs = System.currentTimeMillis()
          if (currentTimeMs > expirationTimeMs) {
            // Cache has expired
            shouldUseCache = false
            Log.d(TAG, "Cache expired for: ${cacheFile.absolutePath}")
          }
        }

        if (shouldUseCache) {
          Log.d(TAG, "Using cached PDF: ${cacheFile.absolutePath}")
          return@withContext cacheFile
        }
      }

      Log.d(TAG, "Starting download from: $urlString with method: $method")
      val url = URL(urlString)
      val connection = url.openConnection() as HttpURLConnection
      connection.requestMethod = method
      headers?.forEach { (key, value) ->
        connection.setRequestProperty(key, value)
      }

      val targetFile = if (cache) cacheFile else File.createTempFile("pdf", ".pdf", context.cacheDir)
      Log.d(TAG, "Downloading to file: ${targetFile.absolutePath}")

      val contentLength = connection.contentLength.toLong()
      var totalBytesRead = 0L
      var lastProgressUpdate = 0L
      var lastReportedProgress = 0.0

      connection.getInputStream().use { input ->
        FileOutputStream(targetFile).use { output ->
          val buffer = ByteArray(8192)
          var bytesRead: Int
          while (input.read(buffer).also { bytesRead = it } != -1) {
            output.write(buffer, 0, bytesRead)
            totalBytesRead += bytesRead

            // Report progress if content length is known
            // Debounce: only report every 100ms or when progress changes by at least 5%
            if (contentLength > 0) {
              val progress = totalBytesRead.toDouble() / contentLength.toDouble()
              val currentTime = System.currentTimeMillis()
              val timeSinceLastUpdate = currentTime - lastProgressUpdate
              val progressDelta = progress - lastReportedProgress

              if (timeSinceLastUpdate >= 100 || progressDelta >= 0.05) {
                lastProgressUpdate = currentTime
                lastReportedProgress = progress
                withContext(Dispatchers.Main) {
                  onLoadProgress(mapOf("percent" to progress))
                }
              }
            }
          }
        }
      }

      Log.d(TAG, "Download complete: $totalBytesRead bytes written")
      targetFile
    } catch (e: Exception) {
      Log.e(TAG, "Error downloading PDF", e)
      withContext(Dispatchers.Main) {
        onError(mapOf("error" to "Download failed: ${e.message}"))
      }
      null
    }
  }

  private fun renderPdf(file: File) {
    try {
      Log.d(TAG, "renderPdf called for: ${file.absolutePath}")

      // Use fromUri instead of fromFile to support file:// URIs properly
      val uri = android.net.Uri.fromFile(file)
      val configurator = pdfView.fromUri(uri)
        .enableAntialiasing(true)
        .enableAnnotationRendering(true)
        .spacing(pageSpacing)
        .swipeHorizontal(horizontal)
        .pageFitPolicy(fitPolicy)
        .enableDoubletap(!singlePage && enableDoubleTapZoom)
        .enableSwipe(!singlePage)
        .password(password)
        .defaultPage(if (singlePage) 0 else pendingPage - 1)
        .onLoad(OnLoadCompleteListener { nbPages ->
          totalPages = nbPages
          Log.d(TAG, "PDF loaded with $nbPages pages")

          // Get display density for scaling dimensions (to match react-native-pdf behavior)
          // AndroidPdfViewer (used by RNPDF) scales using a specific formula
          // Formula appears to be: densityDpi / 274 (empirically determined)
          val densityDpi = context.resources.displayMetrics.densityDpi
          val scaleFactor = densityDpi / 274f
          Log.d(TAG, "Display densityDpi: $densityDpi, scaleFactor: $scaleFactor")

          // Get dimensions from first page
          val dimensions = if (nbPages > 0) {
            // AndroidPdfViewer provides page size in points (1/72 inch)
            // We need to scale it similar to how react-native-pdf does
            val pageSize = pdfView.getPageSize(0)
            if (pageSize != null) {
              mapOf(
                "width" to (pageSize.width * scaleFactor).toInt(),
                "height" to (pageSize.height * scaleFactor).toInt()
              )
            } else {
              mapOf("width" to 0, "height" to 0)
            }
          } else {
            mapOf("width" to 0, "height" to 0)
          }

          Log.d(TAG, "Dimensions: $dimensions")

          // Note: Android's PdfRenderer doesn't provide access to table of contents/bookmarks
          // AndroidPdfViewer might provide this, but for now sending empty array to match react-native-pdf structure
          // Apply scale after load (like react-native-pdf does)
          // Clamp scale between minScale and maxScale (like react-native-pdf lines 448-451)
          var effectiveScale = scale
          if (effectiveScale > maxScale) {
            effectiveScale = maxScale
          }
          if (effectiveScale < minScale) {
            effectiveScale = minScale
          }
          if (effectiveScale != 1.0f) {
            pdfView.zoomTo(effectiveScale)
          }

          onLoadComplete(mapOf(
            "numberOfPages" to nbPages,
            "path" to file.absolutePath,
            "dimensions" to dimensions,
            "tableContents" to emptyList<Map<String, Any>>()
          ))

          // Fire initial page change with the actual page we're on
          currentPage = if (pendingPage in 1..nbPages) pendingPage else 1
          onPageChanged(mapOf(
            "page" to currentPage,
            "numberOfPages" to nbPages
          ))
        })
        .onPageChange(OnPageChangeListener { page, pageCount ->
          val newPage = page + 1 // AndroidPdfViewer uses 0-based indexing
          if (newPage != currentPage) {
            currentPage = newPage
            Log.d(TAG, "Page changed to $newPage of $pageCount")
            onPageChanged(mapOf(
              "page" to newPage,
              "numberOfPages" to pageCount
            ))
          }
        })
        .onError(OnErrorListener { t ->
          Log.e(TAG, "Error rendering PDF", t)
          // Check for password error (matching react-native-pdf lines 178-181)
          val errorMessage = if (t.message?.contains("Password required or incorrect password") == true) {
            "Password required or incorrect password."
          } else {
            "Failed to render PDF: ${t.message}"
          }
          onError(mapOf("error" to errorMessage))
        })
        .onTap { e ->
          Log.d(TAG, "PDF tapped on page $currentPage")
          onPageSingleTap(mapOf("page" to currentPage))
          false // Return false to allow other gestures
        }

      // Apply paging if enabled
      if (enablePaging) {
        configurator.pageSnap(true).autoSpacing(true)
      }

      // Apply singlePage mode - only show the first page
      if (singlePage) {
        configurator.pages(0)
      }

      configurator.load()

      // Apply scale settings after load
      if (minScale != 1.0f) {
        pdfView.setMinZoom(minScale)
      }
      if (maxScale != 3.0f) {
        pdfView.setMaxZoom(maxScale)
      }

    } catch (e: Exception) {
      Log.e(TAG, "Error in renderPdf", e)
      onError(mapOf("error" to "Failed to render PDF: ${e.javaClass.simpleName}: ${e.message}"))
    }
  }

  fun setPage(pageNumber: Int) {
    // Store the pending page for when the PDF loads
    pendingPage = pageNumber

    // If PDF is already loaded, navigate immediately
    if (totalPages > 0) {
      if (pageNumber < 1 || pageNumber > totalPages) {
        Log.w(TAG, "Invalid page number: $pageNumber (total pages: $totalPages)")
        return
      }

      currentPage = pageNumber
      // AndroidPdfViewer uses 0-based indexing
      pdfView.jumpTo(pageNumber - 1, false)
    }
  }

  fun setScale(newScale: Float) {
    scale = newScale
    // Don't apply immediately - will be applied in onLoadComplete
    // (like react-native-pdf does)
  }

  fun setMinScale(newMinScale: Float) {
    minScale = newMinScale
    pdfView.setMinZoom(newMinScale)
  }

  fun setMaxScale(newMaxScale: Float) {
    maxScale = newMaxScale
    pdfView.setMaxZoom(newMaxScale)
  }

  fun setHorizontal(isHorizontal: Boolean) {
    horizontal = isHorizontal
    Log.d(TAG, "setHorizontal: $isHorizontal")

    // Reload the PDF if it's already loaded (like react-native-pdf does)
    currentFile?.let { file ->
      pdfView.recycle()
      renderPdf(file)
    }
  }

  fun setEnablePaging(enabled: Boolean) {
    enablePaging = enabled
    Log.d(TAG, "setEnablePaging: $enabled")

    // Reload the PDF if it's already loaded (like react-native-pdf does)
    currentFile?.let { file ->
      pdfView.recycle()
      renderPdf(file)
    }
  }

  fun setSpacing(spacing: Int) {
    pageSpacing = spacing
    // Note: This would require reloading the PDF with new configuration
    // For now, we'll just store the value for next load
  }

  fun setPassword(newPassword: String?) {
    password = newPassword
    Log.d(TAG, "setPassword called")
    // Note: Password is applied when document is loaded, not here
  }

  fun setFitPolicy(policy: Int) {
    fitPolicy = when (policy) {
      0 -> com.github.barteksc.pdfviewer.util.FitPolicy.WIDTH
      1 -> com.github.barteksc.pdfviewer.util.FitPolicy.HEIGHT
      2 -> com.github.barteksc.pdfviewer.util.FitPolicy.BOTH
      else -> com.github.barteksc.pdfviewer.util.FitPolicy.BOTH
    }
    Log.d(TAG, "setFitPolicy: $policy -> $fitPolicy")

    // Reload the PDF if it's already loaded (like react-native-pdf does)
    currentFile?.let { file ->
      pdfView.recycle()
      renderPdf(file)
    }
  }

  fun setEnableDoubleTapZoom(enabled: Boolean) {
    enableDoubleTapZoom = enabled
    Log.d(TAG, "setEnableDoubleTapZoom: $enabled")

    // Reload the PDF if it's already loaded (like react-native-pdf does)
    currentFile?.let { file ->
      pdfView.recycle()
      renderPdf(file)
    }
  }

  fun setSinglePage(enabled: Boolean) {
    singlePage = enabled
    Log.d(TAG, "setSinglePage: $enabled")

    // Reload the PDF if it's already loaded (like react-native-pdf does)
    currentFile?.let { file ->
      pdfView.recycle()
      renderPdf(file)
    }
  }

  private fun copyAssetToCache(assetPath: String): File? {
    return try {
      val assetManager = context.assets
      val cacheFile = File(context.cacheDir, assetPath)

      // Create parent directories if needed
      cacheFile.parentFile?.mkdirs()

      // Copy asset to cache using Kotlin's idiomatic approach
      assetManager.open(assetPath).use { input ->
        cacheFile.outputStream().use { output ->
          input.copyTo(output)
        }
      }

      Log.d(TAG, "Asset copied to cache: ${cacheFile.absolutePath}")
      cacheFile
    } catch (e: Exception) {
      Log.e(TAG, "Error copying asset $assetPath to cache", e)
      null
    }
  }

  override fun onDetachedFromWindow() {
    super.onDetachedFromWindow()
    pdfView.recycle()
    scope.cancel()
  }
}
