'use client';

import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ReferenceLine, ResponsiveContainer, Legend, Label,
} from 'recharts';

const T = 250; // sample size
const CONFIDENCE = 1.96 / Math.sqrt(T); // ~0.124

// Mock ACF data: raw returns (near zero) vs squared returns (significant for early lags)
const ACF_DATA = Array.from({ length: 20 }, (_, i) => {
  const lag = i + 1;
  // Raw returns: near zero, small random-like values
  const rawACF = [0.02, -0.01, 0.03, -0.02, 0.01, -0.03, 0.02, 0.01, -0.01, 0.02,
    -0.02, 0.01, 0.03, -0.01, 0.02, -0.02, 0.01, -0.01, 0.02, -0.01][i];
  // Squared returns: decaying from significant values (volatility clustering)
  const sqACF = 0.35 * Math.exp(-0.12 * lag) + 0.02 * (((lag * 7 + 3) % 11) / 11 - 0.5);
  return {
    lag,
    rawReturns: parseFloat(rawACF.toFixed(4)),
    squaredReturns: parseFloat(sqACF.toFixed(4)),
  };
});

export function ACFBarChart() {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
      <h3 className="font-bold text-[#1B3A5C] mb-1">Autocorrelation Function (ACF)</h3>
      <p className="text-xs text-gray-500 mb-4">
        Raw returns show no autocorrelation, but squared returns exhibit significant persistence (volatility clustering)
      </p>
      <ResponsiveContainer width="100%" height={380}>
        <BarChart data={ACF_DATA} margin={{ top: 10, right: 30, bottom: 30, left: 20 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis dataKey="lag" stroke="#6b7280" fontSize={12}>
            <Label value="Lag" position="bottom" offset={15} style={{ fill: '#6b7280', fontSize: 12 }} />
          </XAxis>
          <YAxis domain={[-0.1, 0.45]} stroke="#6b7280" fontSize={12}>
            <Label value="ACF" angle={-90} position="left" offset={5} style={{ fill: '#6b7280', fontSize: 12 }} />
          </YAxis>
          <Tooltip
            contentStyle={{ fontSize: 12, borderRadius: 8 }}
            formatter={(value, name) => [
              typeof value === 'number' ? value.toFixed(4) : String(value),
              name === 'rawReturns' ? 'Raw Returns' : 'Squared Returns',
            ]}
          />
          <Legend
            verticalAlign="top"
            formatter={(value: string) => (
              value === 'rawReturns' ? 'Raw Returns r_t' : 'Squared Returns r_t^2'
            )}
          />
          {/* Confidence bands */}
          <ReferenceLine y={CONFIDENCE} stroke="#ef4444" strokeDasharray="6 4" strokeWidth={1} />
          <ReferenceLine y={-CONFIDENCE} stroke="#ef4444" strokeDasharray="6 4" strokeWidth={1} />
          <ReferenceLine y={0} stroke="#374151" strokeWidth={0.5} />
          <Bar dataKey="rawReturns" fill="#1B3A5C" fillOpacity={0.6} barSize={8} />
          <Bar dataKey="squaredReturns" fill="#D4A843" fillOpacity={0.8} barSize={8} />
        </BarChart>
      </ResponsiveContainer>
      <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
        <div className="flex items-center gap-1">
          <div className="w-6 h-0 border-t-2 border-dashed border-red-400" />
          95% confidence band (plus/minus {CONFIDENCE.toFixed(3)})
        </div>
      </div>
    </div>
  );
}
