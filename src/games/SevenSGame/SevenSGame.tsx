import { useState } from 'react';
import { motion } from 'framer-motion';
import type { GamePhase, ZoneResult } from './types';
import { ZONE_ORDER, ZONE_META } from './data';
import { ZoneSkirot } from './zones/ZoneSkirot';
import { ZoneSakartot } from './zones/ZoneSakartot';
import { ZoneSpodrinat } from './zones/ZoneSpodrinat';
import { ZoneStandardizet } from './zones/ZoneStandardizet';
import { ZoneStiprinat } from './zones/ZoneStiprinat';
import { ZoneSargat } from './zones/ZoneSargat';
import { ZoneKomandas } from './zones/ZoneKomandas';
import { RadarChart } from './components/RadarChart';
import { useProgressStore } from '../../store/progressStore';

// ─── Intro screen ─────────────────────────────────────────────────────────────

function IntroScreen({ onStart }: { onStart: () => void }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12" style={{ background: '#0a0a0f' }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-lg w-full text-center space-y-6"
      >
        <div
          className="w-20 h-20 rounded-2xl flex items-center justify-center text-4xl mx-auto"
          style={{ background: 'rgba(249,115,22,0.12)', border: '1px solid rgba(249,115,22,0.2)' }}
        >
          🏭
        </div>

        <div>
          <h1 className="font-heading text-3xl font-bold text-white mb-2">
            7S Darba Vietas Glābējs
          </h1>
          <p className="text-white/50 text-sm leading-relaxed">
            Haotiskā ražotne gaida tavu palīdzību. Izej cauri 7 zonām, katru attīrot un
            sakārtojot pēc 7S principiem.
          </p>
        </div>

        {/* Zone overview */}
        <div className="grid grid-cols-1 gap-2 text-left">
          {ZONE_ORDER.map((zoneId, i) => {
            const meta = ZONE_META[zoneId];
            return (
              <div
                key={zoneId}
                className="flex items-center gap-3 px-4 py-2.5 rounded-xl border border-white/6"
                style={{ background: 'rgba(255,255,255,0.02)' }}
              >
                <div
                  className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold shrink-0"
                  style={{ background: 'rgba(249,115,22,0.15)', color: '#f97316' }}
                >
                  {i + 1}
                </div>
                <span className="text-lg shrink-0">{meta.icon}</span>
                <span className="text-white/70 text-sm font-medium">
                  {['Šķirot', 'Sakārtot', 'Spodrināt', 'Standartizēt', 'Stiprināt', 'Sargāt', 'Komandas Gars'][i]}
                </span>
                <span className="ml-auto text-white/25 text-xs">
                  {['Klikšķis', 'Velc & Nomet', 'Hotspoti', 'Krāsas', 'Scenārijs', 'Simboli', 'Komanda'][i]}
                </span>
              </div>
            );
          })}
        </div>

        <div
          className="p-4 rounded-xl border border-white/8 text-left"
          style={{ background: 'rgba(249,115,22,0.06)' }}
        >
          <p className="text-white/60 text-xs leading-relaxed">
            💡 Par katru pareizu atbildi tu nopelni XP, kas tiek pieskaitīts tavam 7S kursam.
            Pēc visām 7 zonām redzēsi radara diagrammu ar saviem rezultātiem.
          </p>
        </div>

        <button
          onClick={onStart}
          className="w-full py-4 rounded-xl font-bold text-black text-base transition-all hover:brightness-110 active:scale-[0.98]"
          style={{ background: '#f97316' }}
        >
          Sākt spēli →
        </button>
      </motion.div>
    </div>
  );
}

// ─── Results screen ───────────────────────────────────────────────────────────

