import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StyleSheet } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import ScenarioListScreen from "./screens/ScenarioListScreen";
import {
  BasicWithCacheCoolPdfScreen,
  BasicWithCacheReactNativePdfScreen,
  BasicNoCacheCoolPdfScreen,
  BasicNoCacheReactNativePdfScreen,
  BasicCacheFileNameCoolPdfScreen,
  BasicCacheFileNameReactNativePdfScreen,
  BasicCacheExpirationCoolPdfScreen,
  BasicCacheExpirationReactNativePdfScreen,
  BasicPasswordCoolPdfScreen,
  BasicPasswordReactNativePdfScreen,
  CustomHttpMethodCoolPdfScreen,
  CustomHttpMethodReactNativePdfScreen,
  CustomHeadersCoolPdfScreen,
  CustomHeadersReactNativePdfScreen,
  Base64PdfRenderingCoolPdfScreen,
  Base64PdfRenderingReactNativePdfScreen,
  RequireLocalPdfCoolPdfScreen,
  RequireLocalPdfReactNativePdfScreen,
  BundleAssetsPdfCoolPdfScreen,
  BundleAssetsPdfReactNativePdfScreen,
  FileUriLocalPdfCoolPdfScreen,
  FileUriLocalPdfReactNativePdfScreen,
  OnLoadCompleteCoolPdfScreen,
  OnLoadCompleteReactNativePdfScreen,
  ShowsVerticalScrollIndicatorCoolPdfScreen,
  ShowsVerticalScrollIndicatorReactNativePdfScreen,
  ScrollEnabledCoolPdfScreen,
  ScrollEnabledReactNativePdfScreen,
  StylePropCoolPdfScreen,
  StylePropReactNativePdfScreen,
  ShowsHorizontalScrollIndicatorCoolPdfScreen,
  ShowsHorizontalScrollIndicatorReactNativePdfScreen,
  PasswordPropCoolPdfScreen,
  PasswordPropReactNativePdfScreen,
  PasswordCorrectCoolPdfScreen,
  PasswordCorrectReactNativePdfScreen,
  PasswordIncorrectCoolPdfScreen,
  PasswordIncorrectReactNativePdfScreen,
  HorizontalScrollingCoolPdfScreen,
  HorizontalScrollingReactNativePdfScreen,
  PageSnappingCoolPdfScreen,
  PageSnappingReactNativePdfScreen,
  HorizontalWithPagingCoolPdfScreen,
  HorizontalWithPagingReactNativePdfScreen,
  CustomSpacingCoolPdfScreen,
  CustomSpacingReactNativePdfScreen,
  PagePropCoolPdfScreen,
  PagePropReactNativePdfScreen,
  EnablePagingPropCoolPdfScreen,
  EnablePagingPropReactNativePdfScreen,
  HorizontalPropCoolPdfScreen,
  HorizontalPropReactNativePdfScreen,
  EnableRtlPropCoolPdfScreen,
  EnableRtlPropReactNativePdfScreen,
  InitialZoomCoolPdfScreen,
  InitialZoomReactNativePdfScreen,
  CustomZoomRangeCoolPdfScreen,
  CustomZoomRangeReactNativePdfScreen,
  RestrictedZoomCoolPdfScreen,
  RestrictedZoomReactNativePdfScreen,
  ScalePropCoolPdfScreen,
  ScalePropReactNativePdfScreen,
  MinScalePropCoolPdfScreen,
  MinScalePropReactNativePdfScreen,
  MaxScalePropCoolPdfScreen,
  MaxScalePropReactNativePdfScreen,
  FitPolicyPropCoolPdfScreen,
  FitPolicyPropReactNativePdfScreen,
  EnableDoubleTapZoomPropCoolPdfScreen,
  EnableDoubleTapZoomPropReactNativePdfScreen,
  SinglePageCoolPdfScreen,
  SinglePageReactNativePdfScreen,
  OnLoadProgressCoolPdfScreen,
  OnLoadProgressReactNativePdfScreen,
  OnPageChangedCoolPdfScreen,
  OnPageChangedReactNativePdfScreen,
  OnErrorCoolPdfScreen,
  OnErrorReactNativePdfScreen,
  OnPageSingleTapCoolPdfScreen,
  OnPageSingleTapReactNativePdfScreen,
  OnScaleChangedCoolPdfScreen,
  OnScaleChangedReactNativePdfScreen,
  OnPressLinkCoolPdfScreen,
  OnPressLinkReactNativePdfScreen,
  RenderActivityIndicatorCoolPdfScreen,
  RenderActivityIndicatorReactNativePdfScreen,
  ProgressContainerStyleCoolPdfScreen,
  ProgressContainerStyleReactNativePdfScreen,
  EnableAnnotationsCoolPdfScreen,
  EnableAnnotationsReactNativePdfScreen,
  DisableAnnotationsCoolPdfScreen,
  DisableAnnotationsReactNativePdfScreen,
} from "./screens/scenarios";

