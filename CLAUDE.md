# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

`cool-pdf` is an Expo module for displaying PDFs in React Native applications. The module provides a native view component that wraps platform-specific PDF rendering capabilities for iOS, Android, and web.

## Architecture

This is an **Expo module** built using `expo-module-scripts`. The architecture follows Expo's module pattern:

### TypeScript Layer (src/)
- **CoolPdfView.tsx**: React component that wraps the native view using `requireNativeView('CoolPdf')`
- **CoolPdfModule.ts**: Native module interface using `requireNativeModule('CoolPdf')`
- **CoolPdf.types.ts**: TypeScript type definitions for props and events
- **index.ts**: Main entry point that re-exports the view and module

### Native iOS Layer (ios/)
- **CoolPdfModule.swift**: Module definition using Expo's `Module` class
  - Defines the View, Props, and Events for iOS
  - Currently uses `WKWebView` as placeholder (will be replaced with PDFKit)
- **CoolPdfView.swift**: iOS view implementation extending `ExpoView`

### Native Android Layer (android/src/main/java/expo/modules/coolpdf/)
- **CoolPdfModule.kt**: Module definition using Expo's Kotlin DSL
  - Defines the View, Props, and Events for Android
  - Currently uses `WebView` as placeholder (will be replaced with PdfRenderer)
- **CoolPdfView.kt**: Android view implementation extending `ExpoView`

### Web Layer (src/)
- **CoolPdfModule.web.ts**: Web-specific module implementation
- **CoolPdfView.web.tsx**: Web-specific view implementation

## Development Commands

Build and test the module:
```bash
npm run build          # Build the TypeScript code
npm run clean          # Clean build artifacts
npm run lint           # Lint the codebase
npm run test           # Run tests
```

Work with the example app:
```bash
# Open native projects
npm run open:ios       # Opens iOS project in Xcode
npm run open:android   # Opens Android project in Android Studio

# Run the example app (from example/ directory)
cd example
npx expo start         # Start Expo dev server
npx expo run:ios       # Run on iOS simulator
npx expo run:android   # Run on Android emulator
```

## Module Configuration

The `expo-module.config.json` defines platform support and native module names:
- Platforms: apple, android, web
- iOS module: `CoolPdfModule`
- Android module: `expo.modules.coolpdf.CoolPdfModule`

## Current Implementation Status

The module currently has a **placeholder WebView implementation**. The goal is to replace this with native PDF rendering:
- **iOS**: Will use PDFKit (PDFView)
- **Android**: Will use PdfRenderer or similar PDF library
- **Web**: Will use browser-native PDF capabilities or pdf.js

## Key Implementation Notes

When implementing the PDF view:
1. Both iOS and Android views extend `ExpoView` (required for proper styling support like border radius)
2. Props are defined in the Module's `View()` definition using `Prop()`
3. Events are defined using `Events()` and dispatched with `EventDispatcher` in the view class
4. The view lifecycle is managed by Expo's module system
5. The TypeScript types in `CoolPdf.types.ts` must match the native prop definitions

## Reference Implementation

The implementation should follow patterns from `react-native-pdf` (https://github.com/wonday/react-native-pdf), particularly:
- PDF rendering approach for iOS (PDFKit) and Android (PdfRenderer)
- Common props like page navigation, zoom, scale
- Events for load completion, page changes, errors
