export const OnPageChangedScenario = {
  id: "on-page-changed",
  name: "On Page Changed",
  description: "Tests the onPageChanged event to track when users navigate between pages",
  category: "events" as const,
  expectedBehavior: "Both implementations should fire onPageChanged events with current page number and total pages when the user scrolls to a different page",
};
