export const Colors = {
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
  accent: '#00C9B7', // teal CTA
  accentSoft: '#DDFBF7',
  accentBorder: '#B3F2EC',
  warning: '#FFB020', // amber highlights
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

export const SubjectColors: Record<string, [string, string]> = {
  mathematics: [Colors.primary, '#8B6FFF'], // indigo
  physics: ['#0EA5E9', '#22D3EE'], // sky cyan
  chemistry: ['#10B981', '#34D399'], // emerald
  biology: ['#84CC16', '#A3E635'], // lime
  english: ['#F43F5E', '#FB923C'], // rose-orange
};

export const Gradients = {
  brand: [Colors.primary, Colors.primaryLight] as const,
  header: [Colors.primary, '#7C3AED'] as const,
  sunset: ['#FF6B9D', '#FF7A5C'] as const,
  ocean: ['#0EA5E9', '#06B6D4'] as const,
  forest: ['#10B981', '#84CC16'] as const,
  dark: [Colors.text, Colors.primaryDark] as const,
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
  regular: '400',
  medium: '600',
  bold: '700',
  heavy: '800',
  black: '900',
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
    shadowColor: Colors.primary,
    shadowOpacity: 0.3,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 8 },
    elevation: 8,
  },
} as const;
