# Maestro Tests for cool-pdf

This directory contains Maestro UI tests for the cool-pdf example app. The tests compare the CoolPDF implementation against react-native-pdf across various scenarios.

## Prerequisites

1. Install Maestro: https://maestro.mobile.dev/getting-started/installing-maestro
2. Have the example app built and ready to run on a simulator/emulator

## Running Tests

### Run a single test
```bash
# From the example/ directory
maestro test .maestro/flows/basic/basic-no-cache.yaml
```

### Run all tests in a category
```bash
maestro test .maestro/flows/basic/
```

### Run all tests
```bash
maestro test .maestro/
```

## Test Organization

```
.maestro/
├── flows/
│   ├── basic/          # Loading, caching, file sources
│   ├── navigation/     # Page navigation, scrolling, RTL
│   ├── zoom/           # Scale, zoom gestures
│   ├── events/         # Event callbacks
│   ├── style/          # Visual styling, indicators
│   └── password/       # Password-protected PDFs
└── utils/              # Shared helper flows
```

## Test Types

### Behavioral Tests
Most tests are behavioral - they verify that:
- PDFs load without errors
- Events fire with correct data
- User interactions work as expected
- Navigation and scrolling behave correctly

These tests use assertions to verify text appears in event logs and check for absence of error messages.

### Visual Tests
Some tests (in `style/`) capture screenshots for visual comparison:
- Style prop rendering
- Activity indicators
- Annotations
- Border radius and styling

## Writing New Tests

1. Create a new YAML file in the appropriate category folder
2. Use the app structure:
   - `launchApp` to start
   - Navigate to category (e.g., "Loading", "Events", "Zoom & Scale")
   - Tap on scenario name
   - Test both implementations
3. Use helper flows from `utils/` for common patterns

### Example Test Structure
```yaml
appId: expo.modules.coolpdf.example
---
- launchApp
- tapOn: "CategoryName"
- waitForAnimationToEnd
- tapOn: "Scenario Name"
- waitForAnimationToEnd

# Test CoolPDF
- tapOn: "View in CoolPDF"
- assertVisible: "CoolPDF Implementation"
# ... test actions ...
- tapOn:
    label: "Go back"

# Test react-native-pdf
- tapOn: "View in react-native-pdf"
- assertVisible: "react-native-pdf Implementation"
# ... test actions ...
- tapOn:
    label: "Go back"
```

## Troubleshooting

### App not found
Make sure the app is installed on your simulator/emulator with the correct bundle ID: `expo.modules.coolpdf.example`

### Test timeout
PDFs may take time to load. Increase timeout values if needed:
```yaml
- waitForAnimationToEnd:
    timeout: 10000  # 10 seconds
```

### Element not found
Check the exact text/label in the app. Maestro is case-sensitive.