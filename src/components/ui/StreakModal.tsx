import { motion, AnimatePresence } from 'framer-motion';

const DAYS = ['P', 'O', 'T', 'C', 'P', 'S', 'Sv'];

interface Props {
  open: boolean;
  streakDays: number;
  onContinue: () => void;
}

export function StreakModal({ open, streakDays, onContinue }: Props) {
  return (
    <AnimatePresence>
      {open && (
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
            className="w-full max-w-sm rounded-3xl border border-orange-500/30 p-8 text-center"
            style={{ background: 'linear-gradient(135deg, #ff6b2b0d, #e8c54711, #0a0a0f)' }}
          >
            <motion.div
              initial={{ scale: 0, rotate: -20 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.1, type: 'spring', stiffness: 400 }}
              className="text-7xl mb-4"
            >
              🔥
            </motion.div>

            <h2 className="font-heading text-3xl font-bold text-white mb-1">
              {streakDays === 1 ? 'Sērija sākta!' : `${streakDays} dienu sērija!`}
            </h2>
            <p className="text-white/50 mb-6">
              {streakDays === 1
                ? 'Tu sāki savu mācīšanās sēriju!'
                : `Izcili — jau ${streakDays} dienas pēc kārtas!`}
            </p>

            {/* Weekday dots */}
            <div className="flex justify-center gap-2 mb-8">
              {DAYS.map((day, i) => {
                const filled = i < Math.min(streakDays, 7);
                return (
                  <div key={day} className="flex flex-col items-center gap-1">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.15 + i * 0.06, type: 'spring', stiffness: 400 }}
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold border ${
                        filled
                          ? 'bg-orange-500 border-orange-400 text-white'
                          : 'bg-white/5 border-white/15 text-white/30'
                      }`}
                    >
                      {filled ? '🔥' : ''}
                    </motion.div>
                    <span className="text-white/30 text-xs">{day}</span>
                  </div>
                );
              })}
            </div>

            <button
              onClick={onContinue}
              className="w-full py-4 rounded-2xl font-semibold text-black text-lg transition-all hover:opacity-90 cursor-pointer"
              style={{ background: 'linear-gradient(135deg, #ff9f1c, #e8c547)' }}
            >
              Turpināt
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
