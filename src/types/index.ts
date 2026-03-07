export type QuestionType =
  | 'MultipleChoice'
  | 'TrueFalse'
  | 'DragSort'
  | 'FillBlank'
  | 'CaseStudy'
  | 'Matching';

// ─── Question data shapes per type ───────────────────────────────────────────

export interface MultipleChoiceData {
  options: { id: string; text: string }[];
}

export interface TrueFalseData {
  statement: string;
}

export interface DragSortData {
  items: { id: string; text: string }[];
}

export interface FillBlankData {
  before: string;
  after: string;
}

export interface CaseStudyData {
  scenario: string;
  options: { id: string; text: string; consequence: string }[];
}

export interface MatchingData {
  left: { id: string; text: string }[];
  right: { id: string; text: string }[];
}

export type QuestionData =
  | MultipleChoiceData
  | TrueFalseData
  | DragSortData
  | FillBlankData
  | CaseStudyData
  | MatchingData;

// ─── Core entities ────────────────────────────────────────────────────────────

export interface QualitySystem {
  id: string;
  name: string;
  icon: string;
  description: string;
  color: string; // accent hex
  accentClass: string; // tailwind class name for gradient
}

export interface Level {
  id: string;
  systemId: string;
  levelNumber: number; // 1–10
  title: string;
  topic: string;
  description: string;
  minPassScore: number; // e.g. 70
}

export interface Question {
  id: string;
  levelId: string;
  type: QuestionType;
  prompt: string;
  data: QuestionData;
  /** For MultipleChoice / TrueFalse / FillBlank: string id/value.
   *  For DragSort: ordered array of item ids.
   *  For CaseStudy: id of the "best" option.
   *  For Matching: Record<leftId, rightId>. */
  correctAnswer: string | string[] | Record<string, string>;
  explanation?: string;
  xpReward?: number;
}

// ─── User progress ────────────────────────────────────────────────────────────

export interface UserProgress {
  systemId: string;
  completedLevels: number[]; // levelNumbers completed
  levelStars: Record<number, number>; // levelNumber → 1|2|3
  totalXP: number;
}

// ─── Game session ─────────────────────────────────────────────────────────────

export interface GameSession {
  systemId: string;
  levelId: string;
  levelNumber: number;
  questions: Question[];
  currentIndex: number;
  answers: Record<string, string | string[] | Record<string, string>>;
  score: number; // correct answers count
  streak: number;
  xpGained: number;
  lives: number;
  lastXpGained: number;
  finished: boolean;
}
