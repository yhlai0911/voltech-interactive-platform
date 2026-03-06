"use client";

import { useState, useCallback, useEffect } from "react";
import { useParams } from "next/navigation";
import { useTranslations, useLocale } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  ArrowLeft,
  RotateCcw,
  ClipboardCheck,
} from "lucide-react";
import { Link } from "@/i18n/navigation";
import ModeSwitch from "@/components/lesson/ModeSwitch";
import type { Mode } from "@/components/lesson/ModeSwitch";
import LessonProgress from "@/components/lesson/LessonProgress";
import StoryNarrator from "@/components/lesson/StoryNarrator";
import TheoryExplainer from "@/components/lesson/TheoryExplainer";
import InteractiveQuiz from "@/components/lesson/InteractiveQuiz";
import ClassroomTeacher from "@/components/lesson/ClassroomTeacher";
import SelfQuiz from "@/components/lesson/SelfQuiz";
import ExtraPractice from "@/components/lesson/ExtraPractice";
import LessonChatFAB from "@/components/lesson/LessonChatFAB";
import { BRAND } from "@/components/brand/BrandColors";
import {
  saveProgress,
  getProgress,
  resetProgress,
  type LearningProgress,
} from "@/lib/progress";

import { getLessonData, getTeachingData, getExerciseData, getFormulaData } from "@/data/loader";
import type { LessonSegment, WeekExercises } from "@/types";

// ─── Segment renderers for Self mode ───────────────────────────

function StorySegmentView({
  segment,
  onComplete,
}: {
  segment: LessonSegment;
  onComplete?: () => void;
}) {
  return (
    <StoryNarrator
      segment={{ narration: segment.content, dialogues: [] }}
      onComplete={onComplete}
    />
  );
}

function LectureSegmentView({ segment }: { segment: LessonSegment }) {
  const points = (segment.keyPoints ?? []).map((kp, i) => ({
    title: `Point ${i + 1}`,
    desc: kp,
  }));
  return (
    <TheoryExplainer
      segment={{
        title: segment.title,
        points:
          points.length > 0
            ? points
            : [{ title: segment.title, desc: segment.content }],
      }}
    />
  );
}

function DemoSegmentView({ segment }: { segment: LessonSegment }) {
  const points = (segment.keyPoints ?? []).map((kp, i) => ({
    title: `Step ${i + 1}`,
    desc: kp,
  }));
  return (
    <TheoryExplainer
      segment={{
        title: segment.title,
        points:
          points.length > 0
            ? points
            : [{ title: "Demo", desc: segment.content }],
      }}
    />
  );
}

function DiscussionSegmentView({ segment }: { segment: LessonSegment }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl mx-auto"
    >
      <div
        className="rounded-xl p-6 border-2"
        style={{ borderColor: "#0891B2", backgroundColor: "#0891B208" }}
      >
        <h3 className="text-xl font-bold mb-4" style={{ color: "#0891B2" }}>
          {segment.title}
        </h3>
        <p className="text-gray-700 mb-4">{segment.content}</p>
        {segment.keyPoints && (
          <ul className="space-y-1 text-sm text-gray-600">
            {segment.keyPoints.map((p, i) => (
              <li key={i}>&#8226; {p}</li>
            ))}
          </ul>
        )}
      </div>
    </motion.div>
  );
}

function BreakSegmentView({ segment, t }: { segment: LessonSegment; t: (key: string) => string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl mx-auto text-center py-12"
    >
      <div
        className="rounded-xl p-8 border-2 border-dashed"
        style={{ borderColor: "#6B7280", backgroundColor: "#6B728008" }}
      >
        <div className="text-4xl mb-4">&#9749;</div>
        <h3 className="text-xl font-bold mb-2 text-gray-600">
          {segment.title}
        </h3>
        <p className="text-gray-500">{segment.content}</p>
        <p className="text-sm text-gray-400 mt-4">
          {segment.duration} {t("weekPage.minutes")}
        </p>
      </div>
    </motion.div>
  );
}

