import { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuthStore } from '../store/authStore';
import { AppNavbar } from '../components/ui/AppNavbar';
import { questions } from '../data/questions';
import { qualitySystems } from '../data/systems';
import type { Question, MultipleChoiceData } from '../types';

// ── Canvas / grid constants ───────────────────────────────────────────────
const CELL = 26;
const COLS = 20;
const ROWS = 15;
const CANVAS_W = CELL * COLS; // 520
const CANVAS_H = CELL * ROWS; // 390
const TICK_MS = 160;          // ms per snake move
const Q_TIME_S = 15;          // seconds per question

// ── Answer option styling ─────────────────────────────────────────────────
const LETTERS = ['A', 'B', 'C', 'D'];
const OPT_COLORS = ['#7c6fff', '#e8c547', '#4ecdc4', '#ff6b6b'];

// Fixed food slots: top-left corner of each 2×2 block on the grid
// (kept away from snake start at x=8-10, y=7)
const FOOD_SLOTS = [
  { x: 1,  y: 1  },  // top-left
  { x: 14, y: 1  },  // top-right
  { x: 1,  y: 10 },  // bottom-left
  { x: 14, y: 10 },  // bottom-right
];

// ── Types ─────────────────────────────────────────────────────────────────
type Dir = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';
type Pt  = { x: number; y: number };
type GameStatus = 'idle' | 'playing' | 'over';

