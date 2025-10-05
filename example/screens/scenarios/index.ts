// Import scenario metadata
import { BasicWithCacheScenario } from "./basic/BasicWithCache";
import { BasicNoCacheScenario } from "./basic/BasicNoCache";
import { BasicCacheFileNameScenario } from "./basic/BasicCacheFileName";
import { BasicCacheExpirationScenario } from "./basic/BasicCacheExpiration";
import { BasicPasswordScenario } from "./basic/BasicPasswordCoolPdfScreen";
import { CustomHttpMethodScenario } from "./basic/CustomHttpMethod";
import { HorizontalScrollingScenario } from "./navigation/HorizontalScrollingCoolPdfScreen";
import { PageSnappingScenario } from "./navigation/PageSnappingCoolPdfScreen";
import { HorizontalWithPagingScenario } from "./navigation/HorizontalWithPagingCoolPdfScreen";
import { CustomSpacingScenario } from "./navigation/CustomSpacingCoolPdfScreen";
import { InitialZoomScenario } from "./zoom/InitialZoomCoolPdfScreen";
import { CustomZoomRangeScenario } from "./zoom/CustomZoomRangeCoolPdfScreen";
import { RestrictedZoomScenario } from "./zoom/RestrictedZoomCoolPdfScreen";

import { CustomHeadersScenario } from "./basic/CustomHeaders";
import { Base64PdfRenderingScenario } from "./basic/Base64PdfRendering";
import { RequireLocalPdfScenario } from "./basic/RequireLocalPdf";
import { BundleAssetsPdfScenario } from "./basic/BundleAssetsPdf";
import { FileUriLocalPdfScenario } from "./basic/FileUriLocalPdf";
import { PagePropScenario } from "./navigation/PageProp";
import { ScalePropScenario } from "./zoom/ScaleProp";
import { MinScalePropScenario } from "./zoom/MinScaleProp";
import { MaxScalePropScenario } from "./zoom/MaxScaleProp";
import { OnLoadCompleteScenario } from "./basic/OnLoadComplete";
import { ShowsVerticalScrollIndicatorScenario } from "./basic/ShowsVerticalScrollIndicator";
import { ScrollEnabledScenario } from "./basic/ScrollEnabled";
import { SpacingPropScenario } from "./navigation/SpacingProp";
// Re-export scenario metadata
export {
  BasicWithCacheScenario,
  BasicNoCacheScenario,
  BasicCacheFileNameScenario,
  BasicCacheExpirationScenario,
  BasicPasswordScenario,
  CustomHttpMethodScenario,
  CustomHeadersScenario,
  Base64PdfRenderingScenario,
  RequireLocalPdfScenario,
  BundleAssetsPdfScenario,
  FileUriLocalPdfScenario,
  OnLoadCompleteScenario,
  ShowsVerticalScrollIndicatorScenario,
  ScrollEnabledScenario,
};
export {
  HorizontalScrollingScenario,
  PageSnappingScenario,
  HorizontalWithPagingScenario,
  CustomSpacingScenario,
  PagePropScenario,
  SpacingPropScenario,
};
export { InitialZoomScenario, CustomZoomRangeScenario, RestrictedZoomScenario };

// Basic scenarios
export { default as BasicWithCacheCoolPdfScreen } from "./basic/BasicWithCacheCoolPdfScreen";
export { default as BasicWithCacheReactNativePdfScreen } from "./basic/BasicWithCacheReactNativePdfScreen";

export { default as BasicNoCacheCoolPdfScreen } from "./basic/BasicNoCacheCoolPdfScreen";
export { default as BasicNoCacheReactNativePdfScreen } from "./basic/BasicNoCacheReactNativePdfScreen";

export { default as BasicCacheFileNameCoolPdfScreen } from "./basic/BasicCacheFileNameCoolPdfScreen";
export { default as BasicCacheFileNameReactNativePdfScreen } from "./basic/BasicCacheFileNameReactNativePdfScreen";

