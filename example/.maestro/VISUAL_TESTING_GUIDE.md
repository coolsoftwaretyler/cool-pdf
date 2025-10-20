# Visual Testing Guide for cool-pdf

This guide explains how to run automated visual comparison tests between CoolPDF and react-native-pdf implementations.

## Overview

The visual testing system:
1. Runs all Maestro tests
2. Captures screenshots of both CoolPDF and react-native-pdf for each scenario
3. Uses ImageMagick to generate visual diff images
4. Creates an HTML report showing side-by-side comparisons with metrics

## Prerequisites

1. **Maestro** - Mobile UI testing framework
   ```bash
   curl -Ls "https://get.maestro.mobile.dev" | bash
   ```

2. **ImageMagick** - Image comparison tool
   ```bash
   brew install imagemagick
   ```

3. **Running App** - Have the example app running on a simulator/emulator
   ```bash
   cd example
   npx expo run:android  # or run:ios
   ```

## Running Visual Tests

### Option 1: Run Tests + Generate Report (Recommended)
```bash
cd example
npm run test:visual
```

This will:
- Run all Maestro tests
- Capture screenshots automatically
- Generate visual diff images
- Create an HTML report
- Open the report in your browser

### Option 2: Run Tests Only
```bash
npm run test:maestro
```

### Option 3: Generate Report from Existing Screenshots
```bash
npm run test:visual:report
```

## Test Organization

```
.maestro/
├── flows/
│   ├── basic/          # Loading tests (basic-no-cache.yaml, etc.)
│   ├── events/         # Event tests (on-load-complete.yaml, etc.)
│   ├── navigation/     # Navigation tests (page-prop.yaml, etc.)
│   ├── style/          # Visual/style tests (style-prop.yaml, etc.)
│   └── zoom/           # Zoom tests
├── utils/              # Shared helper flows
├── config.yaml         # Global configuration
└── run-all-tests.yaml  # Master test suite
```

## Screenshot Naming Convention

For visual comparison to work, screenshots must follow this naming pattern:

- **CoolPDF screenshot**: `{scenario-name}-coolpdf.png`
- **react-native-pdf screenshot**: `{scenario-name}-rnpdf.png`

Example:
```yaml
# In a Maestro test
- takeScreenshot: basic-no-cache-coolpdf
# ...later in the same test
- takeScreenshot: basic-no-cache-rnpdf
```

## Understanding the Report

The HTML report shows:

### Summary Section
- Total number of tests
- Tests with identical results
- Tests with minor differences (< 1% difference)
- Tests with significant differences (≥ 1% difference)

### Per-Test Comparison
Each test shows:
1. **CoolPDF screenshot** - Your implementation
2. **react-native-pdf screenshot** - Reference implementation
3. **Diff image** - Highlights differences in red
4. **Metrics**:
   - Different Pixels: Count of pixels that don't match
   - Difference %: Percentage of total pixels that differ
   - Status: identical | minor-diff | significant-diff

## Writing New Visual Tests

### 1. Create the Test Flow

```yaml
# .maestro/flows/basic/my-new-test.yaml
appId: expo.modules.coolpdf.example
---
# Test CoolPDF implementation
- openLink: coolpdf://my-new-test-cool
- waitForAnimationToEnd
- assertVisible: "CoolPDF Implementation"
- waitForAnimationToEnd:
    timeout: 10000
- assertNotVisible:
    text: "Error"
    optional: true
- takeScreenshot: my-new-test-coolpdf

# Test react-native-pdf implementation
- openLink: coolpdf://my-new-test-rnpdf
- waitForAnimationToEnd
- assertVisible: "react-native-pdf Implementation"
- waitForAnimationToEnd:
    timeout: 10000
- assertNotVisible:
    text: "Error"
    optional: true
- takeScreenshot: my-new-test-rnpdf
```

### 2. Add Deep Link Routes

In `App.tsx`, add your screen routes to the linking config:

