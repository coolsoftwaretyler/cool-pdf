import { useState } from "react";
import { CoolPdfView } from "cool-pdf";
import { View, StyleSheet, Platform } from "react-native";
import {
  ScenarioEventLog,
  ScenarioEvent,
} from "../../../components/ScenarioEventLog";
import { ScenarioHeader } from "../../../components/ScenarioHeader";
import { PasswordCorrectScenario } from "./PasswordCorrect";

export default function PasswordCorrectCoolPdfScreen() {
  const [events, setEvents] = useState<ScenarioEvent[]>([]);

  const addEvent = (type: ScenarioEvent["type"], data: any) => {
    setEvents((prev) => [...prev, { timestamp: Date.now(), type, data }]);
  };

  const pdfUrl = Platform.select({
    ios: "http://localhost:3000/password-protected.pdf",
    android: "http://10.0.2.2:3000/password-protected.pdf",
    default: "http://localhost:3000/password-protected.pdf",
  });

  return (
    <View style={styles.container}>
      <ScenarioHeader
        implementation="CoolPDF Implementation"
        name={PasswordCorrectScenario.name}
        description={PasswordCorrectScenario.description}
        backgroundColor="#5856d6"
      />

      <CoolPdfView
        source={{
          uri: pdfUrl,
        }}
        password="password"
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
        onError={(event) => {
          addEvent("error", event.nativeEvent);
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
