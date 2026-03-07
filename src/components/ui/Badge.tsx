import { motion } from 'framer-motion';

interface BadgeProps {
  label: string;
  stars?: number;
  color?: string;
  size?: 'sm' | 'md' | 'lg';
  animate?: boolean;
}

export function Badge({ label, stars = 0, color = '#e8c547', size = 'md', animate = false }: BadgeProps) {
  const sizes = { sm: 'text-xs px-2 py-0.5', md: 'text-sm px-3 py-1', lg: 'text-base px-4 py-2' };

  return (
    <motion.div
      initial={animate ? { scale: 0, rotate: -10 } : false}
      animate={animate ? { scale: 1, rotate: 0 } : false}
      transition={{ type: 'spring', stiffness: 400, damping: 15 }}
      className={`inline-flex items-center gap-1 rounded-full font-medium ${sizes[size]}`}
      style={{ backgroundColor: `${color}22`, color, border: `1px solid ${color}44` }}
    >
      {label}
      {stars > 0 && (
        <span className="flex">
          {Array.from({ length: 3 }).map((_, i) => (
            <span key={i} style={{ opacity: i < stars ? 1 : 0.25 }}>
              ★
            </span>
          ))}
        </span>
      )}
    </motion.div>
  );
}
