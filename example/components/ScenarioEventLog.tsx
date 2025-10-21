import { useState } from 'react';
import { Text, View, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import * as Clipboard from 'expo-clipboard';

export type ScenarioEvent = {
  timestamp: number;
  type: 'loadComplete' | 'pageChanged' | 'error' | 'pageSingleTap' | 'info' | 'loadProgress' | 'pressLink' | 'scaleChanged';
  data: any;
};

type Props = {
  events: ScenarioEvent[];
  accentColor?: string;
};

export function ScenarioEventLog({ events, accentColor = '#5856d6' }: Props) {
  const [isExpanded, setIsExpanded] = useState(false);

  const copyEventLog = async () => {
    const logText = JSON.stringify(events, null, 2);

    await Clipboard.setStringAsync(logText);
    Alert.alert('Copied!', 'Event log copied to clipboard');
  };

  return (
    <View style={styles.eventLog}>
      <TouchableOpacity
        style={styles.eventLogHeader}
        onPress={() => setIsExpanded(!isExpanded)}
        activeOpacity={0.8}
      >
        <View style={styles.headerLeft}>
          <Text style={styles.expandIcon}>{isExpanded ? '▼' : '▶'}</Text>
          <Text style={styles.eventLogTitle}>
            Event Log {events.length > 0 && `(${events.length})`}
          </Text>
        </View>
        {isExpanded && (
          <TouchableOpacity
            onPress={(e) => {
              e.stopPropagation();
              copyEventLog();
            }}
            style={[styles.copyButton, { backgroundColor: accentColor }]}
          >
            <Text style={styles.copyButtonText}>Copy</Text>
          </TouchableOpacity>
        )}
      </TouchableOpacity>

      {isExpanded && (
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
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  eventLog: {
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  eventLogHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  expandIcon: {
    fontSize: 12,
    color: '#666',
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