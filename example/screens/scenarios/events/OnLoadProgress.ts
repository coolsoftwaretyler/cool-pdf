export const OnLoadProgressScenario = {
  id: "on-load-progress",
  name: "On Load Progress",
  description: "Tests the onLoadProgress event to track PDF loading progress",
  category: "events" as const,
  expectedBehavior: "Both implementations should fire onLoadProgress events with percentage values from 0 to 100 as the PDF loads",
};