type RootStackParamList = {
  Home: undefined;
  CoolPdf: undefined;
  ReactNativePdf: undefined;
  ScenarioList: undefined;
  BasicWithCacheCoolPdf: undefined;
  BasicWithCacheReactNativePdf: undefined;
  BasicCacheFileNameCoolPdf: undefined;
  BasicCacheFileNameReactNativePdf: undefined;
  BasicCacheExpirationCoolPdf: undefined;
  BasicCacheExpirationReactNativePdf: undefined;
  BasicNoCacheCoolPdf: undefined;
  BasicNoCacheReactNativePdf: undefined;
  BasicPasswordCoolPdf: undefined;
  BasicPasswordReactNativePdf: undefined;
  CustomHttpMethodCoolPdf: undefined;
  CustomHttpMethodReactNativePdf: undefined;
  CustomHeadersCoolPdf: undefined;
  CustomHeadersReactNativePdf: undefined;

  Base64PdfRenderingCoolPdf: undefined;
  Base64PdfRenderingReactNativePdf: undefined;

  RequireLocalPdfCoolPdf: undefined;
  RequireLocalPdfReactNativePdf: undefined;

  BundleAssetsPdfCoolPdf: undefined;
  BundleAssetsPdfReactNativePdf: undefined;

  FileUriLocalPdfCoolPdf: undefined;
  FileUriLocalPdfReactNativePdf: undefined;

  OnLoadCompleteCoolPdf: undefined;
  OnLoadCompleteReactNativePdf: undefined;

  ShowsVerticalScrollIndicatorCoolPdf: undefined;
  ShowsVerticalScrollIndicatorReactNativePdf: undefined;

  ScrollEnabledCoolPdf: undefined;
  ScrollEnabledReactNativePdf: undefined;

  StylePropCoolPdf: undefined;
  StylePropReactNativePdf: undefined;

  ShowsHorizontalScrollIndicatorCoolPdf: undefined;
  ShowsHorizontalScrollIndicatorReactNativePdf: undefined;

  PasswordPropCoolPdf: undefined;
  PasswordPropReactNativePdf: undefined;

  PasswordCorrectCoolPdf: undefined;
  PasswordCorrectReactNativePdf: undefined;

  PasswordIncorrectCoolPdf: undefined;
  PasswordIncorrectReactNativePdf: undefined;

  HorizontalScrollingCoolPdf: undefined;
  HorizontalScrollingReactNativePdf: undefined;
  PageSnappingCoolPdf: undefined;
  PageSnappingReactNativePdf: undefined;
  HorizontalWithPagingCoolPdf: undefined;
  HorizontalWithPagingReactNativePdf: undefined;
  CustomSpacingCoolPdf: undefined;
  CustomSpacingReactNativePdf: undefined;
  PagePropCoolPdf: undefined;
  PagePropReactNativePdf: undefined;

  EnablePagingPropCoolPdf: undefined;
  EnablePagingPropReactNativePdf: undefined;

  HorizontalPropCoolPdf: undefined;
  HorizontalPropReactNativePdf: undefined;

  EnableRtlPropCoolPdf: undefined;
  EnableRtlPropReactNativePdf: undefined;

  InitialZoomCoolPdf: undefined;
  InitialZoomReactNativePdf: undefined;
  CustomZoomRangeCoolPdf: undefined;
  CustomZoomRangeReactNativePdf: undefined;
  RestrictedZoomCoolPdf: undefined;
  RestrictedZoomReactNativePdf: undefined;

  ScalePropCoolPdf: undefined;
  ScalePropReactNativePdf: undefined;

  MinScalePropCoolPdf: undefined;
  MinScalePropReactNativePdf: undefined;

  MaxScalePropCoolPdf: undefined;
  MaxScalePropReactNativePdf: undefined;

  FitPolicyPropCoolPdf: undefined;
  FitPolicyPropReactNativePdf: undefined;

  EnableDoubleTapZoomPropCoolPdf: undefined;
  EnableDoubleTapZoomPropReactNativePdf: undefined;
  SinglePageCoolPdf: undefined;
  SinglePageReactNativePdf: undefined;
  OnLoadProgressCoolPdf: undefined;
  OnLoadProgressReactNativePdf: undefined;
  OnPageChangedCoolPdf: undefined;
  OnPageChangedReactNativePdf: undefined;
  OnErrorCoolPdf: undefined;
  OnErrorReactNativePdf: undefined;
  OnPageSingleTapCoolPdf: undefined;
  OnPageSingleTapReactNativePdf: undefined;
  OnScaleChangedCoolPdf: undefined;
  OnScaleChangedReactNativePdf: undefined;
  OnPressLinkCoolPdf: undefined;
  OnPressLinkReactNativePdf: undefined;
  RenderActivityIndicatorCoolPdf: undefined;
  RenderActivityIndicatorReactNativePdf: undefined;
  ProgressContainerStyleCoolPdf: undefined;
  ProgressContainerStyleReactNativePdf: undefined;
  EnableAnnotationsCoolPdf: undefined;
  EnableAnnotationsReactNativePdf: undefined;
  DisableAnnotationsCoolPdf: undefined;
  DisableAnnotationsReactNativePdf: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const linking = {
  prefixes: ['coolpdf://', 'expo.modules.coolpdf.example://'],
  config: {
    screens: {
      ScenarioList: 'scenarios',
      BasicNoCacheCoolPdf: 'basic-no-cache-cool',
      BasicNoCacheReactNativePdf: 'basic-no-cache-rnpdf',
      BasicWithCacheCoolPdf: 'basic-with-cache-cool',
      BasicWithCacheReactNativePdf: 'basic-with-cache-rnpdf',
      BasicCacheFileNameCoolPdf: 'basic-cache-filename-cool',
      BasicCacheFileNameReactNativePdf: 'basic-cache-filename-rnpdf',
      // Add more as needed
    },
  },
};

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer linking={linking} fallback={null}>
        <Stack.Navigator initialRouteName="ScenarioList">
          <Stack.Screen
            name="ScenarioList"
            component={ScenarioListScreen}
            options={{ title: "Test Scenarios" }}
          />

          {/* Basic scenarios */}
          <Stack.Screen
            name="BasicWithCacheCoolPdf"
            component={BasicWithCacheCoolPdfScreen}
            options={{ title: "Load PDF from URL" }}
          />
          <Stack.Screen
            name="BasicWithCacheReactNativePdf"
            component={BasicWithCacheReactNativePdfScreen}
            options={{ title: "Load PDF from URL" }}
          />
          <Stack.Screen
            name="BasicNoCacheCoolPdf"
            component={BasicNoCacheCoolPdfScreen}
            options={{ title: "No Cache" }}
          />
          <Stack.Screen
            name="BasicNoCacheReactNativePdf"
            component={BasicNoCacheReactNativePdfScreen}
            options={{ title: "No Cache" }}
          />
          <Stack.Screen
            name="BasicCacheFileNameCoolPdf"
            component={BasicCacheFileNameCoolPdfScreen}
            options={{
              title: "Load PDF from URL with Custom Cache Filename",
            }}
          />
          <Stack.Screen
            name="BasicCacheFileNameReactNativePdf"
            component={BasicCacheFileNameReactNativePdfScreen}
            options={{
              title: "Load PDF from URL with Custom Cache Filename",
            }}
          />
          <Stack.Screen
            name="BasicCacheExpirationCoolPdf"
            component={BasicCacheExpirationCoolPdfScreen}
            options={{ title: "Cache Expiration" }}
          />
          <Stack.Screen
            name="BasicCacheExpirationReactNativePdf"
            component={BasicCacheExpirationReactNativePdfScreen}
            options={{ title: "Cache Expiration" }}
          />
          <Stack.Screen
            name="BasicPasswordCoolPdf"
            component={BasicPasswordCoolPdfScreen}
            options={{ title: "Password Protected" }}
          />
          <Stack.Screen
            name="BasicPasswordReactNativePdf"
            component={BasicPasswordReactNativePdfScreen}
            options={{ title: "Password Protected" }}
          />
          <Stack.Screen
            name="CustomHttpMethodCoolPdf"
            component={CustomHttpMethodCoolPdfScreen}
            options={{ title: "Custom HTTP Method" }}
          />
          <Stack.Screen
            name="CustomHttpMethodReactNativePdf"
            component={CustomHttpMethodReactNativePdfScreen}
            options={{ title: "Custom HTTP Method" }}
          />
          <Stack.Screen
            name="CustomHeadersCoolPdf"
            component={CustomHeadersCoolPdfScreen}
            options={{ title: "Custom Headers" }}
          />
          <Stack.Screen
            name="CustomHeadersReactNativePdf"
            component={CustomHeadersReactNativePdfScreen}
            options={{ title: "Custom Headers" }}
          />
          <Stack.Screen
            name="Base64PdfRenderingCoolPdf"
            component={Base64PdfRenderingCoolPdfScreen}
            options={{ title: "Base64 PDF Rendering" }}
          />
          <Stack.Screen
            name="Base64PdfRenderingReactNativePdf"
            component={Base64PdfRenderingReactNativePdfScreen}
            options={{ title: "Base64 PDF Rendering" }}
          />
          <Stack.Screen
            name="RequireLocalPdfCoolPdf"
            component={RequireLocalPdfCoolPdfScreen}
            options={{ title: "Require Local PDF" }}
          />
          <Stack.Screen
            name="RequireLocalPdfReactNativePdf"
            component={RequireLocalPdfReactNativePdfScreen}
            options={{ title: "Require Local PDF" }}
          />
          <Stack.Screen
            name="BundleAssetsPdfCoolPdf"
            component={BundleAssetsPdfCoolPdfScreen}
            options={{ title: "Bundle Assets PDF" }}
          />
          <Stack.Screen
            name="BundleAssetsPdfReactNativePdf"
            component={BundleAssetsPdfReactNativePdfScreen}
            options={{ title: "Bundle Assets PDF" }}
          />
          <Stack.Screen
            name="FileUriLocalPdfCoolPdf"
            component={FileUriLocalPdfCoolPdfScreen}
            options={{ title: "File URI Local PDF" }}
          />
          <Stack.Screen
            name="FileUriLocalPdfReactNativePdf"
            component={FileUriLocalPdfReactNativePdfScreen}
            options={{ title: "File URI Local PDF" }}
          />
          <Stack.Screen
            name="OnLoadCompleteCoolPdf"
            component={OnLoadCompleteCoolPdfScreen}
            options={{ title: "On Load Complete" }}
          />
          <Stack.Screen
            name="OnLoadCompleteReactNativePdf"
            component={OnLoadCompleteReactNativePdfScreen}
            options={{ title: "On Load Complete" }}
          />
          <Stack.Screen
            name="ShowsVerticalScrollIndicatorCoolPdf"
            component={ShowsVerticalScrollIndicatorCoolPdfScreen}
            options={{ title: "Shows Vertical Scroll Indicator" }}
          />
          <Stack.Screen
            name="ShowsVerticalScrollIndicatorReactNativePdf"
            component={ShowsVerticalScrollIndicatorReactNativePdfScreen}
            options={{ title: "Shows Vertical Scroll Indicator" }}
          />
          <Stack.Screen
            name="ScrollEnabledCoolPdf"
            component={ScrollEnabledCoolPdfScreen}
            options={{ title: "Scroll Enabled" }}
          />
          <Stack.Screen
            name="ScrollEnabledReactNativePdf"
            component={ScrollEnabledReactNativePdfScreen}
            options={{ title: "Scroll Enabled" }}
          />
          <Stack.Screen
            name="StylePropCoolPdf"
            component={StylePropCoolPdfScreen}
            options={{ title: "Style Prop" }}
          />
          <Stack.Screen
            name="StylePropReactNativePdf"
            component={StylePropReactNativePdfScreen}
            options={{ title: "Style Prop" }}
          />
          <Stack.Screen
            name="ShowsHorizontalScrollIndicatorCoolPdf"
            component={ShowsHorizontalScrollIndicatorCoolPdfScreen}
            options={{ title: "Shows Horizontal Scroll Indicator" }}
          />
          <Stack.Screen
            name="ShowsHorizontalScrollIndicatorReactNativePdf"
            component={ShowsHorizontalScrollIndicatorReactNativePdfScreen}
            options={{ title: "Shows Horizontal Scroll Indicator" }}
          />
          <Stack.Screen
            name="PasswordPropCoolPdf"
            component={PasswordPropCoolPdfScreen}
            options={{ title: "Password Prop" }}
          />
          <Stack.Screen
            name="PasswordPropReactNativePdf"
            component={PasswordPropReactNativePdfScreen}
            options={{ title: "Password Prop" }}
          />
          <Stack.Screen
            name="PasswordCorrectCoolPdf"
            component={PasswordCorrectCoolPdfScreen}
            options={{ title: "Password Correct" }}
          />
          <Stack.Screen
            name="PasswordCorrectReactNativePdf"
            component={PasswordCorrectReactNativePdfScreen}
            options={{ title: "Password Correct" }}
          />
          <Stack.Screen
            name="PasswordIncorrectCoolPdf"
            component={PasswordIncorrectCoolPdfScreen}
            options={{ title: "Password Incorrect" }}
          />
          <Stack.Screen
            name="PasswordIncorrectReactNativePdf"
            component={PasswordIncorrectReactNativePdfScreen}
            options={{ title: "Password Incorrect" }}
          />

          {/* Navigation scenarios */}
          <Stack.Screen
            name="HorizontalScrollingCoolPdf"
            component={HorizontalScrollingCoolPdfScreen}
            options={{ title: "Horizontal Scrolling" }}
          />
          <Stack.Screen
            name="HorizontalScrollingReactNativePdf"
            component={HorizontalScrollingReactNativePdfScreen}
            options={{ title: "Horizontal Scrolling" }}
          />
          <Stack.Screen
            name="PageSnappingCoolPdf"
            component={PageSnappingCoolPdfScreen}
            options={{ title: "Page Snapping" }}
          />
          <Stack.Screen
            name="PageSnappingReactNativePdf"
            component={PageSnappingReactNativePdfScreen}
            options={{ title: "Page Snapping" }}
          />
          <Stack.Screen
            name="HorizontalWithPagingCoolPdf"
            component={HorizontalWithPagingCoolPdfScreen}
            options={{ title: "Horizontal + Paging" }}
          />
          <Stack.Screen
            name="HorizontalWithPagingReactNativePdf"
            component={HorizontalWithPagingReactNativePdfScreen}
            options={{ title: "Horizontal + Paging" }}
          />
          <Stack.Screen
            name="CustomSpacingCoolPdf"
            component={CustomSpacingCoolPdfScreen}
            options={{ title: "Custom Spacing" }}
          />
          <Stack.Screen
            name="CustomSpacingReactNativePdf"
            component={CustomSpacingReactNativePdfScreen}
            options={{ title: "Custom Spacing" }}
          />
          <Stack.Screen
            name="PagePropCoolPdf"
            component={PagePropCoolPdfScreen}
            options={{ title: "Page Prop" }}
          />
          <Stack.Screen
            name="PagePropReactNativePdf"
            component={PagePropReactNativePdfScreen}
            options={{ title: "Page Prop" }}
          />
          <Stack.Screen
            name="EnablePagingPropCoolPdf"
            component={EnablePagingPropCoolPdfScreen}
            options={{ title: "Enable Paging Prop" }}
          />
          <Stack.Screen
            name="EnablePagingPropReactNativePdf"
            component={EnablePagingPropReactNativePdfScreen}
            options={{ title: "Enable Paging Prop" }}
          />
          <Stack.Screen
            name="HorizontalPropCoolPdf"
            component={HorizontalPropCoolPdfScreen}
            options={{ title: "Horizontal Prop" }}
          />
          <Stack.Screen
            name="HorizontalPropReactNativePdf"
            component={HorizontalPropReactNativePdfScreen}
            options={{ title: "Horizontal Prop" }}
          />
          <Stack.Screen
            name="EnableRtlPropCoolPdf"
            component={EnableRtlPropCoolPdfScreen}
            options={{ title: "Enable RTL Prop" }}
          />
          <Stack.Screen
            name="EnableRtlPropReactNativePdf"
            component={EnableRtlPropReactNativePdfScreen}
            options={{ title: "Enable RTL Prop" }}
          />

          {/* Zoom scenarios */}
          <Stack.Screen
            name="InitialZoomCoolPdf"
            component={InitialZoomCoolPdfScreen}
            options={{ title: "Initial Zoom" }}
          />
          <Stack.Screen
            name="InitialZoomReactNativePdf"
            component={InitialZoomReactNativePdfScreen}
            options={{ title: "Initial Zoom" }}
          />
          <Stack.Screen
            name="CustomZoomRangeCoolPdf"
            component={CustomZoomRangeCoolPdfScreen}
            options={{ title: "Custom Zoom Range" }}
          />
          <Stack.Screen
            name="CustomZoomRangeReactNativePdf"
            component={CustomZoomRangeReactNativePdfScreen}
            options={{ title: "Custom Zoom Range" }}
          />
          <Stack.Screen
            name="RestrictedZoomCoolPdf"
            component={RestrictedZoomCoolPdfScreen}
            options={{ title: "Restricted Zoom" }}
          />
          <Stack.Screen
            name="RestrictedZoomReactNativePdf"
            component={RestrictedZoomReactNativePdfScreen}
            options={{ title: "Restricted Zoom" }}
          />

          <Stack.Screen
            name="ScalePropCoolPdf"
            component={ScalePropCoolPdfScreen}
            options={{ title: "Scale Prop" }}
          />
          <Stack.Screen
            name="ScalePropReactNativePdf"
            component={ScalePropReactNativePdfScreen}
            options={{ title: "Scale Prop" }}
          />

          <Stack.Screen
            name="MinScalePropCoolPdf"
            component={MinScalePropCoolPdfScreen}
            options={{ title: "Min Scale Prop" }}
          />
          <Stack.Screen
            name="MinScalePropReactNativePdf"
            component={MinScalePropReactNativePdfScreen}
            options={{ title: "Min Scale Prop" }}
          />

          <Stack.Screen
            name="MaxScalePropCoolPdf"
            component={MaxScalePropCoolPdfScreen}
            options={{ title: "Max Scale Prop" }}
          />
          <Stack.Screen
            name="MaxScalePropReactNativePdf"
            component={MaxScalePropReactNativePdfScreen}
            options={{ title: "Max Scale Prop" }}
          />

          <Stack.Screen
            name="FitPolicyPropCoolPdf"
            component={FitPolicyPropCoolPdfScreen}
            options={{ title: "Fit Policy Prop" }}
          />
          <Stack.Screen
            name="FitPolicyPropReactNativePdf"
            component={FitPolicyPropReactNativePdfScreen}
            options={{ title: "Fit Policy Prop" }}
          />

          <Stack.Screen
            name="EnableDoubleTapZoomPropCoolPdf"
            component={EnableDoubleTapZoomPropCoolPdfScreen}
            options={{ title: "Enable Double Tap Zoom Prop" }}
          />
          <Stack.Screen
            name="EnableDoubleTapZoomPropReactNativePdf"
            component={EnableDoubleTapZoomPropReactNativePdfScreen}
            options={{ title: "Enable Double Tap Zoom Prop" }}
          />
                  <Stack.Screen
            name="SinglePageCoolPdf"
            component={SinglePageCoolPdfScreen}
            options={{ title: "Single Page" }}
          />
          <Stack.Screen
            name="SinglePageReactNativePdf"
            component={SinglePageReactNativePdfScreen}
            options={{ title: "Single Page" }}
          />
          <Stack.Screen
            name="OnLoadProgressCoolPdf"
            component={OnLoadProgressCoolPdfScreen}
            options={{ title: "On Load Progress" }}
          />
          <Stack.Screen
            name="OnLoadProgressReactNativePdf"
            component={OnLoadProgressReactNativePdfScreen}
            options={{ title: "On Load Progress" }}
          />
          <Stack.Screen
            name="OnPageChangedCoolPdf"
            component={OnPageChangedCoolPdfScreen}
            options={{ title: "On Page Changed" }}
          />
          <Stack.Screen
            name="OnPageChangedReactNativePdf"
            component={OnPageChangedReactNativePdfScreen}
            options={{ title: "On Page Changed" }}
          />
          <Stack.Screen
            name="OnErrorCoolPdf"
            component={OnErrorCoolPdfScreen}
            options={{ title: "On Error" }}
          />
          <Stack.Screen
            name="OnErrorReactNativePdf"
            component={OnErrorReactNativePdfScreen}
            options={{ title: "On Error" }}
          />
          <Stack.Screen
            name="OnPageSingleTapCoolPdf"
            component={OnPageSingleTapCoolPdfScreen}
            options={{ title: "On Page Single Tap" }}
          />
          <Stack.Screen
            name="OnPageSingleTapReactNativePdf"
            component={OnPageSingleTapReactNativePdfScreen}
            options={{ title: "On Page Single Tap" }}
          />
          <Stack.Screen
            name="OnScaleChangedCoolPdf"
            component={OnScaleChangedCoolPdfScreen}
            options={{ title: "On Scale Changed" }}
          />
          <Stack.Screen
            name="OnScaleChangedReactNativePdf"
            component={OnScaleChangedReactNativePdfScreen}
            options={{ title: "On Scale Changed" }}
          />
          <Stack.Screen
            name="OnPressLinkCoolPdf"
            component={OnPressLinkCoolPdfScreen}
            options={{ title: "On Press Link" }}
          />
          <Stack.Screen
            name="OnPressLinkReactNativePdf"
            component={OnPressLinkReactNativePdfScreen}
            options={{ title: "On Press Link" }}
          />
          <Stack.Screen
            name="RenderActivityIndicatorCoolPdf"
            component={RenderActivityIndicatorCoolPdfScreen}
            options={{ title: "Render Activity Indicator" }}
          />
          <Stack.Screen
            name="RenderActivityIndicatorReactNativePdf"
            component={RenderActivityIndicatorReactNativePdfScreen}
            options={{ title: "Render Activity Indicator" }}
          />
          <Stack.Screen
            name="ProgressContainerStyleCoolPdf"
            component={ProgressContainerStyleCoolPdfScreen}
            options={{ title: "Progress Container Style" }}
          />
          <Stack.Screen
            name="ProgressContainerStyleReactNativePdf"
            component={ProgressContainerStyleReactNativePdfScreen}
            options={{ title: "Progress Container Style" }}
          />
          <Stack.Screen
            name="EnableAnnotationsCoolPdf"
            component={EnableAnnotationsCoolPdfScreen}
            options={{ title: "Enable Annotations" }}
          />
          <Stack.Screen
            name="EnableAnnotationsReactNativePdf"
            component={EnableAnnotationsReactNativePdfScreen}
            options={{ title: "Enable Annotations" }}
          />
          <Stack.Screen
            name="DisableAnnotationsCoolPdf"
            component={DisableAnnotationsCoolPdfScreen}
            options={{ title: "Disable Annotations" }}
          />
          <Stack.Screen
            name="DisableAnnotationsReactNativePdf"
            component={DisableAnnotationsReactNativePdfScreen}
            options={{ title: "Disable Annotations" }}
          />
</Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  homeContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#333",
  },
});
