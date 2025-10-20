# Maestro Testing Strategy for cool-pdf

## Overview

This document outlines the comprehensive testing strategy for the cool-pdf Expo module using Maestro UI tests. The tests compare CoolPDF implementation against react-native-pdf across ~40 scenarios.

## Current Implementation Status

### ✅ Completed
- Directory structure created (`.maestro/flows/` organized by category)
- Shared helper flows for common actions
- Example test implemented: `basic-no-cache.yaml`
- Documentation and README

### 🚧 To Be Implemented
- Remaining ~39 test scenarios across all categories
- Visual regression testing workflow
- CI/CD integration

## Test Categories & Approaches

### 1. **Loading Tests** (Basic Category - ~10 scenarios)
**Approach:** Behavioral assertions

**Scenarios:**
- Basic No Cache ✅ (implemented)
- Basic With Cache
- Basic Cache File Name
- Basic Cache Expiration
- Custom HTTP Method
- Custom Headers
- Base64 PDF Rendering
- Require Local PDF
- Bundle Assets PDF
- File URI Local PDF

**Testing Pattern:**
```yaml
- launchApp
- Navigate to scenario
- Test CoolPDF: Assert no error, verify PDF loads
- Test react-native-pdf: Assert no error, verify PDF loads
```

**Key Assertions:**
- `assertNotVisible: "Error"`
- Wait for load completion (timeout: 10s)
- Verify implementation header visible

---

### 2. **Event Tests** (Events Category - 6 scenarios)
**Approach:** Behavioral - verify event log displays correct data

**Scenarios:**
- OnLoadComplete
- OnLoadProgress
- OnPageChanged
- OnError
- OnPageSingleTap
- OnScaleChanged
- OnPressLink

**Testing Pattern:**
```yaml
- Navigate to event scenario
- Trigger event (e.g., tap PDF, swipe page, pinch zoom)
- Assert event log shows expected data
- Example: assertVisible: "loadComplete"
- Example: assertVisible: "numberOfPages"
```

**Key Assertions:**
- Verify event type appears in log
- Check event data format/values
- Use regex patterns for flexible matching

---

### 3. **Navigation Tests** (Navigation Category - 9 scenarios)
**Approach:** Behavioral - gestures + assertions

**Scenarios:**
- Horizontal Scrolling
- Page Snapping
- Horizontal With Paging
- Custom Spacing
- Page Prop
- Spacing Prop
- Enable Paging Prop
- Horizontal Prop
- Enable RTL Prop
- Single Page

**Testing Pattern:**
```yaml
- Navigate to scenario
- Perform swipe gestures
- Assert page number changes in event log
- Verify scrolling behavior matches expected
```

**Key Actions:**
- `swipe` for page navigation
- `scroll` for testing scroll behavior
- Check `onPageChanged` event data

---

### 4. **Zoom Tests** (Zoom Category - 7 scenarios)
**Approach:** Behavioral - gestures + event verification

**Scenarios:**
- Initial Zoom
- Custom Zoom Range
- Restricted Zoom
- Scale Prop
- Min Scale Prop
- Max Scale Prop
- Fit Policy Prop
- Enable Double Tap Zoom Prop

**Testing Pattern:**
```yaml
- Navigate to scenario
- Perform pinch/double-tap gestures
- Verify onScaleChanged events
- Check scale values in event log
```

**Key Actions:**
- Double-tap for zoom testing
- Pinch gestures
- Verify scale values match expectations

---

### 5. **Style/Visual Tests** (Style Category - 4 scenarios)
**Approach:** Visual regression - screenshots + comparison

**Scenarios:**
- Style Prop (borders, dimensions)
- Render Activity Indicator
- Progress Container Style
- Enable Annotations
- Disable Annotations

**Testing Pattern:**
```yaml
- Navigate to scenario
- Wait for render
- takeScreenshot: "coolpdf-{scenario}"
- Navigate to react-native-pdf
- takeScreenshot: "rnpdf-{scenario}"
- (External comparison with image diff tools)
```

**Visual Comparison Tools:**
- Maestro Cloud (built-in visual testing)
- External: Pixelmatch, Percy, Applitools
- Manual review during development

