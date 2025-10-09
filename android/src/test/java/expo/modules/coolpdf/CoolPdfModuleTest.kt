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

    assertTrue(definition.name == "CoolPdf")
  }
}
