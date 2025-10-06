import { Text, View, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import * as Clipboard from 'expo-clipboard';

export type ScenarioEvent = {
  timestamp: number;
  type: 'loadComplete' | 'pageChanged' | 'error' | 'pageSingleTap' | 'info' | 'loadProgress';
  data: any;
};

type Props = {
  events: ScenarioEvent[];
  accentColor?: string;
};

export function ScenarioEventLog({ events, accentColor = '#5856d6' }: Props) {
  const copyEventLog = async () => {
    const logText = JSON.stringify(events, null, 2);

    await Clipboard.setStringAsync(logText);
    Alert.alert('Copied!', 'Event log copied to clipboard');
  };

  return (
    <View style={styles.eventLog}>
      <View style={styles.eventLogHeader}>
        <Text style={styles.eventLogTitle}>Event Log</Text>
        <TouchableOpacity onPress={copyEventLog} style={[styles.copyButton, { backgroundColor: accentColor }]}>
          <Text style={styles.copyButtonText}>Copy</Text>
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.eventScroll}>
        {events.length === 0 ? (
          <Text style={styles.noEvents}>No events yet</Text>
        ) : (
          events.map((event, index) => (
            <View key={index} style={styles.event}>
              <Text style={[styles.eventType, { color: accentColor }]}>{event.type}</Text>
              <Text style={styles.eventData}>
                {JSON.stringify(event.data, null, 2)}
              </Text>
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
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
    marginBottom: 4,
  },
  eventData: {
    fontSize: 11,
    fontFamily: 'monospace',
    color: '#666',
  },
});
