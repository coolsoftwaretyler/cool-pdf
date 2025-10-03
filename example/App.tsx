import { useState } from 'react';
import { CoolPdfView } from 'cool-pdf';
import { Button, SafeAreaView, ScrollView, Text, View, StyleSheet } from 'react-native';

export default function App() {
  const [currentPage, setCurrentPage] = useState(1);
  const [numberOfPages, setNumberOfPages] = useState(0);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <Text style={styles.header}>Cool PDF Viewer</Text>

        <View style={styles.info}>
          <Text style={styles.infoText}>
            Page {currentPage} of {numberOfPages}
          </Text>
        </View>

        <CoolPdfView
          source={{
            uri: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
            cache: true,
          }}
          page={currentPage}
          onLoadComplete={({ nativeEvent }) => {
            console.log('PDF loaded!');
            console.log(`Number of pages: ${nativeEvent.numberOfPages}`);
            setNumberOfPages(nativeEvent.numberOfPages);
          }}
          onPageChanged={({ nativeEvent }) => {
            console.log(`Page changed to: ${nativeEvent.page}`);
            setCurrentPage(nativeEvent.page);
          }}
          onError={({ nativeEvent }) => {
            console.error('Error loading PDF:', nativeEvent.error);
          }}
          onPageSingleTap={({ nativeEvent }) => {
            console.log(`Tapped on page: ${nativeEvent.page}`);
          }}
          style={styles.pdf}
        />

        <View style={styles.controls}>
          <Button
            title="Previous"
            onPress={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage <= 1}
          />
          <Button
            title="Next"
            onPress={() => setCurrentPage(Math.min(numberOfPages, currentPage + 1))}
            disabled={currentPage >= numberOfPages}
          />
        </View>

        <ScrollView style={styles.examplesList}>
          <Text style={styles.sectionHeader}>Other PDF Examples:</Text>

          <Button
            title="Load Sample PDF (URL)"
            onPress={() => {
              // This will reload the same PDF - in real app, you'd change the source
              setCurrentPage(1);
            }}
          />

          <View style={{ height: 10 }} />

          <Text style={styles.note}>
            Note: You can load PDFs from URLs, local files, or base64-encoded strings.
          </Text>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 16,
  },
  info: {
    backgroundColor: '#fff',
    padding: 12,
    marginHorizontal: 16,
    marginBottom: 8,
    borderRadius: 8,
    alignItems: 'center',
  },
  infoText: {
    fontSize: 16,
    fontWeight: '600',
  },
  pdf: {
    flex: 1,
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginBottom: 8,
    borderRadius: 8,
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 16,
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginBottom: 8,
    borderRadius: 8,
  },
  examplesList: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginBottom: 16,
    padding: 16,
    borderRadius: 8,
    maxHeight: 150,
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  note: {
    fontSize: 12,
    color: '#666',
    marginTop: 8,
    fontStyle: 'italic',
  },
});
