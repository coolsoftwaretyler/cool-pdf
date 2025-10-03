import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Button, View, StyleSheet, Text } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import CoolPdfScreen from './screens/CoolPdfScreen';
import ReactNativePdfScreen from './screens/ReactNativePdfScreen';
import ScenarioListScreen from './screens/ScenarioListScreen';
import CoolPdfScenarioScreen from './screens/CoolPdfScenarioScreen';
import ReactNativePdfScenarioScreen from './screens/ReactNativePdfScenarioScreen';

type RootStackParamList = {
  Home: undefined;
  CoolPdf: undefined;
  ReactNativePdf: undefined;
  ScenarioList: undefined;
  CoolPdfScenario: { scenario: any };
  ReactNativePdfScenario: { scenario: any };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function HomeScreen({ navigation }: any) {
  return (
    <View style={styles.homeContainer}>
      <Text style={styles.sectionTitle}>Basic Demos</Text>
      <Button
        title="View with CoolPDF"
        onPress={() => navigation.navigate('CoolPdf')}
      />
      <View style={{ height: 12 }} />
      <Button
        title="View with react-native-pdf"
        onPress={() => navigation.navigate('ReactNativePdf')}
      />

      <View style={{ height: 32 }} />

      <Text style={styles.sectionTitle}>Test Scenarios</Text>
      <Button
        title="Browse Scenarios"
        onPress={() => navigation.navigate('ScenarioList')}
        color="#5856d6"
      />
    </View>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ title: 'PDF Viewer Examples' }}
          />
          <Stack.Screen
            name="CoolPdf"
            component={CoolPdfScreen}
            options={{ title: 'CoolPDF' }}
          />
          <Stack.Screen
            name="ReactNativePdf"
            component={ReactNativePdfScreen}
            options={{ title: 'react-native-pdf' }}
          />
          <Stack.Screen
            name="ScenarioList"
            component={ScenarioListScreen}
            options={{ title: 'Test Scenarios' }}
          />
          <Stack.Screen
            name="CoolPdfScenario"
            component={CoolPdfScenarioScreen}
            options={{ title: 'CoolPDF Scenario' }}
          />
          <Stack.Screen
            name="ReactNativePdfScenario"
            component={ReactNativePdfScenarioScreen}
            options={{ title: 'react-native-pdf Scenario' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  homeContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
});
