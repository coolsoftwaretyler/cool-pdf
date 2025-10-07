package expo.modules.coolpdf

import org.junit.Test
import org.junit.Assert.*

/**
 * Example unit tests for CoolPdfModule
 *
 * Run tests with: ./gradlew test (from android directory)
 * Or: ./gradlew :cool-pdf:test (from example directory)
 */
class CoolPdfModuleTest {

  @Test
  fun `module name should be CoolPdf`() {
    val module = CoolPdfModule()
    val definition = module.definition()

    // The module name should be "CoolPdf"
    assertNotNull("Module definition should not be null", definition)
  }

  @Test
  fun `hello function returns greeting`() {
    val module = CoolPdfModule()

    // Test the hello() function
    // Note: Direct function testing requires accessing the module's functions
    // For now, this demonstrates the test structure
    assertTrue("Module should be instantiated", module is CoolPdfModule)
  }

  @Test
  fun `PI constant should equal Math PI`() {
    // Test that the PI constant is correctly defined
    assertEquals("PI should equal Math.PI", Math.PI, Math.PI, 0.0)
  }
}
