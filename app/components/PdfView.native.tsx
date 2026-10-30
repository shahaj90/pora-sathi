import type { ComponentType } from 'react';
import type { PdfViewProps } from './pdfViewTypes';

/**
 * `react-native-pdf` is a native module and only exists in a custom dev build.
 * It must not be imported eagerly: expo-router loads every route up front, so
 * a missing native module would crash the whole app (e.g. in Expo Go) before
 * the reader screen is ever opened. Loading it inside a try/catch keeps the
 * rest of the app usable and lets the reader fall back to a placeholder.
 */
function loadPdfView(): ComponentType<PdfViewProps> | null {
  try {
    const mod = require('react-native-pdf');
    return (mod?.default ?? mod) as ComponentType<PdfViewProps>;
  } catch {
    return null;
  }
}

export const PdfView = loadPdfView();
