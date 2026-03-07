import { motion, AnimatePresence } from 'framer-motion';
import { BADGE_DEFS } from '../../store/badgeStore';

interface Props {
  badgeId: string | null;
  onContinue: () => void;
}

export function BadgeModal({ badgeId, onContinue }: Props) {
  const badge = badgeId ? BADGE_DEFS.find((b) => b.id === badgeId) : null;

  return (
    <AnimatePresence>
      {badge && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center px-4"
          style={{ background: 'rgba(10,10,15,0.85)', backdropFilter: 'blur(8px)' }}
        >
          <motion.div
            initial={{ scale: 0.85, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.85, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="w-full max-w-sm rounded-3xl border border-gold/30 p-8 text-center"
            style={{ background: 'linear-gradient(135deg, #e8c54711, #7c6fff11, #0a0a0f)' }}
          >
            <p className="text-white/50 text-sm uppercase tracking-widest font-semibold mb-4">
              Iegūta nozīmīte!
            </p>

            <motion.div
              initial={{ scale: 0, rotate: -20 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.1, type: 'spring', stiffness: 400 }}
              className="text-7xl mb-4"
            >
              {badge.icon}
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="font-heading text-2xl font-bold text-white mb-2"
            >
              {badge.label}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-white/50 mb-8"
            >
              {badge.description}
            </motion.p>

            <button
              onClick={onContinue}
              className="w-full py-4 rounded-2xl font-semibold text-black text-lg transition-all hover:opacity-90 cursor-pointer"
              style={{ background: 'linear-gradient(135deg, #e8c547, #7c6fff)' }}
            >
              Turpināt
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
