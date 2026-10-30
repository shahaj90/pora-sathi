/** Props shared by the platform-specific PDF view implementations. */
export interface PdfViewProps {
  source: { uri: string };
  page?: number;
  style?: object;
  onLoadComplete?: (numberOfPages: number) => void;
  onPageChanged?: (page: number) => void;
  onError?: (error: unknown) => void;
}
