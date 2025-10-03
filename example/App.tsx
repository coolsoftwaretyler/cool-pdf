import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Button, View, StyleSheet } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import CoolPdfScreen from './screens/CoolPdfScreen';
import ReactNativePdfScreen from './screens/ReactNativePdfScreen';

type RootStackParamList = {
  Home: undefined;
  CoolPdf: undefined;
  ReactNativePdf: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function HomeScreen({ navigation }: any) {
  return (
    <View style={styles.homeContainer}>
      <Button
        title="View with CoolPDF"
        onPress={() => navigation.navigate('CoolPdf')}
      />
      <View style={{ height: 20 }} />
      <Button
        title="View with react-native-pdf"
        onPress={() => navigation.navigate('ReactNativePdf')}
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
});
