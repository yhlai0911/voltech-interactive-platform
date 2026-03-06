'use client';

import { useEffect, useState } from 'react';
import type { WeekLesson, LessonSegment } from '@/types';

const TYPE_COLORS: Record<LessonSegment['type'], string> = {
  story: '#2D7D5E',
  lecture: '#1B3A5C',
  demo: '#D4A843',
  activity: '#8E44AD',
  discussion: '#E67E22',
  break: '#95A5A6',
  wrapup: '#2C3E50',
};

const TYPE_ICONS: Record<LessonSegment['type'], string> = {
  story: '📖',
  lecture: '🎓',
  demo: '💻',
  activity: '🎯',
  discussion: '💬',
  break: '☕',
  wrapup: '🏁',
};

export function LessonView({ weekNumber }: { weekNumber: number }) {
  const [lesson, setLesson] = useState<WeekLesson | null>(null);
  const [expandedSegment, setExpandedSegment] = useState<string | null>(null);

  useEffect(() => {
    const weekId = String(weekNumber).padStart(2, '0');
    import(`@/data/lessons/week${weekId}`)
      .then((mod) => {
        const key = `week${weekId}Lesson`;
        setLesson(mod[key] || mod.default);
      })
      .catch(() => setLesson(null));
  }, [weekNumber]);

  if (!lesson) {
    return <div className="text-center py-12 text-gray-500">Loading lesson data...</div>;
  }

  return (
    <div>
      {/* Objectives */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <h3 className="font-bold text-[#1B3A5C] mb-2">Learning Objectives</h3>
        <ul className="space-y-1">
          {lesson.learningObjectives.map((obj, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
              <span className="text-[#D4A843] font-bold mt-0.5">{i + 1}.</span>
              {obj}
            </li>
          ))}
        </ul>
      </div>

      {/* Prerequisites */}
      {lesson.prerequisites.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-6">
          <span className="text-xs font-medium text-gray-500">Prerequisites:</span>
          {lesson.prerequisites.map((p) => (
            <span key={p} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">
              {p}
            </span>
          ))}
        </div>
      )}

      {/* Timeline */}
      <div className="space-y-3">
        {lesson.segments.map((segment, index) => {
          const isExpanded = expandedSegment === segment.id;
          const color = TYPE_COLORS[segment.type];
          const icon = TYPE_ICONS[segment.type];

          return (
            <div
              key={segment.id}
              className="border rounded-lg overflow-hidden transition-shadow hover:shadow-md"
              style={{ borderLeftWidth: '4px', borderLeftColor: color }}
            >
              <button
                onClick={() => setExpandedSegment(isExpanded ? null : segment.id)}
                className="w-full flex items-center justify-between p-4 text-left"
              >
                <div className="flex items-center gap-3">
                  <span className="text-lg">{icon}</span>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono text-gray-400">
                        {index + 1}/{lesson.segments.length}
                      </span>
                      <span className="font-medium text-[#1B3A5C]">
                        {segment.title}
                      </span>
                    </div>
                    <span className="text-xs text-gray-500">
                      {segment.duration} min · {segment.type}
                    </span>
                  </div>
                </div>
                <span className="text-gray-400">{isExpanded ? '▲' : '▼'}</span>
              </button>

              {isExpanded && (
                <div className="px-4 pb-4 border-t border-gray-100">
                  <p className="text-sm text-gray-700 mt-3 whitespace-pre-line">
                    {segment.content}
                  </p>
                  {segment.keyPoints && segment.keyPoints.length > 0 && (
                    <div className="mt-3">
                      <p className="text-xs font-bold text-gray-500 mb-1">Key Points:</p>
                      <ul className="list-disc list-inside text-sm text-gray-600 space-y-0.5">
                        {segment.keyPoints.map((kp, i) => (
                          <li key={i}>{kp}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {segment.teacherNotes && (
                    <div className="mt-3 bg-yellow-50 border border-yellow-200 rounded p-3">
                      <p className="text-xs font-bold text-yellow-700 mb-1">Teacher Notes:</p>
                      <p className="text-sm text-yellow-800">{segment.teacherNotes}</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
