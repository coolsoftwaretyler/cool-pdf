# Maestro Visual Testing for CoolPDF Scenarios

This skill documents the process for creating Maestro visual regression tests that compare CoolPDF implementation against react-native-pdf implementation for each scenario.

## Overview

The testing strategy uses:
- **Maestro** for UI automation and screenshot capture
- **Deep linking** for direct navigation to scenario screens
- **ImageMagick** for pixel-by-pixel visual comparison
- **HTML reports** for reviewing differences

## Test Architecture

### Directory Structure
```
example/
├── .maestro/
│   ├── flows/
│   │   ├── basic/
│   │   │   ├── basic-no-cache.yaml
│   │   │   ├── basic-with-cache.yaml
│   │   │   └── basic-cache-filename.yaml
│   │   ├── navigation/
│   │   ├── zoom/
│   │   └── events/
│   ├── utils/
│   └── run-all-tests.yaml
├── scripts/
│   └── compare-screenshots.js
└── visual-diff-results/
    └── visual-comparison-report.html
```

### Screenshot Storage
- Screenshots saved to: `/tmp/maestro-screenshots/`
- Naming pattern: `{scenario-name}-coolpdf.png` and `{scenario-name}-rnpdf.png`

## Prerequisites

### 1. Deep Link Configuration

**App Config** (`app.config.js`):
```javascript
scheme: 'coolpdf'
```

**Navigation Linking** (`App.tsx`):
```typescript
const linking = {
  prefixes: ['coolpdf://', 'expo.modules.coolpdf.example://'],
  config: {
    screens: {
      ScenarioList: 'scenarios',
      BasicNoCacheCoolPdf: 'basic-no-cache-cool',
      BasicNoCacheReactNativePdf: 'basic-no-cache-rnpdf',
      // Add route for each scenario screen pair
    },
  },
};
```

**Route Naming Convention:**
- CoolPDF: `{CategoryName}{ScenarioName}CoolPdf: '{category}-{scenario}-cool'`
- RN-PDF: `{CategoryName}{ScenarioName}ReactNativePdf: '{category}-{scenario}-rnpdf'`

### 2. Component Test IDs

**Event Log Toggle** (`ScenarioEventLog.tsx`):
```typescript
<TouchableOpacity
  testID="event-log-toggle"
  onPress={() => setIsExpanded(!isExpanded)}
>
```

**Event Data** (for behavioral assertions):
```typescript
<Text>
  {JSON.stringify(event.data, null, 2)}
</Text>
```

### 3. UI Consistency

To minimize visual noise in comparisons:

**Collapsible Headers** - Default collapsed to hide implementation-specific text
**Collapsible Event Logs** - Default collapsed to hide event data
**Unified Colors** - All scenarios use `#6b7280` (neutral gray) for headers and accents

This reduces visual diff from ~12% to <1%.

## Creating a New Test

### Step 1: Add Deep Link Routes

Edit `App.tsx` linking configuration:

```typescript
screens: {
  // ... existing routes ...
  YourScenarioCoolPdf: 'category-scenario-cool',
  YourScenarioReactNativePdf: 'category-scenario-rnpdf',
}
```

### Step 2: Create Maestro Test File

**Template for Visual-Only Tests:**

```yaml
appId: expo.modules.coolpdf.example
---
# Test: Your Scenario Name
# Category: Loading|Navigation|Zoom|Events|Style|Password
# Description: Brief description of what this tests

# Test CoolPDF implementation
- openLink: coolpdf://category-scenario-cool
- waitForAnimationToEnd

# Wait for PDF to load
- waitForAnimationToEnd:
    timeout: 10000

# Capture screenshot (with headers collapsed)
- takeScreenshot: /tmp/maestro-screenshots/scenario-name-coolpdf

# Test react-native-pdf implementation
- openLink: coolpdf://category-scenario-rnpdf
- waitForAnimationToEnd

# Wait for PDF to load
- waitForAnimationToEnd:
    timeout: 10000

# Capture screenshot (with headers collapsed)
- takeScreenshot: /tmp/maestro-screenshots/scenario-name-rnpdf
```

**Template for Tests with Event Assertions:**

