'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { BookOpen, Users, ClipboardCheck } from 'lucide-react';
import { cn } from '@/lib/utils';
import { BRAND } from '@/components/brand/BrandColors';

export type Mode = 'self' | 'class' | 'quiz';

interface ModeSwitchProps {
  mode: Mode;
  onChange: (mode: Mode) => void;
  quizCount?: number;
}

const MODE_ICONS = {
  self: BookOpen,
  class: Users,
  quiz: ClipboardCheck,
} as const;

export default function ModeSwitch({ mode, onChange, quizCount }: ModeSwitchProps) {
  const t = useTranslations('modes');

  const modes: { key: Mode; labelKey: string }[] = [
    { key: 'self', labelKey: 'self' },
    { key: 'class', labelKey: 'class' },
    { key: 'quiz', labelKey: 'quiz' },
  ];

  return (
    <div className="inline-flex items-center gap-1 rounded-full bg-gray-100 p-1">
      {modes.map(({ key, labelKey }) => {
        const Icon = MODE_ICONS[key];
        const isActive = mode === key;
        return (
          <button
            key={key}
            onClick={() => onChange(key)}
            className={cn(
              'relative flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium transition-colors',
              isActive ? 'text-white' : 'text-gray-500 hover:text-gray-700',
            )}
          >
            {isActive && (
              <motion.span
                layoutId="mode-bg"
                className="absolute inset-0 rounded-full"
                style={{ backgroundColor: BRAND.primary }}
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              />
            )}
            <Icon className="relative z-10 w-4 h-4" />
            <span className="relative z-10">{t(labelKey)}</span>
            {key === 'quiz' && quizCount && !isActive && (
              <span className="relative z-10 ml-0.5 text-[10px] bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded-full font-bold">
                {quizCount}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
