'use client';

import { useEffect, useRef } from 'react';
import katex from 'katex';

interface Formula {
  latex: string;
  label?: string;
}

interface FormulaDisplayProps {
  formulas: Formula[];
  highlight?: number[];
  annotations?: string[];
}

function RenderFormula({ latex, label, highlighted, annotation }: {
  latex: string;
  label?: string;
  highlighted?: boolean;
  annotation?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      try {
        katex.render(latex, ref.current, {
          throwOnError: false,
          displayMode: true,
        });
      } catch {
        ref.current.textContent = latex;
      }
    }
  }, [latex]);

  return (
    <div
      className={`rounded-lg p-4 transition-all ${
        highlighted
          ? 'border-2 border-[#D4A843] bg-amber-50 shadow-md'
          : 'border border-gray-200 bg-white'
      }`}
    >
      {label && (
        <div className="text-xs font-medium text-gray-500 mb-2">{label}</div>
      )}
      <div ref={ref} className="overflow-x-auto text-center" />
      {annotation && (
        <div className="text-xs text-gray-600 mt-2 text-center italic">
          {annotation}
        </div>
      )}
    </div>
  );
}

export function FormulaDisplay({ formulas, highlight = [], annotations = [] }: FormulaDisplayProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
      <div className="space-y-3">
        {formulas.map((f, i) => (
          <RenderFormula
            key={i}
            latex={f.latex}
            label={f.label}
            highlighted={highlight.includes(i)}
            annotation={annotations[i]}
          />
        ))}
      </div>
    </div>
  );
}
