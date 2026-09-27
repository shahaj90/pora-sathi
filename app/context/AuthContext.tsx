import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react';
import { DEMO_USER } from '../constants/demoUser';

export interface SessionUser {
  name: string;
  email: string;
  grade: string;
}

interface AuthContextValue {
  user: SessionUser | null;
  /** Returns error message on failure, null on success. */
  login: (email: string, password: string) => string | null;
  register: (email: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<SessionUser | null>(null);

  const login = useCallback((email: string, password: string) => {
    // Demo check — swap for POST /api/auth/login once the backend lands.
    if (email.trim().toLowerCase() === DEMO_USER.email && password === DEMO_USER.password) {
      setUser({ name: DEMO_USER.name, email: DEMO_USER.email, grade: DEMO_USER.grade });
      return null;
    }
    return 'Invalid email or password. Try the demo account below.';
  }, []);

  const register = useCallback((email: string) => {
    // Mock signup — creates a local session. Swap for POST /api/auth/signup later.
    const name =
      email
        .split('@')[0]
        .replace(/[._-]+/g, ' ')
        .trim() || 'New Student';
    setUser({
      name: name.charAt(0).toUpperCase() + name.slice(1),
      email: email.trim(),
      grade: 'Class 10',
    });
  }, []);

  const logout = useCallback(() => setUser(null), []);

  const value = useMemo(() => ({ user, login, register, logout }), [user, login, register, logout]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>');
  return ctx;
}
