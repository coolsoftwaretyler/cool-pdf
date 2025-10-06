export const ShowsVerticalScrollIndicatorScenario = {
  id: "shows-vertical-scroll-indicator",
  name: "Shows Vertical Scroll Indicator",
  description: "Tests the showsVerticalScrollIndicator prop to hide the vertical scrollbar",
  category: "style" as const,
  expectedBehavior: "The vertical scroll indicator should be hidden on iOS. This prop has no effect on Android.",
};
