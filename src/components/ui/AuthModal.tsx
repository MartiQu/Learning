import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { signInWithGoogle } from '../../lib/firebase';
import { Logo } from './Logo';

interface Props {
  open: boolean;
  onClose: () => void;
}

// Stagger helper
const item = (delay: number) => ({
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0, transition: { delay, duration: 0.35, ease: 'easeOut' } },
});

export function AuthModal({ open, onClose }: Props) {
  const navigate = useNavigate();

  const handleGoogle = async () => {
    try {
      await signInWithGoogle();
      onClose();
      navigate('/home');
    } catch {
      // lietotājs aizvēra Google popup — nekas
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 z-40"
            style={{ background: 'rgba(0,0,0,0.72)', backdropFilter: 'blur(8px)' }}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 16 }}
            transition={{ type: 'spring', stiffness: 380, damping: 28, mass: 0.8 }}
            className="fixed inset-0 z-50 flex items-center justify-center px-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="w-full max-w-sm relative overflow-hidden"
              style={{
                background: '#12121a',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: 28,
                boxShadow: '0 40px 80px rgba(0,0,0,0.65), 0 0 0 1px rgba(255,255,255,0.04) inset',
                padding: '44px 36px 36px',
              }}
            >
              {/* Decorative top gradient line */}
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: 1,
                  background: 'linear-gradient(90deg, transparent, #e8c54780, #7c6fff80, transparent)',
                }}
              />

              {/* Background radial glow — gold, top center */}
              <motion.div
                animate={{ opacity: [0.18, 0.28, 0.18], scale: [1, 1.08, 1] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                style={{
                  position: 'absolute',
                  top: -80,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: 320,
                  height: 220,
                  borderRadius: '50%',
                  background: 'radial-gradient(circle, #e8c547 0%, transparent 70%)',
                  pointerEvents: 'none',
                  zIndex: 0,
                }}
              />

              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full transition-all cursor-pointer z-10"
                style={{
                  color: 'rgba(255,255,255,0.35)',
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.08)',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.75)';
                  (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.10)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.35)';
                  (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.05)';
                }}
              >
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M1 1l10 10M11 1L1 11" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
                </svg>
              </button>

              {/* Content — staggered reveal */}
              <div className="relative z-10 text-center">
                {/* MASTERLY wordmark */}
                <motion.div {...item(0.05)} className="flex justify-center mb-7">
                  <Logo height={22} color="#ffffff" />
                </motion.div>

                {/* Heading */}
                <motion.h2
                  {...item(0.12)}
                  className="font-heading text-2xl font-bold text-white mb-1.5"
                >
                  Pierakstīties
                </motion.h2>
                <motion.p
                  {...item(0.17)}
                  className="text-sm mb-8"
                  style={{ color: 'rgba(255,255,255,0.38)' }}
                >
                  Laipni lūgti atpakaļ
                </motion.p>

                {/* Google button */}
                <motion.div {...item(0.22)}>
                  <motion.button
                    onClick={handleGoogle}
                    whileHover={{ scale: 1.015, y: -1 }}
                    whileTap={{ scale: 0.985 }}
                    className="w-full flex items-center justify-center gap-3 px-4 py-3.5 rounded-2xl font-medium text-sm cursor-pointer mb-3 transition-colors"
                    style={{
                      background: 'rgba(255,255,255,0.07)',
                      border: '1px solid rgba(255,255,255,0.13)',
                      color: 'rgba(255,255,255,0.88)',
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.11)';
                      (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.22)';
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.07)';
                      (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.13)';
                    }}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" className="shrink-0">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                    Pierakstīties ar Google
                  </motion.button>
                </motion.div>

                {/* Email button (disabled) */}
                <motion.div {...item(0.27)}>
                  <button
                    disabled
                    className="w-full flex items-center justify-center gap-3 px-4 py-3.5 rounded-2xl text-sm font-medium cursor-not-allowed mb-7"
                    style={{
                      background: 'rgba(255,255,255,0.03)',
                      border: '1px solid rgba(255,255,255,0.06)',
                      color: 'rgba(255,255,255,0.22)',
                    }}
                  >
                    <svg width="15" height="15" viewBox="0 0 20 20" fill="none" opacity={0.4}>
                      <rect x="1" y="4" width="18" height="13" rx="2" stroke="currentColor" strokeWidth="1.5"/>
                      <path d="M1 7l9 5 9-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                    Pierakstīties ar e-pastu
                    <span
                      className="text-xs px-2 py-0.5 rounded-full ml-auto"
                      style={{
                        background: 'rgba(255,255,255,0.06)',
                        color: 'rgba(255,255,255,0.25)',
                      }}
                    >
                      Drīzumā
                    </span>
                  </button>
                </motion.div>

                {/* Register link */}
                <motion.p
                  {...item(0.32)}
                  className="text-sm"
                  style={{ color: 'rgba(255,255,255,0.30)' }}
                >
                  Jauns lietotājs?{' '}
                  <button
                    onClick={handleGoogle}
                    className="font-semibold cursor-pointer transition-opacity hover:opacity-80"
                    style={{ color: '#e8c547' }}
                  >
                    Reģistrēties
                  </button>
                </motion.p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
