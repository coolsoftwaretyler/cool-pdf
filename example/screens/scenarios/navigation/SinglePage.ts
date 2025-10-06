export const SinglePageScenario = {
  id: "single-page",
  name: "Single Page",
  description: "Tests singlePage prop which restricts the PDF view to only display the first page",
  category: "navigation" as const,
  expectedBehavior: "Only the first page should be visible, with no ability to scroll or navigate to other pages",
};
