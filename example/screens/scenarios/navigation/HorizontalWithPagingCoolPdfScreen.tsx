import { useState } from 'react';
import { CoolPdfView } from 'cool-pdf';
import { View, StyleSheet } from 'react-native';
import { ScenarioEventLog, ScenarioEvent } from '../../../components/ScenarioEventLog';
import { ScenarioHeader } from '../../../components/ScenarioHeader';

export const HorizontalWithPagingScenario = {
  id: 'nav-horizontal-paging',
  name: 'Horizontal with Paging',
  description: 'Combine horizontal scrolling with page snapping',
  category: 'navigation' as const,
  expectedBehavior: 'Pages should scroll horizontally and snap',
};

export default function HorizontalWithPagingCoolPdfScreen() {
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
        name={HorizontalWithPagingScenario.name}
        description={HorizontalWithPagingScenario.description}
        backgroundColor="#5856d6"
      />

      <CoolPdfView
        source={{
          uri: 'https://craftinginterpreters.com/sample.pdf',
          cache: true,
        }}
        horizontal={true}
        enablePaging={true}
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