```typescript
const linking = {
  prefixes: ['coolpdf://', 'expo.modules.coolpdf.example://'],
  config: {
    screens: {
      // ... existing routes
      MyNewTestCoolPdf: 'my-new-test-cool',
      MyNewTestReactNativePdf: 'my-new-test-rnpdf',
    },
  },
};
```

### 3. Add to Master Test Suite

In `.maestro/run-all-tests.yaml`:

```yaml
- runFlow: flows/basic/my-new-test.yaml
```

## Tips for Better Visual Tests

### 1. Wait for Content to Load
```yaml
# Always wait for PDFs to fully load
- waitForAnimationToEnd:
    timeout: 10000
```

### 2. Consistent Timing
Use the same wait times for both implementations to ensure fair comparison.

### 3. Hide Dynamic Content
If your screens show timestamps or other dynamic data, consider hiding them for visual tests:
```yaml
- assertNotVisible:
    text: "timestamp"
    optional: true
```

### 4. Test Specific Features
Focus each test on a single feature (e.g., caching, page navigation, zoom) for easier debugging.

## Troubleshooting

### No Screenshots Found
- **Cause**: Tests didn't capture screenshots
- **Solution**: Check that your test uses `takeScreenshot` with correct naming (-coolpdf and -rnpdf suffixes)

### ImageMagick Not Found
- **Cause**: ImageMagick not installed
- **Solution**: Run `brew install imagemagick`

### Different Pixel Counts Very High
- **Cause**: Implementations render differently
- **Solution**: This is expected! Review the diff image to see what's different. Some differences are acceptable (e.g., slightly different antialiasing), others may indicate bugs.

### Test Timeout
- **Cause**: PDF taking too long to load
- **Solution**: Increase timeout in test:
  ```yaml
  - waitForAnimationToEnd:
      timeout: 15000  # 15 seconds
  ```

### Deep Link Not Working
- **Cause**: Screen route not configured
- **Solution**:
  1. Check `app.config.js` has `scheme: 'coolpdf'`
  2. Add route to linking config in `App.tsx`
  3. Rebuild the app with `npx expo run:android` or `npx expo run:ios`

## Output Locations

- **Maestro test results**: `~/.maestro/tests/{timestamp}/`
- **Screenshots**: Captured in test results directory
- **Visual diff report**: `example/visual-diff-results/visual-comparison-report.html`
- **Diff images**: `example/visual-diff-results/{scenario-name}-diff.png`

## CI/CD Integration

To run tests in CI:

```yaml
# .github/workflows/visual-tests.yml
name: Visual Tests
on: [pull_request]
jobs:
  test:
    runs-on: macos-latest
    steps:
      - uses: actions/checkout@v3
      - name: Install dependencies
        run: brew install imagemagick
      - name: Install Maestro
        run: curl -Ls "https://get.maestro.mobile.dev" | bash
      - name: Build app
        run: cd example && npx expo run:ios --no-install
      - name: Run visual tests
        run: cd example && npm run test:visual
      - name: Upload report
        uses: actions/upload-artifact@v3
        with:
          name: visual-test-report
          path: example/visual-diff-results/
```

## Best Practices

1. **Run tests on same device/emulator** for consistent results
2. **Review diff images manually** - automated metrics don't catch everything
3. **Update baselines** when making intentional visual changes
4. **Test on both iOS and Android** - implementations may differ per platform
5. **Keep tests focused** - one scenario per test file
6. **Document expected differences** - some variations are acceptable

## Example Workflow

```bash
# 1. Make changes to CoolPDF implementation
vim ios/CoolPdfView.swift

# 2. Rebuild the app
cd example
npx expo run:ios

# 3. Run visual tests
npm run test:visual

# 4. Review the HTML report that opens automatically

# 5. If differences are expected, document them
# If differences are bugs, fix and retest
```

## Getting Help

- Maestro Docs: https://maestro.mobile.dev
- ImageMagick Docs: https://imagemagick.org
- Project Issues: https://github.com/your-repo/issues