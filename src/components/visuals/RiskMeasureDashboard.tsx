'use client';

import { useState } from 'react';

const RISK_MEASURES = [
  {
    id: 'var',
    name: 'Value-at-Risk',
    abbr: 'VaR',
    week: 6,
    description: 'Maximum expected loss at a given confidence level over a specified time horizon.',
    formula: 'P(L > VaR_α) = 1 - α',
    strengths: ['Widely used', 'Regulatory standard', 'Easy to communicate'],
    weaknesses: ['Not coherent', 'Ignores tail shape', 'Single point estimate'],
    color: '#E67E22',
  },
  {
    id: 'es',
    name: 'Expected Shortfall',
    abbr: 'ES/CVaR',
    week: 6,
    description: 'Average loss in the worst (1-α)% of scenarios. Also called Conditional VaR.',
    formula: 'ES_α = E[L | L > VaR_α]',
    strengths: ['Coherent', 'Captures tail shape', 'Subadditive'],
    weaknesses: ['Harder to backtest', 'More data needed', 'Less intuitive'],
    color: '#16A085',
  },
  {
    id: 'kupiec',
    name: 'Kupiec Test',
    abbr: 'POF',
    week: 7,
    description: 'Tests whether the observed VaR breach rate matches the expected rate.',
    formula: 'LR_POF ~ χ²(1)',
    strengths: ['Simple', 'Well-established', 'One-parameter'],
    weaknesses: ['Low power', 'Ignores clustering', 'Only tests frequency'],
    color: '#8E44AD',
  },
  {
    id: 'christoffersen',
    name: 'Christoffersen Test',
    abbr: 'CC',
    week: 7,
    description: 'Tests both the frequency and independence of VaR breaches.',
    formula: 'LR_CC = LR_POF + LR_ind ~ χ²(2)',
    strengths: ['Tests independence', 'Detects clustering', 'More comprehensive'],
    weaknesses: ['Requires more data', 'Two-state Markov', 'Higher complexity'],
    color: '#2C3E50',
  },
];

export function RiskMeasureDashboard() {
  const [selected, setSelected] = useState<string>('var');
  const measure = RISK_MEASURES.find((m) => m.id === selected)!;

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <h3 className="font-bold text-[#1B3A5C] mb-4">Risk Measurement Framework</h3>

      {/* Selector */}
      <div className="flex flex-wrap gap-2 mb-6">
        {RISK_MEASURES.map((m) => (
          <button
            key={m.id}
            onClick={() => setSelected(m.id)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              selected === m.id
                ? 'text-white shadow-md'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
            style={selected === m.id ? { backgroundColor: m.color } : undefined}
          >
            {m.abbr}
          </button>
        ))}
      </div>

      {/* Detail */}
      <div className="border rounded-lg p-5" style={{ borderColor: measure.color }}>
        <div className="flex items-center gap-3 mb-3">
          <h4 className="text-lg font-bold" style={{ color: measure.color }}>
            {measure.name}
          </h4>
          <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded">
            Week {measure.week}
          </span>
        </div>

        <p className="text-sm text-gray-700 mb-3">{measure.description}</p>

        <div className="bg-gray-50 rounded p-3 mb-4 font-mono text-sm text-center">
          {measure.formula}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <h5 className="text-xs font-bold text-green-700 mb-1">Strengths</h5>
            {measure.strengths.map((s) => (
              <p key={s} className="text-xs text-green-800">✓ {s}</p>
            ))}
          </div>
          <div>
            <h5 className="text-xs font-bold text-red-700 mb-1">Limitations</h5>
            {measure.weaknesses.map((w) => (
              <p key={w} className="text-xs text-red-800">✗ {w}</p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
