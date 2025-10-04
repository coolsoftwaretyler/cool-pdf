export const RequireLocalPdfScenario = {
  id: "require-local-pdf",
  name: "Require Local PDF",
  description: "Tests loading a local PDF file using require() with source.uri type",
  category: "basic" as const,
  expectedBehavior: "PDF should load successfully on iOS using require('./test.pdf'). Android is not expected to work with this approach.",
};
