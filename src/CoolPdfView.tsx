import { requireNativeView } from 'expo';
import * as React from 'react';
import { Image } from 'react-native';

import { CoolPdfViewProps, PdfSource } from './CoolPdf.types';

const NativeView: React.ComponentType<CoolPdfViewProps> =
  requireNativeView('CoolPdf');

export default function CoolPdfView(props: CoolPdfViewProps) {
  // Transform base64 data URIs to base64 source objects
  const transformedProps = React.useMemo(() => {
    const { source, ...otherProps } = props;

    // If source is a string or has a uri property, check for base64 data URI
    let transformedSource = source;

    // Handle require() by resolving asset source
    if (typeof source === 'object' && source.uri && typeof source.uri === 'number') {
      const resolved = Image.resolveAssetSource(source.uri);
      if (resolved) {
        transformedSource = {
          ...source,
          uri: resolved.uri,
        };
      }
    }

    if (typeof source === 'object' && source.uri && typeof source.uri === 'string') {
      const base64Match = source.uri.match(/^data:application\/pdf;base64,(.+)$/);
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
    };
  }, [props]);

  return <NativeView {...transformedProps} />;
}
