import type { ComponentType } from 'react';
import type { PdfViewProps } from './pdfViewTypes';

/**
 * Fallback used on platforms without a native PDF renderer (web, and any
 * platform Metro does not have a `.native` override for). The reader screen
 * checks for `null` and renders an explanatory placeholder instead.
 */
export const PdfView: ComponentType<PdfViewProps> | null = null;