function ResultsScreen({ results, onRestart }: { results: ZoneResult[]; onRestart: () => void }) {
  const avgScore = Math.round(results.reduce((s, r) => s + r.score, 0) / results.length);
  const xpGained = Math.round(avgScore * 2);

  const grade =
    avgScore >= 90 ? { label: 'Meistars!', color: '#4ecdc4' }
    : avgScore >= 70 ? { label: 'Lielisks darbs!', color: '#f97316' }
    : avgScore >= 50 ? { label: 'Labs progress!', color: '#eab308' }
    : { label: 'Turpini mācīties!', color: '#ef4444' };

  return (
    <div className="min-h-screen" style={{ background: '#0a0a0f' }}>
      <div className="max-w-lg mx-auto px-4 py-8 space-y-6">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <div className="text-5xl mb-3">🏆</div>
          <h1 className="font-heading text-2xl font-bold text-white mb-1">{grade.label}</h1>
          <p className="text-white/40 text-sm">Darba vieta sakārtota pēc 7S principiem</p>
        </motion.div>

        {/* Score + XP */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.15 }}
          className="grid grid-cols-2 gap-3"
        >
          <div
            className="text-center p-4 rounded-2xl border border-white/8"
            style={{ background: 'rgba(255,255,255,0.03)' }}
          >
            <div className="text-3xl font-bold mb-1" style={{ color: grade.color }}>
              {avgScore}
            </div>
            <div className="text-white/40 text-xs">Vidējais rezultāts</div>
          </div>
          <div
            className="text-center p-4 rounded-2xl border border-white/8"
            style={{ background: 'rgba(249,115,22,0.08)' }}
          >
            <div className="text-3xl font-bold mb-1" style={{ color: '#f97316' }}>
              +{xpGained}
            </div>
            <div className="text-white/40 text-xs">XP iegūti</div>
          </div>
        </motion.div>

        {/* Radar chart */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="p-4 rounded-2xl border border-white/8"
          style={{ background: 'rgba(255,255,255,0.02)' }}
        >
          <p className="text-white/50 text-xs font-semibold mb-3 text-center">
            Radara diagramma — 7 zonas
          </p>
          <RadarChart results={results} />
        </motion.div>

        {/* Zone breakdown */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.45 }}
          className="space-y-2"
        >
          {results.map((r) => {
            const meta = ZONE_META[r.zoneId];
            return (
              <div
                key={r.zoneId}
                className="flex items-center gap-3 px-4 py-3 rounded-xl border border-white/6"
                style={{ background: 'rgba(255,255,255,0.02)' }}
              >
                <span className="text-lg">{meta.icon}</span>
                <span className="text-white/70 text-sm flex-1">{meta.label}</span>
                <div className="flex items-center gap-2">
                  <div className="w-20 h-1.5 rounded-full bg-white/8 overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${r.score}%`,
                        background: r.score >= 80 ? '#4ecdc4' : r.score >= 50 ? '#f97316' : '#ef4444',
                      }}
                    />
                  </div>
                  <span
                    className="text-xs font-bold w-8 text-right"
                    style={{
                      color: r.score >= 80 ? '#4ecdc4' : r.score >= 50 ? '#f97316' : '#ef4444',
                    }}
                  >
                    {r.score}
                  </span>
                </div>
              </div>
            );
          })}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="flex gap-3"
        >
          <button
            onClick={onRestart}
            className="flex-1 py-3 rounded-xl border border-white/15 text-white/60 hover:text-white/80 text-sm font-semibold transition-all"
          >
            Spēlēt vēlreiz
          </button>
          <a
            href="/games"
            className="flex-1 py-3 rounded-xl font-bold text-black text-sm text-center transition-all hover:brightness-110"
            style={{ background: '#f97316' }}
          >
            Atpakaļ uz spēlēm
          </a>
        </motion.div>
      </div>
    </div>
  );
}

// ─── Zone component map ───────────────────────────────────────────────────────

type ZoneProps = { onDone: (result: ZoneResult) => void };

const ZONE_COMPONENTS: Record<string, React.ComponentType<ZoneProps>> = {
  skirot:       ZoneSkirot,
  sakartot:     ZoneSakartot,
  spodrinat:    ZoneSpodrinat,
  standardizet: ZoneStandardizet,
  stiprinat:    ZoneStiprinat,
  sargat:       ZoneSargat,
  komandas:     ZoneKomandas,
};

// ─── Main orchestrator ────────────────────────────────────────────────────────

export function SevenSGame() {
  const [phase, setPhase] = useState<GamePhase>('intro');
  const [results, setResults] = useState<ZoneResult[]>([]);
  const addXP = useProgressStore((s) => s.addXP);

  const handleStart = () => {
    setPhase(ZONE_ORDER[0]);
  };

  const handleZoneDone = (result: ZoneResult) => {
    const newResults = [...results, result];
    setResults(newResults);

    const currentIndex = ZONE_ORDER.indexOf(result.zoneId);
    const nextIndex = currentIndex + 1;

    if (nextIndex < ZONE_ORDER.length) {
      setPhase(ZONE_ORDER[nextIndex]);
    } else {
      // All zones done — award XP
      const avgScore = newResults.reduce((s, r) => s + r.score, 0) / newResults.length;
      addXP('7s', Math.round(avgScore * 2));
      setPhase('results');
    }
  };

  const handleRestart = () => {
    setResults([]);
    setPhase('intro');
  };

  if (phase === 'intro') {
    return <IntroScreen onStart={handleStart} />;
  }

  if (phase === 'results') {
    return <ResultsScreen results={results} onRestart={handleRestart} />;
  }

  const ZoneComponent = ZONE_COMPONENTS[phase];
  if (!ZoneComponent) return null;

  return <ZoneComponent onDone={handleZoneDone} />;
}
