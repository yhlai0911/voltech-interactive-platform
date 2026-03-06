'use client';

import {
  AreaChart, Area, XAxis, YAxis, ResponsiveContainer,
} from 'recharts';

// GARCH(1,1) parameters
const PARAMS = {
  omega: 0.0000021,
  alpha: 0.082,
  beta: 0.891,
};

const persistence = PARAMS.alpha + PARAMS.beta;
const halfLife = Math.log(2) / Math.log(persistence);
const unconditionalVar = PARAMS.omega / (1 - persistence);
const unconditionalVol = Math.sqrt(unconditionalVar) * Math.sqrt(252) * 100; // annualized %

// Small embedded volatility chart data
const MINI_VOL_DATA = Array.from({ length: 60 }, (_, i) => {
  let vol = 1.2;
  if (i > 15 && i < 30) vol = 2.8;
  if (i > 35 && i < 45) vol = 1.8;
  const seed = Math.sin(i * 127.1 + 311.7) * 43758.5453;
  const noise = (seed - Math.floor(seed) - 0.5) * 0.3;
  return { day: i, vol: parseFloat((vol + noise).toFixed(3)) };
});

function ParameterCard({ label, value, description, color }: {
  label: string; value: string; description: string; color: string;
}) {
  return (
    <div className="bg-gray-50 rounded-lg p-3 border border-gray-100">
      <div className="flex items-center justify-between mb-1">
        <span className="text-xs font-mono text-gray-500">{label}</span>
        <span className="text-lg font-bold" style={{ color }}>{value}</span>
      </div>
      <p className="text-xs text-gray-500">{description}</p>
    </div>
  );
}

export function GARCHVolatilityDashboard() {
  const persistencePct = (persistence * 100).toFixed(1);

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
      <h3 className="font-bold text-[#1B3A5C] mb-1">GARCH(1,1) Parameter Dashboard</h3>
      <p className="text-xs text-gray-500 mb-4">
        Key parameters and their implications for volatility dynamics
      </p>

      {/* Parameters grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-5">
        <ParameterCard
          label="omega"
          value={PARAMS.omega.toExponential(2)}
          description="Variance constant (base level)"
          color="#1B3A5C"
        />
        <ParameterCard
          label="alpha"
          value={PARAMS.alpha.toFixed(3)}
          description="ARCH effect (shock impact)"
          color="#D4A843"
        />
        <ParameterCard
          label="beta"
          value={PARAMS.beta.toFixed(3)}
          description="GARCH effect (persistence)"
          color="#C0392B"
        />
        <ParameterCard
          label="alpha + beta"
          value={persistence.toFixed(3)}
          description="Persistence of volatility"
          color="#1B3A5C"
        />
        <ParameterCard
          label="Half-life"
          value={`${halfLife.toFixed(1)} days`}
          description="Time to decay by 50%"
          color="#D4A843"
        />
        <ParameterCard
          label="Uncond. Vol"
          value={`${unconditionalVol.toFixed(1)}% ann.`}
          description="Long-run annualized volatility"
          color="#2D7D5E"
        />
      </div>

      {/* Persistence meter */}
      <div className="mb-5">
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs font-semibold text-gray-600">Volatility Persistence</span>
          <span className="text-xs font-mono text-gray-500">{persistencePct}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
          <div
            className="h-full rounded-full transition-all"
            style={{
              width: `${persistence * 100}%`,
              backgroundColor: persistence > 0.99 ? '#dc2626' : persistence > 0.95 ? '#D4A843' : '#16a34a',
            }}
          />
        </div>
        <div className="flex justify-between mt-1 text-xs text-gray-400">
          <span>0% (no persistence)</span>
          <span>100% (IGARCH)</span>
        </div>
      </div>

      {/* Mini volatility chart */}
      <div className="bg-gray-50 rounded-lg p-3 border border-gray-100">
        <span className="text-xs font-semibold text-gray-600 mb-2 block">Conditional Volatility (60-day sample)</span>
        <ResponsiveContainer width="100%" height={120}>
          <AreaChart data={MINI_VOL_DATA} margin={{ top: 5, right: 5, bottom: 0, left: 0 }}>
            <XAxis dataKey="day" hide />
            <YAxis hide domain={[0, 3.5]} />
            <Area
              type="monotone"
              dataKey="vol"
              stroke="#1B3A5C"
              fill="#1B3A5C"
              fillOpacity={0.15}
              strokeWidth={1.5}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Interpretation */}
      <div className="mt-4 text-xs text-gray-600 bg-blue-50 rounded-lg p-3 border border-blue-100">
        <strong>Interpretation:</strong> With persistence of {persistence.toFixed(3)},
        volatility shocks decay slowly (half-life: {halfLife.toFixed(1)} days).
        Alpha ({PARAMS.alpha}) captures the immediate impact of new information,
        while beta ({PARAMS.beta}) represents the carry-over of past volatility.
      </div>
    </div>
  );
}
