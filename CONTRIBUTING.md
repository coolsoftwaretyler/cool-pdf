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

To ensure parity with react-native-pdf, we use a scenario-based testing system. Scenarios are defined once and can be rendered in both implementations for comparison.

### Scenario Structure

Each scenario is a TypeScript object with the following structure:

```typescript
type PdfScenario = {
  id: string; // Unique identifier
  name: string; // Display name
  description: string; // What this scenario tests
  category: "basic" | "navigation" | "zoom" | "annotations" | "performance";
  props: {
    // Props to pass to PDF viewer
    source: PdfSource;
    page?: number;
    scale?: number;
    // ... other props
  };
  expectedBehavior?: string; // What should happen
  notes?: string; // Additional context
};
```

### Adding a New Scenario

1. **Choose or create a category file** in `example/scenarios/definitions/`:
   - `basic.ts` - Basic PDF loading
   - `navigation.ts` - Page navigation, scrolling
   - `zoom.ts` - Zoom and scale
   - Create new files for other categories as needed

2. **Define your scenario**:

```typescript
// example/scenarios/definitions/navigation.ts
export const navigationScenarios: PdfScenario[] = [
  {
    id: "nav-horizontal-paging",
    name: "Horizontal with Paging",
    description: "Combine horizontal scrolling with page snapping",
    category: "navigation",
    props: {
      source: {
        uri: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
        cache: true,
      },
      horizontal: true,
      enablePaging: true,
    },
    expectedBehavior: "Pages should scroll horizontally and snap",
  },
  // ... more scenarios
];
```

3. **Export from the index file** (`example/scenarios/index.ts`):

```typescript
import { navigationScenarios } from "./definitions/navigation";

export const scenariosByCategory: Record<ScenarioCategory, PdfScenario[]> = {
  // ...
  navigation: navigationScenarios,
  // ...
};
```

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
- **Group related scenarios** in the same category file
- **Test one thing** per scenario when possible
- **When adding new props** to cool-pdf, create corresponding scenarios to test them

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
