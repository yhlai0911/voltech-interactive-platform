'use client';

interface CodeDisplayProps {
  code: string;
  language?: string;
  output?: string;
  title?: string;
}

function highlightSyntax(code: string): string {
  const keywords = /\b(import|from|def|class|return|if|elif|else|for|while|in|not|and|or|is|None|True|False|with|as|try|except|raise|print|lambda|yield|pass|break|continue)\b/g;

  let result = code
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

  const tokens: { start: number; end: number; replacement: string }[] = [];

  let match: RegExpExecArray | null;

  // Comments first (highest priority)
  const commentRegex = /#.*/g;
  while ((match = commentRegex.exec(result)) !== null) {
    tokens.push({
      start: match.index,
      end: match.index + match[0].length,
      replacement: `<span class="text-gray-500 italic">${match[0]}</span>`,
    });
  }

  // Strings
  const stringRegex = /(["'`])(?:(?!\1|\\).|\\.)*\1/g;
  while ((match = stringRegex.exec(result)) !== null) {
    if (!tokens.some(t => match!.index >= t.start && match!.index < t.end)) {
      tokens.push({
        start: match.index,
        end: match.index + match[0].length,
        replacement: `<span class="text-green-400">${match[0]}</span>`,
      });
    }
  }

  // Sort by position descending so replacements don't shift indices
  tokens.sort((a, b) => b.start - a.start);
  for (const t of tokens) {
    result = result.slice(0, t.start) + t.replacement + result.slice(t.end);
  }

  // Keywords
  result = result.replace(keywords, (m) => {
    return `<span class="text-purple-400 font-bold">${m}</span>`;
  });

  // Numbers (avoid matching inside spans)
  result = result.replace(/(?<!["\w#])(\b\d+(\.\d+)?\b)(?![^<]*>)/g, (m) => {
    return `<span class="text-orange-300">${m}</span>`;
  });

  return result;
}

export function CodeDisplay({ code, language = 'python', output, title }: CodeDisplayProps) {
  const lines = code.split('\n');

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      {title && (
        <div className="bg-gray-800 px-4 py-2 flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
          </div>
          <span className="text-xs text-gray-400 ml-2">{title}</span>
          <span className="text-xs text-gray-600 ml-auto">{language}</span>
        </div>
      )}
      <div className="bg-gray-900 p-4 overflow-x-auto">
        <pre className="text-sm leading-relaxed">
          {lines.map((line, i) => (
            <div key={i} className="flex">
              <span className="text-gray-600 select-none w-8 text-right mr-4 flex-shrink-0">
                {i + 1}
              </span>
              <code
                className="text-gray-100"
                dangerouslySetInnerHTML={{ __html: highlightSyntax(line) }}
              />
            </div>
          ))}
        </pre>
      </div>
      {output && (
        <div className="bg-gray-800 border-t border-gray-700 p-4">
          <div className="text-xs text-gray-500 mb-1">Output:</div>
          <pre className="text-sm text-green-400 whitespace-pre-wrap">{output}</pre>
        </div>
      )}
    </div>
  );
}
