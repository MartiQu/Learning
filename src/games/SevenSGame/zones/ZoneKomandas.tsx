import { useState } from 'react';
import { motion } from 'framer-motion';
import { ZoneShell } from '../components/ZoneShell';
import { FeedbackOverlay } from '../components/FeedbackOverlay';
import type { ZoneResult } from '../types';
import { KOMANDAS_EMPLOYEES } from '../data';

interface Props {
  onDone: (result: ZoneResult) => void;
}

export function ZoneKomandas({ onDone }: Props) {
  const [choices, setChoices] = useState<Record<string, string>>({});
  const [feedback, setFeedback] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const totalPossible = KOMANDAS_EMPLOYEES.length * 25;
  const currentPoints = Object.entries(choices).reduce((sum, [empId, appId]) => {
    const emp = KOMANDAS_EMPLOYEES.find((e) => e.id === empId)!;
    const approach = emp.approaches.find((a) => a.id === appId)!;
    return sum + approach.points;
  }, 0);
  const teamSpirit = Math.round((currentPoints / totalPossible) * 100);
  const allChosen = KOMANDAS_EMPLOYEES.every((e) => e.id in choices);

  const handleChoice = (empId: string, appId: string) => {
    if (choices[empId]) return;
    const emp = KOMANDAS_EMPLOYEES.find((e) => e.id === empId)!;
    const approach = emp.approaches.find((a) => a.id === appId)!;
    setChoices((p) => ({ ...p, [empId]: appId }));
    setFeedback((p) => ({ ...p, [empId]: approach.feedback }));
  };

  const handleSubmit = () => {
    const s = Math.round((currentPoints / totalPossible) * 100);
    setScore(s);
    setSubmitted(true);
  };

  if (submitted) {
    const type = score >= 80 ? 'correct' : score >= 50 ? 'partial' : 'wrong';
    return (
      <ZoneShell zoneId="komandas">
        <FeedbackOverlay
          type={type}
          message={`Komandas gara indekss: ${score}/100 — ${currentPoints}/${totalPossible} punkti`}
          explanation="Komandas Gars (Spirit) — 7. S princips. Ilgtspējīga 7S ieviešana nav iespējama bez iesaistītas komandas. Katrs darbinieks ir citādāks — veiksmīgs vadītājs pielāgo pieeju katram cilvēkam, nevis lieto vienu modeli visiem."
          onContinue={() => onDone({ zoneId: 'komandas', score, label: 'Komandas Gars' })}
        />
      </ZoneShell>
    );
  }

  return (
    <ZoneShell zoneId="komandas">
      <div className="space-y-5">
        {/* Intro */}
        <div
          className="p-4 rounded-xl border border-white/8"
          style={{ background: 'rgba(249,115,22,0.06)' }}
        >
          <p className="text-white/80 text-sm font-medium mb-1">Uzdevums</p>
          <p className="text-white/60 text-sm leading-relaxed">
            Tev ir jāiesaista 4 komandas locekļi 7S ieviešanā. Katram izvēlies labāko iesaistīšanas
            pieeju.
          </p>
        </div>

        {/* Team spirit meter */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-white/50 text-sm font-medium">🤝 Komandas gars</span>
            <span
              className="text-sm font-bold"
              style={{ color: teamSpirit >= 70 ? '#4ecdc4' : teamSpirit >= 40 ? '#f97316' : '#ef4444' }}
            >
              {teamSpirit}%
            </span>
          </div>
          <div className="w-full h-4 rounded-full bg-white/8 overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              animate={{ width: `${teamSpirit}%` }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              style={{
                background:
                  teamSpirit >= 70
                    ? 'linear-gradient(90deg, #4ecdc4, #22c55e)'
                    : teamSpirit >= 40
                    ? 'linear-gradient(90deg, #f97316, #eab308)'
                    : 'linear-gradient(90deg, #ef4444, #f97316)',
              }}
            />
          </div>
          <div className="text-white/25 text-xs text-center">
            Iesaistīts: {Object.keys(choices).length} / {KOMANDAS_EMPLOYEES.length} darbinieki
          </div>
        </div>

        {/* Employee cards */}
        <div className="space-y-4">
          {KOMANDAS_EMPLOYEES.map((emp) => {
            const chosenId = choices[emp.id];
            const chosenApproach = chosenId
              ? emp.approaches.find((a) => a.id === chosenId)
              : null;

            return (
              <div
                key={emp.id}
                className="rounded-xl border border-white/8 overflow-hidden"
                style={{ background: 'rgba(255,255,255,0.02)' }}
              >
                {/* Employee header */}
                <div className="flex items-center gap-3 px-4 py-3 border-b border-white/6">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-xl shrink-0"
                    style={{ background: 'rgba(249,115,22,0.12)' }}
                  >
                    {emp.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-white font-semibold text-sm">{emp.name}</div>
                    <div className="text-white/40 text-xs">{emp.type}</div>
                  </div>
                  {chosenApproach && (
                    <div
                      className="text-xs font-bold px-2.5 py-1 rounded-full shrink-0"
                      style={{
                        background:
                          chosenApproach.points === 25
                            ? 'rgba(78,205,196,0.15)'
                            : chosenApproach.points === 10
                            ? 'rgba(249,115,22,0.15)'
                            : 'rgba(239,68,68,0.15)',
                        color:
                          chosenApproach.points === 25
                            ? '#4ecdc4'
                            : chosenApproach.points === 10
                            ? '#f97316'
                            : '#ef4444',
                      }}
                    >
                      +{chosenApproach.points} pts
                    </div>
                  )}
                </div>

                {/* Challenge */}
                <div className="px-4 py-3">
                  <p className="text-white/50 text-xs leading-relaxed mb-3">{emp.challenge}</p>

                  {/* Approach options */}
                  <div className="space-y-2">
                    {emp.approaches.map((approach) => {
                      const isChosen = chosenId === approach.id;
                      const isOther = chosenId && !isChosen;
                      return (
                        <button
                          key={approach.id}
                          onClick={() => handleChoice(emp.id, approach.id)}
                          disabled={!!chosenId}
                          className={`w-full text-left px-3 py-2.5 rounded-lg border transition-all text-xs ${
                            isOther ? 'opacity-35 cursor-default' : 'cursor-pointer'
                          }`}
                          style={
                            isChosen
                              ? {
                                  borderColor:
                                    approach.points === 25
                                      ? 'rgba(78,205,196,0.4)'
                                      : approach.points === 10
                                      ? 'rgba(249,115,22,0.4)'
                                      : 'rgba(239,68,68,0.4)',
                                  background:
                                    approach.points === 25
                                      ? 'rgba(78,205,196,0.08)'
                                      : approach.points === 10
                                      ? 'rgba(249,115,22,0.08)'
                                      : 'rgba(239,68,68,0.08)',
                                  color: 'rgba(255,255,255,0.8)',
                                }
                              : {
                                  borderColor: 'rgba(255,255,255,0.1)',
                                  background: 'transparent',
                                  color: 'rgba(255,255,255,0.5)',
                                }
                          }
                        >
                          {approach.text}
                        </button>
                      );
                    })}
                  </div>

                  {/* Feedback */}
                  {feedback[emp.id] && (
                    <motion.div
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-3 p-2.5 rounded-lg border"
                      style={{
                        background:
                          chosenApproach?.points === 25
                            ? 'rgba(78,205,196,0.06)'
                            : chosenApproach?.points === 10
                            ? 'rgba(249,115,22,0.06)'
                            : 'rgba(239,68,68,0.06)',
                        borderColor:
                          chosenApproach?.points === 25
                            ? 'rgba(78,205,196,0.2)'
                            : chosenApproach?.points === 10
                            ? 'rgba(249,115,22,0.2)'
                            : 'rgba(239,68,68,0.2)',
                      }}
                    >
                      <p className="text-white/60 text-xs leading-relaxed">{feedback[emp.id]}</p>
                    </motion.div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {allChosen && (
          <button
            onClick={handleSubmit}
            className="w-full py-3.5 rounded-xl font-bold text-black text-sm transition-all hover:brightness-110"
            style={{ background: '#f97316' }}
          >
            Iesniegt rezultātus →
          </button>
        )}
      </div>
    </ZoneShell>
  );
}
