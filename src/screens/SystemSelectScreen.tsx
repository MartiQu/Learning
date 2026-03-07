import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { qualitySystems } from '../data/systems';
import { levels } from '../data/levels';
import { useProgressStore } from '../store/progressStore';
import { Card } from '../components/ui/Card';
import { ProgressRing } from '../components/ui/ProgressRing';
import { Badge } from '../components/ui/Badge';

const TOTAL_LEVELS = 10;

export function SystemSelectScreen() {
  const navigate = useNavigate();
  const { getProgress } = useProgressStore();

  return (
    <div className="min-h-screen px-4 py-10 max-w-5xl mx-auto">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
        <button onClick={() => navigate('/')} className="text-white/40 hover:text-white/70 text-sm mb-4 transition-colors flex items-center gap-1">
          ← Atpakaļ
        </button>
        <h1 className="font-heading text-4xl font-bold text-white">Izvēlies sistēmu</h1>
        <p className="text-white/50 mt-2">Izvēlies kvalitātes vadības sistēmu, lai sāktu savu ceļojumu.</p>
      </motion.div>

      {/* System grid */}
      <div className="grid sm:grid-cols-2 gap-5">
        {qualitySystems.map((system, i) => {
          const progress = getProgress(system.id);
          const completedCount = progress.completedLevels.length;
          const pct = Math.round((completedCount / TOTAL_LEVELS) * 100);
          const totalXP = progress.totalXP;
          const systemLevels = levels.filter((l) => l.systemId === system.id);
          const totalStars = Object.values(progress.levelStars).reduce((a, b) => a + b, 0);
          const maxStars = systemLevels.length * 3;

          return (
            <motion.div
              key={system.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Card
                hover
                onClick={() => navigate(`/system/${system.id}`)}
                glow={system.color}
                className="p-5"
              >
                <div className="flex items-start gap-4">
                  {/* Icon + progress ring */}
                  <div className="relative shrink-0">
                    <div
                      className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl"
                      style={{ background: `linear-gradient(135deg, ${system.color}33, ${system.color}11)`, border: `1px solid ${system.color}33` }}
                    >
                      {system.icon}
                    </div>
                    <div className="absolute -bottom-2 -right-2">
                      <ProgressRing value={pct} size={28} strokeWidth={3} color={system.color} />
                    </div>
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <h2 className="font-heading text-xl font-bold text-white">{system.name}</h2>
                      {completedCount === TOTAL_LEVELS && (
                        <Badge label="Pabeigts" size="sm" color={system.color} />
                      )}
                    </div>
                    <p className="text-white/50 text-sm leading-relaxed line-clamp-2">{system.description}</p>
                  </div>
                </div>

                {/* Stats row */}
                <div className="mt-4 pt-4 border-t border-white/6 flex items-center gap-4 text-sm">
                  <span className="text-white/50">
                    <span className="text-white font-semibold">{completedCount}</span>/{TOTAL_LEVELS} līmeņi
                  </span>
                  <span className="text-white/50">
                    <span className="text-gold font-semibold">{totalXP.toLocaleString()}</span> XP
                  </span>
                  {maxStars > 0 && (
                    <span className="text-white/50 flex items-center gap-1">
                      <span className="text-yellow-400">★</span>
                      <span className="text-white font-semibold">{totalStars}</span>/{maxStars}
                    </span>
                  )}
                  <div className="ml-auto flex items-center gap-1 text-white/40">
                    {pct === 0 ? 'Sākt' : pct === 100 ? 'Atkārtot' : 'Turpināt'} →
                  </div>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Profile link */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-8 text-center"
      >
        <button
          onClick={() => navigate('/profile')}
          className="text-white/40 hover:text-white/70 text-sm transition-colors underline underline-offset-2"
        >
          Skatīt pilno profilu un sasniegumus →
        </button>
      </motion.div>
    </div>
  );
}
