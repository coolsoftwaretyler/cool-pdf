import { useState } from "react";
import { CoolPdfView } from "cool-pdf";
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

export default function CustomHeadersCoolPdfScreen() {
  const [events, setEvents] = useState<ScenarioEvent[]>([]);

  const addEvent = (type: ScenarioEvent["type"], data: any) => {
    setEvents((prev) => [...prev, { timestamp: Date.now(), type, data }]);
  };

  return (
    <View style={styles.container}>
      <ScenarioHeader
        implementation="CoolPDF Implementation"
        name={CustomHeadersScenario.name}
        description={CustomHeadersScenario.description}
        backgroundColor="#5856d6"
      />

      <CoolPdfView
        source={{
          uri: getLocalServerUrl(),
          headers: {
            "x-custom-header": "custom-value",
          },
        }}
        onLoadComplete={(event) => {
          const { numberOfPages, path, dimensions, tableContents } =
            event.nativeEvent;
          addEvent("loadComplete", {
            numberOfPages,
            path,
            dimensions,
            tableContents,
          });
        }}
        style={styles.pdf}
      />

      <ScenarioEventLog events={events} accentColor="#5856d6" />
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
