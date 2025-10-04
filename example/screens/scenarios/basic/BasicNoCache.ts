export const BasicNoCacheScenario = {
  id: "basic-no-cache",
  name: "Load PDF without Cache",
  description: "Load a PDF from URL without caching",
  category: "basic" as const,
  expectedBehavior: "PDF should load fresh from URL each time",
};

export const coolOutput = [
  {
    timestamp: 1759604241086,
    type: "loadComplete",
    data: {
      numberOfPages: 28,
      path: "/data/user/0/expo.modules.coolpdf.example/cache/pdf7908173406925352521.pdf",
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
    timestamp: 1759604312637,
    type: "loadComplete",
    data: {
      numberOfPages: 28,
      path: "/data/user/0/expo.modules.coolpdf.example/cache/b6269f4f04d7b4f51a8d8ac0ef7d916f8a5ae5d1.pdf",
      dimensions: {
        width: 912.00006,
        height: 1140,
      },
      tableContents: [],
    },
  },
];
