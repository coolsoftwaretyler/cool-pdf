import { registerWebModule, NativeModule } from 'expo';

import { CoolPdfModuleEvents } from './CoolPdf.types';

class CoolPdfModule extends NativeModule<CoolPdfModuleEvents> {
  PI = Math.PI;
  async setValueAsync(value: string): Promise<void> {
    this.emit('onChange', { value });
  }
  hello() {
    return 'Hello world! 👋';
  }
}

export default registerWebModule(CoolPdfModule, 'CoolPdfModule');
