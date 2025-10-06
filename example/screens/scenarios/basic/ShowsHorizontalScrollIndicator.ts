export const ShowsHorizontalScrollIndicatorScenario = {
  id: "shows-horizontal-scroll-indicator",
  name: "Shows Horizontal Scroll Indicator",
  description: "Tests the showsHorizontalScrollIndicator prop which controls visibility of the horizontal scroll indicator (iOS only, requires horizontal=true)",
  category: "style" as const,
  expectedBehavior: "Horizontal scroll indicator should be hidden when showsHorizontalScrollIndicator is false",
  notes: "iOS only - Android does not support this prop",
};
