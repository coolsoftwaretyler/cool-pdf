export const EnableRtlPropScenario = {
  id: "enable-rtl-prop",
  name: "Enable RTL Prop",
  description: "Tests the enableRTL prop. When true, changes page order from left-to-right to right-to-left (e.g., page 3, page 2, page 1). Works with horizontal={true}.",
  category: "navigation" as const,
  expectedBehavior: "When RTL is OFF (default), pages scroll left-to-right (1, 2, 3). When RTL is ON, pages scroll right-to-left (3, 2, 1). Only visible with horizontal scrolling enabled.",
};
