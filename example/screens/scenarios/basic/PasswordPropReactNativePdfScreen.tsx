import { useState } from "react";
import Pdf from "react-native-pdf";
import { View, StyleSheet, Platform, Text, TouchableOpacity } from "react-native";
import {
  ScenarioEventLog,
  ScenarioEvent,
} from "../../../components/ScenarioEventLog";
import { ScenarioHeader } from "../../../components/ScenarioHeader";
import { PasswordPropScenario } from "./PasswordProp";

export default function PasswordPropReactNativePdfScreen() {
  const [events, setEvents] = useState<ScenarioEvent[]>([]);
  const [password, setPassword] = useState("password");

  const addEvent = (type: ScenarioEvent["type"], data: any) => {
    setEvents((prev) => [...prev, { timestamp: Date.now(), type, data }]);
  };

  // Use appropriate URL based on platform
  const pdfUrl = Platform.select({
    ios: "http://localhost:3000/password-protected.pdf",
    android: "http://10.0.2.2:3000/password-protected.pdf",
    default: "http://localhost:3000/password-protected.pdf",
  });

  const togglePassword = () => {
    setPassword(password === "password" ? "wrongpassword" : "password");
  };

  return (
    <View style={styles.container}>
      <ScenarioHeader
        implementation="react-native-pdf Implementation"
        name={PasswordPropScenario.name}
        description={PasswordPropScenario.description}
        backgroundColor="#34c759"
      />

      <View style={styles.controlsContainer}>
        <Text style={styles.controlLabel}>
          Password: {password === "password" ? "password (Correct)" : "wrongpassword (Incorrect)"}
        </Text>
        <TouchableOpacity
          style={[styles.toggleButton, password !== "password" && styles.toggleButtonActive]}
          onPress={togglePassword}
        >
          <Text
            style={[
              styles.toggleButtonText,
              password !== "password" && styles.toggleButtonTextActive,
            ]}
          >
            {password === "password" ? "Use Wrong Password" : "Use Correct Password"}
          </Text>
        </TouchableOpacity>
      </View>

      <Pdf
        source={{
          uri: pdfUrl,
        }}
        password={password}
        onLoadComplete={(numberOfPages, path, dimensions, tableContents) => {
          addEvent("loadComplete", {
            numberOfPages,
            path,
            dimensions,
            tableContents,
          });
        }}
        onError={(error) => {
          addEvent("error", { error: error.message });
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
