'use client';

import { useMemo } from 'react';
import {
  ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip,
  ReferenceLine, ResponsiveContainer, Label,
} from 'recharts';

function normalQuantile(p: number): number {
  // Rational approximation for the standard normal quantile (Abramowitz & Stegun)
  if (p <= 0 || p >= 1) return 0;
  const t = Math.sqrt(-2 * Math.log(p < 0.5 ? p : 1 - p));
  const c0 = 2.515517, c1 = 0.802853, c2 = 0.010328;
  const d1 = 1.432788, d2 = 0.189269, d3 = 0.001308;
  let q = t - (c0 + c1 * t + c2 * t * t) / (1 + d1 * t + d2 * t * t + d3 * t * t * t);
  return p < 0.5 ? -q : q;
}

function generateQQData(n: number = 50) {
  // Generate samples from a fat-tailed distribution (t-distribution like)
  const samples: number[] = [];
  for (let i = 0; i < n; i++) {
    // Box-Muller for normal, then apply transformation for fat tails
    const u1 = Math.random();
    const u2 = Math.random();
    const z = Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
    // Simulate fat tails by using a t-distribution-like transform
    const df = 4; // degrees of freedom
    const chi2 = Array.from({ length: df }, () => {
      const u = Math.random();
      const v = Math.random();
      return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
    }).reduce((s, x) => s + x * x, 0);
    samples.push(z / Math.sqrt(chi2 / df) * 1.2);
  }
  samples.sort((a, b) => a - b);

  return samples.map((s, i) => {
    const p = (i + 0.5) / n;
    return {
      theoretical: parseFloat(normalQuantile(p).toFixed(3)),
      sample: parseFloat(s.toFixed(3)),
    };
  });
}

// Use deterministic seed-like data for consistency
const STATIC_DATA = [
  { theoretical: -2.576, sample: -4.2 },
  { theoretical: -2.326, sample: -3.6 },
  { theoretical: -2.054, sample: -3.1 },
  { theoretical: -1.881, sample: -2.7 },
  { theoretical: -1.751, sample: -2.4 },
  { theoretical: -1.645, sample: -2.15 },
  { theoretical: -1.555, sample: -1.95 },
  { theoretical: -1.476, sample: -1.78 },
  { theoretical: -1.405, sample: -1.62 },
  { theoretical: -1.341, sample: -1.48 },
  { theoretical: -1.282, sample: -1.36 },
  { theoretical: -1.227, sample: -1.25 },
  { theoretical: -1.175, sample: -1.16 },
  { theoretical: -1.126, sample: -1.08 },
  { theoretical: -1.080, sample: -1.01 },
  { theoretical: -1.036, sample: -0.95 },
  { theoretical: -0.994, sample: -0.89 },
  { theoretical: -0.954, sample: -0.84 },
  { theoretical: -0.915, sample: -0.79 },
  { theoretical: -0.878, sample: -0.74 },
  { theoretical: -0.842, sample: -0.68 },
  { theoretical: -0.706, sample: -0.55 },
  { theoretical: -0.553, sample: -0.42 },
  { theoretical: -0.385, sample: -0.30 },
  { theoretical: -0.253, sample: -0.20 },
  { theoretical: -0.126, sample: -0.10 },
  { theoretical: 0.000, sample: 0.02 },
  { theoretical: 0.126, sample: 0.11 },
  { theoretical: 0.253, sample: 0.21 },
  { theoretical: 0.385, sample: 0.31 },
  { theoretical: 0.553, sample: 0.43 },
  { theoretical: 0.706, sample: 0.56 },
  { theoretical: 0.842, sample: 0.69 },
  { theoretical: 0.878, sample: 0.75 },
  { theoretical: 0.915, sample: 0.80 },
  { theoretical: 0.954, sample: 0.86 },
  { theoretical: 0.994, sample: 0.91 },
  { theoretical: 1.036, sample: 0.97 },
  { theoretical: 1.080, sample: 1.03 },
  { theoretical: 1.126, sample: 1.10 },
  { theoretical: 1.175, sample: 1.18 },
  { theoretical: 1.227, sample: 1.28 },
  { theoretical: 1.282, sample: 1.39 },
  { theoretical: 1.341, sample: 1.52 },
  { theoretical: 1.405, sample: 1.66 },
  { theoretical: 1.476, sample: 1.82 },
  { theoretical: 1.555, sample: 2.00 },
  { theoretical: 1.645, sample: 2.22 },
  { theoretical: 1.751, sample: 2.50 },
  { theoretical: 1.881, sample: 2.80 },
  { theoretical: 2.054, sample: 3.20 },
  { theoretical: 2.326, sample: 3.80 },
  { theoretical: 2.576, sample: 4.50 },
];

export function QQPlotDisplay() {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
      <h3 className="font-bold text-[#1B3A5C] mb-1">QQ Plot: Sample vs Normal Distribution</h3>
      <p className="text-xs text-gray-500 mb-4">
        S-curve deviation from the 45-degree line indicates fat tails (leptokurtosis)
      </p>
      <ResponsiveContainer width="100%" height={400}>
        <ScatterChart margin={{ top: 10, right: 30, bottom: 30, left: 20 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis
            type="number"
            dataKey="theoretical"
            domain={[-3, 3]}
            tickCount={7}
            stroke="#6b7280"
            fontSize={12}
          >
            <Label value="Theoretical Quantiles (Normal)" position="bottom" offset={15} style={{ fill: '#6b7280', fontSize: 12 }} />
          </XAxis>
          <YAxis
            type="number"
            dataKey="sample"
            domain={[-5, 5]}
            tickCount={7}
            stroke="#6b7280"
            fontSize={12}
          >
            <Label value="Sample Quantiles" angle={-90} position="left" offset={5} style={{ fill: '#6b7280', fontSize: 12 }} />
          </YAxis>
          <Tooltip
            formatter={(value, name) => [typeof value === 'number' ? value.toFixed(3) : String(value), name === 'sample' ? 'Sample' : 'Theoretical']}
            contentStyle={{ fontSize: 12, borderRadius: 8 }}
          />
          <ReferenceLine
            segment={[{ x: -3, y: -3 }, { x: 3, y: 3 }]}
            stroke="#9ca3af"
            strokeDasharray="6 4"
            strokeWidth={1.5}
          />
          <Scatter
            data={STATIC_DATA}
            fill="#1B3A5C"
            fillOpacity={0.7}
            r={4}
          />
        </ScatterChart>
      </ResponsiveContainer>
      <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded-full bg-[#1B3A5C]" />
          Sample data points
        </div>
        <div className="flex items-center gap-1">
          <div className="w-6 h-0 border-t-2 border-dashed border-gray-400" />
          45-degree reference line
        </div>
      </div>
    </div>
  );
}
