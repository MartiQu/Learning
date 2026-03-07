import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { useProgressStore } from '../../store/progressStore';
import { logOut } from '../../lib/firebase';
import { Logo } from './Logo';

const TABS = [
  { label: 'Sākums', path: '/home' },
  { label: 'Kursi', path: '/courses' },
];

export function AppNavbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuthStore();
  const { streakDays } = useProgressStore();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handler(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setMenuOpen(false);
    }
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <nav
      className="sticky top-0 z-40 flex items-center gap-5 px-8 py-4 border-b border-white/6"
      style={{ background: 'rgba(10,10,15,0.97)', backdropFilter: 'blur(12px)' }}
    >
      {/* Logo */}
      <button
        onClick={() => navigate('/home')}
        className="text-white hover:opacity-70 transition-opacity cursor-pointer mr-1 shrink-0"
      >
        <Logo height={19} color="currentColor" />
      </button>

      {/* Navigation tabs */}
      {TABS.map((tab) => {
        const active = location.pathname === tab.path;
        return (
          <button
            key={tab.path}
            onClick={() => navigate(tab.path)}
            className={`text-sm font-medium transition-all cursor-pointer pb-0.5 border-b-2 shrink-0 ${
              active
                ? 'text-white border-white'
                : 'text-white/38 border-transparent hover:text-white/65'
            }`}
          >
            {tab.label}
          </button>
        );
      })}

      {/* Right side */}
      <div className="ml-auto flex items-center gap-2.5">
        {/* Streak pill — always visible when active, motivates daily habit */}
        {streakDays > 0 && (
          <div
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm"
            style={{
              background: 'rgba(255,159,28,0.10)',
              border: '1px solid rgba(255,159,28,0.22)',
            }}
          >
            <span style={{ fontSize: 13 }}>🔥</span>
            <span className="font-semibold" style={{ color: '#ffb347' }}>
              {streakDays}
            </span>
          </div>
        )}

        {/* Avatar — click to open dropdown */}
        <div ref={menuRef} className="relative">
          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="flex items-center gap-2 cursor-pointer group rounded-full"
            aria-label="Lietotāja izvēlne"
          >
            {user?.photoURL ? (
              <img
                src={user.photoURL}
                alt={user.displayName ?? ''}
                className="w-8 h-8 rounded-full border-2 transition-colors"
                style={{
                  borderColor: menuOpen ? 'rgba(255,255,255,0.40)' : 'rgba(255,255,255,0.16)',
                }}
              />
            ) : (
              <div
                className="w-8 h-8 rounded-full border-2 border-white/16 flex items-center justify-center text-xs font-semibold text-white/50"
                style={{ background: 'rgba(255,255,255,0.07)' }}
              >
                {user?.displayName?.[0]?.toUpperCase() ?? '?'}
              </div>
            )}
          </button>

          <AnimatePresence>
            {menuOpen && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: -6 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -6 }}
                transition={{ duration: 0.13, ease: 'easeOut' }}
                className="absolute right-0 top-11 w-56 rounded-2xl border border-white/10 shadow-2xl overflow-hidden z-50"
                style={{ background: '#15151d' }}
              >
                {/* User info header */}
                <div className="px-4 py-3.5 border-b border-white/8">
                  <div className="text-white/85 text-sm font-semibold truncate leading-snug">
                    {user?.displayName ?? 'Lietotājs'}
                  </div>
                  {user?.email && (
                    <div className="text-white/35 text-xs truncate mt-0.5">{user.email}</div>
                  )}
                </div>

                {/* Logout */}
                <button
                  onClick={() => {
                    logOut();
                    navigate('/');
                    setMenuOpen(false);
                  }}
                  className="w-full flex items-center gap-3 px-4 py-3 text-sm transition-all cursor-pointer text-left"
                  style={{ color: 'rgba(248,113,113,0.80)' }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.background = 'rgba(239,68,68,0.08)';
                    (e.currentTarget as HTMLElement).style.color = 'rgb(248,113,113)';
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.background = 'transparent';
                    (e.currentTarget as HTMLElement).style.color = 'rgba(248,113,113,0.80)';
                  }}
                >
                  <span>🚪</span>
                  <span>Iziet</span>
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </nav>
  );
}
