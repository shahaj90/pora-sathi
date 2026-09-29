import type { Ionicons } from '@expo/vector-icons';

export type GradeId = 'c8' | 'c9' | 'c10';

export interface Grade {
  id: GradeId;
  label: string;
  short: string;
  bangla: string;
}

export type SubjectId =
  | 'mathematics'
  | 'physics'
  | 'chemistry'
  | 'biology'
  | 'science'
  | 'bangla1'
  | 'bangla2'
  | 'english1'
  | 'english2';

export interface Chapter {
  id: string;
  title: string;
  pageStart: number;
  pageEnd: number;
}

export interface Subject {
  id: SubjectId;
  name: string;
  bangla: string;
  icon: keyof typeof Ionicons.glyphMap;
  chapterCount: number;
  progress: number; // 0-1
  booksCount: number;
  quizCount: number;
  color: [string, string];
  pdfFile: string; // filename inside assets/books/
  chapters: Chapter[];
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
  booksCount: number;
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
