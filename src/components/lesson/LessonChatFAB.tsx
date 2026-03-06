'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Loader2, Trash2, MessageCircleQuestion } from 'lucide-react';
import { useTranslations, useLocale } from 'next-intl';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import CharacterAvatar from '@/components/brand/CharacterAvatar';
import { BRAND } from '@/components/brand/BrandColors';

// ---------------------------------------------------------------------------
// Chat message type
// ---------------------------------------------------------------------------
interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}

// ---------------------------------------------------------------------------
// LocalStorage helpers
// ---------------------------------------------------------------------------
const CHAT_KEY_PREFIX = 'voltech-chat-week-';

function loadChat(weekNum: number): ChatMessage[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(`${CHAT_KEY_PREFIX}${weekNum}`);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveChat(weekNum: number, messages: ChatMessage[]) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(`${CHAT_KEY_PREFIX}${weekNum}`, JSON.stringify(messages));
}

function clearChat(weekNum: number) {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(`${CHAT_KEY_PREFIX}${weekNum}`);
}

// Suggestions are loaded from translations (lessonChat.suggestions.{segmentType})

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------
interface LessonChatFABProps {
  weekNum: number;
  weekTitle: string;
  segmentTitle: string;
  segmentType: string;
}

export default function LessonChatFAB({
  weekNum,
  weekTitle,
  segmentTitle,
  segmentType,
}: LessonChatFABProps) {
  const t = useTranslations('lessonChat');
  const locale = useLocale();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const [hasUnread, setHasUnread] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Load chat
  useEffect(() => {
    setMessages(loadChat(weekNum));
  }, [weekNum]);

  // Auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Focus input when panel opens
  useEffect(() => {
    if (open) {
      setHasUnread(false);
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [open]);

  // Escape to close
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && open) setOpen(false);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [open]);

  // Send message
  const sendMessage = useCallback(
    async (text: string) => {
      if (!text.trim() || isStreaming) return;

      const userMsg: ChatMessage = {
        role: 'user',
        content: text.trim(),
        timestamp: Date.now(),
      };

      const newMessages = [...messages, userMsg];
      setMessages(newMessages);
      setInput('');
      setIsStreaming(true);

      const apiMessages = newMessages.slice(-20).map(m => ({
        role: m.role,
        content: m.content,
      }));

      try {
        const res = await fetch('/api/lesson-chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            messages: apiMessages,
            weekNum,
            locale,
            lessonContext: `Week ${weekNum}: ${weekTitle} | Current: ${segmentTitle}`,
          }),
        });

        if (!res.ok) {
          const err = await res.json();
          throw new Error(err.error || 'Request failed');
        }

        const reader = res.body?.getReader();
        if (!reader) throw new Error('No response body');

        const decoder = new TextDecoder();
        let assistantContent = '';
        const assistantMsg: ChatMessage = {
          role: 'assistant',
          content: '',
          timestamp: Date.now(),
        };

        setMessages([...newMessages, assistantMsg]);

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value);
          const lines = chunk.split('\n').filter(l => l.startsWith('data: '));

          for (const line of lines) {
            const data = line.slice(6);
            if (data === '[DONE]') break;
            try {
              const parsed = JSON.parse(data);
              if (parsed.content) {
                assistantContent += parsed.content;
                setMessages(prev => {
                  const updated = [...prev];
                  updated[updated.length - 1] = {
                    ...updated[updated.length - 1],
                    content: assistantContent,
                  };
                  return updated;
                });
              }
            } catch {
              // skip malformed
            }
          }
        }

        const finalMessages: ChatMessage[] = [
          ...newMessages,
          { role: 'assistant', content: assistantContent, timestamp: Date.now() },
        ];
        setMessages(finalMessages);
        saveChat(weekNum, finalMessages);

        if (!open) setHasUnread(true);
      } catch (error) {
        const errorMsg: ChatMessage = {
          role: 'assistant',
          content: t('errorMsg', { error: (error as Error).message || '' }),
          timestamp: Date.now(),
        };
        const final = [...newMessages, errorMsg];
        setMessages(final);
        saveChat(weekNum, final);
      } finally {
        setIsStreaming(false);
      }
    },
    [messages, isStreaming, weekNum, weekTitle, segmentTitle, open],
  );

  const handleClear = useCallback(() => {
    clearChat(weekNum);
    setMessages([]);
  }, [weekNum]);

  const sugType = segmentType as string;
  const rawSuggestions = t.raw(`suggestions.${sugType}`) as string[] | undefined;
  const defaultSuggestions = t.raw('suggestions.lecture') as string[];
  const suggestions: string[] = rawSuggestions ?? defaultSuggestions;

  return (
    <>
      {/* FAB button */}
      <button
        onClick={() => setOpen(prev => !prev)}
        className="fixed bottom-6 right-6 z-50 rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-105 active:scale-95"
        style={{ backgroundColor: BRAND.primary }}
        title={t("aiAssistant")}
      >
        <div className="relative p-1">
          <CharacterAvatar characterId="drLin" size="md" />
          {hasUnread && (
            <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-red-500 rounded-full border-2 border-white" />
          )}
        </div>
      </button>

      {/* Chat Panel */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 bg-black/20 z-50 sm:bg-transparent sm:pointer-events-none"
            />

            {/* Panel */}
            <motion.div
              initial={{ x: '100%', opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: '100%', opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="fixed top-0 right-0 bottom-0 z-50 w-full sm:w-[400px] bg-white shadow-2xl flex flex-col"
            >
              {/* Header */}
              <div
                className="px-4 py-3 flex items-center justify-between shrink-0"
                style={{ backgroundColor: BRAND.primary }}
              >
                <div className="flex items-center gap-2 min-w-0">
                  <CharacterAvatar characterId="drLin" size="sm" />
                  <div className="text-white min-w-0">
                    <div className="text-sm font-bold">{t("aiAssistant")}</div>
                    <div className="text-xs text-white/70 truncate">
                      {t("weekSegment", { week: String(weekNum), segment: segmentTitle })}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={handleClear}
                    className="p-1.5 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-colors"
                    title={t("clearChat")}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setOpen(false)}
                    className="p-1.5 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {messages.length === 0 && (
                  <div className="text-center py-6">
                    <MessageCircleQuestion
                      className="w-10 h-10 mx-auto mb-3 opacity-30"
                      style={{ color: BRAND.primary }}
                    />
                    <p className="text-sm text-gray-500 mb-4">
                      {t("askAnything")}
                    </p>
                    <div className="flex flex-col gap-2">
                      {suggestions.map((q: string) => (
                        <button
                          key={q}
                          onClick={() => sendMessage(q)}
                          className="w-full text-left px-3 py-2 rounded-lg text-sm border hover:bg-gray-50 transition-colors"
                          style={{ borderColor: `${BRAND.accent}60`, color: BRAND.primary }}
                        >
                          {q}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {messages.map((msg, i) => (
                  <div
                    key={i}
                    className={`flex gap-2 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
                  >
                    {msg.role === 'assistant' && (
                      <CharacterAvatar characterId="drLin" size="sm" />
                    )}
                    <div
                      className={`max-w-[85%] rounded-2xl px-3 py-2 text-sm leading-relaxed ${
                        msg.role === 'user'
                          ? 'text-white rounded-br-none'
                          : 'bg-gray-100 rounded-bl-none'
                      }`}
                      style={msg.role === 'user' ? { backgroundColor: BRAND.primary } : undefined}
                    >
                      {msg.role === 'assistant' ? (
                        <ReactMarkdown
                          remarkPlugins={[remarkMath]}
                          rehypePlugins={[rehypeKatex]}
                          components={{
                            p: ({ children }) => <p className="mb-1.5 last:mb-0">{children}</p>,
                            ul: ({ children }) => <ul className="list-disc pl-4 mb-1.5">{children}</ul>,
                            ol: ({ children }) => <ol className="list-decimal pl-4 mb-1.5">{children}</ol>,
                            strong: ({ children }) => (
                              <strong className="font-bold" style={{ color: BRAND.primary }}>
                                {children}
                              </strong>
                            ),
                            hr: () => (
                              <hr className="my-2 border-dashed" style={{ borderColor: `${BRAND.accent}40` }} />
                            ),
                          }}
                        >
                          {msg.content}
                        </ReactMarkdown>
                      ) : (
                        <p>{msg.content}</p>
                      )}
                    </div>
                  </div>
                ))}

                {isStreaming && (
                  <div className="flex items-center gap-2 text-gray-400 text-xs">
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    {t("thinking")}
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Suggestions when there are messages */}
              {messages.length > 0 && !isStreaming && (
                <div className="px-4 pb-2 flex gap-1.5 overflow-x-auto">
                  {suggestions.slice(0, 2).map((q: string) => (
                    <button
                      key={q}
                      onClick={() => sendMessage(q)}
                      className="shrink-0 px-2.5 py-1 rounded-full text-xs border hover:bg-gray-50 transition-colors"
                      style={{ borderColor: `${BRAND.accent}60`, color: BRAND.primary }}
                    >
                      {q}
                    </button>
                  ))}
                </div>
              )}

              {/* Input */}
              <div className="border-t p-3 flex items-end gap-2 shrink-0">
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={e => {
                    if (e.key === 'Enter' && !e.shiftKey && !e.nativeEvent.isComposing) {
                      e.preventDefault();
                      sendMessage(input);
                    }
                  }}
                  placeholder={t("placeholder")}
                  rows={1}
                  className="flex-1 resize-none rounded-xl border px-3 py-2 text-sm focus:outline-none focus:ring-2"
                  style={{ '--tw-ring-color': BRAND.accent } as React.CSSProperties}
                />
                <button
                  onClick={() => sendMessage(input)}
                  disabled={!input.trim() || isStreaming}
                  className="px-3 py-2 rounded-xl text-white transition-all disabled:opacity-30"
                  style={{ backgroundColor: BRAND.primary }}
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
