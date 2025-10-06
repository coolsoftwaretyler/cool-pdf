export const OnErrorScenario = {
  id: "on-error",
  name: "On Error",
  description: "Tests the onError event by attempting to load an invalid PDF URL",
  category: "events" as const,
  expectedBehavior: "Both implementations should fire onError with an error message when the PDF fails to load",
};
