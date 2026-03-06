/**
 * Serialize current lesson state for AI assistant context
 * Token budget: ~800-1500 tokens
 */

import type { LessonSegment, TeachingStep, Formula } from '@/types';

export interface LessonContextParams {
  weekNum: number;
  weekTitle: string;
  segment: LessonSegment;
  segmentIndex: number;
  totalSegments: number;
  teachingSteps?: TeachingStep[];
  formulas?: Formula[];
}

const SEGMENT_TYPE_LABELS: Record<string, string> = {
  story: 'Story Intro',
  lecture: 'Lecture',
  demo: 'Live Demo',
  activity: 'Activity',
  discussion: 'Discussion',
  break: 'Break',
  wrapup: 'Wrap-up',
};

function serializeSegment(segment: LessonSegment): string {
  const parts: string[] = [];

  if (segment.content) {
    parts.push(segment.content.slice(0, 1200));
  }

  if (segment.keyPoints && segment.keyPoints.length > 0) {
    parts.push('Key points:');
    parts.push(...segment.keyPoints.map(p => `- ${p}`));
  }

  return parts.join('\n');
}

function serializeTeachingSteps(steps: TeachingStep[]): string {
  return steps
    .filter((s): s is Extract<TeachingStep, { type: 'lecture' }> => s.type === 'lecture')
    .map(s => s.text)
    .join('\n')
    .slice(0, 1500);
}

function serializeFormulas(formulas: Formula[]): string {
  return formulas
    .map(f => `${f.name}: ${f.latex}\n  ${f.description}`)
    .join('\n');
}

export function buildLessonContext(params: LessonContextParams): string {
  const {
    weekNum, weekTitle, segment, segmentIndex,
    totalSegments, teachingSteps, formulas,
  } = params;

  const typeName = SEGMENT_TYPE_LABELS[segment.type] ?? segment.type;

  const parts: string[] = [
    `=== Current Lesson Position ===`,
    `Week ${weekNum}: ${weekTitle}`,
    `Segment ${segmentIndex + 1}/${totalSegments}: ${segment.title} (${typeName})`,
    '',
    `=== Segment Content ===`,
    serializeSegment(segment),
  ];

  if (teachingSteps && teachingSteps.length > 0) {
    parts.push('', `=== Teaching Points ===`, serializeTeachingSteps(teachingSteps));
  }

  if (formulas && formulas.length > 0) {
    parts.push('', `=== Week Formulas ===`, serializeFormulas(formulas));
  }

  return parts.join('\n');
}
