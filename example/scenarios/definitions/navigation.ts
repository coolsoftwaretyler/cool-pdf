import type { PdfScenario } from '../types';

export const navigationScenarios: PdfScenario[] = [
  {
    id: 'nav-horizontal',
    name: 'Horizontal Scrolling',
    description: 'PDF with horizontal page layout',
    category: 'navigation',
    props: {
      source: {
        uri: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
        cache: true,
      },
      horizontal: true,
    },
    expectedBehavior: 'Pages should scroll horizontally',
  },
  {
    id: 'nav-paging',
    name: 'Page Snapping',
    description: 'Enable page snapping for better navigation',
    category: 'navigation',
    props: {
      source: {
        uri: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
        cache: true,
      },
      enablePaging: true,
    },
    expectedBehavior: 'Scrolling should snap to pages',
  },
  {
    id: 'nav-horizontal-paging',
    name: 'Horizontal with Paging',
    description: 'Combine horizontal scrolling with page snapping',
    category: 'navigation',
    props: {
      source: {
        uri: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
        cache: true,
      },
      horizontal: true,
      enablePaging: true,
    },
    expectedBehavior: 'Pages should scroll horizontally and snap',
  },
  {
    id: 'nav-custom-spacing',
    name: 'Custom Page Spacing',
    description: 'Adjust spacing between pages',
    category: 'navigation',
    props: {
      source: {
        uri: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
        cache: true,
      },
      spacing: 30,
    },
    expectedBehavior: 'Should show 30px spacing between pages',
  },
];
