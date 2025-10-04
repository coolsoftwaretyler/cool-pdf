import { useState } from 'react';
import { CoolPdfView } from 'cool-pdf';
import { View, StyleSheet } from 'react-native';
import { ScenarioEventLog, ScenarioEvent } from '../../../components/ScenarioEventLog';
import { ScenarioHeader } from '../../../components/ScenarioHeader';

export const RestrictedZoomScenario = {
  id: 'zoom-restricted',
  name: 'Restricted Zoom',
  description: 'Limit zoom to narrow range',
  category: 'zoom' as const,
  expectedBehavior: 'Should only allow zooming between 80% and 120%',
};

export default function RestrictedZoomCoolPdfScreen() {
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
        name={RestrictedZoomScenario.name}
        description={RestrictedZoomScenario.description}
        backgroundColor="#5856d6"
      />

      <CoolPdfView
        source={{
          uri: 'https://craftinginterpreters.com/sample.pdf',
          cache: true,
        }}
        minScale={0.8}
        maxScale={1.2}
        scale={1.0}
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
