export const EnableDoubleTapZoomPropScenario = {
  id: "enable-double-tap-zoom-prop",
  name: "Enable Double Tap Zoom Prop",
  description: "Tests the enableDoubleTapZoom prop. When false, disables the double tap to zoom gesture.",
  category: "zoom" as const,
  expectedBehavior: "Double tap on the PDF should zoom when toggle is ON. When toggle is OFF (enableDoubleTapZoom=false), double tap should have no effect.",
};
