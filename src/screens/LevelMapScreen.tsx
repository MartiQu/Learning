import { motion } from 'framer-motion';
import { useNavigate, useParams } from 'react-router-dom';
import { levels } from '../data/levels';
import { qualitySystems } from '../data/systems';
import { useProgressStore } from '../store/progressStore';

function StarDisplay({ stars }: { stars: number }) {
  return (
    <span className="flex gap-0.5">
      {[1, 2, 3].map((s) => (
        <span key={s} className={s <= stars ? 'text-yellow-400' : 'text-white/15'}>
          ★
        </span>
      ))}
    </span>
  );
}

export function LevelMapScreen() {
  const { systemId } = useParams<{ systemId: string }>();
  const navigate = useNavigate();
  const { getProgress, isLevelUnlocked } = useProgressStore();

  const system = qualitySystems.find((s) => s.id === systemId);
  const systemLevels = levels.filter((l) => l.systemId === systemId).sort((a, b) => a.levelNumber - b.levelNumber);
  const progress = getProgress(systemId!);

  if (!system) return null;

  return (
    <div className="min-h-screen px-4 py-10 max-w-md mx-auto">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <button
          onClick={() => navigate('/home')}
          className="text-white/40 hover:text-white/70 text-sm mb-4 transition-colors flex items-center gap-1"
        >
          ← Visas sistēmas
        </button>
        <div className="flex items-center gap-3">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
            style={{ background: `linear-gradient(135deg, ${system.color}44, ${system.color}11)` }}
          >
            {system.icon}
          </div>
          <div>
            <h1 className="font-heading text-2xl font-bold text-white">{system.name}</h1>
            <p className="text-white/40 text-sm">
              {progress.completedLevels.length}/{systemLevels.length} līmeņi pabeigti ·{' '}
              <span className="text-gold">{progress.totalXP.toLocaleString()} XP</span>
            </p>
          </div>
        </div>
      </motion.div>

      {/* Level path */}
      <div className="relative">
        {/* Connector line */}
        <div className="absolute left-7 top-8 bottom-8 w-0.5 bg-white/8" />

        <div className="space-y-4">
          {systemLevels.map((level, i) => {
            const unlocked = isLevelUnlocked(systemId!, level.levelNumber);
            const completed = progress.completedLevels.includes(level.levelNumber);
            const stars = progress.levelStars[level.levelNumber] ?? 0;

            return (
              <motion.div
                key={level.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.07 }}
                onClick={() => {
                  if (unlocked) navigate(`/system/${systemId}/level/${level.levelNumber}`);
                }}
                className={`relative flex items-center gap-4 p-4 rounded-2xl border transition-all duration-200 ${
                  unlocked
                    ? 'border-white/10 hover:border-white/25 cursor-pointer hover:bg-white/3'
                    : 'border-white/5 opacity-50 cursor-not-allowed'
                } ${completed ? 'bg-white/3' : ''}`}
              >
                {/* Node */}
                <div
                  className={`relative z-10 w-14 h-14 rounded-xl flex items-center justify-center text-lg font-bold shrink-0 transition-all ${
                    completed
                      ? 'text-black'
                      : unlocked
                      ? 'border-2 text-white'
                      : 'bg-white/5 text-white/20'
                  }`}
                  style={
                    completed
                      ? { background: `linear-gradient(135deg, ${system.color}, ${system.color}bb)` }
                      : unlocked
                      ? { borderColor: system.color, color: system.color }
                      : {}
                  }
                >
                  {completed ? '✓' : unlocked ? level.levelNumber : '🔒'}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-white/40 text-xs">Līmenis {level.levelNumber}</span>
                    {completed && <StarDisplay stars={stars} />}
                  </div>
                  <h3 className="font-semibold text-white text-base">{level.title}</h3>
                  <p className="text-white/40 text-sm truncate">{level.topic}</p>
                </div>

                {unlocked && !completed && (
                  <span className="text-white/30 text-sm shrink-0">→</span>
                )}
                {completed && (
                  <div className="text-right shrink-0">
                    <div className="text-xs text-white/30">Pabeigts</div>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* All complete bonus banner */}
      {progress.completedLevels.length === systemLevels.length && systemLevels.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8 p-4 rounded-2xl border text-center"
          style={{ borderColor: `${system.color}44`, background: `${system.color}11` }}
        >
          <div className="text-3xl mb-2">🏆</div>
          <p className="font-heading text-lg font-bold" style={{ color: system.color }}>
            Sistēma pabeigta!
          </p>
          <p className="text-white/50 text-sm mt-1">
            Tu esi nopelnījis 10 bonusa eksāmena punktus par {system.name}
          </p>
        </motion.div>
      )}
    </div>
  );
}
