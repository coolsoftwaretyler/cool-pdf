import { useState } from "react";
import Pdf from "react-native-pdf";
import { View, StyleSheet } from "react-native";
import {
  ScenarioEventLog,
  ScenarioEvent,
} from "../../../components/ScenarioEventLog";
import { ScenarioHeader } from "../../../components/ScenarioHeader";
import { Base64PdfRenderingScenario, base64Pdf } from "./Base64PdfRendering";

export default function Base64PdfRenderingReactNativePdfScreen() {
  const [events, setEvents] = useState<ScenarioEvent[]>([]);

  const addEvent = (type: ScenarioEvent["type"], data: any) => {
    setEvents((prev) => [...prev, { timestamp: Date.now(), type, data }]);
  };

  return (
    <View style={styles.container}>
      <ScenarioHeader
        implementation="react-native-pdf Implementation"
        name={Base64PdfRenderingScenario.name}
        description={Base64PdfRenderingScenario.description}
        backgroundColor="#34c759"
      />

      <Pdf
        source={{
          uri: base64Pdf,
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
