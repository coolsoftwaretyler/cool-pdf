export const DisableAnnotationsScenario = {
  id: "disable-annotations",
  name: "Disable Annotations",
  description: "Tests enableAnnotations prop set to false to hide PDF annotations",
  category: "style" as const,
  expectedBehavior: "PDF annotations (highlights, comments, etc.) should be hidden when rendered",
};
