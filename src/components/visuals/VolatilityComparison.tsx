'use client';

import { useState } from 'react';

const METHODS = [
  {
    id: 'rolling',
    name: 'Rolling Window',
    week: 2,
    pros: ['Simple', 'Transparent', 'No assumptions'],
    cons: ['Ghost effect', 'Equal weights', 'Window size choice'],
    color: '#1B3A5C',
  },
  {
    id: 'ewma',
    name: 'EWMA',
    week: 2,
    pros: ['Responsive', 'One parameter (λ)', 'No ghost effect'],
    cons: ['No mean reversion', 'λ choice', 'Symmetric'],
    color: '#D4A843',
  },
  {
    id: 'garch',
    name: 'GARCH(1,1)',
    week: 3,
    pros: ['Mean reversion', 'MLE estimated', 'Conditional model'],
    cons: ['Symmetric', 'One lag', 'Parametric assumptions'],
    color: '#2D7D5E',
  },
  {
    id: 'gjr',
    name: 'GJR-GARCH',
    week: 4,
    pros: ['Asymmetric', 'Leverage effect', 'Better fit'],
    cons: ['More parameters', 'Convergence issues', 'Complexity'],
    color: '#C0392B',
  },
];

export function VolatilityComparison() {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <h3 className="font-bold text-[#1B3A5C] mb-4">Volatility Methods Comparison</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {METHODS.map((method) => {
          const isActive = selected === method.id;
          return (
            <button
              key={method.id}
              onClick={() => setSelected(isActive ? null : method.id)}
              className={`p-4 rounded-lg border-2 text-left transition-all ${
                isActive
                  ? 'shadow-lg scale-105'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              style={isActive ? { borderColor: method.color, backgroundColor: `${method.color}08` } : undefined}
            >
              <div className="text-xs font-mono text-gray-400 mb-1">Week {method.week}</div>
              <div className="font-bold text-sm" style={{ color: method.color }}>
                {method.name}
              </div>
            </button>
          );
        })}
      </div>

      {selected && (
        <div className="mt-4 grid grid-cols-2 gap-4">
          <div className="bg-green-50 rounded-lg p-4">
            <h4 className="text-sm font-bold text-green-700 mb-2">Strengths</h4>
            <ul className="space-y-1">
              {METHODS.find((m) => m.id === selected)?.pros.map((p) => (
                <li key={p} className="text-sm text-green-800 flex items-center gap-1">
                  <span className="text-green-500">✓</span> {p}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-red-50 rounded-lg p-4">
            <h4 className="text-sm font-bold text-red-700 mb-2">Limitations</h4>
            <ul className="space-y-1">
              {METHODS.find((m) => m.id === selected)?.cons.map((c) => (
                <li key={c} className="text-sm text-red-800 flex items-center gap-1">
                  <span className="text-red-500">✗</span> {c}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
