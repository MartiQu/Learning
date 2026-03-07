import { useState } from 'react';
import { motion } from 'framer-motion';
import type { MatchingData } from '../../types';
import { Button } from '../ui/Button';

interface Props {
  data: MatchingData;
  onAnswer: (answer: Record<string, string>) => void;
  disabled?: boolean;
  revealed?: Record<string, string> | null;
}

const PAIR_COLORS = ['#e8c547', '#7c6fff', '#4ecdc4', '#ff6b6b'];

export function Matching({ data, onAnswer, disabled, revealed }: Props) {
  const [selectedLeft, setSelectedLeft] = useState<string | null>(null);
  const [pairs, setPairs] = useState<Record<string, string>>({});

  const usedRight = new Set(Object.values(pairs));

  const handleLeftClick = (id: string) => {
    if (disabled || revealed) return;
    setSelectedLeft(id === selectedLeft ? null : id);
  };

  const handleRightClick = (id: string) => {
    if (disabled || revealed || !selectedLeft) return;
    setPairs((prev) => {
      const updated = { ...prev };
      Object.keys(updated).forEach((lk) => {
        if (updated[lk] === id) delete updated[lk];
      });
      updated[selectedLeft] = id;
      return updated;
    });
    setSelectedLeft(null);
  };

  const allPaired = Object.keys(pairs).length === data.left.length;

  const getPairColorIndex = (leftId: string): number => {
    return data.left.findIndex((l) => l.id === leftId);
  };

  const getLeftStyle = (id: string) => {
    const paired = id in pairs;
    if (revealed) {
      const isCorrect = revealed[id] === pairs[id];
      if (isCorrect) return 'border-teal bg-teal/15 text-teal';
      if (id in pairs) return 'border-red-500 bg-red-500/10 text-red-400';
      return 'border-white/5 text-white/30';
    }
    if (selectedLeft === id) return 'border-gold bg-gold/10 text-white ring-2 ring-gold/30';
    if (paired) return 'border-white/20 text-white opacity-80';
    return 'border-white/10 hover:border-white/30 text-white/80 hover:text-white';
  };

  const getRightStyle = (id: string) => {
    if (revealed) {
      const leftWithThis = Object.keys(pairs).find((lk) => pairs[lk] === id);
      if (leftWithThis) {
        const isCorrect = revealed[leftWithThis] === id;
        return isCorrect ? 'border-teal bg-teal/15 text-teal' : 'border-red-500 bg-red-500/10 text-red-400';
      }
      return 'border-white/5 text-white/30';
    }
    if (usedRight.has(id)) return 'border-purple/50 bg-purple/10 text-white/70';
    if (selectedLeft) return 'border-white/20 hover:border-teal hover:bg-teal/10 hover:text-teal text-white/70 cursor-pointer';
    return 'border-white/8 text-white/50';
  };

  const getPairLabel = (leftId: string) => {
    const rightId = pairs[leftId];
    if (!rightId) return null;
    const colorIndex = getPairColorIndex(leftId);
    const color = PAIR_COLORS[colorIndex % PAIR_COLORS.length];
    return <span className="text-xs px-1.5 rounded-full font-bold" style={{ color, backgroundColor: `${color}22` }}>{colorIndex + 1}</span>;
  };

  const getRightPairLabel = (rightId: string) => {
    const leftId = Object.keys(pairs).find((lk) => pairs[lk] === rightId);
    if (!leftId) return null;
    return getPairLabel(leftId);
  };

  return (
    <div className="space-y-4">
      <p className="text-white/50 text-sm">
        {selectedLeft ? 'Tagad noklikšķini uz labās kolonnas elementu, lai savienotu' : 'Noklikšķini kreiso elementu, tad labo, lai tos savienotu'}
      </p>

      <div className="grid grid-cols-2 gap-3">
        {/* Left column */}
        <div className="space-y-2">
          <p className="text-xs font-semibold text-white/30 uppercase tracking-wider mb-2">Jēdzieni</p>
          {data.left.map((item, i) => (
            <motion.button
              key={item.id}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.06 }}
              onClick={() => handleLeftClick(item.id)}
              className={`w-full text-left px-3 py-2.5 rounded-xl border text-sm transition-all duration-200 ${getLeftStyle(item.id)}`}
            >
              <div className="flex items-center justify-between gap-1">
                <span>{item.text}</span>
                {getPairLabel(item.id)}
              </div>
            </motion.button>
          ))}
        </div>

        {/* Right column */}
        <div className="space-y-2">
          <p className="text-xs font-semibold text-white/30 uppercase tracking-wider mb-2">Apraksti</p>
          {data.right.map((item, i) => (
            <motion.button
              key={item.id}
              initial={{ opacity: 0, x: 8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.06 }}
              onClick={() => handleRightClick(item.id)}
              className={`w-full text-left px-3 py-2.5 rounded-xl border text-sm transition-all duration-200 ${getRightStyle(item.id)}`}
            >
              <div className="flex items-center justify-between gap-1">
                <span>{item.text}</span>
                {getRightPairLabel(item.id)}
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {!revealed && (
        <Button onClick={() => onAnswer(pairs)} disabled={!allPaired || disabled} fullWidth size="lg">
          Iesniegt sakritības ({Object.keys(pairs).length}/{data.left.length} savienoti)
        </Button>
      )}
    </div>
  );
}