export { default as BasicCacheExpirationCoolPdfScreen } from "./basic/BasicCacheExpirationCoolPdfScreen";
export { default as BasicCacheExpirationReactNativePdfScreen } from "./basic/BasicCacheExpirationReactNativePdfScreen";

export { default as BasicPasswordCoolPdfScreen } from "./basic/BasicPasswordCoolPdfScreen";
export { default as BasicPasswordReactNativePdfScreen } from "./basic/BasicPasswordReactNativePdfScreen";

export { default as CustomHttpMethodCoolPdfScreen } from "./basic/CustomHttpMethodCoolPdfScreen";
export { default as CustomHttpMethodReactNativePdfScreen } from "./basic/CustomHttpMethodReactNativePdfScreen";

export { default as CustomHeadersCoolPdfScreen } from "./basic/CustomHeadersCoolPdfScreen";
export { default as CustomHeadersReactNativePdfScreen } from "./basic/CustomHeadersReactNativePdfScreen";

export { default as Base64PdfRenderingCoolPdfScreen } from "./basic/Base64PdfRenderingCoolPdfScreen";
export { default as Base64PdfRenderingReactNativePdfScreen } from "./basic/Base64PdfRenderingReactNativePdfScreen";

export { default as RequireLocalPdfCoolPdfScreen } from "./basic/RequireLocalPdfCoolPdfScreen";
export { default as RequireLocalPdfReactNativePdfScreen } from "./basic/RequireLocalPdfReactNativePdfScreen";

export { default as BundleAssetsPdfCoolPdfScreen } from "./basic/BundleAssetsPdfCoolPdfScreen";
export { default as BundleAssetsPdfReactNativePdfScreen } from "./basic/BundleAssetsPdfReactNativePdfScreen";

export { default as FileUriLocalPdfCoolPdfScreen } from "./basic/FileUriLocalPdfCoolPdfScreen";
export { default as FileUriLocalPdfReactNativePdfScreen } from "./basic/FileUriLocalPdfReactNativePdfScreen";

export { default as OnLoadCompleteCoolPdfScreen } from "./basic/OnLoadCompleteCoolPdfScreen";
export { default as OnLoadCompleteReactNativePdfScreen } from "./basic/OnLoadCompleteReactNativePdfScreen";

export { default as ShowsVerticalScrollIndicatorCoolPdfScreen } from "./basic/ShowsVerticalScrollIndicatorCoolPdfScreen";
export { default as ShowsVerticalScrollIndicatorReactNativePdfScreen } from "./basic/ShowsVerticalScrollIndicatorReactNativePdfScreen";

export { default as ScrollEnabledCoolPdfScreen } from "./basic/ScrollEnabledCoolPdfScreen";
export { default as ScrollEnabledReactNativePdfScreen } from "./basic/ScrollEnabledReactNativePdfScreen";

// Navigation scenarios
export { default as HorizontalScrollingCoolPdfScreen } from "./navigation/HorizontalScrollingCoolPdfScreen";
export { default as HorizontalScrollingReactNativePdfScreen } from "./navigation/HorizontalScrollingReactNativePdfScreen";

export { default as PageSnappingCoolPdfScreen } from "./navigation/PageSnappingCoolPdfScreen";
export { default as PageSnappingReactNativePdfScreen } from "./navigation/PageSnappingReactNativePdfScreen";

export { default as HorizontalWithPagingCoolPdfScreen } from "./navigation/HorizontalWithPagingCoolPdfScreen";
export { default as HorizontalWithPagingReactNativePdfScreen } from "./navigation/HorizontalWithPagingReactNativePdfScreen";

export { default as CustomSpacingCoolPdfScreen } from "./navigation/CustomSpacingCoolPdfScreen";
export { default as CustomSpacingReactNativePdfScreen } from "./navigation/CustomSpacingReactNativePdfScreen";

