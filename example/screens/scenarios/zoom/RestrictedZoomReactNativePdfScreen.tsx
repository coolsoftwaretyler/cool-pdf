import { useState } from 'react';
import Pdf from 'react-native-pdf';
import { View, StyleSheet } from 'react-native';
import { ScenarioEventLog, ScenarioEvent } from '../../../components/ScenarioEventLog';
import { ScenarioHeader } from '../../../components/ScenarioHeader';
import { RestrictedZoomScenario } from './RestrictedZoomCoolPdfScreen';

export default function RestrictedZoomReactNativePdfScreen() {
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
        name={RestrictedZoomScenario.name}
        description={RestrictedZoomScenario.description}
        backgroundColor="#34c759"
      />

      <Pdf
        source={{
          uri: 'https://craftinginterpreters.com/sample.pdf',
          cache: true,
        }}
        minScale={0.8}
        maxScale={1.2}
        scale={1.0}
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
