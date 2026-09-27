# Pora Sathi — AI Tutor (Classes 5–10 + SSC)

Vibrant, clean, responsive Expo (React Native) dashboard UI.

## Screens (in `app/`)
- `app/index.tsx` — Dashboard: greeting header + search, grade tabs (Class 5–10, SSC), continue-learning, subject grid (Math, Physics, Chemistry, Biology, English), PDF notes, quizzes, floating AI chat button, bottom nav.
- `app/chat.tsx` — Floating-chat destination: AI tutor chat UI with Bangla/English suggestions.
- `app/subject/[id].tsx` — Per-subject detail with PDF Notes / Quizzes tabs, grade-aware.

## Components
- `components/Header.tsx` — gradient header, streak, search, stats + continue card
- `components/GradeTabs.tsx` — horizontal grade pills + section header
- `components/SubjectGrid.tsx` — responsive 2-col subject cards + SSC crash-course banner
- `components/Library.tsx` — PDF notes grid + quiz list
- `components/ChatFAB.tsx` — floating AI chat button
- `components/BottomNav.tsx` — Home / Notes / Quiz / Progress

## Run
```bash
npm install
npx expo start
# press `w` for web, `a`/`i` for device
```

Responsive: `useWindowDimensions` grid, scrollable grade tabs, `%`-width cards, safe-area + bottom-nav padding.
