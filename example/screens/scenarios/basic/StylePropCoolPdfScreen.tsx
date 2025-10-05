import { useState } from "react";
import { CoolPdfView } from "cool-pdf";
import { View, StyleSheet } from "react-native";
import {
  ScenarioEventLog,
  ScenarioEvent,
} from "../../../components/ScenarioEventLog";
import { ScenarioHeader } from "../../../components/ScenarioHeader";
import { StylePropScenario } from "./StyleProp";

export default function StylePropCoolPdfScreen() {
  const [events, setEvents] = useState<ScenarioEvent[]>([]);

  const addEvent = (type: ScenarioEvent["type"], data: any) => {
    setEvents((prev) => [...prev, { timestamp: Date.now(), type, data }]);
  };

  return (
    <View style={styles.container}>
      <ScenarioHeader
        implementation="CoolPDF Implementation"
        name={StylePropScenario.name}
        description={StylePropScenario.description}
        backgroundColor="#5856d6"
      />

      <CoolPdfView
        source={{
          uri: "https://craftinginterpreters.com/sample.pdf",
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
    width: 300,
    height: 400,
    backgroundColor: "#fff",
    margin: 16,
    borderRadius: 20,
    borderWidth: 4,
    borderColor: "#5856d6",
    alignSelf: "center",
  },
});
