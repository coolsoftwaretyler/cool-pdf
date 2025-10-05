export const FileUriLocalPdfScenario = {
  id: "file-uri-local-pdf",
  name: "File URI Local PDF",
  description: "Tests loading a PDF from an absolute file:// URI. Downloads a sample PDF to the device cache directory and loads it using the local file path.",
  category: "loading" as const,
  expectedBehavior: "PDF should download to cache directory on mount and load successfully on both iOS and Android using file:// URI scheme.",
};
