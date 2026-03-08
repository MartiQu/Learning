import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ZoneShell } from '../components/ZoneShell';
import { FeedbackOverlay } from '../components/FeedbackOverlay';
import type { ZoneResult } from '../types';
import { FLOOR_ZONES, COLOR_PALETTE } from '../data';

interface Props {
  onDone: (result: ZoneResult) => void;
}

export function ZoneStandardizet({ onDone }: Props) {
  const [selected, setSelected] = useState<Record<string, string>>({});
  const [activeZone, setActiveZone] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [correct, setCorrect] = useState(0);

  const allColored = FLOOR_ZONES.every((z) => z.id in selected);

  const handleColorSelect = (zoneId: string, color: string) => {
    setSelected((p) => ({ ...p, [zoneId]: color }));
    setActiveZone(null);
  };

  const handleSubmit = () => {
    let c = 0;
    for (const zone of FLOOR_ZONES) {
      if (selected[zone.id] === zone.correctColor) c++;
    }
    const s = Math.round((c / FLOOR_ZONES.length) * 100);
    setCorrect(c);
    setScore(s);
    setSubmitted(true);
  };

  if (submitted) {
    const type = score >= 80 ? 'correct' : score >= 50 ? 'partial' : 'wrong';
    return (
      <ZoneShell zoneId="standardizet">
        <FeedbackOverlay
          type={type}
          message={`${correct} / ${FLOOR_ZONES.length} zonas pareizi nokrāsotas — ${score} punkti`}
          explanation="Standartizēšana (Standardize) — vizuālā krāsu kodēšana ražošanā ir vispārpieņemts standarts: dzeltena=ceļi, sarkana=defekti, balta=iekārtas, zila=ūdens, zaļa=gatavā produkcija, oranža=materiāli (WIP), pelēka=lūžņi."
          onContinue={() => onDone({ zoneId: 'standardizet', score, label: 'Standartizēt' })}
        />
      </ZoneShell>
    );
  }

  const activeZoneData = FLOOR_ZONES.find((z) => z.id === activeZone);

  return (
    <ZoneShell zoneId="standardizet">
      <div className="space-y-4">
        <div
          className="p-4 rounded-xl border border-white/8"
          style={{ background: 'rgba(249,115,22,0.06)' }}
        >
          <p className="text-white/80 text-sm font-medium mb-1">Uzdevums</p>
          <p className="text-white/60 text-sm leading-relaxed">
            Ražotnes grīdas plāns. Uzklikšķini uz katras zonas un izvēlies pareizo krāsu pēc
            starptautiskā 7S krāsu standarta.
          </p>
        </div>

        {/* Color reference legend */}
        <div className="flex flex-wrap gap-1.5">
          {COLOR_PALETTE.map((c) => (
            <div
              key={c.color}
              className="flex items-center gap-1 px-2 py-1 rounded-lg border border-white/8 text-xs text-white/50"
            >
              <div className="w-3 h-3 rounded-sm" style={{ background: c.color }} />
              {c.name}
            </div>
          ))}
        </div>

        {/* Floor plan grid */}
        <div className="grid grid-cols-2 gap-2.5">
          {FLOOR_ZONES.map((zone) => {
            const zoneColor = selected[zone.id];
            const isCorrect = submitted ? zoneColor === zone.correctColor : null;
            return (
              <button
                key={zone.id}
                onClick={() => setActiveZone(zone.id)}
                className={`p-3 rounded-xl border-2 text-left transition-all ${
                  activeZone === zone.id ? 'border-orange-400/60' : 'border-white/12 hover:border-white/25'
                }`}
                style={{
                  background: zoneColor
                    ? `${zoneColor}18`
                    : 'rgba(255,255,255,0.02)',
                  borderColor: zoneColor
                    ? `${zoneColor}50`
                    : activeZone === zone.id
                    ? 'rgba(249,115,22,0.6)'
                    : 'rgba(255,255,255,0.12)',
                }}
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-white/70 text-xs font-medium leading-tight">
                    {zone.label}
                  </span>
                  {zoneColor ? (
                    <div className="flex items-center gap-1.5 shrink-0">
                      <div
                        className="w-4 h-4 rounded-sm border border-white/20"
                        style={{ background: zoneColor }}
                      />
                      {isCorrect !== null && (
                        <span className="text-xs">{isCorrect ? '✓' : '✗'}</span>
                      )}
                    </div>
                  ) : (
                    <span className="text-white/20 text-xs">Izvēlies →</span>
                  )}
                </div>
                <p className="text-white/30 text-xs mt-0.5 leading-tight">{zone.description}</p>
              </button>
            );
          })}
        </div>

        {/* Color picker popup */}
        <AnimatePresence>
          {activeZone && activeZoneData && (
            <motion.div
              key={activeZone}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              className="p-4 rounded-xl border border-white/15"
              style={{ background: '#12121a' }}
            >
              <div className="flex items-center justify-between mb-3">
                <p className="text-white/70 text-sm font-semibold">
                  🎨 Izvēlies krāsu: {activeZoneData.label}
                </p>
                <button
                  onClick={() => setActiveZone(null)}
                  className="text-white/30 hover:text-white/60 text-lg leading-none"
                >
                  ×
                </button>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {COLOR_PALETTE.map((c) => (
                  <button
                    key={c.color}
                    onClick={() => handleColorSelect(activeZone, c.color)}
                    className="flex flex-col items-center gap-1 p-2 rounded-lg border border-white/8 hover:border-white/25 transition-all"
                    style={{ background: `${c.color}15` }}
                  >
                    <div
                      className="w-8 h-8 rounded-lg border border-white/20"
                      style={{ background: c.color }}
                    />
                    <span className="text-white/60 text-xs leading-tight text-center">{c.name}</span>
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {allColored && (
          <button
            onClick={handleSubmit}
            className="w-full py-3.5 rounded-xl font-bold text-black text-sm transition-all hover:brightness-110"
            style={{ background: '#f97316' }}
          >
            Iesniegt krāsojumu →
          </button>
        )}

        {!allColored && (
          <p className="text-white/30 text-xs text-center">
            Nokrāsotas: {Object.keys(selected).length} / {FLOOR_ZONES.length} zonas
          </p>
        )}
      </div>
    </ZoneShell>
  );
}