```yaml
appId: expo.modules.coolpdf.example
---
# Test: Your Scenario Name
# Category: Loading|Navigation|Zoom|Events|Style|Password
# Description: Brief description including event assertions

# Test CoolPDF implementation
- openLink: coolpdf://category-scenario-cool
- waitForAnimationToEnd

# Wait for PDF to load
- waitForAnimationToEnd:
    timeout: 10000

# Scroll down to see the event log
- scroll

# Expand event log to check event data
- tapOn:
    id: "event-log-toggle"
- waitForAnimationToEnd

# Scroll to see the event data if needed
- scroll

# Assert on expected event data (use text matching within JSON)
- assertVisible:
    text: "expected-value-in-event"

# Collapse event log before screenshot
- tapOn:
    id: "event-log-toggle"
- waitForAnimationToEnd

# Capture screenshot (with headers collapsed)
- takeScreenshot: /tmp/maestro-screenshots/scenario-name-coolpdf

# Repeat for react-native-pdf implementation
- openLink: coolpdf://category-scenario-rnpdf
# ... same steps as above ...
```

### Step 3: Add to Master Test Suite

Edit `.maestro/run-all-tests.yaml`:

```yaml
# Category tests
- runFlow: flows/category/scenario-name.yaml
```

### Step 4: Run and Validate

```bash
# Run single test
maestro test .maestro/flows/category/scenario-name.yaml

# Generate visual comparison report
npm run test:visual:report

# Run all tests with visual comparison
npm run test:visual
```

## Common Patterns

### Navigation Tests

For page navigation scenarios, add interaction before screenshot:

```yaml
# Navigate to page 5
- tapOn:
    text: "5"
- waitForAnimationToEnd

# Capture screenshot of page 5
- takeScreenshot: /tmp/maestro-screenshots/scenario-name-coolpdf
```

### Zoom Tests

For zoom scenarios, use pinch gestures:

```yaml
# Pinch to zoom
- pinchToZoom:
    scale: 2.0

# Wait for zoom animation
- waitForAnimationToEnd

# Capture screenshot of zoomed view
- takeScreenshot: /tmp/maestro-screenshots/scenario-name-coolpdf
```

### Event Assertion Tips

**Problem:** Maestro can't read text inside JSON.stringify output
**Solution:** Assert on substrings that appear in the JSON

Example - checking cache path:
```yaml
# The full path is: /data/user/0/expo.modules.coolpdf.example/cache/my-file.pdf
# Assert on the unique part:
- assertVisible:
    text: "cache/my-file.pdf"
```

**Problem:** Event log is off-screen
**Solution:** Scroll before tapping toggle
```yaml
- scroll
- tapOn:
    id: "event-log-toggle"
```

**Problem:** Event data is below the fold inside event log
**Solution:** Scroll again after expanding
```yaml
- tapOn:
    id: "event-log-toggle"
- waitForAnimationToEnd
- scroll
- assertVisible:
    text: "expected-value"
```

## Troubleshooting

### "launchApp" conflicts with "openLink"
**Error:** Deep links don't work when `launchApp` is present
**Fix:** Remove `launchApp` - `openLink` launches the app automatically

### Text not found in UI
**Error:** `Element not found: Text matching regex: X`
**Solutions:**
1. Check exact text including parentheses: `"Event Log (1)"` not `"Event Log"`
2. Add scroll command before assertion
3. Use testID instead: `tapOn: { id: "element-id" }`
4. Verify text is actually visible in debug screenshots at `~/.maestro/tests/*/screenshot-*.png`

### Screenshot has wrong extension
**Error:** Screenshots saved as `file.png.png`
**Fix:** Don't include `.png` in `takeScreenshot` path - Maestro adds it automatically

### Visual diff too high
**Solutions:**
1. Ensure headers are collapsed (default state)
2. Ensure event logs are collapsed (default state)
3. Verify all scenario screens use unified color `#6b7280`
4. Check that no dynamic timestamps or implementation names appear in UI

### ImageMagick crashes on differences
**Error:** `compare` command exits with code 1
**Fix:** Already handled in `compare-screenshots.js` - it catches the error and extracts diff count from stdout/stderr

