import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ZoneShell } from '../components/ZoneShell';
import { FeedbackOverlay } from '../components/FeedbackOverlay';
import type { ZoneResult } from '../types';
import { STIPRINAT_SCENARIO, STIPRINAT_OPTIONS } from '../data';

interface Props {
  onDone: (result: ZoneResult) => void;
}

export function ZoneStiprinat({ onDone }: Props) {
  const [chosen, setChosen] = useState<string | null>(null);
  const [discipline, setDiscipline] = useState(50);
  const [showResult, setShowResult] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const selectedOption = STIPRINAT_OPTIONS.find((o) => o.id === chosen);

  const handleSelect = (id: string) => {
    if (chosen) return;
    const opt = STIPRINAT_OPTIONS.find((o) => o.id === id)!;
    setChosen(id);
    setDiscipline((prev) => Math.max(0, Math.min(100, prev + opt.disciplineChange)));
    setTimeout(() => setShowResult(true), 600);
  };

  const handleContinue = () => {
    setScore(selectedOption!.score);
    setSubmitted(true);
  };

  if (submitted) {
    const type = score === 100 ? 'correct' : score >= 60 ? 'partial' : 'wrong';
    return (
      <ZoneShell zoneId="stiprinat">
        <FeedbackOverlay
          type={type}
          message={
            type === 'correct'
              ? `Optimālā izvēle! ${score} punkti`
              : type === 'partial'
              ? `Pieņemama pieeja. ${score} punkti`
              : `Šī pieeja stiprina negatīvas tendences. ${score} punkti`
          }
          explanation="Stiprināšana (Sustain) — 5S/7S ilgtermiņa panākumi ir atkarīgi no vadības prasmēm. Labākā pieeja ir izglītot, noteikt skaidrus procesus un regulāri pārbaudīt — nevis ignorēt problēmas vai tikai sodīt."
          onContinue={() => onDone({ zoneId: 'stiprinat', score, label: 'Stiprināt' })}
        />
      </ZoneShell>
    );
  }

  return (
    <ZoneShell zoneId="stiprinat">
      <div className="space-y-5">
        {/* Scenario */}
        <div
          className="p-4 rounded-xl border border-white/8"
          style={{ background: 'rgba(249,115,22,0.06)' }}
        >
          <p className="text-white/40 text-xs font-semibold uppercase tracking-wide mb-2">
            Scenārijs
          </p>
          <p className="text-white/80 text-sm leading-relaxed">{STIPRINAT_SCENARIO}</p>
        </div>

        {/* Discipline meter */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-white/50 text-xs">Komandas disciplīna</span>
            <span className="text-xs font-bold" style={{ color: discipline >= 60 ? '#4ecdc4' : '#ef4444' }}>
              {discipline}%
            </span>
          </div>
          <div className="w-full h-3 rounded-full bg-white/8 overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              animate={{ width: `${discipline}%` }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
              style={{
                background:
                  discipline >= 70
                    ? 'linear-gradient(90deg, #4ecdc4, #22c55e)'
                    : discipline >= 40
                    ? 'linear-gradient(90deg, #f97316, #eab308)'
                    : 'linear-gradient(90deg, #ef4444, #f97316)',
              }}
            />
          </div>
        </div>

        {/* Options */}
        <div className="space-y-2.5">
          <p className="text-white/60 text-sm">Kā tu rīkosies?</p>
          {STIPRINAT_OPTIONS.map((opt) => {
            const isChosen = chosen === opt.id;
            const isOther = chosen !== null && !isChosen;
            return (
              <button
                key={opt.id}
                onClick={() => handleSelect(opt.id)}
                disabled={chosen !== null}
                className={`w-full text-left p-3.5 rounded-xl border transition-all ${
                  isOther ? 'opacity-40 cursor-default' : 'cursor-pointer'
                }`}
                style={
                  isChosen
                    ? {
                        borderColor:
                          opt.score === 100
                            ? 'rgba(78,205,196,0.5)'
                            : opt.score >= 60
                            ? 'rgba(249,115,22,0.5)'
                            : 'rgba(239,68,68,0.5)',
                        background:
                          opt.score === 100
                            ? 'rgba(78,205,196,0.08)'
                            : opt.score >= 60
                            ? 'rgba(249,115,22,0.08)'
                            : 'rgba(239,68,68,0.08)',
                      }
                    : {
                        borderColor: 'rgba(255,255,255,0.1)',
                        background: 'rgba(255,255,255,0.02)',
                      }
                }
              >
                <p className="text-white/80 text-sm leading-snug">{opt.text}</p>
              </button>
            );
          })}
        </div>

        {/* Result reveal */}
        <AnimatePresence>
          {showResult && selectedOption && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 rounded-xl border space-y-2"
              style={{
                background:
                  selectedOption.score === 100
                    ? 'rgba(78,205,196,0.08)'
                    : selectedOption.score >= 60
                    ? 'rgba(249,115,22,0.08)'
                    : 'rgba(239,68,68,0.08)',
                borderColor:
                  selectedOption.score === 100
                    ? 'rgba(78,205,196,0.3)'
                    : selectedOption.score >= 60
                    ? 'rgba(249,115,22,0.3)'
                    : 'rgba(239,68,68,0.3)',
              }}
            >
              <p className="text-white/70 text-xs font-semibold">Tūlītēja sekas:</p>
              <p className="text-white/60 text-sm">{selectedOption.consequence}</p>
              <p className="text-white/70 text-xs font-semibold mt-2">Ilgtermiņā:</p>
              <p className="text-white/60 text-sm">{selectedOption.longTerm}</p>
              <div
                className="text-xs font-bold mt-2"
                style={{
                  color:
                    selectedOption.score === 100
                      ? '#4ecdc4'
                      : selectedOption.score >= 60
                      ? '#f97316'
                      : '#ef4444',
                }}
              >
                {selectedOption.score === 100
                  ? '✅ Optimālā vadītāja lēmums'
                  : selectedOption.score >= 60
                  ? '⚠️ Pieņemams, taču nav labākais risinājums'
                  : '❌ Šī pieeja samazina komandas 7S kultūru'}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {showResult && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            onClick={handleContinue}
            className="w-full py-3.5 rounded-xl font-bold text-black text-sm transition-all hover:brightness-110"
            style={{ background: '#f97316' }}
          >
            Iesniegt →
          </motion.button>
        )}
      </div>
    </ZoneShell>
  );
}
