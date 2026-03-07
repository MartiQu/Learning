import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { useProgressStore } from '../store/progressStore';
import { qualitySystems } from '../data/systems';
import { logOut } from '../lib/firebase';
import { Logo } from '../components/ui/Logo';

const TOTAL_LEVELS = 10;
const DAYS = ['S', 'Sv', 'P', 'O', 'T', 'C', 'Pk'];

// ── Navbar ────────────────────────────────────────────────────────────────────
function DashboardNav({ activeTab, onTabChange }: { activeTab: string; onTabChange: (t: string) => void }) {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { getProgress } = useProgressStore();

  const totalXP = qualitySystems.reduce((sum, s) => sum + getProgress(s.id).totalXP, 0);
  const totalCompleted = qualitySystems.reduce((sum, s) => sum + getProgress(s.id).completedLevels.length, 0);

  return (
    <nav className="sticky top-0 z-40 flex items-center gap-2 px-6 py-3 border-b border-gray-200 bg-white">
      {/* Logo */}
      <button onClick={() => navigate('/')} className="cursor-pointer hover:opacity-70 transition-opacity mr-4">
        <Logo height={20} color="#111111" />
      </button>

      {/* Nav tabs */}
      {[
        { id: 'home', label: 'Sākums', icon: '⌂' },
        { id: 'courses', label: 'Kursi', icon: '☰' },
      ].map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`flex items-center gap-1.5 px-2 py-3 text-sm font-medium transition-all cursor-pointer border-b-2 -mb-px ${
            activeTab === tab.id
              ? 'text-gray-900 border-gray-900'
              : 'text-gray-500 border-transparent hover:text-gray-700'
          }`}
        >
          <span className="text-base">{tab.icon}</span>
          {tab.label}
        </button>
      ))}

      {/* Right side */}
      <div className="ml-auto flex items-center gap-2">
        {/* Streak */}
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-gray-200 text-sm font-medium text-gray-700">
          <span>{totalCompleted}</span>
          <span className="text-amber-500">⚡</span>
        </div>
        {/* XP */}
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-gray-200 text-sm font-medium text-gray-700">
          <span>{totalXP.toLocaleString()}</span>
          <span className="text-yellow-500">★</span>
        </div>
        {/* Hamburger + avatar */}
        {user && (
          <div className="flex items-center gap-2 ml-1">
            <button
              onClick={() => navigate('/profile')}
              className="cursor-pointer group"
            >
              <img
                src={user.photoURL ?? undefined}
                alt=""
                className="w-8 h-8 rounded-full border-2 border-gray-200 group-hover:border-gray-400 transition-colors"
              />
            </button>
            <button
              onClick={() => { logOut(); navigate('/'); }}
              className="text-gray-400 hover:text-gray-600 text-xs transition-colors cursor-pointer px-2 py-1 rounded border border-gray-200 hover:border-gray-300"
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
  const today = new Date().getDay(); // 0=Sun

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-1.5">
          <span className="font-extrabold text-4xl text-gray-900 leading-none">{totalCompleted}</span>
          <span className="text-2xl text-amber-400">⚡</span>
        </div>
        <div className="flex gap-1 text-gray-300">
          <span className="text-lg">□</span>
          <span className="text-lg">□</span>
        </div>
      </div>
      <p className="text-gray-500 text-sm mb-5">
        {totalCompleted === 0
          ? <>Atrisini <strong className="text-gray-900">3 uzdevumus</strong>, lai sāktu sēriju</>
          : <>Esi pabeidzis <strong className="text-gray-900">{totalCompleted}</strong> uzdevumus</>
        }
      </p>
      {/* Dienu rindiņa */}
      <div className="flex items-center justify-between">
        {DAYS.map((day, i) => {
          const isToday = i === today;
          const isPast = i < today;
          return (
            <div key={day + i} className="flex flex-col items-center gap-1.5">
              <div className={`w-9 h-9 rounded-full flex items-center justify-center border-2 transition-all ${
                isToday
                  ? 'border-gray-300 bg-white'
                  : isPast
                  ? 'border-gray-200 bg-gray-50'
                  : 'border-gray-100 bg-gray-50'
              }`}>
                <span className={`text-sm ${isToday ? 'text-gray-500' : 'text-gray-300'}`}>⚡</span>
              </div>
              <span className={`text-xs font-semibold ${isToday ? 'text-gray-900' : 'text-gray-400'}`}>
                {day}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── Leagues widget ─────────────────────────────────────────────────────────────
function LeaguesWidget() {
  const { getProgress } = useProgressStore();
  const anyStarted = qualitySystems.some((s) => getProgress(s.id).completedLevels.length > 0);
  const completedCount = qualitySystems.filter((s) => getProgress(s.id).completedLevels.length >= TOTAL_LEVELS).length;

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-4 shadow-sm flex items-center gap-4">
      <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center text-gray-400 shrink-0 text-2xl">
        {completedCount > 0 ? '🏆' : '🛡️'}
      </div>
      <div>
        <div className="text-xs font-bold uppercase tracking-wider text-gray-500">
          {completedCount > 0 ? 'LĪGAS ATBLOĶĒTAS' : 'ATBLOĶĒT LĪGAS'}
        </div>
        <div className="text-sm text-gray-400">
          {completedCount > 0
            ? `${completedCount} kurss pabeigts`
            : anyStarted
            ? 'Pabeidz pirmo kursu'
            : 'Pabeidz pirmo nodarbību'
          }
        </div>
      </div>
    </div>
  );
}

// ── Galvenā kursa karte (labā puse) ───────────────────────────────────────────
function MainCourseCard({ onSelectSystem }: { onSelectSystem: (id: string) => void }) {
  const navigate = useNavigate();
  const { getProgress } = useProgressStore();

  // Aktīvais (pirmais nesākts vai pirmais) kurss
  const activeSys =
    qualitySystems.find((s) => {
      const p = getProgress(s.id);
      return p.completedLevels.length > 0 && p.completedLevels.length < TOTAL_LEVELS;
    }) ??
    qualitySystems.find((s) => getProgress(s.id).completedLevels.length === 0) ??
    qualitySystems[0]!;

  const handleStart = (sysId: string) => {
    const p = getProgress(sysId);
    const nextLevel = p.completedLevels.length + 1;
    navigate(`/system/${sysId}/level/${Math.min(nextLevel, TOTAL_LEVELS)}`);
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
      {/* Ilustrācijas zona */}
      <div
        className="flex flex-col items-center justify-center pt-10 pb-6 px-8 text-center relative"
        style={{
          background: 'linear-gradient(160deg, #f0f4ff 0%, #fafbff 100%)',
          minHeight: 220,
        }}
      >
        {/* Liela ikona */}
        <div className="text-7xl mb-4 select-none" style={{ filter: 'drop-shadow(0 8px 24px rgba(0,0,0,0.12))' }}>
          🎓
        </div>
        <h2 className="font-bold text-2xl text-gray-900 mb-1">Kvalitātes sistēmas</h2>
        <div className="text-xs font-bold uppercase tracking-widest text-blue-600">KURSS 1</div>
      </div>

      {/* Kursu saraksts */}
      <div className="p-5 space-y-1">
        {qualitySystems.map((sys) => {
          const p = getProgress(sys.id);
          const done = p.completedLevels.length >= TOTAL_LEVELS;
          const started = p.completedLevels.length > 0;
          const isActive = sys.id === activeSys.id;

          return (
            <button
              key={sys.id}
              onClick={() => onSelectSystem(sys.id)}
              className={`w-full flex items-center gap-4 px-3 py-3 rounded-xl transition-all cursor-pointer text-left ${
                isActive ? 'bg-gray-50' : 'hover:bg-gray-50'
              }`}
            >
              {/* Ikona */}
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center text-lg shrink-0 border-2"
                style={
                  done
                    ? { background: sys.color, borderColor: sys.color, color: '#fff' }
                    : started
                    ? { background: `${sys.color}20`, borderColor: sys.color, color: sys.color }
                    : { background: '#f3f4f6', borderColor: '#e5e7eb', color: '#9ca3af' }
                }
              >
                {sys.icon}
              </div>
              {/* Teksts */}
              <div className="flex-1 min-w-0">
                <div className={`font-semibold text-sm truncate ${done || started ? 'text-gray-900' : 'text-gray-500'}`}>
                  {sys.name}
                </div>
                <div className="text-xs text-gray-400 truncate">
                  {done
                    ? 'Pabeigts ✓'
                    : started
                    ? `${p.completedLevels.length}/${TOTAL_LEVELS} līmeņi`
                    : 'Nav sākts'
                  }
                </div>
              </div>
              {/* Toggle indikators */}
              <div className={`w-5 h-5 rounded-full border-2 shrink-0 flex items-center justify-center ${
                done
                  ? 'border-green-400 bg-green-400'
                  : started
                  ? 'border-blue-400 bg-blue-100'
                  : 'border-gray-200 bg-white'
              }`}>
                {done && <span className="text-white text-xs">✓</span>}
                {started && !done && (
                  <div className="w-2 h-2 rounded-full bg-blue-400" />
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* Sākt poga */}
      <div className="px-5 pb-5">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => handleStart(activeSys.id)}
          className="w-full py-4 rounded-2xl font-bold text-white text-base cursor-pointer"
          style={{ background: 'linear-gradient(90deg, #4f6ef7, #3b5bdb)', boxShadow: '0 4px 16px rgba(79,110,247,0.35)' }}
        >
          {getProgress(activeSys.id).completedLevels.length === 0 ? 'Sākt' : 'Turpināt'}
        </motion.button>
      </div>
    </div>
  );
}

// ── Kursu thumbnails (apakšā) ─────────────────────────────────────────────────
function CourseThumbnails({ onSelect }: { onSelect: (id: string) => void }) {
  const { getProgress } = useProgressStore();

  return (
    <div className="flex gap-3 mt-4">
      {qualitySystems.map((sys) => {
        const p = getProgress(sys.id);
        const pct = Math.round((p.completedLevels.length / TOTAL_LEVELS) * 100);

        return (
          <motion.button
            key={sys.id}
            onClick={() => onSelect(sys.id)}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.96 }}
            className="flex-1 p-3 rounded-xl border-2 border-gray-200 bg-white hover:border-gray-300 transition-all cursor-pointer text-center shadow-sm"
          >
            <div
              className="w-10 h-10 rounded-xl mx-auto mb-2 flex items-center justify-center text-xl"
              style={{ background: `${sys.color}20` }}
            >
              {sys.icon}
            </div>
            {/* Mini progress bar */}
            <div className="h-1 rounded-full bg-gray-100">
              <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, background: sys.color }} />
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

  if (!loading && !user) {
    navigate('/');
    return null;
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-gray-400 text-sm">Ielādē...</div>
      </div>
    );
  }

  const handleSelectSystem = (id: string) => navigate(`/system/${id}`);

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardNav activeTab={activeTab} onTabChange={setActiveTab} />

      <div className="max-w-5xl mx-auto px-4 py-10">
        {/* 2 kolonnu izkārtojums */}
        <div className="grid lg:grid-cols-[300px_1fr] gap-6 items-start">

          {/* ── Kreisā kolonna ──────────────────────────────────────────── */}
          <div className="space-y-4">
            <motion.div initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.05 }}>
              <StreakWidget />
            </motion.div>
            <motion.div initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 }}>
              <LeaguesWidget />
            </motion.div>
          </div>

          {/* ── Labā kolonna ────────────────────────────────────────────── */}
          <motion.div initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
            <MainCourseCard onSelectSystem={handleSelectSystem} />
            <CourseThumbnails onSelect={handleSelectSystem} />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
