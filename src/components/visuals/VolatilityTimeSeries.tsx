'use client';

import {
  ComposedChart, Area, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Legend, Label,
} from 'recharts';

interface VolatilityTimeSeriesProps {
  models?: string[];
  showReturns?: boolean;
}

// Generate ~250 data points simulating 1 year of daily data with volatility clustering
function generateData() {
  const n = 250;
  const data = [];
  let garchVol = 0.015;
  let gjrVol = 0.015;
  let egarchVol = 0.015;

  const omega = 0.000002;
  const alphaG = 0.08;
  const betaG = 0.88;
  const gammaGJR = 0.10;
  const alphaGJR = 0.03;

  for (let i = 0; i < n; i++) {
    // Simulate return with time-varying volatility and clustering
    const phase = i / n;
    let baseVol = 0.01;
    // Create volatility clusters
    if (i > 50 && i < 80) baseVol = 0.035; // crisis period
    if (i > 140 && i < 160) baseVol = 0.025; // moderate stress
    if (i > 200 && i < 220) baseVol = 0.03; // year-end volatility

    // Deterministic pseudo-random using sine
    const seed = Math.sin(i * 127.1 + 311.7) * 43758.5453;
    const rand = seed - Math.floor(seed);
    const z = (rand - 0.5) * 3.5;

    const ret = z * baseVol;

    // GARCH update
    garchVol = Math.sqrt(omega + alphaG * ret * ret + betaG * garchVol * garchVol);

    // GJR update (asymmetric - bigger response to negative returns)
    const indicator = ret < 0 ? 1 : 0;
    gjrVol = Math.sqrt(omega + (alphaGJR + gammaGJR * indicator) * ret * ret + betaG * gjrVol * gjrVol);

    // EGARCH-like update
    const absZ = Math.abs(ret / garchVol);
    const logVol = Math.log(egarchVol * egarchVol);
    const newLogVol = -0.15 + 0.12 * absZ + (-0.06) * (ret / garchVol) + 0.97 * logVol;
    egarchVol = Math.sqrt(Math.exp(newLogVol));

    const month = Math.floor(i / 21) + 1;
    const day = (i % 21) + 1;

    data.push({
      date: `M${month}-D${day}`,
      return: parseFloat((ret * 100).toFixed(3)),
      GARCH: parseFloat((garchVol * 100).toFixed(3)),
      'GJR-GARCH': parseFloat((gjrVol * 100).toFixed(3)),
      EGARCH: parseFloat((egarchVol * 100).toFixed(3)),
    });
  }
  return data;
}

const DATA = generateData();

const MODEL_COLORS: Record<string, string> = {
  GARCH: '#1B3A5C',
  'GJR-GARCH': '#D4A843',
  EGARCH: '#C0392B',
};

export function VolatilityTimeSeries({ models = ['GARCH', 'GJR-GARCH', 'EGARCH'], showReturns = true }: VolatilityTimeSeriesProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
      <h3 className="font-bold text-[#1B3A5C] mb-1">Conditional Volatility Time Series</h3>
      <p className="text-xs text-gray-500 mb-4">
        Daily conditional volatility estimates from multiple GARCH-family models
      </p>
      <ResponsiveContainer width="100%" height={400}>
        <ComposedChart data={DATA} margin={{ top: 10, right: 30, bottom: 30, left: 20 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis
            dataKey="date"
            stroke="#6b7280"
            fontSize={10}
            interval={49}
          >
            <Label value="Trading Days" position="bottom" offset={15} style={{ fill: '#6b7280', fontSize: 12 }} />
          </XAxis>
          <YAxis yAxisId="vol" stroke="#6b7280" fontSize={12}>
            <Label value="Volatility (%)" angle={-90} position="left" offset={5} style={{ fill: '#6b7280', fontSize: 12 }} />
          </YAxis>
          {showReturns && (
            <YAxis yAxisId="ret" orientation="right" stroke="#9ca3af" fontSize={12}>
              <Label value="Return (%)" angle={90} position="right" offset={5} style={{ fill: '#9ca3af', fontSize: 12 }} />
            </YAxis>
          )}
          <Tooltip
            contentStyle={{ fontSize: 11, borderRadius: 8 }}
            formatter={(value, name) => [(typeof value === 'number' ? value.toFixed(3) : String(value)) + '%', name]}
          />
          <Legend verticalAlign="top" />
          {showReturns && (
            <Bar
              yAxisId="ret"
              dataKey="return"
              fill="#d1d5db"
              fillOpacity={0.5}
              barSize={2}
              name="Return"
            />
          )}
          {models.map((model) => (
            <Area
              key={model}
              yAxisId="vol"
              type="monotone"
              dataKey={model}
              stroke={MODEL_COLORS[model] || '#666'}
              fill={MODEL_COLORS[model] || '#666'}
              fillOpacity={0.08}
              strokeWidth={1.5}
              dot={false}
            />
          ))}
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}
