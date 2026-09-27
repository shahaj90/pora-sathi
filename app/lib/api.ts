import type {
  ContinueLearning,
  DashboardStats,
  Grade,
  Note,
  Quiz,
  SscBanner,
  Subject,
} from '../constants/data';
import dashboardJson from '../data/dashboard.json';
import gradesJson from '../data/grades.json';
import notesJson from '../data/notes.json';
import quizzesJson from '../data/quizzes.json';
import subjectsJson from '../data/subjects.json';

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

export async function fetchGrades(): Promise<Grade[]> {
  await delay(MOCK_DELAY_MS);
  return gradesJson as Grade[];
}

export async function fetchSubjects(): Promise<Subject[]> {
  await delay(MOCK_DELAY_MS);
  return subjectsJson as Subject[];
}

export async function fetchNotes(): Promise<Note[]> {
  await delay(MOCK_DELAY_MS);
  return notesJson as Note[];
}

export async function fetchQuizzes(): Promise<Quiz[]> {
  await delay(MOCK_DELAY_MS);
  return quizzesJson as Quiz[];
}

export interface DashboardMeta {
  stats: DashboardStats;
  continue: ContinueLearning;
  sscBanner: SscBanner;
}

export async function fetchDashboardMeta(): Promise<DashboardMeta> {
  await delay(MOCK_DELAY_MS);
  return dashboardJson as DashboardMeta;
}
