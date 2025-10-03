import { useState } from 'react';
import { CoolPdfView } from 'cool-pdf';
import { Text, View, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import * as Clipboard from 'expo-clipboard';
import type { PdfScenario, ScenarioEvent } from '../scenarios';

export default function CoolPdfScenarioScreen({ route }: any) {
  const { scenario } = route.params as { scenario: PdfScenario };
  const [events, setEvents] = useState<ScenarioEvent[]>([]);

  const addEvent = (type: ScenarioEvent['type'], data: any) => {
    setEvents((prev) => [
      ...prev,
      { timestamp: Date.now(), type, data },
    ]);
  };

  const copyEventLog = async () => {
    const logText = events.map(event =>
      `[${event.type}]\n${JSON.stringify(event.data, null, 2)}`
    ).join('\n\n');

    await Clipboard.setStringAsync(logText);
    Alert.alert('Copied!', 'Event log copied to clipboard');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.implementation}>CoolPDF Implementation</Text>
        <Text style={styles.scenarioName}>{scenario.name}</Text>
        <Text style={styles.description}>{scenario.description}</Text>
      </View>

      <CoolPdfView
        {...scenario.props}
        onLoadComplete={(event) => {
          const { numberOfPages, path, dimensions, tableContents } = event.nativeEvent;
          addEvent('loadComplete', { numberOfPages, path, dimensions, tableContents });
        }}
        onPageChanged={(event) => {
          addEvent('pageChanged', event.nativeEvent);
        }}
        onError={(event) => {
          addEvent('error', event.nativeEvent);
        }}
        onPageSingleTap={(event) => {
          addEvent('pageSingleTap', event.nativeEvent);
        }}
        style={styles.pdf}
      />

      <View style={styles.eventLog}>
        <View style={styles.eventLogHeader}>
          <Text style={styles.eventLogTitle}>Event Log</Text>
          <TouchableOpacity onPress={copyEventLog} style={styles.copyButton}>
            <Text style={styles.copyButtonText}>Copy</Text>
          </TouchableOpacity>
        </View>
        <ScrollView style={styles.eventScroll}>
          {events.length === 0 ? (
            <Text style={styles.noEvents}>No events yet</Text>
          ) : (
            events.map((event, index) => (
              <View key={index} style={styles.event}>
                <Text style={styles.eventType}>{event.type}</Text>
                <Text style={styles.eventData}>
                  {JSON.stringify(event.data, null, 2)}
                </Text>
              </View>
            ))
          )}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#5856d6',
    padding: 16,
  },
  implementation: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  scenarioName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: '#fff',
    opacity: 0.9,
  },
  pdf: {
    flex: 1,
    backgroundColor: '#fff',
    margin: 16,
    borderRadius: 8,
  },
  eventLog: {
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    maxHeight: 300,
  },
  eventLogHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 8,
    paddingVertical: 8,
  },
  eventLogTitle: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  copyButton: {
    backgroundColor: '#5856d6',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
  },
  copyButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  eventScroll: {
    maxHeight: 270,
  },
  noEvents: {
    padding: 8,
    color: '#999',
    fontStyle: 'italic',
  },
  event: {
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  eventType: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#5856d6',
    marginBottom: 4,
  },
  eventData: {
    fontSize: 11,
    fontFamily: 'monospace',
    color: '#666',
  },
});
