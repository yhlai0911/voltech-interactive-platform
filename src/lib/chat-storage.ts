/**
 * Multi-thread chat storage using LocalStorage
 * Storage key: voltech-tutor-{id}
 */

export interface ChatThread {
  id: string;
  title: string;
  createdAt: number;
  updatedAt: number;
  week: number;
}

export interface ChatAttachment {
  type: 'image' | 'file';
  name: string;
  mimeType: string;
  data: string;
  previewUrl?: string;
}

export interface StoredMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: number;
  attachments?: ChatAttachment[];
}

const THREADS_KEY = 'voltech-tutor-threads';
const MSG_PREFIX = 'voltech-tutor-';

export function loadThreads(): ChatThread[] {
  if (typeof window === 'undefined') return [];
  const raw = localStorage.getItem(THREADS_KEY);
  if (!raw) return [];
  try {
    return JSON.parse(raw) as ChatThread[];
  } catch {
    return [];
  }
}

function saveThreads(threads: ChatThread[]) {
  localStorage.setItem(THREADS_KEY, JSON.stringify(threads));
}

export function createThread(week: number): ChatThread {
  const thread: ChatThread = {
    id: crypto.randomUUID(),
    title: 'New Chat',
    createdAt: Date.now(),
    updatedAt: Date.now(),
    week,
  };
  const threads = loadThreads();
  threads.unshift(thread);
  saveThreads(threads);
  return thread;
}

export function deleteThread(id: string) {
  const threads = loadThreads().filter((t) => t.id !== id);
  saveThreads(threads);
  localStorage.removeItem(MSG_PREFIX + id);
}

function updateThreadTitle(id: string, title: string) {
  const threads = loadThreads();
  const thread = threads.find((t) => t.id === id);
  if (thread) {
    thread.title = title;
    thread.updatedAt = Date.now();
    saveThreads(threads);
  }
}

function touchThread(id: string) {
  const threads = loadThreads();
  const thread = threads.find((t) => t.id === id);
  if (thread) {
    thread.updatedAt = Date.now();
    saveThreads(threads);
  }
}

export function loadMessages(threadId: string): StoredMessage[] {
  if (typeof window === 'undefined') return [];
  const raw = localStorage.getItem(MSG_PREFIX + threadId);
  if (!raw) return [];
  try {
    return JSON.parse(raw) as StoredMessage[];
  } catch {
    return [];
  }
}

export function saveMessages(threadId: string, messages: StoredMessage[]) {
  localStorage.setItem(MSG_PREFIX + threadId, JSON.stringify(messages));
  touchThread(threadId);

  if (messages.length >= 1) {
    const firstUser = messages.find((m) => m.role === 'user');
    if (firstUser) {
      const title = firstUser.content.slice(0, 20) + (firstUser.content.length > 20 ? '...' : '');
      updateThreadTitle(threadId, title);
    }
  }
}

export async function extractTextFromFile(file: File): Promise<string> {
  if (file.type === 'text/plain' || file.type === 'text/csv' || file.type === 'text/markdown') {
    return file.text();
  }
  if (file.type === 'application/pdf') {
    return `[PDF file: ${file.name}, size ${(file.size / 1024).toFixed(1)} KB]`;
  }
  return `[File: ${file.name}, type ${file.type}]`;
}

export function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      const base64 = result.split(',')[1] || result;
      resolve(base64);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export function isImageFile(file: File): boolean {
  return file.type.startsWith('image/');
}
