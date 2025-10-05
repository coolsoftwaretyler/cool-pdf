export const ScalePropScenario = {
  id: "scale-prop",
  name: "Scale Prop",
  description: "Tests the scale prop which sets the initial zoom level of the PDF",
  category: "zoom" as const,
  expectedBehavior: "PDF should render at 1.5x scale (150% zoom)",
};
