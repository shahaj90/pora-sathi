# Pora Sathi — AI Tutor (Classes 8–10)

Vibrant, clean, responsive Expo (React Native) dashboard UI.

## Screens (in `app/`)

- `app/index.tsx` — Dashboard: greeting header + search, grade tabs (Class 8–10), continue-learning, subject grid (Math, Science/Physics/Chemistry/Biology, Bangla 1st/2nd Paper, English 1st/2nd Paper), PDF notes, quizzes, floating AI chat button, bottom nav.
- `app/chat.tsx` — Floating-chat destination: AI tutor chat UI with Bangla/English suggestions.
- `app/subject/[id].tsx` — Per-subject detail with PDF Notes / Quizzes tabs, grade-aware.

## Components

Feature components compose primitives from `components/ui/` — no duplicated
button, card, chip, progress, or empty-state styles:

- `components/ui/` — `Card`, `Button` (primary/soft/loading), `Chip` (selectable pill), `ProgressBar`, `EmptyState`, `SectionHeader`, `FormField` (label/icon/error + password show-hide), `Avatar`, `BottomSheetMenu`, `SettingsRow`, `Skeleton`
- `components/Header.tsx` — gradient header, streak, search, stats + continue card
- `components/GradeTabs.tsx` — horizontal grade pills (built on `Chip`)
- `components/SubjectGrid.tsx` — responsive subject cards (2-col full, 3-col `compact`)
- `components/SscBanner.tsx` — SSC crash-course promo banner
- `components/Library.tsx` — PDF notes grid + quiz list, plus horizontal `NotesCarousel` / `QuizCarousel`
- `components/ProgressSection.tsx` — overall + per-subject progress (built on `Card` + `ProgressBar`)
- `components/ChatFAB.tsx` — floating AI chat button
- `components/BottomNav.tsx` — Home / Notes / Quiz / Progress

## Data layer (demo JSON → endpoints later)

- `data/*.json` — class-wise demo payloads: `grades`, `teachers`, and per-class `subjects-c{8,9,10}`, `notes-c{8,9,10}`, `quizzes-c{8,9,10}`, `dashboard-c{8,9,10}`.
- `lib/api.ts` — the single data-access module: `fetchGrades`, `fetchSubjects`, `fetchNotes`, `fetchQuizzes`, `fetchDashboardMeta`, plus sync `getSubjectsForGrade` / `getNotesForGrade` / `getQuizzesForGrade` helpers for the subject detail screen. Results are cached in memory per grade; every function documents the `fetch(API_BASE_URL + …)` swap. Callers already handle loading/error/retry, so endpoint migration needs no UI changes.
- `constants/data.ts` — TypeScript types only, no data.
- Demo auth: `context/AuthContext.tsx` + `constants/demoUser.ts` (`demo@porasathi.com` / `demo1234`). Sessions persist across restarts via `expo-secure-store`.

## Run

```bash
npm install
npx expo start
# press `w` for web, `a`/`i` for device
```

Responsive: `useWindowDimensions` grid, scrollable grade tabs, `%`-width cards, safe-area + bottom-nav padding.