interface FoodItem {
  slot:      number;   // index into FOOD_SLOTS
  letter:    string;   // A / B / C / D
  text:      string;   // full answer text (for the panel below)
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

// ── Component ─────────────────────────────────────────────────────────────
export function SnakeGameScreen() {
  const { systemId } = useParams<{ systemId: string }>();
  const navigate = useNavigate();
  const { user } = useAuthStore();

  const system = qualitySystems.find((s) => s.id === systemId);

  // ── Canvas ref ───────────────────────────────────────────────────────────
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // ── Mutable game state (in refs — no stale closures in intervals) ─────────
  const snakeRef   = useRef<Pt[]>([]);
  const foodsRef   = useRef<FoodItem[]>([]);
  const dirRef     = useRef<Dir>('RIGHT');
  const nextDirRef = useRef<Dir>('RIGHT');
  const statusRef  = useRef<GameStatus>('idle');
  const qPoolRef   = useRef<MCQuestion[]>([]);
  const qIdxRef    = useRef(0);
  const timeRef    = useRef(Q_TIME_S);
  const scoreRef   = useRef(0);

  // ── React state (UI only) ─────────────────────────────────────────────────
  const [status,       setStatus]      = useState<GameStatus>('idle');
  const [score,        setScore]       = useState(0);
  const [snakeLen,     setSnakeLen]    = useState(3);
  const [timeLeft,     setTimeLeft]    = useState(Q_TIME_S);
  const [currentQ,     setCurrentQ]    = useState<MCQuestion | null>(null);
  const [displayFoods, setDisplayFoods] = useState<FoodItem[]>([]);
  const [message,      setMessage]     = useState<{ text: string; ok: boolean } | null>(null);

  // ── Interval refs ─────────────────────────────────────────────────────────
  const loopRef    = useRef<ReturnType<typeof setInterval> | null>(null);
  const timerRef   = useRef<ReturnType<typeof setInterval> | null>(null);
  const msgTimeRef = useRef<ReturnType<typeof setTimeout> | null>(null);

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

    // Food items (each occupies a 2×2 block)
    for (const food of foodsRef.current) {
      const slot = FOOD_SLOTS[food.slot];
      const px = slot.x * CELL + 2;
      const py = slot.y * CELL + 2;
      const pw = CELL * 2 - 4;
      const ph = CELL * 2 - 4;

      // Filled background
      ctx.fillStyle = food.color + '28';
      drawRoundRect(ctx, px, py, pw, ph, 9);
      ctx.fill();

      // Border
      ctx.strokeStyle = food.color + '99';
      ctx.lineWidth = 1.5;
      drawRoundRect(ctx, px, py, pw, ph, 9);
      ctx.stroke();

      // Large letter
      ctx.fillStyle = food.color;
      ctx.font = 'bold 24px Syne, sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(food.letter, px + pw / 2, py + ph / 2);
    }

    // Snake body (tail → head so head is drawn on top)
    const snake = snakeRef.current;
    for (let i = snake.length - 1; i >= 0; i--) {
      const seg = snake[i];
      const isHead = i === 0;
      const t = snake.length > 1 ? i / (snake.length - 1) : 0;

      // Purple gradient fading to dim towards tail
      const alpha = 1 - t * 0.55;
      ctx.fillStyle = isHead
        ? '#ffffff'
        : `rgba(124, 111, 255, ${alpha})`;

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

  // ── Load a question into state + refs ─────────────────────────────────────
  const loadQuestion = useCallback((idx: number) => {
    const pool = qPoolRef.current;
    if (!pool.length) return;
    const q = pool[idx % pool.length];

    const correctId = q.correctAnswer as string;
    const opts = q.data.options;
    const correctOpt = opts.find((o) => o.id === correctId)!;
    const wrongOpts  = shuffle(opts.filter((o) => o.id !== correctId)).slice(0, 3);

    const all = shuffle([
      { text: correctOpt.text, isCorrect: true  },
      ...wrongOpts.map((o) => ({ text: o.text, isCorrect: false })),
    ]);

    const foods: FoodItem[] = all.map((opt, i) => ({
      slot:      i,
      letter:    LETTERS[i],
      text:      opt.text,
      isCorrect: opt.isCorrect,
      color:     OPT_COLORS[i],
    }));

    foodsRef.current = foods;
    setCurrentQ(q);
    setDisplayFoods(foods);
    timeRef.current = Q_TIME_S;
    setTimeLeft(Q_TIME_S);
  }, []);

  // ── Check if head is inside a food block ──────────────────────────────────
  const eatFood = useCallback((head: Pt): FoodItem | null => {
    for (const food of foodsRef.current) {
      const s = FOOD_SLOTS[food.slot];
      if ((head.x === s.x || head.x === s.x + 1) &&
          (head.y === s.y || head.y === s.y + 1)) {
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

    // New head position
    const head = { ...snakeRef.current[0] };
    if (dirRef.current === 'UP')    head.y--;
    if (dirRef.current === 'DOWN')  head.y++;
    if (dirRef.current === 'LEFT')  head.x--;
    if (dirRef.current === 'RIGHT') head.x++;

    // Wall collision
    if (head.x < 0 || head.x >= COLS || head.y < 0 || head.y >= ROWS) {
      endGame();
      return;
    }

    // Self collision (exclude last tail segment — it moves away)
    const body = snakeRef.current.slice(0, -1);
    if (body.some((s) => s.x === head.x && s.y === head.y)) {
      endGame();
      return;
    }

    // Move (remove tail)
    let newSnake: Pt[] = [head, ...snakeRef.current.slice(0, -1)];

    // Food collision?
    const eaten = eatFood(head);
    if (eaten) {
      if (eaten.isCorrect) {
        // Grow by 2
        const tail = snakeRef.current[snakeRef.current.length - 1];
        newSnake = [head, ...snakeRef.current, tail, tail];
        scoreRef.current++;
        setScore(scoreRef.current);
        showMsg('Pareizi! 🎉 +2', true);
        // Next question
        qIdxRef.current++;
        loadQuestion(qIdxRef.current);
      } else {
        // Shrink by 2
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
      ArrowUp: 'UP',  w: 'UP',
      ArrowDown: 'DOWN',  s: 'DOWN',
      ArrowLeft: 'LEFT',  a: 'LEFT',
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
  useEffect(() => {
    return () => {
      if (loopRef.current)  clearInterval(loopRef.current);
      if (timerRef.current) clearInterval(timerRef.current);
      if (msgTimeRef.current) clearTimeout(msgTimeRef.current);
    };
  }, []);

  // ── Start / restart game ──────────────────────────────────────────────────
  const startGame = useCallback(() => {
    if (!systemId) return;

    // Build shuffled question pool from MC questions for this system
    const pool = shuffle(
      questions.filter(
        (q) => q.type === 'MultipleChoice' && q.levelId.startsWith(systemId + '-'),
      ) as MCQuestion[],
    );
    if (!pool.length) return;
    qPoolRef.current = pool;

    // Reset snake
    const init: Pt[] = [{ x: 10, y: 7 }, { x: 9, y: 7 }, { x: 8, y: 7 }];
    snakeRef.current = init;
    dirRef.current     = 'RIGHT';
    nextDirRef.current = 'RIGHT';
    scoreRef.current   = 0;
    qIdxRef.current    = 0;

    setScore(0);
    setSnakeLen(3);
    statusRef.current = 'playing';
    setStatus('playing');

    // First question
    loadQuestion(0);

    // Clear old intervals
    if (loopRef.current)  clearInterval(loopRef.current);
    if (timerRef.current) clearInterval(timerRef.current);

    // Game loop
    loopRef.current = setInterval(step, TICK_MS);

    // Countdown timer
    timerRef.current = setInterval(() => {
      timeRef.current--;
      setTimeLeft(timeRef.current);

      if (timeRef.current <= 0) {
        // Time expired — shrink and move to next question
        snakeRef.current = snakeRef.current.slice(0, Math.max(1, snakeRef.current.length - 1));
        setSnakeLen(snakeRef.current.length);
        showMsg('Laiks beidzās ⏱ -1', false);
        qIdxRef.current++;
        loadQuestion(qIdxRef.current);
      }
    }, 1000);

    draw();
  }, [systemId, loadQuestion, step, showMsg, draw]);

  // ── Guard: auth ───────────────────────────────────────────────────────────
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

  // ── Timer colour ──────────────────────────────────────────────────────────
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
              Punkti:{' '}
              <span style={{ color: system.color }}>{score}</span>
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
                    background:   message.ok ? 'rgba(78,205,196,0.18)'  : 'rgba(239,68,68,0.18)',
                    color:        message.ok ? '#4ecdc4'                 : '#ef4444',
                    border:       `1px solid ${message.ok ? 'rgba(78,205,196,0.40)' : 'rgba(239,68,68,0.35)'}`,
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
                Uz laukuma parādīsies 4 burti (A/B/C/D). Vadi čūsku pie pareizā burta,
                kas atbilst pareizajai atbildei. Pareizi → aug, nepareizi → samazinās!
              </div>
              <div className="text-white/25 text-xs">
                Vadība: ↑ ↓ ← → vai W A S D
              </div>
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

        {/* Question panel */}
        {status === 'playing' && currentQ && (
          <motion.div
            key={currentQ.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 p-5 rounded-2xl border border-white/8"
            style={{ background: '#12121a' }}
          >
            <div className="text-white/40 text-xs font-semibold uppercase tracking-wider mb-2">
              ❓ Jautājums
            </div>
            <div className="text-white font-semibold text-base leading-snug mb-4">
              {currentQ.prompt}
            </div>

            {/* Answer grid */}
            <div className="grid grid-cols-2 gap-2">
              {displayFoods.map((food) => (
                <div
                  key={food.slot}
                  className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl"
                  style={{
                    background: food.color + '0e',
                    border:     `1px solid ${food.color}30`,
                  }}
                >
                  <span
                    className="w-6 h-6 rounded-md flex items-center justify-center text-xs font-bold shrink-0"
                    style={{ background: food.color, color: '#000' }}
                  >
                    {food.letter}
                  </span>
                  <span className="text-white/65 text-xs leading-snug">{food.text}</span>
                </div>
              ))}
            </div>
          </motion.div>
        )}

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
