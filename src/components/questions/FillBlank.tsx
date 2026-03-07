import { useState } from 'react';
import { motion } from 'framer-motion';
import type { FillBlankData } from '../../types';
import { Button } from '../ui/Button';

interface Props {
  data: FillBlankData;
  onAnswer: (answer: string) => void;
  disabled?: boolean;
  revealed?: string | null;
}

export function FillBlank({ data, onAnswer, disabled, revealed }: Props) {
  const [value, setValue] = useState('');

  const isCorrect = revealed && value.trim().toLowerCase() === revealed.toLowerCase();

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-5"
    >
      <div className="bg-white/4 rounded-2xl border border-white/8 px-5 py-5">
        <p className="text-white/80 text-lg leading-relaxed flex flex-wrap items-center gap-1">
          <span>{data.before}</span>
          <span className="relative inline-flex items-center">
            <input
              type="text"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && value.trim() && !disabled && !revealed) {
                  onAnswer(value.trim());
                }
              }}
              disabled={!!disabled || !!revealed}
              placeholder="raksti šeit..."
              className={`
                min-w-[140px] w-[200px] px-3 py-1.5 rounded-lg border text-center font-semibold text-base outline-none transition-colors
                ${revealed
                  ? isCorrect
                    ? 'bg-teal/15 border-teal text-teal'
                    : 'bg-red-500/10 border-red-500 text-red-400'
                  : 'bg-white/8 border-white/20 focus:border-gold text-white placeholder-white/30'
                }
              `}
            />
          </span>
          <span>{data.after}</span>
        </p>
      </div>

      {revealed && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className={`px-4 py-3 rounded-xl text-sm font-medium ${isCorrect ? 'bg-teal/10 text-teal border border-teal/30' : 'bg-red-500/10 text-red-400 border border-red-500/30'}`}
        >
          {isCorrect ? `Pareizi! Atbilde: "${revealed}"` : `Pareizā atbilde: "${revealed}"`}
        </motion.div>
      )}

      {!revealed && (
        <Button onClick={() => value.trim() && onAnswer(value.trim())} disabled={!value.trim() || disabled} fullWidth size="lg">
          Apstiprināt atbildi
        </Button>
      )}
    </motion.div>
  );
}
