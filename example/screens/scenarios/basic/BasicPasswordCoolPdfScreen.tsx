import { useState } from 'react';
import { CoolPdfView } from 'cool-pdf';
import { View, StyleSheet } from 'react-native';
import { ScenarioEventLog, ScenarioEvent } from '../../../components/ScenarioEventLog';
import { ScenarioHeader } from '../../../components/ScenarioHeader';

export const BasicPasswordScenario = {
  id: 'basic-with-password',
  name: 'Password Protected PDF',
  description: 'Load a password-protected PDF',
  category: 'basic' as const,
  expectedBehavior: 'PDF should unlock with correct password',
  notes: 'This example PDF is not actually password protected, so password will be ignored',
};

export default function BasicPasswordCoolPdfScreen() {
  const [events, setEvents] = useState<ScenarioEvent[]>([]);

  const addEvent = (type: ScenarioEvent['type'], data: any) => {
    setEvents((prev) => [
      ...prev,
      { timestamp: Date.now(), type, data },
    ]);
  };

  return (
    <View style={styles.container}>
      <ScenarioHeader
        implementation="CoolPDF Implementation"
        name={BasicPasswordScenario.name}
        description={BasicPasswordScenario.description}
        backgroundColor="#5856d6"
      />

      <CoolPdfView
        source={{
          uri: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
        }}
        password="test123"
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

      <ScenarioEventLog events={events} accentColor="#5856d6" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  pdf: {
    flex: 1,
    backgroundColor: '#fff',
    margin: 16,
    borderRadius: 8,
  },
});
