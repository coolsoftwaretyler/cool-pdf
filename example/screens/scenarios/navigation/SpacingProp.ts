export const SpacingPropScenario = {
  id: "spacing-prop",
  name: "Spacing Prop",
  description:
    "Tests the spacing prop which controls the breaker size between pages",
  category: "navigation" as const,
  expectedBehavior:
    "Pages should have 20pt spacing between them (double the default of 10pt). This does not work on Android in either library, but that might be a bug on RNPDF. For now we have parity.",
};
