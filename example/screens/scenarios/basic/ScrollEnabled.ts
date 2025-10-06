export const ScrollEnabledScenario = {
  id: "scroll-enabled",
  name: "Scroll Enabled",
  description: "Tests the scrollEnabled prop to disable scrolling",
  category: "navigation" as const,
  expectedBehavior: "Scrolling should be disabled on iOS. This prop has no effect on Android.",
};
