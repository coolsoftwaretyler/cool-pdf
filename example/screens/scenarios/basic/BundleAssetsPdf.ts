export const BundleAssetsPdfScenario = {
  id: "bundle-assets-pdf",
  name: "Bundle Assets PDF",
  description: "Tests loading a PDF file from Android bundle assets using bundle-assets:// URI",
  category: "basic" as const,
  expectedBehavior: "PDF should load successfully on Android using {uri: 'bundle-assets://sample.pdf'}. This is an Android-only feature for loading PDFs from android/app/src/main/assets/.",
};
