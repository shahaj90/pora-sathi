import type { TextStyle } from 'react-native';

// ---------------------------------------------------------------------------
// Light palette
// ---------------------------------------------------------------------------

const LightColors = {
  // backgrounds
  background: '#F6F7FB',
  surface: '#FFFFFF',
  surfaceAlt: '#F0F2F8',

  // text
  text: '#0F1221',
  textSecondary: '#4B516A',
  muted: '#A0A5BB',

  // brand (modern indigo-violet)
  primary: '#5B4DFF',
  primaryDark: '#3D30CC',
  primaryLight: '#7B6FFF',
  primarySoft: '#E8E6FF',

  // accents
  accent: '#00C9B7',
  accentSoft: '#DDFBF7',
  accentBorder: '#B3F2EC',
  warning: '#FFB020',
  warningSoft: '#FFF4D9',
  success: '#22C55E',
  successSoft: '#DCFCE7',

  // highlights
  pink: '#FF6B9D',
  coral: '#FF7A5C',
  yellow: '#FFC531',
  purple: '#9F7AEA',

  // functional
  border: '#E2E5F0',
  danger: '#EF4444',
  dangerSoft: '#FEE2E2',
  dangerText: '#B91C1C',
  bubble: '#F1F0FF',
} as const;

// ---------------------------------------------------------------------------
// Dark palette (automatic = uses system via useColorScheme)
// ---------------------------------------------------------------------------

const DarkColors = {
  background: '#0F1121',
  surface: '#1A1D2E',
  surfaceAlt: '#232638',

  text: '#EEF0F8',
  textSecondary: '#A0A5BB',
  muted: '#6B718A',

  primary: '#7B6FFF',
  primaryDark: '#5B4DFF',
  primaryLight: '#9D8FFF',
  primarySoft: '#2A2566',

  accent: '#00C9B7',
  accentSoft: '#0A3A33',
  accentBorder: '#1A5C55',
  warning: '#FFB020',
  warningSoft: '#3A2B08',
  success: '#22C55E',
  successSoft: '#0A2E14',

  pink: '#FF6B9D',
  coral: '#FF7A5C',
  yellow: '#FFC531',
  purple: '#9F7AEA',

  border: '#2A2D42',
  danger: '#EF4444',
  dangerSoft: '#3A1010',
  dangerText: '#F87171',
  bubble: '#252258',
} as const;

// ---------------------------------------------------------------------------
// Token shape
// ---------------------------------------------------------------------------

export interface ColorTokens {
  background: string;
  surface: string;
  surfaceAlt: string;
  text: string;
  textSecondary: string;
  muted: string;
  primary: string;
  primaryDark: string;
  primaryLight: string;
  primarySoft: string;
  accent: string;
  accentSoft: string;
  accentBorder: string;
  warning: string;
  warningSoft: string;
  success: string;
  successSoft: string;
  pink: string;
  coral: string;
  yellow: string;
  purple: string;
  border: string;
  danger: string;
  dangerSoft: string;
  dangerText: string;
  bubble: string;
}

export { LightColors, DarkColors };

// ---------------------------------------------------------------------------
// Derived tokens (shared across themes)
// ---------------------------------------------------------------------------

export const SubjectColors: Record<string, [string, string]> = {
  mathematics: ['#5B4DFF', '#8B6FFF'],
  physics: ['#0EA5E9', '#22D3EE'],
  chemistry: ['#10B981', '#34D399'],
  biology: ['#84CC16', '#A3E635'],
  science: ['#0EA5E9', '#34D399'],
  bangla1: ['#DC2626', '#F87171'],
  bangla2: ['#F59E0B', '#FBBF24'],
  english1: ['#2563EB', '#60A5FA'],
  english2: ['#0891B2', '#22D3EE'],
};

export const Gradients = {
  brand: ['#5B4DFF', '#7B6FFF'] as const,
  header: ['#5B4DFF', '#7C3AED'] as const,
  sunset: ['#FF6B9D', '#FF7A5C'] as const,
  ocean: ['#0EA5E9', '#06B6D4'] as const,
  forest: ['#10B981', '#84CC16'] as const,
  dark: ['#0F1221', '#3D30CC'] as const,
} as const;

export const Spacing = { xs: 4, sm: 8, md: 12, lg: 16, xl: 20, xxl: 28 } as const;
export const Radius = { sm: 10, md: 16, lg: 22, xl: 28, pill: 999 } as const;

export const Type = {
  xs: 11,
  sm: 12,
  md: 13,
  base: 14,
  lg: 15,
  xl: 17,
  xxl: 22,
  hero: 28,
} as const;

export const Weight = {
  regular: '400' as TextStyle['fontWeight'],
  medium: '600' as TextStyle['fontWeight'],
  bold: '700' as TextStyle['fontWeight'],
  heavy: '800' as TextStyle['fontWeight'],
  black: '900' as TextStyle['fontWeight'],
} as const;

export const Shadow = {
  card: {
    shadowColor: '#101340',
    shadowOpacity: 0.06,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 6 },
    elevation: 4,
  },
  pop: {
    shadowColor: '#5B4DFF',
    shadowOpacity: 0.3,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 8 },
    elevation: 8,
  },
} as const;

// Default export = light colors for backward compat while we migrate.
const Colors: ColorTokens = LightColors;
export { Colors };
