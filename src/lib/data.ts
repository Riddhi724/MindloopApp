export type Tab = 'checkin' | 'games' | 'journal' | 'trends';

export type Mood = 'great' | 'good' | 'okay' | 'low' | 'struggling';

export interface MoodOption {
  id: Mood;
  label: string;
  emoji: string;
  score: number; // contribution to weekly score
}

export interface CheckInEntry {
  date: string; // ISO date
  mood: Mood;
  note: string;
}

export interface JournalEntry {
  date: string; // ISO date
  answers: Record<string, string>;
}

export interface FocusSession {
  date: string;
  avgMs: number;
  varianceMs: number;
  focusScore: number; // 0-100
}

export interface WeeklyScore {
  weekLabel: string;
  score: number;
  isExamWeek: boolean;
  examLabel?: string;
}

export interface ConsentState {
  dailyCheckIns: boolean;
  weeklyJournaling: boolean;
  passivePattern: boolean;
  consented: boolean;
}

export type ScoreBand = 'stable' | 'mild' | 'elevated' | 'critical';

export const MOOD_OPTIONS: MoodOption[] = [
  { id: 'great', label: 'Great', emoji: '😄', score: 90 },
  { id: 'good', label: 'Good', emoji: '🙂', score: 75 },
  { id: 'okay', label: 'Okay', emoji: '😐', score: 55 },
  { id: 'low', label: 'Low', emoji: '😔', score: 35 },
  { id: 'struggling', label: 'Struggling', emoji: '😣', score: 18 },
];

export const CRISIS_KEYWORDS = [
  'hopeless',
  "can't go on",
  'cant go on',
  'want to disappear',
  'end it all',
  'no reason to live',
  'kill myself',
  'suicide',
  'better off dead',
  'want to die',
  "don't want to live",
  'dont want to live',
  'give up on life',
];

export const JOURNAL_QUESTIONS = [
  'How has your week felt overall?',
  "What's been weighing on you, if anything?",
  "What's one thing that went okay?",
  'How are you sleeping?',
];

// 8 weeks of fake history, with 2-3 exam weeks flagged
export const WEEKLY_SCORES: WeeklyScore[] = [
  { weekLabel: 'Week 1', score: 72, isExamWeek: false },
  { weekLabel: 'Week 2', score: 78, isExamWeek: false },
  { weekLabel: 'Week 3', score: 68, isExamWeek: false },
  { weekLabel: 'Week 4', score: 61, isExamWeek: true, examLabel: 'Midterms' },
  { weekLabel: 'Week 5', score: 38, isExamWeek: true, examLabel: 'Midterms' },
  { weekLabel: 'Week 6', score: 52, isExamWeek: false },
  { weekLabel: 'Week 7', score: 64, isExamWeek: false },
  { weekLabel: 'Week 8', score: 71, isExamWeek: true, examLabel: 'Finals' },
];

export const HELPLINE_NUMBER = '988';
export const HELPLINE_LABEL = '988 Suicide & Crisis Lifeline';

export function bandForScore(score: number): ScoreBand {
  if (score >= 70) return 'stable';
  if (score >= 45) return 'mild';
  if (score >= 25) return 'elevated';
  return 'critical';
}

export const BAND_META: Record<ScoreBand, { label: string; color: string; bg: string; text: string }> = {
  stable: { label: 'Stable', color: 'bg-band-stable', bg: 'bg-sage-100', text: 'text-sage-700' },
  mild: { label: 'Mild dip', color: 'bg-band-mild', bg: 'bg-sand-100', text: 'text-sand-500' },
  elevated: { label: 'Elevated', color: 'bg-band-elevated', bg: 'bg-orange-100', text: 'text-orange-700' },
  critical: { label: 'Critical', color: 'bg-band-critical', bg: 'bg-red-100', text: 'text-red-700' },
};

export function daysUntilNextJournal(lastSubmittedIso: string | null): number {
  if (!lastSubmittedIso) return 0;
  const last = new Date(lastSubmittedIso).getTime();
  const now = Date.now();
  const diff = 7 * 24 * 60 * 60 * 1000 - (now - last);
  return Math.max(0, Math.ceil(diff / (24 * 60 * 60 * 1000)));
}

export function isCrisisText(text: string): boolean {
  const lower = text.toLowerCase();
  return CRISIS_KEYWORDS.some((kw) => lower.includes(kw));
}
