import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  hover?: boolean;
  glow?: string; // hex or css color for glow
}

export function Card({ children, className = '', onClick, hover = false, glow }: CardProps) {
  return (
    <motion.div
      onClick={onClick}
      whileHover={hover ? { y: -4, scale: 1.01 } : {}}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      style={glow ? { boxShadow: `0 0 24px ${glow}33, 0 0 0 1px ${glow}22` } : undefined}
      className={`bg-surface rounded-2xl border border-white/8 ${hover ? 'cursor-pointer' : ''} ${className}`}
    >
      {children}
    </motion.div>
  );
}
