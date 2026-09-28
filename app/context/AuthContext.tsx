import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';
import { type Grade, type GradeId } from '../constants/data';
import { DEMO_USER } from '../constants/demoUser';
import gradesJson from '../data/grades.json';

const GRADES = gradesJson as Grade[];

const STORAGE_KEY = 'pora_sathi_user';

// SecureStore is unavailable on web — fall back to localStorage there.
const storage = {
  async get(key: string): Promise<string | null> {
    if (Platform.OS === 'web') {
      return typeof localStorage !== 'undefined' ? localStorage.getItem(key) : null;
    }
    return SecureStore.getItemAsync(key);
  },
  async set(key: string, value: string): Promise<void> {
    if (Platform.OS === 'web') {
      if (typeof localStorage !== 'undefined') localStorage.setItem(key, value);
      return;
    }
    await SecureStore.setItemAsync(key, value);
  },
  async remove(key: string): Promise<void> {
    if (Platform.OS === 'web') {
      if (typeof localStorage !== 'undefined') localStorage.removeItem(key);
      return;
    }
    await SecureStore.deleteItemAsync(key);
  },
};

export interface SessionUser {
  name: string;
  email: string;
  grades: string[];
  avatar?: string;
  phone?: string;
  teacher?: string;
}

interface AuthContextValue {
  user: SessionUser | null;
  /** Returns error message on failure, null on success. */
  login: (email: string, password: string) => string | null;
  register: (email: string, gradeIds: GradeId[]) => void;
  updateUser: (updates: Partial<SessionUser>) => void;
  logout: () => void;
  /** True while restoring a persisted session on startup. */
  restoring: boolean;
}

const AuthContext = createContext<AuthContextValue | null>(null);

async function persist(user: SessionUser | null) {
  if (user) {
    await storage.set(STORAGE_KEY, JSON.stringify(user));
  } else {
    await storage.remove(STORAGE_KEY);
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<SessionUser | null>(null);
  const [restoring, setRestoring] = useState(true);

  // Restore persisted session on mount.
  useEffect(() => {
    (async () => {
      try {
        const raw = await storage.get(STORAGE_KEY);
        if (raw) {
          setUser(JSON.parse(raw) as SessionUser);
        }
      } catch {
        // Corrupted or missing — start fresh.
      } finally {
        setRestoring(false);
      }
    })();
  }, []);

  const login = useCallback((email: string, password: string) => {
    // Demo check — swap for POST /api/auth/login once the backend lands.
    if (email.trim().toLowerCase() === DEMO_USER.email && password === DEMO_USER.password) {
      const u: SessionUser = {
        name: DEMO_USER.name,
        email: DEMO_USER.email,
        grades: DEMO_USER.grades,
        avatar: DEMO_USER.avatar,
        phone: DEMO_USER.phone,
        teacher: DEMO_USER.teacher,
      };
      setUser(u);
      persist(u);
      return null;
    }
    return 'Invalid email or password. Try the demo account below.';
  }, []);

  const register = useCallback((email: string, gradeIds: GradeId[]) => {
    // Mock signup — creates a local session. Swap for POST /api/auth/signup later.
    const name =
      email
        .split('@')[0]
        .replace(/[._-]+/g, ' ')
        .trim() || 'New Student';
    const grades = GRADES.filter((g) => gradeIds.includes(g.id)).map((g) => g.label);
    const u: SessionUser = {
      name: name.charAt(0).toUpperCase() + name.slice(1),
      email: email.trim(),
      grades: grades.length > 0 ? grades : ['Class 10'],
    };
    setUser(u);
    persist(u);
  }, []);

  const updateUser = useCallback((updates: Partial<SessionUser>) => {
    setUser((prev) => {
      if (!prev) return prev;
      const next = { ...prev, ...updates };
      persist(next);
      return next;
    });
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    persist(null);
  }, []);

  const value = useMemo(
    () => ({ user, login, register, updateUser, logout, restoring }),
    [user, login, register, updateUser, logout, restoring],
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>');
  return ctx;
}
