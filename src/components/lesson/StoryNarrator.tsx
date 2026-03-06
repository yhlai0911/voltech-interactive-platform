'use client';

import { useState, useRef, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Play, Pause, Volume2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import CharacterAvatar from '@/components/brand/CharacterAvatar';
import { CHARACTERS, type CharacterId } from '@/components/brand/BrandColors';

interface DialogueLine {
  character: CharacterId;
  text: string;
}

interface StoryContent {
  narration: string;
  dialogues: DialogueLine[];
}

interface StoryNarratorProps {
  segment: StoryContent;
  onComplete?: () => void;
}

type PlayState = 'idle' | 'playing' | 'paused';

export default function StoryNarrator({ segment, onComplete }: StoryNarratorProps) {
  const t = useTranslations('storyNarrator');
  const [playState, setPlayState] = useState<PlayState>('idle');
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handlePlayVoice = useCallback(async (text: string, character: CharacterId) => {
    try {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }

      setPlayState('playing');

      const res = await fetch('/api/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, character }),
      });

      if (!res.ok) {
        setPlayState('idle');
        return;
      }

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const audio = new Audio(url);
      audioRef.current = audio;

      audio.onended = () => {
        setPlayState('idle');
        URL.revokeObjectURL(url);
        audioRef.current = null;
      };

      audio.onerror = () => {
        setPlayState('idle');
        URL.revokeObjectURL(url);
        audioRef.current = null;
      };

      await audio.play();
    } catch {
      setPlayState('idle');
    }
  }, []);

  const togglePause = useCallback(() => {
    if (!audioRef.current) return;
    if (playState === 'playing') {
      audioRef.current.pause();
      setPlayState('paused');
    } else if (playState === 'paused') {
      audioRef.current.play();
      setPlayState('playing');
    }
  }, [playState]);

  return (
    <div className="space-y-6">
      {/* Narration text */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="prose prose-lg max-w-none text-gray-700 leading-relaxed italic"
        style={{ fontFamily: 'serif' }}
      >
        {segment.narration}
      </motion.div>

      {/* Dialogue bubbles */}
      <div className="space-y-4">
        {segment.dialogues.map((line, i) => {
          const char = CHARACTERS[line.character];
          const charColor = char?.color ?? '#7F8C8D';
          const charName = char?.name ?? '???';

          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.3 + i * 0.15 }}
              className="flex items-start gap-3"
            >
              <CharacterAvatar characterId={line.character} size="md" />

              <div className="flex-1 min-w-0">
                <span className="text-xs font-semibold" style={{ color: charColor }}>
                  {charName}
                </span>
                <div
                  className="mt-1 rounded-lg px-4 py-2.5 text-sm text-gray-800"
                  style={{ backgroundColor: `${charColor}14`, borderLeft: `3px solid ${charColor}` }}
                >
                  {line.text}
                </div>
              </div>

              <button
                onClick={() => handlePlayVoice(line.text, line.character)}
                className="shrink-0 mt-5 p-1.5 rounded-full hover:bg-gray-100 transition-colors"
                title={t("playVoice")}
              >
                <Volume2 className="w-4 h-4 text-gray-400" />
              </button>
            </motion.div>
          );
        })}
      </div>

      {/* Global play/pause control */}
      {playState !== 'idle' && (
        <motion.button
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          onClick={togglePause}
          className={cn(
            'flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium text-white transition-colors',
            playState === 'playing' ? 'bg-[#1B3A5C]' : 'bg-[#D4A843]',
          )}
        >
          {playState === 'playing' ? (
            <>
              <Pause className="w-4 h-4" /> {t("pause")}
            </>
          ) : (
            <>
              <Play className="w-4 h-4" /> {t("resume")}
            </>
          )}
        </motion.button>
      )}

      {/* Complete button */}
      {onComplete && (
        <div className="pt-2">
          <button
            onClick={onComplete}
            className="text-sm text-[#1B3A5C] hover:underline"
          >
            {t("continue")} &rarr;
          </button>
        </div>
      )}
    </div>
  );
}
