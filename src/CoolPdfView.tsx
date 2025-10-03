import { requireNativeView } from 'expo';
import * as React from 'react';

import { CoolPdfViewProps } from './CoolPdf.types';

const NativeView: React.ComponentType<CoolPdfViewProps> =
  requireNativeView('CoolPdf');

export default function CoolPdfView(props: CoolPdfViewProps) {
  return <NativeView {...props} />;
}
