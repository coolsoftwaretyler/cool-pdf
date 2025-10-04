import { useState } from "react";
import Pdf from "react-native-pdf";
import { View, StyleSheet, Platform } from "react-native";
import {
  ScenarioEventLog,
  ScenarioEvent,
} from "../../../components/ScenarioEventLog";
import { ScenarioHeader } from "../../../components/ScenarioHeader";
import { CustomHeadersScenario } from "./CustomHeaders";

// Helper to get the correct localhost URL for the platform
const getLocalServerUrl = () => {
  if (Platform.OS === 'android') {
    // Android emulator uses special alias to host machine
    return 'http://10.0.2.2:3000/sample.pdf';
  }
  // iOS simulator and web can use localhost
  return 'http://localhost:3000/sample.pdf';
};

export default function CustomHeadersReactNativePdfScreen() {
  const [events, setEvents] = useState<ScenarioEvent[]>([]);

  const addEvent = (type: ScenarioEvent["type"], data: any) => {
    setEvents((prev) => [...prev, { timestamp: Date.now(), type, data }]);
  };

  return (
    <View style={styles.container}>
      <ScenarioHeader
        implementation="react-native-pdf Implementation"
        name={CustomHeadersScenario.name}
        description={CustomHeadersScenario.description}
        backgroundColor="#34c759"
      />

      <Pdf
        source={{
          uri: getLocalServerUrl(),
          headers: {
            "x-custom-header": "custom-value",
          },
        }}
        onLoadComplete={(numberOfPages, path, dimensions, tableContents) => {
          addEvent("loadComplete", {
            numberOfPages,
            path,
            dimensions,
            tableContents,
          });
        }}
        style={styles.pdf}
        trustAllCerts={false}
      />

      <ScenarioEventLog events={events} accentColor="#34c759" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  pdf: {
    flex: 1,
    backgroundColor: "#fff",
    margin: 16,
    borderRadius: 8,
  },
});
