import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { qualitySystems } from '../data/systems';
import { levels } from '../data/levels';
import { useProgressStore } from '../store/progressStore';
import { ProgressRing } from '../components/ui/ProgressRing';
import { ProgressBar } from '../components/ui/ProgressBar';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';

const TOTAL_LEVELS = 10;

export function ProfileScreen() {
  const navigate = useNavigate();
  const { getProgress, reset } = useProgressStore();

  const allProgress = qualitySystems.map((s) => getProgress(s.id));
  const totalXP = allProgress.reduce((a, p) => a + p.totalXP, 0);
  const totalCompleted = allProgress.reduce((a, p) => a + p.completedLevels.length, 0);
  const totalPossible = qualitySystems.length * TOTAL_LEVELS;
  const totalStars = allProgress.reduce(
    (a, p) => a + Object.values(p.levelStars).reduce((b, s) => b + s, 0),
    0
  );
  const bonusPoints = allProgress.filter((p) => p.completedLevels.length >= TOTAL_LEVELS).length * 10;

  return (
    <div className="min-h-screen px-4 py-10 max-w-3xl mx-auto">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <button
          onClick={() => navigate('/select')}
          className="text-white/40 hover:text-white/70 text-sm mb-4 transition-colors flex items-center gap-1"
        >
          ← Atpakaļ
        </button>
        <h1 className="font-heading text-4xl font-bold text-white">Profils</h1>
        <p className="text-white/50 mt-1">Tavs progress visās kvalitātes sistēmās</p>
      </motion.div>

      {/* Overall stats */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8"
      >
        {[
          { label: 'Kopējie XP', value: totalXP.toLocaleString(), color: '#e8c547', icon: '⚡' },
          { label: 'Pabeigti līmeņi', value: `${totalCompleted}/${totalPossible}`, color: '#4ecdc4', icon: '✓' },
          { label: 'Nopelnītās zvaigznes', value: totalStars, color: '#ffd700', icon: '★' },
          { label: 'Eksāmena bonuss', value: `+${bonusPoints}pt`, color: '#7c6fff', icon: '🎓' },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.15 + i * 0.07 }}
            className="bg-surface rounded-2xl border border-white/8 p-4 text-center"
          >
            <div className="text-2xl mb-1">{stat.icon}</div>
            <div className="font-heading text-2xl font-bold" style={{ color: stat.color }}>
              {stat.value}
            </div>
            <div className="text-white/40 text-xs mt-0.5">{stat.label}</div>
          </motion.div>
        ))}
      </motion.div>

      {/* Per-system breakdown */}
      <div className="space-y-4">
        <h2 className="font-heading text-xl font-bold text-white">Sistēmu progress</h2>
        {qualitySystems.map((system, i) => {
          const progress = getProgress(system.id);
          const completedCount = progress.completedLevels.length;
          const pct = Math.round((completedCount / TOTAL_LEVELS) * 100);
          const systemLevels = levels.filter((l) => l.systemId === system.id);
          const totalStarsSystem = Object.values(progress.levelStars).reduce((a, b) => a + b, 0);
          const maxStars = systemLevels.length * 3;

          return (
            <motion.div
              key={system.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + i * 0.08 }}
              className="bg-surface rounded-2xl border border-white/8 p-5"
              style={completedCount === TOTAL_LEVELS ? { borderColor: `${system.color}33` } : {}}
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="relative shrink-0">
                  <div
                    className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl"
                    style={{ background: `${system.color}22`, border: `1px solid ${system.color}33` }}
                  >
                    {system.icon}
                  </div>
                  <div className="absolute -bottom-1 -right-1">
                    <ProgressRing value={pct} size={24} strokeWidth={3} color={system.color} />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="font-heading text-lg font-bold text-white">{system.name}</span>
                    {completedCount === TOTAL_LEVELS && (
                      <Badge label="Pabeigts" color={system.color} size="sm" />
                    )}
                  </div>
                  <div className="flex items-center gap-3 text-sm text-white/50">
                    <span>
                      <span className="text-white font-medium">{completedCount}</span>/{TOTAL_LEVELS} līmeņi
                    </span>
                    <span>
                      <span className="text-gold font-medium">{progress.totalXP.toLocaleString()}</span> XP
                    </span>
                    <span className="flex items-center gap-0.5">
                      <span className="text-yellow-400">★</span>
                      <span className="text-white font-medium">{totalStarsSystem}</span>/{maxStars}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => navigate(`/system/${system.id}`)}
                  className="text-white/30 hover:text-white/70 text-sm transition-colors shrink-0"
                >
                  →
                </button>
              </div>

              <ProgressBar value={pct} color={system.color} height={6} />

              {/* Level stars grid */}
              {completedCount > 0 && (
                <div className="mt-3 flex gap-1 flex-wrap">
                  {Array.from({ length: TOTAL_LEVELS }).map((_, idx) => {
                    const lvl = idx + 1;
                    const s = progress.levelStars[lvl] ?? 0;
                    const done = progress.completedLevels.includes(lvl);
                    return (
                      <div
                        key={lvl}
                        title={`Līmenis ${lvl}: ${done ? `${s}★` : 'nav pabeigts'}`}
                        className="w-7 h-7 rounded-md flex items-center justify-center text-xs"
                        style={
                          done
                            ? { background: `${system.color}33`, color: system.color }
                            : { background: 'rgba(255,255,255,0.04)', color: 'rgba(255,255,255,0.2)' }
                        }
                      >
                        {done ? s > 0 ? '★' : '✓' : lvl}
                      </div>
                    );
                  })}
                </div>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Danger zone */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-10 pt-6 border-t border-white/6 text-center"
      >
        <Button
          variant="ghost"
          onClick={() => {
            if (window.confirm('Atiestatīt VISU progresu? To nevar atsaukt.')) reset();
          }}
        >
          Atiestatīt visu progresu
        </Button>
      </motion.div>
    </div>
  );
}
