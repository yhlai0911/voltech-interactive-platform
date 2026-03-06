'use client';

import { useState } from 'react';
import type { WeekInfo } from '@/types';
import { LessonView } from './LessonView';
import { FormulaView } from './FormulaView';
import { QuizView } from './QuizView';

type Tab = 'lesson' | 'formulas' | 'quiz';

const TABS: { id: Tab; label: string; icon: string }[] = [
  { id: 'lesson', label: 'Lesson', icon: '📖' },
  { id: 'formulas', label: 'Formulas', icon: '📐' },
  { id: 'quiz', label: 'Self-Quiz', icon: '✅' },
];

interface Props {
  weekNumber: number;
  weekInfo: WeekInfo;
}

export function WeekContent({ weekNumber, weekInfo }: Props) {
  const [activeTab, setActiveTab] = useState<Tab>('lesson');

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <span
            className="text-sm font-bold px-3 py-1 rounded-full text-white"
            style={{ backgroundColor: weekInfo.color }}
          >
            WEEK {weekNumber}
          </span>
        </div>
        <h1 className="text-3xl font-bold text-[#1B3A5C] mb-1">
          {weekInfo.title}
        </h1>
        <p className="text-lg text-gray-500">{weekInfo.subtitle}</p>
        <div className="flex flex-wrap gap-2 mt-3">
          {weekInfo.keyConcepts.map((concept) => (
            <span
              key={concept}
              className="text-xs font-medium px-2 py-1 rounded-full border"
              style={{
                borderColor: weekInfo.color,
                color: weekInfo.color,
              }}
            >
              {concept}
            </span>
          ))}
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex border-b border-gray-200 mb-6">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
              activeTab === tab.id
                ? 'border-[#1B3A5C] text-[#1B3A5C]'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <span>{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      {activeTab === 'lesson' && <LessonView weekNumber={weekNumber} />}
      {activeTab === 'formulas' && <FormulaView weekNumber={weekNumber} />}
      {activeTab === 'quiz' && <QuizView weekNumber={weekNumber} />}
    </div>
  );
}
