export const OnPressLinkScenario = {
  id: "on-press-link",
  name: "On Press Link",
  description: "Tests the onPressLink event to detect when users tap on hyperlinks within the PDF",
  category: "events" as const,
  expectedBehavior: "Both implementations should fire onPressLink with the URL when the user taps on a hyperlink in the PDF",
};
