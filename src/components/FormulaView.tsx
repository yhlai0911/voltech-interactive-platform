'use client';

import { useEffect, useState } from 'react';
import type { WeekFormulas, Formula } from '@/types';
import { LaTeX } from './LaTeX';

function FormulaCard({ formula }: { formula: Formula }) {
  const [showVars, setShowVars] = useState(false);

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow">
      <h4 className="font-bold text-[#1B3A5C] mb-2">{formula.name}</h4>

      {/* LaTeX rendered equation */}
      <div className="bg-gray-50 border border-gray-100 rounded p-4 mb-3 text-center overflow-x-auto">
        <LaTeX math={formula.latex} display />
      </div>

      <p className="text-sm text-gray-600 mb-3">{formula.description}</p>

      {formula.variables && Object.keys(formula.variables).length > 0 && (
        <div>
          <button
            onClick={() => setShowVars(!showVars)}
            className="text-xs text-[#D4A843] font-medium hover:underline"
          >
            {showVars ? 'Hide variables ▲' : 'Show variables ▼'}
          </button>
          {showVars && (
            <div className="mt-2 space-y-1">
              {Object.entries(formula.variables).map(([sym, desc]) => (
                <div key={sym} className="flex items-start gap-2 text-xs">
                  <span className="bg-gray-100 px-1 rounded">
                    <LaTeX math={sym} />
                  </span>
                  <span className="text-gray-600">{desc}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {formula.example && (
        <div className="mt-3 bg-green-50 border border-green-200 rounded p-2">
          <p className="text-xs text-green-800">{formula.example}</p>
        </div>
      )}
    </div>
  );
}

export function FormulaView({ weekNumber }: { weekNumber: number }) {
  const [data, setData] = useState<WeekFormulas | null>(null);

  useEffect(() => {
    const weekId = String(weekNumber).padStart(2, '0');
    import(`@/data/formulas/week${weekId}`)
      .then((mod) => {
        const key = `week${weekId}Formulas`;
        setData(mod[key] || mod.default);
      })
      .catch(() => setData(null));
  }, [weekNumber]);

  if (!data) {
    return <div className="text-center py-12 text-gray-500">Loading formula data...</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {data.formulas.map((formula) => (
        <FormulaCard key={formula.id} formula={formula} />
      ))}
    </div>
  );
}
