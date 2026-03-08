import { motion } from 'framer-motion';

interface FeedbackOverlayProps {
  type: 'correct' | 'wrong' | 'partial';
  message: string;
  explanation: string;
  onContinue: () => void;
}

const CONFIG = {
  correct: {
    icon: '✅',
    label: 'Pareizi!',
    color: '#4ecdc4',
    bg: 'rgba(78,205,196,0.08)',
    border: 'rgba(78,205,196,0.25)',
  },
  partial: {
    icon: '⚠️',
    label: 'Daļēji pareizi',
    color: '#f97316',
    bg: 'rgba(249,115,22,0.08)',
    border: 'rgba(249,115,22,0.25)',
  },
  wrong: {
    icon: '❌',
    label: 'Nepareizi',
    color: '#ef4444',
    bg: 'rgba(239,68,68,0.08)',
    border: 'rgba(239,68,68,0.25)',
  },
};

export function FeedbackOverlay({ type, message, explanation, onContinue }: FeedbackOverlayProps) {
  const cfg = CONFIG[type];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="flex flex-col items-center text-center gap-5 py-6"
    >
      {/* Icon + label */}
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.1, type: 'spring', stiffness: 200 }}
        className="flex flex-col items-center gap-2"
      >
        <span className="text-6xl">{cfg.icon}</span>
        <span className="font-bold text-xl" style={{ color: cfg.color }}>
          {cfg.label}
        </span>
      </motion.div>

      {/* Message */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.25 }}
        className="text-white font-semibold text-lg"
      >
        {message}
      </motion.p>

      {/* Explanation card */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
        className="w-full rounded-2xl border p-4 text-left"
        style={{ background: cfg.bg, borderColor: cfg.border }}
      >
        <div className="text-xs font-semibold mb-1.5" style={{ color: cfg.color }}>
          💡 Kāpēc?
        </div>
        <p className="text-white/70 text-sm leading-relaxed">{explanation}</p>
      </motion.div>

      {/* Continue button */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        onClick={onContinue}
        className="w-full py-3.5 rounded-xl font-bold text-black text-sm transition-all hover:brightness-110 active:scale-[0.98]"
        style={{ background: cfg.color }}
      >
        Turpināt →
      </motion.button>
    </motion.div>
  );
}
