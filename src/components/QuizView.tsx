'use client';

import { useEffect, useState, useCallback } from 'react';
import type { WeekExercises, MCQuestion } from '@/types';

function QuestionCard({
  question,
  index,
  selectedAnswer,
  onSelect,
  showResult,
}: {
  question: MCQuestion;
  index: number;
  selectedAnswer: string | null;
  onSelect: (answer: string) => void;
  showResult: boolean;
}) {
  const isCorrect = selectedAnswer === question.correctAnswer;

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-5">
      <div className="flex items-start gap-3 mb-4">
        <span className="flex-shrink-0 w-8 h-8 rounded-full bg-[#1B3A5C] text-white flex items-center justify-center text-sm font-bold">
          {index + 1}
        </span>
        <p className="text-sm text-gray-800 leading-relaxed">{question.question}</p>
      </div>

      <div className="space-y-2 ml-11">
        {question.options.map((option) => {
          const isSelected = selectedAnswer === option.label;
          const isRight = option.label === question.correctAnswer;

          let bgClass = 'bg-white border-gray-200 hover:bg-gray-50';
          if (showResult && isRight) {
            bgClass = 'bg-green-50 border-green-400';
          } else if (showResult && isSelected && !isRight) {
            bgClass = 'bg-red-50 border-red-400';
          } else if (isSelected) {
            bgClass = 'bg-blue-50 border-blue-400';
          }

          return (
            <button
              key={option.label}
              onClick={() => !showResult && onSelect(option.label)}
              disabled={showResult}
              className={`w-full flex items-start gap-3 p-3 rounded-lg border text-left transition-colors ${bgClass}`}
            >
              <span className="flex-shrink-0 w-6 h-6 rounded-full border-2 border-gray-300 flex items-center justify-center text-xs font-bold">
                {option.label}
              </span>
              <span className="text-sm text-gray-700">{option.text}</span>
            </button>
          );
        })}
      </div>

      {showResult && (
        <div
          className={`mt-4 ml-11 p-3 rounded-lg text-sm ${
            isCorrect ? 'bg-green-50 text-green-800' : 'bg-amber-50 text-amber-800'
          }`}
        >
          <p className="font-medium mb-1">
            {isCorrect ? '✓ Correct!' : `✗ The correct answer is (${question.correctAnswer})`}
          </p>
          <p>{question.explanation}</p>
        </div>
      )}
    </div>
  );
}

export function QuizView({ weekNumber }: { weekNumber: number }) {
  const [data, setData] = useState<WeekExercises | null>(null);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const weekId = String(weekNumber).padStart(2, '0');
    import(`@/data/exercises/week${weekId}`)
      .then((mod) => {
        const key = `week${weekId}Exercises`;
        setData(mod[key] || mod.default);
      })
      .catch(() => setData(null));
  }, [weekNumber]);

  const handleSelect = useCallback((questionId: string, answer: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: answer }));
  }, []);

  const handleSubmit = () => setSubmitted(true);

  const handleReset = () => {
    setAnswers({});
    setSubmitted(false);
  };

  if (!data) {
    return <div className="text-center py-12 text-gray-500">Loading quiz data...</div>;
  }

  const totalQuestions = data.questions.length;
  const answeredCount = Object.keys(answers).length;
  const correctCount = submitted
    ? data.questions.filter((q) => answers[q.id] === q.correctAnswer).length
    : 0;

  return (
    <div>
      {/* Score bar */}
      {submitted && (
        <div className="bg-white border border-gray-200 rounded-lg p-4 mb-6 flex items-center justify-between">
          <div>
            <p className="text-2xl font-bold text-[#1B3A5C]">
              {correctCount}/{totalQuestions}
            </p>
            <p className="text-sm text-gray-500">
              {Math.round((correctCount / totalQuestions) * 100)}% correct
            </p>
          </div>
          <button
            onClick={handleReset}
            className="px-4 py-2 bg-[#1B3A5C] text-white rounded-lg text-sm hover:bg-[#2a4f7a] transition-colors"
          >
            Try Again
          </button>
        </div>
      )}

      {/* Questions */}
      <div className="space-y-4">
        {data.questions.map((q, i) => (
          <QuestionCard
            key={q.id}
            question={q}
            index={i}
            selectedAnswer={answers[q.id] || null}
            onSelect={(answer) => handleSelect(q.id, answer)}
            showResult={submitted}
          />
        ))}
      </div>

      {/* Submit button */}
      {!submitted && (
        <div className="mt-6 text-center">
          <button
            onClick={handleSubmit}
            disabled={answeredCount < totalQuestions}
            className={`px-8 py-3 rounded-lg text-white font-medium transition-colors ${
              answeredCount < totalQuestions
                ? 'bg-gray-300 cursor-not-allowed'
                : 'bg-[#1B3A5C] hover:bg-[#2a4f7a]'
            }`}
          >
            Submit ({answeredCount}/{totalQuestions} answered)
          </button>
        </div>
      )}
    </div>
  );
}
