import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { Appearance, Platform, useColorScheme } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { DarkColors, LightColors, type ColorTokens } from '../constants/theme';

/** What the user picked. `system` defers to the OS setting. */
export type ThemePreference = 'system' | 'light' | 'dark';
/** What is actually being rendered right now. */
export type ColorScheme = 'light' | 'dark';

const STORAGE_KEY = 'pora_sathi_theme';

const storage = {
  async get(): Promise<ThemePreference | null> {
    try {
      const raw =
        Platform.OS === 'web'
          ? typeof localStorage !== 'undefined'
            ? localStorage.getItem(STORAGE_KEY)
            : null
          : await SecureStore.getItemAsync(STORAGE_KEY);
      return raw === 'light' || raw === 'dark' || raw === 'system' ? raw : null;
    } catch {
      return null;
    }
  },
  async set(pref: ThemePreference): Promise<void> {
    try {
      if (Platform.OS === 'web') {
        if (typeof localStorage !== 'undefined') localStorage.setItem(STORAGE_KEY, pref);
        return;
      }
      await SecureStore.setItemAsync(STORAGE_KEY, pref);
    } catch {
      // Non-fatal — theme just won't persist.
    }
  },
};

interface ColorSchemeContextValue {
  /** Resolved theme tokens (light or dark) */
  colors: ColorTokens;
  /** Scheme currently rendered */
  scheme: ColorScheme;
  /** The user's stored preference */
  preference: ThemePreference;
  /** Set and persist the preference ('system' follows the OS) */
  setPreference: (p: ThemePreference) => void;
  /** Convenience: force light/dark explicitly */
  setScheme: (s: ColorScheme) => void;
  /** True when the user has overridden the system setting */
  isOverride: boolean;
}

const ColorSchemeContext = createContext<ColorSchemeContextValue | null>(null);

export function ColorSchemeProvider({ children }: { children: ReactNode }) {
  // `useColorScheme` already tracks the OS, but subscribing to `Appearance`
  // explicitly guarantees we re-render on live changes (and is what Expo
  // recommends when you need the raw scheme value).
  const hookScheme = useColorScheme();
  const [systemScheme, setSystemScheme] = useState<ColorScheme>(
    () => Appearance.getColorScheme() ?? 'light',
  );

  useEffect(() => {
    const sub = Appearance.addChangeListener(({ colorScheme }) => {
      if (colorScheme === 'dark' || colorScheme === 'light') setSystemScheme(colorScheme);
    });
    return () => sub.remove();
  }, []);

  // Keep both sources in sync; the hook is authoritative when it reports.
  useEffect(() => {
    if (hookScheme === 'dark' || hookScheme === 'light') setSystemScheme(hookScheme);
  }, [hookScheme]);

  const [preference, setPreferenceState] = useState<ThemePreference>('system');

  // Restore the saved preference on startup.
  useEffect(() => {
    let cancelled = false;
    void storage.get().then((saved) => {
      if (!cancelled && saved) setPreferenceState(saved);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const scheme: ColorScheme = preference === 'system' ? systemScheme : preference;

  const setPreference = useCallback((p: ThemePreference) => {
    setPreferenceState(p);
    void storage.set(p);
  }, []);

  const setScheme = useCallback((s: ColorScheme) => setPreference(s), [setPreference]);

  const value = useMemo<ColorSchemeContextValue>(
    () => ({
      colors: scheme === 'dark' ? DarkColors : LightColors,
      scheme,
      preference,
      setPreference,
      setScheme,
      isOverride: preference !== 'system',
    }),
    [scheme, preference, setPreference, setScheme],
  );

  return <ColorSchemeContext.Provider value={value}>{children}</ColorSchemeContext.Provider>;
}

export function useColors() {
  const ctx = useContext(ColorSchemeContext);
  if (!ctx) throw new Error('useColors must be used inside <ColorSchemeProvider>');
  return ctx;
}
