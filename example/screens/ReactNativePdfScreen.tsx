import { useState } from 'react';
import Pdf from 'react-native-pdf';
import { Text, View, StyleSheet } from 'react-native';

export default function ReactNativePdfScreen() {
  const [currentPage, setCurrentPage] = useState(0);
  const [numberOfPages, setNumberOfPages] = useState(0);

  const source = {
    uri: 'https://craftinginterpreters.com/sample.pdf',
    cache: true,
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>react-native-pdf Viewer</Text>

      <View style={styles.info}>
        <Text style={styles.infoText}>
          Page {currentPage} of {numberOfPages}
        </Text>
      </View>

      <Pdf
        source={source}
        onLoadComplete={(numberOfPages) => {
          console.log(`Number of pages: ${numberOfPages}`);
          setNumberOfPages(numberOfPages);
        }}
        onPageChanged={(page) => {
          console.log(`Current page: ${page}`);
          setCurrentPage(page);
        }}
        onError={(error) => {
          console.error(error);
        }}
        style={styles.pdf}
        trustAllCerts={false}
      />
    </View>
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
    marginBottom: 16,
    borderRadius: 8,
  },
});
