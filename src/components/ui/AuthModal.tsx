import { motion, AnimatePresence } from 'framer-motion';
import { signInWithGoogle } from '../../lib/firebase';

interface Props {
  open: boolean;
  onClose: () => void;
}

export function AuthModal({ open, onClose }: Props) {
  const handleGoogle = async () => {
    try {
      await signInWithGoogle();
      onClose();
    } catch {
      // lietotājs aizvēra Google popup — nekas
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Tumšais fons */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-40"
            style={{ background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(4px)' }}
          />

          {/* Modāls */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 16 }}
            transition={{ type: 'spring', stiffness: 340, damping: 26 }}
            className="fixed inset-0 z-50 flex items-center justify-center px-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-full max-w-sm bg-white rounded-3xl shadow-2xl px-8 py-10 text-center relative">
              {/* Aizvērt */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors cursor-pointer text-lg"
              >
                ✕
              </button>

              {/* Logo ikona */}
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-6 shadow-lg"
                style={{ background: 'linear-gradient(135deg, #e8c547, #7c6fff)' }}
              >
                🎓
              </div>

              <h2 className="text-2xl font-bold text-gray-900 mb-2" style={{ fontFamily: 'Syne, sans-serif' }}>
                Pierakstīties
              </h2>
              <p className="text-gray-500 text-sm mb-8">
                Quality Systems Meistars
              </p>

              {/* Google */}
              <button
                onClick={handleGoogle}
                className="w-full flex items-center justify-center gap-3 px-4 py-3.5 rounded-xl border-2 border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all text-gray-800 font-medium text-base cursor-pointer mb-3"
              >
                <svg width="20" height="20" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Pierakstīties ar Google
              </button>

              {/* E-pasts (drīzumā) */}
              <button
                disabled
                className="w-full flex items-center justify-center gap-3 px-4 py-3.5 rounded-xl bg-gray-100 text-gray-400 font-medium text-base cursor-not-allowed mb-6"
              >
                ✉️ Pierakstīties ar e-pastu
                <span className="text-xs bg-gray-200 text-gray-500 px-2 py-0.5 rounded-full ml-1">Drīzumā</span>
              </button>

              <p className="text-gray-400 text-sm">
                Jauns lietotājs?{' '}
                <button
                  onClick={handleGoogle}
                  className="text-gray-900 font-semibold underline underline-offset-2 cursor-pointer hover:text-gray-600"
                >
                  Reģistrēties
                </button>
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
