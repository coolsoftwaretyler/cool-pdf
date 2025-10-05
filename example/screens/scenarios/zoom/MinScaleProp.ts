export const MinScalePropScenario = {
  id: "min-scale-prop",
  name: "Min Scale Prop",
  description: "Tests that minScale prop overrides a lower scale value",
  category: "zoom" as const,
  expectedBehavior: "PDF should render at 3x scale (minScale=3) even though scale=1, since minScale takes precedence. Works on both platforms on Cool PDF, but does not work on React Native PDF on Android",
};
