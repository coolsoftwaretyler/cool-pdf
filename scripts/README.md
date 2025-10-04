# Scenario Generator Script

This directory contains the `create-scenario.js` script for scaffolding new test scenarios in the example app.

## Usage

From the root of the project:

```bash
node scripts/create-scenario.js --name "Your Scenario Name" --category basic --id your-scenario-id
```

### Arguments

- `--name` - Human-readable scenario name (e.g., "Pinch Zoom Enabled")
- `--category` - Scenario category: `basic`, `navigation`, or `zoom`
- `--id` - Unique scenario ID in kebab-case (optional, auto-generated from name)

### Interactive Mode

If you don't provide all arguments, the script will prompt you interactively:

```bash
node scripts/create-scenario.js
# Scenario name (e.g., 'Pinch Zoom Enabled'): My Scenario
# Category (basic/navigation/zoom): basic
# Scenario ID [my-scenario]:
```

## What It Creates

For a scenario named "Pinch Zoom Enabled" in the "zoom" category:

1. **`example/screens/scenarios/zoom/PinchZoomEnabled.ts`** - Scenario metadata
2. **`example/screens/scenarios/zoom/PinchZoomEnabledCoolPdfScreen.tsx`** - CoolPDF implementation
3. **`example/screens/scenarios/zoom/PinchZoomEnabledReactNativePdfScreen.tsx`** - react-native-pdf implementation

## What It Updates

1. **`example/screens/scenarios/index.ts`** - Adds imports, exports, and registry entry
2. **`example/App.tsx`** - Adds screen imports, navigation types, and routes

## After Running

The script creates template files with TODO comments. Next steps:

1. Edit the scenario metadata (description, expectedBehavior, etc.)
2. Add PDF props to the CoolPDF screen
3. Add PDF props to the react-native-pdf screen
4. Test both implementations

## Example

```bash
node scripts/create-scenario.js --name "Enable Pinch Zoom" --category zoom --id enable-pinch-zoom
```

This creates:
- `PinchZoomEnabled.ts`
- `PinchZoomEnabledCoolPdfScreen.tsx`
- `PinchZoomEnabledReactNativePdfScreen.tsx`

And automatically wires them into the navigation system.
