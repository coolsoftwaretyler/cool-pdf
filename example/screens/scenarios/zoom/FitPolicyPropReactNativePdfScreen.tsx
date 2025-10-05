import { useState } from "react";
import Pdf from "react-native-pdf";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import {
  ScenarioEventLog,
  ScenarioEvent,
} from "../../../components/ScenarioEventLog";
import { ScenarioHeader } from "../../../components/ScenarioHeader";
import { FitPolicyPropScenario } from "./FitPolicyProp";

type FitPolicy = 0 | 1 | 2;

export default function FitPolicyPropReactNativePdfScreen() {
  const [events, setEvents] = useState<ScenarioEvent[]>([]);
  const [fitPolicy, setFitPolicy] = useState<FitPolicy>(2);

  const addEvent = (type: ScenarioEvent["type"], data: any) => {
    setEvents((prev) => [...prev, { timestamp: Date.now(), type, data }]);
  };

  const fitPolicyOptions: { value: FitPolicy; label: string }[] = [
    { value: 0, label: "Fit Width" },
    { value: 1, label: "Fit Height" },
    { value: 2, label: "Fit Both" },
  ];

  return (
    <View style={styles.container}>
      <ScenarioHeader
        implementation="react-native-pdf Implementation"
        name={FitPolicyPropScenario.name}
        description={FitPolicyPropScenario.description}
        backgroundColor="#34c759"
      />

      <View style={styles.controlsContainer}>
        <Text style={styles.controlLabel}>Fit Policy:</Text>
        <View style={styles.buttonGroup}>
          {fitPolicyOptions.map((option) => (
            <TouchableOpacity
              key={option.value}
              style={[
                styles.optionButton,
                fitPolicy === option.value && styles.optionButtonActive,
              ]}
              onPress={() => setFitPolicy(option.value)}
            >
              <Text
                style={[
                  styles.optionButtonText,
                  fitPolicy === option.value && styles.optionButtonTextActive,
                ]}
              >
                {option.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <Pdf
        source={{
          uri: "https://craftinginterpreters.com/sample.pdf",
        }}
        fitPolicy={fitPolicy}
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
  buttonGroup: {
    flexDirection: "row",
    gap: 8,
  },
  optionButton: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 6,
    backgroundColor: "#f0f0f0",
    alignItems: "center",
  },
  optionButtonActive: {
    backgroundColor: "#34c759",
  },
  optionButtonText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#666",
  },
  optionButtonTextActive: {
    color: "#fff",
  },
  pdf: {
    flex: 1,
    backgroundColor: "#fff",
    margin: 16,
    borderRadius: 8,
  },
});
