import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { signInWithGoogle, logOut } from '../lib/firebase';
import { useAuthStore } from '../store/authStore';

// ── Navbar ────────────────────────────────────────────────────────────────────
function Navbar() {
  const navigate = useNavigate();
  const { user, loading } = useAuthStore();

  return (
    <nav className="fixed top-0 inset-x-0 z-50 flex items-center justify-between px-6 py-4"
      style={{ background: 'rgba(10,10,15,0.85)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
      {/* Logo */}
      <button onClick={() => navigate('/')} className="flex items-center gap-2.5 cursor-pointer">
        <div className="w-8 h-8 rounded-lg flex items-center justify-center text-lg"
          style={{ background: 'linear-gradient(135deg, #e8c547, #7c6fff)' }}>
          🎓
        </div>
        <span className="font-heading font-bold text-white text-lg leading-none">
          Quality Systems<br />
          <span className="text-xs font-normal text-white/40 tracking-wider">MEISTARS</span>
        </span>
      </button>

      {/* Nav links */}
      <div className="hidden sm:flex items-center gap-6 text-sm text-white/50">
        <button onClick={() => navigate('/select')} className="hover:text-white transition-colors cursor-pointer">Sistēmas</button>
        <button onClick={() => navigate('/profile')} className="hover:text-white transition-colors cursor-pointer">Profils</button>
      </div>

      {/* Auth + CTA */}
      <div className="flex items-center gap-3">
        {!loading && (
          user ? (
            /* Pieteicies — rāda avatāru + iziet pogu */
            <div className="flex items-center gap-2">
              <img
                src={user.photoURL ?? undefined}
                alt={user.displayName ?? 'Lietotājs'}
                className="w-8 h-8 rounded-full border border-white/20"
              />
              <span className="hidden sm:block text-sm text-white/60 max-w-[120px] truncate">
                {user.displayName}
              </span>
              <button
                onClick={() => logOut()}
                className="text-sm text-white/40 hover:text-white/70 transition-colors cursor-pointer px-2 py-1">
                Iziet
              </button>
            </div>
          ) : (
            /* Nav pieteicies — rāda pieteikšanās pogu */
            <button
              onClick={() => signInWithGoogle()}
              className="hidden sm:flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors cursor-pointer px-3 py-1.5 rounded-lg border border-white/10 hover:border-white/25">
              <svg width="16" height="16" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Pieteikties
            </button>
          )
        )}
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => navigate('/select')}
          className="text-sm font-semibold px-5 py-2 rounded-xl text-black cursor-pointer transition-opacity hover:opacity-90"
          style={{ background: 'linear-gradient(135deg, #e8c547, #d4a843)' }}>
          Sākt →
        </motion.button>
      </div>
    </nav>
  );
}

// ── Hero visual — animated floating cards ─────────────────────────────────────
function HeroVisual() {
  const cards = [
    { icon: '📋', label: 'ISO 9001', color: '#e8c547', delay: 0, x: -20, y: -15 },
    { icon: '♾️', label: 'TQM', color: '#7c6fff', delay: 0.15, x: 30, y: 10 },
    { icon: 'Σ', label: 'Six Sigma', color: '#4ecdc4', delay: 0.3, x: -10, y: 35 },
    { icon: '⚡', label: 'Lean', color: '#ff6b6b', delay: 0.45, x: 40, y: -30 },
  ];

  return (
    <div className="relative w-72 h-64 mx-auto select-none">
      {/* Central glow */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-32 h-32 rounded-full blur-3xl opacity-30"
          style={{ background: 'radial-gradient(circle, #7c6fff, #e8c547)' }} />
      </div>

      {/* Orbiting cards */}
      {cards.map((c, i) => (
        <motion.div
          key={c.label}
          animate={{ y: [c.y, c.y - 10, c.y] }}
          transition={{ duration: 3 + i * 0.5, repeat: Infinity, ease: 'easeInOut', delay: c.delay }}
          className="absolute flex items-center gap-2 px-3 py-2 rounded-xl border text-sm font-semibold"
          style={{
            left: `calc(50% + ${c.x}px)`,
            top: `calc(50% + ${c.y}px)`,
            borderColor: `${c.color}44`,
            background: `${c.color}18`,
            color: c.color,
            transform: 'translate(-50%, -50%)',
            boxShadow: `0 0 20px ${c.color}22`,
          }}>
          <span>{c.icon}</span>
          {c.label}
        </motion.div>
      ))}

      {/* Question type chips */}
      {[
        { label: 'Izvēles jautājums', top: '10%', left: '5%', delay: 0.6 },
        { label: 'Gadījuma izpēte', top: '75%', left: '20%', delay: 0.8 },
        { label: 'Kārtošana', top: '55%', left: '65%', delay: 1.0 },
      ].map((chip) => (
        <motion.div
          key={chip.label}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: chip.delay, duration: 0.5 }}
          className="absolute text-xs px-2.5 py-1 rounded-full border border-white/10 text-white/40 bg-white/4"
          style={{ top: chip.top, left: chip.left }}>
          {chip.label}
        </motion.div>
      ))}
    </div>
  );
}

// ── Feature section row ───────────────────────────────────────────────────────
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

// ── Feature visuals ───────────────────────────────────────────────────────────
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
            { label: 'TQM', pct: 60, color: '#7c6fff' },
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

