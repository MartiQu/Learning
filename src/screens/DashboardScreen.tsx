import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { useProgressStore } from '../store/progressStore';
import { qualitySystems } from '../data/systems';
import { logOut } from '../lib/firebase';
import { Logo } from '../components/ui/Logo';
import { ProgressBar } from '../components/ui/ProgressBar';
import { ProgressRing } from '../components/ui/ProgressRing';

const TOTAL_LEVELS = 10;
const DAYS = ['S', 'Sv', 'P', 'O', 'T', 'C', 'Pk'];

// ── Hamburger dropdown ─────────────────────────────────────────────────────
function HamburgerMenu() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const items = [
    { label: 'Iestatījumi', icon: '⚙️', action: () => {} },
    { label: 'Par mums', icon: 'ℹ️', action: () => {} },
    { label: 'Palīdzība', icon: '❓', action: () => {} },
    { label: 'Produkta atjauninājumi', icon: '🔔', action: () => {} },
  ];

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-9 h-9 flex flex-col items-center justify-center gap-1.5 rounded-full border border-white/15 hover:border-white/30 hover:bg-white/5 transition-all cursor-pointer"
      >
        <span className="block w-4 h-0.5 bg-white/70 rounded-full" />
        <span className="block w-4 h-0.5 bg-white/70 rounded-full" />
        <span className="block w-4 h-0.5 bg-white/70 rounded-full" />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -6 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -6 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 top-11 w-56 rounded-2xl border border-white/10 shadow-2xl overflow-hidden z-50"
            style={{ background: '#16161e' }}
          >
            {items.map((item) => (
              <button
                key={item.label}
                onClick={() => { item.action(); setOpen(false); }}
                className="w-full flex items-center gap-3 px-4 py-3 text-sm text-white/70 hover:bg-white/6 hover:text-white transition-all cursor-pointer text-left"
              >
                <span className="text-base">{item.icon}</span>
                {item.label}
              </button>
            ))}
            <div className="border-t border-white/8 mx-3" />
            <button
              onClick={() => { logOut(); navigate('/'); setOpen(false); }}
              className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-all cursor-pointer text-left"
            >
              <span className="text-base">🚪</span>
              Iziet
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── Navbar ─────────────────────────────────────────────────────────────────
function HomeNav({ activeTab, onTabChange }: { activeTab: string; onTabChange: (t: string) => void }) {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { getProgress } = useProgressStore();

  const totalXP = qualitySystems.reduce((sum, s) => sum + getProgress(s.id).totalXP, 0);
  const totalCompleted = qualitySystems.reduce((sum, s) => sum + getProgress(s.id).completedLevels.length, 0);

  return (
    <nav
      className="sticky top-0 z-40 flex items-center gap-4 px-8 py-4 border-b border-white/8"
      style={{ background: 'rgba(10,10,15,0.96)', backdropFilter: 'blur(12px)' }}
    >
      <button onClick={() => navigate('/home')} className="text-white hover:opacity-70 transition-opacity cursor-pointer mr-2">
        <Logo height={20} color="currentColor" />
      </button>

      {[
        { id: 'home', label: 'Sākums' },
        { id: 'courses', label: 'Kursi' },
      ].map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`text-sm font-medium pb-0.5 transition-all cursor-pointer border-b-2 ${
            activeTab === tab.id
              ? 'text-white border-white'
              : 'text-white/40 border-transparent hover:text-white/70'
          }`}
        >
          {tab.label}
        </button>
      ))}

      <div className="ml-auto flex items-center gap-3">
        <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/10 text-sm">
          <span className="text-amber-400 font-bold">{totalCompleted}</span>
          <span className="text-white/40">⚡</span>
        </div>
        <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/10 text-sm">
          <span className="text-gold font-bold">{totalXP.toLocaleString()}</span>
          <span className="text-white/40">XP</span>
        </div>
        {user && (
          <img src={user.photoURL ?? undefined} alt="" className="w-8 h-8 rounded-full border-2 border-white/20" />
        )}
        <HamburgerMenu />
      </div>
    </nav>
  );
}

