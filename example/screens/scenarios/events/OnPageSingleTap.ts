export const OnPageSingleTapScenario = {
  id: "on-page-single-tap",
  name: "On Page Single Tap",
  description: "Tests the onPageSingleTap event to detect when users tap on the PDF",
  category: "events" as const,
  expectedBehavior: "Both implementations should fire onPageSingleTap with the current page number when the user taps once on the PDF",
};
