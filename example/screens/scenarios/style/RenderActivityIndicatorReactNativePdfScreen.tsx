import { useState } from "react";
import Pdf from "react-native-pdf";
import { View, StyleSheet, ActivityIndicator, Text } from "react-native";
import {
  ScenarioEventLog,
  ScenarioEvent,
} from "../../../components/ScenarioEventLog";
import { ScenarioHeader } from "../../../components/ScenarioHeader";
import { RenderActivityIndicatorScenario } from "./RenderActivityIndicator";

export default function RenderActivityIndicatorReactNativePdfScreen() {
  const [events, setEvents] = useState<ScenarioEvent[]>([]);

  const addEvent = (type: ScenarioEvent["type"], data: any) => {
    setEvents((prev) => [...prev, { timestamp: Date.now(), type, data }]);
  };

  return (
    <View style={styles.container}>
      <ScenarioHeader
        implementation="react-native-pdf Implementation"
        name={RenderActivityIndicatorScenario.name}
        description={RenderActivityIndicatorScenario.description}
        backgroundColor="#34c759"
      />

      <Pdf
        source={{
          uri: "https://craftinginterpreters.com/sample.pdf",
        }}
        onLoadComplete={(numberOfPages, path, dimensions, tableContents) => {
          addEvent("loadComplete", {
            numberOfPages,
            path,
            dimensions,
            tableContents,
          });
        }}
        renderActivityIndicator={() => (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#9b59b6" />
            <Text style={styles.loadingText}>Loading PDF...</Text>
          </View>
        )}
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
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0e6f6",
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: "#9b59b6",
    fontWeight: "600",
  },
});
