export const FitPolicyPropScenario = {
  id: "fit-policy-prop",
  name: "Fit Policy Prop",
  description: "Tests the fitPolicy prop with interactive selector to switch between fit width (0), fit height (1), and fit both (2, default)",
  category: "zoom" as const,
  expectedBehavior: "PDF should dynamically adjust its fit policy when selector is changed",
};