---

### 6. **Password Tests** (Password Category - 3 scenarios)

**Scenarios:**
- Password Prop
- Password Correct
- Password Incorrect

**Testing Pattern:**
```yaml
- Navigate to scenario
- For incorrect: assertVisible: "Error" or password error message
- For correct: assertVisible: PDF content, no error
```

---

## Test File Naming Convention

```
.maestro/flows/{category}/{scenario-name-kebab-case}.yaml
```

Examples:
- `basic/basic-no-cache.yaml`
- `events/on-load-complete.yaml`
- `navigation/horizontal-scrolling.yaml`
- `zoom/enable-double-tap-zoom.yaml`
- `style/style-prop.yaml`

---

## Shared Helper Flows

### 1. `utils/navigate-to-scenario.yaml`
Reusable flow to navigate from home to any scenario.

**Usage:**
```yaml
- runFlow:
    file: utils/navigate-to-scenario.yaml
    env:
      CATEGORY: "Loading"
      SCENARIO_NAME: "Basic No Cache"
```

### 2. `utils/test-both-implementations.yaml`
Tests both CoolPDF and react-native-pdf with the same test flow.

**Usage:**
```yaml
- runFlow:
    file: utils/test-both-implementations.yaml
    env:
      SCENARIO_NAME: "Basic No Cache"
      TEST_FLOW: "flows/basic/basic-no-cache-actions.yaml"
```

### 3. `utils/common-assertions.yaml`
Common assertion patterns (no errors, successful load, etc.)

---

## Implementation Roadmap

### Phase 1: Core Behavioral Tests
1. Complete all loading tests (basic category)
2. Implement event tests with event log assertions
3. Add navigation tests with gestures

**Estimated: 25 tests**

### Phase 2: Advanced Interaction Tests
1. Implement zoom/scale tests
2. Add password tests
3. Test scroll indicators and interaction props

**Estimated: 10 tests**

### Phase 3: Visual Regression
1. Implement style/visual tests with screenshots
2. Set up visual comparison workflow
3. Create baseline images

**Estimated: 5 tests**

### Phase 4: CI/CD Integration
1. Add GitHub Actions workflow
2. Configure Maestro Cloud
3. Automate test runs on PR

---

## Running Tests

### Single Test
```bash
cd example
maestro test .maestro/flows/basic/basic-no-cache.yaml
```

### Category
```bash
maestro test .maestro/flows/basic/
```

### All Tests
```bash
maestro test .maestro/
```

### With Specific Device
```bash
maestro test --device "iPhone 15 Pro" .maestro/flows/basic/basic-no-cache.yaml
```

---

## Test Quality Guidelines

1. **Wait Appropriately**: PDFs take time to load, use 10s timeout
2. **Clear Assertions**: Check for specific text, not just "visible"
3. **Clean Navigation**: Always navigate back properly between tests
4. **Descriptive Comments**: Explain what each test section does
5. **Handle Edge Cases**: Test both success and failure scenarios

---

## CI/CD Integration (Future)

### GitHub Actions Workflow
```yaml
name: Maestro Tests
on: [pull_request]
jobs:
  test:
    runs-on: macos-latest
    steps:
      - uses: actions/checkout@v3
      - uses: mobile-dev-inc/action-maestro-cloud@v1
        with:
          api-key: ${{ secrets.MAESTRO_CLOUD_API_KEY }}
          app-file: example/ios/build/CoolPdfExample.app
          workspace: .maestro
```

---

## Next Steps

1. **Implement remaining tests** following the patterns in `basic-no-cache.yaml`
2. **Test on both platforms** (iOS and Android) to ensure compatibility
3. **Create master flow files** that run all tests in each category
4. **Document edge cases** and platform-specific behaviors
5. **Set up visual regression** workflow for style tests

---

## Additional Resources

- [Maestro Documentation](https://maestro.mobile.dev)
- [Maestro Cloud](https://cloud.mobile.dev)
- [Example App Scenarios](../screens/scenarios/)
- [CoolPDF README](../../README.md)