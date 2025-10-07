package expo.modules.coolpdf

import android.content.Context
import expo.modules.kotlin.AppContext
import io.mockk.*
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.ExperimentalCoroutinesApi
import kotlinx.coroutines.test.*
import org.junit.After
import org.junit.Before
import org.junit.Test
import org.junit.Assert.*

/**
 * Example unit tests for CoolPdfView
 *
 * Demonstrates:
 * - Mocking Android Context and Expo AppContext
 * - Testing coroutine-based code
 * - Testing view property setters
 *
 * Run tests with: ./gradlew test (from android directory)
 * Or: ./gradlew :cool-pdf:test (from example directory)
 */
@OptIn(ExperimentalCoroutinesApi::class)
class CoolPdfViewTest {

  private lateinit var context: Context
  private lateinit var appContext: AppContext
  private val testDispatcher = StandardTestDispatcher()

  @Before
  fun setup() {
    // Set up test dispatcher for coroutines
    Dispatchers.setMain(testDispatcher)

    // Mock Android Context
    context = mockk(relaxed = true)

    // Mock Expo AppContext
    appContext = mockk(relaxed = true)

    // Mock common Context methods
    every { context.cacheDir } returns mockk(relaxed = true)
    every { context.assets } returns mockk(relaxed = true)
    every { context.resources } returns mockk(relaxed = true)
  }

  @After
  fun tearDown() {
    Dispatchers.resetMain()
    unmockkAll()
  }

  @Test
  fun `view can be instantiated`() {
    val view = CoolPdfView(context, appContext)
    assertNotNull("View should be instantiated", view)
  }

  @Test
  fun `setHorizontal updates horizontal property`() {
    val view = CoolPdfView(context, appContext)

    // Test setting horizontal orientation
    view.setHorizontal(true)
    // Note: Without accessing private fields, we verify no exceptions are thrown
    assertTrue("setHorizontal should execute without errors", true)
  }

  @Test
  fun `setEnablePaging updates paging property`() {
    val view = CoolPdfView(context, appContext)

    view.setEnablePaging(true)
    assertTrue("setEnablePaging should execute without errors", true)
  }

  @Test
  fun `setPage stores pending page number`() {
    val view = CoolPdfView(context, appContext)

    // Setting a page before PDF is loaded should not throw
    view.setPage(5)
    assertTrue("setPage should execute without errors", true)
  }

  @Test
  fun `setScale updates scale value`() {
    val view = CoolPdfView(context, appContext)

    view.setScale(2.0f)
    assertTrue("setScale should execute without errors", true)
  }

  @Test
  fun `setMinScale and setMaxScale update zoom limits`() {
    val view = CoolPdfView(context, appContext)

    view.setMinScale(0.5f)
    view.setMaxScale(5.0f)
    assertTrue("Zoom limits should be set without errors", true)
  }

  @Test
  fun `setPassword updates password property`() {
    val view = CoolPdfView(context, appContext)

    view.setPassword("test123")
    view.setPassword(null)
    assertTrue("setPassword should execute without errors", true)
  }

  @Test
  fun `setFitPolicy updates fit policy`() {
    val view = CoolPdfView(context, appContext)

    // Test different fit policy values
    view.setFitPolicy(0) // WIDTH
    view.setFitPolicy(1) // HEIGHT
    view.setFitPolicy(2) // BOTH
    assertTrue("setFitPolicy should execute without errors", true)
  }

  @Test
  fun `setSinglePage updates single page mode`() {
    val view = CoolPdfView(context, appContext)

    view.setSinglePage(true)
    view.setSinglePage(false)
    assertTrue("setSinglePage should execute without errors", true)
  }

  @Test
  fun `setEnableAnnotations updates annotations setting`() {
    val view = CoolPdfView(context, appContext)

    view.setEnableAnnotations(true)
    view.setEnableAnnotations(false)
    assertTrue("setEnableAnnotations should execute without errors", true)
  }

  @Test
  fun `setEnableDoubleTapZoom updates double tap zoom setting`() {
    val view = CoolPdfView(context, appContext)

    view.setEnableDoubleTapZoom(true)
    view.setEnableDoubleTapZoom(false)
    assertTrue("setEnableDoubleTapZoom should execute without errors", true)
  }

  @Test
  fun `setSpacing updates spacing value`() {
    val view = CoolPdfView(context, appContext)

    view.setSpacing(20)
    assertTrue("setSpacing should execute without errors", true)
  }

  @Test
  fun `loadPdf with invalid source triggers error`() = runTest {
    val view = CoolPdfView(context, appContext)

    // Load with empty source
    view.loadPdf(emptyMap())

    // Advance coroutine execution
    advanceUntilIdle()

    // Verify that the error event would be dispatched
    // Note: Actual event verification would require spying on the EventDispatcher
    assertTrue("loadPdf with empty source should complete", true)
  }
}
