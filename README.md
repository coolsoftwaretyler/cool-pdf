# cool-pdf

PDF View Component for Expo. Intended as a drop-in replacement for [react-native-pdf](https://github.com/wonday/react-native-pdf/). Check [compatibility table for current progress](https://github.com/coolsoftwaretyler/cool-pdf?tab=readme-ov-file#props-compatibility-with-react-native-pdf). Contributions welcome.

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

<CoolPdfView source={{ uri: url }} />;
```

## Compatibility with react-native-pdf

Overall compatibility: 59%

- 14/29 props
- 6/6 source parameters
- 6/9 types of source uri
- 26/44 total props supported

### Props

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
| scrollEnabled                  |                             bool                              |           true           | enable or disable scroll                                                                                                                                                    | ✔  |         | ✔        |
| fitPolicy                      |                            number                             |            2             | 0:fit width, 1:fit height, 2:fit both(default)                                                                                                                              | ✔  | ✔      | ✔        |
| spacing                        |                            number                             |            10            | the breaker size between pages                                                                                                                                              | ✔  | ✔      | ✔        |
| password                       |                            string                             |            ""            | pdf password, if password error, will call OnError() with message "Password required or incorrect password."                                                                | ✔  | ✔      | ✖        |
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
| onPageChanged                  |                 function(page,numberOfPages)                  |           null           | callback when page changed ,return current page and total page count                                                                                                        | ✔  | ✔      | ✖        |
| onError                        |                        function(error)                        |           null           | callback when error happened                                                                                                                                                | ✔  | ✔      | ✖        |
| onPageSingleTap                |                        function(page)                         |           null           | callback when page was single tapped                                                                                                                                        | ✔  | ✔      | ✖        |
| onScaleChanged                 |                        function(scale)                        |           null           | callback when scale page                                                                                                                                                    | ✔  | ✔      | ✖        |
| onPressLink                    |                         function(uri)                         |           null           | callback when link tapped                                                                                                                                                   | ✔  | ✔      | ✖        |

#### parameters of source

| parameter     | Description                                   | default          | iOS | Android | Supported |
| ------------- | --------------------------------------------- | ---------------- | --- | ------- | --------- |
| uri           | pdf source, see the following for detail.     | required         | ✔  | ✔      | ✔        |
| cache         | use cache or not                              | false            | ✔  | ✔      | ✔        |
| cacheFileName | specific file name for cached pdf file        | SHA1(uri) result | ✔  | ✔      | ✔        |
| expiration    | cache file expired seconds (0 is not expired) | 0                | ✔  | ✔      | ✔        |
| method        | request method when uri is a url              | "GET"            | ✔  | ✔      | ✔        |
| headers       | request headers when uri is a url             | {}               | ✔  | ✔      | ✔        |

#### types of source.uri

| Usage                                                                | Description                                                                               | iOS  | Android | Supported |
| -------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- | ---- | ------- | --------- |
| `{uri:"http://xxx/xxx.pdf"}`                                         | load pdf from a url                                                                       | ✔   | ✔      | ✔        |
| `{require("./test.pdf")}`                                            | load pdf relate to js file (do not need add by xcode)                                     | ✔   | ✔      | ✔        |
| `{uri:"bundle-assets://path/to/xxx.pdf"}`                            | load pdf from assets, the file should be at android/app/src/main/assets/path/to/xxx.pdf   | ✖   | ✔      | ✔        |
| `{uri:"bundle-assets://xxx.pdf"}`                                    | load pdf from assets, you must add pdf to project by xcode. this does not support folder. | ✔   | ✖      | ✔        |
| `{uri:"data:application/pdf;base64,JVBERi0xLjcKJc..."}`              | load pdf from base64 string                                                               | ✔   | ✔      | ✔        |
| `{uri:"file:///absolute/path/to/xxx.pdf"}`                           | load pdf from local file system                                                           | ✔   | ✔      | ✔        |
| `{uri:"ms-appx:///xxx.pdf"}}`                                        | load pdf bundled with UWP app                                                             | ✖   | ✖      | ✖        |
| `{uri:"content://com.example.blobs/xxxxxxxx-...?offset=0&size=xxx"}` | load pdf from content URI                                                                 | ✔\* | ✖      | ✖        |
| `{uri:"blob:xxxxxxxx-...?offset=0&size=xxx"}`                        | load pdf from blob URL                                                                    | ✖   | ✔      | ✖        |
