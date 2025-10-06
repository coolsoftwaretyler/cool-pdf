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
import { FitPolicyPropScenario } from "./zoom/FitPolicyProp";
import { StylePropScenario } from "./basic/StyleProp";
import { EnablePagingPropScenario } from "./navigation/EnablePagingProp";
import { HorizontalPropScenario } from "./navigation/HorizontalProp";
import { ShowsHorizontalScrollIndicatorScenario } from "./basic/ShowsHorizontalScrollIndicator";
import { PasswordPropScenario } from "./basic/PasswordProp";
import { PasswordCorrectScenario } from "./basic/PasswordCorrect";
import { PasswordIncorrectScenario } from "./basic/PasswordIncorrect";
import { EnableDoubleTapZoomPropScenario } from "./zoom/EnableDoubleTapZoomProp";
import { EnableRtlPropScenario } from "./navigation/EnableRtlProp";
import { SinglePageScenario } from "./navigation/SinglePage";
import { OnLoadProgressScenario } from "./events/OnLoadProgress";
import { OnPageChangedScenario } from "./events/OnPageChanged";
import { OnErrorScenario } from "./events/OnError";
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
  StylePropScenario,
  ShowsHorizontalScrollIndicatorScenario,
  PasswordPropScenario,
  PasswordCorrectScenario,
  PasswordIncorrectScenario,
};
export {
  HorizontalScrollingScenario,
  PageSnappingScenario,
  HorizontalWithPagingScenario,
  CustomSpacingScenario,
  PagePropScenario,
  SpacingPropScenario,
  EnablePagingPropScenario,
  HorizontalPropScenario,
  EnableRtlPropScenario,
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

export { default as StylePropCoolPdfScreen } from "./basic/StylePropCoolPdfScreen";
export { default as StylePropReactNativePdfScreen } from "./basic/StylePropReactNativePdfScreen";

export { default as ShowsHorizontalScrollIndicatorCoolPdfScreen } from "./basic/ShowsHorizontalScrollIndicatorCoolPdfScreen";
export { default as ShowsHorizontalScrollIndicatorReactNativePdfScreen } from "./basic/ShowsHorizontalScrollIndicatorReactNativePdfScreen";

export { default as PasswordPropCoolPdfScreen } from "./basic/PasswordPropCoolPdfScreen";
export { default as PasswordPropReactNativePdfScreen } from "./basic/PasswordPropReactNativePdfScreen";

export { default as PasswordCorrectCoolPdfScreen } from "./basic/PasswordCorrectCoolPdfScreen";
export { default as PasswordCorrectReactNativePdfScreen } from "./basic/PasswordCorrectReactNativePdfScreen";

export { default as PasswordIncorrectCoolPdfScreen } from "./basic/PasswordIncorrectCoolPdfScreen";
export { default as PasswordIncorrectReactNativePdfScreen } from "./basic/PasswordIncorrectReactNativePdfScreen";

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

export { default as EnablePagingPropCoolPdfScreen } from "./navigation/EnablePagingPropCoolPdfScreen";
export { default as EnablePagingPropReactNativePdfScreen } from "./navigation/EnablePagingPropReactNativePdfScreen";

export { default as HorizontalPropCoolPdfScreen } from "./navigation/HorizontalPropCoolPdfScreen";
export { default as HorizontalPropReactNativePdfScreen } from "./navigation/HorizontalPropReactNativePdfScreen";

export { default as EnableRtlPropCoolPdfScreen } from "./navigation/EnableRtlPropCoolPdfScreen";
export { default as EnableRtlPropReactNativePdfScreen } from "./navigation/EnableRtlPropReactNativePdfScreen";

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

export { default as FitPolicyPropCoolPdfScreen } from "./zoom/FitPolicyPropCoolPdfScreen";
export { default as FitPolicyPropReactNativePdfScreen } from "./zoom/FitPolicyPropReactNativePdfScreen";

export { default as EnableDoubleTapZoomPropCoolPdfScreen } from "./zoom/EnableDoubleTapZoomPropCoolPdfScreen";
export { default as EnableDoubleTapZoomPropReactNativePdfScreen } from "./zoom/EnableDoubleTapZoomPropReactNativePdfScreen";

export { default as SinglePageCoolPdfScreen } from "./navigation/SinglePageCoolPdfScreen";
export { default as SinglePageReactNativePdfScreen } from "./navigation/SinglePageReactNativePdfScreen";

export { default as OnLoadProgressCoolPdfScreen } from "./events/OnLoadProgressCoolPdfScreen";
export { default as OnLoadProgressReactNativePdfScreen } from "./events/OnLoadProgressReactNativePdfScreen";

export { default as OnPageChangedCoolPdfScreen } from "./events/OnPageChangedCoolPdfScreen";
export { default as OnPageChangedReactNativePdfScreen } from "./events/OnPageChangedReactNativePdfScreen";

export { default as OnErrorCoolPdfScreen } from "./events/OnErrorCoolPdfScreen";
export { default as OnErrorReactNativePdfScreen } from "./events/OnErrorReactNativePdfScreen";

// Types
export type ScenarioCategory =
  | "loading"
  | "events"
  | "style"
  | "password"
  | "navigation"
  | "zoom";

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
    ...StylePropScenario,
    coolPdfScreen: "StylePropCoolPdf",
    reactNativePdfScreen: "StylePropReactNativePdf",
  },
  {
    ...ShowsVerticalScrollIndicatorScenario,
    coolPdfScreen: "ShowsVerticalScrollIndicatorCoolPdf",
    reactNativePdfScreen: "ShowsVerticalScrollIndicatorReactNativePdf",
  },
  {
    ...ShowsHorizontalScrollIndicatorScenario,
    coolPdfScreen: "ShowsHorizontalScrollIndicatorCoolPdf",
    reactNativePdfScreen: "ShowsHorizontalScrollIndicatorReactNativePdf",
  },
  {
    ...CustomSpacingScenario,
    coolPdfScreen: "CustomSpacingCoolPdf",
    reactNativePdfScreen: "CustomSpacingReactNativePdf",
  },
  {
    ...ScrollEnabledScenario,
    coolPdfScreen: "ScrollEnabledCoolPdf",
    reactNativePdfScreen: "ScrollEnabledReactNativePdf",
  },
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
    ...PagePropScenario,
    coolPdfScreen: "PagePropCoolPdf",
    reactNativePdfScreen: "PagePropReactNativePdf",
  },
  {
    ...EnablePagingPropScenario,
    coolPdfScreen: "EnablePagingPropCoolPdf",
    reactNativePdfScreen: "EnablePagingPropReactNativePdf",
  },
  {
    ...HorizontalPropScenario,
    coolPdfScreen: "HorizontalPropCoolPdf",
    reactNativePdfScreen: "HorizontalPropReactNativePdf",
  },
  {
    ...EnableRtlPropScenario,
    coolPdfScreen: "EnableRtlPropCoolPdf",
    reactNativePdfScreen: "EnableRtlPropReactNativePdf",
  },
  {
    ...PasswordCorrectScenario,
    coolPdfScreen: "PasswordCorrectCoolPdf",
    reactNativePdfScreen: "PasswordCorrectReactNativePdf",
  },
  {
    ...PasswordIncorrectScenario,
    coolPdfScreen: "PasswordIncorrectCoolPdf",
    reactNativePdfScreen: "PasswordIncorrectReactNativePdf",
  },
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
  {
    ...FitPolicyPropScenario,
    coolPdfScreen: "FitPolicyPropCoolPdf",
    reactNativePdfScreen: "FitPolicyPropReactNativePdf",
  },
  {
    ...EnableDoubleTapZoomPropScenario,
    coolPdfScreen: "EnableDoubleTapZoomPropCoolPdf",
    reactNativePdfScreen: "EnableDoubleTapZoomPropReactNativePdf",
  },
  {
    ...SinglePageScenario,
    coolPdfScreen: "SinglePageCoolPdf",
    reactNativePdfScreen: "SinglePageReactNativePdf",
  },
  {
    ...OnLoadProgressScenario,
    coolPdfScreen: "OnLoadProgressCoolPdf",
    reactNativePdfScreen: "OnLoadProgressReactNativePdf",
  },
  {
    ...OnPageChangedScenario,
    coolPdfScreen: "OnPageChangedCoolPdf",
    reactNativePdfScreen: "OnPageChangedReactNativePdf",
  },
  {
    ...OnErrorScenario,
    coolPdfScreen: "OnErrorCoolPdf",
    reactNativePdfScreen: "OnErrorReactNativePdf",
  },
];

export const scenariosByCategory: Record<ScenarioCategory, ScenarioMetadata[]> =
  {
    loading: allScenarios.filter((s) => s.category === "loading"),
    password: allScenarios.filter((s) => s.category === "password"),
    navigation: allScenarios.filter((s) => s.category === "navigation"),
    zoom: allScenarios.filter((s) => s.category === "zoom"),
    events: allScenarios.filter((s) => s.category === "events"),
    style: allScenarios.filter((s) => s.category === "style"),
  };

export const categoryLabels: Record<ScenarioCategory, string> = {
  loading: "Loading",
  password: "Password",
  navigation: "Navigation",
  zoom: "Zoom & Scale",
  events: "Events",
  style: "Style",
};
