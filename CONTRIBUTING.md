# Contributing

We are open to PRs and contributions. Feel free to open a discussion post if you have questions before hopping int.

## Use the example app

```sh
cd example
npm i
npx expo prebuild --clean
npm run android
npm run ios
```

## Compare with react-native-pdf

The example app has screens to test the behavior of react-native-pdf alongside Cool PDF.

If you're adding new functionality that needs to have parity with react-native-pdf, please make sure to write scenarios that compare them.

## Writing Test Scenarios

To ensure parity with react-native-pdf, we use a scenario-based testing system. Each scenario consists of two screen implementations (one for CoolPDF and one for react-native-pdf) that can be compared side-by-side.

### Scenario Structure

Each scenario consists of:

1. **Scenario metadata** - exported from the CoolPDF screen file
2. **CoolPDF screen** - implementation using CoolPDF
3. **react-native-pdf screen** - implementation using react-native-pdf

Example scenario metadata:

```typescript
export const BasicUrlScenario = {
  id: "basic-url",
  name: "Load PDF from URL",
  description: "Load a simple PDF from a public URL with caching enabled",
  category: "basic" as const,
  expectedBehavior:
    "PDF should load and display the first page. Both onLoadComplete and onPageChanged should fire.",
  notes: "Optional notes about edge cases or limitations",
};
```

### Adding a New Scenario

1. **Choose a category** in `example/screens/scenarios/`:
   - `basic/` - Basic PDF loading (URL, cache, password, etc.)
   - `navigation/` - Page navigation, scrolling, paging
   - `zoom/` - Zoom and scale functionality
   - Create a new category folder if needed

2. **Create the CoolPDF screen** (e.g., `example/screens/scenarios/basic/MyFeatureCoolPdfScreen.tsx`):

```typescript
import { useState } from 'react';
import { CoolPdfView } from 'cool-pdf';
import { View, StyleSheet } from 'react-native';
import { ScenarioEventLog, ScenarioEvent } from '../../../components/ScenarioEventLog';
import { ScenarioHeader } from '../../../components/ScenarioHeader';

export const MyFeatureScenario = {
  id: 'my-feature',
  name: 'My Feature Test',
  description: 'Tests my cool feature',
  category: 'basic' as const,
  expectedBehavior: 'Should do something cool',
};

export default function MyFeatureCoolPdfScreen() {
  const [events, setEvents] = useState<ScenarioEvent[]>([]);

  const addEvent = (type: ScenarioEvent['type'], data: any) => {
    setEvents((prev) => [...prev, { timestamp: Date.now(), type, data }]);
  };

  return (
    <View style={styles.container}>
      <ScenarioHeader
        implementation="CoolPDF Implementation"
        name={MyFeatureScenario.name}
        description={MyFeatureScenario.description}
        backgroundColor="#5856d6"
      />

      <CoolPdfView
        source={{ uri: 'https://example.com/test.pdf', cache: true }}
        onLoadComplete={(event) => addEvent('loadComplete', event.nativeEvent)}
        onPageChanged={(event) => addEvent('pageChanged', event.nativeEvent)}
        onError={(event) => addEvent('error', event.nativeEvent)}
        style={styles.pdf}
      />

      <ScenarioEventLog events={events} accentColor="#5856d6" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  pdf: { flex: 1, backgroundColor: '#fff', margin: 16, borderRadius: 8 },
});
```

3. **Create the react-native-pdf screen** (e.g., `example/screens/scenarios/basic/MyFeatureReactNativePdfScreen.tsx`):

```typescript
// Same structure as CoolPDF screen, but:
// - Import from 'react-native-pdf' instead of 'cool-pdf'
// - Use Pdf component instead of CoolPdfView
// - Use backgroundColor="#34c759" for the header
// - Adjust event handlers to match react-native-pdf's API (they use callbacks instead of nativeEvent)
```

4. **Register the scenario** in `example/screens/scenarios/index.ts`:

```typescript
// Import the scenario metadata
import { MyFeatureScenario } from "./basic/MyFeatureCoolPdfScreen";

// Import the screens
export { default as MyFeatureCoolPdfScreen } from "./basic/MyFeatureCoolPdfScreen";
export { default as MyFeatureReactNativePdfScreen } from "./basic/MyFeatureReactNativePdfScreen";

// Add to allScenarios array
export const allScenarios: ScenarioMetadata[] = [
  // ... existing scenarios
  {
    ...MyFeatureScenario,
    coolPdfScreen: "MyFeatureCoolPdf",
    reactNativePdfScreen: "MyFeatureReactNativePdf",
  },
];
```

5. **Add routes** in `example/App.tsx` (Stack.Screen entries for both screens)

### Testing a Scenario

1. Run the example app: `cd example && npx expo run:ios` (or `run:android`)
2. Tap "Browse Scenarios" on the home screen
3. Select a scenario from the list
4. Tap "View in CoolPDF" or "View in react-native-pdf"
5. Compare behavior, check the event log for differences

### Best Practices

- **Use descriptive names** that clearly indicate what's being tested
- **Include expectedBehavior** to document what should happen
- **Add notes** for edge cases or known limitations
- **Keep implementations identical** except for the component being used
- **Test one thing** per scenario when possible
- **Use the event log** to verify both implementations fire the same events
- **Match the styling** between CoolPDF and react-native-pdf screens for fair comparison

## Publishing

Happy to accept contributions! I'll fill in this doc a bit more as time goes on. For now, please feel free to submit PRs or open a discussion post if you want to pitch in.

## Build

```sh
npm run build
```

## Publish

```sh
npm publish --access public
```
