import type { Ionicons } from '@expo/vector-icons';

export type GradeId = 'c5' | 'c6' | 'c7' | 'c8' | 'c9' | 'c10' | 'ssc';

export interface Grade {
  id: GradeId;
  label: string;
  short: string;
  bangla: string;
}

export type SubjectId = 'mathematics' | 'physics' | 'chemistry' | 'biology' | 'english';

export interface Subject {
  id: SubjectId;
  name: string;
  bangla: string;
  icon: keyof typeof Ionicons.glyphMap;
  chapters: number;
  progress: number; // 0-1
  notesCount: number;
  quizCount: number;
  color: [string, string];
}

export interface Note {
  id: string;
  subjectId: SubjectId;
  title: string;
  chapter: string;
  pages: number;
  size: string;
  downloads: string;
}

export interface Quiz {
  id: string;
  subjectId: SubjectId;
  title: string;
  questions: number;
  minutes: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  attempts: string;
  bestScore?: number;
}

export interface DashboardStats {
  syllabusPct: number;
  quizzesDone: number;
  notesCount: number;
  streak: number;
}

export interface ContinueLearning {
  title: string;
  meta: string;
  progress: number; // 0-1
}

export interface SscBanner {
  tag: string;
  title: string;
  subtitle: string;
  action: string;
}

export interface Teacher {
  id: string;
  name: string;
  subject: string;
}
