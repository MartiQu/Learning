import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useParams } from 'react-router-dom';
import { AppNavbar } from '../components/ui/AppNavbar';
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

// ── Level node circle — three clear visual states ─────────────────────────────

type NodeState = 'completed' | 'current' | 'locked';

function LevelNodeCircle({
  state,
  color,
  levelNumber,
}: {
  state: NodeState;
  color: string;
  levelNumber: number;
}) {
  const textColor = color === '#e8c547' ? '#000' : '#fff';

  if (state === 'completed') {
    return (
      <div style={{ width: 52, height: 52, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div
          style={{
            width: 46,
            height: 46,
            borderRadius: '50%',
            background: `linear-gradient(135deg, ${color}dd, ${color}88)`,
            border: `2px solid ${color}99`,
            boxShadow: `0 0 14px ${color}45, 0 2px 8px rgba(0,0,0,0.4)`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            opacity: 0.78,
          }}
        >
          <span style={{ color: textColor, fontSize: 17, fontWeight: 'bold', lineHeight: 1 }}>✓</span>
        </div>
      </div>
    );
  }

  if (state === 'current') {
    return (
      <div
        style={{
          width: 68,
          height: 68,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
        }}
      >
        {/* Outer pulse ring */}
        <motion.div
          animate={{ scale: [1, 1.55, 1], opacity: [0.55, 0, 0.55] }}
          transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            position: 'absolute',
            width: 68,
            height: 68,
            borderRadius: '50%',
            border: `2px solid ${color}`,
          }}
        />
        {/* Inner pulse ring */}
        <motion.div
          animate={{ scale: [1, 1.3, 1], opacity: [0.35, 0, 0.35] }}
          transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut', delay: 0.7 }}
          style={{
            position: 'absolute',
            width: 68,
            height: 68,
            borderRadius: '50%',
            border: `1.5px solid ${color}70`,
          }}
        />
        {/* Main circle */}
        <div
          style={{
            width: 54,
            height: 54,
            borderRadius: '50%',
            background: `linear-gradient(135deg, ${color}, ${color}cc)`,
            border: `2.5px solid ${color}`,
            boxShadow: `0 0 36px ${color}80, 0 0 14px ${color}50, 0 4px 16px rgba(0,0,0,0.5)`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            zIndex: 2,
          }}
        >
          <span style={{ color: textColor, fontSize: 17, fontWeight: 'bold', lineHeight: 1 }}>
            {levelNumber}
          </span>
        </div>
      </div>
    );
  }

  // locked
  return (
    <div style={{ width: 52, height: 52, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div
        style={{
          width: 42,
          height: 42,
          borderRadius: '50%',
          background: 'rgba(255,255,255,0.025)',
          border: '1.5px solid rgba(255,255,255,0.07)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <span style={{ fontSize: 14, opacity: 0.28 }}>🔒</span>
      </div>
    </div>
  );
}

// ── Level row ─────────────────────────────────────────────────────────────────

function LevelRow({
  level,
  nodeState,
  selected,
  stars,
  color,
  onClick,
  index,
}: {
  level: Level;
  nodeState: NodeState;
  selected: boolean;
  stars: number;
  color: string;
  onClick: () => void;
  index: number;
}) {
  const isLocked = nodeState === 'locked';
  const isCurrent = nodeState === 'current';
  const isCompleted = nodeState === 'completed';

  return (
    <motion.div
      initial={{ opacity: 0, x: -14 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.055, duration: 0.35 }}
      className="flex items-center gap-4 relative"
      onClick={!isLocked ? onClick : undefined}
      style={{ cursor: isLocked ? 'default' : 'pointer', zIndex: 1 }}
    >
      {/* Node column — fixed 72px to anchor vertical line */}
      <div style={{ width: 72, display: 'flex', justifyContent: 'center', flexShrink: 0 }}>
        <motion.div
          animate={selected && !isLocked ? { scale: 1.07 } : { scale: 1 }}
          transition={{ type: 'spring', stiffness: 280, damping: 22 }}
        >
          <LevelNodeCircle state={nodeState} color={color} levelNumber={level.levelNumber} />
        </motion.div>
      </div>

      {/* Content card */}
      <motion.div
        animate={selected ? { x: 4 } : { x: 0 }}
        transition={{ type: 'spring', stiffness: 280, damping: 22 }}
        className="flex-1 min-w-0 rounded-2xl px-4 py-3 transition-all"
        style={{
          opacity: isLocked ? 0.3 : 1,
          background: selected
            ? `${color}0e`
            : isCurrent
            ? `${color}07`
            : 'transparent',
          border: selected
            ? `1px solid ${color}35`
            : `1px solid transparent`,
        }}
      >
        <div
          className="text-xs font-bold uppercase tracking-widest mb-0.5"
          style={{ color: isLocked ? 'rgba(255,255,255,0.18)' : `${color}bb` }}
        >
          Līmenis {level.levelNumber}
        </div>
        <div
          className="font-semibold leading-tight mb-0.5"
          style={{
            fontSize: isCurrent ? 15 : 14,
            color: isLocked
              ? 'rgba(255,255,255,0.18)'
              : isCurrent
              ? '#fff'
              : 'rgba(255,255,255,0.72)',
          }}
        >
          {level.title}
        </div>
        <div
          className="text-xs leading-relaxed"
          style={{
            color: isLocked ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.32)',
          }}
        >
          {level.topic}
        </div>
        {isCompleted && stars > 0 && (
          <div className="mt-1.5">
            <StarRow count={stars} />
          </div>
        )}
        {isCurrent && (
          <div
            className="mt-2 inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-0.5 rounded-full"
            style={{ background: `${color}1e`, color: color }}
          >
            ▶ Aktīvs
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}

// ── Path progress bar ─────────────────────────────────────────────────────────

function PathProgressBar({
  completed,
  total,
  color,
}: {
  completed: number;
  total: number;
  color: string;
}) {
  const pct = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <div className="mb-7 rounded-2xl border border-white/6 px-5 py-4" style={{ background: 'rgba(255,255,255,0.02)' }}>
      <div className="flex justify-between items-center mb-2.5">
        <span className="text-xs font-semibold text-white/50">Kursa progress</span>
        <span className="text-xs font-bold" style={{ color }}>
          {completed} / {total} nodarbības
        </span>
      </div>
      <div className="h-2.5 rounded-full bg-white/6 overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 1.1, ease: 'easeOut', delay: 0.4 }}
          style={{
            background: `linear-gradient(90deg, ${color}, ${color}bb)`,
            boxShadow: `0 0 8px ${color}60`,
          }}
        />
      </div>
      <div className="flex justify-between items-center mt-1.5">
        <span className="text-xs text-white/25">{pct}% pabeigts</span>
        <span className="text-xs text-white/25">{total - completed} atlikušas</span>
      </div>
    </div>
  );
}

// ── Course info card (left panel) ─────────────────────────────────────────────

function CourseInfoCard({
  system,
  totalLevels,
  questionCount,
  completedCount,
  streakDays,
  lastActivityDate,
}: {
  system: typeof qualitySystems[number];
  totalLevels: number;
  questionCount: number;
  completedCount: number;
  streakDays: number;
  lastActivityDate: string;
}) {
  const pct = totalLevels > 0 ? Math.round((completedCount / totalLevels) * 100) : 0;
  const today = new Date().toISOString().slice(0, 10);
  const completedToday = lastActivityDate === today;

  // Shorten description to 1–2 lines (~100 chars)
  const shortDesc =
    system.description.length > 105
      ? system.description.slice(0, 105).replace(/\s+\S*$/, '') + '…'
      : system.description;

  return (
    <div
      className="rounded-3xl border p-5"
      style={{
        borderColor: `${system.color}28`,
        background: `linear-gradient(145deg, ${system.color}0e 0%, transparent 70%)`,
      }}
    >
      {/* Icon */}
      <div
        className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-4"
        style={{
          background: `linear-gradient(135deg, ${system.color}2a, ${system.color}0c)`,
          boxShadow: `0 6px 24px ${system.color}28`,
          border: `1px solid ${system.color}22`,
        }}
      >
        {system.icon}
      </div>

      <h2 className="font-heading text-lg font-bold text-white text-center mb-1.5 leading-tight">
        {system.name}
      </h2>
      <p className="text-white/38 text-xs text-center leading-relaxed mb-4">
        {shortDesc}
      </p>

      {/* Stats grid */}
      <div className="grid grid-cols-3 gap-2 mb-4">
        {[
          { value: totalLevels, label: 'Līmeņi' },
          { value: questionCount, label: 'Uzdevumi' },
          { value: completedCount, label: 'Pabeigti', accent: true },
        ].map((s) => (
          <div
            key={s.label}
            className="text-center rounded-xl py-2.5 px-1"
            style={{ background: 'rgba(255,255,255,0.04)' }}
          >
            <div
              className="font-bold text-sm"
              style={{ color: s.accent ? system.color : '#fff' }}
            >
              {s.value}
            </div>
            <div className="text-white/28 text-xs mt-0.5">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Progress */}
      <div className="mb-4">
        <div className="flex justify-between text-xs mb-1.5">
          <span className="text-white/35">Progress</span>
          <span className="font-bold" style={{ color: system.color }}>
            {pct}%
          </span>
        </div>
        <div className="h-2 rounded-full bg-white/6 overflow-hidden">
          <motion.div
            className="h-full rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${pct}%` }}
            transition={{ duration: 0.9, ease: 'easeOut', delay: 0.3 }}
            style={{ background: `linear-gradient(90deg, ${system.color}, ${system.color}bb)` }}
          />
        </div>
        <div className="text-white/22 text-xs mt-1.5">
          {completedCount} / {totalLevels} nodarbības pabeigtas
        </div>
      </div>

      {/* Streak + daily goal */}
      <div className="border-t border-white/6 pt-4 space-y-2.5">
        <div className="flex items-center gap-2.5">
          <span className="text-base">🔥</span>
          <span className="text-white/55 text-xs flex-1">Dienu sērija</span>
          <span className="text-xs font-bold" style={{ color: '#ff9f1c' }}>
            {streakDays} {streakDays === 1 ? 'diena' : 'dienas'}
          </span>
        </div>
        <div className="flex items-center gap-2.5">
          <span className="text-base">🎯</span>
          <span className="text-white/55 text-xs flex-1">Šodienas mērķis</span>
          <span
            className="text-xs font-semibold"
            style={{ color: completedToday ? '#4ecdc4' : 'rgba(255,255,255,0.28)' }}
          >
            {completedToday ? '✓ Pabeigts' : '0 / 1'}
          </span>
        </div>
      </div>

      {completedCount >= totalLevels && totalLevels > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 py-2.5 rounded-2xl text-center text-xs font-semibold"
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
  const { getProgress, isLevelUnlocked, streakDays, lastActivityDate, examScores } = useProgressStore();

  const system = qualitySystems.find((s) => s.id === systemId);
  const systemLevels = levels
    .filter((l) => l.systemId === systemId)
    .sort((a, b) => a.levelNumber - b.levelNumber);
  const progress = getProgress(systemId!);
  const questionCount = questions.filter((q) =>
    systemLevels.some((l) => l.id === q.levelId)
  ).length;

  // Current level = first unlocked + not yet completed
  const currentLevel =
    systemLevels.find(
      (l) =>
        isLevelUnlocked(systemId!, l.levelNumber) &&
        !progress.completedLevels.includes(l.levelNumber)
    ) ?? null;

  const defaultSelected = currentLevel ?? (systemLevels.length > 0 ? systemLevels[systemLevels.length - 1] : null);
  const [selectedLevel, setSelectedLevel] = useState<Level | null>(defaultSelected);

  if (!system) return null;

  const getNodeState = (level: Level): NodeState => {
    if (progress.completedLevels.includes(level.levelNumber)) return 'completed';
    if (isLevelUnlocked(systemId!, level.levelNumber)) return 'current';
    return 'locked';
  };

  const handleNodeClick = (level: Level) => {
    setSelectedLevel((prev) => (prev?.id === level.id ? null : level));
  };

  const isSelectedUnlocked = selectedLevel
    ? isLevelUnlocked(systemId!, selectedLevel.levelNumber)
    : false;
  const isSelectedCompleted = selectedLevel
    ? progress.completedLevels.includes(selectedLevel.levelNumber)
    : false;

  return (
    <div className="min-h-screen" style={{ background: '#0a0a0f' }}>
      <AppNavbar />

      <div className="max-w-4xl mx-auto px-4 py-8 pb-52">
        <div className="grid md:grid-cols-[256px_1fr] gap-8 items-start">

          {/* Left: course info card (sticky) */}
          <motion.div
            className="md:sticky md:top-20"
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
          >
            <CourseInfoCard
              system={system}
              totalLevels={systemLevels.length}
              questionCount={questionCount}
              completedCount={progress.completedLevels.length}
              streakDays={streakDays}
              lastActivityDate={lastActivityDate}
            />
          </motion.div>

          {/* Right: progress header + level path */}
          <div>
            {/* Path-level progress bar */}
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
            >
              <PathProgressBar
                completed={progress.completedLevels.length}
                total={systemLevels.length}
                color={system.color}
              />
            </motion.div>

            {/* Level path with vertical connecting line */}
            <div className="relative flex flex-col gap-2">
              {/* Subtle vertical connector line */}
              <div
                className="absolute pointer-events-none"
                style={{
                  left: 35,          // center of 72px node column (36) − 1px (half line width)
                  top: 34,
                  bottom: 34,
                  width: 2,
                  borderRadius: 1,
                  background:
                    'linear-gradient(to bottom, transparent, rgba(255,255,255,0.07) 12%, rgba(255,255,255,0.07) 88%, transparent)',
                  zIndex: 0,
                }}
              />

              {systemLevels.map((level, i) => {
                const nodeState = getNodeState(level);
                const stars = progress.levelStars[level.levelNumber] ?? 0;
                const selected = selectedLevel?.id === level.id;

                return (
                  <LevelRow
                    key={level.id}
                    level={level}
                    nodeState={nodeState}
                    selected={selected}
                    stars={stars}
                    color={system.color}
                    onClick={() => handleNodeClick(level)}
                    index={i}
                  />
                );
              })}

              {/* Exam separator */}
              <div className="flex items-center gap-3 mt-3 mb-1">
                <div className="flex-1 h-px" style={{ background: 'rgba(255,255,255,0.06)' }} />
                <span className="text-xs uppercase tracking-widest" style={{ color: 'rgba(255,255,255,0.2)' }}>
                  Boss Fight
                </span>
                <div className="flex-1 h-px" style={{ background: 'rgba(255,255,255,0.06)' }} />
              </div>

              {/* Exam node */}
              {(() => {
                const allDone =
                  systemLevels.length > 0 &&
                  progress.completedLevels.length >= systemLevels.length;
                const examScore = examScores[systemId!];
                const examCompleted = examScore !== undefined;

                return (
                  <motion.div
                    initial={{ opacity: 0, x: -14 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: systemLevels.length * 0.055 + 0.05 }}
                    className="flex items-center gap-4"
                    onClick={allDone ? () => navigate(`/system/${systemId}/exam`) : undefined}
                    style={{ cursor: allDone ? 'pointer' : 'default', zIndex: 1 }}
                  >
                    {/* Node column */}
                    <div style={{ width: 72, display: 'flex', justifyContent: 'center', flexShrink: 0 }}>
                      <div style={{ width: 52, height: 52, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                        {examCompleted ? (
                          <div
                            style={{
                              width: 46,
                              height: 46,
                              borderRadius: '50%',
                              background: `linear-gradient(135deg, ${system.color}dd, ${system.color}88)`,
                              border: `2px solid ${system.color}99`,
                              boxShadow: `0 0 14px ${system.color}45`,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}
                          >
                            <span style={{ color: system.color === '#e8c547' ? '#000' : '#fff', fontSize: 12, fontWeight: 'bold' }}>
                              {examScore}/10
                            </span>
                          </div>
                        ) : allDone ? (
                          <>
                            <motion.div
                              animate={{ scale: [1, 1.55, 1], opacity: [0.55, 0, 0.55] }}
                              transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
                              style={{
                                position: 'absolute',
                                width: 60,
                                height: 60,
                                borderRadius: '50%',
                                border: `2px solid ${system.color}`,
                              }}
                            />
                            <div
                              style={{
                                width: 46,
                                height: 46,
                                borderRadius: '50%',
                                background: `linear-gradient(135deg, ${system.color}, ${system.color}cc)`,
                                border: `2.5px solid ${system.color}`,
                                boxShadow: `0 0 24px ${system.color}70`,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                position: 'relative',
                                zIndex: 2,
                              }}
                            >
                              <span style={{ fontSize: 18 }}>🏆</span>
                            </div>
                          </>
                        ) : (
                          <div
                            style={{
                              width: 42,
                              height: 42,
                              borderRadius: '50%',
                              background: 'rgba(255,255,255,0.025)',
                              border: '1.5px solid rgba(255,255,255,0.07)',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}
                          >
                            <span style={{ fontSize: 14, opacity: 0.28 }}>🔒</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Content card */}
                    <div
                      className="flex-1 min-w-0 rounded-2xl px-4 py-3"
                      style={{
                        opacity: allDone ? 1 : 0.3,
                        background: allDone ? `${system.color}07` : 'transparent',
                        border: `1px solid ${allDone ? system.color + '25' : 'transparent'}`,
                      }}
                    >
                      <div
                        className="text-xs font-bold uppercase tracking-widest mb-0.5"
                        style={{ color: allDone ? `${system.color}bb` : 'rgba(255,255,255,0.18)' }}
                      >
                        Zināšanu eksāmens
                      </div>
                      <div
                        className="font-semibold"
                        style={{ fontSize: 14, color: allDone ? '#fff' : 'rgba(255,255,255,0.18)' }}
                      >
                        {examCompleted
                          ? `Vērtējums: ${examScore}/10`
                          : allDone
                          ? 'Gatavs! Pārbaudi zināšanas'
                          : 'Pabeidz visus līmeņus'}
                      </div>
                      <div
                        className="text-xs"
                        style={{ color: allDone ? 'rgba(255,255,255,0.35)' : 'rgba(255,255,255,0.1)' }}
                      >
                        AI saruna · 8–12 jautājumi · Vērtējums 1–10
                      </div>
                    </div>
                  </motion.div>
                );
              })()}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom floating action card */}
      <AnimatePresence>
        {selectedLevel && (
          <motion.div
            key={selectedLevel.id + '-card'}
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', stiffness: 420, damping: 38 }}
            className="fixed bottom-0 left-0 right-0 px-4 pb-8 pt-4 z-50"
            style={{
              background: 'linear-gradient(to top, #0a0a0f 55%, rgba(10,10,15,0.85) 80%, transparent)',
            }}
          >
            <div
              className="max-w-sm mx-auto rounded-3xl border p-5"
              style={{
                background: '#12121a',
                borderColor: `${system.color}30`,
                boxShadow: `0 -4px 40px rgba(0,0,0,0.75), 0 0 0 1px ${system.color}10`,
              }}
            >
              {/* Label */}
              <p className="text-xs text-white/30 text-center font-medium mb-3">
                {!isSelectedUnlocked
                  ? 'Slēgta nodarbība'
                  : isSelectedCompleted
                  ? 'Pabeigta nodarbība'
                  : 'Nākamā nodarbība'}
              </p>

              {/* Level info row */}
              <div className="flex items-center gap-3 mb-4">
                {/* Mini node */}
                <div
                  className="shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold"
                  style={{
                    background: isSelectedUnlocked
                      ? `linear-gradient(135deg, ${system.color}, ${system.color}cc)`
                      : 'rgba(255,255,255,0.05)',
                    color: !isSelectedUnlocked
                      ? 'rgba(255,255,255,0.2)'
                      : system.color === '#e8c547'
                      ? '#000'
                      : '#fff',
                    boxShadow: isSelectedUnlocked ? `0 0 16px ${system.color}55` : 'none',
                  }}
                >
                  {isSelectedCompleted ? '✓' : selectedLevel.levelNumber}
                </div>
                <div className="flex-1 min-w-0">
                  <div
                    className="text-xs font-bold uppercase tracking-widest"
                    style={{ color: `${system.color}aa` }}
                  >
                    Līmenis {selectedLevel.levelNumber}
                  </div>
                  <div className="font-heading text-base font-bold text-white leading-tight truncate">
                    {selectedLevel.title}
                  </div>
                </div>
                {isSelectedCompleted && (
                  <div className="shrink-0">
                    <StarRow count={progress.levelStars[selectedLevel.levelNumber] ?? 0} />
                  </div>
                )}
              </div>

              {/* CTA button */}
              <button
                onClick={() =>
                  navigate(`/system/${systemId}/level/${selectedLevel.levelNumber}`)
                }
                disabled={!isSelectedUnlocked}
                className="w-full py-3.5 rounded-2xl font-bold text-base transition-all hover:opacity-90 active:scale-[0.98] cursor-pointer disabled:opacity-25 disabled:cursor-not-allowed"
                style={{
                  background: isSelectedUnlocked
                    ? `linear-gradient(135deg, ${system.color}, ${system.color}cc)`
                    : 'rgba(255,255,255,0.05)',
                  color: isSelectedUnlocked
                    ? system.color === '#e8c547'
                      ? '#000'
                      : '#fff'
                    : 'rgba(255,255,255,0.25)',
                }}
              >
                {!isSelectedUnlocked
                  ? '🔒 Slēgts'
                  : isSelectedCompleted
                  ? `Atkārtot Līmeni ${selectedLevel.levelNumber} →`
                  : `Sākt Līmeni ${selectedLevel.levelNumber} →`}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
