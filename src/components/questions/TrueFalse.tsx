import { useState } from 'react';
import { motion } from 'framer-motion';
import type { TrueFalseData } from '../../types';
import { Button } from '../ui/Button';

interface Props {
  data: TrueFalseData;
  onAnswer: (answer: string) => void;
  disabled?: boolean;
  revealed?: string | null;
}

export function TrueFalse({ data, onAnswer, disabled, revealed }: Props) {
  const [picked, setPicked] = useState<'true' | 'false' | null>(null);

  const getStyle = (val: 'true' | 'false') => {
    if (revealed) {
      if (val === revealed) return 'border-teal bg-teal/15 text-teal scale-[1.02]';
      if (val === picked && val !== revealed) return 'border-red-500 bg-red-500/10 text-red-400 opacity-70';
      return 'border-white/5 text-white/30';
    }
    if (picked === val) return val === 'true' ? 'border-teal bg-teal/10 text-teal' : 'border-red-500 bg-red-500/10 text-red-400';
    return 'border-white/10 hover:border-white/30 text-white/80 hover:text-white';
  };

  return (
    <div className="space-y-4">
      <p className="text-white/70 text-base italic leading-relaxed bg-white/4 px-4 py-3 rounded-xl border border-white/8">
        "{data.statement}"
      </p>

      <div className="grid grid-cols-2 gap-4">
        {(['true', 'false'] as const).map((val, i) => (
          <motion.button
            key={val}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            onClick={() => {
              if (disabled || revealed) return;
              setPicked(val);
            }}
            className={`flex flex-col items-center justify-center gap-2 py-8 rounded-2xl border text-xl font-semibold transition-all duration-200 cursor-pointer ${getStyle(val)}`}
          >
            <span className="text-4xl">{val === 'true' ? '✓' : '✗'}</span>
            {val === 'true' ? 'Patiess' : 'Nepatiess'}
          </motion.button>
        ))}
      </div>

      {!revealed && (
        <Button onClick={() => picked && onAnswer(picked)} disabled={!picked || disabled} fullWidth size="lg">
          Apstiprināt atbildi
        </Button>
      )}
    </div>
  );
}
