import type {
  ContinueLearning,
  DashboardStats,
  Grade,
  GradeId,
  Note,
  Quiz,
  SscBanner,
  Subject,
} from '../constants/data';
import dashboardC8 from '../data/dashboard-c8.json';
import dashboardC9 from '../data/dashboard-c9.json';
import dashboardC10 from '../data/dashboard-c10.json';
import gradesJson from '../data/grades.json';
import notesC8 from '../data/notes-c8.json';
import notesC9 from '../data/notes-c9.json';
import notesC10 from '../data/notes-c10.json';
import quizzesC8 from '../data/quizzes-c8.json';
import quizzesC9 from '../data/quizzes-c9.json';
import quizzesC10 from '../data/quizzes-c10.json';
import subjectsC8 from '../data/subjects-c8.json';
import subjectsC9 from '../data/subjects-c9.json';
import subjectsC10 from '../data/subjects-c10.json';

// ---------------------------------------------------------------------------
// Demo API layer.
//
// Every function below currently serves the local JSON in `data/` with a
// simulated network delay. When the backend in `api/` lands, point
// API_BASE_URL at it and replace each body with a fetch call, e.g.:
//
//   const res = await fetch(`${API_BASE_URL}/subjects?grade=${gradeId}`);
//   if (!res.ok) throw new Error(`GET /subjects failed: ${res.status}`);
//   return (await res.json()) as Subject[];
//
// Callers already handle loading + error states, so no UI changes are needed.
// ---------------------------------------------------------------------------

// const API_BASE_URL = 'https://api.porasathi.com';

const MOCK_DELAY_MS = 400;

const delay = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));

// ---------------------------------------------------------------------------
// In-memory cache by grade — avoids re-awaiting JSON imports when switching
// grades. Once the backend lands, replace with TanStack Query / React Query.
// ---------------------------------------------------------------------------

type CacheEntry<T> = { data: T };
const cache = new Map<string, CacheEntry<unknown>>();

function cached<T>(key: string, fallback: () => T): T {
  const hit = cache.get(key);
  if (hit) return hit.data as T;
  const data = fallback();
  cache.set(key, { data });
  return data;
}

// ---------------------------------------------------------------------------
// Raw data maps
// ---------------------------------------------------------------------------

const SUBJECTS: Record<GradeId, Subject[]> = {
  c8: subjectsC8 as Subject[],
  c9: subjectsC9 as Subject[],
  c10: subjectsC10 as Subject[],
};

const NOTES: Record<GradeId, Note[]> = {
  c8: notesC8 as Note[],
  c9: notesC9 as Note[],
  c10: notesC10 as Note[],
};

const QUIZZES: Record<GradeId, Quiz[]> = {
  c8: quizzesC8 as Quiz[],
  c9: quizzesC9 as Quiz[],
  c10: quizzesC10 as Quiz[],
};

const DASHBOARD: Record<GradeId, DashboardMeta> = {
  c8: dashboardC8 as DashboardMeta,
  c9: dashboardC9 as DashboardMeta,
  c10: dashboardC10 as DashboardMeta,
};

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

export async function fetchGrades(): Promise<Grade[]> {
  await delay(MOCK_DELAY_MS);
  return gradesJson as Grade[];
}

export async function fetchSubjects(gradeId: GradeId): Promise<Subject[]> {
  await delay(MOCK_DELAY_MS);
  return cached(`subjects:${gradeId}`, () => SUBJECTS[gradeId] ?? []);
}

export async function fetchNotes(gradeId: GradeId): Promise<Note[]> {
  await delay(MOCK_DELAY_MS);
  return cached(`notes:${gradeId}`, () => NOTES[gradeId] ?? []);
}

export async function fetchQuizzes(gradeId: GradeId): Promise<Quiz[]> {
  await delay(MOCK_DELAY_MS);
  return cached(`quizzes:${gradeId}`, () => QUIZZES[gradeId] ?? []);
}

export interface DashboardMeta {
  stats: DashboardStats;
  continue: ContinueLearning;
  sscBanner: SscBanner;
}

export async function fetchDashboardMeta(gradeId: GradeId): Promise<DashboardMeta> {
  await delay(MOCK_DELAY_MS);
  return cached(
    `dashboard:${gradeId}`,
    () => DASHBOARD[gradeId] ?? (dashboardC10 as DashboardMeta),
  );
}

// ---------------------------------------------------------------------------
// Helpers for screens that import JSON directly (subject/[id].tsx)
// Once that screen switches to this module, re-export the lookup maps so
// there's a single source of truth.
// ---------------------------------------------------------------------------

export function getSubjectsForGrade(gradeId: GradeId): Subject[] {
  return SUBJECTS[gradeId] ?? [];
}

export function getNotesForGrade(gradeId: GradeId): Note[] {
  return NOTES[gradeId] ?? [];
}

export function getQuizzesForGrade(gradeId: GradeId): Quiz[] {
  return QUIZZES[gradeId] ?? [];
}
