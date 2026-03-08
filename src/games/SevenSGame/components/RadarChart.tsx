import { motion } from 'framer-motion';
import type { ZoneResult } from '../types';
import { ZONE_META } from '../data';

interface RadarChartProps {
  results: ZoneResult[];
}

const CX = 200;
const CY = 200;
const R_MAX = 140;
const N = 7;

function polarToXY(index: number, score: number): { x: number; y: number } {
  const angle = (index / N) * Math.PI * 2 - Math.PI / 2;
  const r = (score / 100) * R_MAX;
  return { x: CX + r * Math.cos(angle), y: CY + r * Math.sin(angle) };
}

function axisEnd(index: number): { x: number; y: number } {
  const angle = (index / N) * Math.PI * 2 - Math.PI / 2;
  return { x: CX + R_MAX * Math.cos(angle), y: CY + R_MAX * Math.sin(angle) };
}

function labelPos(index: number): { x: number; y: number } {
  const angle = (index / N) * Math.PI * 2 - Math.PI / 2;
  const r = R_MAX + 28;
  return { x: CX + r * Math.cos(angle), y: CY + r * Math.sin(angle) };
}

export function RadarChart({ results }: RadarChartProps) {
  const points = results.map((r, i) => polarToXY(i, r.score));
  const polygon = points.map((p) => `${p.x},${p.y}`).join(' ');

  // Background rings at 25, 50, 75, 100%
  const rings = [25, 50, 75, 100];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="flex justify-center"
    >
      <svg viewBox="0 0 400 400" className="w-full max-w-sm" aria-label="Radara diagramma">
        {/* Background rings */}
        {rings.map((pct) => {
          const r = (pct / 100) * R_MAX;
          return (
            <circle
              key={pct}
              cx={CX}
              cy={CY}
              r={r}
              fill="none"
              stroke="rgba(255,255,255,0.07)"
              strokeWidth="1"
            />
          );
        })}

        {/* Ring labels */}
        {rings.map((pct) => (
          <text
            key={`label-${pct}`}
            x={CX + 4}
            y={CY - (pct / 100) * R_MAX + 4}
            fill="rgba(255,255,255,0.2)"
            fontSize="9"
          >
            {pct}
          </text>
        ))}

        {/* Axes */}
        {Array.from({ length: N }, (_, i) => {
          const end = axisEnd(i);
          return (
            <line
              key={i}
              x1={CX}
              y1={CY}
              x2={end.x}
              y2={end.y}
              stroke="rgba(255,255,255,0.12)"
              strokeWidth="1"
            />
          );
        })}

        {/* Data polygon */}
        <motion.polygon
          points={polygon}
          fill="rgba(249,115,22,0.25)"
          stroke="#f97316"
          strokeWidth="2"
          strokeLinejoin="round"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        />

        {/* Data points */}
        {points.map((p, i) => (
          <motion.circle
            key={i}
            cx={p.x}
            cy={p.y}
            r={5}
            fill="#f97316"
            stroke="#0a0a0f"
            strokeWidth="2"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.4 + i * 0.06, type: 'spring', stiffness: 200 }}
          />
        ))}

        {/* Axis labels */}
        {results.map((r, i) => {
          const pos = labelPos(i);
          const meta = ZONE_META[r.zoneId];
          const anchor =
            pos.x < CX - 10 ? 'end' : pos.x > CX + 10 ? 'start' : 'middle';
          return (
            <g key={i}>
              <text
                x={pos.x}
                y={pos.y - 6}
                textAnchor={anchor}
                fill="rgba(255,255,255,0.7)"
                fontSize="11"
                fontWeight="600"
              >
                {meta.icon} {meta.label}
              </text>
              <text
                x={pos.x}
                y={pos.y + 8}
                textAnchor={anchor}
                fill="#f97316"
                fontSize="12"
                fontWeight="700"
              >
                {r.score}
              </text>
            </g>
          );
        })}
      </svg>
    </motion.div>
  );
}
