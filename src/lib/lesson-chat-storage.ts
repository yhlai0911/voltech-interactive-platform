/**
 * Lesson page AI assistant chat storage
 * One conversation per week, no thread management needed
 * Storage key: voltech-chat-week-{N}
 */

export interface LessonChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}

const KEY_PREFIX = 'voltech-chat-week-';

export function loadLessonChat(weekNum: number): LessonChatMessage[] {
  if (typeof window === 'undefined') return [];
  const raw = localStorage.getItem(KEY_PREFIX + weekNum);
  if (!raw) return [];
  try {
    return JSON.parse(raw) as LessonChatMessage[];
  } catch {
    return [];
  }
}

export function saveLessonChat(weekNum: number, messages: LessonChatMessage[]): void {
  localStorage.setItem(KEY_PREFIX + weekNum, JSON.stringify(messages));
}

export function clearLessonChat(weekNum: number): void {
  localStorage.removeItem(KEY_PREFIX + weekNum);
}

export function trimMessages(
  messages: LessonChatMessage[],
  maxRounds: number = 10,
  keepHead: number = 2,
  keepTail: number = 8,
): LessonChatMessage[] {
  if (messages.length <= maxRounds * 2) return messages;
  return [
    ...messages.slice(0, keepHead * 2),
    ...messages.slice(-(keepTail * 2)),
  ];
}
