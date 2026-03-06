'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Volume2, Loader2, ChevronRight } from 'lucide-react';
import CharacterAvatar from '@/components/brand/CharacterAvatar';
import { BRAND } from '@/components/brand/BrandColors';
import type { LessonSegment } from '@/types';

interface TeachingNarratorProps {
  segment: LessonSegment;
  weekNum: number;
  weekTitle: string;
  segmentIndex: number;
  totalSegments: number;
  onComplete?: () => void;
}

type TeachState = 'loading' | 'streaming' | 'done' | 'error';

export default function TeachingNarrator({
  segment,
  weekNum,
  weekTitle,
  segmentIndex,
  totalSegments,
  onComplete,
}: TeachingNarratorProps) {
  const t = useTranslations('teachingNarrator');
  const [teachState, setTeachState] = useState<TeachState>('loading');
  const [text, setText] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [error, setError] = useState('');
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  // Fetch teaching content when segment changes
  useEffect(() => {
    setText('');
    setTeachState('loading');
    setError('');

    if (abortRef.current) {
      abortRef.current.abort();
    }

    const abortController = new AbortController();
    abortRef.current = abortController;

    const fetchTeaching = async () => {
      try {
        const res = await fetch('/api/teach', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            segment,
            weekNum,
            weekTitle,
            segmentIndex,
            totalSegments,
          }),
          signal: abortController.signal,
        });

        if (!res.ok) {
          const body = await res.json().catch(() => ({ error: 'Unknown error' }));
          throw new Error(body.error || `HTTP ${res.status}`);
        }

        const reader = res.body?.getReader();
        if (!reader) throw new Error('No response body');

        const decoder = new TextDecoder();
        setTeachState('streaming');

        let buffer = '';
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split('\n');
          buffer = lines.pop() || '';

          for (const line of lines) {
            if (!line.startsWith('data: ')) continue;
            const data = line.slice(6);

            if (data === '[DONE]') {
              setTeachState('done');
              continue;
            }

            try {
              const parsed = JSON.parse(data);
              if (parsed.content) {
                setText((prev) => prev + parsed.content);
              }
              if (parsed.error) {
                setError(parsed.error);
                setTeachState('error');
              }
            } catch {
              // skip malformed JSON
            }
          }
        }

        setTeachState((prev) => (prev === 'streaming' ? 'done' : prev));
      } catch (err) {
        if ((err as Error).name === 'AbortError') return;
        setError((err as Error).message);
        setTeachState('error');
      }
    };

    fetchTeaching();

    return () => {
      abortController.abort();
    };
  }, [segment, weekNum, weekTitle, segmentIndex, totalSegments]);

  // Auto-scroll as text streams in
  useEffect(() => {
    if (textContainerRef.current && teachState === 'streaming') {
      textContainerRef.current.scrollTop = textContainerRef.current.scrollHeight;
    }
  }, [text, teachState]);

  // Play TTS for the generated teaching text
  const handlePlayVoice = useCallback(async () => {
    if (isPlaying && audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
      setIsPlaying(false);
      return;
    }

    if (!text) return;

    try {
      setIsPlaying(true);
      const res = await fetch('/api/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, character: 'drLin' }),
      });

      if (!res.ok) {
        setIsPlaying(false);
        return;
      }

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const audio = new Audio(url);
      audioRef.current = audio;

      audio.onended = () => {
        setIsPlaying(false);
        URL.revokeObjectURL(url);
        audioRef.current = null;
      };

      audio.onerror = () => {
        setIsPlaying(false);
        URL.revokeObjectURL(url);
        audioRef.current = null;
      };

      await audio.play();
    } catch {
      setIsPlaying(false);
    }
  }, [text, isPlaying]);

  // Cleanup audio on unmount
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const segmentTypeLabel = {
    story: t('story'),
    lecture: t('lecture'),
    demo: t('demo'),
    activity: t('activity'),
    discussion: t('discussion'),
    break: t('break'),
    wrapup: t('wrapup'),
  }[segment.type] || t('teaching');

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl mx-auto"
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-5">
        <CharacterAvatar characterId="drLin" size="lg" />
        <div>
          <div className="flex items-center gap-2">
            <span className="font-bold text-gray-900">Dr. Lin</span>
            <span
              className="text-xs px-2 py-0.5 rounded-full text-white"
              style={{ backgroundColor: BRAND.primary }}
            >
              {segmentTypeLabel}
            </span>
          </div>
          <p className="text-sm text-gray-500 mt-0.5">{segment.title}</p>
        </div>

        {teachState === 'loading' && (
          <div className="ml-auto flex items-center gap-1.5 text-sm text-gray-400">
            <Loader2 className="w-4 h-4 animate-spin" />
            {t("preparing")}
          </div>
        )}
        {teachState === 'streaming' && (
          <div className="ml-auto flex items-center gap-1.5 text-sm" style={{ color: '#2D7D5E' }}>
            <span className="inline-block w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: '#2D7D5E' }} />
            {t("teaching")}
          </div>
        )}
      </div>

      {/* Teaching content */}
      <div
        ref={textContainerRef}
        className="rounded-xl border bg-white p-6 shadow-sm max-h-[60vh] overflow-y-auto"
        style={{ borderColor: `${BRAND.primary}30` }}
      >
        {teachState === 'loading' && !text && (
          <div className="flex items-center justify-center py-8 text-gray-400">
            <Loader2 className="w-6 h-6 animate-spin mr-2" />
            {t("preparingLecture")}
          </div>
        )}

        {text && (
          <div className="text-gray-800 leading-relaxed whitespace-pre-wrap text-[15px]">
            {text}
            {teachState === 'streaming' && (
              <span className="inline-block w-1.5 h-5 ml-0.5 align-text-bottom animate-pulse" style={{ backgroundColor: BRAND.primary }} />
            )}
          </div>
        )}

        {teachState === 'error' && (
          <div className="text-red-500 text-sm py-4">
            {t("generationFailed", { error: error || "Unknown error" })}
            <br />
            <span className="text-gray-400">{t("configureKey")}</span>
          </div>
        )}
      </div>

      {/* Action buttons */}
      {teachState === 'done' && text && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-3 mt-4"
        >
          <button
            onClick={handlePlayVoice}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-white transition-all hover:opacity-90"
            style={{ backgroundColor: isPlaying ? '#C0392B' : '#2D7D5E' }}
          >
            <Volume2 className="w-4 h-4" />
            {isPlaying ? t('stop') : t('playVoice')}
          </button>

          {onComplete && (
            <button
              onClick={onComplete}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-white transition-all hover:opacity-90"
              style={{ backgroundColor: BRAND.primary }}
            >
              Next <ChevronRight className="w-4 h-4" />
            </button>
          )}
        </motion.div>
      )}
    </motion.div>
  );
}
