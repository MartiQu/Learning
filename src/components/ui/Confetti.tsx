import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  size: number;
  rotation: number;
  vr: number;
}

const COLORS = ['#e8c547', '#7c6fff', '#4ecdc4', '#ff6b6b', '#a8ff78', '#fff'];

function randomBetween(a: number, b: number) {
  return a + Math.random() * (b - a);
}

export function Confetti({ active }: { active: boolean }) {
  const particles = useRef<Particle[]>([]);

  if (active && particles.current.length === 0) {
    particles.current = Array.from({ length: 80 }, (_, i) => ({
      id: i,
      x: randomBetween(10, 90),
      y: randomBetween(-20, 10),
      vx: randomBetween(-4, 4),
      vy: randomBetween(2, 8),
      color: COLORS[Math.floor(Math.random() * COLORS.length)]!,
      size: randomBetween(6, 14),
      rotation: randomBetween(0, 360),
      vr: randomBetween(-8, 8),
    }));
  }

  useEffect(() => {
    if (!active) particles.current = [];
  }, [active]);

  return (
    <AnimatePresence>
      {active && (
        <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
          {particles.current.map((p) => (
            <motion.div
              key={p.id}
              initial={{ x: `${p.x}vw`, y: `${p.y}vh`, rotate: p.rotation, opacity: 1 }}
              animate={{
                x: `${p.x + p.vx * 20}vw`,
                y: `${120}vh`,
                rotate: p.rotation + p.vr * 50,
                opacity: 0,
              }}
              transition={{ duration: randomBetween(1.5, 3), ease: 'easeIn' }}
              style={{
                position: 'absolute',
                width: p.size,
                height: p.size,
                backgroundColor: p.color,
                borderRadius: Math.random() > 0.5 ? '50%' : '2px',
              }}
            />
          ))}
        </div>
      )}
    </AnimatePresence>
  );
}
