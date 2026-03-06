// =============================================
// Type Definitions — Interactive Learning Platform
// Financial Management: Volatility, Risk, and AI
// =============================================

// --- Lesson Types ---
export interface LessonSegment {
  id: string;
  title: string;
  duration: number; // minutes
  type: 'story' | 'lecture' | 'demo' | 'activity' | 'discussion' | 'break' | 'wrapup';
  content: string;
  keyPoints?: string[];
  teacherNotes?: string;
}

export interface WeekLesson {
  weekNumber: number;
  title: string;
  subtitle: string;
  duration: number; // total minutes
  prerequisites: string[];
  learningObjectives: string[];
  segments: LessonSegment[];
}

// --- Formula Types ---
export interface Formula {
  id: string;
  name: string;
  latex: string;
  description: string;
  variables?: Record<string, string>;
  example?: string;
  weekIntroduced: number;
}

export interface WeekFormulas {
  weekNumber: number;
  title: string;
  formulas: Formula[];
}

// --- Exercise Types ---
export interface MCOption {
  label: string; // 'A' | 'B' | 'C' | 'D'
  text: string;
}

export interface MCQuestion {
  id: string;
  question: string;
  options: MCOption[];
  correctAnswer: string; // 'A' | 'B' | 'C' | 'D'
  explanation: string;
}

export interface WeekExercises {
  weekNumber: number;
  title: string;
  questions: MCQuestion[];
}

// --- Teaching Script Types (Segment-based) ---
export type CharacterId = 'drLin' | 'alex' | 'kenji' | 'priya' | 'david' | 'narrator';

export type TeachingStep = LectureStep | CheckStep | VisualStep | DiscussTimerStep;

export interface LectureStep {
  type: 'lecture';
  text: string;           // 角色說的話（自然口語英文）
  character: CharacterId;
  note?: string;          // 螢幕上重點筆記
}

export interface CheckStep {
  type: 'check';
  question: string;
  options: string[];      // 2-4 個選項
  correctIndex: number;
  onCorrect: string;
  onWrong: string;
}

export interface VisualStep {
  type: 'visual';
  component: string;      // VISUAL_COMPONENTS 鍵名
  caption?: string;
  props?: Record<string, unknown>;
}

export interface DiscussTimerStep {
  type: 'discuss_timer';
  durationMinutes: number;
  prompt: string;
  guidePoints?: string[];
}

export interface SegmentTeaching {
  steps: TeachingStep[];
}

// --- Navigation Types ---
export interface WeekInfo {
  weekNumber: number;
  title: string;
  subtitle: string;
  keyConcepts: string[];
  color: string;
}

export const WEEKS: WeekInfo[] = [
  { weekNumber: 1, title: 'Financial Risk and Return Distributions', subtitle: 'Why normal fails', keyConcepts: ['Fat tails', 'Skewness', 'Kurtosis', 'QQ plot', 'JB test'], color: '#1B3A5C' },
  { weekNumber: 2, title: 'Measuring Volatility', subtitle: 'Many rulers, one truth', keyConcepts: ['Rolling window', 'EWMA', 'Realized vol', 'VIX', 'Stylized facts'], color: '#D4A843' },
  { weekNumber: 3, title: 'Volatility Clustering and GARCH', subtitle: 'Taming the beast', keyConcepts: ['ARCH', 'GARCH(1,1)', 'MLE', 'Half-life', 'Ljung-Box'], color: '#2D7D5E' },
  { weekNumber: 4, title: 'Asymmetric Volatility', subtitle: 'Bad news hits harder', keyConcepts: ['Leverage effect', 'GJR-GARCH', 'EGARCH', 'News Impact Curve'], color: '#C0392B' },
  { weekNumber: 5, title: 'Volatility Forecasting', subtitle: 'The crystal ball', keyConcepts: ['RMSE', 'MAE', 'QLIKE', 'Mincer-Zarnowitz', 'Diebold-Mariano'], color: '#8E44AD' },
  { weekNumber: 6, title: 'Value-at-Risk', subtitle: 'How much can you lose?', keyConcepts: ['VaR', 'Historical Sim', 'Parametric VaR', 'Monte Carlo', 'CVaR'], color: '#E67E22' },
  { weekNumber: 7, title: 'VaR Backtesting', subtitle: 'Trust but verify', keyConcepts: ['Kupiec', 'Christoffersen', 'Basel traffic light', 'Stress testing'], color: '#16A085' },
  { weekNumber: 8, title: 'AI in Finance', subtitle: 'The final frontier', keyConcepts: ['Random Forest', 'LSTM', 'Bias-variance', 'Hybrid models'], color: '#2C3E50' },
];
