export const HorizontalPropScenario = {
  id: "horizontal-prop",
  name: "Horizontal Prop",
  description: "Tests the horizontal prop which controls page draw direction - vertical (false, default) vs horizontal (true)",
  category: "navigation" as const,
  expectedBehavior: "With horizontal=true, pages should scroll left-to-right instead of top-to-bottom. Toggle to see the difference.",
};
