export const PagePropScenario = {
  id: "page-prop",
  name: "Page Prop",
  description: "Tests the page prop which sets the initial page index to display when the PDF loads",
  category: "navigation" as const,
  expectedBehavior: "PDF should open to the specified page index (e.g., page 3) instead of the first page",
};