export { default as PagePropCoolPdfScreen } from "./navigation/PagePropCoolPdfScreen";
export { default as PagePropReactNativePdfScreen } from "./navigation/PagePropReactNativePdfScreen";

export { default as SpacingPropCoolPdfScreen } from "./navigation/SpacingPropCoolPdfScreen";
export { default as SpacingPropReactNativePdfScreen } from "./navigation/SpacingPropReactNativePdfScreen";

// Zoom scenarios
export { default as InitialZoomCoolPdfScreen } from "./zoom/InitialZoomCoolPdfScreen";
export { default as InitialZoomReactNativePdfScreen } from "./zoom/InitialZoomReactNativePdfScreen";

export { default as CustomZoomRangeCoolPdfScreen } from "./zoom/CustomZoomRangeCoolPdfScreen";
export { default as CustomZoomRangeReactNativePdfScreen } from "./zoom/CustomZoomRangeReactNativePdfScreen";

export { default as RestrictedZoomCoolPdfScreen } from "./zoom/RestrictedZoomCoolPdfScreen";
export { default as RestrictedZoomReactNativePdfScreen } from "./zoom/RestrictedZoomReactNativePdfScreen";

export { default as ScalePropCoolPdfScreen } from "./zoom/ScalePropCoolPdfScreen";
export { default as ScalePropReactNativePdfScreen } from "./zoom/ScalePropReactNativePdfScreen";

export { default as MinScalePropCoolPdfScreen } from "./zoom/MinScalePropCoolPdfScreen";
export { default as MinScalePropReactNativePdfScreen } from "./zoom/MinScalePropReactNativePdfScreen";

export { default as MaxScalePropCoolPdfScreen } from "./zoom/MaxScalePropCoolPdfScreen";
export { default as MaxScalePropReactNativePdfScreen } from "./zoom/MaxScalePropReactNativePdfScreen";

// Types
export type ScenarioCategory = "basic" | "navigation" | "zoom";

export type ScenarioMetadata = {
  id: string;
  name: string;
  description: string;
  category: ScenarioCategory;
  expectedBehavior?: string;
  notes?: string;
  coolPdfScreen: string;
  reactNativePdfScreen: string;
};

