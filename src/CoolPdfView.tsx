import { requireNativeView } from "expo";
import * as React from "react";
import { Image, View, Text, StyleSheet } from "react-native";

import { CoolPdfViewProps } from "./CoolPdf.types";

const NativeView: React.ComponentType<CoolPdfViewProps> =
  requireNativeView("CoolPdf");

export default function CoolPdfView(props: CoolPdfViewProps) {
  const [loadProgress, setLoadProgress] = React.useState(0);
  const [isLoaded, setIsLoaded] = React.useState(false);

  // Create a stable reference to source URI for comparison
  const sourceKey = React.useMemo(() => {
    const source = props.source;
    if (typeof source === 'string') return source;
    if (typeof source === 'object') {
      return source.uri || source.path || source.base64 || '';
    }
    return '';
  }, [props.source]);

  // Reset loading state when source changes
  React.useEffect(() => {
    setIsLoaded(false);
    setLoadProgress(0);
  }, [sourceKey]);

  // Wrap callbacks to avoid stale closures
  const handleLoadProgress = React.useCallback((event: any) => {
    const percent = event.nativeEvent.percent;
    setLoadProgress(percent);
    props.onLoadProgress?.(event);
  }, [props.onLoadProgress]);

  const handleLoadComplete = React.useCallback((event: any) => {
    console.log('[CoolPdfView] onLoadComplete fired, setting isLoaded to true');
    setIsLoaded(true);
    setLoadProgress(1);
    props.onLoadComplete?.(event);
  }, [props.onLoadComplete]);

  // Transform base64 data URIs to base64 source objects
  const transformedProps = React.useMemo(() => {
    const { source, renderActivityIndicator, onLoadProgress, onLoadComplete, ...otherProps } = props;

    // If source is a string or has a uri property, check for base64 data URI
    let transformedSource = source;

    // Handle require() by resolving asset source
    if (
      typeof source === "object" &&
      source.uri &&
      typeof source.uri === "number"
    ) {
      const resolved = Image.resolveAssetSource(source.uri);
      if (resolved) {
        transformedSource = {
          ...source,
          uri: resolved.uri,
        };
      }
    }

    if (
      typeof source === "object" &&
      source.uri &&
      typeof source.uri === "string"
    ) {
      const base64Match = source.uri.match(
        /^data:application\/pdf;base64,(.+)$/
      );
      if (base64Match) {
        // Extract base64 content and create new source object
        const { uri, ...otherSourceProps } = source;
        transformedSource = {
          ...otherSourceProps,
          base64: base64Match[1],
        };
      }
    }

    return {
      ...otherProps,
      source: transformedSource,
      onLoadProgress: handleLoadProgress,
      onLoadComplete: handleLoadComplete,
    };
  }, [props, handleLoadProgress, handleLoadComplete]);

  console.log('[CoolPdfView] Rendering, isLoaded:', isLoaded, 'loadProgress:', loadProgress);

  return (
    <View style={[props.style, { overflow: 'hidden' }]}>
      <NativeView {...transformedProps} />
      {!isLoaded && (
        <View style={styles.progressContainer}>
          {props.renderActivityIndicator
            ? props.renderActivityIndicator(loadProgress)
            : <Text>{`${(loadProgress * 100).toFixed(2)}%`}</Text>}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  progressContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
});
