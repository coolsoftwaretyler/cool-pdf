import { FlatList, Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { allScenarios, categoryLabels } from './scenarios';
import type { ScenarioMetadata } from './scenarios';

export default function ScenarioListScreen({ navigation }: any) {
  const renderScenario = ({ item }: { item: ScenarioMetadata }) => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.scenarioName}>{item.name}</Text>
        <Text style={styles.categoryBadge}>{categoryLabels[item.category]}</Text>
      </View>
      <Text style={styles.description}>{item.description}</Text>
      {item.expectedBehavior && (
        <Text style={styles.expectedBehavior}>
          Expected: {item.expectedBehavior}
        </Text>
      )}
      {item.notes && (
        <Text style={styles.notes}>Note: {item.notes}</Text>
      )}
      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={[styles.button, styles.coolPdfButton]}
          onPress={() => navigation.navigate(item.coolPdfScreen)}
        >
          <Text style={styles.buttonText}>View in CoolPDF</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.reactNativePdfButton]}
          onPress={() => navigation.navigate(item.reactNativePdfScreen)}
        >
          <Text style={styles.buttonText}>View in react-native-pdf</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={allScenarios}
        renderItem={renderScenario}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  list: {
    padding: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  scenarioName: {
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
  },
  categoryBadge: {
    backgroundColor: '#007AFF',
    color: '#fff',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    fontSize: 12,
    fontWeight: '600',
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  expectedBehavior: {
    fontSize: 12,
    color: '#28a745',
    fontStyle: 'italic',
    marginBottom: 4,
  },
  notes: {
    fontSize: 12,
    color: '#ffc107',
    fontStyle: 'italic',
    marginBottom: 12,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 8,
  },
  button: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 6,
    alignItems: 'center',
  },
  coolPdfButton: {
    backgroundColor: '#5856d6',
  },
  reactNativePdfButton: {
    backgroundColor: '#34c759',
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
});
