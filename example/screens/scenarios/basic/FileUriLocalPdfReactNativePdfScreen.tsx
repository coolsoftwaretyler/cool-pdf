import { useState, useEffect } from "react";
import Pdf from "react-native-pdf";
import { View, StyleSheet, Text, ActivityIndicator } from "react-native";
import { File, Paths } from "expo-file-system";
import {
  ScenarioEventLog,
  ScenarioEvent,
} from "../../../components/ScenarioEventLog";
import { ScenarioHeader } from "../../../components/ScenarioHeader";
import { FileUriLocalPdfScenario } from "./FileUriLocalPdf";

export default function FileUriLocalPdfReactNativePdfScreen() {
  const [events, setEvents] = useState<ScenarioEvent[]>([]);
  const [pdfPath, setPdfPath] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const addEvent = (type: ScenarioEvent["type"], data: any) => {
    setEvents((prev) => [...prev, { timestamp: Date.now(), type, data }]);
  };

  useEffect(() => {
    async function downloadPDF() {
      const filename = "file-uri-test-sample.pdf";
      const destinationFile = new File(Paths.cache, filename);

      try {
        // Check if already downloaded
        if (destinationFile.exists) {
          addEvent("info", { message: `Using cached PDF at ${destinationFile.uri}` });
          setPdfPath(destinationFile.uri);
          setLoading(false);
          return;
        }

        addEvent("info", { message: "Downloading PDF to cache..." });
        // Download to specific file path
        const downloadedFile = await File.downloadFileAsync(
          "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
          destinationFile
        );
        addEvent("info", { message: `Downloaded to ${downloadedFile.uri}` });
        setPdfPath(downloadedFile.uri);
      } catch (e: any) {
        // If download fails due to file already existing, just use it
        if (e.message?.includes("already exists") || e.message?.includes("Destination already exists")) {
          addEvent("info", { message: `File already exists, using cached PDF at ${destinationFile.uri}` });
          setPdfPath(destinationFile.uri);
        } else {
          setError(e.message);
          addEvent("error", { message: e.message });
        }
      } finally {
        setLoading(false);
      }
    }

    downloadPDF();
  }, []);

  return (
    <View style={styles.container}>
      <ScenarioHeader
        implementation="react-native-pdf Implementation"
        name={FileUriLocalPdfScenario.name}
        description={FileUriLocalPdfScenario.description}
        backgroundColor="#34c759"
      />

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#34c759" />
          <Text style={styles.loadingText}>Downloading PDF...</Text>
        </View>
      ) : error ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Error: {error}</Text>
        </View>
      ) : pdfPath ? (
        <Pdf
          source={{ uri: pdfPath }}
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
      ) : null}

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
    margin: 16,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: "#666",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    margin: 16,
  },
  errorText: {
    fontSize: 16,
    color: "#ff3b30",
    textAlign: "center",
  },
});
