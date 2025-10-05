export const CustomHeadersScenario = {
  id: "custom-headers",
  name: "Custom Headers",
  description: "Load a PDF from URL with custom headers",
  category: "loading" as const,
  expectedBehavior: "PDF should load successfully with the custom headers",
  testingInstructions: `
  To verify the headers are correctly used:

  1. Start the test server in a separate terminal:
     cd example && npm run test-server

  2. The server will display platform-specific URLs and start logging requests

  3. Run the example app and navigate to this scenario
     - The app automatically uses the correct URL for your platform:
       • iOS Simulator: http://localhost:3000/sample.pdf
       • Android Emulator: http://10.0.2.2:3000/sample.pdf
       • Physical Device: Use your computer's local IP address

  4. Check the test server terminal output - you should see:
     - Headers: { "custom-header": "custom-value" } (in cyan color)
     - URL: /sample.pdf
     - Request headers

  5. If the headers do not show, the implementation
     is not correctly passing the custom headers.

  Note: The test server must be running BEFORE loading this scenario,
  otherwise the PDF will fail to load. If using a physical device,
  ensure your device and computer are on the same WiFi network and
  update the URL in the screen files with your computer's IP address.
`.trim(),
};
