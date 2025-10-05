export const CustomHttpMethodScenario = {
  id: "custom-http-method",
  name: "Custom HTTP Method",
  description: "Load a PDF using POST method instead of default GET",
  category: "loading" as const,
  expectedBehavior:
    "PDF should load successfully using POST HTTP method for the request",
  testingInstructions: `
    To verify the HTTP method is correctly used:

    1. Start the test server in a separate terminal:
       cd example && npm run test-server

    2. The server will display platform-specific URLs and start logging requests

    3. Run the example app and navigate to this scenario
       - The app automatically uses the correct URL for your platform:
         • iOS Simulator: http://localhost:3000/sample.pdf
         • Android Emulator: http://10.0.2.2:3000/sample.pdf
         • Physical Device: Use your computer's local IP address

    4. Check the test server terminal output - you should see:
       - Method: POST (in cyan color)
       - URL: /sample.pdf
       - Request headers

    5. If the method shows as GET instead of POST, the implementation
       is not correctly passing the custom HTTP method.

    Note: The test server must be running BEFORE loading this scenario,
    otherwise the PDF will fail to load. If using a physical device,
    ensure your device and computer are on the same WiFi network and
    update the URL in the screen files with your computer's IP address.
  `.trim(),
};
