import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { useProgressStore } from '../store/progressStore';
import { useBadgeStore, BADGE_DEFS } from '../store/badgeStore';
import type { BadgeProgressData } from '../store/badgeStore';
import { qualitySystems } from '../data/systems';
import { AppNavbar } from '../components/ui/AppNavbar';
import { ProgressBar } from '../components/ui/ProgressBar';

const TOTAL_LEVELS = 10;

function userLevel(xp: number) {
  return Math.floor(xp / 150) + 1;
}

// ── Badge gallery ─────────────────────────────────────────────────────────────

function BadgeGallery() {
  const { earnedBadgeIds, perfectScoreCount } = useBadgeStore();
  const { getProgress, streakDays } = useProgressStore();
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const allProgress = qualitySystems.map((s) => getProgress(s.id));
  const totalXP = allProgress.reduce((a, p) => a + p.totalXP, 0);
  const totalCompletedLevels = allProgress.reduce((a, p) => a + p.completedLevels.length, 0);
  const threeStarLevelsCount = allProgress
    .flatMap((p) => Object.values(p.levelStars))
    .filter((s) => s === 3).length;
  const systemsFullyCompleted = allProgress.filter((p) => p.completedLevels.length >= TOTAL_LEVELS).length;
  const systemsStarted = allProgress.filter((p) => p.completedLevels.length > 0).length;

  const progressData: BadgeProgressData = {
    totalXP,
    totalCompletedLevels,
    streakDays,
    perfectScoreCount,
    threeStarLevelsCount,
    systemsFullyCompleted,
    systemsStarted,
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <span className="text-white/50 text-xs font-semibold uppercase tracking-wider">Nozīmītes</span>
        <span className="text-white/30 text-xs">{earnedBadgeIds.length} / {BADGE_DEFS.length}</span>
      </div>

      <div className="grid grid-cols-4 gap-2">
        {BADGE_DEFS.map((badge) => {
          const earned = earnedBadgeIds.includes(badge.id);
          const progress = badge.getProgress?.(progressData);
          const progressPct = progress ? Math.round((progress.current / progress.total) * 100) : 0;

          return (
            <div
              key={badge.id}
              className="relative flex justify-center"
              onMouseEnter={() => setHoveredId(badge.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              {/* Badge circle */}
              <div
                className="w-11 h-11 rounded-full flex items-center justify-center text-base cursor-default"
                style={earned ? {
                  background: badge.color + '33',
                  border: `2px solid ${badge.color}88`,
                  boxShadow: `0 0 10px ${badge.color}44`,
                } : {
                  background: 'rgba(255,255,255,0.06)',
                  border: '2px solid rgba(255,255,255,0.08)',
                }}
              >
                <span style={earned ? {} : { opacity: 0.25, filter: 'grayscale(1)' }}>
                  {badge.secret && !earned ? '?' : badge.icon}
                </span>
              </div>

              {/* Tooltip */}
              <AnimatePresence>
                {hoveredId === badge.id && (
                  <motion.div
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 4 }}
                    transition={{ duration: 0.15 }}
                    className="absolute z-50 pointer-events-none"
                    style={{
                      bottom: 'calc(100% + 8px)',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      width: 180,
                      background: '#1e1e2e',
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: 10,
                      padding: '10px 12px',
                    }}
                  >
                    {badge.secret && !earned ? (
                      <>
                        <div className="text-white font-semibold text-xs mb-1">???</div>
                        <div className="text-white/40 text-xs">Noslēpumains izaicinājums</div>
                      </>
                    ) : (
                      <>
                        <div className="flex items-center gap-1.5 mb-1">
                          <span className="text-base">{badge.icon}</span>
                          <span className="text-white font-semibold text-xs leading-tight">{badge.label}</span>
                        </div>
                        <div className="text-white/40 text-xs mb-2">{badge.description}</div>
                        {!earned && progress && (
                          <div>
                            <div className="flex justify-between text-xs text-white/30 mb-1">
                              <span>{progress.current} / {progress.total} {progress.unit}</span>
                              <span>{progressPct}%</span>
                            </div>
                            <div className="h-1 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.1)' }}>
                              <div
                                className="h-full rounded-full"
                                style={{ width: `${progressPct}%`, background: badge.color }}
                              />
                            </div>
                          </div>
                        )}
                      </>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── Left sidebar: profile + streak ───────────────────────────────────────────

function ProfileSidebar() {
  const { user } = useAuthStore();
  const { getProgress, streakDays, reset } = useProgressStore();

  const allProgress = qualitySystems.map((s) => getProgress(s.id));
  const totalXP = allProgress.reduce((a, p) => a + p.totalXP, 0);
  const totalCompleted = allProgress.reduce((a, p) => a + p.completedLevels.length, 0);
  const totalPossible = qualitySystems.length * TOTAL_LEVELS;
  const level = userLevel(totalXP);
  const bonusPoints = allProgress.filter((p) => p.completedLevels.length >= TOTAL_LEVELS).length * 10;

  return (
    <motion.div
      initial={{ opacity: 0, x: -12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      {/* Profile */}
      <div>
        <div className="flex items-center gap-3 mb-4">
          {user?.photoURL && (
            <img src={user.photoURL} alt="" className="w-11 h-11 rounded-full border-2 border-white/15 shrink-0" />
          )}
          <div className="min-w-0">
            <div className="font-semibold text-white text-sm truncate">{user?.displayName}</div>
            <div className="text-white/30 text-xs truncate">{user?.email}</div>
          </div>
        </div>

        {/* Primary metrics */}
        <div className="mb-3">
          <div className="flex items-baseline gap-2 mb-0.5">
            <span className="font-heading text-3xl font-bold" style={{ color: '#e8c547' }}>
              {totalXP.toLocaleString()}
            </span>
            <span className="text-white/50 text-sm font-medium">XP</span>
            <span className="text-white/20 mx-1">·</span>
            <span className="text-white font-semibold text-base">Līmenis {level}</span>
          </div>
          <div className="text-white/30 text-xs">
            {totalCompleted}/{totalPossible} līmeņi pabeigti
          </div>
        </div>

        {/* Secondary metrics */}
        {bonusPoints > 0 && (
          <div className="text-xs text-white/30">
            <span>+{bonusPoints} ekz. pts</span>
          </div>
        )}
      </div>

      {/* Divider */}
      <div className="h-px bg-white/6" />

      {/* Streak */}
      <div className="flex items-center gap-2">
        <span className="text-xl">🔥</span>
        <div>
          <div className="text-white font-semibold text-sm">
            {streakDays > 0 ? `${streakDays} dienu sērija` : 'Sācies sēriju!'}
          </div>
          <div className="text-white/30 text-xs">
            {streakDays > 0 ? 'Turpini mācīties katru dienu' : 'Pabeidz 1 nodarbību šodien'}
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="h-px bg-white/6" />

      {/* Per-system progress */}
      <div className="space-y-3">
        {qualitySystems.map((sys) => {
          const p = getProgress(sys.id);
          const pct = Math.round((p.completedLevels.length / TOTAL_LEVELS) * 100);
          return (
            <div key={sys.id}>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-white/50 flex items-center gap-1">
                  <span>{sys.icon}</span>{sys.name}
                </span>
                <span className="text-white/25">{p.completedLevels.length}/{TOTAL_LEVELS}</span>
              </div>
              <ProgressBar value={pct} color={sys.color} height={3} />
            </div>
          );
        })}
      </div>

      {/* Divider */}
      <div className="h-px bg-white/6" />

      {/* Badge gallery */}
      <BadgeGallery />

      {/* Reset */}
      <button
        onClick={() => { if (window.confirm('Atiestatīt VISU progresu?')) reset(); }}
        className="text-white/18 hover:text-white/40 text-xs transition-colors cursor-pointer"
      >
        Atiestatīt progresu
      </button>
    </motion.div>
  );
}

// ── Main course card ──────────────────────────────────────────────────────────

function MainCourseCard() {
  const navigate = useNavigate();
  const { getProgress } = useProgressStore();

  const activeSys =
    qualitySystems.find((s) => {
      const p = getProgress(s.id);
      return p.completedLevels.length > 0 && p.completedLevels.length < TOTAL_LEVELS;
    }) ??
    qualitySystems.find((s) => getProgress(s.id).completedLevels.length === 0) ??
    qualitySystems[0]!;

  const activeP = getProgress(activeSys.id);
  const activePct = Math.round((activeP.completedLevels.length / TOTAL_LEVELS) * 100);
  const isStarted = activeP.completedLevels.length > 0;
  const nextLevel = Math.min(activeP.completedLevels.length + 1, TOTAL_LEVELS);

  const handleContinue = () => {
    navigate(`/system/${activeSys.id}/level/${nextLevel}`);
  };

  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{
        border: `1px solid ${activeSys.color}25`,
        background: `linear-gradient(160deg, ${activeSys.color}10 0%, transparent 55%)`,
      }}
    >
      {/* Header area */}
      <div className="px-6 pt-6 pb-5">
        <div className="flex items-start gap-4 mb-5">
          <div
            className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl shrink-0"
            style={{
              background: `linear-gradient(135deg, ${activeSys.color}30, ${activeSys.color}10)`,
              border: `1px solid ${activeSys.color}25`,
            }}
          >
            {activeSys.icon}
          </div>
          <div className="flex-1 min-w-0 pt-0.5">
            <div className="text-xs font-bold uppercase tracking-widest mb-0.5" style={{ color: activeSys.color }}>
              Aktīvais kurss
            </div>
            <h2 className="font-heading text-xl font-bold text-white leading-tight">{activeSys.name}</h2>
            <div className="text-white/40 text-sm mt-0.5">
              {activeP.completedLevels.length} / {TOTAL_LEVELS} līmeņi pabeigti
            </div>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mb-5">
          <ProgressBar value={activePct} color={activeSys.color} height={6} />
        </div>

        {/* Main CTA */}
        <motion.button
          whileHover={{ scale: 1.02, y: -1 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleContinue}
          className="w-full py-4 rounded-xl font-bold text-base cursor-pointer transition-all"
          style={{
            background: `linear-gradient(135deg, ${activeSys.color}, ${activeSys.color}cc)`,
            boxShadow: `0 4px 24px ${activeSys.color}40`,
            color: activeSys.color === '#e8c547' ? '#000' : '#fff',
          }}
        >
          {isStarted
            ? `Turpināt ${activeSys.name} →`
            : `Sākt ${activeSys.name} →`}
        </motion.button>
      </div>

      {/* Other courses list */}
      <div className="px-4 pb-4 space-y-0.5">
        {qualitySystems
          .filter((s) => s.id !== activeSys.id)
          .map((sys) => {
            const p = getProgress(sys.id);
            const done = p.completedLevels.length >= TOTAL_LEVELS;
            const started = p.completedLevels.length > 0;
            const pct = Math.round((p.completedLevels.length / TOTAL_LEVELS) * 100);

            return (
              <button
                key={sys.id}
                onClick={() => navigate(`/system/${sys.id}`)}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/5 transition-all cursor-pointer text-left group"
              >
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-base shrink-0"
                  style={{ background: `${sys.color}18` }}
                >
                  {sys.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className={`text-sm font-medium truncate ${started || done ? 'text-white/70' : 'text-white/30'}`}>
                    {sys.name}
                  </div>
                  {started && (
                    <div className="mt-1">
                      <ProgressBar value={pct} color={sys.color} height={2} />
                    </div>
                  )}
                </div>
                <span className="text-white/20 group-hover:text-white/50 transition-colors text-sm shrink-0">→</span>
              </button>
            );
          })}
      </div>
    </div>
  );
}

// ── Daily mission ─────────────────────────────────────────────────────────────

function DailyMission() {
  const { getProgress, lastActivityDate } = useProgressStore();

  const today = new Date().toISOString().split('T')[0];
  const doneToday = lastActivityDate === today;
  const totalCompleted = qualitySystems.reduce((s, sys) => s + getProgress(sys.id).completedLevels.length, 0);

  const goal = 2;
  // Rough heuristic: if completed today → at least 1, else 0
  const progress = doneToday ? Math.min(totalCompleted > 0 ? 1 : 0, goal) : 0;
  const pct = Math.round((progress / goal) * 100);
  const achieved = progress >= goal;

  return (
    <div
      className="rounded-2xl p-4 flex items-center gap-4"
      style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}
    >
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center text-xl shrink-0"
        style={{ background: achieved ? 'rgba(78,205,196,0.15)' : 'rgba(255,255,255,0.05)' }}
      >
        {achieved ? '✅' : '🎯'}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-1">
          <span className="text-white/70 text-sm font-semibold">Šodienas mērķis</span>
          <span className="text-white/40 text-xs font-medium">{progress} / {goal}</span>
        </div>
        <div className="text-white/35 text-xs mb-2">
          {achieved ? 'Mērķis sasniegts! Lieliski!' : 'Pabeigt 2 nodarbības'}
        </div>
        <ProgressBar value={pct} color={achieved ? '#4ecdc4' : '#7c6fff'} height={3} />
      </div>
    </div>
  );
}

// ── Course navigation bottom ──────────────────────────────────────────────────

function CourseNav() {
  const navigate = useNavigate();
  const { getProgress } = useProgressStore();

  return (
    <div className="grid grid-cols-4 gap-2">
      {qualitySystems.map((sys) => {
        const p = getProgress(sys.id);
        const pct = Math.round((p.completedLevels.length / TOTAL_LEVELS) * 100);
        const started = p.completedLevels.length > 0;

        return (
          <motion.button
            key={sys.id}
            onClick={() => navigate(`/system/${sys.id}`)}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.97 }}
            className="flex flex-col items-center gap-2 p-3 rounded-xl border border-white/6 hover:border-white/15 hover:bg-white/3 transition-all cursor-pointer"
          >
            <span className="text-xl">{sys.icon}</span>
            <span className="text-white/55 text-xs font-medium leading-tight text-center">{sys.name}</span>
            <div className="w-full">
              <ProgressBar value={pct} color={sys.color} height={2} />
            </div>
            {started && (
              <span className="text-xs font-semibold" style={{ color: sys.color }}>
                {p.completedLevels.length}/{TOTAL_LEVELS}
              </span>
            )}
          </motion.button>
        );
      })}
    </div>
  );
}

// ── Main export ───────────────────────────────────────────────────────────────

export function DashboardScreen() {
  const navigate = useNavigate();
  const { user, loading } = useAuthStore();

  if (!loading && !user) {
    navigate('/');
    return null;
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: '#0a0a0f' }}>
        <div className="text-white/25 text-sm">Ielādē...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ background: '#0a0a0f' }}>
      <AppNavbar />

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-[220px_1fr] gap-10 items-start">

          {/* Left: Profile + streak + per-system progress */}
          <ProfileSidebar />

          {/* Right: main content */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="space-y-4"
          >
            <MainCourseCard />
            <DailyMission />

            {/* Section label */}
            <div className="pt-2">
              <p className="text-white/25 text-xs font-semibold uppercase tracking-wider mb-3">
                Visi kursi
              </p>
              <CourseNav />
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
}
