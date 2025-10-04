import { useState } from 'react';
import Pdf from 'react-native-pdf';
import { View, StyleSheet } from 'react-native';
import { ScenarioEventLog, ScenarioEvent } from '../../../components/ScenarioEventLog';
import { ScenarioHeader } from '../../../components/ScenarioHeader';
import { HorizontalWithPagingScenario } from './HorizontalWithPagingCoolPdfScreen';

export default function HorizontalWithPagingReactNativePdfScreen() {
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
        implementation="react-native-pdf Implementation"
        name={HorizontalWithPagingScenario.name}
        description={HorizontalWithPagingScenario.description}
        backgroundColor="#34c759"
      />

      <Pdf
        source={{
          uri: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
          cache: true,
        }}
        horizontal={true}
        enablePaging={true}
        onLoadComplete={(numberOfPages, path, dimensions, tableContents) => {
          addEvent('loadComplete', { numberOfPages, path, dimensions, tableContents });
        }}
        onPageChanged={(page, numberOfPages) => {
          addEvent('pageChanged', { page, numberOfPages });
        }}
        onError={(error) => {
          addEvent('error', { error });
        }}
        onPageSingleTap={(page) => {
          addEvent('pageSingleTap', { page });
        }}
        style={styles.pdf}
        trustAllCerts={false}
      />

      <ScenarioEventLog events={events} accentColor="#34c759" />
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
