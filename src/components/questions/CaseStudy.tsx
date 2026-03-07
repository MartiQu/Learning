import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { CaseStudyData } from '../../types';
import { Button } from '../ui/Button';

interface Props {
  data: CaseStudyData;
  onAnswer: (answer: string) => void;
  disabled?: boolean;
  revealed?: string | null;
}

export function CaseStudy({ data, onAnswer, disabled, revealed }: Props) {
  const [picked, setPicked] = useState<string | null>(null);
  const [showConsequence, setShowConsequence] = useState(false);

  const handleConfirm = () => {
    if (!picked) return;
    setShowConsequence(true);
    onAnswer(picked);
  };

  const getOptionStyle = (id: string) => {
    if (!revealed) {
      if (picked === id) return 'border-gold bg-gold/10 text-white';
      return 'border-white/10 hover:border-white/30 text-white/80 hover:text-white';
    }
    if (id === revealed) return 'border-teal bg-teal/15 text-white';
    if (id === picked && id !== revealed) return 'border-orange-400 bg-orange-400/10 text-orange-300 opacity-70';
    return 'border-white/5 text-white/30 opacity-40';
  };

  return (
    <div className="space-y-4">
      {/* Scenario */}
      <div className="bg-white/4 border border-white/10 rounded-2xl p-4">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs font-semibold tracking-widest text-gold uppercase">Situācija</span>
        </div>
        <p className="text-white/80 leading-relaxed">{data.scenario}</p>
      </div>

      {/* Options */}
      <div className="space-y-2">
        <p className="text-white/50 text-sm">Izvēlies labāko rīcību:</p>
        {data.options.map((opt, i) => (
          <motion.div key={opt.id} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.08 }}>
            <button
              onClick={() => {
                if (disabled || revealed) return;
                setPicked(opt.id);
              }}
              className={`w-full text-left px-4 py-3.5 rounded-xl border transition-all duration-200 cursor-pointer ${getOptionStyle(opt.id)}`}
            >
              <div className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full border border-current flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                  {i + 1}
                </span>
                <span>{opt.text}</span>
              </div>
            </button>

            {/* Consequence reveal */}
            <AnimatePresence>
              {showConsequence && (revealed === opt.id || picked === opt.id) && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className={`mt-1 px-4 py-3 rounded-xl text-sm leading-relaxed ${opt.id === revealed ? 'bg-teal/10 text-teal/90 border border-teal/25' : 'bg-orange-500/10 text-orange-300 border border-orange-500/25'}`}
                >
                  <span className="font-semibold">{opt.id === revealed ? 'Labākā izvēle: ' : 'Sekas: '}</span>
                  {opt.consequence}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>

      {!revealed && (
        <Button onClick={handleConfirm} disabled={!picked || disabled} fullWidth size="lg">
          Pieņemt lēmumu
        </Button>
      )}
    </div>
  );
}
