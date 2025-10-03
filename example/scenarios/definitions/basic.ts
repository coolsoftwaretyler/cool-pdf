import type { PdfScenario } from '../types';

export const basicScenarios: PdfScenario[] = [
  {
    id: 'basic-url',
    name: 'Load PDF from URL',
    description: 'Load a simple PDF from a public URL with caching enabled',
    category: 'basic',
    props: {
      source: {
        uri: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
        cache: true,
      },
    },
    expectedBehavior: 'PDF should load and display the first page',
  },
  {
    id: 'basic-no-cache',
    name: 'Load PDF without Cache',
    description: 'Load a PDF from URL without caching',
    category: 'basic',
    props: {
      source: {
        uri: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
        cache: false,
      },
    },
    expectedBehavior: 'PDF should load fresh from URL each time',
  },
  {
    id: 'basic-with-password',
    name: 'Password Protected PDF',
    description: 'Load a password-protected PDF',
    category: 'basic',
    props: {
      source: {
        uri: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
      },
      password: 'test123',
    },
    expectedBehavior: 'PDF should unlock with correct password',
    notes: 'This example PDF is not actually password protected, so password will be ignored',
  },
];
