"use client";

import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Volume2,
  VolumeX,
  Pause,
  Play,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import { useTranslations, useLocale } from "next-intl";
import CharacterAvatar from "@/components/brand/CharacterAvatar";
import { BRAND, CHARACTER_NAMES, CHARACTER_ROLES, CHARACTER_COLORS } from "@/components/brand/BrandColors";
import { VISUAL_COMPONENTS } from "@/components/visuals";
import type { SegmentTeaching, TeachingStep, CharacterId } from "@/types";

// ─── Character helpers ──────────────────────────────
/** Get the speaking character for a step */
function getStepCharacter(step: TeachingStep): CharacterId {
  if (step.type === "lecture") return step.character;
  return "drLin";
}

/** Badge label / color based on step type and character */
function getCharacterBadge(step: TeachingStep, t: (key: string) => string): { label: string; color: string } {
  switch (step.type) {
    case "check":
      return { label: t("quickCheck"), color: BRAND.accent };
    case "discuss_timer":
      return { label: t("discussion"), color: BRAND.story };
    case "visual":
      return { label: t("visual"), color: BRAND.story };
    case "lecture": {
      const ch = step.character;
      if (ch === "drLin") return { label: t("lecturing"), color: BRAND.primary };
      if (ch === "narrator") return { label: t("narrator"), color: BRAND.neutral };
      return { label: t("speaking"), color: CHARACTER_COLORS[ch] || BRAND.primary };
    }
  }
}

/** Status bar text (bottom, character-aware) */
function getPhaseStatusText(
  phase: StepPhase,
  step: TeachingStep,
  extra: {
    isPlayingAudio: boolean;
    questionTypingDone: boolean;
    feedbackTypingDone: boolean;
    discussTimeLeft: number;
  },
  t: (key: string, values?: Record<string, string>) => string,
): string {
  const charName = CHARACTER_NAMES[getStepCharacter(step)] ?? "Dr. Lin";
  const isProf = getStepCharacter(step) === "drLin";

  switch (phase) {
    case "playing_lecture":
      return isProf ? t("isLecturing") : t("isSpeaking", { name: charName });
    case "lecture_done":
      return extra.isPlayingAudio
        ? t("audioPlaying")
        : isProf ? t("lectureComplete") : t("characterFinished", { name: charName });
    case "showing_visual":
      return t("showingVisual");
    case "asking_check":
      return extra.questionTypingDone ? t("awaitingAnswer") : t("isAsking");
    case "showing_feedback":
      return (extra.isPlayingAudio || !extra.feedbackTypingDone) ? t("feedbackInProgress") : t("feedbackComplete");
    case "discuss_countdown":
      return extra.discussTimeLeft > 0 ? t("discussionInProgress") : t("discussionComplete");
    case "step_done":
      return t("segmentComplete");
    default:
      return "";
  }
}

// ─── Props ───────────────────────────────────────
interface ClassroomTeacherProps {
  teaching: SegmentTeaching;
  weekNum: number;
  segmentIndex: number;
  segmentTitle?: string;
  initialStepIndex?: number;
  onStepChange?: (stepIndex: number) => void;
  onComplete?: () => void;
}

// ─── Phase type ─────────────────────────────────
type StepPhase =
  | "entering"           // step enter animation
  | "playing_lecture"    // TTS playing + typewriter
  | "lecture_done"       // lecture finished, wait for "Continue"
  | "showing_visual"     // showing visual component
  | "asking_check"       // waiting for student answer (blocking)
  | "showing_feedback"   // showing correct/wrong feedback
  | "discuss_countdown"  // discussion countdown
  | "step_done";         // step complete, ready for next