// ── Main export ───────────────────────────────────────────────────────────────
export function HomeScreen() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen overflow-x-hidden" style={{ background: '#0a0a0f' }}>
      <Navbar />

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-24 pb-16 text-center overflow-hidden">
        {/* Background orbs */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full blur-[140px] pointer-events-none opacity-20"
          style={{ background: 'radial-gradient(circle, #7c6fff 0%, #4ecdc4 50%, transparent 70%)' }} />

        {/* Eyebrow badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 text-sm text-white/50 mb-8"
          style={{ background: 'rgba(255,255,255,0.04)' }}>
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          Interaktīva mācīšanās · MBA programma
        </motion.div>

        {/* Main heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.65 }}
          className="font-heading text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-[1.08] mb-6 max-w-3xl">
          Mācoties<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold via-yellow-300 to-purple">
            darot.
          </span>
        </motion.h1>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35, duration: 0.6 }}
          className="text-white/55 text-lg sm:text-xl leading-relaxed max-w-xl mb-10">
          Interaktīva problēmu risināšana, kas ir efektīva un aizraujoša.<br />
          Apgūsti ISO 9001, TQM, Six Sigma un citas kvalitātes sistēmas.
        </motion.p>

        {/* Hero visual */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.25, duration: 0.7 }}
          className="mb-10">
          <HeroVisual />
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex flex-col sm:flex-row items-center gap-4 w-full max-w-sm mx-auto">
          <motion.button
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate('/select')}
            className="w-full sm:w-auto flex-1 py-4 px-8 rounded-2xl text-black font-bold text-base cursor-pointer transition-shadow"
            style={{
              background: 'linear-gradient(135deg, #e8c547, #d4a843)',
              boxShadow: '0 4px 24px #e8c54740, 0 2px 0 #c49a30',
            }}>
            Es mācos →
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate('/profile')}
            className="w-full sm:w-auto flex-1 py-4 px-8 rounded-2xl text-white/80 font-semibold text-base cursor-pointer border border-white/12 hover:border-white/25 transition-colors"
            style={{ background: 'rgba(255,255,255,0.04)' }}>
            Esmu pasniedzējs
          </motion.button>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mt-6 text-white/25 text-sm">
          Pabeidz visus 10 līmeņus jebkurā sistēmā un saņem 10 bonusa eksāmena punktus
        </motion.p>

        {/* Scroll hint */}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/20 text-xs flex flex-col items-center gap-1">
          <span>↓</span>
          <span>Ritiniet uz leju</span>
        </motion.div>
      </section>

      {/* ── DIVIDER ──────────────────────────────────────────────────────── */}
      <div className="border-t border-white/6" />

      {/* ── STATS BAR ────────────────────────────────────────────────────── */}
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

      {/* ── FEATURE 1 ────────────────────────────────────────────────────── */}
      <FeatureRow
        eyebrow="Interaktīvas nodarbības"
        heading="Koncepti, kas paliek atmiņā."
        body="Katrā līmenī atradīsi dažādus jautājumu veidus — no izvēles jautājumiem līdz reālu gadījumu analīzei. Tūlītēja atgriezeniskā saite palīdz labot kļūdas un nostiprināt zināšanas."
        visual={<VisualInteractive />}
        delay={0.1}
      />

      <div className="border-t border-white/6" />

      {/* ── FEATURE 2 ────────────────────────────────────────────────────── */}
      <FeatureRow
        eyebrow="Strukturēta izaugsme"
        heading="Personalizēts mācību ceļš."
        body="Desmit pakāpeniski grūtāki līmeņi nodrošina, ka jaunais zināšanu klāsts balstās uz jau apgūto. Katrs līmenis tiek atbloķēts tikai pēc iepriekšējā nokārtošanas."
        visual={<VisualProgress />}
        reverse
        delay={0.1}
      />

      <div className="border-t border-white/6" />

      {/* ── FEATURE 3 ────────────────────────────────────────────────────── */}
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
            Kvalitātes vadība ir prasme, kas atver durvis uz labāku karjeru.<br />
            Sāc mācīties šodien — bez maksas.
          </p>

          {/* Quality system badges */}
          <div className="flex flex-wrap justify-center gap-3 mb-14">
            {[
              { icon: '🏅', name: 'ISO 9001', color: '#e8c547' },
              { icon: '♾️', name: 'TQM', color: '#7c6fff' },
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

          {/* Testimonial cards */}
          <div className="grid sm:grid-cols-3 gap-4 mb-14">
            {[
              { quote: '"Beidzot sapratu ISO 9001 strukturu. Gamifikācija palīdz koncentrēties."', name: 'Anna K.', role: 'MBA students' },
              { quote: '"Gadījuma analīzes jautājumi ir ļoti tuvi reālai praksei. Ieteiktu visiem!"', name: 'Mārtiņš L.', role: 'Kvalitātes vadītājs' },
              { quote: '"Pabeidzu TQM kursā 5 dienas. Eksāmenā saņēmu bonusa punktus!"', name: 'Ieva S.', role: 'Ražošanas menedžeris' },
            ].map((t) => (
              <div key={t.name}
                className="text-left p-4 rounded-2xl border border-white/8 bg-white/3">
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
            onClick={() => navigate('/select')}
            className="py-4 px-12 rounded-2xl text-black font-bold text-lg cursor-pointer"
            style={{
              background: 'linear-gradient(135deg, #e8c547, #d4a843)',
              boxShadow: '0 4px 32px #e8c54750, 0 2px 0 #c49a30',
            }}>
            Sākt mācīties →
          </motion.button>
          <p className="mt-5 text-white/25 text-sm">
            Pabeidz 10 līmeņus · Saņem 10 bonusa punktus · Apgūsti kvalitāti
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
