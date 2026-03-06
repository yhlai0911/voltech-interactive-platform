'use client';

import { useMemo } from 'react';
import katex from 'katex';
import 'katex/dist/katex.min.css';

interface Props {
  math: string;
  display?: boolean;  // true = block (centered), false = inline
  className?: string;
}

/**
 * Renders LaTeX math using KaTeX.
 * Safe: KaTeX only produces math markup from its own renderer — it does not
 * pass through arbitrary HTML. The input `math` comes from our own static
 * data files (src/data/formulas/), not from user input.
 */
export function LaTeX({ math, display = false, className = '' }: Props) {
  const html = useMemo(() => {
    try {
      return katex.renderToString(math, {
        displayMode: display,
        throwOnError: false,
        trust: false,  // disallow \url, \href etc.
      });
    } catch {
      return `<code>${math.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code>`;
    }
  }, [math, display]);

  // KaTeX.renderToString produces safe math markup only — no arbitrary HTML injection.
  // eslint-disable-next-line react/no-danger
  return (
    <span
      className={className}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
