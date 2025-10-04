# cool-pdf

PDF View Component for Expo. Intended as a drop-in replacement for [react-native-pdf](https://github.com/wonday/react-native-pdf/)

## Installation

### Add the package to your dependencies

```sh
npm install @coolsoftwaretyler/cool-pdf
```

### Run a fresh prebuild

```sh
npx expo prebuild --clean
```

### Run your app

Start up Android or iOS

## Usage

```tsx
import { CoolPdfView } from "@coolsoftwaretyler/cool-pdf";

<CoolPdfView
  source={{ uri: url }}
  style={themed($pdf)}
  onLoadComplete={() => {
    console.log("PDF loaded complete");
  }}
/>;
```

### Props Compatibility with react-native-pdf

| Property                       |                             Type                              |         Default          | Description                                                                                                                                                                 | iOS | Android | Supported |
| ------------------------------ | :-----------------------------------------------------------: | :----------------------: | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --- | ------- | --------- |
| source                         |                            object                             |         not null         | PDF source like {uri:xxx, cache:false}. see the following for detail.                                                                                                       | ✔  | ✔      | ✔        |
| page                           |                            number                             |            1             | initial page index                                                                                                                                                          | ✔  | ✔      | ✔        |
| scale                          |                            number                             |           1.0            | should minScale<=scale<=maxScale                                                                                                                                            | ✔  | ✔      | ✔        |
| minScale                       |                            number                             |           1.0            | min scale                                                                                                                                                                   | ✔  | ✔      | ✔        |
| maxScale                       |                            number                             |           3.0            | max scale                                                                                                                                                                   | ✔  | ✔      | ✔        |
| horizontal                     |                             bool                              |          false           | draw page direction, if you want to listen the orientation change, you can use [react-native-orientation-locker](https://github.com/wonday/react-native-orientation-locker) | ✔  | ✔      | ✔        |
| showsHorizontalScrollIndicator |                             bool                              |           true           | shows or hides the horizontal scroll bar indicator on iOS                                                                                                                   | ✔  |         | ✔        |
| showsVerticalScrollIndicator   |                             bool                              |           true           | shows or hides the vertical scroll bar indicator on iOS                                                                                                                     | ✔  |         | ✔        |
| scrollEnabled                  |                             bool                              |           true           | enable or disable scroll                                                                                                                                                    | ✔  |         | ✖        |
| fitPolicy                      |                            number                             |            2             | 0:fit width, 1:fit height, 2:fit both(default)                                                                                                                              | ✔  | ✔      | ✖        |
| spacing                        |                            number                             |            10            | the breaker size between pages                                                                                                                                              | ✔  | ✔      | ✔        |
| password                       |                            string                             |            ""            | pdf password, if password error, will call OnError() with message "Password required or incorrect password."                                                                | ✔  | ✔      | ✔        |
| style                          |                            object                             | {backgroundColor:"#eee"} | support normal view style, you can use this to set border/spacing color...                                                                                                  | ✔  | ✔      | ✔        |
| progressContainerStyle         |                            object                             | {backgroundColor:"#eee"} | support normal view style, you can use this to set border/spacing color...                                                                                                  | ✔  | ✔      | ✖        |
| renderActivityIndicator        |                    (progress) => Component                    |      <ProgressBar/>      | when loading show it as an indicator, you can use your component                                                                                                            | ✔  | ✔      | ✖        |
| enableAntialiasing             |                             bool                              |           true           | improve rendering a little bit on low-res screens, but maybe course some problem on Android 4.4, so add a switch                                                            | ✖  | ✔      | ✖        |
| enablePaging                   |                             bool                              |          false           | only show one page in screen                                                                                                                                                | ✔  | ✔      | ✔        |
| enableRTL                      |                             bool                              |          false           | scroll page as "page3, page2, page1"                                                                                                                                        | ✔  | ✖      | ✖        |
| enableAnnotationRendering      |                             bool                              |           true           | enable rendering annotation, notice:iOS only support initial setting,not support realtime changing                                                                          | ✔  | ✔      | ✖        |
| enableDoubleTapZoom            |                             bool                              |           true           | Enable double tap to zoom gesture                                                                                                                                           | ✔  | ✔      | ✖        |
| trustAllCerts                  |                             bool                              |           true           | Allow connections to servers with self-signed certification                                                                                                                 | ✔  | ✔      | ✖        |
| singlePage                     |                             bool                              |          false           | Only show first page, useful for thumbnail views                                                                                                                            | ✔  | ✔      | ✖        |
| onLoadProgress                 |                       function(percent)                       |           null           | callback when loading, return loading progress (0-1)                                                                                                                        | ✔  | ✔      | ✖        |
| onLoadComplete                 | function(numberOfPages, path, {width, height}, tableContents) |           null           | callback when pdf load completed, return total page count, pdf local/cache path, {width,height} and table of contents                                                       | ✔  | ✔      | ✔        |
| onPageChanged                  |                 function(page,numberOfPages)                  |           null           | callback when page changed ,return current page and total page count                                                                                                        | ✔  | ✔      | ✔        |
| onError                        |                        function(error)                        |           null           | callback when error happened                                                                                                                                                | ✔  | ✔      | ✔        |
| onPageSingleTap                |                        function(page)                         |           null           | callback when page was single tapped                                                                                                                                        | ✔  | ✔      | ✔        |
| onScaleChanged                 |                        function(scale)                        |           null           | callback when scale page                                                                                                                                                    | ✔  | ✔      | ✖        |
| onPressLink                    |                         function(uri)                         |           null           | callback when link tapped                                                                                                                                                   | ✔  | ✔      | ✖        |

#### parameters of source

| parameter     | Description                                   | default          | iOS | Android | Supported |
| ------------- | --------------------------------------------- | ---------------- | --- | ------- | --------- |
| uri           | pdf source, see the following for detail.     | required         | ✔  | ✔      | ✔        |
| cache         | use cache or not                              | false            | ✔  | ✔      | ✔        |
| cacheFileName | specific file name for cached pdf file        | SHA1(uri) result | ✔  | ✔      | ✖        |
| expiration    | cache file expired seconds (0 is not expired) | 0                | ✔  | ✔      | ✖        |
| method        | request method when uri is a url              | "GET"            | ✔  | ✔      | ✖        |
| headers       | request headers when uri is a url             | {}               | ✔  | ✔      | ✖        |

#### types of source.uri

| Usage                                                                | Description                                                                               | iOS  | Android | Supported |
| -------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- | ---- | ------- | --------- |
| `{uri:"http://xxx/xxx.pdf"}`                                         | load pdf from a url                                                                       | ✔   | ✔      | ✔        |
| `{require("./test.pdf")}`                                            | load pdf relate to js file (do not need add by xcode)                                     | ✔   | ✖      | ✖        |
| `{uri:"bundle-assets://path/to/xxx.pdf"}`                            | load pdf from assets, the file should be at android/app/src/main/assets/path/to/xxx.pdf   | ✖   | ✔      | ✖        |
| `{uri:"bundle-assets://xxx.pdf"}`                                    | load pdf from assets, you must add pdf to project by xcode. this does not support folder. | ✔   | ✖      | ✖        |
| `{uri:"data:application/pdf;base64,JVBERi0xLjcKJc..."}`              | load pdf from base64 string                                                               | ✔   | ✔      | ✖        |
| `{uri:"file:///absolute/path/to/xxx.pdf"}`                           | load pdf from local file system                                                           | ✔   | ✔      | ✖        |
| `{uri:"ms-appx:///xxx.pdf"}}`                                        | load pdf bundled with UWP app                                                             | ✖   | ✖      | ✖        |
| `{uri:"content://com.example.blobs/xxxxxxxx-...?offset=0&size=xxx"}` | load pdf from content URI                                                                 | ✔\* | ✖      | ✖        |
| `{uri:"blob:xxxxxxxx-...?offset=0&size=xxx"}`                        | load pdf from blob URL                                                                    | ✖   | ✔      | ✖        |

## Contributing

Contributions are very welcome! Please refer to guidelines described in the [contributing guide](https://github.com/expo/expo#contributing).

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
