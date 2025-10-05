export const OnLoadCompleteScenario = {
  id: "on-load-complete",
  name: "On Load Complete",
  description: "Tests the onLoadComplete event to ensure it fires with the correct parameters when a PDF finishes loading.",
  category: "events" as const,
  expectedBehavior: "Both implementations should fire onLoadComplete with numberOfPages, path, dimensions, and tableContents. The event data should be analogous between CoolPDF (destructured from event.nativeEvent) and react-native-pdf (passed as direct parameters).",
};
