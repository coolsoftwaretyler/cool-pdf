export const OnScaleChangedScenario = {
  id: "on-scale-changed",
  name: "On Scale Changed",
  description: "Tests the onScaleChanged event to track when users zoom in or out of the PDF",
  category: "events" as const,
  expectedBehavior: "Both implementations should fire onScaleChanged with the current scale value when the user pinches to zoom",
};
