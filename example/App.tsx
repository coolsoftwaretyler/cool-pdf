import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Button, View, StyleSheet, Text } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import CoolPdfScreen from "./screens/CoolPdfScreen";
import ReactNativePdfScreen from "./screens/ReactNativePdfScreen";
import ScenarioListScreen from "./screens/ScenarioListScreen";
import {
  // Basic scenarios
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
  // Navigation scenarios
  HorizontalScrollingCoolPdfScreen,
  HorizontalScrollingReactNativePdfScreen,
  PageSnappingCoolPdfScreen,
  PageSnappingReactNativePdfScreen,
  HorizontalWithPagingCoolPdfScreen,
  HorizontalWithPagingReactNativePdfScreen,
  CustomSpacingCoolPdfScreen,
  CustomSpacingReactNativePdfScreen,
  // Zoom scenarios
  InitialZoomCoolPdfScreen,
  InitialZoomReactNativePdfScreen,
  CustomZoomRangeCoolPdfScreen,
  CustomZoomRangeReactNativePdfScreen,
  RestrictedZoomCoolPdfScreen,
  RestrictedZoomReactNativePdfScreen,
} from "./screens/scenarios";

type RootStackParamList = {
  Home: undefined;
  CoolPdf: undefined;
  ReactNativePdf: undefined;
  ScenarioList: undefined;
  // Basic scenarios
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
  // Navigation scenarios
  HorizontalScrollingCoolPdf: undefined;
  HorizontalScrollingReactNativePdf: undefined;
  PageSnappingCoolPdf: undefined;
  PageSnappingReactNativePdf: undefined;
  HorizontalWithPagingCoolPdf: undefined;
  HorizontalWithPagingReactNativePdf: undefined;
  CustomSpacingCoolPdf: undefined;
  CustomSpacingReactNativePdf: undefined;
  // Zoom scenarios
  InitialZoomCoolPdf: undefined;
  InitialZoomReactNativePdf: undefined;
  CustomZoomRangeCoolPdf: undefined;
  CustomZoomRangeReactNativePdf: undefined;
  RestrictedZoomCoolPdf: undefined;
  RestrictedZoomReactNativePdf: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function HomeScreen({ navigation }: any) {
  return (
    <View style={styles.homeContainer}>
      <Text style={styles.sectionTitle}>Basic Demos</Text>
      <Button
        title="View with CoolPDF"
        onPress={() => navigation.navigate("CoolPdf")}
      />
      <View style={{ height: 12 }} />
      <Button
        title="View with react-native-pdf"
        onPress={() => navigation.navigate("ReactNativePdf")}
      />

      <View style={{ height: 32 }} />

      <Text style={styles.sectionTitle}>Test Scenarios</Text>
      <Button
        title="Browse Scenarios"
        onPress={() => navigation.navigate("ScenarioList")}
        color="#5856d6"
      />
    </View>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ title: "PDF Viewer Examples" }}
          />
          <Stack.Screen
            name="CoolPdf"
            component={CoolPdfScreen}
            options={{ title: "CoolPDF" }}
          />
          <Stack.Screen
            name="ReactNativePdf"
            component={ReactNativePdfScreen}
            options={{ title: "react-native-pdf" }}
          />
          <Stack.Screen
            name="ScenarioList"
            component={ScenarioListScreen}
            options={{ title: "Test Scenarios" }}
          />

          {/* Basic scenarios */}
          <Stack.Screen
            name="BasicWithCacheCoolPdf"
            component={BasicWithCacheCoolPdfScreen}
            options={{ title: "Load PDF from URL (CoolPDF)" }}
          />
          <Stack.Screen
            name="BasicWithCacheReactNativePdf"
            component={BasicWithCacheReactNativePdfScreen}
            options={{ title: "Load PDF from URL (RN-PDF)" }}
          />
          <Stack.Screen
            name="BasicNoCacheCoolPdf"
            component={BasicNoCacheCoolPdfScreen}
            options={{ title: "No Cache (CoolPDF)" }}
          />
          <Stack.Screen
            name="BasicNoCacheReactNativePdf"
            component={BasicNoCacheReactNativePdfScreen}
            options={{ title: "No Cache (RN-PDF)" }}
          />
          <Stack.Screen
            name="BasicCacheFileNameCoolPdf"
            component={BasicCacheFileNameCoolPdfScreen}
            options={{
              title: "Load PDF from URL with Custom Cache Filename (CoolPDF)",
            }}
          />
          <Stack.Screen
            name="BasicCacheFileNameReactNativePdf"
            component={BasicCacheFileNameReactNativePdfScreen}
            options={{
              title: "Load PDF from URL with Custom Cache Filename (RN-PDF)",
            }}
          />
          <Stack.Screen
            name="BasicCacheExpirationCoolPdf"
            component={BasicCacheExpirationCoolPdfScreen}
            options={{ title: "Cache Expiration (CoolPDF)" }}
          />
          <Stack.Screen
            name="BasicCacheExpirationReactNativePdf"
            component={BasicCacheExpirationReactNativePdfScreen}
            options={{ title: "Cache Expiration (RN-PDF)" }}
          />
          <Stack.Screen
            name="BasicPasswordCoolPdf"
            component={BasicPasswordCoolPdfScreen}
            options={{ title: "Password Protected (CoolPDF)" }}
          />
          <Stack.Screen
            name="BasicPasswordReactNativePdf"
            component={BasicPasswordReactNativePdfScreen}
            options={{ title: "Password Protected (RN-PDF)" }}
          />
          <Stack.Screen
            name="CustomHttpMethodCoolPdf"
            component={CustomHttpMethodCoolPdfScreen}
            options={{ title: "Custom HTTP Method (CoolPDF)" }}
          />
          <Stack.Screen
            name="CustomHttpMethodReactNativePdf"
            component={CustomHttpMethodReactNativePdfScreen}
            options={{ title: "Custom HTTP Method (RN-PDF)" }}
          />

          {/* Navigation scenarios */}
          <Stack.Screen
            name="HorizontalScrollingCoolPdf"
            component={HorizontalScrollingCoolPdfScreen}
            options={{ title: "Horizontal Scrolling (CoolPDF)" }}
          />
          <Stack.Screen
            name="HorizontalScrollingReactNativePdf"
            component={HorizontalScrollingReactNativePdfScreen}
            options={{ title: "Horizontal Scrolling (RN-PDF)" }}
          />
          <Stack.Screen
            name="PageSnappingCoolPdf"
            component={PageSnappingCoolPdfScreen}
            options={{ title: "Page Snapping (CoolPDF)" }}
          />
          <Stack.Screen
            name="PageSnappingReactNativePdf"
            component={PageSnappingReactNativePdfScreen}
            options={{ title: "Page Snapping (RN-PDF)" }}
          />
          <Stack.Screen
            name="HorizontalWithPagingCoolPdf"
            component={HorizontalWithPagingCoolPdfScreen}
            options={{ title: "Horizontal + Paging (CoolPDF)" }}
          />
          <Stack.Screen
            name="HorizontalWithPagingReactNativePdf"
            component={HorizontalWithPagingReactNativePdfScreen}
            options={{ title: "Horizontal + Paging (RN-PDF)" }}
          />
          <Stack.Screen
            name="CustomSpacingCoolPdf"
            component={CustomSpacingCoolPdfScreen}
            options={{ title: "Custom Spacing (CoolPDF)" }}
          />
          <Stack.Screen
            name="CustomSpacingReactNativePdf"
            component={CustomSpacingReactNativePdfScreen}
            options={{ title: "Custom Spacing (RN-PDF)" }}
          />

          {/* Zoom scenarios */}
          <Stack.Screen
            name="InitialZoomCoolPdf"
            component={InitialZoomCoolPdfScreen}
            options={{ title: "Initial Zoom (CoolPDF)" }}
          />
          <Stack.Screen
            name="InitialZoomReactNativePdf"
            component={InitialZoomReactNativePdfScreen}
            options={{ title: "Initial Zoom (RN-PDF)" }}
          />
          <Stack.Screen
            name="CustomZoomRangeCoolPdf"
            component={CustomZoomRangeCoolPdfScreen}
            options={{ title: "Custom Zoom Range (CoolPDF)" }}
          />
          <Stack.Screen
            name="CustomZoomRangeReactNativePdf"
            component={CustomZoomRangeReactNativePdfScreen}
            options={{ title: "Custom Zoom Range (RN-PDF)" }}
          />
          <Stack.Screen
            name="RestrictedZoomCoolPdf"
            component={RestrictedZoomCoolPdfScreen}
            options={{ title: "Restricted Zoom (CoolPDF)" }}
          />
          <Stack.Screen
            name="RestrictedZoomReactNativePdf"
            component={RestrictedZoomReactNativePdfScreen}
            options={{ title: "Restricted Zoom (RN-PDF)" }}
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