// ─── Typewriter hook (supports dynamic speed) ────
function useTypewriter(text: string, speed = 80) {
  const [displayed, setDisplayed] = useState("");
  const [isDone, setIsDone] = useState(false);
  const indexRef = useRef(0);
  const speedRef = useRef(speed);

  // Update speed dynamically without resetting progress
  speedRef.current = speed;

  useEffect(() => {
    setDisplayed("");
    setIsDone(false);
    indexRef.current = 0;

    if (!text) {
      setIsDone(true);
      return;
    }

    let timeoutId: ReturnType<typeof setTimeout>;
    const tick = () => {
      indexRef.current++;
      if (indexRef.current >= text.length) {
        setDisplayed(text);
        setIsDone(true);
      } else {
        setDisplayed(text.slice(0, indexRef.current));
        timeoutId = setTimeout(tick, speedRef.current);
      }
    };
    timeoutId = setTimeout(tick, speedRef.current);

    return () => clearTimeout(timeoutId);
  }, [text]);

  const skipToEnd = useCallback(() => {
    setDisplayed(text);
    setIsDone(true);
    indexRef.current = text.length;
  }, [text]);

  return { displayed, isDone, skipToEnd };
}

// ─── Main component ─────────────────────────────
export default function ClassroomTeacher({
  teaching,
  weekNum,
  segmentIndex,
  segmentTitle,
  initialStepIndex,
  onStepChange,
  onComplete,
}: ClassroomTeacherProps) {
  const t = useTranslations("classroom");
  const locale = useLocale();
  const [stepIndex, setStepIndex] = useState(initialStepIndex ?? 0);
  const [phase, setPhase] = useState<StepPhase>("entering");
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  const [audioDuration, setAudioDuration] = useState<number | null>(null);

  // ─── Scoring (segment-level) ───────────────────
  const [correctCount, setCorrectCount] = useState(0);
  const [attemptedCount, setAttemptedCount] = useState(0);

  // ─── Discussion countdown ──────────────────────
  const [discussTimeLeft, setDiscussTimeLeft] = useState(0);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const prevStepRef = useRef(stepIndex);

  const steps = teaching.steps;
  const currentStep = steps[stepIndex] as TeachingStep | undefined;

  // Text extraction
  const lectureText =
    currentStep?.type === "lecture" ? currentStep.text : "";
  const feedbackText =
    currentStep?.type === "check"
      ? isCorrect
        ? currentStep.onCorrect
        : currentStep.onWrong
      : "";
  const questionText =
    currentStep?.type === "check" ? currentStep.question : "";

  // ─── Dynamic speed: sync typewriter with audio duration ──
  const activeSpeed = useMemo(() => {
    if (isMuted) return 35;
    if (!audioDuration) return 150;
    const activeText =
      phase === "playing_lecture" ? lectureText :
      phase === "asking_check" ? questionText :
      phase === "showing_feedback" ? feedbackText : "";
    if (!activeText || activeText.length === 0) return 150;
    return Math.max(25, Math.min(250, (audioDuration * 920) / activeText.length));
  }, [isMuted, audioDuration, phase, lectureText, questionText, feedbackText]);

  // ─── Lecture typewriter ────────────────────────
  const { displayed, isDone: typingDone, skipToEnd } = useTypewriter(
    phase === "playing_lecture" ? lectureText : "",
    activeSpeed
  );

  // ─── Feedback typewriter (check correct/wrong) ─
  const {
    displayed: feedbackDisplayed,
    isDone: feedbackTypingDone,
    skipToEnd: skipFeedback,
  } = useTypewriter(
    phase === "showing_feedback" ? feedbackText : "",
    activeSpeed
  );

  // ─── Question typewriter ───────────────────────
  const {
    displayed: questionDisplayed,
    isDone: questionTypingDone,
    skipToEnd: skipQuestion,
  } = useTypewriter(
    phase === "asking_check" ? questionText : "",
    activeSpeed
  );

  // ─── Manifest cache ────────────────────────────
  const manifestRef = useRef<Record<string, string> | null>(null);
  const manifestLoadedRef = useRef(false);

  // Load manifest (once)
  useEffect(() => {
    if (manifestLoadedRef.current) return;
    manifestLoadedRef.current = true;
    const paddedWeek = String(weekNum).padStart(2, "0");
    const audioDir = locale === "zh" ? "teaching-zh" : "teaching";
    fetch(`/audio/${audioDir}/week${paddedWeek}/manifest.json`)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data) manifestRef.current = data;
      })
      .catch(() => {});
  }, [weekNum, locale]);

  // ─── Audio playback ────────────────────────────
  const playAudio = useCallback(
    async (_text: string, _character: CharacterId = "drLin", audioKey?: string) => {
      if (isMuted) return;

      // Stop previous audio
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }

      setAudioDuration(null);

      try {
        setIsPlayingAudio(true);

        // Only use pre-recorded audio; no fallback to live TTS
        let audioUrl: string | null = null;
        if (audioKey && manifestRef.current?.[audioKey]) {
          audioUrl = manifestRef.current[audioKey];
        }

        if (!audioUrl) {
          setIsPlayingAudio(false);
          return;
        }

        const audio = new Audio(audioUrl);
        audioRef.current = audio;

        audio.onloadedmetadata = () => {
          setAudioDuration(audio.duration);
        };

        audio.onended = () => {
          setIsPlayingAudio(false);
          audioRef.current = null;
        };

        audio.onerror = () => {
          setIsPlayingAudio(false);
          audioRef.current = null;
        };

        await audio.play();
      } catch {
        setIsPlayingAudio(false);
      }
    },
    [isMuted]
  );

  // ─── Step transition logic ─────────────────────
  useEffect(() => {
    const goingBack = stepIndex < prevStepRef.current;
    prevStepRef.current = stepIndex;

    setSelectedOption(null);
    setIsCorrect(null);
    setAudioDuration(null);

    // Stop previous audio
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
      setIsPlayingAudio(false);
    }

    // Going back: skip animation, show completed state
    if (goingBack && currentStep) {
      switch (currentStep.type) {
        case "lecture":
          setPhase("lecture_done");
          return;
        case "visual":
          setPhase("showing_visual");
          return;
        case "check":
          setPhase("asking_check");
          return;
        case "discuss_timer":
          setPhase("discuss_countdown");
          return;
      }
    }

    // Going forward: normal animation flow
    setPhase("entering");

    const enterDelay = stepIndex === 0 ? 800 : 400;

    const timer = setTimeout(() => {
      if (!currentStep) return;

      switch (currentStep.type) {
        case "lecture":
          setPhase("playing_lecture");
          break;
        case "visual":
          setPhase("showing_visual");
          break;
        case "check":
          setPhase("asking_check");
          break;
        case "discuss_timer":
          setDiscussTimeLeft(currentStep.durationMinutes * 60);
          setPhase("discuss_countdown");
          break;
      }
    }, enterDelay);

    return () => clearTimeout(timer);
  }, [stepIndex, segmentIndex, currentStep]);

  // Auto-play audio when lecture starts
  useEffect(() => {
    if (phase === "playing_lecture" && currentStep?.type === "lecture") {
      const key = `s${segmentIndex}-step${stepIndex}`;
      playAudio(currentStep.text, currentStep.character, key);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase]);

  // Typing done → lecture_done
  useEffect(() => {
    if (phase === "playing_lecture" && typingDone) {
      setPhase("lecture_done");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, typingDone]);

  // ─── Discussion countdown ──────────────────────
  useEffect(() => {
    if (phase !== "discuss_countdown" || discussTimeLeft <= 0) return;
    const timer = setInterval(() => {
      setDiscussTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [phase, discussTimeLeft > 0]); // eslint-disable-line react-hooks/exhaustive-deps

  // ─── Auto-scroll ───────────────────────────────
  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollTop = contentRef.current.scrollHeight;
    }
  }, [displayed, feedbackDisplayed, questionDisplayed, phase]);

  // ─── Can advance? ──────────────────────────────
  const canAdvance =
    (phase === "lecture_done" && !isPlayingAudio) ||
    (phase === "showing_visual") ||
    (phase === "showing_feedback" && feedbackTypingDone && !isPlayingAudio) ||
    (phase === "discuss_countdown") ||
    (phase === "step_done");

  // ─── Go back one step ──────────────────────────
  const goBackStep = useCallback(() => {
    if (stepIndex > 0) {
      const prev = stepIndex - 1;
      setStepIndex(prev);
      onStepChange?.(prev);
    }
  }, [stepIndex, onStepChange]);

  // ─── Advance to next step ──────────────────────
  const advanceStep = useCallback(() => {
    if (stepIndex < steps.length - 1) {
      const next = stepIndex + 1;
      setStepIndex(next);
      onStepChange?.(next);
    } else {
      // Segment complete
      setPhase("step_done");
    }
  }, [stepIndex, steps.length, onStepChange]);

  // ─── Check index within segment ────────────────
  const checkIndexInSegment = (() => {
    let count = 0;
    for (let i = 0; i < stepIndex; i++) {
      if (steps[i]?.type === "check") count++;
    }
    return count;
  })();

  // Play question audio when check step enters
  useEffect(() => {
    if (phase === "asking_check" && currentStep?.type === "check") {
      const key = `s${segmentIndex}-check${checkIndexInSegment}-question`;
      playAudio(currentStep.question, "drLin", key);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase]);

  // ─── Check answer handler ──────────────────────
  const handleCheckAnswer = useCallback(
    (optionIndex: number) => {
      if (currentStep?.type !== "check" || selectedOption !== null) return;

      const correct = optionIndex === currentStep.correctIndex;
      setSelectedOption(optionIndex);
      setIsCorrect(correct);
      setPhase("showing_feedback");

      // Scoring
      setAttemptedCount((prev) => prev + 1);
      if (correct) setCorrectCount((prev) => prev + 1);

      // Read feedback audio
      const feedbackAudioText = correct
        ? currentStep.onCorrect
        : currentStep.onWrong;
      const feedbackKey = `s${segmentIndex}-check${checkIndexInSegment}-${correct ? "correct" : "wrong"}`;
      playAudio(feedbackAudioText, "drLin", feedbackKey);
    },
    [currentStep, selectedOption, playAudio, segmentIndex, checkIndexInSegment]
  );

  // ─── Pause / resume ────────────────────────────
  const togglePause = useCallback(() => {
    if (audioRef.current) {
      if (isPaused) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
      setIsPaused(!isPaused);
    }
  }, [isPaused]);

  // ─── Mute toggle ───────────────────────────────
  const toggleMute = useCallback(() => {
    if (audioRef.current && !isMuted) {
      audioRef.current.pause();
      audioRef.current = null;
      setIsPlayingAudio(false);
    }
    setIsMuted(!isMuted);
  }, [isMuted]);

  // ─── Cleanup ───────────────────────────────────
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  // ─── Reset on segment change ───────────────────
  useEffect(() => {
    setStepIndex(initialStepIndex ?? 0);
    setCorrectCount(0);
    setAttemptedCount(0);
  }, [segmentIndex, initialStepIndex]);

  if (!currentStep) {
    return null;
  }

  // ─── Character info (computed each render) ─────
  const activeCharId = getStepCharacter(currentStep);
  const activeCharName = CHARACTER_NAMES[activeCharId] ?? "Dr. Lin";
  const activeCharRole = CHARACTER_ROLES[activeCharId] ?? "";
  const activeBadge = getCharacterBadge(currentStep, t);

  // ─── Render ────────────────────────────────────
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={currentStep.type === "visual" ? "max-w-5xl mx-auto" : "max-w-2xl mx-auto"}
    >
      {/* Top: character info + controls */}
      <div className="flex items-center gap-3 mb-5">
        <CharacterAvatar characterId={activeCharId} size="lg" />
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="font-bold text-gray-900">{activeCharName}</span>
            {activeCharRole && (
              <span className="text-xs text-gray-400">{activeCharRole}</span>
            )}
            <span
              className="text-xs px-2 py-0.5 rounded-full text-white"
              style={{ backgroundColor: activeBadge.color }}
            >
              {activeBadge.label}
            </span>
          </div>
          <div className="flex items-center gap-2 mt-0.5">
            <p className="text-xs text-gray-400">
              {t("step")} {stepIndex + 1} / {steps.length}
            </p>
            {attemptedCount > 0 && (
              <span className="text-xs px-1.5 py-0.5 rounded-full font-medium"
                style={{
                  backgroundColor: correctCount === attemptedCount ? `${BRAND.story}15` : `${BRAND.accent}15`,
                  color: correctCount === attemptedCount ? BRAND.story : BRAND.accent,
                }}
              >
                {correctCount}/{attemptedCount} {t("correct")}
              </span>
            )}
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-1.5">
          {isPlayingAudio && (
            <button
              onClick={togglePause}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              title={isPaused ? t("resume") : t("pause")}
            >
              {isPaused ? (
                <Play className="w-4 h-4 text-gray-500" />
              ) : (
                <Pause className="w-4 h-4 text-gray-500" />
              )}
            </button>
          )}
          <button
            onClick={toggleMute}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            title={isMuted ? "🔊" : "🔇"}
          >
            {isMuted ? (
              <VolumeX className="w-4 h-4 text-gray-400" />
            ) : (
              <Volume2 className="w-4 h-4 text-gray-500" />
            )}
          </button>
        </div>
      </div>

      {/* Progress bar */}
      <div className="h-1 bg-gray-100 rounded-full mb-5 overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ backgroundColor: BRAND.primary }}
          initial={{ width: 0 }}
          animate={{
            width: `${((stepIndex + (phase === "step_done" ? 1 : 0.5)) / steps.length) * 100}%`,
          }}
          transition={{ duration: 0.4 }}
        />
      </div>

      {/* Segment transition title (only on first step entering) */}
      <AnimatePresence>
        {stepIndex === 0 && phase === "entering" && segmentTitle && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            className="text-center py-6 mb-4"
          >
            <div className="inline-block px-3 py-1 rounded-full text-xs font-medium mb-2"
              style={{ backgroundColor: `${BRAND.primary}10`, color: BRAND.primary }}
            >
              {currentStep?.type === "lecture" ? t("theory") :
               currentStep?.type === "check" ? t("quickCheck") :
               currentStep?.type === "visual" ? t("visual") :
               currentStep?.type === "discuss_timer" ? t("discussion") : t("teaching")}
            </div>
            <h3 className="text-lg font-bold text-gray-800">{segmentTitle}</h3>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main content area */}
      <div
        ref={contentRef}
        className="rounded-xl border bg-white shadow-sm overflow-hidden"
        style={{ borderColor: `${BRAND.primary}20` }}
      >
        <AnimatePresence mode="wait">
          {/* ─── Lecture step ─── */}
          {currentStep.type === "lecture" && (
            <motion.div
              key={`lecture-${stepIndex}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="p-6"
            >
              {/* Key note */}
              {currentStep.note && (
                <div
                  className="mb-4 px-4 py-2 rounded-lg text-sm border-l-4"
                  style={{
                    borderColor: BRAND.accent,
                    backgroundColor: `${BRAND.accent}08`,
                    color: BRAND.accent,
                  }}
                >
                  {currentStep.note}
                </div>
              )}

              {/* Lecture text */}
              <div className="text-gray-800 leading-relaxed text-[15px]">
                {phase === "playing_lecture" ? displayed : lectureText}
                {!typingDone && phase === "playing_lecture" && (
                  <span
                    className="inline-block w-1.5 h-5 ml-0.5 align-text-bottom animate-pulse"
                    style={{ backgroundColor: BRAND.primary }}
                  />
                )}
              </div>

              {/* Skip animation */}
              {!typingDone && phase === "playing_lecture" && (
                <button
                  onClick={skipToEnd}
                  className="mt-3 text-xs text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {t("skipAnimation")} &rarr;
                </button>
              )}

              {/* Audio playing indicator */}
              {isPlayingAudio && !isMuted && (
                <div className="flex items-center gap-1.5 mt-3 text-xs" style={{ color: BRAND.story }}>
                  <span className="inline-block w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: BRAND.story }} />
                  {t("audioPlaying")}
                </div>
              )}
            </motion.div>
          )}

          {/* ─── Visual step (dual-column: left text + right chart) ─── */}
          {currentStep.type === "visual" && (() => {
            // Find the previous lecture step for left-column text
            const prevLecture = (() => {
              for (let i = stepIndex - 1; i >= 0; i--) {
                const s = steps[i];
                if (s?.type === "lecture") return s;
              }
              return null;
            })();

            return (
              <motion.div
                key={`visual-${stepIndex}`}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="p-6"
              >
                {prevLecture ? (
                  /* Dual-column layout: text + chart */
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="flex flex-col justify-start">
                      {prevLecture.note && (
                        <div
                          className="mb-3 px-3 py-1.5 rounded-lg text-xs border-l-4"
                          style={{
                            borderColor: BRAND.accent,
                            backgroundColor: `${BRAND.accent}08`,
                            color: BRAND.accent,
                          }}
                        >
                          {prevLecture.note}
                        </div>
                      )}
                      <div className="text-gray-700 leading-relaxed text-sm">
                        {prevLecture.text}
                      </div>
                    </div>
                    <div>
                      {renderVisual(currentStep.component, currentStep.props)}
                      {currentStep.caption && (
                        <p className="text-center text-xs text-gray-500 mt-3">
                          {currentStep.caption}
                        </p>
                      )}
                    </div>
                  </div>
                ) : (
                  /* No preceding lecture: full-width chart */
                  <>
                    {renderVisual(currentStep.component, currentStep.props)}
                    {currentStep.caption && (
                      <p className="text-center text-sm text-gray-500 mt-4">
                        {currentStep.caption}
                      </p>
                    )}
                  </>
                )}
              </motion.div>
            );
          })()}

          {/* ─── Check step ─── */}
          {currentStep.type === "check" && (
            <motion.div
              key={`check-${stepIndex}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="p-6"
            >
              {/* Question (typewriter with audio sync) */}
              <div
                className="flex items-start gap-3 mb-5 p-4 rounded-xl"
                style={{ backgroundColor: `${BRAND.primary}06` }}
              >
                <CharacterAvatar characterId="drLin" size="sm" />
                <div className="flex-1">
                  <p className="text-gray-800 font-medium leading-relaxed">
                    {phase === "asking_check" ? questionDisplayed : currentStep.question}
                    {!questionTypingDone && phase === "asking_check" && (
                      <span
                        className="inline-block w-1.5 h-4 ml-0.5 align-text-bottom animate-pulse"
                        style={{ backgroundColor: BRAND.primary }}
                      />
                    )}
                  </p>
                  {!questionTypingDone && phase === "asking_check" && (
                    <button
                      onClick={skipQuestion}
                      className="mt-2 text-xs text-gray-400 hover:text-gray-600"
                    >
                      {t("skipAnimation")} &rarr;
                    </button>
                  )}
                </div>
              </div>

              {/* Options (appear after question typing done) */}
              {(phase !== "asking_check" || questionTypingDone) && <div className="space-y-2.5">
                {currentStep.options.map((option, i) => {
                  const isSelected = selectedOption === i;
                  const isAnswer = i === currentStep.correctIndex;
                  const showResult = selectedOption !== null;

                  let borderColor = "#e5e7eb";
                  let bgColor = "white";
                  let textColor = "#374151";

                  if (showResult) {
                    if (isAnswer) {
                      borderColor = BRAND.story;
                      bgColor = `${BRAND.story}08`;
                      textColor = BRAND.story;
                    } else if (isSelected && !isAnswer) {
                      borderColor = BRAND.danger;
                      bgColor = `${BRAND.danger}08`;
                      textColor = BRAND.danger;
                    } else {
                      borderColor = "#f3f4f6";
                      bgColor = "#f9fafb";
                      textColor = "#9ca3af";
                    }
                  }

                  return (
                    <motion.button
                      key={i}
                      onClick={() => handleCheckAnswer(i)}
                      disabled={selectedOption !== null}
                      className="w-full text-left px-4 py-3 rounded-xl border-2 transition-all flex items-center gap-3"
                      style={{
                        borderColor,
                        backgroundColor: bgColor,
                        color: textColor,
                      }}
                      whileHover={
                        selectedOption === null
                          ? { scale: 1.01, borderColor: BRAND.primary }
                          : undefined
                      }
                      whileTap={
                        selectedOption === null ? { scale: 0.99 } : undefined
                      }
                    >
                      <span
                        className="w-7 h-7 rounded-full border-2 flex items-center justify-center text-sm font-bold shrink-0"
                        style={{ borderColor }}
                      >
                        {showResult && isAnswer ? (
                          <CheckCircle2
                            className="w-5 h-5"
                            style={{ color: BRAND.story }}
                          />
                        ) : showResult && isSelected && !isAnswer ? (
                          <XCircle
                            className="w-5 h-5"
                            style={{ color: BRAND.danger }}
                          />
                        ) : (
                          String.fromCharCode(65 + i)
                        )}
                      </span>
                      <span className="text-[15px]">{option}</span>
                    </motion.button>
                  );
                })}
              </div>}

              {/* Feedback */}
              <AnimatePresence>
                {phase === "showing_feedback" && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="mt-5"
                  >
                    <div
                      className="p-4 rounded-xl border-l-4"
                      style={{
                        borderColor: isCorrect ? BRAND.story : BRAND.accent,
                        backgroundColor: isCorrect
                          ? `${BRAND.story}06`
                          : `${BRAND.accent}06`,
                      }}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        {isCorrect ? (
                          <CheckCircle2
                            className="w-5 h-5"
                            style={{ color: BRAND.story }}
                          />
                        ) : (
                          <XCircle
                            className="w-5 h-5"
                            style={{ color: BRAND.accent }}
                          />
                        )}
                        <span
                          className="font-bold text-sm"
                          style={{
                            color: isCorrect ? BRAND.story : BRAND.accent,
                          }}
                        >
                          {isCorrect ? t("correctAnswer") : t("notQuiteAnswer")}
                        </span>
                      </div>
                      <p className="text-gray-700 text-sm leading-relaxed">
                        {feedbackDisplayed}
                        {!feedbackTypingDone && (
                          <span
                            className="inline-block w-1.5 h-4 ml-0.5 align-text-bottom animate-pulse"
                            style={{ backgroundColor: BRAND.primary }}
                          />
                        )}
                      </p>
                      {!feedbackTypingDone && (
                        <button
                          onClick={skipFeedback}
                          className="mt-2 text-xs text-gray-400 hover:text-gray-600"
                        >
                          {t("skipAnimation")} &rarr;
                        </button>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Prompt to answer */}
              {phase === "asking_check" && questionTypingDone && selectedOption === null && (
                <p className="text-center text-sm text-gray-400 mt-4 animate-pulse">
                  {t("selectAnswer")}
                </p>
              )}
            </motion.div>
          )}

          {/* ─── Discuss Timer step ─── */}
          {currentStep.type === "discuss_timer" && (
            <motion.div
              key={`discuss-${stepIndex}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="p-6"
            >
              {/* Countdown ring */}
              <div className="flex flex-col items-center mb-6">
                <div className="relative w-32 h-32 mb-4">
                  <svg className="w-32 h-32 -rotate-90" viewBox="0 0 120 120">
                    <circle cx="60" cy="60" r="54" fill="none" stroke="#f3f4f6" strokeWidth="8" />
                    <circle
                      cx="60" cy="60" r="54" fill="none"
                      stroke={discussTimeLeft > 0 ? BRAND.story : BRAND.accent}
                      strokeWidth="8"
                      strokeLinecap="round"
                      strokeDasharray={2 * Math.PI * 54}
                      strokeDashoffset={
                        currentStep.durationMinutes * 60 > 0
                          ? 2 * Math.PI * 54 * (1 - discussTimeLeft / (currentStep.durationMinutes * 60))
                          : 0
                      }
                      className="transition-all duration-1000 ease-linear"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-2xl font-bold tabular-nums" style={{ color: discussTimeLeft > 0 ? BRAND.story : BRAND.accent }}>
                      {Math.floor(discussTimeLeft / 60)}:{String(discussTimeLeft % 60).padStart(2, "0")}
                    </span>
                  </div>
                </div>
                {discussTimeLeft <= 0 && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-sm font-medium"
                    style={{ color: BRAND.accent }}
                  >
                    {t("timesUp")}
                  </motion.p>
                )}
              </div>

              {/* Discussion prompt */}
              <div
                className="p-4 rounded-xl border-l-4 mb-4"
                style={{
                  borderColor: BRAND.story,
                  backgroundColor: `${BRAND.story}06`,
                }}
              >
                <p className="text-gray-800 font-medium leading-relaxed">
                  {currentStep.prompt}
                </p>
              </div>

              {/* Guide points */}
              {currentStep.guidePoints && currentStep.guidePoints.length > 0 && (
                <div className="space-y-1.5 text-sm text-gray-600">
                  {currentStep.guidePoints.map((point, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <span style={{ color: BRAND.story }}>&#9679;</span>
                      <span>{point}</span>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          )}

        </AnimatePresence>
      </div>

      {/* Segment summary card (shown at step_done) */}
      <AnimatePresence>
        {phase === "step_done" && attemptedCount > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 rounded-xl border p-4 text-center"
            style={{
              borderColor: correctCount >= attemptedCount * 0.6 ? `${BRAND.story}40` : `${BRAND.accent}40`,
              backgroundColor: correctCount >= attemptedCount * 0.6 ? `${BRAND.story}06` : `${BRAND.accent}06`,
            }}
          >
            <p className="font-bold text-sm mb-1"
              style={{ color: correctCount >= attemptedCount * 0.6 ? BRAND.story : BRAND.accent }}
            >
              {correctCount === attemptedCount ? t("perfectScore") : t("segmentCompleteScore", { correct: String(correctCount), total: String(attemptedCount) })}
            </p>
            <p className="text-xs text-gray-500">
              {correctCount === attemptedCount
                ? t("excellentUnderstanding")
                : correctCount >= attemptedCount * 0.6
                  ? t("goodWork")
                  : t("reviewConcepts")}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom action bar */}
      <div className="flex items-center justify-between mt-4">
        {/* Left: back button or status text */}
        {stepIndex > 0 ? (
          <motion.button
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={goBackStep}
            className="flex items-center gap-1 px-3 py-2 rounded-lg text-sm text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-all"
          >
            <ChevronLeft className="w-4 h-4" />
            {t("back")}
          </motion.button>
        ) : (
          <div className="text-xs text-gray-400">
            {getPhaseStatusText(phase, currentStep, {
              isPlayingAudio,
              questionTypingDone,
              feedbackTypingDone,
              discussTimeLeft,
            }, t)}
          </div>
        )}

        {/* Continue button */}
        {canAdvance && (
          <motion.button
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={() => {
              if (phase === "step_done" && onComplete) {
                onComplete();
              } else {
                advanceStep();
              }
            }}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-white transition-all hover:opacity-90"
            style={{ backgroundColor: BRAND.primary }}
          >
            {phase === "step_done" ? (
              onComplete ? (
                <>
                  {t("nextSegment")} <ChevronRight className="w-4 h-4" />
                </>
              ) : (
                t("endOfWeek")
              )
            ) : (
              <>
                {t("continue")} <ChevronRight className="w-4 h-4" />
              </>
            )}
          </motion.button>
        )}
      </div>
    </motion.div>
  );
}

// ─── Helper: Render visual component ─────────────
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function renderVisual(componentName: string, props?: Record<string, any>) {
  const Component = VISUAL_COMPONENTS[componentName];
  if (!Component) {
    return (
      <div className="text-center py-8 text-gray-400">
        Visual component &ldquo;{componentName}&rdquo; not found
      </div>
    );
  }
  return <Component {...(props || {})} />;
}
