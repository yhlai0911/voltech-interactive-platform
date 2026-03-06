'use client';

import { motion } from 'framer-motion';
import katex from 'katex';
import { BRAND } from '@/components/brand/BrandColors';

interface FormulaRevealProps {
  formula: string;
  title?: string;
}

export default function FormulaReveal({ formula, title }: FormulaRevealProps) {
  // SAFE: KaTeX sanitizes its own output internally. Formula strings are
  // developer-controlled constants (from lesson data files), never user input.
  const html = katex.renderToString(formula, { throwOnError: false, displayMode: true });

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="rounded-xl border-2 bg-white p-6 text-center shadow-sm"
      style={{ borderColor: BRAND.accent }}
    >
      {title && (
        <h4
          className="mb-3 text-sm font-semibold uppercase tracking-wider"
          style={{ color: BRAND.primary }}
        >
          {title}
        </h4>
      )}
      {/* SAFE: KaTeX sanitizes output; formula is a trusted developer constant */}
      <div
        className="overflow-x-auto"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </motion.div>
  );
}
