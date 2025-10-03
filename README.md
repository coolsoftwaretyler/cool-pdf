# cool-pdf

PDF View Component for Expo. Intended as a drop-in replacement for [react-native-pdf](https://github.com/wonday/react-native-pdf/)

## Installation

### Add the package to your npm dependencies

```sh
npm install cool-pdf
```

## Usage

### Props Compatibility with react-native-pdf

| Prop | Type | Supported | Notes |
|------|------|-----------|-------|
| **Source Props** | | | |
| `source.uri` | string | ✅ | PDF source URL |
| `source.cache` | boolean | ✅ | Enable/disable caching |
| `source.cacheFileName` | string | ❌ | |
| `source.password` | string | ❌ | Use `password` prop instead |
| `password` | string | ✅ | Password for protected PDFs |
| **Display Props** | | | |
| `page` | number | ✅ | Current page number (default: 1) |
| `scale` | number | ✅ | Zoom scale (default: 1.0) |
| `minScale` | number | ✅ | Minimum zoom scale (default: 1.0) |
| `maxScale` | number | ✅ | Maximum zoom scale (default: 3.0) |
| `horizontal` | boolean | ✅ | Horizontal scroll mode (default: false) |
| `fitPolicy` | number | ❌ | 0=width, 1=height, 2=both |
| `spacing` | number | ✅ | Space between pages (default: 10) |
| `enablePaging` | boolean | ✅ | Enable page snapping (default: false) |
| `singlePage` | boolean | ❌ | Show single page at a time |
| **Interaction Props** | | | |
| `scrollEnabled` | boolean | ❌ | Enable/disable scrolling |
| `enableRTL` | boolean | ❌ | Right-to-left layout |
| `enableDoubleTapZoom` | boolean | ❌ | Double tap to zoom |
| **Scroll Indicators (iOS)** | | | |
| `showsHorizontalScrollIndicator` | boolean | ✅ | Show horizontal scroll indicator |
| `showsVerticalScrollIndicator` | boolean | ✅ | Show vertical scroll indicator |
| **Styling Props** | | | |
| `style` | ViewStyle | ✅ | Component style |
| `progressContainerStyle` | ViewStyle | ❌ | Loading indicator container style |
| **Callback Props** | | | |
| `onLoadProgress` | function | ❌ | Loading progress callback |
| `onLoadComplete` | function | ✅ | Load complete callback |
| `onPageChanged` | function | ✅ | Page change callback |
| `onError` | function | ✅ | Error callback |
| `onPageSingleTap` | function | ✅ | Single tap callback |
| `onScaleChanged` | function | ❌ | Scale change callback |
| `onPressLink` | function | ❌ | Link press callback |
| **Platform-Specific Props** | | | |
| `enableAnnotationRendering` | boolean | ❌ | Render PDF annotations |
| `enableAntialiasing` | boolean | ❌ | Enable antialiasing (Android) |
| `trustAllCerts` | boolean | ❌ | Trust all SSL certificates |
| **Custom Rendering** | | | |
| `renderActivityIndicator` | function | ❌ | Custom loading indicator |
| `enableAnnotations` | boolean | ✅ | Enable PDF annotations |

## Contributing

Contributions are very welcome! Please refer to guidelines described in the [contributing guide]( https://github.com/expo/expo#contributing).

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