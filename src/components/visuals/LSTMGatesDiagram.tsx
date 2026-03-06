'use client';

const GATE_COLORS = {
  forget: { fill: '#ef4444', stroke: '#dc2626', label: 'Forget Gate' },
  input: { fill: '#3b82f6', stroke: '#2563eb', label: 'Input Gate' },
  cell: { fill: '#22c55e', stroke: '#16a34a', label: 'Cell State' },
  output: { fill: '#a855f7', stroke: '#9333ea', label: 'Output Gate' },
};

export function LSTMGatesDiagram() {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
      <h3 className="font-bold text-[#1B3A5C] mb-1">LSTM Cell Architecture</h3>
      <p className="text-xs text-gray-500 mb-4">
        Long Short-Term Memory cell with four key components controlling information flow
      </p>

      <div className="flex justify-center">
        <svg viewBox="0 0 600 400" className="w-full max-w-[600px]" style={{ height: 'auto', maxHeight: 400 }}>
          {/* Background */}
          <rect x="80" y="60" width="440" height="280" rx="16" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="2" />
          <text x="300" y="45" textAnchor="middle" className="text-xs" fill="#94a3b8" fontSize="11">LSTM Cell</text>

          {/* Cell State line (top) */}
          <line x1="20" y1="120" x2="580" y2="120" stroke="#22c55e" strokeWidth="3" />
          <text x="40" y="108" fill="#16a34a" fontSize="10" fontWeight="bold">C_t-1</text>
          <text x="545" y="108" fill="#16a34a" fontSize="10" fontWeight="bold">C_t</text>
          {/* Arrow heads on cell state */}
          <polygon points="575,120 565,115 565,125" fill="#22c55e" />

          {/* Hidden state line (bottom) */}
          <line x1="20" y1="300" x2="580" y2="300" stroke="#6366f1" strokeWidth="2.5" />
          <text x="40" y="318" fill="#6366f1" fontSize="10" fontWeight="bold">h_t-1</text>
          <text x="545" y="318" fill="#6366f1" fontSize="10" fontWeight="bold">h_t</text>
          <polygon points="575,300 565,295 565,305" fill="#6366f1" />

          {/* Input x_t */}
          <line x1="300" y1="380" x2="300" y2="340" stroke="#64748b" strokeWidth="2" />
          <text x="300" y="395" textAnchor="middle" fill="#475569" fontSize="11" fontWeight="bold">x_t</text>
          <polygon points="300,345 295,355 305,355" fill="#64748b" />

          {/* ---- Forget Gate ---- */}
          <circle cx="180" cy="120" r="16" fill="white" stroke={GATE_COLORS.forget.stroke} strokeWidth="2.5" />
          <text x="180" y="125" textAnchor="middle" fill={GATE_COLORS.forget.stroke} fontSize="16" fontWeight="bold">x</text>
          {/* Gate box */}
          <rect x="145" y="220" width="70" height="35" rx="6" fill={GATE_COLORS.forget.fill} fillOpacity="0.15" stroke={GATE_COLORS.forget.stroke} strokeWidth="2" />
          <text x="180" y="242" textAnchor="middle" fill={GATE_COLORS.forget.stroke} fontSize="12" fontWeight="bold">sigma</text>
          <text x="180" y="275" textAnchor="middle" fill={GATE_COLORS.forget.stroke} fontSize="9">f_t</text>
          {/* Connection forget gate to multiply */}
          <line x1="180" y1="220" x2="180" y2="136" stroke={GATE_COLORS.forget.stroke} strokeWidth="1.5" strokeDasharray="4 3" />

          {/* ---- Input Gate ---- */}
          <circle cx="300" cy="120" r="16" fill="white" stroke={GATE_COLORS.input.stroke} strokeWidth="2.5" />
          <text x="300" y="125" textAnchor="middle" fill={GATE_COLORS.input.stroke} fontSize="16" fontWeight="bold">+</text>
          {/* Gate box - sigmoid */}
          <rect x="255" y="190" width="45" height="30" rx="6" fill={GATE_COLORS.input.fill} fillOpacity="0.15" stroke={GATE_COLORS.input.stroke} strokeWidth="2" />
          <text x="277" y="210" textAnchor="middle" fill={GATE_COLORS.input.stroke} fontSize="11" fontWeight="bold">sigma</text>
          <text x="277" y="232" textAnchor="middle" fill={GATE_COLORS.input.stroke} fontSize="9">i_t</text>
          {/* Gate box - tanh */}
          <rect x="310" y="190" width="45" height="30" rx="6" fill={GATE_COLORS.cell.fill} fillOpacity="0.15" stroke={GATE_COLORS.cell.stroke} strokeWidth="2" />
          <text x="332" y="210" textAnchor="middle" fill={GATE_COLORS.cell.stroke} fontSize="11" fontWeight="bold">tanh</text>
          <text x="332" y="232" textAnchor="middle" fill={GATE_COLORS.cell.stroke} fontSize="9">C~_t</text>
          {/* Multiply symbol between i_t and C~_t */}
          <circle cx="305" cy="160" r="10" fill="white" stroke="#64748b" strokeWidth="1.5" />
          <text x="305" y="164" textAnchor="middle" fill="#64748b" fontSize="12" fontWeight="bold">x</text>
          {/* Connections */}
          <line x1="277" y1="190" x2="295" y2="170" stroke={GATE_COLORS.input.stroke} strokeWidth="1.5" strokeDasharray="4 3" />
          <line x1="332" y1="190" x2="315" y2="170" stroke={GATE_COLORS.cell.stroke} strokeWidth="1.5" strokeDasharray="4 3" />
          <line x1="305" y1="150" x2="300" y2="136" stroke="#64748b" strokeWidth="1.5" strokeDasharray="4 3" />

          {/* ---- Output Gate ---- */}
          <circle cx="440" cy="300" r="16" fill="white" stroke={GATE_COLORS.output.stroke} strokeWidth="2.5" />
          <text x="440" y="305" textAnchor="middle" fill={GATE_COLORS.output.stroke} fontSize="16" fontWeight="bold">x</text>
          {/* Gate box */}
          <rect x="395" y="210" width="70" height="35" rx="6" fill={GATE_COLORS.output.fill} fillOpacity="0.15" stroke={GATE_COLORS.output.stroke} strokeWidth="2" />
          <text x="430" y="232" textAnchor="middle" fill={GATE_COLORS.output.stroke} fontSize="12" fontWeight="bold">sigma</text>
          <text x="430" y="265" textAnchor="middle" fill={GATE_COLORS.output.stroke} fontSize="9">o_t</text>
          {/* tanh on cell state */}
          <rect x="460" y="100" width="50" height="25" rx="6" fill={GATE_COLORS.cell.fill} fillOpacity="0.15" stroke={GATE_COLORS.cell.stroke} strokeWidth="1.5" />
          <text x="485" y="117" textAnchor="middle" fill={GATE_COLORS.cell.stroke} fontSize="10">tanh</text>
          {/* Connection from output gate */}
          <line x1="430" y1="210" x2="440" y2="284" stroke={GATE_COLORS.output.stroke} strokeWidth="1.5" strokeDasharray="4 3" />
          {/* Connection from tanh(C_t) to output multiply */}
          <line x1="485" y1="125" x2="485" y2="260" stroke={GATE_COLORS.cell.stroke} strokeWidth="1.5" strokeDasharray="4 3" />
          <line x1="485" y1="260" x2="456" y2="295" stroke={GATE_COLORS.cell.stroke} strokeWidth="1.5" strokeDasharray="4 3" />
        </svg>
      </div>

      {/* Legend */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-4">
        {Object.entries(GATE_COLORS).map(([key, val]) => (
          <div key={key} className="flex items-center gap-2 text-xs">
            <div className="w-4 h-4 rounded" style={{ backgroundColor: val.fill, opacity: 0.7 }} />
            <div>
              <div className="font-semibold" style={{ color: val.stroke }}>{val.label}</div>
              <div className="text-gray-500">
                {key === 'forget' && 'What to discard'}
                {key === 'input' && 'What to store'}
                {key === 'cell' && 'Long-term memory'}
                {key === 'output' && 'What to output'}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-3 text-xs text-gray-600 bg-purple-50 rounded-lg p-3 border border-purple-100">
        <strong>Data Flow:</strong> Input (x_t) and previous hidden state (h_t-1) pass through three gates.
        The forget gate decides what old information to discard, the input gate decides what new information to store,
        and the output gate determines what the cell outputs. This gating mechanism solves the vanishing gradient problem.
      </div>
    </div>
  );
}
