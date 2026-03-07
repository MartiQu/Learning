import { useState } from 'react';
import { motion } from 'framer-motion';
import type { MultipleChoiceData } from '../../types';
import { Button } from '../ui/Button';

interface Props {
  data: MultipleChoiceData;
  onAnswer: (answer: string) => void;
  disabled?: boolean;
  revealed?: string | null;
  selected?: string | null;
}

export function MultipleChoice({ data, onAnswer, disabled, revealed, selected }: Props) {
  const [picked, setPicked] = useState<string | null>(selected ?? null);

  const letterOf = (i: number) => ['A', 'B', 'C', 'D'][i] ?? '';

  const getStyle = (id: string) => {
    if (!revealed) {
      if (picked === id) return 'border-gold bg-gold/10 text-white';
      return 'border-white/10 hover:border-white/30 text-white/80 hover:text-white';
    }
    if (id === revealed) return 'border-teal bg-teal/15 text-teal';
    if (id === picked && picked !== revealed) return 'border-red-500 bg-red-500/10 text-red-400';
    return 'border-white/5 text-white/30';
  };

  return (
    <div className="space-y-3">
      {data.options.map((opt, i) => (
        <motion.button
          key={opt.id}
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.07 }}
          onClick={() => {
            if (disabled || revealed) return;
            setPicked(opt.id);
          }}
          className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl border transition-all duration-200 text-left cursor-pointer ${getStyle(opt.id)}`}
        >
          <span className="w-7 h-7 flex items-center justify-center rounded-lg text-sm font-bold bg-white/8 shrink-0">
            {letterOf(i)}
          </span>
          <span className="text-base">{opt.text}</span>
          {revealed && opt.id === revealed && <span className="ml-auto text-teal text-lg">✓</span>}
          {revealed && opt.id === picked && picked !== revealed && (
            <span className="ml-auto text-red-400 text-lg">✗</span>
          )}
        </motion.button>
      ))}

      {!revealed && (
        <div className="pt-2">
          <Button onClick={() => picked && onAnswer(picked)} disabled={!picked || disabled} fullWidth size="lg">
            Apstiprināt atbildi
          </Button>
        </div>
      )}
    </div>
  );
}
