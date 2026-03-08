import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ZoneShell } from '../components/ZoneShell';
import { FeedbackOverlay } from '../components/FeedbackOverlay';
import type { ZoneResult } from '../types';
import { SPODRINAT_HOTSPOTS } from '../data';

interface Props {
  onDone: (result: ZoneResult) => void;
}

export function ZoneSpodrinat({ onDone }: Props) {
  const [found, setFound] = useState<Set<string>>(new Set());
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null);
  const [showBonus, setShowBonus] = useState(false);
  const [bonusDate, setBonusDate] = useState('');
  const [bonusName, setBonusName] = useState('');
  const [bonusClaimed, setBonusClaimed] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const allFound = found.size === SPODRINAT_HOTSPOTS.length;

  const handleHotspotClick = (id: string) => {
    setFound((prev) => new Set([...prev, id]));
    setActiveHotspot(id);
  };

  const handleBonus = () => {
    setBonusClaimed(true);
    setShowBonus(false);
  };

  const handleSubmit = () => {
    const base = Math.round((found.size / SPODRINAT_HOTSPOTS.length) * 90);
    const bonus = bonusClaimed ? 10 : 0;
    const s = Math.min(100, base + bonus);
    setScore(s);
    setSubmitted(true);
  };

  if (submitted) {
    const type = score >= 80 ? 'correct' : score >= 50 ? 'partial' : 'wrong';
    return (
      <ZoneShell zoneId="spodrinat">
        <FeedbackOverlay
          type={type}
          message={`Atrasti ${found.size}/5 netīruma avoti${bonusClaimed ? ' + bonuss par grafiku' : ''} — ${score} punkti`}
          explanation="Spodrināšana (Shine) nozīmē ne tikai tīrīšanu, bet arī netīruma avotu identificēšanu un novēršanu. Regulāra tīrīšana palīdz agrīni pamanīt defektus iekārtās, pirms tie kļūst par lielākām problēmām."
          onContinue={() => onDone({ zoneId: 'spodrinat', score, label: 'Spodrināt' })}
        />
      </ZoneShell>
    );
  }

  const activeHS = SPODRINAT_HOTSPOTS.find((h) => h.id === activeHotspot);

  return (
    <ZoneShell zoneId="spodrinat">
      <div className="space-y-4">
        <div
          className="p-4 rounded-xl border border-white/8"
          style={{ background: 'rgba(249,115,22,0.06)' }}
        >
          <p className="text-white/80 text-sm font-medium mb-1">Uzdevums</p>
          <p className="text-white/60 text-sm leading-relaxed">
            Iekārta netika tīrīta nedēļu. Uzklikšķini uz oranžajiem hotspotiem SVG ilustrācijā, lai
            atklātu slēptos netīruma avotus.
          </p>
        </div>

        <div className="text-center">
          <span className="text-white/40 text-xs">
            Atrasti: {found.size} / {SPODRINAT_HOTSPOTS.length} netīruma avoti
          </span>
        </div>

        {/* SVG machine illustration with hotspots */}
        <div className="relative">
          <svg
            viewBox="0 0 420 360"
            className="w-full rounded-2xl border border-white/10"
            style={{ background: '#12121a' }}
          >
            {/* Machine body */}
            <rect x="30" y="50" width="360" height="260" rx="12" fill="#1a1a2e" stroke="#2d2d4e" strokeWidth="2" />

            {/* Machine top panel */}
            <rect x="50" y="60" width="320" height="60" rx="8" fill="#16213e" stroke="#2d2d4e" strokeWidth="1" />

            {/* Control panel elements */}
            <circle cx="90" cy="90" r="12" fill="#0f3460" stroke="#2d2d4e" strokeWidth="1" />
            <circle cx="90" cy="90" r="7" fill="#e94560" />
            <rect x="120" y="75" width="60" height="30" rx="4" fill="#0f3460" stroke="#2d2d4e" strokeWidth="1" />
            <text x="130" y="94" fill="#4ecdc4" fontSize="8">00:00</text>
            <circle cx="260" cy="90" r="8" fill="#0f3460" stroke="#2d2d4e" strokeWidth="1" />
            <circle cx="290" cy="90" r="8" fill="#0f3460" stroke="#2d2d4e" strokeWidth="1" />
            <circle cx="320" cy="90" r="8" fill="#0f3460" stroke="#2d2d4e" strokeWidth="1" />

            {/* Machine body details */}
            <rect x="50" y="140" width="140" height="120" rx="6" fill="#16213e" stroke="#2d2d4e" strokeWidth="1" />
            <rect x="210" y="140" width="160" height="120" rx="6" fill="#16213e" stroke="#2d2d4e" strokeWidth="1" />

            {/* Pipes */}
            <line x1="80" y1="170" x2="180" y2="170" stroke="#2d2d4e" strokeWidth="8" strokeLinecap="round" />
            <line x1="80" y1="200" x2="180" y2="200" stroke="#2d2d4e" strokeWidth="8" strokeLinecap="round" />

            {/* Vents */}
            {[240, 260, 280, 300, 320, 340].map((x) => (
              <rect key={x} x={x} y="150" width="12" height="60" rx="3" fill="#1a1a2e" stroke="#2d2d4e" strokeWidth="1" />
            ))}

            {/* Bottom platform */}
            <rect x="30" y="290" width="360" height="20" rx="4" fill="#16213e" stroke="#2d2d4e" strokeWidth="1" />

            {/* Hotspots */}
            {SPODRINAT_HOTSPOTS.map((hs) => {
              const isFound = found.has(hs.id);
              return (
                <g key={hs.id}>
                  {!isFound && (
                    <rect
                      x={hs.x}
                      y={hs.y}
                      width={hs.w}
                      height={hs.h}
                      rx="6"
                      fill="rgba(249,115,22,0.15)"
                      stroke="rgba(249,115,22,0.5)"
                      strokeWidth="1.5"
                      strokeDasharray="4,3"
                      className="cursor-pointer"
                      onClick={() => handleHotspotClick(hs.id)}
                    />
                  )}
                  {isFound && (
                    <rect
                      x={hs.x}
                      y={hs.y}
                      width={hs.w}
                      height={hs.h}
                      rx="6"
                      fill="rgba(78,205,196,0.2)"
                      stroke="rgba(78,205,196,0.6)"
                      strokeWidth="1.5"
                    />
                  )}
                  {/* Pulse animation for unfound */}
                  {!isFound && (
                    <circle
                      cx={hs.x + hs.w / 2}
                      cy={hs.y + hs.h / 2}
                      r="6"
                      fill="#f97316"
                      className="cursor-pointer"
                      onClick={() => handleHotspotClick(hs.id)}
                    >
                      <animate attributeName="opacity" values="1;0.3;1" dur="2s" repeatCount="indefinite" />
                      <animate attributeName="r" values="5;8;5" dur="2s" repeatCount="indefinite" />
                    </circle>
                  )}
                  {isFound && (
                    <text
                      x={hs.x + hs.w / 2}
                      y={hs.y + hs.h / 2 + 4}
                      textAnchor="middle"
                      fill="#4ecdc4"
                      fontSize="14"
                    >
                      ✓
                    </text>
                  )}
                </g>
              );
            })}
          </svg>
        </div>

        {/* Found hotspot info popup */}
        <AnimatePresence>
          {activeHotspot && activeHS && (
            <motion.div
              key={activeHotspot}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="p-4 rounded-xl border"
              style={{ background: 'rgba(78,205,196,0.08)', borderColor: 'rgba(78,205,196,0.25)' }}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="text-teal-400 font-bold text-sm mb-1">
                    ✓ Atrasts: {activeHS.title}
                  </div>
                  <p className="text-white/60 text-xs leading-relaxed">{activeHS.description}</p>
                </div>
                <button
                  onClick={() => setActiveHotspot(null)}
                  className="text-white/30 hover:text-white/60 text-lg shrink-0 leading-none"
                >
                  ×
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bonus form */}
        {allFound && !bonusClaimed && !showBonus && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 rounded-xl border border-white/12"
            style={{ background: 'rgba(249,115,22,0.06)' }}
          >
            <p className="text-white/70 text-sm font-medium mb-2">
              🎉 Visi netīruma avoti atrasti! Papildu uzdevums (+10 punkti)
            </p>
            <p className="text-white/50 text-xs mb-3">
              Aizpildi tīrīšanas grafiku, lai saņemtu bonusa punktus.
            </p>
            <button
              onClick={() => setShowBonus(true)}
              className="text-xs font-semibold px-4 py-2 rounded-lg transition-all"
              style={{ background: 'rgba(249,115,22,0.2)', color: '#f97316' }}
            >
              Aizpildīt grafiku →
            </button>
          </motion.div>
        )}

        {/* Bonus form modal */}
        <AnimatePresence>
          {showBonus && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="p-4 rounded-xl border border-white/12 space-y-3"
              style={{ background: '#12121a' }}
            >
              <p className="text-white/70 text-sm font-bold">📋 Tīrīšanas grafiks</p>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-white/40 text-xs block mb-1">Nākamā tīrīšana</label>
                  <input
                    type="date"
                    value={bonusDate}
                    onChange={(e) => setBonusDate(e.target.value)}
                    className="w-full bg-white/5 border border-white/15 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-orange-400/50"
                  />
                </div>
                <div>
                  <label className="text-white/40 text-xs block mb-1">Atbildīgais</label>
                  <input
                    type="text"
                    value={bonusName}
                    onChange={(e) => setBonusName(e.target.value)}
                    placeholder="Vārds Uzvārds"
                    className="w-full bg-white/5 border border-white/15 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-orange-400/50 placeholder-white/20"
                  />
                </div>
              </div>
              <button
                onClick={handleBonus}
                disabled={!bonusDate || !bonusName}
                className="w-full py-2.5 rounded-lg font-semibold text-sm disabled:opacity-40 transition-all"
                style={{ background: bonusDate && bonusName ? '#f97316' : 'rgba(249,115,22,0.3)', color: '#000' }}
              >
                Apstiprināt grafiku +10 punkti
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {bonusClaimed && (
          <div className="text-center text-xs" style={{ color: '#f97316' }}>
            ✓ Tīrīšanas grafiks ievadīts — +10 bonusa punkti piešķirti!
          </div>
        )}

        <button
          onClick={handleSubmit}
          disabled={found.size === 0}
          className="w-full py-3.5 rounded-xl font-bold text-black text-sm transition-all hover:brightness-110 disabled:opacity-40 disabled:cursor-not-allowed"
          style={{ background: '#f97316' }}
        >
          Iesniegt rezultātu →
        </button>
      </div>
    </ZoneShell>
  );
}
