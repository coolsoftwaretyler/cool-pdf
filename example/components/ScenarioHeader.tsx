import { Text, View, StyleSheet } from 'react-native';

type Props = {
  implementation: string;
  name: string;
  description: string;
  backgroundColor: string;
};

export function ScenarioHeader({ implementation, name, description, backgroundColor }: Props) {
  return (
    <View style={[styles.header, { backgroundColor }]}>
      <Text style={styles.implementation}>{implementation}</Text>
      <Text style={styles.scenarioName}>{name}</Text>
      <Text style={styles.description}>{description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
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
});
