import { FlatList, Text, View, StyleSheet, TouchableOpacity, SectionList } from 'react-native';
import { scenariosByCategory, categoryLabels } from './scenarios';
import type { ScenarioMetadata, ScenarioCategory } from './scenarios';
import { useRef } from 'react';

export default function ScenarioListScreen({ navigation }: any) {
  const sectionListRef = useRef<SectionList>(null);

  const sections = Object.entries(scenariosByCategory).map(([category, scenarios]) => ({
    title: categoryLabels[category as ScenarioCategory],
    category: category as ScenarioCategory,
    data: scenarios,
  }));

  const scrollToScenario = (sectionIndex: number, itemIndex: number) => {
    sectionListRef.current?.scrollToLocation({
      sectionIndex,
      itemIndex,
      animated: true,
      viewPosition: 0,
    });
  };

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
      <SectionList
        ref={sectionListRef}
        sections={sections}
        renderItem={renderScenario}
        renderSectionHeader={({ section }) => (
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionHeaderText}>{section.title}</Text>
          </View>
        )}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        stickySectionHeadersEnabled={true}
        ListHeaderComponent={
          <View style={styles.tocContainer}>
            <Text style={styles.tocTitle}>Test Scenarios</Text>
            {sections.map((section, sectionIndex) => (
              <View key={section.category} style={styles.categoryGroup}>
                <Text style={styles.categoryLabel}>{section.title}</Text>
                {section.data.map((scenario, itemIndex) => (
                  <TouchableOpacity
                    key={scenario.id}
                    style={styles.tocItem}
                    onPress={() => scrollToScenario(sectionIndex, itemIndex)}
                  >
                    <Text style={styles.tocItemText}>{scenario.name}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            ))}
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  tocContainer: {
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  tocTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#333',
  },
  categoryGroup: {
    marginBottom: 16,
  },
  categoryLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: '#007AFF',
    marginBottom: 6,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  tocItem: {
    paddingVertical: 4,
    paddingLeft: 12,
  },
  tocItemText: {
    fontSize: 13,
    color: '#555',
  },
  sectionHeader: {
    backgroundColor: '#e8e8e8',
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  sectionHeaderText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
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
