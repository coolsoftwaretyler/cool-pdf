import type { PdfScenario } from '../types';

export const zoomScenarios: PdfScenario[] = [
  {
    id: 'zoom-initial-scale',
    name: 'Initial Zoom Level',
    description: 'Load PDF with 150% initial zoom',
    category: 'zoom',
    props: {
      source: {
        uri: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
        cache: true,
      },
      scale: 1.5,
    },
    expectedBehavior: 'PDF should load zoomed in at 150%',
  },
  {
    id: 'zoom-min-max',
    name: 'Custom Zoom Range',
    description: 'Set minimum and maximum zoom levels',
    category: 'zoom',
    props: {
      source: {
        uri: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
        cache: true,
      },
      minScale: 0.5,
      maxScale: 5.0,
      scale: 1.0,
    },
    expectedBehavior: 'Should allow zooming between 50% and 500%',
  },
  {
    id: 'zoom-restricted',
    name: 'Restricted Zoom',
    description: 'Limit zoom to narrow range',
    category: 'zoom',
    props: {
      source: {
        uri: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
        cache: true,
      },
      minScale: 0.8,
      maxScale: 1.2,
      scale: 1.0,
    },
    expectedBehavior: 'Should only allow zooming between 80% and 120%',
  },
];