function WrapupSegmentView({ segment }: { segment: LessonSegment }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl mx-auto"
    >
      <div
        className="rounded-xl p-6 border-2"
        style={{
          borderColor: BRAND.accent,
          backgroundColor: `${BRAND.accent}08`,
        }}
      >
        <h3
          className="text-xl font-bold mb-4"
          style={{ color: BRAND.accent }}
        >
          {segment.title}
        </h3>
        <p className="text-gray-700 mb-4">{segment.content}</p>
        {segment.keyPoints && (
          <ul className="space-y-2">
            {segment.keyPoints.map((p, i) => (
              <li
                key={i}
                className="flex items-start gap-2 text-sm text-gray-600"
              >
                <span style={{ color: BRAND.accent }}>&#10038;</span>
                {p}
              </li>
            ))}
          </ul>
        )}
      </div>
    </motion.div>
  );
}

function ActivitySegmentView({
  segment,
  exercises,
  onComplete,
}: {
  segment: LessonSegment;
  exercises: WeekExercises | undefined;
  onComplete?: () => void;
}) {
  const questions = exercises?.questions;
  if (questions && questions.length > 0) {
    return (
      <>
        <InteractiveQuiz question={questions[0]} onComplete={onComplete} />
        {questions.length > 1 && (
          <ExtraPractice exercises={questions.slice(1)} />
        )}
      </>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl mx-auto"
    >
      <div
        className="rounded-xl p-6 border-2"
        style={{
          borderColor: BRAND.accent,
          backgroundColor: `${BRAND.accent}08`,
        }}
      >
        <h3
          className="text-xl font-bold mb-4"
          style={{ color: BRAND.accent }}
        >
          {segment.title}
        </h3>
        <p className="text-gray-700 mb-4">{segment.content}</p>
        {segment.keyPoints && (
          <ul className="space-y-1 text-sm text-gray-600">
            {segment.keyPoints.map((p, i) => (
              <li key={i}>&#8226; {p}</li>
            ))}
          </ul>
        )}
      </div>
    </motion.div>
  );
}

// ─── Main Page Component ───────────────────────────────────────

export default function WeekPage() {
  const params = useParams();
  const weekId = params.weekId as string;
  const weekNum = parseInt(weekId, 10);
  const t = useTranslations();
  const locale = useLocale() as 'en' | 'zh';

  const lesson = getLessonData(locale, weekNum);
  const teaching = getTeachingData(locale, weekNum);
  const exercises = getExerciseData(locale, weekNum);
  const formulas = getFormulaData(locale, weekNum);
  void formulas; // used indirectly

  const [currentSegment, setCurrentSegment] = useState(0);
  const [maxReached, setMaxReached] = useState(0);
  const [mode, setMode] = useState<Mode>("self");

  const quizCount = exercises?.questions?.length ?? 0;

  // Restore progress on mount
  useEffect(() => {
    const saved = getProgress(weekNum);
    if (saved) {
      if (lesson && saved.currentSegment >= lesson.segments.length) {
        resetProgress(weekNum);
        return;
      }
      setCurrentSegment(saved.currentSegment);
      const maxSeg = saved.maxReachedSegment ?? saved.currentSegment;
      setMaxReached(
        lesson ? Math.min(maxSeg, lesson.segments.length - 1) : maxSeg
      );
      if (saved.mode && saved.mode !== "quiz") setMode(saved.mode);
    }
  }, [weekNum, lesson]);

  const persistProgress = useCallback(
    (seg: number, m: Mode) => {
      if (!lesson) return;
      const data: LearningProgress = {
        week: weekNum,
        currentSegment: seg,
        maxReachedSegment: Math.max(maxReached, seg),
        completed: seg >= lesson.segments.length - 1,
        mode: m,
        classStepIndex: 0,
        lastAccessed: new Date().toISOString(),
      };
      saveProgress(weekNum, data);
    },
    [weekNum, lesson, maxReached]
  );

  const handleNext = useCallback(() => {
    if (lesson && currentSegment < lesson.segments.length - 1) {
      const next = currentSegment + 1;
      setCurrentSegment(next);
      setMaxReached((prev) => Math.max(prev, next));
      persistProgress(next, mode);
    }
  }, [currentSegment, lesson, mode, persistProgress]);

  const handlePrev = useCallback(() => {
    if (currentSegment > 0) {
      const prev = currentSegment - 1;
      setCurrentSegment(prev);
      persistProgress(prev, mode);
    }
  }, [currentSegment, mode, persistProgress]);

  const handleModeChange = useCallback(
    (newMode: Mode) => {
      setMode(newMode);
      if (newMode !== "quiz") {
        persistProgress(currentSegment, newMode);
      }
    },
    [currentSegment, persistProgress]
  );

  const handleNavigate = useCallback(
    (index: number) => {
      if (index <= maxReached && lesson) {
        setCurrentSegment(index);
        persistProgress(index, mode);
      }
    },
    [maxReached, lesson, mode, persistProgress]
  );

  const handleRestart = useCallback(() => {
    resetProgress(weekNum);
    setCurrentSegment(0);
    setMaxReached(0);
    setMode("self");
  }, [weekNum]);

  const handleBackFromQuiz = useCallback(() => {
    setMode("self");
  }, []);

  // Not found state
  if (!lesson) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">
            {t("weekPage.notAvailable")}
          </h1>
          <p className="text-gray-500 mb-6">
            {t("weekPage.beingPrepared", { week: weekNum })}
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-2 rounded-lg text-white"
            style={{ backgroundColor: BRAND.primary }}
          >
            <ArrowLeft className="w-4 h-4" /> {t("weekPage.backToHome")}
          </Link>
        </div>
      </div>
    );
  }

  const segment = lesson.segments[currentSegment];
  const segmentTitles = lesson.segments.map((s) => s.title);
  const segmentTypes = lesson.segments.map((s) => s.type);
  const isLastSegment = currentSegment === lesson.segments.length - 1;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top bar */}
      <div className="bg-white border-b sticky top-16 z-40">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <span
                className="text-xs font-bold px-2 py-0.5 rounded-full text-white"
                style={{ backgroundColor: BRAND.primary }}
              >
                {t("common.week")} {weekNum}
              </span>
              <h1 className="text-lg font-bold mt-1">{lesson.title}</h1>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <ModeSwitch
              mode={mode}
              onChange={handleModeChange}
              quizCount={quizCount > 0 ? quizCount : undefined}
            />
            <button
              onClick={handleRestart}
              title={t("weekPage.restart")}
              className="p-2 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>
        {/* Progress bar: hidden in quiz mode */}
        {mode !== "quiz" && (
          <LessonProgress
            current={currentSegment}
            total={lesson.segments.length}
            titles={segmentTitles}
            types={segmentTypes}
            maxReached={maxReached}
            onNavigate={handleNavigate}
          />
        )}
      </div>

      {/* Content area */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Class mode indicator */}
        {mode === "class" && (
          <div
            className="mb-6 text-center text-sm py-2 rounded-lg"
            style={{
              backgroundColor: `${BRAND.primary}08`,
              color: BRAND.primary,
            }}
          >
            {t("weekPage.classroomMode")}
          </div>
        )}

        <AnimatePresence mode="wait">
          <motion.div
            key={`${mode}-${currentSegment}`}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
          >
            {mode === "quiz" ? (
              quizCount > 0 ? (
                <SelfQuiz
                  weekNum={weekNum}
                  questions={exercises?.questions ?? []}
                  onBackToLesson={handleBackFromQuiz}
                />
              ) : (
                <div className="max-w-2xl mx-auto text-center py-12 text-gray-400">
                  <ClipboardCheck className="w-12 h-12 mx-auto mb-4 opacity-30" />
                  <p className="text-lg mb-2">{t("weekPage.noQuiz")}</p>
                  <p className="text-sm">{t("weekPage.quizPreparing")}</p>
                </div>
              )
            ) : mode === "class" ? (
              teaching?.[currentSegment] ? (
                <ClassroomTeacher
                  weekNum={weekNum}
                  segmentIndex={currentSegment}
                  segmentTitle={segment.title}
                  teaching={teaching[currentSegment]}
                  onComplete={isLastSegment ? undefined : handleNext}
                />
              ) : (
                <div className="max-w-2xl mx-auto text-center py-12 text-gray-400">
                  <p className="text-lg mb-2">
                    {t("weekPage.noTeachingScript")}
                  </p>
                  <p className="text-sm">{t("weekPage.teachingPreparing")}</p>
                </div>
              )
            ) : (
              <>
                {segment.type === "story" && (
                  <StorySegmentView
                    segment={segment}
                    onComplete={handleNext}
                  />
                )}
                {segment.type === "lecture" && (
                  <LectureSegmentView segment={segment} />
                )}
                {segment.type === "demo" && (
                  <DemoSegmentView segment={segment} />
                )}
                {segment.type === "activity" && (
                  <ActivitySegmentView
                    segment={segment}
                    exercises={exercises}
                    onComplete={handleNext}
                  />
                )}
                {segment.type === "discussion" && (
                  <DiscussionSegmentView segment={segment} />
                )}
                {segment.type === "break" && (
                  <BreakSegmentView segment={segment} t={t} />
                )}
                {segment.type === "wrapup" && (
                  <WrapupSegmentView segment={segment} />
                )}

                {/* End-of-lesson quiz CTA */}
                {isLastSegment && quizCount > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="mt-12 max-w-md mx-auto"
                  >
                    <div
                      className="rounded-2xl p-6 text-center border-2"
                      style={{
                        borderColor: BRAND.accent,
                        backgroundColor: `${BRAND.accent}08`,
                      }}
                    >
                      <ClipboardCheck
                        className="w-10 h-10 mx-auto mb-3"
                        style={{ color: BRAND.accent }}
                      />
                      <h3 className="text-lg font-bold mb-1">
                        {t("weekPage.readyForQuiz")}
                      </h3>
                      <p className="text-sm text-gray-500 mb-4">
                        {t("weekPage.quizDesc", { count: quizCount })}
                      </p>
                      <button
                        onClick={() => setMode("quiz")}
                        className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg text-white font-bold hover:opacity-90 transition-colors"
                        style={{ backgroundColor: BRAND.accent }}
                      >
                        <ClipboardCheck className="w-4 h-4" />
                        {t("weekPage.startQuiz")}
                      </button>
                    </div>
                  </motion.div>
                )}
              </>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Self mode navigation buttons */}
        {mode === "self" && (
          <div className="flex items-center justify-between mt-12 max-w-2xl mx-auto">
            <button
              onClick={handlePrev}
              disabled={currentSegment === 0}
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg border font-medium transition-all disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-50"
            >
              <ChevronLeft className="w-4 h-4" /> {t("common.previous")}
            </button>

            <button
              onClick={handleNext}
              disabled={currentSegment === lesson.segments.length - 1}
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-white font-medium transition-all disabled:opacity-30 disabled:cursor-not-allowed hover:opacity-90"
              style={{ backgroundColor: BRAND.primary }}
            >
              {t("common.next")} <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Class mode back button */}
        {mode === "class" && currentSegment > 0 && (
          <div className="mt-6 max-w-2xl mx-auto">
            <button
              onClick={handlePrev}
              className="flex items-center gap-2 px-4 py-2 rounded-lg border text-sm text-gray-500 hover:bg-gray-50 transition-all"
            >
              <ChevronLeft className="w-4 h-4" /> {t("weekPage.previousSection")}
            </button>
          </div>
        )}
      </div>

      {/* Floating AI assistant (hidden in quiz mode) */}
      {mode !== "quiz" && (
        <LessonChatFAB
          weekNum={weekNum}
          weekTitle={lesson.title}
          segmentTitle={segmentTitles[currentSegment]}
          segmentType={segment.type}
        />
      )}
    </div>
  );
}
