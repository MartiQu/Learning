import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useParams } from 'react-router-dom';
import { useGameStore } from '../store/gameStore';
import { useProgressStore } from '../store/progressStore';
import { qualitySystems } from '../data/systems';
import { levels } from '../data/levels';
import { Confetti } from '../components/ui/Confetti';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';

function starsFromScore(pct: number) {
  if (pct >= 95) return 3;
  if (pct >= 85) return 2;
  if (pct >= 70) return 1;
  return 0;
}

export function ResultScreen() {
  const { systemId, levelNumber } = useParams<{ systemId: string; levelNumber: string }>();
  const navigate = useNavigate();
  const { session, clearSession } = useGameStore();
  const { completeLevel } = useProgressStore();
  const [saved, setSaved] = useState(false);

  const lvlNum = parseInt(levelNumber ?? '1', 10);
  const system = qualitySystems.find((s) => s.id === systemId);
  const level = levels.find((l) => l.systemId === systemId && l.levelNumber === lvlNum);

  const totalQ = session?.questions.length ?? 0;
  const score = session?.score ?? 0;
  const pct = totalQ > 0 ? Math.round((score / totalQ) * 100) : 0;
  const stars = starsFromScore(pct);
  const passed = pct >= (level?.minPassScore ?? 70);
  const xpGained = session?.xpGained ?? 0;

  useEffect(() => {
    if (!session || !session.finished || saved) return;
    if (passed) {
      completeLevel(systemId!, lvlNum, stars, xpGained);
    }
    setSaved(true);
  }, [session, passed, saved, systemId, lvlNum, stars, xpGained, completeLevel]);

  if (!session || !system || !level) {
    navigate(`/system/${systemId}`);
    return null;
  }

  const handleNext = () => {
    clearSession();
    if (passed && lvlNum < 10) {
      navigate(`/system/${systemId}/level/${lvlNum + 1}`);
    } else {
      navigate(`/system/${systemId}`);
    }
  };

  const handleRetry = () => {
    clearSession();
    navigate(`/system/${systemId}/level/${lvlNum}`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-10">
      <Confetti active={passed} />

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, type: 'spring', stiffness: 200 }}
        className="w-full max-w-md"
      >
        {/* Result card */}
        <div
          className="rounded-3xl border p-8 text-center"
          style={{
            borderColor: passed ? `${system.color}44` : '#ff6b6b44',
            background: passed
              ? `linear-gradient(135deg, ${system.color}0d, transparent)`
              : 'linear-gradient(135deg, #ff6b6b0d, transparent)',
          }}
        >
          {/* Big result icon */}
          <motion.div
            initial={{ scale: 0, rotate: -20 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 300 }}
            className="text-7xl mb-4"
          >
            {passed ? '🏆' : '📚'}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="font-heading text-3xl font-bold text-white mb-1"
          >
            {passed ? 'Līmenis nokārtots!' : 'Turpini mācīties'}
          </motion.h1>

          <p className="text-white/50 mb-6">
            {passed
              ? `Tu ieguvi ${pct}% par ${level.title}`
              : `Nepieciešams ${level.minPassScore}% — tu ieguvi ${pct}%`}
          </p>

          {/* Score ring */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="relative w-32 h-32 mx-auto mb-6"
          >
            <svg width={128} height={128} className="-rotate-90">
              <circle cx={64} cy={64} r={56} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth={10} />
              <motion.circle
                cx={64}
                cy={64}
                r={56}
                fill="none"
                stroke={passed ? system.color : '#ff6b6b'}
                strokeWidth={10}
                strokeLinecap="round"
                strokeDasharray={2 * Math.PI * 56}
                initial={{ strokeDashoffset: 2 * Math.PI * 56 }}
                animate={{ strokeDashoffset: 2 * Math.PI * 56 * (1 - pct / 100) }}
                transition={{ delay: 0.5, duration: 1, ease: 'easeOut' }}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="font-heading text-4xl font-bold text-white">{pct}%</span>
              <span className="text-white/40 text-xs">{score}/{totalQ} pareizi</span>
            </div>
          </motion.div>

          {/* Stars */}
          {passed && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="flex justify-center gap-2 mb-6"
            >
              {[1, 2, 3].map((s) => (
                <motion.span
                  key={s}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.7 + s * 0.15, type: 'spring', stiffness: 300 }}
                  className="text-4xl"
                  style={{ opacity: s <= stars ? 1 : 0.2 }}
                >
                  ★
                </motion.span>
              ))}
            </motion.div>
          )}

          {/* Stats */}
          <div className="grid grid-cols-3 gap-3 mb-6">
            {[
              { label: 'Nopelnītie XP', value: xpGained, color: '#e8c547' },
              { label: 'Augstākā sērija', value: session.streak, color: '#ff9f1c' },
              { label: 'Zvaigznes', value: passed ? `${stars}/3` : '0/3', color: '#e8c547' },
            ].map((stat) => (
              <div key={stat.label} className="bg-white/5 rounded-xl p-3 border border-white/8">
                <div className="font-heading text-xl font-bold" style={{ color: stat.color }}>
                  {stat.value}
                </div>
                <div className="text-white/40 text-xs mt-0.5">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Badge */}
          {passed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="mb-6"
            >
              <Badge
                label={`Līmenis ${lvlNum} — ${level.title}`}
                stars={stars}
                color={system.color}
                size="md"
                animate
              />
            </motion.div>
          )}

          {/* Actions */}
          <div className="space-y-3">
            {passed && lvlNum < 10 && (
              <Button onClick={handleNext} fullWidth size="lg">
                Nākamais līmenis →
              </Button>
            )}
            {passed && lvlNum >= 10 && (
              <Button onClick={() => navigate(`/system/${systemId}`)} fullWidth size="lg">
                Atpakaļ uz karti 🏆
              </Button>
            )}
            {!passed && (
              <Button onClick={handleRetry} fullWidth size="lg">
                Mēģināt vēlreiz
              </Button>
            )}
            <Button onClick={() => { clearSession(); navigate(`/system/${systemId}`); }} fullWidth variant="secondary">
              Atpakaļ uz līmeņu karti
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
