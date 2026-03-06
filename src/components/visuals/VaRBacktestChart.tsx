'use client';

import {
  ComposedChart, Line, Scatter, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Legend, Label, Cell,
} from 'recharts';

// Generate ~250 data points for VaR backtesting
function generateData() {
  const n = 250;
  const data = [];
  let violations = 0;

  for (let i = 0; i < n; i++) {
    // Deterministic pseudo-random
    const seed = Math.sin(i * 127.1 + 311.7) * 43758.5453;
    const rand = seed - Math.floor(seed);
    const z = (rand - 0.5) * 3.5;

    // Base volatility with clustering
    let vol = 0.012;
    if (i > 50 && i < 80) vol = 0.028;
    if (i > 140 && i < 160) vol = 0.022;
    if (i > 200 && i < 220) vol = 0.025;

    const ret = z * vol;
    // VaR at 99% confidence (1.645 for 95%, 2.326 for 99%)
    const var99 = -2.326 * vol;

    const isViolation = ret < var99;
    if (isViolation) violations++;

    const month = Math.floor(i / 21) + 1;
    const day = (i % 21) + 1;

    data.push({
      date: `M${month}-D${day}`,
      return: parseFloat((ret * 100).toFixed(3)),
      VaR: parseFloat((var99 * 100).toFixed(3)),
      violation: isViolation ? parseFloat((ret * 100).toFixed(3)) : null,
    });
  }

  return { data, violations };
}

const { data: DATA, violations: TOTAL_VIOLATIONS } = generateData();

function getTrafficLight(violations: number): { color: string; label: string; bg: string } {
  if (violations <= 4) return { color: '#16a34a', label: 'Green Zone', bg: 'bg-green-100 text-green-800' };
  if (violations <= 9) return { color: '#ca8a04', label: 'Yellow Zone', bg: 'bg-yellow-100 text-yellow-800' };
  return { color: '#dc2626', label: 'Red Zone', bg: 'bg-red-100 text-red-800' };
}

export function VaRBacktestChart() {
  const traffic = getTrafficLight(TOTAL_VIOLATIONS);

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
      <div className="flex items-center justify-between mb-1">
        <h3 className="font-bold text-[#1B3A5C]">VaR Backtesting</h3>
        <div className="flex items-center gap-2">
          <span className={`text-xs font-bold px-3 py-1 rounded-full ${traffic.bg}`}>
            {traffic.label}
          </span>
          <span className="text-xs text-gray-500">
            {TOTAL_VIOLATIONS} violations / 250 days
          </span>
        </div>
      </div>
      <p className="text-xs text-gray-500 mb-4">
        99% VaR boundary with violation markers (expected: ~2.5 violations)
      </p>
      <ResponsiveContainer width="100%" height={400}>
        <ComposedChart data={DATA} margin={{ top: 10, right: 30, bottom: 30, left: 20 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis dataKey="date" stroke="#6b7280" fontSize={10} interval={49}>
            <Label value="Trading Days" position="bottom" offset={15} style={{ fill: '#6b7280', fontSize: 12 }} />
          </XAxis>
          <YAxis stroke="#6b7280" fontSize={12}>
            <Label value="Return (%)" angle={-90} position="left" offset={5} style={{ fill: '#6b7280', fontSize: 12 }} />
          </YAxis>
          <Tooltip
            contentStyle={{ fontSize: 12, borderRadius: 8 }}
            formatter={(value, name) => {
              if (value == null) return ['-', name];
              return [(typeof value === 'number' ? value.toFixed(3) : String(value)) + '%', name];
            }}
          />
          <Legend verticalAlign="top" />
          <Line
            type="monotone"
            dataKey="return"
            stroke="#6b7280"
            strokeWidth={1}
            dot={false}
            name="Daily Return"
          />
          <Line
            type="monotone"
            dataKey="VaR"
            stroke="#1B3A5C"
            strokeWidth={2}
            strokeDasharray="6 3"
            dot={false}
            name="99% VaR"
          />
          <Scatter dataKey="violation" name="Violations" fill="#dc2626">
            {DATA.map((entry, i) => (
              entry.violation !== null ? (
                <Cell key={i} fill="#dc2626" r={5} />
              ) : (
                <Cell key={i} fill="transparent" r={0} />
              )
            ))}
          </Scatter>
        </ComposedChart>
      </ResponsiveContainer>
      <div className="mt-3 grid grid-cols-3 gap-2 text-xs">
        <div className="bg-green-50 rounded p-2 text-center">
          <div className="font-bold text-green-700">Green</div>
          <div className="text-green-600">0-4 violations</div>
        </div>
        <div className="bg-yellow-50 rounded p-2 text-center">
          <div className="font-bold text-yellow-700">Yellow</div>
          <div className="text-yellow-600">5-9 violations</div>
        </div>
        <div className="bg-red-50 rounded p-2 text-center">
          <div className="font-bold text-red-700">Red</div>
          <div className="text-red-600">10+ violations</div>
        </div>
      </div>
    </div>
  );
}
