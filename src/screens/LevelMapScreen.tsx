import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useParams } from 'react-router-dom';
import { levels } from '../data/levels';
import { questions } from '../data/questions';
import { qualitySystems } from '../data/systems';
import { useProgressStore } from '../store/progressStore';
import type { Level } from '../types';

const LEVEL_ICONS: Record<number, string> = {
  1: '📖', 2: '⚙️', 3: '🔍', 4: '👑', 5: '🛠️',
  6: '🏭', 7: '📊', 8: '⚠️', 9: '📄', 10: '🎓',
};

// ── Stars ────────────────────────────────────────────────────────────────────

function StarRow({ count }: { count: number }) {
  return (
    <span className="flex gap-0.5">
      {[1, 2, 3].map((s) => (
        <span key={s} style={{ color: s <= count ? '#ffd700' : 'rgba(255,255,255,0.12)', fontSize: 11 }}>★</span>
      ))}
    </span>
  );
}

// ── Level node ────────────────────────────────────────────────────────────────

function LevelNode({
  level,
  completed,
  unlocked,
  selected,
  stars,
  color,
  onClick,
}: {
  level: Level;
  completed: boolean;
  unlocked: boolean;
  selected: boolean;
  stars: number;
  color: string;
  onClick: () => void;
}) {
  const isLocked = !unlocked;

  let circleBg: string;
  let circleBorder: string;
  let circleShadow: string;
  if (completed) {
    circleBg = `linear-gradient(135deg, ${color}, ${color}bb)`;
    circleBorder = color;
    circleShadow = `0 4px 20px ${color}50`;
  } else if (unlocked) {
    circleBg = `linear-gradient(135deg, ${color}28, ${color}0a)`;
    circleBorder = selected ? color : `${color}60`;
    circleShadow = selected ? `0 0 28px ${color}70` : `0 4px 16px ${color}28`;
  } else {
    circleBg = 'rgba(255,255,255,0.03)';
    circleBorder = 'rgba(255,255,255,0.08)';
    circleShadow = 'none';
  }

  return (
    <button
      onClick={!isLocked ? onClick : undefined}
      className="flex items-center gap-4 w-full text-left group"
      style={{ cursor: isLocked ? 'default' : 'pointer' }}
    >
      {/* Node + glow */}
      <div className="relative shrink-0 flex items-center justify-center w-16 h-16">
        {/* Animated glow rings */}
        {unlocked && !completed && (
          <>
            <motion.div
              animate={{ scale: [1, 1.5, 1], opacity: [0.25, 0, 0.25] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute inset-0 rounded-full"
              style={{ background: color, filter: 'blur(10px)' }}
            />
            <motion.div
              animate={{ scale: [1, 1.9, 1], opacity: [0.12, 0, 0.12] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
              className="absolute inset-0 rounded-full"
              style={{ background: color, filter: 'blur(18px)' }}
            />
          </>
        )}

        {/* Circle */}
        <motion.div
          className="relative z-10 w-16 h-16 rounded-full flex items-center justify-center text-xl border-2 font-bold"
          style={{ background: circleBg, borderColor: circleBorder, boxShadow: circleShadow }}
          animate={selected ? { scale: 1.08 } : { scale: 1 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        >
          {isLocked ? (
            <span className="text-white/15 text-base">🔒</span>
          ) : completed ? (
            <span style={{ color: color === '#e8c547' ? '#000' : '#fff' }}>✓</span>
          ) : (
            <span style={{ color: unlocked ? color : 'rgba(255,255,255,0.15)' }}>
              {LEVEL_ICONS[level.levelNumber]}
            </span>
          )}
        </motion.div>

        {/* Platform shadow disc */}
        <div
          className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-10 h-2 rounded-full"
          style={{
            background: isLocked ? 'rgba(255,255,255,0.04)' : color,
            opacity: 0.25,
            filter: 'blur(4px)',
          }}
        />
      </div>

      {/* Text info */}
      <div className="flex-1 min-w-0">
        <div className={`text-xs font-semibold uppercase tracking-wider mb-0.5 ${isLocked ? 'text-white/15' : 'text-white/35'}`}>
          Līmenis {level.levelNumber}
        </div>
        <div className={`font-semibold text-sm leading-tight ${isLocked ? 'text-white/15' : selected ? 'text-white' : 'text-white/70 group-hover:text-white/90'} transition-colors`}>
          {level.title}
        </div>
        <div className={`text-xs mt-0.5 ${isLocked ? 'text-white/10' : 'text-white/30'}`}>
          {level.topic}
        </div>
        {completed && (
          <div className="mt-1">
            <StarRow count={stars} />
          </div>
        )}
      </div>

      {/* Right arrow */}
      {unlocked && !isLocked && (
        <span className={`text-sm shrink-0 transition-colors ${selected ? 'text-white/70' : 'text-white/20 group-hover:text-white/50'}`}>
          →
        </span>
      )}
    </button>
  );
}

// ── Course info card (left panel) ─────────────────────────────────────────────

function CourseInfoCard({
  system,
  totalLevels,
  questionCount,
  completedCount,
}: {
  system: typeof qualitySystems[number];
  totalLevels: number;
  questionCount: number;
  completedCount: number;
}) {
  const pct = Math.round((completedCount / totalLevels) * 100);

  return (
    <div
      className="rounded-3xl border p-6"
      style={{
        borderColor: `${system.color}30`,
        background: `linear-gradient(145deg, ${system.color}0e 0%, transparent 65%)`,
      }}
    >
      {/* Icon */}
      <div
        className="w-20 h-20 rounded-2xl flex items-center justify-center text-4xl mx-auto mb-5"
        style={{
          background: `linear-gradient(135deg, ${system.color}30, ${system.color}0d)`,
          boxShadow: `0 8px 32px ${system.color}30`,
          border: `1px solid ${system.color}25`,
        }}
      >
        {system.icon}
      </div>

      <h2 className="font-heading text-xl font-bold text-white text-center mb-2 leading-tight">
        {system.name}
      </h2>
      <p className="text-white/45 text-sm text-center leading-relaxed mb-6">
        {system.description}
      </p>

      {/* Stats */}
      <div className="flex justify-center gap-6 mb-5 text-sm">
        <div className="flex flex-col items-center gap-0.5">
          <span className="font-bold text-white text-base">{totalLevels}</span>
          <span className="text-white/35 text-xs">Līmeņi</span>
        </div>
        <div className="w-px bg-white/8" />
        <div className="flex flex-col items-center gap-0.5">
          <span className="font-bold text-white text-base">{questionCount}</span>
          <span className="text-white/35 text-xs">Uzdevumi</span>
        </div>
        <div className="w-px bg-white/8" />
        <div className="flex flex-col items-center gap-0.5">
          <span className="font-bold text-base" style={{ color: system.color }}>{completedCount}</span>
          <span className="text-white/35 text-xs">Pabeigti</span>
        </div>
      </div>

      {/* Progress bar */}
      <div>
        <div className="flex justify-between text-xs text-white/30 mb-1.5">
          <span>Progress</span>
          <span>{pct}%</span>
        </div>
        <div className="h-1.5 rounded-full bg-white/8">
          <motion.div
            className="h-full rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${pct}%` }}
            transition={{ duration: 0.9, ease: 'easeOut', delay: 0.2 }}
            style={{ background: system.color }}
          />
        </div>
      </div>

      {/* All complete banner */}
      {completedCount >= totalLevels && totalLevels > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-5 py-3 rounded-2xl text-center text-sm font-semibold"
          style={{ background: `${system.color}18`, color: system.color }}
        >
          🏆 Kurss pabeigts! +10 ekz. pts
        </motion.div>
      )}
    </div>
  );
}

// ── Main ──────────────────────────────────────────────────────────────────────

export function LevelMapScreen() {
  const { systemId } = useParams<{ systemId: string }>();
  const navigate = useNavigate();
  const { getProgress, isLevelUnlocked } = useProgressStore();

  const system = qualitySystems.find((s) => s.id === systemId);
  const systemLevels = levels
    .filter((l) => l.systemId === systemId)
    .sort((a, b) => a.levelNumber - b.levelNumber);
  const progress = getProgress(systemId!);
  const questionCount = questions.filter((q) =>
    systemLevels.some((l) => l.id === q.levelId)
  ).length;

  // Auto-select first unlocked incomplete level
  const defaultLevel =
    systemLevels.find(
      (l) =>
        isLevelUnlocked(systemId!, l.levelNumber) &&
        !progress.completedLevels.includes(l.levelNumber)
    ) ?? systemLevels[0];

  const [selectedLevel, setSelectedLevel] = useState<Level | null>(defaultLevel ?? null);

  if (!system) return null;

  const handleNodeClick = (level: Level) => {
    setSelectedLevel((prev) => (prev?.id === level.id ? null : level));
  };

  return (
    <div className="min-h-screen" style={{ background: '#0a0a0f' }}>
      {/* Sticky nav */}
      <div
        className="sticky top-0 z-40 flex items-center gap-2 px-6 py-4 border-b border-white/8"
        style={{ background: 'rgba(10,10,15,0.96)', backdropFilter: 'blur(12px)' }}
      >
        <button
          onClick={() => navigate('/courses')}
          className="text-white/40 hover:text-white/80 text-sm transition-colors flex items-center gap-1.5"
        >
          ← Kursi
        </button>
        <span className="text-white/15">/</span>
        <span className="text-white/60 text-sm font-medium truncate">{system.name}</span>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8 pb-52">
        <div className="grid md:grid-cols-[260px_1fr] gap-8 items-start">

          {/* Left: course info (sticky on desktop) */}
          <motion.div
            className="md:sticky md:top-24"
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
          >
            <CourseInfoCard
              system={system}
              totalLevels={systemLevels.length}
              questionCount={questionCount}
              completedCount={progress.completedLevels.length}
            />
          </motion.div>

          {/* Right: level path */}
          <div className="relative">
            {/* Vertical connector line */}
            <div
              className="absolute left-8 top-8 bottom-8 w-px"
              style={{
                background:
                  'linear-gradient(to bottom, transparent, rgba(255,255,255,0.07) 8%, rgba(255,255,255,0.07) 92%, transparent)',
              }}
            />

            <div className="space-y-2">
              {systemLevels.map((level, i) => {
                const unlocked = isLevelUnlocked(systemId!, level.levelNumber);
                const completed = progress.completedLevels.includes(level.levelNumber);
                const stars = progress.levelStars[level.levelNumber] ?? 0;
                const selected = selectedLevel?.id === level.id;

                return (
                  <motion.div
                    key={level.id}
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06 }}
                    className={`relative px-4 py-3 rounded-2xl border transition-all duration-200 ${
                      selected
                        ? 'border-white/20 bg-white/4'
                        : unlocked
                        ? 'border-white/6 hover:border-white/14 hover:bg-white/2'
                        : 'border-transparent'
                    }`}
                  >
                    <LevelNode
                      level={level}
                      completed={completed}
                      unlocked={unlocked}
                      selected={selected}
                      stars={stars}
                      color={system.color}
                      onClick={() => handleNodeClick(level)}
                    />
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom floating card — selected level */}
      <AnimatePresence>
        {selectedLevel && (
          <motion.div
            key={selectedLevel.id}
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', stiffness: 420, damping: 38 }}
            className="fixed bottom-0 left-0 right-0 px-4 pb-8 pt-3 z-50"
            style={{ background: 'linear-gradient(to top, #0a0a0f 70%, transparent)' }}
          >
            <div
              className="max-w-sm mx-auto rounded-3xl border p-5"
              style={{
                background: '#12121a',
                borderColor: `${system.color}35`,
                boxShadow: `0 -8px 40px rgba(0,0,0,0.6), 0 0 0 1px ${system.color}15`,
              }}
            >
              <p
                className="text-xs font-bold uppercase tracking-widest text-center mb-0.5"
                style={{ color: system.color }}
              >
                Līmenis {selectedLevel.levelNumber}
              </p>
              <h3 className="font-heading text-lg font-bold text-white text-center mb-4 leading-tight">
                {selectedLevel.title}
              </h3>
              <button
                onClick={() => navigate(`/system/${systemId}/level/${selectedLevel.levelNumber}`)}
                disabled={!isLevelUnlocked(systemId!, selectedLevel.levelNumber)}
                className="w-full py-3.5 rounded-2xl font-bold text-base transition-all hover:opacity-90 cursor-pointer disabled:opacity-35 disabled:cursor-not-allowed"
                style={{
                  background: `linear-gradient(135deg, ${system.color}, ${system.color}cc)`,
                  color: system.color === '#e8c547' ? '#000' : '#fff',
                }}
              >
                {!isLevelUnlocked(systemId!, selectedLevel.levelNumber)
                  ? '🔒 Slēgts'
                  : progress.completedLevels.includes(selectedLevel.levelNumber)
                  ? 'Atkārtot →'
                  : 'Sākt →'}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
