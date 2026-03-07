import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { logOut } from '../lib/firebase';
import { useAuthStore } from '../store/authStore';
import { AuthModal } from '../components/ui/AuthModal';
import { Logo } from '../components/ui/Logo';

// ── Navbar ────────────────────────────────────────────────────────────────────
function Navbar({ onLoginClick }: { onLoginClick: () => void }) {
  const navigate = useNavigate();
  const { user } = useAuthStore();

  return (
    <nav className="fixed top-0 inset-x-0 z-50 flex items-center justify-between px-8 py-5"
      style={{ background: 'rgba(10,10,15,0.90)', backdropFilter: 'blur(12px)' }}>

      {/* Logo */}
      <button onClick={() => navigate('/')} className="cursor-pointer text-white hover:opacity-75 transition-opacity">
        <Logo height={22} color="currentColor" />
      </button>

      {/* Auth */}
      {user ? (
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/home')}
            className="flex items-center gap-2 cursor-pointer group"
          >
            <img
              src={user.photoURL ?? undefined}
              alt={user.displayName ?? ''}
              className="w-8 h-8 rounded-full border-2 border-white/20 group-hover:border-white/50 transition-colors"
            />
            <span className="text-white/70 text-sm hidden sm:block group-hover:text-white transition-colors">
              {user.displayName}
            </span>
          </button>
          <button
            onClick={() => logOut()}
            className="text-sm text-white/50 hover:text-white transition-colors cursor-pointer px-3 py-1.5 rounded-full border border-white/15 hover:border-white/30">
            Iziet
          </button>
        </div>
      ) : (
        <button
          onClick={onLoginClick}
          className="text-sm font-medium text-white px-5 py-2 rounded-full border border-white/30 hover:border-white/60 hover:bg-white/5 transition-all cursor-pointer">
          Pieteikties
        </button>
      )}
    </nav>
  );
}


// ── Feature sekcijas ──────────────────────────────────────────────────────────
function FeatureRow({
  eyebrow, heading, body, visual, reverse, delay,
}: {
  eyebrow: string; heading: string; body: string;
  visual: React.ReactNode; reverse?: boolean; delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, delay: delay ?? 0 }}
      className={`flex flex-col ${reverse ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-12 py-20 px-6 max-w-5xl mx-auto`}
    >
      <div className="flex-1 text-center lg:text-left">
        <span className="text-xs font-bold uppercase tracking-widest mb-3 block" style={{ color: '#e8c547' }}>
          {eyebrow}
        </span>
        <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white mb-4 leading-tight">{heading}</h2>
        <p className="text-white/55 text-lg leading-relaxed max-w-md mx-auto lg:mx-0">{body}</p>
      </div>
      <div className="flex-1 flex items-center justify-center">{visual}</div>
    </motion.div>
  );
}

function VisualInteractive() {
  return (
    <div className="w-full max-w-xs">
      <div className="rounded-2xl border border-white/10 bg-surface p-5 space-y-3"
        style={{ boxShadow: '0 0 40px #7c6fff22' }}>
        <div className="text-xs text-white/30 uppercase tracking-wider mb-2">Izvēles jautājums</div>
        <p className="text-white text-sm font-medium mb-3">Cik kvalitātes vadības principus nosaka ISO 9001:2015?</p>
        {['5', '7 ✓', '9', '12'].map((opt, i) => (
          <div key={i}
            className={`px-3 py-2 rounded-lg text-sm border transition-all ${i === 1 ? 'border-teal bg-teal/15 text-teal' : 'border-white/8 text-white/40'}`}>
            {opt}
          </div>
        ))}
        <div className="pt-2 flex items-center gap-2 text-teal text-sm font-semibold">
          <span>🎉</span> Pareizi! +60 XP
        </div>
      </div>
    </div>
  );
}

