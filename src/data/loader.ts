/**
 * Locale-aware data loader for teaching content.
 * Dynamically imports the correct language version of lesson/teaching/exercise/formula data.
 */

import type { WeekLesson, SegmentTeaching, WeekExercises, WeekFormulas } from '@/types';

// English data (default)
import { week01Lesson as en01L } from './en/lessons/week01';
import { week02Lesson as en02L } from './en/lessons/week02';
import { week03Lesson as en03L } from './en/lessons/week03';
import { week04Lesson as en04L } from './en/lessons/week04';
import { week05Lesson as en05L } from './en/lessons/week05';
import { week06Lesson as en06L } from './en/lessons/week06';
import { week07Lesson as en07L } from './en/lessons/week07';
import { week08Lesson as en08L } from './en/lessons/week08';

import { week01Teaching as en01T } from './en/teaching/week01';
import { week02Teaching as en02T } from './en/teaching/week02';
import { week03Teaching as en03T } from './en/teaching/week03';
import { week04Teaching as en04T } from './en/teaching/week04';
import { week05Teaching as en05T } from './en/teaching/week05';
import { week06Teaching as en06T } from './en/teaching/week06';
import { week07Teaching as en07T } from './en/teaching/week07';
import { week08Teaching as en08T } from './en/teaching/week08';

import { week01Exercises as en01E } from './en/exercises/week01';
import { week02Exercises as en02E } from './en/exercises/week02';
import { week03Exercises as en03E } from './en/exercises/week03';
import { week04Exercises as en04E } from './en/exercises/week04';
import { week05Exercises as en05E } from './en/exercises/week05';
import { week06Exercises as en06E } from './en/exercises/week06';
import { week07Exercises as en07E } from './en/exercises/week07';
import { week08Exercises as en08E } from './en/exercises/week08';

import { week01Formulas as en01F } from './en/formulas/week01';
import { week02Formulas as en02F } from './en/formulas/week02';
import { week03Formulas as en03F } from './en/formulas/week03';
import { week04Formulas as en04F } from './en/formulas/week04';
import { week05Formulas as en05F } from './en/formulas/week05';
import { week06Formulas as en06F } from './en/formulas/week06';
import { week07Formulas as en07F } from './en/formulas/week07';
import { week08Formulas as en08F } from './en/formulas/week08';

// Chinese data
import { week01Lesson as zh01L } from './zh/lessons/week01';
import { week02Lesson as zh02L } from './zh/lessons/week02';
import { week03Lesson as zh03L } from './zh/lessons/week03';
import { week04Lesson as zh04L } from './zh/lessons/week04';
import { week05Lesson as zh05L } from './zh/lessons/week05';
import { week06Lesson as zh06L } from './zh/lessons/week06';
import { week07Lesson as zh07L } from './zh/lessons/week07';
import { week08Lesson as zh08L } from './zh/lessons/week08';

import { week01Teaching as zh01T } from './zh/teaching/week01';
import { week02Teaching as zh02T } from './zh/teaching/week02';
import { week03Teaching as zh03T } from './zh/teaching/week03';
import { week04Teaching as zh04T } from './zh/teaching/week04';
import { week05Teaching as zh05T } from './zh/teaching/week05';
import { week06Teaching as zh06T } from './zh/teaching/week06';
import { week07Teaching as zh07T } from './zh/teaching/week07';
import { week08Teaching as zh08T } from './zh/teaching/week08';

import { week01Exercises as zh01E } from './zh/exercises/week01';
import { week02Exercises as zh02E } from './zh/exercises/week02';
import { week03Exercises as zh03E } from './zh/exercises/week03';
import { week04Exercises as zh04E } from './zh/exercises/week04';
import { week05Exercises as zh05E } from './zh/exercises/week05';
import { week06Exercises as zh06E } from './zh/exercises/week06';
import { week07Exercises as zh07E } from './zh/exercises/week07';
import { week08Exercises as zh08E } from './zh/exercises/week08';

import { week01Formulas as zh01F } from './zh/formulas/week01';
import { week02Formulas as zh02F } from './zh/formulas/week02';
import { week03Formulas as zh03F } from './zh/formulas/week03';
import { week04Formulas as zh04F } from './zh/formulas/week04';
import { week05Formulas as zh05F } from './zh/formulas/week05';
import { week06Formulas as zh06F } from './zh/formulas/week06';
import { week07Formulas as zh07F } from './zh/formulas/week07';
import { week08Formulas as zh08F } from './zh/formulas/week08';

const DATA = {
  en: {
    lessons: { 1: en01L, 2: en02L, 3: en03L, 4: en04L, 5: en05L, 6: en06L, 7: en07L, 8: en08L } as Record<number, WeekLesson>,
    teaching: { 1: en01T, 2: en02T, 3: en03T, 4: en04T, 5: en05T, 6: en06T, 7: en07T, 8: en08T } as Record<number, SegmentTeaching[]>,
    exercises: { 1: en01E, 2: en02E, 3: en03E, 4: en04E, 5: en05E, 6: en06E, 7: en07E, 8: en08E } as Record<number, WeekExercises>,
    formulas: { 1: en01F, 2: en02F, 3: en03F, 4: en04F, 5: en05F, 6: en06F, 7: en07F, 8: en08F } as Record<number, WeekFormulas>,
  },
  zh: {
    lessons: { 1: zh01L, 2: zh02L, 3: zh03L, 4: zh04L, 5: zh05L, 6: zh06L, 7: zh07L, 8: zh08L } as Record<number, WeekLesson>,
    teaching: { 1: zh01T, 2: zh02T, 3: zh03T, 4: zh04T, 5: zh05T, 6: zh06T, 7: zh07T, 8: zh08T } as Record<number, SegmentTeaching[]>,
    exercises: { 1: zh01E, 2: zh02E, 3: zh03E, 4: zh04E, 5: zh05E, 6: zh06E, 7: zh07E, 8: zh08E } as Record<number, WeekExercises>,
    formulas: { 1: zh01F, 2: zh02F, 3: zh03F, 4: zh04F, 5: zh05F, 6: zh06F, 7: zh07F, 8: zh08F } as Record<number, WeekFormulas>,
  },
};

type Locale = 'en' | 'zh';

export function getLessonData(locale: Locale, weekNum: number): WeekLesson | undefined {
  return DATA[locale]?.lessons[weekNum] ?? DATA.en.lessons[weekNum];
}

export function getTeachingData(locale: Locale, weekNum: number): SegmentTeaching[] | undefined {
  return DATA[locale]?.teaching[weekNum] ?? DATA.en.teaching[weekNum];
}

export function getExerciseData(locale: Locale, weekNum: number): WeekExercises | undefined {
  return DATA[locale]?.exercises[weekNum] ?? DATA.en.exercises[weekNum];
}

export function getFormulaData(locale: Locale, weekNum: number): WeekFormulas | undefined {
  return DATA[locale]?.formulas[weekNum] ?? DATA.en.formulas[weekNum];
}

export function getAllData(locale: Locale, weekNum: number) {
  return {
    lesson: getLessonData(locale, weekNum),
    teaching: getTeachingData(locale, weekNum),
    exercises: getExerciseData(locale, weekNum),
    formulas: getFormulaData(locale, weekNum),
  };
}
