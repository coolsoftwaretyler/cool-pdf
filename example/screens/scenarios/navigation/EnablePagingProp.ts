export const EnablePagingPropScenario = {
  id: "enable-paging-prop",
  name: "Enable Paging Prop",
  description: "Tests the enablePaging prop which makes the PDF display only one page at a time (true) vs continuous scroll (false, default)",
  category: "navigation" as const,
  expectedBehavior: "With enablePaging=true, only one page should be visible at a time with page snapping behavior",
};
