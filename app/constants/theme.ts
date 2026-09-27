export const Colors = {
  background: '#F5F3FF',
  surface: '#FFFFFF',
  text: '#191A2E',
  muted: '#6E7191',
  border: '#E9E6F7',
  primary: '#6C3CE0',
  primaryDark: '#4B21B8',
  accent: '#FF8A3D',
  pink: '#FF5C8A',
  teal: '#00C6A2',
  blue: '#3D7BFF',
  yellow: '#FFC531',
  violetLight: '#EDE7FF',
  bubble: '#F1EDFF',
  danger: '#FF5C5C',
  dangerSoft: '#FFEDED',
  dangerText: '#C81E1E',
  accentSoft: '#FFF4E8',
  accentBorder: '#FFD9B8',
} as const;

export const SubjectColors: Record<string, [string, string]> = {
  mathematics: ['#6C3CE0', '#9D6BFF'],
  physics: ['#3D7BFF', '#5ED0FF'],
  chemistry: ['#00A88F', '#4ADE80'],
  biology: ['#1DA65C', '#A3E635'],
  english: ['#FF5C8A', '#FF8A3D'],
};

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
    shadowColor: '#1A1B2E',
    shadowOpacity: 0.07,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  pop: {
    shadowColor: '#6C3CE0',
    shadowOpacity: 0.28,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 6,
  },
} as const;
