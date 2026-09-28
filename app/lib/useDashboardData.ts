import { useQuery } from '@tanstack/react-query';
import type { GradeId, Note, Quiz, Subject } from '../constants/data';
import {
  fetchDashboardMeta,
  fetchGrades,
  fetchNotes,
  fetchQuizzes,
  fetchSubjects,
  type DashboardMeta,
} from './api';

// ---------------------------------------------------------------------------
// React Query hooks for dashboard data
// ---------------------------------------------------------------------------

export function useGrades() {
  return useQuery({
    queryKey: ['grades'],
    queryFn: fetchGrades,
    staleTime: Infinity, // grades never change
  });
}

export function useSubjects(gradeId: GradeId) {
  return useQuery({
    queryKey: ['subjects', gradeId],
    queryFn: () => fetchSubjects(gradeId),
  });
}

export function useNotes(gradeId: GradeId) {
  return useQuery({
    queryKey: ['notes', gradeId],
    queryFn: () => fetchNotes(gradeId),
  });
}

export function useQuizzes(gradeId: GradeId) {
  return useQuery({
    queryKey: ['quizzes', gradeId],
    queryFn: () => fetchQuizzes(gradeId),
  });
}

export function useDashboardMeta(gradeId: GradeId) {
  return useQuery({
    queryKey: ['dashboard', gradeId],
    queryFn: () => fetchDashboardMeta(gradeId),
  });
}

// ---------------------------------------------------------------------------
// Aggregate hook — everything at once
// ---------------------------------------------------------------------------

export interface DashboardData {
  grades: Subject[];
  subjects: Subject[];
  notes: Note[];
  quizzes: Quiz[];
  meta: DashboardMeta;
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
}

export function useDashboard(gradeId: GradeId) {
  const gradesQ = useGrades();
  const subjectsQ = useSubjects(gradeId);
  const notesQ = useNotes(gradeId);
  const quizzesQ = useQuizzes(gradeId);
  const metaQ = useDashboardMeta(gradeId);

  const isLoading =
    gradesQ.isLoading ||
    subjectsQ.isLoading ||
    notesQ.isLoading ||
    quizzesQ.isLoading ||
    metaQ.isLoading;

  const isError =
    gradesQ.isError || subjectsQ.isError || notesQ.isError || quizzesQ.isError || metaQ.isError;

  const error =
    gradesQ.error ?? subjectsQ.error ?? notesQ.error ?? quizzesQ.error ?? metaQ.error ?? null;

  return {
    grades: gradesQ.data ?? [],
    subjects: subjectsQ.data ?? [],
    notes: notesQ.data ?? [],
    quizzes: quizzesQ.data ?? [],
    meta: metaQ.data ?? null,
    isLoading,
    isError,
    error,
  };
}
