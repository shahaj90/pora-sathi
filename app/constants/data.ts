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
  icon: string; // Ionicons name
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

export const GRADES: Grade[] = [
  { id: 'c5', label: 'Class 5', short: '5', bangla: 'পঞ্চম' },
  { id: 'c6', label: 'Class 6', short: '6', bangla: 'ষষ্ঠ' },
  { id: 'c7', label: 'Class 7', short: '7', bangla: 'সপ্তম' },
  { id: 'c8', label: 'Class 8', short: '8', bangla: 'অষ্টম' },
  { id: 'c9', label: 'Class 9', short: '9', bangla: 'নবম' },
  { id: 'c10', label: 'Class 10', short: '10', bangla: 'দশম' },
  { id: 'ssc', label: 'SSC', short: 'SSC', bangla: 'এসএসসি' },
];

export const SUBJECTS: Subject[] = [
  {
    id: 'mathematics',
    name: 'Mathematics',
    bangla: 'গণিত',
    icon: 'calculator',
    chapters: 14,
    progress: 0.68,
    notesCount: 42,
    quizCount: 28,
    color: ['#6C3CE0', '#9D6BFF'],
  },
  {
    id: 'physics',
    name: 'Physics',
    bangla: 'পদার্থবিজ্ঞান',
    icon: 'magnet',
    chapters: 12,
    progress: 0.45,
    notesCount: 36,
    quizCount: 24,
    color: ['#3D7BFF', '#5ED0FF'],
  },
  {
    id: 'chemistry',
    name: 'Chemistry',
    bangla: 'রসায়ন',
    icon: 'flask',
    chapters: 11,
    progress: 0.52,
    notesCount: 33,
    quizCount: 22,
    color: ['#00A88F', '#4ADE80'],
  },
  {
    id: 'biology',
    name: 'Biology',
    bangla: 'জীববিজ্ঞান',
    icon: 'leaf',
    chapters: 13,
    progress: 0.34,
    notesCount: 39,
    quizCount: 26,
    color: ['#1DA65C', '#A3E635'],
  },
  {
    id: 'english',
    name: 'English',
    bangla: 'ইংরেজি',
    icon: 'book',
    chapters: 16,
    progress: 0.61,
    notesCount: 48,
    quizCount: 32,
    color: ['#FF5C8A', '#FF8A3D'],
  },
];

export const NOTES: Note[] = [
  {
    id: 'n1',
    subjectId: 'mathematics',
    title: 'Quadratic Equations — Complete Notes',
    chapter: 'Ch 4 · Algebra',
    pages: 18,
    size: '2.4 MB',
    downloads: '12k',
  },
  {
    id: 'n2',
    subjectId: 'physics',
    title: 'Motion & Force Formula Sheet',
    chapter: 'Ch 2 · Mechanics',
    pages: 12,
    size: '1.8 MB',
    downloads: '9.4k',
  },
  {
    id: 'n3',
    subjectId: 'chemistry',
    title: 'Chemical Reactions with Diagrams',
    chapter: 'Ch 5 · Reactions',
    pages: 22,
    size: '3.1 MB',
    downloads: '8.1k',
  },
  {
    id: 'n4',
    subjectId: 'biology',
    title: 'Cell & Tissue — SSC Board Notes',
    chapter: 'Ch 1 · Cell',
    pages: 16,
    size: '2.9 MB',
    downloads: '11k',
  },
  {
    id: 'n5',
    subjectId: 'english',
    title: 'Grammar: Tense & Voice Cheatsheet',
    chapter: 'Grammar · Part A',
    pages: 10,
    size: '1.2 MB',
    downloads: '15k',
  },
];

export const QUIZZES: Quiz[] = [
  {
    id: 'q1',
    subjectId: 'mathematics',
    title: 'Algebra Sprint',
    questions: 15,
    minutes: 20,
    difficulty: 'Medium',
    attempts: '4.2k',
    bestScore: 80,
  },
  {
    id: 'q2',
    subjectId: 'physics',
    title: 'Newton Laws Challenge',
    questions: 12,
    minutes: 15,
    difficulty: 'Hard',
    attempts: '2.8k',
    bestScore: 67,
  },
  {
    id: 'q3',
    subjectId: 'chemistry',
    title: 'Periodic Table Blitz',
    questions: 10,
    minutes: 10,
    difficulty: 'Easy',
    attempts: '5.1k',
    bestScore: 90,
  },
  {
    id: 'q4',
    subjectId: 'english',
    title: 'Vocabulary Master — SSC',
    questions: 20,
    minutes: 15,
    difficulty: 'Medium',
    attempts: '6.3k',
  },
];
