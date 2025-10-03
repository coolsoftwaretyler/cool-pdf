import * as React from 'react';
import { CoolPdfViewProps, PdfSource } from './CoolPdf.types';

export default function CoolPdfView(props: CoolPdfViewProps) {
  const [pdfUrl, setPdfUrl] = React.useState<string>('');
  const [error, setError] = React.useState<string>('');
  const iframeRef = React.useRef<HTMLIFrameElement>(null);

  React.useEffect(() => {
    loadPdf();
  }, [props.source]);

  const loadPdf = async () => {
    try {
      let url = '';

      if (typeof props.source === 'string') {
        url = props.source;
      } else {
        const source = props.source as PdfSource;

        if (source.uri) {
          url = source.uri;
        } else if (source.path) {
          url = source.path;
        } else if (source.base64) {
          // Convert base64 to blob URL
          const binary = atob(source.base64);
          const bytes = new Uint8Array(binary.length);
          for (let i = 0; i < binary.length; i++) {
            bytes[i] = binary.charCodeAt(i);
          }
          const blob = new Blob([bytes], { type: 'application/pdf' });
          url = URL.createObjectURL(blob);
        }
      }

      if (url) {
        setPdfUrl(url);
      } else {
        const errorMsg = 'Invalid PDF source';
        setError(errorMsg);
        props.onError?.({ nativeEvent: { error: errorMsg } });
      }
    } catch (e) {
      const errorMsg = e instanceof Error ? e.message : 'Failed to load PDF';
      setError(errorMsg);
      props.onError?.({ nativeEvent: { error: errorMsg } });
    }
  };

  const handleLoad = () => {
    // In web, we can't easily get page count, dimensions, or table of contents without a PDF library
    // For now, we'll just trigger onLoadComplete with basic info
    props.onLoadComplete?.({
      nativeEvent: {
        numberOfPages: 1, // Unknown for iframe
        path: pdfUrl,
        dimensions: { width: 0, height: 0 }, // Unknown for iframe
        tableContents: [], // Unknown for iframe
      },
    });
  };

  const handleError = () => {
    const errorMsg = 'Failed to load PDF';
    setError(errorMsg);
    props.onError?.({ nativeEvent: { error: errorMsg } });
  };

  const containerStyle: React.CSSProperties = {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  };

  const iframeStyle: React.CSSProperties = {
    width: '100%',
    height: '100%',
    border: 'none',
    flex: 1,
  };

  if (error) {
    return (
      <div style={containerStyle}>
        <div style={{ padding: '20px', color: 'red' }}>Error: {error}</div>
      </div>
    );
  }

  return (
    <div style={containerStyle}>
      {pdfUrl && (
        <iframe
          ref={iframeRef}
          style={iframeStyle}
          src={pdfUrl}
          onLoad={handleLoad}
          onError={handleError}
        />
      )}
    </div>
  );
}
