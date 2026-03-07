# Quality Systems Master

A gamified MBA learning application for mastering Quality Management Systems (ISO 9001, TQM, Six Sigma, Lean).

## Tech Stack

- **React 18** + **TypeScript**
- **Vite** (build tool)
- **Tailwind CSS v4** (styling)
- **Framer Motion** (animations & page transitions)
- **Zustand** (state management, localStorage persistence)
- **React Router v7** (navigation)
- **@dnd-kit** (drag-and-drop for DragSort questions)
- **Vitest** + **Testing Library** (tests)

## Setup

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Run tests
npm test

# Production build
npm run build
```

## Application Flow

```
Home → System Select → Level Map → Level Intro → Game → Result → Level Map
                                                              ↓
                                                         Profile
```

## Features

### 6 Question Types
| Type | Description |
|------|-------------|
| MultipleChoice | 4 options (A/B/C/D), one correct |
| TrueFalse | Statement + two large True/False buttons |
| DragSort | Drag-and-drop to sort items in correct sequence |
| FillBlank | Sentence with a gap, text input |
| CaseStudy | Scenario + 2–3 decisions with consequences revealed |
| Matching | Two columns — click left then right to connect pairs |

### Gamification
- **XP** per correct answer (scaled by streak bonus)
- **Streak counter** — consecutive correct answers multiply XP
- **Stars per level** — 1★ ≥70%, 2★ ≥85%, 3★ ≥95%
- **Level badges** awarded on completion
- **Confetti burst** on level pass
- **Locked nodes** with padlock on Level Map
- **Progress rings** on System Select cards
- **10 bonus exam points** for completing all 10 levels in any system

### Persistence
Progress is saved to `localStorage` via Zustand's persist middleware. Completed levels, stars, and XP survive page reloads.

## Data

Demo data covers:
- **ISO 9001** — 10 levels (3 with full questions: Foundations, Process Thinking, Risk & Audit)
- **TQM** — 10 levels (3 with full questions: Foundations, Customer Focus, Continuous Improvement)
- **Six Sigma** & **Lean** — listed as available systems (questions can be added in `src/data/questions.ts`)

## Project Structure

```
src/
  components/
    questions/       MultipleChoice, TrueFalse, DragSort, FillBlank, CaseStudy, Matching
    ui/              Button, Card, ProgressBar, Badge, ProgressRing, Confetti
  screens/           HomeScreen, SystemSelectScreen, LevelMapScreen,
                     LevelIntroScreen, GameScreen, ResultScreen, ProfileScreen
  store/             gameStore.ts (session), progressStore.ts (persisted)
  types/             index.ts — all TypeScript interfaces
  data/              systems.ts, levels.ts, questions.ts
  test/              gameStore.test.ts, progressStore.test.ts, checkAnswer.test.ts
```

## Adding More Questions

Edit `src/data/questions.ts`. Each question needs:
```ts
{
  id: 'unique-id',
  levelId: 'iso9001-4',        // must match a level id from levels.ts
  type: 'MultipleChoice',      // one of 6 types
  prompt: 'Question text',
  data: { /* type-specific shape */ },
  correctAnswer: 'a',          // string | string[] | Record<string,string>
}
```
