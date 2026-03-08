import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ZoneShell } from '../components/ZoneShell';
import { FeedbackOverlay } from '../components/FeedbackOverlay';
import type { ZoneResult } from '../types';
import { SARGAT_SITUATIONS } from '../data';

interface Props {
  onDone: (result: ZoneResult) => void;
}

export function ZoneSargat({ onDone }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showFeedback, setShowFeedback] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const situation = SARGAT_SITUATIONS[currentIndex];
  const totalSituations = SARGAT_SITUATIONS.length;
  const isLast = currentIndex === totalSituations - 1;

  const handleAnswer = (symbolId: string) => {
    if (answers[situation.id]) return;
    setAnswers((prev) => ({ ...prev, [situation.id]: symbolId }));
    setShowFeedback(situation.id);
  };

  const handleNext = () => {
    setShowFeedback(null);
    if (isLast) {
      // Calculate final score
      let correct = 0;
      const updatedAnswers = { ...answers };
      for (const sit of SARGAT_SITUATIONS) {
        if (updatedAnswers[sit.id] === sit.correctSymbolId) correct++;
      }
      const s = Math.round((correct / totalSituations) * 100);
      setScore(s);
      setSubmitted(true);
    } else {
      setCurrentIndex((i) => i + 1);
    }
  };

  const correctAnswers = Object.entries(answers).filter(([sitId, symId]) => {
    const sit = SARGAT_SITUATIONS.find((s) => s.id === sitId);
    return sit?.correctSymbolId === symId;
  }).length;

  if (submitted) {
    const type = score >= 80 ? 'correct' : score >= 50 ? 'partial' : 'wrong';
    return (
      <ZoneShell zoneId="sargat">
        <FeedbackOverlay
          type={type}
          message={`${correctAnswers} / ${totalSituations} riska simboli pareizi — ${score} punkti`}
          explanation="Drošība (Safety) — 7. S paplašina 5S ar drošības dimensiju. Vizuālie brīdinājuma simboli ir starptautiski standartizēti (ISO 11684, ISO 7010) un palīdz novērst nelaimes gadījumus neatkarīgi no valodas."
          onContinue={() => onDone({ zoneId: 'sargat', score, label: 'Sargāt' })}
        />
      </ZoneShell>
    );
  }

  const chosenSymbolId = answers[situation.id];
  const isCorrect = chosenSymbolId === situation.correctSymbolId;

  return (
    <ZoneShell zoneId="sargat">
      <div className="space-y-4">
        {/* Progress */}
        <div className="flex items-center justify-between">
          <span className="text-white/40 text-xs">
            Situācija {currentIndex + 1} / {totalSituations}
          </span>
          <div className="flex gap-1">
            {SARGAT_SITUATIONS.map((_, i) => (
              <div
                key={i}
                className="w-5 h-1.5 rounded-full transition-all"
                style={{
                  background:
                    i < currentIndex
                      ? answers[SARGAT_SITUATIONS[i].id] === SARGAT_SITUATIONS[i].correctSymbolId
                        ? '#4ecdc4'
                        : '#ef4444'
                      : i === currentIndex
                      ? '#f97316'
                      : 'rgba(255,255,255,0.15)',
                }}
              />
            ))}
          </div>
        </div>

        {/* Situation card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={situation.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.25 }}
            className="space-y-4"
          >
            <div
              className="p-5 rounded-2xl border border-white/8 text-center"
              style={{ background: 'rgba(249,115,22,0.06)' }}
            >
              <div className="text-5xl mb-3">{situation.icon}</div>
              <p className="text-white font-bold text-base mb-2">{situation.title}</p>
              <p className="text-white/60 text-sm leading-relaxed">{situation.description}</p>
            </div>

            {/* Symbol choices */}
            <p className="text-white/50 text-sm">Kurš brīdinājuma simbols ir pareizs?</p>
            <div className="flex gap-3">
              {situation.symbols.map((sym) => {
                const isChosen = chosenSymbolId === sym.id;
                const isThisCorrect = sym.id === situation.correctSymbolId;
                let style = {};
                let borderCls = 'border-white/12 hover:border-white/30';

                if (chosenSymbolId) {
                  if (isThisCorrect) {
                    borderCls = 'border-teal-400/50';
                    style = { background: 'rgba(78,205,196,0.1)' };
                  } else if (isChosen) {
                    borderCls = 'border-red-400/50';
                    style = { background: 'rgba(239,68,68,0.1)' };
                  }
                }

                return (
                  <button
                    key={sym.id}
                    onClick={() => handleAnswer(sym.id)}
                    disabled={!!chosenSymbolId}
                    className={`flex-1 flex flex-col items-center gap-2 p-3 rounded-xl border-2 transition-all ${borderCls} ${
                      !chosenSymbolId ? 'cursor-pointer' : 'cursor-default'
                    }`}
                    style={style}
                  >
                    <span className="text-3xl">{sym.icon}</span>
                    <span className="text-white/60 text-xs text-center leading-tight">{sym.name}</span>
                    {chosenSymbolId && isThisCorrect && (
                      <span className="text-teal-400 text-xs font-bold">✓ Pareizi</span>
                    )}
                    {chosenSymbolId && isChosen && !isThisCorrect && (
                      <span className="text-red-400 text-xs font-bold">✗</span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Explanation after answer */}
            <AnimatePresence>
              {showFeedback === situation.id && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="p-3.5 rounded-xl border"
                  style={{
                    background: isCorrect ? 'rgba(78,205,196,0.08)' : 'rgba(239,68,68,0.08)',
                    borderColor: isCorrect ? 'rgba(78,205,196,0.25)' : 'rgba(239,68,68,0.25)',
                  }}
                >
                  <p
                    className="text-xs font-semibold mb-1"
                    style={{ color: isCorrect ? '#4ecdc4' : '#ef4444' }}
                  >
                    {isCorrect ? '✅ Pareizi!' : '❌ Nepareizi'}
                  </p>
                  <p className="text-white/60 text-xs leading-relaxed">{situation.explanation}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </AnimatePresence>

        {/* Next button */}
        {chosenSymbolId && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            onClick={handleNext}
            className="w-full py-3.5 rounded-xl font-bold text-black text-sm transition-all hover:brightness-110"
            style={{ background: '#f97316' }}
          >
            {isLast ? 'Pabeigt zonu →' : 'Nākamā situācija →'}
          </motion.button>
        )}
      </div>
    </ZoneShell>
  );
}
