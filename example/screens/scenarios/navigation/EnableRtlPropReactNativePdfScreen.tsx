import { useState } from "react";
import Pdf from "react-native-pdf";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import {
  ScenarioEventLog,
  ScenarioEvent,
} from "../../../components/ScenarioEventLog";
import { ScenarioHeader } from "../../../components/ScenarioHeader";
import { EnableRtlPropScenario } from "./EnableRtlProp";

export default function EnableRtlPropReactNativePdfScreen() {
  const [events, setEvents] = useState<ScenarioEvent[]>([]);
  const [enableRTL, setEnableRTL] = useState(false);

  const addEvent = (type: ScenarioEvent["type"], data: any) => {
    setEvents((prev) => [...prev, { timestamp: Date.now(), type, data }]);
  };

  return (
    <View style={styles.container}>
      <ScenarioHeader
        implementation="react-native-pdf Implementation"
        name={EnableRtlPropScenario.name}
        description={EnableRtlPropScenario.description}
        backgroundColor="#34c759"
      />

      <View style={styles.controls}>
        <TouchableOpacity
          style={[
            styles.toggleButton,
            { backgroundColor: enableRTL ? "#34c759" : "#8e8e93" },
          ]}
          onPress={() => setEnableRTL(!enableRTL)}
        >
          <Text style={styles.toggleText}>
            RTL: {enableRTL ? "ON" : "OFF"}
          </Text>
        </TouchableOpacity>
      </View>

      <Pdf
        source={{
          uri: "https://craftinginterpreters.com/sample.pdf",
        }}
        horizontal={true}
        enableRTL={enableRTL}
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
