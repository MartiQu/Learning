import { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuthStore } from '../store/authStore';
import { AppNavbar } from '../components/ui/AppNavbar';
import { questions } from '../data/questions';
import { qualitySystems } from '../data/systems';
import type { Question, MultipleChoiceData } from '../types';

// ── Canvas / grid constants ───────────────────────────────────────────────
const CELL    = 26;
const COLS    = 20;
const ROWS    = 15;
const CANVAS_W = CELL * COLS; // 520
const CANVAS_H = CELL * ROWS; // 390
const TICK_MS  = 160;
const Q_TIME_S = 15;

// Food block dimensions in grid cells
const FOOD_W = 4;  // cells wide  → 4×26 = 104 px
const FOOD_H = 2;  // cells tall  → 2×26 =  52 px

// 4 answer colours
const OPT_COLORS = ['#7c6fff', '#e8c547', '#4ecdc4', '#ff6b6b'];

// One random spawn zone per answer (top-left corner of the FOOD_W×FOOD_H block).
// Zones stay clear of the snake start area (x=8-10, y=7).
const FOOD_ZONES = [
  { minX: 1,  maxX: 5,  minY: 1,  maxY: 3  }, // top-left quadrant
  { minX: 13, maxX: 15, minY: 1,  maxY: 3  }, // top-right quadrant
  { minX: 1,  maxX: 5,  minY: 9,  maxY: 11 }, // bottom-left quadrant
  { minX: 13, maxX: 15, minY: 9,  maxY: 11 }, // bottom-right quadrant
];

// ── Types ─────────────────────────────────────────────────────────────────
type Dir        = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';
type Pt         = { x: number; y: number };
type GameStatus = 'idle' | 'playing' | 'over';

interface FoodItem {
  x:         number;   // top-left grid column
  y:         number;   // top-left grid row
  text:      string;   // answer text rendered on the block
  isCorrect: boolean;
  color:     string;
}

type MCQuestion = Question & { type: 'MultipleChoice'; data: MultipleChoiceData };

// ── Helpers ───────────────────────────────────────────────────────────────
function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function drawRoundRect(
  ctx: CanvasRenderingContext2D,
  x: number, y: number, w: number, h: number, r: number,
) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

/**
 * Wrap `text` into at most 2 lines that each fit within `maxWidth` pixels.
 * The last line is truncated with '…' if it still overflows.
 */
function wrapText(
  ctx: CanvasRenderingContext2D,
  text: string,
  maxWidth: number,
): string[] {
  const words = text.split(' ');
  let line1 = '';
  let line2 = '';
  let onLine2 = false;

  for (const word of words) {
    if (!onLine2) {
      const test = line1 ? `${line1} ${word}` : word;
      if (ctx.measureText(test).width > maxWidth && line1) {
        onLine2 = true;
        line2 = word;
      } else {
        line1 = test;
      }
    } else {
      line2 = line2 ? `${line2} ${word}` : word;
    }
  }

  const result = line2 ? [line1, line2] : [line1];

  // Truncate last line with ellipsis if too wide
  const li  = result.length - 1;
  let last  = result[li];
  while (last.length > 1 && ctx.measureText(`${last}…`).width > maxWidth) {
    last = last.slice(0, -1).trimEnd();
  }
  if (last !== result[li]) result[li] = `${last}…`;

  return result;
}

