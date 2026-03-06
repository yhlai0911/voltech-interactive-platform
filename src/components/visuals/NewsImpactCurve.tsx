'use client';

import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Legend, Label,
} from 'recharts';

// Generate news impact curves for three models
// GARCH: symmetric V-shape  sigma^2 = omega + alpha * epsilon^2 + beta * sigma^2_{t-1}
// GJR:   asymmetric, steeper for negative  sigma^2 = omega + (alpha + gamma * I_{<0}) * epsilon^2 + beta * sigma^2
// EGARCH: most asymmetric  log(sigma^2) = omega + alpha * |z| + gamma * z + beta * log(sigma^2)

const omega = 0.00001;
const alpha_g = 0.08;
const beta_g = 0.88;
const prevSigma2 = 0.0004; // previous conditional variance

const alpha_gjr = 0.04;
const gamma_gjr = 0.10;

const omega_e = -0.3;
const alpha_e = 0.15;
const gamma_e = -0.08;
const beta_e = 0.97;
const prevLogSigma2 = Math.log(prevSigma2);

function generateData() {
  const points = [];
  for (let i = -40; i <= 40; i++) {
    const epsilon = i * 0.001; // shock from -0.04 to 0.04
    const eps2 = epsilon * epsilon;

    // GARCH(1,1): symmetric
    const garch = omega + alpha_g * eps2 + beta_g * prevSigma2;

    // GJR-GARCH: asymmetric
    const indicator = epsilon < 0 ? 1 : 0;
    const gjr = omega + (alpha_gjr + gamma_gjr * indicator) * eps2 + beta_g * prevSigma2;

    // EGARCH: most asymmetric
    const z = epsilon / Math.sqrt(prevSigma2);
    const logSigma2 = omega_e + alpha_e * Math.abs(z) + gamma_e * z + beta_e * prevLogSigma2;
    const egarch = Math.exp(logSigma2);

    points.push({
      shock: parseFloat((epsilon * 100).toFixed(2)), // as percentage
      GARCH: parseFloat((garch * 10000).toFixed(4)), // in bps
      'GJR-GARCH': parseFloat((gjr * 10000).toFixed(4)),
      EGARCH: parseFloat((egarch * 10000).toFixed(4)),
    });
  }
  return points;
}

const DATA = generateData();

export function NewsImpactCurve() {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
      <h3 className="font-bold text-[#1B3A5C] mb-1">News Impact Curve</h3>
      <p className="text-xs text-gray-500 mb-4">
        How positive and negative shocks affect conditional variance across different GARCH models
      </p>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={DATA} margin={{ top: 10, right: 30, bottom: 30, left: 20 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis dataKey="shock" stroke="#6b7280" fontSize={12} tickCount={9}>
            <Label value="News Shock (%, epsilon_t-1)" position="bottom" offset={15} style={{ fill: '#6b7280', fontSize: 12 }} />
          </XAxis>
          <YAxis stroke="#6b7280" fontSize={12}>
            <Label value="Conditional Variance (bps)" angle={-90} position="left" offset={5} style={{ fill: '#6b7280', fontSize: 12 }} />
          </YAxis>
          <Tooltip
            contentStyle={{ fontSize: 12, borderRadius: 8 }}
            formatter={(value) => [(typeof value === 'number' ? value.toFixed(4) : String(value)) + ' bps']}
            labelFormatter={(v) => `Shock: ${v}%`}
          />
          <Legend verticalAlign="top" />
          <Line
            type="monotone"
            dataKey="GARCH"
            stroke="#1B3A5C"
            strokeWidth={2.5}
            dot={false}
          />
          <Line
            type="monotone"
            dataKey="GJR-GARCH"
            stroke="#D4A843"
            strokeWidth={2.5}
            dot={false}
          />
          <Line
            type="monotone"
            dataKey="EGARCH"
            stroke="#C0392B"
            strokeWidth={2.5}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
      <div className="mt-3 text-xs text-gray-600 bg-gray-50 rounded-lg p-3">
        <strong>Key Insight:</strong> Negative shocks (bad news) produce larger variance increases than positive shocks of the same magnitude.
        GJR-GARCH and EGARCH capture this &quot;leverage effect&quot;, while standard GARCH is symmetric.
      </div>
    </div>
  );
}
