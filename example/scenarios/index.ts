import { basicScenarios } from './definitions/basic';
import { navigationScenarios } from './definitions/navigation';
import { zoomScenarios } from './definitions/zoom';
import type { PdfScenario, ScenarioCategory } from './types';

export * from './types';

export const allScenarios: PdfScenario[] = [
  ...basicScenarios,
  ...navigationScenarios,
  ...zoomScenarios,
];

export const scenariosByCategory: Record<ScenarioCategory, PdfScenario[]> = {
  basic: basicScenarios,
  navigation: navigationScenarios,
  zoom: zoomScenarios,
  annotations: [],
  performance: [],
};

export const categoryLabels: Record<ScenarioCategory, string> = {
  basic: 'Basic',
  navigation: 'Navigation',
  zoom: 'Zoom & Scale',
  annotations: 'Annotations',
  performance: 'Performance',
};
