import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useParams } from 'react-router-dom';
import { levels } from '../data/levels';
import { questions } from '../data/questions';
import { qualitySystems } from '../data/systems';
import { useProgressStore } from '../store/progressStore';
import type { Level } from '../types';

// ── Stars ─────────────────────────────────────────────────────────────────────

function StarRow({ count }: { count: number }) {
  return (
    <span className="flex gap-0.5">
      {[1, 2, 3].map((s) => (
        <span key={s} style={{ color: s <= count ? '#ffd700' : 'rgba(255,255,255,0.12)', fontSize: 11 }}>
          ★
        </span>
      ))}
    </span>
  );
}

// ── Disc platform with concentric rings ───────────────────────────────────────

function DiscPlatform({
  completed,
  unlocked,
  color,
}: {
  completed: boolean;
  unlocked: boolean;
  color: string;
}) {
  const isLocked = !unlocked;

  const innerBg = completed
    ? `linear-gradient(160deg, ${color}ff, ${color}99)`
    : unlocked
    ? `linear-gradient(160deg, ${color}88, ${color}44)`
    : 'linear-gradient(160deg, rgba(255,255,255,0.12), rgba(255,255,255,0.04))';

  const innerShadow = completed
    ? `0 6px 20px ${color}60, 0 2px 0 rgba(255,255,255,0.15) inset`
    : unlocked
    ? `0 4px 16px ${color}40`
    : '0 2px 8px rgba(0,0,0,0.4)';

  const ringColor = isLocked ? 'rgba(255,255,255,0.08)' : `${color}`;

  return (
    // Outer ring
    <div
      style={{
        width: 118,
        height: 40,
        borderRadius: '50%',
        border: `1.5px solid ${isLocked ? 'rgba(255,255,255,0.06)' : `${ringColor}22`}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
      }}
    >
      {/* Middle ring */}
      <div
        style={{
          width: 92,
          height: 31,
          borderRadius: '50%',
          border: `1.5px solid ${isLocked ? 'rgba(255,255,255,0.08)' : `${ringColor}40`}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* Inner disc */}
        <div
          style={{
            width: 68,
            height: 23,
            borderRadius: '50%',
            background: innerBg,
            boxShadow: innerShadow,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {completed && (
            <span style={{ color: color === '#e8c547' ? '#000' : '#fff', fontSize: 11, fontWeight: 'bold' }}>✓</span>
          )}
          {isLocked && (
            <span style={{ fontSize: 10, opacity: 0.5 }}>🔒</span>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Floating gem (for active unlocked levels) ─────────────────────────────────

function FloatingGem({ color }: { color: string }) {
  return (
    <motion.div
      animate={{ y: [0, -6, 0] }}
      transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
      style={{ marginBottom: -4, position: 'relative', zIndex: 10 }}
    >
      {/* Outer gem body */}
      <div
        style={{
          width: 30,
          height: 30,
          transform: 'rotate(45deg)',
          background: `linear-gradient(135deg, ${color}ff, ${color}99)`,
          borderRadius: 5,
          boxShadow: `0 6px 24px ${color}80, 0 0 0 1px ${color}60 inset`,
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* Inner highlight square */}
        <div
          style={{
            width: 10,
            height: 10,
            background: 'rgba(255,255,255,0.30)',
            borderRadius: 2,
          }}
        />
      </div>
    </motion.div>
  );
}

// ── Single level row ──────────────────────────────────────────────────────────

function LevelRow({
  level,
  completed,
  unlocked,
  selected,
  stars,
  color,
  onClick,
  index,
}: {
  level: Level;
  completed: boolean;
  unlocked: boolean;
  selected: boolean;
  stars: number;
  color: string;
  onClick: () => void;
  index: number;
}) {
  const isLocked = !unlocked;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.07 }}
      className="flex items-center gap-6 cursor-pointer group"
      onClick={!isLocked ? onClick : undefined}
      style={{ cursor: isLocked ? 'default' : 'pointer', opacity: isLocked ? 0.45 : 1 }}
    >
      {/* Node: gem + disc */}
      <div
        className="flex flex-col items-center shrink-0"
        style={{ width: 130 }}
      >
        {/* Floating gem — only for active unlocked */}
        {unlocked && !completed && <FloatingGem color={color} />}

        {/* Disc platform */}
        <motion.div
          animate={selected ? { scale: 1.06 } : { scale: 1 }}
          transition={{ type: 'spring', stiffness: 280, damping: 20 }}
        >
          <DiscPlatform completed={completed} unlocked={unlocked} color={color} />
        </motion.div>

        {/* Platform drop shadow */}
        <div
          style={{
            width: 60,
            height: 6,
            borderRadius: '50%',
            background: isLocked ? 'rgba(255,255,255,0.03)' : color,
            opacity: 0.18,
            filter: 'blur(5px)',
            marginTop: 3,
          }}
        />
      </div>

      {/* Label */}
      <div className="flex-1 min-w-0">
        <div
          className="text-xs font-bold uppercase tracking-widest mb-0.5"
          style={{ color: isLocked ? 'rgba(255,255,255,0.18)' : `${color}cc` }}
        >
          Līmenis {level.levelNumber}
        </div>
        <div
          className="font-semibold text-base leading-tight transition-colors"
          style={{
            color: isLocked
              ? 'rgba(255,255,255,0.18)'
              : selected
              ? '#fff'
              : 'rgba(255,255,255,0.72)',
          }}
        >
          {level.title}
        </div>
        <div
          className="text-xs mt-0.5"
          style={{ color: isLocked ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.28)' }}
        >
          {level.topic}
        </div>
        {completed && stars > 0 && (
          <div className="mt-1.5">
            <StarRow count={stars} />
          </div>
        )}
      </div>
    </motion.div>
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
        borderColor: `${system.color}28`,
        background: `linear-gradient(145deg, ${system.color}0d 0%, transparent 65%)`,
      }}
    >
      <div
        className="w-20 h-20 rounded-2xl flex items-center justify-center text-4xl mx-auto mb-5"
        style={{
          background: `linear-gradient(135deg, ${system.color}2e, ${system.color}0c)`,
          boxShadow: `0 8px 32px ${system.color}28`,
          border: `1px solid ${system.color}22`,
        }}
      >
        {system.icon}
      </div>

      <h2 className="font-heading text-xl font-bold text-white text-center mb-2 leading-tight">
        {system.name}
      </h2>
      <p className="text-white/40 text-sm text-center leading-relaxed mb-6">
        {system.description}
      </p>

      {/* Stats */}
      <div className="flex justify-center gap-5 mb-5">
        {[
          { value: totalLevels, label: 'Līmeņi' },
          { value: questionCount, label: 'Uzdevumi' },
          { value: completedCount, label: 'Pabeigti', accent: true },
        ].map((s, i, arr) => (
          <div key={s.label} className="flex items-center gap-5">
            <div className="flex flex-col items-center gap-0.5">
              <span
                className="font-bold text-base"
                style={{ color: s.accent ? system.color : '#fff' }}
              >
                {s.value}
              </span>
              <span className="text-white/30 text-xs">{s.label}</span>
            </div>
            {i < arr.length - 1 && <div className="w-px h-6 bg-white/8" />}
          </div>
        ))}
      </div>

      {/* Progress */}
      <div>
        <div className="flex justify-between text-xs text-white/25 mb-1.5">
          <span>Progress</span>
          <span>{pct}%</span>
        </div>
        <div className="h-1.5 rounded-full bg-white/8">
          <motion.div
            className="h-full rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${pct}%` }}
            transition={{ duration: 0.9, ease: 'easeOut', delay: 0.3 }}
            style={{ background: system.color }}
          />
        </div>
      </div>

      {completedCount >= totalLevels && totalLevels > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
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
        <span className="text-white/55 text-sm font-medium truncate">{system.name}</span>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8 pb-52">
        <div className="grid md:grid-cols-[260px_1fr] gap-10 items-start">

          {/* Left: course info */}
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
          <div>
            {/* Selected level top badge */}
            <AnimatePresence mode="wait">
              {selectedLevel && (
                <motion.div
                  key={selectedLevel.id}
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.2 }}
                  className="mb-10 rounded-2xl border px-6 py-4 text-center"
                  style={{
                    borderColor: `${system.color}50`,
                    boxShadow: `0 0 0 1px ${system.color}18`,
                    background: `${system.color}08`,
                  }}
                >
                  <p
                    className="text-xs font-bold uppercase tracking-widest mb-0.5"
                    style={{ color: system.color }}
                  >
                    Līmenis {selectedLevel.levelNumber}
                  </p>
                  <p className="font-heading text-base font-bold text-white">
                    {selectedLevel.title}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Level nodes — no connector line, floating in space */}
            <div className="flex flex-col gap-10">
              {systemLevels.map((level, i) => {
                const unlocked = isLevelUnlocked(systemId!, level.levelNumber);
                const completed = progress.completedLevels.includes(level.levelNumber);
                const stars = progress.levelStars[level.levelNumber] ?? 0;
                const selected = selectedLevel?.id === level.id;

                return (
                  <LevelRow
                    key={level.id}
                    level={level}
                    completed={completed}
                    unlocked={unlocked}
                    selected={selected}
                    stars={stars}
                    color={system.color}
                    onClick={() => handleNodeClick(level)}
                    index={i}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom floating card */}
      <AnimatePresence>
        {selectedLevel && (
          <motion.div
            key={selectedLevel.id + '-card'}
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', stiffness: 420, damping: 38 }}
            className="fixed bottom-0 left-0 right-0 px-4 pb-8 pt-3 z-50"
            style={{ background: 'linear-gradient(to top, #0a0a0f 72%, transparent)' }}
          >
            <div
              className="max-w-sm mx-auto rounded-3xl border p-5"
              style={{
                background: '#12121a',
                borderColor: `${system.color}35`,
                boxShadow: `0 -4px 40px rgba(0,0,0,0.7), 0 0 0 1px ${system.color}12`,
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
                onClick={() =>
                  navigate(`/system/${systemId}/level/${selectedLevel.levelNumber}`)
                }
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
