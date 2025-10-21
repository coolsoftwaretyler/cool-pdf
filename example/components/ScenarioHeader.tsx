import { useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';

type Props = {
  implementation: string;
  name: string;
  description: string;
  backgroundColor: string;
};

export function ScenarioHeader({ implementation, name, description, backgroundColor }: Props) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <TouchableOpacity
      style={[styles.header, { backgroundColor }]}
      onPress={() => setIsExpanded(!isExpanded)}
      activeOpacity={0.8}
    >
      <View style={styles.collapsedContent}>
        <Text style={styles.tapHint}>
          {isExpanded ? '▼' : '▶'} Tap to {isExpanded ? 'collapse' : 'expand'} details
        </Text>
      </View>

      {isExpanded && (
        <View style={styles.expandedContent}>
          <Text style={styles.implementation}>{implementation}</Text>
          <Text style={styles.scenarioName}>{name}</Text>
          <Text style={styles.description}>{description}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  header: {
    padding: 16,
  },
  collapsedContent: {
    alignItems: 'center',
  },
  tapHint: {
    fontSize: 12,
    color: '#fff',
    opacity: 0.8,
    fontWeight: '600',
  },
  expandedContent: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.3)',
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
});