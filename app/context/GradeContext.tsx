import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { Platform } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { type Grade, type GradeId } from '../constants/data';
import gradesJson from '../data/grades.json';

const GRADES = gradesJson as Grade[];

const STORAGE_KEY = 'pora_sathi_grade';

/** Classes every learner can browse, even if not enrolled. */
const VALID: GradeId[] = GRADES.map((g) => g.id);

const DEFAULT_GRADE: GradeId = 'c10';

// SecureStore is unavailable on web — fall back to localStorage there.
const storage = {
  async get(): Promise<GradeId | null> {
    try {
      const raw =
        Platform.OS === 'web'
          ? typeof localStorage !== 'undefined'
            ? localStorage.getItem(STORAGE_KEY)
            : null
          : await SecureStore.getItemAsync(STORAGE_KEY);
      return VALID.includes(raw as GradeId) ? (raw as GradeId) : null;
    } catch {
      return null;
    }
  },
  async set(grade: GradeId): Promise<void> {
    try {
      if (Platform.OS === 'web') {
        if (typeof localStorage !== 'undefined') localStorage.setItem(STORAGE_KEY, grade);
        return;
      }
      await SecureStore.setItemAsync(STORAGE_KEY, grade);
    } catch {
      // Non-fatal — the class just won't persist across launches.
    }
  },
};

interface GradeContextValue {
  /** The class all data-driven screens are currently scoped to. */
  grade: GradeId;
  /** Change and persist the active class. */
  setGrade: (g: GradeId) => void;
  /** All selectable classes, for the tab strip. */
  grades: Grade[];
  /** Resolved label for the active class, e.g. "Class 10". */
  gradeLabel: string;
  /** Resolved Bangla label, e.g. "দশম". */
  gradeBangla: string;
  /** True while restoring the persisted class on startup. */
  restoring: boolean;
}

const GradeContext = createContext<GradeContextValue | null>(null);

/**
 * The active class is app-wide state, not per-screen state.
 *
 * Every screen's data is class-scoped (subjects, notes, quizzes, progress all
 * come from per-class JSON), so the class a learner picks on Home has to be the
 * same class Notes / Quiz / Progress show. Keeping it in a provider is what
 * makes that consistent — previously each tab hard-coded `useState('c10')`, so
 * switching tabs silently reset the class.
 */
export function GradeProvider({ children }: { children: ReactNode }) {
  const [grade, setGradeState] = useState<GradeId>(DEFAULT_GRADE);
  const [restoring, setRestoring] = useState(true);

  useEffect(() => {
    let cancelled = false;
    void storage.get().then((saved) => {
      if (cancelled) return;
      if (saved) setGradeState(saved);
      setRestoring(false);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const setGrade = useCallback((g: GradeId) => {
    setGradeState(g);
    void storage.set(g);
  }, []);

  const value = useMemo<GradeContextValue>(() => {
    const meta = GRADES.find((g) => g.id === grade) ?? GRADES[GRADES.length - 1];
    return {
      grade,
      setGrade,
      grades: GRADES,
      gradeLabel: meta.label,
      gradeBangla: meta.bangla,
      restoring,
    };
  }, [grade, setGrade, restoring]);

  return <GradeContext.Provider value={value}>{children}</GradeContext.Provider>;
}

export function useGrade() {
  const ctx = useContext(GradeContext);
  if (!ctx) throw new Error('useGrade must be used inside <GradeProvider>');
  return ctx;
}
