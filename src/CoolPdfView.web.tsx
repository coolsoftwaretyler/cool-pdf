import * as React from 'react';

import { CoolPdfViewProps } from './CoolPdf.types';

export default function CoolPdfView(props: CoolPdfViewProps) {
  return (
    <div>
      <iframe
        style={{ flex: 1 }}
        src={props.url}
        onLoad={() => props.onLoad({ nativeEvent: { url: props.url } })}
      />
    </div>
  );
}