// ── Lietotāja karte ────────────────────────────────────────────────────────
function UserCard() {
  const { user } = useAuthStore();
  const { getProgress, reset } = useProgressStore();

  const allProgress = qualitySystems.map((s) => getProgress(s.id));
  const totalXP = allProgress.reduce((a, p) => a + p.totalXP, 0);
  const totalCompleted = allProgress.reduce((a, p) => a + p.completedLevels.length, 0);
  const totalPossible = qualitySystems.length * TOTAL_LEVELS;
  const totalStars = allProgress.reduce((a, p) => a + Object.values(p.levelStars).reduce((b, s) => b + s, 0), 0);
  const bonusPoints = allProgress.filter((p) => p.completedLevels.length >= TOTAL_LEVELS).length * 10;

  return (
    <div className="bg-surface rounded-2xl border border-white/8 p-5">
      {/* Avatar + vārds */}
      <div className="flex items-center gap-3 mb-5">
        {user?.photoURL && (
          <img src={user.photoURL} alt="" className="w-12 h-12 rounded-full border-2 border-white/15" />
        )}
        <div>
          <div className="font-bold text-white text-sm">{user?.displayName}</div>
          <div className="text-white/30 text-xs truncate max-w-[140px]">{user?.email}</div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-2 mb-4">
        {[
          { label: 'Kopējie XP', value: totalXP.toLocaleString(), color: '#e8c547', icon: '⚡' },
          { label: 'Līmeņi', value: `${totalCompleted}/${totalPossible}`, color: '#4ecdc4', icon: '✓' },
          { label: 'Zvaigznes', value: totalStars, color: '#ffd700', icon: '★' },
          { label: 'Eksāmens', value: `+${bonusPoints}pt`, color: '#7c6fff', icon: '🎓' },
        ].map((s) => (
          <div key={s.label} className="bg-white/4 rounded-xl p-3 border border-white/6">
            <div className="text-lg">{s.icon}</div>
            <div className="font-bold text-base mt-0.5" style={{ color: s.color }}>{s.value}</div>
            <div className="text-white/30 text-xs">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Progress katrai sistēmai */}
      <div className="space-y-3">
        {qualitySystems.map((sys) => {
          const p = getProgress(sys.id);
          const pct = Math.round((p.completedLevels.length / TOTAL_LEVELS) * 100);
          return (
            <div key={sys.id}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-white/60 text-xs flex items-center gap-1.5">
                  <span>{sys.icon}</span>{sys.name}
                </span>
                <span className="text-white/30 text-xs">{p.completedLevels.length}/{TOTAL_LEVELS}</span>
              </div>
              <ProgressBar value={pct} color={sys.color} height={4} />
            </div>
          );
        })}
      </div>

      {/* Reset */}
      <button
        onClick={() => {
          if (window.confirm('Atiestatīt VISU progresu?')) reset();
        }}
        className="mt-4 w-full text-center text-white/20 hover:text-white/50 text-xs transition-colors cursor-pointer py-1"
      >
        Atiestatīt progresu
      </button>
    </div>
  );
}

// ── Streak widget ──────────────────────────────────────────────────────────
function StreakWidget() {
  const { getProgress } = useProgressStore();
  const totalCompleted = qualitySystems.reduce((sum, s) => sum + getProgress(s.id).completedLevels.length, 0);
  const today = new Date().getDay();

  return (
    <div className="bg-surface rounded-2xl border border-white/8 p-5">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-1.5">
          <span className="font-extrabold text-4xl text-white leading-none">{totalCompleted}</span>
          <span className="text-2xl text-amber-400">⚡</span>
        </div>
      </div>
      <p className="text-white/40 text-sm mb-4">
        {totalCompleted === 0
          ? <>Atrisini <strong className="text-white/70">3 uzdevumus</strong>, lai sāktu sēriju</>
          : <><strong className="text-white">{totalCompleted}</strong> uzdevumi pabeigti</>
        }
      </p>
      <div className="flex items-center justify-between">
        {DAYS.map((day, i) => (
          <div key={day + i} className="flex flex-col items-center gap-1.5">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center border transition-all ${
              i === today ? 'border-gold/50 bg-gold/15' : 'border-white/10 bg-white/3'
            }`}>
              <span className={`text-xs ${i === today ? 'text-gold' : 'text-white/20'}`}>⚡</span>
            </div>
            <span className={`text-xs font-medium ${i === today ? 'text-white' : 'text-white/25'}`}>{day}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Sasniegumi ─────────────────────────────────────────────────────────────
function AchievementsWidget() {
  const { getProgress } = useProgressStore();
  const anyStarted = qualitySystems.some((s) => getProgress(s.id).completedLevels.length > 0);
  const completed = qualitySystems.filter((s) => getProgress(s.id).completedLevels.length >= TOTAL_LEVELS);

  return (
    <div className="bg-surface rounded-2xl border border-white/8 p-4 flex items-center gap-4">
      <div className="w-11 h-11 rounded-xl bg-white/5 border border-white/8 flex items-center justify-center text-2xl shrink-0">
        {completed.length > 0 ? '🏆' : '🛡️'}
      </div>
      <div>
        <div className="text-xs font-bold uppercase tracking-wider text-white/40">
          {completed.length > 0 ? 'LĪGAS ATBLOĶĒTAS' : 'ATBLOĶĒT LĪGAS'}
        </div>
        <div className="text-sm text-white/30">
          {completed.length > 0
            ? `${completed.length} kurss pabeigts`
            : anyStarted ? 'Pabeidz pirmo kursu' : 'Pabeidz pirmo nodarbību'
          }
        </div>
      </div>
    </div>
  );
}

// ── Galvenā kursa karte ────────────────────────────────────────────────────
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

  const handleStart = (sysId: string) => {
    const p = getProgress(sysId);
    const next = Math.min(p.completedLevels.length + 1, TOTAL_LEVELS);
    navigate(`/system/${sysId}/level/${next}`);
  };

  return (
    <div className="bg-surface rounded-2xl border border-white/8 overflow-hidden"
      style={{ borderColor: `${activeSys.color}22` }}>
      {/* Ilustrācijas zona */}
      <div
        className="flex flex-col items-center justify-center pt-10 pb-6 px-8 text-center"
        style={{
          background: `linear-gradient(160deg, ${activeSys.color}12 0%, transparent 60%)`,
          minHeight: 200,
        }}
      >
        <div className="text-7xl mb-4 select-none" style={{ filter: 'drop-shadow(0 8px 32px rgba(0,0,0,0.4))' }}>
          🎓
        </div>
        <h2 className="font-bold text-2xl text-white mb-1">Kvalitātes sistēmas</h2>
        <div className="text-xs font-bold uppercase tracking-widest" style={{ color: activeSys.color }}>KURSS 1</div>
      </div>

      {/* Kursu saraksts */}
      <div className="p-5 space-y-1">
        {qualitySystems.map((sys) => {
          const p = getProgress(sys.id);
          const done = p.completedLevels.length >= TOTAL_LEVELS;
          const started = p.completedLevels.length > 0;
          const pct = Math.round((p.completedLevels.length / TOTAL_LEVELS) * 100);
          const isActive = sys.id === activeSys.id;

          return (
            <button
              key={sys.id}
              onClick={() => navigate(`/system/${sys.id}`)}
              className={`w-full flex items-center gap-4 px-3 py-3 rounded-xl transition-all cursor-pointer text-left ${
                isActive ? 'bg-white/6' : 'hover:bg-white/4'
              }`}
            >
              <div className="relative shrink-0">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-lg border-2"
                  style={
                    done
                      ? { background: sys.color, borderColor: sys.color, color: '#000' }
                      : started
                      ? { background: `${sys.color}20`, borderColor: `${sys.color}60`, color: sys.color }
                      : { background: 'rgba(255,255,255,0.05)', borderColor: 'rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.3)' }
                  }
                >
                  {sys.icon}
                </div>
                {started && !done && (
                  <div className="absolute -bottom-0.5 -right-0.5">
                    <ProgressRing value={pct} size={18} strokeWidth={2.5} color={sys.color} />
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className={`font-semibold text-sm truncate ${started || done ? 'text-white' : 'text-white/40'}`}>
                  {sys.name}
                </div>
                <div className="text-white/30 text-xs">
                  {done ? 'Pabeigts ✓' : started ? `${p.completedLevels.length}/${TOTAL_LEVELS} līmeņi` : 'Nav sākts'}
                </div>
              </div>
              <div className={`w-5 h-5 rounded-full border-2 shrink-0 flex items-center justify-center ${
                done ? 'border-green-500 bg-green-500' : started ? 'border-white/30' : 'border-white/10'
              }`}>
                {done && <span className="text-white text-xs leading-none">✓</span>}
                {started && !done && <div className="w-2 h-2 rounded-full" style={{ background: sys.color }} />}
              </div>
            </button>
          );
        })}
      </div>

      {/* Sākt/Turpināt poga */}
      <div className="px-5 pb-5">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => handleStart(activeSys.id)}
          className="w-full py-4 rounded-2xl font-bold text-white text-base cursor-pointer"
          style={{
            background: `linear-gradient(135deg, ${activeSys.color}, ${activeSys.color}99)`,
            boxShadow: `0 4px 20px ${activeSys.color}35`,
            color: activeSys.color === '#e8c547' ? '#000' : '#fff',
          }}
        >
          {getProgress(activeSys.id).completedLevels.length === 0 ? 'Sākt' : 'Turpināt'}
        </motion.button>
      </div>
    </div>
  );
}

// ── Kursu thumbnails ───────────────────────────────────────────────────────
function CourseThumbnails() {
  const navigate = useNavigate();
  const { getProgress } = useProgressStore();

  return (
    <div className="flex gap-3 mt-4">
      {qualitySystems.map((sys) => {
        const p = getProgress(sys.id);
        const pct = Math.round((p.completedLevels.length / TOTAL_LEVELS) * 100);

        return (
          <motion.button
            key={sys.id}
            onClick={() => navigate(`/system/${sys.id}`)}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.96 }}
            className="flex-1 p-3 rounded-xl border border-white/8 bg-surface hover:border-white/20 transition-all cursor-pointer text-center"
          >
            <div
              className="w-10 h-10 rounded-xl mx-auto mb-2 flex items-center justify-center text-xl"
              style={{ background: `${sys.color}18` }}
            >
              {sys.icon}
            </div>
            <div className="h-1 rounded-full bg-white/8">
              <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, background: sys.color }} />
            </div>
          </motion.button>
        );
      })}
    </div>
  );
}

// ── Galvenais eksports ─────────────────────────────────────────────────────
export function DashboardScreen() {
  const navigate = useNavigate();
  const { user, loading } = useAuthStore();
  const [activeTab, setActiveTab] = useState('home');

  if (!loading && !user) {
    navigate('/');
    return null;
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: '#0a0a0f' }}>
        <div className="text-white/30 text-sm">Ielādē...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ background: '#0a0a0f' }}>
      <HomeNav activeTab={activeTab} onTabChange={setActiveTab} />

      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-[300px_1fr] gap-6 items-start">

          {/* Kreisā kolonna */}
          <div className="space-y-4">
            <motion.div initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.05 }}>
              <UserCard />
            </motion.div>
            <motion.div initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.12 }}>
              <StreakWidget />
            </motion.div>
            <motion.div initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.18 }}>
              <AchievementsWidget />
            </motion.div>
          </div>

          {/* Labā kolonna */}
          <motion.div initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
            <MainCourseCard />
            <CourseThumbnails />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
