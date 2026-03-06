export interface LearningProgress {
  week: number;
  currentSegment: number;
  maxReachedSegment: number;
  completed: boolean;
  mode: 'self' | 'class' | 'quiz';
  classStepIndex: number;
  classScore?: number;
  quizResult?: { score: number; total: number; weakTopics: string[] };
  lastAccessed: string; // ISO date
}

const PREFIX = 'voltech-progress-week-';

function getKey(week: number): string {
  return `${PREFIX}${week}`;
}

export function getProgress(week: number): LearningProgress | null {
  if (typeof window === 'undefined') return null;
  const raw = localStorage.getItem(getKey(week));
  if (!raw) return null;
  try {
    return JSON.parse(raw) as LearningProgress;
  } catch {
    return null;
  }
}

export function saveProgress(week: number, data: LearningProgress): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(getKey(week), JSON.stringify(data));
}

export function resetProgress(week: number): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(getKey(week));
}

export function getAllProgress(): (LearningProgress | null)[] {
  return Array.from({ length: 8 }, (_, i) => getProgress(i + 1));
}
