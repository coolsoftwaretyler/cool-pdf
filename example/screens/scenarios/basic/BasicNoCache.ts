export const BasicNoCacheScenario = {
  id: "basic-no-cache",
  name: "Load PDF from URL without Cache",
  description: "Load a PDF from URL without caching",
  category: "loading" as const,
  expectedBehavior: "PDF should load fresh from URL each time",
};
