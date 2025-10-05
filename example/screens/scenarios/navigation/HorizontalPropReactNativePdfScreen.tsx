import { useState } from "react";
import Pdf from "react-native-pdf";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import {
  ScenarioEventLog,
  ScenarioEvent,
} from "../../../components/ScenarioEventLog";
import { ScenarioHeader } from "../../../components/ScenarioHeader";
import { HorizontalPropScenario } from "./HorizontalProp";

export default function HorizontalPropReactNativePdfScreen() {
  const [events, setEvents] = useState<ScenarioEvent[]>([]);
  const [horizontal, setHorizontal] = useState(false);

  const addEvent = (type: ScenarioEvent["type"], data: any) => {
    setEvents((prev) => [...prev, { timestamp: Date.now(), type, data }]);
  };

  return (
    <View style={styles.container}>
      <ScenarioHeader
        implementation="react-native-pdf Implementation"
        name={HorizontalPropScenario.name}
        description={HorizontalPropScenario.description}
        backgroundColor="#34c759"
      />

      <View style={styles.controlsContainer}>
        <Text style={styles.controlLabel}>
          Scroll Direction: {horizontal ? "Horizontal (Left-to-Right)" : "Vertical (Top-to-Bottom)"}
        </Text>
        <TouchableOpacity
          style={[styles.toggleButton, horizontal && styles.toggleButtonActive]}
          onPress={() => setHorizontal(!horizontal)}
        >
          <Text
            style={[
              styles.toggleButtonText,
              horizontal && styles.toggleButtonTextActive,
            ]}
          >
            {horizontal ? "Switch to Vertical" : "Switch to Horizontal"}
          </Text>
        </TouchableOpacity>
      </View>

      <Pdf
        source={{
          uri: "https://craftinginterpreters.com/sample.pdf",
        }}
        horizontal={horizontal}
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
  controlsContainer: {
    backgroundColor: "#fff",
    padding: 12,
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  controlLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    marginBottom: 8,
  },
  toggleButton: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 6,
    backgroundColor: "#f0f0f0",
    alignItems: "center",
  },
  toggleButtonActive: {
    backgroundColor: "#34c759",
  },
  toggleButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#666",
  },
  toggleButtonTextActive: {
    color: "#fff",
  },
  pdf: {
    flex: 1,
    backgroundColor: "#fff",
    margin: 16,
    borderRadius: 8,
  },
});
