import { motion } from 'framer-motion';

interface ProgressBarProps {
  value: number; // 0–100
  color?: string;
  height?: number;
  className?: string;
  animated?: boolean;
}

export function ProgressBar({
  value,
  color = '#e8c547',
  height = 6,
  className = '',
  animated = true,
}: ProgressBarProps) {
  const clamped = Math.min(100, Math.max(0, value));
  return (
    <div
      className={`w-full rounded-full bg-white/8 overflow-hidden ${className}`}
      style={{ height }}
    >
      <motion.div
        className="h-full rounded-full"
        style={{ backgroundColor: color }}
        initial={{ width: 0 }}
        animate={{ width: `${clamped}%` }}
        transition={animated ? { duration: 0.8, ease: 'easeOut' } : { duration: 0 }}
      />
    </div>
  );
}
