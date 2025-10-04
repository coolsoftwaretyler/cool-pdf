export const BasicCacheFileNameScenario = {
  id: "basic-cache-filename",
  name: "Load PDF with Custom Cache Filename",
  description: "Load a PDF from URL with custom cache filename",
  category: "basic" as const,
  expectedBehavior:
    "PDF should load and cache with the specified custom filename",
};

export const coolOutput = [
  {
    timestamp: 1759607148667,
    type: "loadComplete",
    data: {
      numberOfPages: 28,
      path: "/data/user/0/expo.modules.coolpdf.example/cache/my-custom-cached-file.pdf",
      dimensions: {
        height: 1906,
        width: 1526,
      },
      tableContents: [],
    },
  },
];

export const rnPdfOutput = [
  {
    timestamp: 1759607180135,
    type: "loadComplete",
    data: {
      numberOfPages: 28,
      path: "/data/user/0/expo.modules.coolpdf.example/cache/my-custom-cached-file",
      dimensions: {
        width: 912.00006,
        height: 1140,
      },
      tableContents: [],
    },
  },
];
