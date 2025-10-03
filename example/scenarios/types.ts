import type { CoolPdfViewProps } from 'cool-pdf';

export type ScenarioCategory = 'basic' | 'navigation' | 'zoom' | 'annotations' | 'performance';

export type PdfScenario = {
  id: string;
  name: string;
  description: string;
  category: ScenarioCategory;
  props: Omit<CoolPdfViewProps, 'onLoadComplete' | 'onPageChanged' | 'onError' | 'onPageSingleTap'>;
  expectedBehavior?: string;
  notes?: string;
};

export type ScenarioEvent = {
  timestamp: number;
  type: 'loadComplete' | 'pageChanged' | 'error' | 'pageSingleTap';
  data: any;
};
