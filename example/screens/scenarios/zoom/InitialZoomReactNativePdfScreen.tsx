import { useState } from 'react';
import Pdf from 'react-native-pdf';
import { View, StyleSheet } from 'react-native';
import { ScenarioEventLog, ScenarioEvent } from '../../../components/ScenarioEventLog';
import { ScenarioHeader } from '../../../components/ScenarioHeader';
import { InitialZoomScenario } from './InitialZoomCoolPdfScreen';

export default function InitialZoomReactNativePdfScreen() {
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
        name={InitialZoomScenario.name}
        description={InitialZoomScenario.description}
        backgroundColor="#34c759"
      />

      <Pdf
        source={{
          uri: 'https://craftinginterpreters.com/sample.pdf',
          cache: true,
        }}
        scale={1.5}
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