function VisualProgress() {
  const levels = [
    { n: 1, done: true, stars: 3 },
    { n: 2, done: true, stars: 2 },
    { n: 3, done: true, stars: 1 },
    { n: 4, active: true },
    { n: 5 }, { n: 6 }, { n: 7 },
  ];
  return (
    <div className="w-full max-w-xs rounded-2xl border border-white/10 bg-surface p-5"
      style={{ boxShadow: '0 0 40px #4ecdc422' }}>
      <div className="text-xs text-white/30 uppercase tracking-wider mb-4">ISO 9001 — Progress</div>
      <div className="space-y-2">
        {levels.map((l) => (
          <div key={l.n} className={`flex items-center gap-3 px-3 py-2 rounded-xl text-sm ${l.active ? 'border border-gold/40 bg-gold/8' : 'border border-white/5'}`}>
            <div className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold ${l.done ? 'bg-gold text-black' : l.active ? 'border-2 border-gold text-gold' : 'bg-white/5 text-white/20'}`}>
              {l.done ? '✓' : l.n}
            </div>
            <span className={l.done ? 'text-white/70' : l.active ? 'text-white font-semibold' : 'text-white/25'}>
              Līmenis {l.n}
            </span>
            {l.done && l.stars && (
              <span className="ml-auto text-yellow-400 text-xs">{'★'.repeat(l.stars)}</span>
            )}
            {!l.done && !l.active && <span className="ml-auto text-white/15 text-xs">🔒</span>}
          </div>
        ))}
      </div>
    </div>
  );
}

function VisualStreak() {
  return (
    <div className="w-full max-w-xs space-y-3">
      <div className="rounded-2xl border border-white/10 bg-surface p-5"
        style={{ boxShadow: '0 0 40px #e8c54722' }}>
        <div className="text-xs text-white/30 uppercase tracking-wider mb-3">Tavs progress</div>
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: 'Kopējie XP', value: '2 850', color: '#e8c547' },
            { label: 'Sērija', value: '🔥 5', color: '#ff9f1c' },
            { label: 'Zvaigznes', value: '★ 11', color: '#ffd700' },
          ].map((s) => (
            <div key={s.label} className="bg-white/4 rounded-xl p-2.5 text-center border border-white/6">
              <div className="font-heading font-bold text-lg" style={{ color: s.color }}>{s.value}</div>
              <div className="text-white/35 text-xs mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>
        <div className="mt-4 space-y-1.5">
          {[
            { label: 'ISO 9001', pct: 30, color: '#e8c547' },
            { label: 'TKV', pct: 60, color: '#7c6fff' },
          ].map((bar) => (
            <div key={bar.label}>
              <div className="flex justify-between text-xs text-white/40 mb-1">
                <span>{bar.label}</span><span>{bar.pct}%</span>
              </div>
              <div className="h-1.5 rounded-full bg-white/8">
                <div className="h-full rounded-full" style={{ width: `${bar.pct}%`, background: bar.color }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Galvenais eksports ────────────────────────────────────────────────────────
export function HomeScreen() {
  const navigate = useNavigate();
  const [authOpen, setAuthOpen] = useState(false);
  const { user, loading } = useAuthStore();

  // Ja lietotājs jau ielogojies → uzreiz uz home
  if (!loading && user) {
    navigate('/home');
    return null;
  }

  return (
    <div className="min-h-screen overflow-x-hidden" style={{ background: '#0a0a0f' }}>
      <Navbar onLoginClick={() => setAuthOpen(true)} />
      <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} />

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-20 pb-16 text-center overflow-hidden">

        {/* Fona gaismas */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[600px] rounded-full blur-[160px] pointer-events-none opacity-15"
          style={{ background: 'radial-gradient(circle, #7c6fff 0%, #4ecdc4 50%, transparent 70%)' }} />

        {/* Milzīgais virsraksts */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="relative z-10 mb-8"
        >
          <h1 className="font-heading leading-[0.9] font-extrabold text-white select-none"
            style={{ fontSize: 'clamp(42px, 10vw, 140px)' }}>
            MĀCIES<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold via-yellow-300 to-purple">
              DAROT
            </span>
          </h1>
        </motion.div>

        {/* Apakšvirsraksts */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="relative z-10 text-white/55 text-lg sm:text-xl leading-relaxed max-w-lg mb-10">
          MBA zināšanas, ko tiešām izmanto praksē.<br />
          Stratēģija, vadība, kvalitāte — apgūsti soli pa solim.
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
          className="relative z-10"
        >
          <motion.button
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setAuthOpen(true)}
            className="group flex items-center gap-3 px-8 py-4 rounded-2xl font-semibold text-base cursor-pointer transition-all"
            style={{
              background: 'rgba(255,255,255,0.07)',
              border: '1px solid rgba(255,255,255,0.15)',
              color: '#fff',
              boxShadow: '0 0 0 0 rgba(232,197,71,0)',
            }}
          >
            {/* Google ikona */}
            <svg width="20" height="20" viewBox="0 0 24 24" className="shrink-0">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Sākt mācīties ar Google
            <span className="text-white/30 group-hover:text-white/60 transition-colors text-lg leading-none">→</span>
          </motion.button>

          <p className="mt-4 text-white/20 text-sm text-center">
            Bezmaksas · Nav nepieciešama kredītkarte
          </p>
        </motion.div>
      </section>

      <div className="border-t border-white/6" />

      {/* ── STATS ────────────────────────────────────────────────────────── */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="py-10 px-6">
        <div className="max-w-3xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-8 text-center">
          {[
            { value: '4+', label: 'Kvalitātes sistēmas' },
            { value: '10', label: 'Līmeņi katrā' },
            { value: '6', label: 'Jautājumu veidi' },
            { value: '+10 pt', label: 'Eksāmena bonuss' },
          ].map((s) => (
            <div key={s.label}>
              <div className="font-heading text-3xl font-bold text-gold">{s.value}</div>
              <div className="text-white/40 text-sm mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </motion.section>

      <div className="border-t border-white/6" />

      {/* ── FEATURES ─────────────────────────────────────────────────────── */}
      <FeatureRow
        eyebrow="Interaktīvas nodarbības"
        heading="Koncepti, kas paliek atmiņā."
        body="Katrā līmenī atradīsi dažādus jautājumu veidus — no izvēles jautājumiem līdz reālu gadījumu analīzei. Tūlītēja atgriezeniskā saite palīdz nostiprināt zināšanas."
        visual={<VisualInteractive />}
        delay={0.1}
      />
      <div className="border-t border-white/6" />
      <FeatureRow
        eyebrow="Strukturēta izaugsme"
        heading="Personalizēts mācību ceļš."
        body="Desmit pakāpeniski grūtāki līmeņi nodrošina, ka jaunais zināšanu klāsts balstās uz jau apgūto. Katrs līmenis tiek atbloķēts tikai pēc iepriekšējā nokārtošanas."
        visual={<VisualProgress />}
        reverse
        delay={0.1}
      />
      <div className="border-t border-white/6" />
      <FeatureRow
        eyebrow="Gamifikācija"
        heading="Punkti, sērijas un zvaigznes."
        body="Nopelni XP punktus par katru pareizo atbildi, uzturi atbilžu sēriju un sasniedz 3 zvaigznes katrā līmenī. Progress tiek saglabāts automātiski."
        visual={<VisualStreak />}
        delay={0.1}
      />
      <div className="border-t border-white/6" />

      {/* ── SOCIAL PROOF ─────────────────────────────────────────────────── */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="py-20 px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-white mb-4">
            Pievienojies studentiem visā pasaulē
          </h2>
          <p className="text-white/50 text-lg mb-12">
            Kvalitātes vadība ir prasme, kas atver durvis uz labāku karjeru.
          </p>
          <div className="flex flex-wrap justify-center gap-3 mb-14">
            {[
              { icon: '🏅', name: 'ISO 9001', color: '#e8c547' },
              { icon: '♾️', name: 'TKV', color: '#7c6fff' },
              { icon: 'Σ', name: 'Six Sigma', color: '#4ecdc4' },
              { icon: '⚡', name: 'Lean', color: '#ff6b6b' },
            ].map((s) => (
              <div key={s.name}
                className="flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-semibold"
                style={{ borderColor: `${s.color}44`, background: `${s.color}12`, color: s.color }}>
                <span>{s.icon}</span> {s.name}
              </div>
            ))}
          </div>
          <div className="grid sm:grid-cols-3 gap-4 mb-14">
            {[
              { quote: '"Beidzot sapratu ISO 9001 struktūru. Gamifikācija palīdz koncentrēties."', name: 'Anna K.', role: 'MBA students' },
              { quote: '"Gadījuma analīzes jautājumi ir ļoti tuvi reālai praksei. Ieteiktu visiem!"', name: 'Mārtiņš L.', role: 'Kvalitātes vadītājs' },
              { quote: '"Pabeidzu TKV kursā 5 dienas. Eksāmenā saņēmu bonusa punktus!"', name: 'Ieva S.', role: 'Ražošanas menedžeris' },
            ].map((t) => (
              <div key={t.name} className="text-left p-4 rounded-2xl border border-white/8 bg-white/3">
                <p className="text-white/60 text-sm leading-relaxed mb-3 italic">{t.quote}</p>
                <div className="text-white/80 text-sm font-semibold">{t.name}</div>
                <div className="text-white/35 text-xs">{t.role}</div>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      <div className="border-t border-white/6" />

      {/* ── FINAL CTA ────────────────────────────────────────────────────── */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="py-24 px-6 text-center">
        <div className="max-w-2xl mx-auto">
          <div className="text-5xl mb-6">🎓</div>
          <h2 className="font-heading text-4xl sm:text-5xl font-bold text-white mb-4 leading-tight">
            Gatavs sākt?
          </h2>
          <p className="text-white/50 text-lg mb-10">
            Izvēlies savu pirmo kvalitātes sistēmu un sāc apgūt zināšanas jau šodien.
          </p>
          <motion.button
            whileHover={{ scale: 1.03, y: -3 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => user ? navigate('/home') : setAuthOpen(true)}
            className="py-4 px-12 rounded-full text-white font-bold text-lg cursor-pointer"
            style={{
              background: 'linear-gradient(135deg, #22c55e, #16a34a)',
              boxShadow: '0 4px 32px rgba(34,197,94,0.30), 0 2px 0 #15803d',
            }}>
            Sākt mācīties →
          </motion.button>
          <p className="mt-5 text-white/25 text-sm">
            Bezmaksas · 10 līmeņi · +10 eksāmena punkti
          </p>
        </div>
      </motion.section>

      {/* ── FOOTER ───────────────────────────────────────────────────────── */}
      <footer className="border-t border-white/6 py-8 px-6 text-center text-white/25 text-sm">
        <div className="flex items-center justify-center gap-2 mb-2">
          <span>🎓</span>
          <span className="font-heading font-bold text-white/40">Quality Systems Meistars</span>
        </div>
        <p>MBA Mācību platforma · Visi tiesības aizsargātas</p>
      </footer>
    </div>
  );
}
