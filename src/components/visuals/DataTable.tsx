'use client';

interface DataTableProps {
  headers: string[];
  rows: (string | number)[][];
  caption?: string;
  highlightRows?: number[];
  compareColumns?: number[];
}

function formatCell(value: string | number, isCompare: boolean): { text: string; className: string } {
  if (typeof value === 'number') {
    const formatted = Number.isInteger(value) ? value.toString() : value.toFixed(4);
    if (isCompare) {
      if (value < 0) return { text: formatted, className: 'text-red-600 font-medium' };
      if (value > 0) return { text: `+${formatted}`, className: 'text-green-600 font-medium' };
    }
    return { text: formatted, className: 'text-right font-mono' };
  }
  return { text: value, className: '' };
}

export function DataTable({ headers, rows, caption, highlightRows = [], compareColumns = [] }: DataTableProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      {caption && (
        <div className="px-4 py-3 border-b border-gray-100">
          <h4 className="text-sm font-semibold text-[#1B3A5C]">{caption}</h4>
        </div>
      )}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              {headers.map((h, i) => (
                <th key={i} className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, ri) => (
              <tr
                key={ri}
                className={`border-b border-gray-100 ${
                  highlightRows.includes(ri)
                    ? 'bg-amber-50 border-l-2 border-l-[#D4A843]'
                    : ri % 2 === 0
                    ? 'bg-white'
                    : 'bg-gray-50/50'
                }`}
              >
                {row.map((cell, ci) => {
                  const isCompare = compareColumns.includes(ci);
                  const { text, className } = formatCell(cell, isCompare);
                  return (
                    <td key={ci} className={`px-4 py-2.5 ${className}`}>
                      {text}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
