import { NativeModule, requireNativeModule } from 'expo';

import { CoolPdfModuleEvents } from './CoolPdf.types';

declare class CoolPdfModule extends NativeModule<CoolPdfModuleEvents> {
  PI: number;
  hello(): string;
  setValueAsync(value: string): Promise<void>;
}

// This call loads the native module object from the JSI.
export default requireNativeModule<CoolPdfModule>('CoolPdf');
