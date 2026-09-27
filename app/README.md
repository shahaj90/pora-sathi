# Pora Sathi — AI Tutor (Classes 5–10 + SSC)

Vibrant, clean, responsive Expo (React Native) dashboard UI.

## Screens (in `app/`)

- `app/index.tsx` — Dashboard: greeting header + search, grade tabs (Class 5–10, SSC), continue-learning, subject grid (Math, Physics, Chemistry, Biology, English), PDF notes, quizzes, floating AI chat button, bottom nav.
- `app/chat.tsx` — Floating-chat destination: AI tutor chat UI with Bangla/English suggestions.
- `app/subject/[id].tsx` — Per-subject detail with PDF Notes / Quizzes tabs, grade-aware.

## Components

Feature components compose primitives from `components/ui/` — no duplicated
button, card, chip, progress, or empty-state styles:

- `components/ui/` — `Card`, `Button` (primary/soft/loading), `Chip` (selectable pill), `ProgressBar`, `EmptyState`, `SectionHeader`
- `components/Header.tsx` — gradient header, streak, search, stats + continue card
- `components/GradeTabs.tsx` — horizontal grade pills (built on `Chip`)
- `components/SubjectGrid.tsx` — responsive 2-col subject cards + SSC crash-course banner
- `components/Library.tsx` — PDF notes grid + quiz list (built on `Card`)
- `components/ProgressSection.tsx` — overall + per-subject progress (built on `Card` + `ProgressBar`)
- `components/AuthField.tsx` — labeled input with icon, error, show/hide password
- `components/ChatFAB.tsx` — floating AI chat button
- `components/BottomNav.tsx` — Home / Notes / Quiz / Progress

## Data layer (demo JSON → endpoints later)

- `data/*.json` — demo payloads: `grades`, `subjects`, `notes`, `quizzes`, `dashboard` (stats + continue-learning).
- `lib/api.ts` — the only place screens get data from: `fetchGrades`, `fetchSubjects`, `fetchNotes`, `fetchQuizzes`, `fetchDashboardMeta`. Each serves local JSON with a simulated delay; every function documents the `fetch(API_BASE_URL + …)` swap. Callers already handle loading/error/retry, so endpoint migration needs no UI changes.
- `constants/data.ts` — TypeScript types only, no data.
- Demo auth: `context/AuthContext.tsx` + `constants/demoUser.ts` (`demo@porasathi.com` / `demo1234`).

## Run

```bash
npm install
npx expo start
# press `w` for web, `a`/`i` for device
```

Responsive: `useWindowDimensions` grid, scrollable grade tabs, `%`-width cards, safe-area + bottom-nav padding.
