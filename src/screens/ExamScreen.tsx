import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useParams } from 'react-router-dom';
import { qualitySystems } from '../data/systems';
import { levels } from '../data/levels';
import { useProgressStore } from '../store/progressStore';

type Message = { role: 'user' | 'assistant'; content: string };

export function ExamScreen() {
  const { systemId } = useParams<{ systemId: string }>();
  const navigate = useNavigate();
  const { getProgress, saveExamScore, examScores } = useProgressStore();

  const system = qualitySystems.find((s) => s.id === systemId);
  const systemLevels = levels.filter((l) => l.systemId === systemId);
  const progress = getProgress(systemId!);
  const allDone = progress.completedLevels.length >= systemLevels.length && systemLevels.length > 0;

  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [examDone, setExamDone] = useState(false);
  const [score, setScore] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Check for existing score
  const existingScore = examScores[systemId!];

  useEffect(() => {
    if (!allDone) {
      navigate(`/system/${systemId}`);
      return;
    }
    // Start exam with first AI message
    sendMessage([]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  async function sendMessage(msgs: Message[]) {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/exam-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: msgs, systemId }),
      });
      const data = await res.json();

      if (!res.ok || data.error) {
        setError(`Kļūda: ${data.error ?? res.statusText}`);
        return;
      }

      const { text } = data;
      const newMessages: Message[] = [...msgs, { role: 'assistant', content: text }];
      setMessages(newMessages);

      // Check for exam completion
      const match = text.match(/[Vv]ērtējums:\s*(\d+)\/10/);
      if (match) {
        const parsedScore = parseInt(match[1], 10);
        setScore(parsedScore);
        saveExamScore(systemId!, parsedScore);
        setExamDone(true);
      }
    } catch (err) {
      setError(`Savienojuma kļūda: ${err instanceof Error ? err.message : 'nezināma kļūda'}`);
    } finally {
      setLoading(false);
    }
  }

  function handleSubmit() {
    const trimmed = input.trim();
    if (!trimmed || loading || examDone) return;
    const newMessages: Message[] = [...messages, { role: 'user', content: trimmed }];
    setMessages(newMessages);
    setInput('');
    sendMessage(newMessages);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  }

  if (!system) return null;

  const textColor = system.color === '#e8c547' ? '#000' : '#fff';
  const scoreColor =
    score !== null
      ? score >= 8
        ? '#4ecdc4'
        : score >= 5
        ? '#e8c547'
        : '#ff6b6b'
      : system.color;

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ background: '#0a0a0f', fontFamily: 'DM Sans, sans-serif' }}
    >
      {/* Top bar */}
      <div
        className="flex items-center gap-3 px-4 py-4 border-b"
        style={{
          background: 'rgba(18,18,26,0.95)',
          borderColor: 'rgba(255,255,255,0.06)',
          backdropFilter: 'blur(12px)',
        }}
      >
        <button
          onClick={() => navigate(`/system/${systemId}`)}
          className="flex items-center gap-1.5 text-sm font-medium transition-opacity hover:opacity-70"
          style={{ color: 'rgba(255,255,255,0.5)' }}
        >
          ← Atpakaļ
        </button>
        <div className="flex-1 flex items-center justify-center gap-2">
          <span style={{ fontSize: 18 }}>{system.icon}</span>
          <span className="font-semibold text-white/80 text-sm">
            {system.name} · Eksāmens
          </span>
        </div>
        {existingScore !== undefined && (
          <span className="text-xs font-bold" style={{ color: system.color }}>
            {existingScore}/10
          </span>
        )}
      </div>

      {/* Chat messages */}
      <div className="flex-1 overflow-y-auto px-4 py-6">
        <div className="max-w-2xl mx-auto flex flex-col gap-3">
          <AnimatePresence initial={false}>
            {messages.map((msg, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className="max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap"
                  style={
                    msg.role === 'user'
                      ? {
                          background: `linear-gradient(135deg, ${system.color}cc, ${system.color}88)`,
                          color: textColor,
                          borderRadius: '18px 18px 4px 18px',
                        }
                      : {
                          background: 'rgba(255,255,255,0.04)',
                          color: 'rgba(255,255,255,0.88)',
                          border: '1px solid rgba(255,255,255,0.06)',
                          borderRadius: '18px 18px 18px 4px',
                        }
                  }
                >
                  {msg.content}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Loading indicator */}
          <AnimatePresence>
            {loading && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 4 }}
                className="flex justify-start"
              >
                <div
                  className="flex items-center gap-1.5 px-4 py-3 rounded-2xl"
                  style={{
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.06)',
                    borderRadius: '18px 18px 18px 4px',
                  }}
                >
                  {[0, 1, 2].map((i) => (
                    <motion.div
                      key={i}
                      animate={{ opacity: [0.3, 1, 0.3], y: [0, -3, 0] }}
                      transition={{
                        duration: 1.2,
                        repeat: Infinity,
                        delay: i * 0.2,
                        ease: 'easeInOut',
                      }}
                      style={{
                        width: 7,
                        height: 7,
                        borderRadius: '50%',
                        background: system.color,
                      }}
                    />
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Error message */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="flex justify-center"
              >
                <div
                  className="flex items-center gap-2 px-4 py-3 rounded-2xl text-sm max-w-[85%]"
                  style={{ background: 'rgba(255,80,80,0.1)', border: '1px solid rgba(255,80,80,0.25)', color: '#ff8080' }}
                >
                  <span>⚠️</span>
                  <span>{error}</span>
                  <button
                    onClick={() => { setError(null); sendMessage(messages); }}
                    className="ml-2 underline underline-offset-2 hover:opacity-70"
                  >
                    Mēģināt vēlreiz
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div ref={bottomRef} />
        </div>
      </div>

      {/* Input area */}
      <div
        className="border-t px-4 py-4"
        style={{
          background: 'rgba(18,18,26,0.97)',
          borderColor: 'rgba(255,255,255,0.06)',
          backdropFilter: 'blur(12px)',
        }}
      >
        <div className="max-w-2xl mx-auto flex gap-3 items-end">
          <textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={loading || examDone}
            placeholder={examDone ? 'Eksāmens pabeigts' : 'Raksti atbildi...'}
            rows={1}
            className="flex-1 resize-none rounded-2xl px-4 py-3 text-sm outline-none transition-all"
            style={{
              background: 'rgba(255,255,255,0.05)',
              border: `1px solid ${loading || examDone ? 'rgba(255,255,255,0.06)' : `${system.color}40`}`,
              color: '#fff',
              maxHeight: 120,
              opacity: loading || examDone ? 0.5 : 1,
            }}
          />
          <button
            onClick={handleSubmit}
            disabled={loading || examDone || !input.trim()}
            className="shrink-0 px-5 py-3 rounded-2xl font-semibold text-sm transition-all hover:opacity-90 active:scale-[0.97] disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
            style={{
              background: `linear-gradient(135deg, ${system.color}, ${system.color}cc)`,
              color: textColor,
            }}
          >
            Sūtīt
          </button>
        </div>
      </div>

      {/* Exam done overlay */}
      <AnimatePresence>
        {examDone && score !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 flex items-center justify-center z-50 px-4"
            style={{ background: 'rgba(10,10,15,0.88)', backdropFilter: 'blur(16px)' }}
          >
            <motion.div
              initial={{ scale: 0.88, y: 24 }}
              animate={{ scale: 1, y: 0 }}
              transition={{ type: 'spring', stiffness: 320, damping: 28 }}
              className="w-full max-w-sm rounded-3xl border p-8 text-center"
              style={{
                background: '#12121a',
                borderColor: `${scoreColor}30`,
                boxShadow: `0 0 60px ${scoreColor}20`,
              }}
            >
              {/* Score circle */}
              <div
                className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6"
                style={{
                  background: `linear-gradient(135deg, ${scoreColor}30, ${scoreColor}10)`,
                  border: `3px solid ${scoreColor}60`,
                  boxShadow: `0 0 32px ${scoreColor}40`,
                }}
              >
                <span
                  className="font-heading font-bold"
                  style={{ fontSize: 28, color: scoreColor }}
                >
                  {score}/10
                </span>
              </div>

              <h2
                className="font-heading text-xl font-bold mb-2"
                style={{ color: '#fff' }}
              >
                Eksāmens pabeigts!
              </h2>
              <p className="text-sm mb-2" style={{ color: 'rgba(255,255,255,0.45)' }}>
                {system.name}
              </p>
              <p className="text-sm mb-8 leading-relaxed" style={{ color: 'rgba(255,255,255,0.6)' }}>
                {score >= 8
                  ? 'Lielisks rezultāts! Tev ir dziļas zināšanas šajā tēmā.'
                  : score >= 5
                  ? 'Labs rezultāts. Turpini pilnveidoties!'
                  : 'Iesaku atkārtot kursa materiālu un mēģināt vēlreiz.'}
              </p>

              <button
                onClick={() => navigate(`/system/${systemId}`)}
                className="w-full py-3.5 rounded-2xl font-bold text-base transition-all hover:opacity-90 active:scale-[0.98] cursor-pointer"
                style={{
                  background: `linear-gradient(135deg, ${system.color}, ${system.color}cc)`,
                  color: textColor,
                }}
              >
                Atgriezties uz kursa karti →
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
