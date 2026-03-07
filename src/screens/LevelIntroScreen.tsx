import { motion } from 'framer-motion';
import { useNavigate, useParams } from 'react-router-dom';
import { levels } from '../data/levels';
import { questions as allQuestions } from '../data/questions';
import { qualitySystems } from '../data/systems';
import { useProgressStore } from '../store/progressStore';
import { useGameStore } from '../store/gameStore';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { AppNavbar } from '../components/ui/AppNavbar';

const difficultyLabel = (n: number) => {
  if (n <= 3) return { label: 'Iesācējs', color: '#4ecdc4' };
  if (n <= 6) return { label: 'Vidējs', color: '#e8c547' };
  return { label: 'Uzlabots', color: '#ff6b6b' };
};

export function LevelIntroScreen() {
  const { systemId, levelNumber } = useParams<{ systemId: string; levelNumber: string }>();
  const navigate = useNavigate();
  const { isLevelUnlocked, getProgress } = useProgressStore();
  const { startSession } = useGameStore();

  const lvlNum = parseInt(levelNumber ?? '1', 10);
  const level = levels.find((l) => l.systemId === systemId && l.levelNumber === lvlNum);
  const system = qualitySystems.find((s) => s.id === systemId);
  const levelQuestions = allQuestions.filter((q) => q.levelId === level?.id);
  const progress = getProgress(systemId!);
  const stars = progress.levelStars[lvlNum] ?? 0;
  const completed = progress.completedLevels.includes(lvlNum);
  const unlocked = isLevelUnlocked(systemId!, lvlNum);

  if (!level || !system || !unlocked) {
    navigate(`/system/${systemId}`);
    return null;
  }

  const difficulty = difficultyLabel(lvlNum);

  const handleStart = () => {
    startSession(systemId!, level.id, lvlNum, levelQuestions);
    navigate(`/system/${systemId}/level/${lvlNum}/game`);
  };

  return (
    <div className="min-h-screen" style={{ background: '#0a0a0f' }}>
      <AppNavbar />
      <div className="flex items-center justify-center px-4 py-10">
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-lg"
      >
        {/* Back */}
        <button
          onClick={() => navigate(`/system/${systemId}`)}
          className="text-white/40 hover:text-white/70 text-sm mb-6 transition-colors flex items-center gap-1"
        >
          ← Līmeņu karte
        </button>

        {/* Card */}
        <div
          className="rounded-3xl border p-8"
          style={{ borderColor: `${system.color}33`, background: `linear-gradient(135deg, ${system.color}0a, transparent)` }}
        >
          {/* System + level tag */}
          <div className="flex items-center gap-2 mb-6">
            <span className="text-2xl">{system.icon}</span>
            <span className="text-white/40 text-sm">{system.name}</span>
            <span className="text-white/20">·</span>
            <Badge label={difficulty.label} color={difficulty.color} size="sm" />
            {completed && <Badge label="Pabeigts" stars={stars} color={system.color} size="sm" />}
          </div>

          <p className="text-white/40 text-sm font-medium uppercase tracking-widest mb-1">
            Līmenis {lvlNum}
          </p>
          <h1 className="font-heading text-4xl font-bold text-white mb-1">{level.title}</h1>
          <p className="text-gold/80 text-base mb-4">{level.topic}</p>
          <p className="text-white/60 leading-relaxed mb-8">{level.description}</p>

          {/* Quick info */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            {[
              { label: 'Jautājumi', value: levelQuestions.length },
              { label: 'Min. rezultāts', value: `${level.minPassScore}%` },
              { label: 'Pieejamie XP', value: `${levelQuestions.length * 50}+` },
            ].map((info) => (
              <div key={info.label} className="bg-white/5 rounded-xl p-3 text-center border border-white/8">
                <div className="font-heading text-2xl font-bold text-white">{info.value}</div>
                <div className="text-white/40 text-xs mt-0.5">{info.label}</div>
              </div>
            ))}
          </div>

          <Button onClick={handleStart} fullWidth size="lg">
            {completed ? 'Spēlēt vēlreiz' : 'Sākt līmeni'} →
          </Button>
        </div>
      </motion.div>
      </div>
    </div>
  );
}
