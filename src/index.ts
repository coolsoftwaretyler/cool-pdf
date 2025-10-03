// Reexport the native module. On web, it will be resolved to CoolPdfModule.web.ts
// and on native platforms to CoolPdfModule.ts
export { default } from './CoolPdfModule';
export { default as CoolPdfView } from './CoolPdfView';
export * from  './CoolPdf.types';