## Package Scripts

```json
{
  "test:maestro": "maestro test .maestro/",
  "test:maestro:basic": "maestro test .maestro/flows/basic/",
  "test:visual": "maestro test .maestro/ && node scripts/compare-screenshots.js",
  "test:visual:report": "node scripts/compare-screenshots.js"
}
```

## Visual Comparison Report

The `compare-screenshots.js` script:
1. Finds all screenshot pairs in `/tmp/maestro-screenshots/`
2. Uses ImageMagick `compare -metric AE` to count different pixels
3. Calculates percentage difference
4. Categorizes as: Identical (0%), Minor (<5%), Significant (≥5%)
5. Generates HTML report with side-by-side comparisons
6. Opens report in browser

**Report Location:** `example/visual-diff-results/visual-comparison-report.html`

## Expected Results

**Good Tests:**
- Visual diff: 0-1% (minor differences due to anti-aliasing, rendering variations)
- Status: "Identical" or "Minor differences"
- All assertions pass
- Screenshots captured at same PDF page/state

**Bad Tests:**
- Visual diff: >5% (significant differences)
- Failed assertions
- Screenshots at different pages
- Headers/logs expanded in one screenshot but not the other

## Complete Example: Basic Cache Filename

**Routes in App.tsx:**
```typescript
BasicCacheFileNameCoolPdf: 'basic-cache-filename-cool',
BasicCacheFileNameReactNativePdf: 'basic-cache-filename-rnpdf',
```

**Test File:** `.maestro/flows/basic/basic-cache-filename.yaml`
```yaml
appId: expo.modules.coolpdf.example
---
# Test: Basic Cache Filename
# Category: Loading
# Description: Tests loading a PDF from a URL with a custom cache filename

# Test CoolPDF implementation
- openLink: coolpdf://basic-cache-filename-cool
- waitForAnimationToEnd
- waitForAnimationToEnd:
    timeout: 10000

# Check cached path in event log
- scroll
- tapOn:
    id: "event-log-toggle"
- waitForAnimationToEnd
- scroll
- assertVisible:
    text: "cache/my-custom-cached-file.pdf"
- tapOn:
    id: "event-log-toggle"
- waitForAnimationToEnd

- takeScreenshot: /tmp/maestro-screenshots/basic-cache-filename-coolpdf

# Test react-native-pdf implementation
- openLink: coolpdf://basic-cache-filename-rnpdf
- waitForAnimationToEnd
- waitForAnimationToEnd:
    timeout: 10000

# Check cached path in event log
- scroll
- tapOn:
    id: "event-log-toggle"
- waitForAnimationToEnd
- scroll
- assertVisible:
    text: "cache/my-custom-cached-file.pdf"
- tapOn:
    id: "event-log-toggle"
- waitForAnimationToEnd

- takeScreenshot: /tmp/maestro-screenshots/basic-cache-filename-rnpdf
```

**Run Test:**
```bash
maestro test .maestro/flows/basic/basic-cache-filename.yaml
npm run test:visual:report
```

**Expected Output:**
```
✓ Found 3 screenshot pair(s)
Comparing: basic-cache-filename
...
📊 Comparison Summary:
   Minor differences: 3
   Significant differences: 0
```

## Tips for Success

1. **Always run `npx expo prebuild --clean`** after changing `app.config.js`
2. **Use testIDs** for reliable element selection over text matching
3. **Keep UI consistent** - collapsible components, unified colors
4. **Test incrementally** - run single test first, then add to suite
5. **Check debug screenshots** in `~/.maestro/tests/*/` when assertions fail
6. **Use scroll liberally** - better to scroll twice than miss an element
7. **Wait for animations** - add `waitForAnimationToEnd` after navigation and interactions
8. **Collapse UI before screenshots** - ensures visual consistency

## Next Steps

With this pattern established for 3 basic loading tests, replicate for:
- 4 more loading tests (7 total)
- 6 event tests
- 9 navigation tests
- 7 zoom tests
- 4 style tests
- 3 password tests

**Total:** ~40 scenario comparisons with visual regression testing
