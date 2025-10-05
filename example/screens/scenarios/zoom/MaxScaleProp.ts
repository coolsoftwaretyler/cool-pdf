export const MaxScalePropScenario = {
  id: "max-scale-prop",
  name: "Max Scale Prop",
  description: "Tests that maxScale prop limits a higher scale value",
  category: "zoom" as const,
  expectedBehavior: "PDF should render at 1.5x scale (maxScale=1.5) even though scale=5, since maxScale takes precedence. Works on both platforms on Cool PDF, but does not work on React Native PDF on Android",
};
