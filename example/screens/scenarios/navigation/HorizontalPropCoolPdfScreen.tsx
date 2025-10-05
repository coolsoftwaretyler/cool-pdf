import { useState } from "react";
import { CoolPdfView } from "cool-pdf";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import {
  ScenarioEventLog,
  ScenarioEvent,
} from "../../../components/ScenarioEventLog";
import { ScenarioHeader } from "../../../components/ScenarioHeader";
import { HorizontalPropScenario } from "./HorizontalProp";

export default function HorizontalPropCoolPdfScreen() {
  const [events, setEvents] = useState<ScenarioEvent[]>([]);
  const [horizontal, setHorizontal] = useState(false);

  const addEvent = (type: ScenarioEvent["type"], data: any) => {
    setEvents((prev) => [...prev, { timestamp: Date.now(), type, data }]);
  };

  return (
    <View style={styles.container}>
      <ScenarioHeader
        implementation="CoolPDF Implementation"
        name={HorizontalPropScenario.name}
        description={HorizontalPropScenario.description}
        backgroundColor="#5856d6"
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

      <CoolPdfView
        source={{
          uri: "https://craftinginterpreters.com/sample.pdf",
        }}
        horizontal={horizontal}
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
    backgroundColor: "#5856d6",
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
