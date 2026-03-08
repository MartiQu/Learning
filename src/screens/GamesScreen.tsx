import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { qualitySystems } from '../data/systems';
import { AppNavbar } from '../components/ui/AppNavbar';

// Systems that currently have question data for games
const ACTIVE_SYSTEM_IDS = ['iso9001', 'tqm', '7s'];

const GAME_TYPES = [
  {
    id: 'snake',
    name: 'Snake',
    icon: '🐍',
    desc: 'Ēd pareizās atbildes pirms beidzas laiks!',
    available: true,
    systemIds: undefined as string[] | undefined,
  },
  {
    id: 'workplace',
    name: '7S Glābējs',
    icon: '🏭',
    desc: 'Ievies 7S sistēmu haotiskā darba vietā — 7 zonas, reāli scenāriji.',
    available: true,
    systemIds: ['7s'] as string[] | undefined,
  },
  {
    id: 'memory',
    name: 'Atmiņa',
    icon: '🃏',
    desc: 'Savieno terminus ar definīcijām',
    available: false,
    systemIds: undefined as string[] | undefined,
  },
  {
    id: 'quiz-race',
    name: 'Viktorīna',
    icon: '⚡',
    desc: 'Atbildi pirms laiks beidzas',
    available: false,
    systemIds: undefined as string[] | undefined,
  },
];

function SystemGameCard({
  system,
  index,
}: {
  system: (typeof qualitySystems)[number];
  index: number;
}) {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.05 + index * 0.07 }}
      className="rounded-2xl border border-white/8 overflow-hidden flex flex-col"
      style={{ background: '#12121a', borderColor: `${system.color}28` }}
    >
      {/* System header */}
      <div
        className="flex items-center gap-3 px-5 py-4 border-b border-white/6"
        style={{ background: `linear-gradient(135deg, ${system.color}18 0%, transparent 100%)` }}
      >
        <span className="text-3xl">{system.icon}</span>
        <div>
          <div className="text-white font-bold text-sm leading-tight">{system.name}</div>
          <div className="text-white/35 text-xs mt-0.5">Kvalitātes sistēma</div>
        </div>
        <div
          className="ml-auto text-xs font-semibold px-2.5 py-1 rounded-full"
          style={{ background: `${system.color}20`, color: system.color }}
        >
          Aktīvs
        </div>
      </div>

      {/* Game type list */}
      <div className="p-4 flex flex-col gap-2.5">
        {GAME_TYPES.filter((game) => !game.systemIds || game.systemIds.includes(system.id)).map((game) => (
          <div
            key={game.id}
            className={`flex items-center gap-3 p-3 rounded-xl border transition-all ${
              game.available
                ? 'border-white/10 hover:border-white/20 cursor-pointer group'
                : 'border-white/5 opacity-50 cursor-default'
            }`}
            style={
              game.available
                ? { background: 'rgba(255,255,255,0.03)' }
                : { background: 'rgba(255,255,255,0.015)' }
            }
            onClick={() => {
              if (game.available) navigate(`/games/${game.id}/${system.id}`);
            }}
          >
            <div
              className="w-9 h-9 rounded-lg flex items-center justify-center text-lg shrink-0"
              style={{
                background: game.available ? `${system.color}18` : 'rgba(255,255,255,0.05)',
              }}
            >
              {game.icon}
            </div>
            <div className="flex-1 min-w-0">
              <div
                className={`font-semibold text-sm leading-tight ${
                  game.available ? 'text-white' : 'text-white/40'
                }`}
              >
                {game.name}
              </div>
              <div className="text-white/30 text-xs mt-0.5 leading-snug">{game.desc}</div>
            </div>
            {game.available ? (
              <div
                className="shrink-0 text-xs font-bold px-3 py-1.5 rounded-lg transition-all group-hover:brightness-110"
                style={{ background: system.color, color: '#000' }}
              >
                Spēlēt →
              </div>
            ) : (
              <div className="shrink-0 text-xs text-white/20 border border-white/8 px-2.5 py-1 rounded-lg">
                Drīz
              </div>
            )}
          </div>
        ))}
      </div>
    </motion.div>
  );
}

export function GamesScreen() {
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

  const activeSystems = qualitySystems.filter((s) => ACTIVE_SYSTEM_IDS.includes(s.id));
  const comingSoonSystems = qualitySystems.filter((s) => !ACTIVE_SYSTEM_IDS.includes(s.id));

  return (
    <div className="min-h-screen" style={{ background: '#0a0a0f' }}>
      <AppNavbar />

      <div className="max-w-5xl mx-auto px-4 py-10">
        {/* Page header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <h1 className="font-heading text-3xl font-bold text-white mb-1">Spēles</h1>
          <p className="text-white/40 text-sm">
            Nostipriniet zināšanas spēlējot — katra spēle palīdz sagatavoties kursu līmeņiem
          </p>
        </motion.div>

        {/* Active systems section */}
        <section className="mb-14">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.05 }}
            className="flex items-center gap-3 mb-6"
          >
            <div className="flex items-center gap-3">
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center text-xl"
                style={{ background: 'rgba(124,111,255,0.15)' }}
              >
                🎮
              </div>
              <div>
                <h2 className="font-bold text-white text-lg leading-tight">Kvalitātes sistēmas</h2>
                <p className="text-white/30 text-xs">{activeSystems.length} sistēmas pieejamas</p>
              </div>
            </div>
            <div className="flex-1 h-px bg-white/6 ml-2" />
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {activeSystems.map((sys, i) => (
              <SystemGameCard key={sys.id} system={sys} index={i} />
            ))}
          </div>
        </section>

        {/* Coming soon systems */}
        {comingSoonSystems.length > 0 && (
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.35 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center text-xl bg-white/4">
                🔜
              </div>
              <div>
                <h2 className="font-bold text-white/50 text-lg leading-tight">Drīzumā</h2>
                <p className="text-white/20 text-xs">Jaunas spēļu sistēmas tiek veidotas</p>
              </div>
              <div className="flex-1 h-px bg-white/4 ml-2" />
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {comingSoonSystems.map((sys, i) => (
                <motion.div
                  key={sys.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 + i * 0.05 }}
                  className="flex items-center gap-4 p-4 rounded-2xl border border-white/5 opacity-40"
                  style={{ background: 'rgba(255,255,255,0.015)' }}
                >
                  <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-xl shrink-0">
                    {sys.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-white/60 font-semibold text-sm">{sys.name}</div>
                    <div className="text-white/25 text-xs mt-0.5">Spēles drīz pieejamas</div>
                  </div>
                  <span className="text-xs text-white/20 border border-white/10 px-2 py-0.5 rounded-full shrink-0">
                    Drīz
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}

        {/* How it works note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-14 p-5 rounded-2xl border border-white/6"
          style={{ background: 'rgba(124,111,255,0.05)' }}
        >
          <div className="flex items-start gap-3">
            <div className="text-2xl shrink-0">💡</div>
            <div>
              <div className="text-white font-semibold text-sm mb-1">Kā spēles palīdz mācīties?</div>
              <div className="text-white/40 text-xs leading-relaxed">
                Katra spēle izmanto to pašu jautājumu bāzi, kas kursiem. Snake spēlē tev jāatbild uz
                jautājumiem, vadot čūsku pie pareizās atbildes. Jo vairāk trenē — jo vieglāk nokārtot
                kursa līmeņus.
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
