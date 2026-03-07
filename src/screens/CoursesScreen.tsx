import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { useProgressStore } from '../store/progressStore';
import { qualitySystems } from '../data/systems';
import { AppNavbar } from '../components/ui/AppNavbar';
import { ProgressBar } from '../components/ui/ProgressBar';

const TOTAL_LEVELS = 10;

const DIFFICULTY: Record<string, { label: string; color: string }> = {
  iso9001:   { label: 'Iesācējs',     color: '#4ecdc4' },
  tqm:       { label: 'Vidējs',       color: '#e8c547' },
  sixsigma:  { label: 'Vidējs',       color: '#e8c547' },
  lean:      { label: 'Iesācējs',     color: '#4ecdc4' },
  '7s':      { label: 'Iesācējs',     color: '#4ecdc4' },
};


// ── Kursa karte ────────────────────────────────────────────────────────────
function CourseCard({ system, index }: { system: typeof qualitySystems[number]; index: number }) {
  const navigate = useNavigate();
  const { getProgress } = useProgressStore();
  const p = getProgress(system.id);
  const pct = Math.round((p.completedLevels.length / TOTAL_LEVELS) * 100);
  const started = p.completedLevels.length > 0;
  const done = p.completedLevels.length >= TOTAL_LEVELS;
  const diff = DIFFICULTY[system.id]!;

  const handleClick = () => navigate(`/system/${system.id}`);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.05 + index * 0.07 }}
      onClick={handleClick}
      className="group bg-surface rounded-2xl border border-white/8 overflow-hidden cursor-pointer transition-all hover:border-white/20 flex flex-col"
      style={{ borderColor: started ? `${system.color}30` : undefined }}
    >
      {/* Ilustrācijas zona */}
      <div
        className="relative flex items-center justify-center"
        style={{
          background: `linear-gradient(145deg, ${system.color}20 0%, ${system.color}08 100%)`,
          height: 160,
        }}
      >
        {/* Fona gaismiņa */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{ background: `radial-gradient(circle at 50% 50%, ${system.color}15, transparent 70%)` }}
        />

        {/* Ikona */}
        <span
          className="text-6xl select-none relative z-10 transition-transform duration-300 group-hover:scale-110"
          style={{ filter: 'drop-shadow(0 8px 24px rgba(0,0,0,0.4))' }}
        >
          {system.icon}
        </span>

        {/* Done badge */}
        {done && (
          <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-1 rounded-full text-xs font-bold"
            style={{ background: `${system.color}30`, color: system.color }}>
            ✓ Pabeigts
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-5 flex flex-col flex-1">
        {/* Virsraksts + grūtības pakāpe */}
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-bold text-white text-base leading-tight">{system.name}</h3>
          <span
            className="shrink-0 text-xs font-semibold px-2 py-0.5 rounded-full"
            style={{ background: `${diff.color}18`, color: diff.color }}
          >
            {diff.label}
          </span>
        </div>

        {/* Apraksts — fiksēts augstums */}
        <p className="text-white/40 text-sm leading-relaxed mb-4 line-clamp-2 min-h-[2.5rem]">
          {system.description}
        </p>

        {/* Progress */}
        <div className="mb-4">
          <div className="flex justify-between text-xs text-white/30 mb-1.5">
            <span>{p.completedLevels.length} / {TOTAL_LEVELS} līmeņi</span>
            <span>{pct}%</span>
          </div>
          <ProgressBar value={pct} color={system.color} height={5} />
        </div>

        {/* Poga — vienmēr apakšā */}
        <div className="mt-auto">
          <button
            className="w-full py-2.5 rounded-xl text-sm font-semibold transition-all cursor-pointer"
            style={{ background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.6)', border: '1px solid rgba(255,255,255,0.1)' }}
          >
            {done ? '🏆 Apskatīt' : started ? 'Turpināt →' : 'Sākt kursu'}
          </button>
        </div>
      </div>
    </motion.div>
  );
}

// ── Galvenais eksports ─────────────────────────────────────────────────────
export function CoursesScreen() {
  const navigate = useNavigate();
  const { user, loading } = useAuthStore();

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
      <AppNavbar />

      <div className="max-w-5xl mx-auto px-4 py-10">
        {/* Lapas virsraksts */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <h1 className="font-heading text-3xl font-bold text-white mb-1">Kursi</h1>
          <p className="text-white/40 text-sm">Soli pa solim līdz meistarībai</p>
        </motion.div>

        {/* Kategorija: Kvalitātes sistēmas */}
        <section>
          {/* Kategorijas galvene */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.05 }}
            className="flex items-center gap-3 mb-6"
          >
            <div className="flex items-center gap-3">
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center text-xl"
                style={{ background: 'rgba(232,197,71,0.15)' }}
              >
                🎓
              </div>
              <div>
                <h2 className="font-bold text-white text-lg leading-tight">Kvalitātes sistēmas</h2>
                <p className="text-white/30 text-xs">{qualitySystems.length} kursi</p>
              </div>
            </div>
            <div className="flex-1 h-px bg-white/6 ml-2" />
          </motion.div>

          {/* Kursu grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {qualitySystems.map((sys, i) => (
              <CourseCard key={sys.id} system={sys} index={i} />
            ))}
          </div>
        </section>

        {/* Drīzumā */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-14"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center text-xl bg-white/4">
              🔜
            </div>
            <div>
              <h2 className="font-bold text-white/50 text-lg leading-tight">Drīzumā</h2>
              <p className="text-white/20 text-xs">Jaunas kategorijas tiek veidotas</p>
            </div>
            <div className="flex-1 h-px bg-white/4 ml-2" />
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { icon: '♻️', name: 'Ilgtspējīga attīstība un aprites ekonomika', desc: 'ESG principi, aprites modeļi, zaļā ekonomika' },
              { icon: '🏛️', name: 'Korporatīvā pārvaldība', desc: 'Valdes struktūras, atbilstība, risku uzraudzība' },
              { icon: '🎯', name: 'Koučings un līderība', desc: 'Vadītāja loma, motivācija, komandas attīstība' },
              { icon: '🏢', name: 'Organizāciju vadīšana', desc: 'Struktūras, kultūra, pārmaiņu vadība' },
              { icon: '📋', name: 'Projektu vadīšana', desc: 'Plānošana, riska vadība, Agile un PRINCE2' },
              { icon: '🌍', name: 'Sociālā uzņēmējdarbība', desc: 'Sociālā ietekme, hibrīdmodeļi, B Corp' },
            ].map((item, i) => (
              <div
                key={i}
                className="flex items-center gap-4 p-4 rounded-2xl border border-white/5 bg-white/2 opacity-50"
              >
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-xl shrink-0">
                  {item.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-white/60 font-semibold text-sm leading-snug">{item.name}</div>
                  <div className="text-white/25 text-xs mt-0.5">{item.desc}</div>
                </div>
                <span className="ml-3 text-xs text-white/20 shrink-0 border border-white/10 px-2 py-0.5 rounded-full">
                  Drīz
                </span>
              </div>
            ))}
          </div>
        </motion.section>
      </div>
    </div>
  );
}
