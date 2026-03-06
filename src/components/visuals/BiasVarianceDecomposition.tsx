'use client';

import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, ReferenceLine, Label, Legend,
} from 'recharts';

// Generate bias-variance tradeoff data
// As complexity increases: bias decreases, variance increases
const DATA = Array.from({ length: 20 }, (_, i) => {
  const complexity = i + 1;
  const x = complexity / 20; // normalized 0 to 1

  // Bias^2: high at low complexity, decreasing
  const bias2 = 0.8 * Math.exp(-3 * x) + 0.02;

  // Variance: low at low complexity, increasing
  const variance = 0.05 + 0.6 * (1 - Math.exp(-2.5 * (x - 0.2)));

  // Irreducible error: constant
  const irreducible = 0.05;

  const totalError = bias2 + Math.max(0, variance) + irreducible;

  return {
    complexity,
    'Bias Squared': parseFloat(bias2.toFixed(4)),
    Variance: parseFloat(Math.max(0, variance).toFixed(4)),
    'Irreducible Error': irreducible,
    'Total Error': parseFloat(totalError.toFixed(4)),
  };
});

// Find the optimal complexity (minimum total error)
const optimalIdx = DATA.reduce((minIdx, d, i, arr) =>
  d['Total Error'] < arr[minIdx]['Total Error'] ? i : minIdx, 0);
const optimalComplexity = DATA[optimalIdx].complexity;

export function BiasVarianceDecomposition() {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
      <h3 className="font-bold text-[#1B3A5C] mb-1">Bias-Variance Decomposition</h3>
      <p className="text-xs text-gray-500 mb-4">
        Total Error = Bias&sup2; + Variance + Irreducible Error
      </p>
      <ResponsiveContainer width="100%" height={400}>
        <AreaChart data={DATA} margin={{ top: 10, right: 30, bottom: 30, left: 20 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis dataKey="complexity" stroke="#6b7280" fontSize={12}>
            <Label value="Model Complexity" position="bottom" offset={15} style={{ fill: '#6b7280', fontSize: 12 }} />
          </XAxis>
          <YAxis stroke="#6b7280" fontSize={12}>
            <Label value="Error" angle={-90} position="left" offset={5} style={{ fill: '#6b7280', fontSize: 12 }} />
          </YAxis>
          <Tooltip
            contentStyle={{ fontSize: 12, borderRadius: 8 }}
            formatter={(value, name) => [typeof value === 'number' ? value.toFixed(4) : String(value), name]}
          />
          <Legend verticalAlign="top" />

          <Area
            type="monotone"
            dataKey="Irreducible Error"
            stackId="1"
            stroke="#9ca3af"
            fill="#9ca3af"
            fillOpacity={0.4}
          />
          <Area
            type="monotone"
            dataKey="Bias Squared"
            stackId="1"
            stroke="#1B3A5C"
            fill="#1B3A5C"
            fillOpacity={0.5}
          />
          <Area
            type="monotone"
            dataKey="Variance"
            stackId="1"
            stroke="#D4A843"
            fill="#D4A843"
            fillOpacity={0.5}
          />

          {/* Optimal point marker */}
          <ReferenceLine
            x={optimalComplexity}
            stroke="#16a34a"
            strokeDasharray="6 4"
            strokeWidth={2}
            label={{
              value: 'Optimal',
              position: 'top',
              fill: '#16a34a',
              fontSize: 12,
              fontWeight: 'bold',
            }}
          />
        </AreaChart>
      </ResponsiveContainer>

      <div className="mt-3 grid grid-cols-3 gap-2 text-xs">
        <div className="bg-[#1B3A5C]/10 rounded p-2">
          <div className="font-bold text-[#1B3A5C]">Bias&sup2; (Underfitting)</div>
          <div className="text-gray-600">Error from overly simple models</div>
        </div>
        <div className="bg-[#D4A843]/10 rounded p-2">
          <div className="font-bold text-[#D4A843]">Variance (Overfitting)</div>
          <div className="text-gray-600">Sensitivity to training data</div>
        </div>
        <div className="bg-gray-100 rounded p-2">
          <div className="font-bold text-gray-600">Irreducible Error</div>
          <div className="text-gray-500">Noise floor (cannot be reduced)</div>
        </div>
      </div>
    </div>
  );
}
