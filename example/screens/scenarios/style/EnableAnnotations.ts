export const EnableAnnotationsScenario = {
  id: "enable-annotations",
  name: "Enable Annotations",
  description: "Tests enableAnnotations prop set to true (default) to show PDF annotations",
  category: "style" as const,
  expectedBehavior: "PDF annotations (highlights, comments, etc.) should be visible when rendered",
};
