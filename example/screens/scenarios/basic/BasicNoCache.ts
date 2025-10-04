export const BasicNoCacheScenario = {
  id: "basic-no-cache",
  name: "Load PDF without Cache",
  description: "Load a PDF from URL without caching",
  category: "basic" as const,
  expectedBehavior: "PDF should load fresh from URL each time",
};
