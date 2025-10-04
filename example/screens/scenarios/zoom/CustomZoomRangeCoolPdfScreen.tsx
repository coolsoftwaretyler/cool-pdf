import { useState } from 'react';
import { CoolPdfView } from 'cool-pdf';
import { View, StyleSheet } from 'react-native';
import { ScenarioEventLog, ScenarioEvent } from '../../../components/ScenarioEventLog';
import { ScenarioHeader } from '../../../components/ScenarioHeader';

export const CustomZoomRangeScenario = {
  id: 'zoom-min-max',
  name: 'Custom Zoom Range',
  description: 'Set minimum and maximum zoom levels',
  category: 'zoom' as const,
  expectedBehavior: 'Should allow zooming between 50% and 500%',
};

export default function CustomZoomRangeCoolPdfScreen() {
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
        name={CustomZoomRangeScenario.name}
        description={CustomZoomRangeScenario.description}
        backgroundColor="#5856d6"
      />

      <CoolPdfView
        source={{
          uri: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
          cache: true,
        }}
        minScale={0.5}
        maxScale={5.0}
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
