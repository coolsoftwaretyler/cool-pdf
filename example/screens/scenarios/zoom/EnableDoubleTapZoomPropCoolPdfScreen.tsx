import { useState } from "react";
import { CoolPdfView } from "cool-pdf";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import {
  ScenarioEventLog,
  ScenarioEvent,
} from "../../../components/ScenarioEventLog";
import { ScenarioHeader } from "../../../components/ScenarioHeader";
import { EnableDoubleTapZoomPropScenario } from "./EnableDoubleTapZoomProp";

export default function EnableDoubleTapZoomPropCoolPdfScreen() {
  const [events, setEvents] = useState<ScenarioEvent[]>([]);
  const [enableDoubleTapZoom, setEnableDoubleTapZoom] = useState(true);

  const addEvent = (type: ScenarioEvent["type"], data: any) => {
    setEvents((prev) => [...prev, { timestamp: Date.now(), type, data }]);
  };

  return (
    <View style={styles.container}>
      <ScenarioHeader
        implementation="CoolPDF Implementation"
        name={EnableDoubleTapZoomPropScenario.name}
        description={EnableDoubleTapZoomPropScenario.description}
        backgroundColor="#5856d6"
      />

      <View style={styles.controls}>
        <TouchableOpacity
          style={[
            styles.toggleButton,
            { backgroundColor: enableDoubleTapZoom ? "#5856d6" : "#8e8e93" },
          ]}
          onPress={() => setEnableDoubleTapZoom(!enableDoubleTapZoom)}
        >
          <Text style={styles.toggleText}>
            Double Tap Zoom: {enableDoubleTapZoom ? "ON" : "OFF"}
          </Text>
        </TouchableOpacity>
      </View>

      <CoolPdfView
        source={{
          uri: "https://craftinginterpreters.com/sample.pdf",
        }}
        enableDoubleTapZoom={enableDoubleTapZoom}
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
  controls: {
    padding: 16,
    flexDirection: "row",
    justifyContent: "center",
    gap: 8,
  },
  toggleButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  toggleText: {
    color: "#fff",
    fontWeight: "600",
  },
  pdf: {
    flex: 1,
    backgroundColor: "#fff",
    margin: 16,
    borderRadius: 8,
  },
});
