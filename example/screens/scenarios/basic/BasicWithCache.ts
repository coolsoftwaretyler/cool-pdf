export const BasicWithCacheScenario = {
  id: "basic-url",
  name: "Load PDF from URL with Cache",
  description: "Load a simple PDF from a public URL with caching enabled",
  category: "basic" as const,
  expectedBehavior:
    "PDF should load and display the first page. Both onLoadComplete and onPageChanged should fire.",
};
