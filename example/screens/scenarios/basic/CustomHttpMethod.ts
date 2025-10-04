export const CustomHttpMethodScenario = {
  id: "custom-http-method",
  name: "Custom HTTP Method",
  description: "Load a PDF using POST method instead of default GET",
  category: "basic" as const,
  expectedBehavior:
    "PDF should load successfully using POST HTTP method for the request",
};
