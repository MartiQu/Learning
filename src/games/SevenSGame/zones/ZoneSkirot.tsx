import { useState } from 'react';
import { ZoneShell } from '../components/ZoneShell';
import { FeedbackOverlay } from '../components/FeedbackOverlay';
import type { ZoneResult } from '../types';
import { SKIROT_ITEMS, type SkirotCategory } from '../data';

const BINS: { id: SkirotCategory; label: string; icon: string; color: string }[] = [
  { id: 'vajadzigs', label: 'Vajadzīgs',  icon: '✅', color: '#4ecdc4' },
  { id: 'karantina', label: 'Karantīna',  icon: '📦', color: '#f97316' },
  { id: 'izmest',    label: 'Izmest',     icon: '🗑️', color: '#ef4444' },
];

interface Props {
  onDone: (result: ZoneResult) => void;
}

export function ZoneSkirot({ onDone }: Props) {
  const [assignments, setAssignments] = useState<Record<string, SkirotCategory>>({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [correct, setCorrect] = useState(0);

  const allAssigned = SKIROT_ITEMS.every((item) => item.id in assignments);

  const handleSubmit = () => {
    let c = 0;
    for (const item of SKIROT_ITEMS) {
      if (assignments[item.id] === item.correct) c++;
    }
    const s = Math.round((c / SKIROT_ITEMS.length) * 100);
    setCorrect(c);
    setScore(s);
    setSubmitted(true);
  };

  if (submitted) {
    const type = score >= 80 ? 'correct' : score >= 50 ? 'partial' : 'wrong';
    return (
      <ZoneShell zoneId="skirot">
        <FeedbackOverlay
          type={type}
          message={`${correct} / ${SKIROT_ITEMS.length} priekšmeti pareizi klasificēti — ${score} punkti`}
          explanation="Šķirošana (Sort) ir 1. 7S solis. Katru priekšmetu darba vietā izvērtē: izmanto katru dienu/nedēļu → vajadzīgs; reizi mēnesī vai retāk → karantīna; nav lietots → izmest. Nevajadzīgi priekšmeti palēnina darbu un rada haotiskumu."
          onContinue={() => onDone({ zoneId: 'skirot', score, label: 'Šķirot' })}
        />
      </ZoneShell>
    );
  }

  return (
    <ZoneShell zoneId="skirot">
      <div className="space-y-4">
        <div
          className="p-4 rounded-xl border border-white/8 mb-2"
          style={{ background: 'rgba(249,115,22,0.06)' }}
        >
          <p className="text-white/80 text-sm font-medium mb-1">Uzdevums</p>
          <p className="text-white/60 text-sm leading-relaxed">
            Darba vietā ir atrastas 12 lietas. Katrai norādi pareizo kategoriju pēc lietošanas
            biežuma: <span style={{ color: '#4ecdc4' }}>✅ Vajadzīgs</span>,{' '}
            <span style={{ color: '#f97316' }}>📦 Karantīna</span> vai{' '}
            <span style={{ color: '#ef4444' }}>🗑️ Izmest</span>.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {SKIROT_ITEMS.map((item) => {
            const assigned = assignments[item.id];
            return (
              <div
                key={item.id}
                className="flex flex-col gap-2 p-3 rounded-xl border border-white/8"
                style={{ background: 'rgba(255,255,255,0.03)' }}
              >
                <div className="flex items-center gap-2">
                  <span className="text-xl shrink-0">{item.icon}</span>
                  <div className="flex-1 min-w-0">
                    <div className="text-white text-sm font-medium leading-tight truncate">
                      {item.name}
                    </div>
                    <div className="text-white/35 text-xs mt-0.5">{item.freq}</div>
                  </div>
                  {assigned && (
                    <span className="text-base shrink-0">
                      {BINS.find((b) => b.id === assigned)?.icon}
                    </span>
                  )}
                </div>
                <div className="flex gap-1.5">
                  {BINS.map((bin) => (
                    <button
                      key={bin.id}
                      onClick={() => setAssignments((p) => ({ ...p, [item.id]: bin.id }))}
                      className="flex-1 text-xs py-1.5 rounded-lg border transition-all"
                      style={
                        assigned === bin.id
                          ? {
                              background: `${bin.color}25`,
                              borderColor: `${bin.color}60`,
                              color: bin.color,
                              fontWeight: 600,
                            }
                          : {
                              background: 'transparent',
                              borderColor: 'rgba(255,255,255,0.1)',
                              color: 'rgba(255,255,255,0.4)',
                            }
                      }
                    >
                      {bin.label}
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {allAssigned && (
          <button
            onClick={handleSubmit}
            className="w-full py-3.5 rounded-xl font-bold text-black text-sm mt-2 transition-all hover:brightness-110"
            style={{ background: '#f97316' }}
          >
            Iesniegt klasifikāciju →
          </button>
        )}

        {!allAssigned && (
          <p className="text-white/30 text-xs text-center">
            Klasificēts: {Object.keys(assignments).length} / {SKIROT_ITEMS.length}
          </p>
        )}
      </div>
    </ZoneShell>
  );
}
