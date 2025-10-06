import type { StyleProp, ViewStyle } from 'react-native';

export type PdfSource = {
  uri?: string;
  path?: string;
  base64?: string;
  headers?: Record<string, string>;
  cache?: boolean;
  cacheFileName?: string;
  expiration?: number;
  method?: string | undefined;
};

export type TableContentItem = {
  title: string;
  pageIdx: number;
  children: TableContentItem[];
};

export type OnLoadCompleteEventPayload = {
  numberOfPages: number;
  path: string;
  dimensions: {
    width: number;
    height: number;
  };
  tableContents: TableContentItem[];
};

export type OnPageChangedEventPayload = {
  page: number;
  numberOfPages: number;
};

export type OnErrorEventPayload = {
  error: string;
};

export type OnPageSingleTapEventPayload = {
  page: number;
};

export type CoolPdfModuleEvents = {
  onChange: (params: ChangeEventPayload) => void;
};

export type ChangeEventPayload = {
  value: string;
};

export type CoolPdfViewProps = {
  source: PdfSource | string;
  page?: number;
  scale?: number;
  minScale?: number;
  maxScale?: number;
  horizontal?: boolean;
  spacing?: number;
  password?: string;
  enablePaging?: boolean;
  enableAnnotations?: boolean;
  enableDoubleTapZoom?: boolean;
  fitPolicy?: 0 | 1 | 2; // 0: WIDTH, 1: HEIGHT, 2: BOTH (default)
  singlePage?: boolean;
  showsHorizontalScrollIndicator?: boolean;
  showsVerticalScrollIndicator?: boolean;
  scrollEnabled?: boolean;
  onLoadComplete?: (event: { nativeEvent: OnLoadCompleteEventPayload }) => void;
  onPageChanged?: (event: { nativeEvent: OnPageChangedEventPayload }) => void;
  onError?: (event: { nativeEvent: OnErrorEventPayload }) => void;
  onPageSingleTap?: (event: { nativeEvent: OnPageSingleTapEventPayload }) => void;
  style?: StyleProp<ViewStyle>;
};