// ── Component ─────────────────────────────────────────────────────────────
export function SnakeGameScreen() {
  const { systemId } = useParams<{ systemId: string }>();
  const navigate     = useNavigate();
  const { user }     = useAuthStore();

  const system = qualitySystems.find((s) => s.id === systemId);

  // ── Canvas ref ────────────────────────────────────────────────────────────
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // ── Mutable game state (refs — no stale closures in intervals) ────────────
  const snakeRef    = useRef<Pt[]>([]);
  const foodsRef    = useRef<FoodItem[]>([]);
  const dirRef      = useRef<Dir>('RIGHT');
  const nextDirRef  = useRef<Dir>('RIGHT');
  const statusRef   = useRef<GameStatus>('idle');
  const qPoolRef    = useRef<MCQuestion[]>([]);
  const qIdxRef     = useRef(0);
  const timeRef     = useRef(Q_TIME_S);
  const scoreRef    = useRef(0);

  // ── React state (UI only) ─────────────────────────────────────────────────
  const [status,   setStatus]   = useState<GameStatus>('idle');
  const [score,    setScore]    = useState(0);
  const [snakeLen, setSnakeLen] = useState(3);
  const [timeLeft, setTimeLeft] = useState(Q_TIME_S);
  const [currentQ, setCurrentQ] = useState<MCQuestion | null>(null);
  const [message,  setMessage]  = useState<{ text: string; ok: boolean } | null>(null);

  // ── Interval refs ─────────────────────────────────────────────────────────
  const loopRef    = useRef<ReturnType<typeof setInterval> | null>(null);
  const timerRef   = useRef<ReturnType<typeof setInterval> | null>(null);
  const msgTimeRef = useRef<ReturnType<typeof setTimeout>  | null>(null);

  // ── Canvas draw ───────────────────────────────────────────────────────────
  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Background
    ctx.fillStyle = '#0d0d14';
    ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);

    // Subtle grid
    ctx.strokeStyle = 'rgba(255,255,255,0.028)';
    ctx.lineWidth = 0.5;
    for (let x = 0; x <= COLS; x++) {
      ctx.beginPath(); ctx.moveTo(x * CELL, 0); ctx.lineTo(x * CELL, CANVAS_H); ctx.stroke();
    }
    for (let y = 0; y <= ROWS; y++) {
      ctx.beginPath(); ctx.moveTo(0, y * CELL); ctx.lineTo(CANVAS_W, y * CELL); ctx.stroke();
    }

    // Food items — each a FOOD_W × FOOD_H block with answer text
    ctx.save();
    for (const food of foodsRef.current) {
      const px = food.x * CELL + 2;
      const py = food.y * CELL + 2;
      const pw = FOOD_W * CELL - 4; // 100 px
      const ph = FOOD_H * CELL - 4; //  48 px

      // Background fill
      ctx.fillStyle = food.color + '28';
      drawRoundRect(ctx, px, py, pw, ph, 9);
      ctx.fill();

      // Border
      ctx.strokeStyle = food.color + 'bb';
      ctx.lineWidth = 1.5;
      drawRoundRect(ctx, px, py, pw, ph, 9);
      ctx.stroke();

      // Answer text (two-line wrap)
      ctx.font = 'bold 9.5px "DM Sans", sans-serif';
      ctx.fillStyle = food.color;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      const textMaxW = pw - 16;
      const lines    = wrapText(ctx, food.text, textMaxW);
      const lineH    = 13;
      const totalH   = lines.length * lineH;
      const startY   = py + ph / 2 - totalH / 2 + lineH / 2;

      for (let i = 0; i < lines.length; i++) {
        ctx.fillText(lines[i], px + pw / 2, startY + i * lineH);
      }
    }
    ctx.restore();

    // Snake body (tail → head so head is drawn on top)
    const snake = snakeRef.current;
    for (let i = snake.length - 1; i >= 0; i--) {
      const seg    = snake[i];
      const isHead = i === 0;
      const t      = snake.length > 1 ? i / (snake.length - 1) : 0;
      const alpha  = 1 - t * 0.55;

      ctx.fillStyle = isHead ? '#ffffff' : `rgba(124,111,255,${alpha})`;

      drawRoundRect(
        ctx,
        seg.x * CELL + 2, seg.y * CELL + 2,
        CELL - 4, CELL - 4,
        isHead ? 8 : 4,
      );
      ctx.fill();

      // Eye dots on head
      if (isHead) {
        ctx.fillStyle = '#0d0d14';
        const ex = seg.x * CELL + CELL / 2;
        const ey = seg.y * CELL + CELL / 2;
        ctx.beginPath(); ctx.arc(ex - 4, ey - 3, 2.5, 0, Math.PI * 2); ctx.fill();
        ctx.beginPath(); ctx.arc(ex + 4, ey - 3, 2.5, 0, Math.PI * 2); ctx.fill();
      }
    }
  }, []);

  // ── Flash message helper ───────────────────────────────────────────────────
  const showMsg = useCallback((text: string, ok: boolean) => {
    if (msgTimeRef.current) clearTimeout(msgTimeRef.current);
    setMessage({ text, ok });
    msgTimeRef.current = setTimeout(() => setMessage(null), 1400);
  }, []);

  // ── Load a question — pick random zone positions for each food block ───────
  const loadQuestion = useCallback((idx: number) => {
    const pool = qPoolRef.current;
    if (!pool.length) return;
    const q = pool[idx % pool.length];

    const correctId  = q.correctAnswer as string;
    const opts       = q.data.options;
    const correctOpt = opts.find((o) => o.id === correctId)!;
    const wrongOpts  = shuffle(opts.filter((o) => o.id !== correctId)).slice(0, 3);

    const all = shuffle([
      { text: correctOpt.text, isCorrect: true  },
      ...wrongOpts.map((o) => ({ text: o.text, isCorrect: false })),
    ]);

    const foods: FoodItem[] = all.map((opt, i) => {
      const zone = FOOD_ZONES[i];
      const x    = zone.minX + Math.floor(Math.random() * (zone.maxX - zone.minX + 1));
      const y    = zone.minY + Math.floor(Math.random() * (zone.maxY - zone.minY + 1));
      return { x, y, text: opt.text, isCorrect: opt.isCorrect, color: OPT_COLORS[i] };
    });

    foodsRef.current = foods;
    setCurrentQ(q);
    timeRef.current = Q_TIME_S;
    setTimeLeft(Q_TIME_S);
  }, []);

  // ── Check if snake head is inside a food block ────────────────────────────
  const eatFood = useCallback((head: Pt): FoodItem | null => {
    for (const food of foodsRef.current) {
      if (head.x >= food.x && head.x < food.x + FOOD_W &&
          head.y >= food.y && head.y < food.y + FOOD_H) {
        return food;
      }
    }
    return null;
  }, []);

  // ── Game-over handler ─────────────────────────────────────────────────────
  const endGame = useCallback(() => {
    statusRef.current = 'over';
    setStatus('over');
    if (loopRef.current)  clearInterval(loopRef.current);
    if (timerRef.current) clearInterval(timerRef.current);
  }, []);

  // ── One game tick ─────────────────────────────────────────────────────────
  const step = useCallback(() => {
    if (statusRef.current !== 'playing') return;

    dirRef.current = nextDirRef.current;

    const head = { ...snakeRef.current[0] };
    if (dirRef.current === 'UP')    head.y--;
    if (dirRef.current === 'DOWN')  head.y++;
    if (dirRef.current === 'LEFT')  head.x--;
    if (dirRef.current === 'RIGHT') head.x++;

    // Wall collision
    if (head.x < 0 || head.x >= COLS || head.y < 0 || head.y >= ROWS) {
      endGame(); return;
    }

    // Self collision (exclude last segment — it moves away this tick)
    const body = snakeRef.current.slice(0, -1);
    if (body.some((s) => s.x === head.x && s.y === head.y)) {
      endGame(); return;
    }

    let newSnake: Pt[] = [head, ...snakeRef.current.slice(0, -1)];

    const eaten = eatFood(head);
    if (eaten) {
      if (eaten.isCorrect) {
        // Grow +2
        const tail = snakeRef.current[snakeRef.current.length - 1];
        newSnake = [head, ...snakeRef.current, tail, tail];
        scoreRef.current++;
        setScore(scoreRef.current);
        showMsg('Pareizi! 🎉 +2', true);
        qIdxRef.current++;
        loadQuestion(qIdxRef.current);
      } else {
        // Shrink -2
        newSnake = newSnake.slice(0, Math.max(1, newSnake.length - 2));
        showMsg('Nepareizi 😬 -2', false);
      }
    }

    snakeRef.current = newSnake;
    setSnakeLen(newSnake.length);
    draw();
  }, [eatFood, endGame, loadQuestion, showMsg, draw]);

  // ── Direction helper (prevents 180° turns) ────────────────────────────────
  const trySetDir = useCallback((d: Dir) => {
    const c = dirRef.current;
    if ((d === 'UP'    && c === 'DOWN')  ||
        (d === 'DOWN'  && c === 'UP')    ||
        (d === 'LEFT'  && c === 'RIGHT') ||
        (d === 'RIGHT' && c === 'LEFT')) return;
    nextDirRef.current = d;
  }, []);

  // ── Keyboard listener ─────────────────────────────────────────────────────
  useEffect(() => {
    const map: Record<string, Dir> = {
      ArrowUp: 'UP',   w: 'UP',
      ArrowDown: 'DOWN', s: 'DOWN',
      ArrowLeft: 'LEFT', a: 'LEFT',
      ArrowRight: 'RIGHT', d: 'RIGHT',
    };
    const onKey = (e: KeyboardEvent) => {
      const d = map[e.key];
      if (d) { e.preventDefault(); trySetDir(d); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [trySetDir]);

  // ── Cleanup on unmount ────────────────────────────────────────────────────
  useEffect(() => () => {
    if (loopRef.current)    clearInterval(loopRef.current);
    if (timerRef.current)   clearInterval(timerRef.current);
    if (msgTimeRef.current) clearTimeout(msgTimeRef.current);
  }, []);

  // ── Start / restart game ──────────────────────────────────────────────────
  const startGame = useCallback(() => {
    if (!systemId) return;

    const pool = shuffle(
      questions.filter(
        (q) => q.type === 'MultipleChoice' && q.levelId.startsWith(systemId + '-'),
      ) as MCQuestion[],
    );
    if (!pool.length) return;
    qPoolRef.current  = pool;

    const init: Pt[] = [{ x: 10, y: 7 }, { x: 9, y: 7 }, { x: 8, y: 7 }];
    snakeRef.current   = init;
    dirRef.current     = 'RIGHT';
    nextDirRef.current = 'RIGHT';
    scoreRef.current   = 0;
    qIdxRef.current    = 0;

    setScore(0);
    setSnakeLen(3);
    statusRef.current = 'playing';
    setStatus('playing');

    loadQuestion(0);

    if (loopRef.current)  clearInterval(loopRef.current);
    if (timerRef.current) clearInterval(timerRef.current);

    loopRef.current = setInterval(step, TICK_MS);

    timerRef.current = setInterval(() => {
      timeRef.current--;
      setTimeLeft(timeRef.current);
      if (timeRef.current <= 0) {
        snakeRef.current = snakeRef.current.slice(0, Math.max(1, snakeRef.current.length - 1));
        setSnakeLen(snakeRef.current.length);
        showMsg('Laiks beidzās ⏱ -1', false);
        qIdxRef.current++;
        loadQuestion(qIdxRef.current);
      }
    }, 1000);

    draw();
  }, [systemId, loadQuestion, step, showMsg, draw]);

  // ── Guards ────────────────────────────────────────────────────────────────
  if (!user) { navigate('/'); return null; }
  if (!system) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: '#0a0a0f' }}>
        <p className="text-white/40">Sistēma nav atrasta</p>
      </div>
    );
  }

  const hasQuestions = questions.some(
    (q) => q.type === 'MultipleChoice' && q.levelId.startsWith(systemId + '-'),
  );

  const timerDanger = timeLeft <= 5;

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen" style={{ background: '#0a0a0f' }}>
      <AppNavbar />

      <div className="max-w-3xl mx-auto px-4 py-8">

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-6 text-sm flex-wrap">
          <button
            onClick={() => navigate('/games')}
            className="text-white/30 hover:text-white/70 transition-colors cursor-pointer"
          >
            ← Spēles
          </button>
          <span className="text-white/15">/</span>
          <span className="text-white/45">{system.name}</span>
          <span className="text-white/15">/</span>
          <span className="text-white font-medium">🐍 Snake</span>
        </div>

        {/* Score bar */}
        <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
          <div className="flex items-center gap-4">
            <div className="text-white font-bold text-lg">
              Punkti: <span style={{ color: system.color }}>{score}</span>
            </div>
            <div className="text-white/30 text-sm">
              Garums: <span className="text-white/55">{snakeLen}</span>
            </div>
          </div>

          {status === 'playing' && (
            <div
              className="flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-bold transition-colors"
              style={{
                background: timerDanger ? 'rgba(239,68,68,0.15)' : 'rgba(255,255,255,0.06)',
                color:      timerDanger ? '#ef4444' : 'rgba(255,255,255,0.70)',
                border:     `1px solid ${timerDanger ? 'rgba(239,68,68,0.30)' : 'rgba(255,255,255,0.10)'}`,
              }}
            >
              ⏱ {timeLeft}s
            </div>
          )}
        </div>

        {/* Question panel — shown ABOVE the canvas while playing */}
        <AnimatePresence mode="wait">
          {status === 'playing' && currentQ && (
            <motion.div
              key={currentQ.id}
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mb-3 px-4 py-3 rounded-xl border border-white/8 flex items-start gap-3"
              style={{ background: '#12121a' }}
            >
              <span className="text-base shrink-0 mt-0.5">❓</span>
              <p className="text-white font-semibold text-sm leading-snug">{currentQ.prompt}</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Canvas wrapper */}
        <div
          className="relative rounded-2xl overflow-hidden border border-white/8"
          style={{ width: '100%', maxWidth: CANVAS_W }}
        >
          <canvas
            ref={canvasRef}
            width={CANVAS_W}
            height={CANVAS_H}
            className="block"
            style={{ width: '100%', height: 'auto' }}
          />

          {/* Feedback message */}
          <AnimatePresence>
            {message && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 6 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="absolute inset-0 flex items-center justify-center pointer-events-none"
              >
                <div
                  className="text-xl font-bold px-6 py-3 rounded-2xl"
                  style={{
                    background:     message.ok ? 'rgba(78,205,196,0.18)' : 'rgba(239,68,68,0.18)',
                    color:          message.ok ? '#4ecdc4'               : '#ef4444',
                    border:         `1px solid ${message.ok ? 'rgba(78,205,196,0.40)' : 'rgba(239,68,68,0.35)'}`,
                    backdropFilter: 'blur(10px)',
                  }}
                >
                  {message.text}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* IDLE overlay */}
          {status === 'idle' && (
            <div
              className="absolute inset-0 flex flex-col items-center justify-center gap-4 px-6 text-center"
              style={{ background: 'rgba(10,10,15,0.90)', backdropFilter: 'blur(8px)' }}
            >
              <div className="text-5xl">🐍</div>
              <div className="text-white text-xl font-bold">Snake — {system.name}</div>
              <div className="text-white/40 text-sm leading-relaxed max-w-xs">
                Lasi jautājumu virs laukuma. Uz laukuma parādīsies 4 atbilžu bloki ar tekstu —
                vadi čūsku pie pareizās atbildes. Pareizi → aug par 2, nepareizi → samazinās par 2!
              </div>
              <div className="text-white/25 text-xs">Vadība: ↑ ↓ ← → vai W A S D</div>
              {!hasQuestions ? (
                <div className="text-white/30 text-sm">Šai sistēmai vēl nav jautājumu.</div>
              ) : (
                <button
                  onClick={startGame}
                  className="mt-2 px-8 py-3 rounded-xl font-bold text-sm cursor-pointer transition-all hover:brightness-110"
                  style={{ background: system.color, color: '#000' }}
                >
                  Sākt spēli
                </button>
              )}
            </div>
          )}

          {/* GAME OVER overlay */}
          {status === 'over' && (
            <div
              className="absolute inset-0 flex flex-col items-center justify-center gap-4"
              style={{ background: 'rgba(10,10,15,0.90)', backdropFilter: 'blur(8px)' }}
            >
              <div className="text-4xl">💀</div>
              <div className="text-white text-2xl font-bold">Spēle beigusies!</div>
              <div className="text-white/50 text-sm">
                Rezultāts:{' '}
                <span className="text-white font-bold text-lg">{score}</span> pareizas atbildes
              </div>
              <div className="flex gap-3 mt-2">
                <button
                  onClick={startGame}
                  className="px-6 py-2.5 rounded-xl font-semibold text-sm cursor-pointer transition-all hover:brightness-110"
                  style={{ background: system.color, color: '#000' }}
                >
                  Spēlēt vēlreiz
                </button>
                <button
                  onClick={() => navigate('/games')}
                  className="px-6 py-2.5 rounded-xl font-semibold text-sm cursor-pointer border border-white/10 text-white/55 hover:text-white hover:border-white/25 transition-all"
                >
                  Atpakaļ
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Mobile D-pad */}
        <div className="flex flex-col items-center gap-2 mt-5 md:hidden select-none">
          <button
            onPointerDown={() => trySetDir('UP')}
            className="w-14 h-14 rounded-2xl text-2xl flex items-center justify-center active:scale-95 transition-transform cursor-pointer"
            style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.10)' }}
          >↑</button>
          <div className="flex gap-2">
            <button
              onPointerDown={() => trySetDir('LEFT')}
              className="w-14 h-14 rounded-2xl text-2xl flex items-center justify-center active:scale-95 transition-transform cursor-pointer"
              style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.10)' }}
            >←</button>
            <div className="w-14 h-14" />
            <button
              onPointerDown={() => trySetDir('RIGHT')}
              className="w-14 h-14 rounded-2xl text-2xl flex items-center justify-center active:scale-95 transition-transform cursor-pointer"
              style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.10)' }}
            >→</button>
          </div>
          <button
            onPointerDown={() => trySetDir('DOWN')}
            className="w-14 h-14 rounded-2xl text-2xl flex items-center justify-center active:scale-95 transition-transform cursor-pointer"
            style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.10)' }}
          >↓</button>
        </div>

        {/* Controls reminder (desktop) */}
        {status === 'playing' && (
          <div className="mt-3 text-center text-white/18 text-xs hidden md:block">
            ↑ ↓ ← → vai W A S D — vadī čūsku
          </div>
        )}
      </div>
    </div>
  );
}
