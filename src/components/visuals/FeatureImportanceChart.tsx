'use client';

import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Cell,
} from 'recharts';

const FEATURES = [
  { feature: 'Lagged Volatility', importance: 0.285 },
  { feature: 'GARCH Forecast', importance: 0.198 },
  { feature: 'Realized Vol (5d)', importance: 0.142 },
  { feature: 'VIX Level', importance: 0.118 },
  { feature: 'Volume Change', importance: 0.089 },
  { feature: 'Sentiment Score', importance: 0.062 },
  { feature: 'Return Momentum', importance: 0.048 },
  { feature: 'Spread (Bid-Ask)', importance: 0.032 },
  { feature: 'Day of Week', importance: 0.018 },
  { feature: 'Month Effect', importance: 0.008 },
].sort((a, b) => a.importance - b.importance); // sorted ascending for horizontal layout

export function FeatureImportanceChart() {
  const maxImportance = Math.max(...FEATURES.map(f => f.importance));

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
      <h3 className="font-bold text-[#1B3A5C] mb-1">Feature Importance (ML Volatility Forecasting)</h3>
      <p className="text-xs text-gray-500 mb-4">
        Relative importance of features in predicting next-day volatility using gradient boosting
      </p>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          data={FEATURES}
          layout="vertical"
          margin={{ top: 10, right: 30, bottom: 10, left: 120 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" horizontal={false} />
          <XAxis
            type="number"
            domain={[0, 0.32]}
            stroke="#6b7280"
            fontSize={12}
            tickFormatter={(v: number) => (v * 100).toFixed(0) + '%'}
          />
          <YAxis
            type="category"
            dataKey="feature"
            stroke="#6b7280"
            fontSize={12}
            width={110}
          />
          <Tooltip
            contentStyle={{ fontSize: 12, borderRadius: 8 }}
            formatter={(value) => [(typeof value === 'number' ? (value * 100).toFixed(1) : '0') + '%', 'Importance']}
          />
          <Bar dataKey="importance" radius={[0, 4, 4, 0]} barSize={24}>
            {FEATURES.map((entry, i) => (
              <Cell
                key={i}
                fill={entry.importance === maxImportance ? '#D4A843' : '#1B3A5C'}
                fillOpacity={entry.importance === maxImportance ? 1 : 0.7}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      <div className="mt-3 text-xs text-gray-600 bg-gray-50 rounded-lg p-3">
        <strong>Key Finding:</strong> Lagged volatility and GARCH forecasts dominate,
        confirming that traditional time-series models capture most predictable variation.
        ML adds value primarily through non-linear interactions and alternative data (sentiment, volume).
      </div>
    </div>
  );
}
