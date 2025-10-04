export const BasicCacheExpirationScenario = {
  id: "basic-cache-expiration",
  name: "Load PDF with Cache Expiration",
  description: "Load a PDF from URL with cache that expires after 10 seconds",
  category: "basic" as const,
  expectedBehavior:
    "PDF should load from cache initially, then re-download after 10 seconds if reloaded",
};