// All scenarios metadata
export const allScenarios: ScenarioMetadata[] = [
  // Basic
  {
    ...BasicNoCacheScenario,
    coolPdfScreen: "BasicNoCacheCoolPdf",
    reactNativePdfScreen: "BasicNoCacheReactNativePdf",
  },
  {
    ...BasicWithCacheScenario,
    coolPdfScreen: "BasicWithCacheCoolPdf",
    reactNativePdfScreen: "BasicWithCacheReactNativePdf",
  },
  {
    ...BasicCacheFileNameScenario,
    coolPdfScreen: "BasicCacheFileNameCoolPdf",
    reactNativePdfScreen: "BasicCacheFileNameReactNativePdf",
  },
  {
    ...BasicCacheExpirationScenario,
    coolPdfScreen: "BasicCacheExpirationCoolPdf",
    reactNativePdfScreen: "BasicCacheExpirationReactNativePdf",
  },
  {
    ...CustomHttpMethodScenario,
    coolPdfScreen: "CustomHttpMethodCoolPdf",
    reactNativePdfScreen: "CustomHttpMethodReactNativePdf",
  },
  {
    ...CustomHeadersScenario,
    coolPdfScreen: "CustomHeadersCoolPdf",
    reactNativePdfScreen: "CustomHeadersReactNativePdf",
  },
  {
    ...Base64PdfRenderingScenario,
    coolPdfScreen: "Base64PdfRenderingCoolPdf",
    reactNativePdfScreen: "Base64PdfRenderingReactNativePdf",
  },
  {
    ...RequireLocalPdfScenario,
    coolPdfScreen: "RequireLocalPdfCoolPdf",
    reactNativePdfScreen: "RequireLocalPdfReactNativePdf",
  },

  {
    ...BundleAssetsPdfScenario,
    coolPdfScreen: "BundleAssetsPdfCoolPdf",
    reactNativePdfScreen: "BundleAssetsPdfReactNativePdf",
  },

  {
    ...FileUriLocalPdfScenario,
    coolPdfScreen: "FileUriLocalPdfCoolPdf",
    reactNativePdfScreen: "FileUriLocalPdfReactNativePdf",
  },

  {
    ...OnLoadCompleteScenario,
    coolPdfScreen: "OnLoadCompleteCoolPdf",
    reactNativePdfScreen: "OnLoadCompleteReactNativePdf",
  },

  {
    ...ShowsVerticalScrollIndicatorScenario,
    coolPdfScreen: "ShowsVerticalScrollIndicatorCoolPdf",
    reactNativePdfScreen: "ShowsVerticalScrollIndicatorReactNativePdf",
  },

  {
    ...ScrollEnabledScenario,
    coolPdfScreen: "ScrollEnabledCoolPdf",
    reactNativePdfScreen: "ScrollEnabledReactNativePdf",
  },

  // Navigation
  {
    ...HorizontalScrollingScenario,
    coolPdfScreen: "HorizontalScrollingCoolPdf",
    reactNativePdfScreen: "HorizontalScrollingReactNativePdf",
  },
  {
    ...PageSnappingScenario,
    coolPdfScreen: "PageSnappingCoolPdf",
    reactNativePdfScreen: "PageSnappingReactNativePdf",
  },
  {
    ...HorizontalWithPagingScenario,
    coolPdfScreen: "HorizontalWithPagingCoolPdf",
    reactNativePdfScreen: "HorizontalWithPagingReactNativePdf",
  },
  {
    ...CustomSpacingScenario,
    coolPdfScreen: "CustomSpacingCoolPdf",
    reactNativePdfScreen: "CustomSpacingReactNativePdf",
  },
  {
    ...PagePropScenario,
    coolPdfScreen: "PagePropCoolPdf",
    reactNativePdfScreen: "PagePropReactNativePdf",
  },

  {
    ...SpacingPropScenario,
    coolPdfScreen: "SpacingPropCoolPdf",
    reactNativePdfScreen: "SpacingPropReactNativePdf",
  },

  // Zoom
  {
    ...InitialZoomScenario,
    coolPdfScreen: "InitialZoomCoolPdf",
    reactNativePdfScreen: "InitialZoomReactNativePdf",
  },
  {
    ...CustomZoomRangeScenario,
    coolPdfScreen: "CustomZoomRangeCoolPdf",
    reactNativePdfScreen: "CustomZoomRangeReactNativePdf",
  },
  {
    ...RestrictedZoomScenario,
    coolPdfScreen: "RestrictedZoomCoolPdf",
    reactNativePdfScreen: "RestrictedZoomReactNativePdf",
  },

  {
    ...ScalePropScenario,
    coolPdfScreen: "ScalePropCoolPdf",
    reactNativePdfScreen: "ScalePropReactNativePdf",
  },

  {
    ...MinScalePropScenario,
    coolPdfScreen: "MinScalePropCoolPdf",
    reactNativePdfScreen: "MinScalePropReactNativePdf",
  },

  {
    ...MaxScalePropScenario,
    coolPdfScreen: "MaxScalePropCoolPdf",
    reactNativePdfScreen: "MaxScalePropReactNativePdf",
  },
];

export const scenariosByCategory: Record<ScenarioCategory, ScenarioMetadata[]> =
  {
    basic: allScenarios.filter((s) => s.category === "basic"),
    navigation: allScenarios.filter((s) => s.category === "navigation"),
    zoom: allScenarios.filter((s) => s.category === "zoom"),
  };

export const categoryLabels: Record<ScenarioCategory, string> = {
  basic: "Basic",
  navigation: "Navigation",
  zoom: "Zoom & Scale",
};
