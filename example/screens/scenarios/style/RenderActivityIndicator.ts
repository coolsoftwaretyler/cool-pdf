export const RenderActivityIndicatorScenario = {
  id: "render-activity-indicator",
  name: "Render Activity Indicator",
  description: "Tests the renderActivityIndicator prop to display a custom loading component while the PDF loads",
  category: "style" as const,
  expectedBehavior: "Both implementations should show a custom purple spinner with 'Loading PDF...' text while the PDF is loading",
};
