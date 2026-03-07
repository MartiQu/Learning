import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { useProgressStore } from '../store/progressStore';
import { qualitySystems } from '../data/systems';
import { levels } from '../data/levels';
import { logOut } from '../lib/firebase';
import { Logo } from '../components/ui/Logo';

const TOTAL_LEVELS = 10;
const DAYS = ['P', 'O', 'T', 'C', 'P', 'S', 'Sv'];

// ── Navbar ────────────────────────────────────────────────────────────────────
function DashboardNav({ activeTab, onTabChange }: { activeTab: string; onTabChange: (t: string) => void }) {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { getProgress } = useProgressStore();

  const totalXP = qualitySystems.reduce((sum, s) => sum + getProgress(s.id).totalXP, 0);
  const totalCompleted = qualitySystems.reduce((sum, s) => sum + getProgress(s.id).completedLevels.length, 0);

  return (
    <nav className="sticky top-0 z-40 flex items-center gap-6 px-8 py-4 border-b border-white/8"
      style={{ background: 'rgba(10,10,15,0.95)', backdropFilter: 'blur(12px)' }}>
      {/* Logo */}
      <button onClick={() => navigate('/')} className="text-white hover:opacity-70 transition-opacity cursor-pointer mr-4">
        <Logo height={20} color="currentColor" />
      </button>

      {/* Nav tabs */}
      {[
        { id: 'home', label: 'Sākums', icon: '⌂' },
        { id: 'courses', label: 'Kursi', icon: '📚' },
      ].map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`flex items-center gap-1.5 text-sm font-medium pb-1 transition-all cursor-pointer border-b-2 ${
            activeTab === tab.id
              ? 'text-white border-white'
              : 'text-white/40 border-transparent hover:text-white/70'
          }`}
        >
          <span>{tab.icon}</span>
          {tab.label}
        </button>
      ))}

      {/* Right side — stats + user */}
      <div className="ml-auto flex items-center gap-4">
        {/* XP */}
        <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/10 text-sm">
          <span className="text-gold font-bold">{totalXP.toLocaleString()}</span>
          <span className="text-white/40">XP</span>
        </div>
        {/* Pabeigti līmeņi */}
        <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/10 text-sm">
          <span className="text-white font-bold">{totalCompleted}</span>
          <span className="text-white/40">līmeņi</span>
        </div>
        {/* User avatar */}
        {user && (
          <div className="flex items-center gap-2">
            <button onClick={() => navigate('/profile')} className="cursor-pointer group flex items-center gap-2">
              <img
                src={user.photoURL ?? undefined}
                alt=""
                className="w-8 h-8 rounded-full border-2 border-white/20 group-hover:border-white/50 transition-colors"
              />
            </button>
            <button
              onClick={() => { logOut(); navigate('/'); }}
              className="text-white/30 hover:text-white/60 text-xs transition-colors cursor-pointer"
            >
              Iziet
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}

// ── Streak widget ─────────────────────────────────────────────────────────────
function StreakWidget() {
  const { getProgress } = useProgressStore();
  const totalCompleted = qualitySystems.reduce((sum, s) => sum + getProgress(s.id).completedLevels.length, 0);
  const today = new Date().getDay(); // 0=Sv, 1=P...
  const adjusted = (today + 6) % 7; // pārvērš uz P=0...Sv=6

  return (
    <div className="bg-surface rounded-2xl border border-white/8 p-5">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="font-heading text-4xl font-bold text-white">{totalCompleted}</span>
          <span className="text-2xl">⚡</span>
        </div>
        <div className="flex gap-1 opacity-30">
          <div className="w-5 h-5 rounded border border-white/20" />
          <div className="w-5 h-5 rounded border border-white/20" />
        </div>
      </div>
      <p className="text-white/50 text-sm mb-4">
        {totalCompleted === 0
          ? 'Atrisini pirmo uzdevumu, lai sāktu sēriju'
          : <>Esi pabeidzis <strong className="text-white">{totalCompleted}</strong> līmeņus kopā</>
        }
      </p>
      {/* Dienu rindiņa */}
      <div className="flex items-center justify-between">
        {DAYS.map((day, i) => (
          <div key={day} className="flex flex-col items-center gap-1.5">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center border transition-all ${
              i === adjusted
                ? 'border-gold bg-gold/20 text-gold'
                : i < adjusted
                ? 'border-white/20 bg-white/5 text-white/30'
                : 'border-white/10 text-white/20'
            }`}>
              <span className="text-xs">⚡</span>
            </div>
            <span className={`text-xs font-medium ${i === adjusted ? 'text-white' : 'text-white/30'}`}>
              {day}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Stats widget ──────────────────────────────────────────────────────────────
function StatsWidget() {
  const navigate = useNavigate();
  const { getProgress } = useProgressStore();

  const stats = qualitySystems.map((s) => {
    const p = getProgress(s.id);
    return { system: s, completed: p.completedLevels.length, xp: p.totalXP };
  });
  const totalXP = stats.reduce((a, s) => a + s.xp, 0);
  const totalStars = qualitySystems.reduce((sum, s) => {
    return sum + Object.values(getProgress(s.id).levelStars).reduce((a, b) => a + b, 0);
  }, 0);

  return (
    <div className="bg-surface rounded-2xl border border-white/8 p-5">
      <h3 className="text-white/50 text-xs font-semibold uppercase tracking-wider mb-4">Tavs progress</h3>
      <div className="grid grid-cols-3 gap-3 mb-4">
        {[
          { label: 'Kopējie XP', value: totalXP.toLocaleString(), color: '#e8c547', icon: '⚡' },
          { label: 'Zvaigznes', value: totalStars, color: '#ffd700', icon: '★' },
          { label: 'Kursi', value: stats.filter(s => s.completed > 0).length, color: '#4ecdc4', icon: '📚' },
        ].map((s) => (
          <div key={s.label} className="bg-white/4 rounded-xl p-3 text-center border border-white/6">
            <div className="text-lg mb-0.5">{s.icon}</div>
            <div className="font-heading font-bold text-lg" style={{ color: s.color }}>{s.value}</div>
            <div className="text-white/30 text-xs">{s.label}</div>
          </div>
        ))}
      </div>
      <button
        onClick={() => navigate('/profile')}
        className="w-full text-center text-white/40 hover:text-white/70 text-xs transition-colors cursor-pointer py-1"
      >
        Skatīt pilno profilu →
      </button>
    </div>
  );
}

// ── Sasniegumu widget ─────────────────────────────────────────────────────────
function AchievementsWidget() {
  const { getProgress } = useProgressStore();
  const completedSystems = qualitySystems.filter(
    (s) => getProgress(s.id).completedLevels.length >= TOTAL_LEVELS
  );
  const anyStarted = qualitySystems.some((s) => getProgress(s.id).completedLevels.length > 0);

  return (
    <div className="bg-surface rounded-2xl border border-white/8 p-5">
      <h3 className="text-white/50 text-xs font-semibold uppercase tracking-wider mb-3">Sasniegumi</h3>
      {completedSystems.length > 0 ? (
        <div className="space-y-2">
          {completedSystems.map((s) => (
            <div key={s.id} className="flex items-center gap-3 text-sm">
              <span className="text-xl">{s.icon}</span>
              <div>
                <div className="text-white font-medium">{s.name} pabeigts</div>
                <div className="text-white/40 text-xs">+10 eksāmena punkti</div>
              </div>
              <span className="ml-auto text-yellow-400">🏆</span>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex items-center gap-3 opacity-50">
          <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-xl">🔒</div>
          <div>
            <div className="text-white text-sm font-medium">ATBLOĶĒT LĪGAS</div>
            <div className="text-white/40 text-xs">{anyStarted ? 'Pabeidz pirmo kursu' : 'Pabeidz pirmo nodarbību'}</div>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Kursa karte (labā puse) ───────────────────────────────────────────────────
function CourseCard({ systemId }: { systemId: string }) {
  const navigate = useNavigate();
  const { getProgress, isLevelUnlocked } = useProgressStore();
  const system = qualitySystems.find((s) => s.id === systemId)!;
  const progress = getProgress(systemId);
  const systemLevels = levels.filter((l) => l.systemId === systemId).sort((a, b) => a.levelNumber - b.levelNumber);
  const pct = Math.round((progress.completedLevels.length / TOTAL_LEVELS) * 100);

  // Nākamais atbloķētais līmenis
  const nextLevel = systemLevels.find((l) =>
    isLevelUnlocked(systemId, l.levelNumber) && !progress.completedLevels.includes(l.levelNumber)
  ) ?? systemLevels[0]!;

  const handleStart = () => navigate(`/system/${systemId}/level/${nextLevel.levelNumber}`);

  return (
    <motion.div
      key={systemId}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-surface rounded-2xl border border-white/8 overflow-hidden h-full flex flex-col"
      style={{ borderColor: `${system.color}33` }}
    >
      {/* Augšdaļa — krāsains header */}
      <div className="relative p-8 flex flex-col items-center justify-center text-center"
        style={{ background: `linear-gradient(160deg, ${system.color}18, transparent)`, minHeight: 200 }}>
        <div className="text-7xl mb-4">{system.icon}</div>
        <h2 className="font-heading text-2xl font-bold text-white">{system.name}</h2>
        <div className="text-xs font-bold uppercase tracking-widest mt-1" style={{ color: system.color }}>
          LĪMENIS {nextLevel.levelNumber}
        </div>
        {/* Progress ring apakšā */}
        <div className="absolute bottom-4 right-4 flex items-center gap-1.5">
          <div className="h-1.5 w-20 rounded-full bg-white/10">
            <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, background: system.color }} />
          </div>
          <span className="text-white/40 text-xs">{pct}%</span>
        </div>
      </div>

      {/* Līmeņu saraksts */}
      <div className="flex-1 p-5 space-y-2 overflow-y-auto">
        {systemLevels.slice(0, 6).map((level) => {
          const done = progress.completedLevels.includes(level.levelNumber);
          const unlocked = isLevelUnlocked(systemId, level.levelNumber);
          const stars = progress.levelStars[level.levelNumber] ?? 0;
          const isNext = level.id === nextLevel.id;

          return (
            <button
              key={level.id}
              onClick={() => unlocked && navigate(`/system/${systemId}/level/${level.levelNumber}`)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all ${
                isNext
                  ? 'border cursor-pointer'
                  : done
                  ? 'hover:bg-white/3 cursor-pointer'
                  : 'opacity-40 cursor-not-allowed'
              }`}
              style={isNext ? { borderColor: `${system.color}50`, background: `${system.color}0d` } : {}}
            >
              {/* Ikona */}
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 ${
                done ? 'text-black' : isNext ? 'border-2' : 'bg-white/5 text-white/20'
              }`}
                style={done
                  ? { background: system.color }
                  : isNext
                  ? { borderColor: system.color, color: system.color }
                  : {}}>
                {done ? '✓' : unlocked ? level.levelNumber : '🔒'}
              </div>
              {/* Teksts */}
              <div className="text-left flex-1 min-w-0">
                <div className={`font-medium truncate ${isNext ? 'text-white' : done ? 'text-white/70' : 'text-white/30'}`}>
                  {level.title}
                </div>
                <div className="text-white/30 text-xs truncate">{level.topic}</div>
              </div>
              {/* Zvaigznes / bulta */}
              {done && stars > 0 && (
                <span className="text-yellow-400 text-xs shrink-0">{'★'.repeat(stars)}</span>
              )}
              {isNext && !done && (
                <span className="text-white/40 shrink-0" style={{ color: system.color }}>→</span>
              )}
            </button>
          );
        })}

        {systemLevels.length > 6 && (
          <button
            onClick={() => navigate(`/system/${systemId}`)}
            className="w-full text-center text-white/30 hover:text-white/60 text-xs py-1 transition-colors cursor-pointer"
          >
            Skatīt visus {systemLevels.length} līmeņus →
          </button>
        )}
      </div>

      {/* Sākt/Turpināt poga */}
      <div className="p-5 pt-0">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleStart}
          className="w-full py-4 rounded-2xl font-bold text-base cursor-pointer transition-all"
          style={{
            background: `linear-gradient(135deg, ${system.color}, ${system.color}bb)`,
            color: '#000',
            boxShadow: `0 4px 20px ${system.color}40`,
          }}
        >
          {progress.completedLevels.length === 0 ? 'Sākt kursu' : 'Turpināt'}
        </motion.button>
      </div>
    </motion.div>
  );
}

// ── Kursu thumbnails (apakšā) ─────────────────────────────────────────────────
function CourseThumbnails({ activeId, onSelect }: { activeId: string; onSelect: (id: string) => void }) {
  const { getProgress } = useProgressStore();

  return (
    <div className="flex gap-3 mt-4">
      {qualitySystems.map((system) => {
        const p = getProgress(system.id);
        const pct = Math.round((p.completedLevels.length / TOTAL_LEVELS) * 100);
        const isActive = system.id === activeId;

        return (
          <motion.button
            key={system.id}
            onClick={() => onSelect(system.id)}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.96 }}
            className={`flex-1 p-3 rounded-xl border text-center cursor-pointer transition-all ${
              isActive ? 'border-white/30 bg-white/8' : 'border-white/8 hover:border-white/20 bg-white/3'
            }`}
          >
            <div className="text-2xl mb-1">{system.icon}</div>
            <div className="text-white/60 text-xs font-medium truncate">{system.name}</div>
            {/* Mini progress bar */}
            <div className="mt-1.5 h-1 rounded-full bg-white/10">
              <div className="h-full rounded-full" style={{ width: `${pct}%`, background: system.color }} />
            </div>
          </motion.button>
        );
      })}
    </div>
  );
}

// ── Galvenais eksports ────────────────────────────────────────────────────────
export function DashboardScreen() {
  const navigate = useNavigate();
  const { user, loading } = useAuthStore();
  const [activeTab, setActiveTab] = useState('home');
  const [activeCourseId, setActiveCourseId] = useState(qualitySystems[0]!.id);

  // Ja nav pieteicies → uz sākumlapu
  if (!loading && !user) {
    navigate('/');
    return null;
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: '#0a0a0f' }}>
        <div className="text-white/40 text-sm">Ielādē...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ background: '#0a0a0f' }}>
      <DashboardNav activeTab={activeTab} onTabChange={setActiveTab} />

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Sveiciens */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="font-heading text-3xl font-bold text-white">
            Labrīt, {user?.displayName?.split(' ')[0]}! 👋
          </h1>
          <p className="text-white/40 mt-1">Ko šodien mācāmies?</p>
        </motion.div>

        {/* Galvenais 2 kolonnu izkārtojums */}
        <div className="grid lg:grid-cols-[320px_1fr] gap-6 items-start">

          {/* ── Kreisā kolonna ──────────────────────────────────────────── */}
          <div className="space-y-4">
            <motion.div initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
              <StreakWidget />
            </motion.div>
            <motion.div initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
              <StatsWidget />
            </motion.div>
            <motion.div initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
              <AchievementsWidget />
            </motion.div>
          </div>

          {/* ── Labā kolonna ────────────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15 }}
          >
            <CourseCard systemId={activeCourseId} />
            <CourseThumbnails activeId={activeCourseId} onSelect={setActiveCourseId} />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
