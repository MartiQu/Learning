import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useParams } from 'react-router-dom';
import { useGameStore } from '../store/gameStore';
import { qualitySystems } from '../data/systems';
import { MultipleChoice } from '../components/questions/MultipleChoice';
import { TrueFalse } from '../components/questions/TrueFalse';
import { DragSort } from '../components/questions/DragSort';
import { FillBlank } from '../components/questions/FillBlank';
import { CaseStudy } from '../components/questions/CaseStudy';
import { Matching } from '../components/questions/Matching';
import { ProgressBar } from '../components/ui/ProgressBar';
import type { Question } from '../types';

type FeedbackState = 'idle' | 'correct' | 'incorrect';

function QuestionRenderer({
  question,
  onAnswer,
  revealed,
  disabled,
}: {
  question: Question;
  onAnswer: (ans: string | string[] | Record<string, string>) => void;
  revealed: string | string[] | Record<string, string> | null;
  disabled: boolean;
}) {
  switch (question.type) {
    case 'MultipleChoice':
      return (
        <MultipleChoice
          data={question.data as Parameters<typeof MultipleChoice>[0]['data']}
          onAnswer={onAnswer as (a: string) => void}
          revealed={revealed as string | null}
          disabled={disabled}
        />
      );
    case 'TrueFalse':
      return (
        <TrueFalse
          data={question.data as Parameters<typeof TrueFalse>[0]['data']}
          onAnswer={onAnswer as (a: string) => void}
          revealed={revealed as string | null}
          disabled={disabled}
        />
      );
    case 'DragSort':
      return (
        <DragSort
          data={question.data as Parameters<typeof DragSort>[0]['data']}
          onAnswer={onAnswer as (a: string[]) => void}
          revealed={revealed as string[] | null}
          disabled={disabled}
        />
      );
    case 'FillBlank':
      return (
        <FillBlank
          data={question.data as Parameters<typeof FillBlank>[0]['data']}
          onAnswer={onAnswer as (a: string) => void}
          revealed={revealed as string | null}
          disabled={disabled}
        />
      );
    case 'CaseStudy':
      return (
        <CaseStudy
          data={question.data as Parameters<typeof CaseStudy>[0]['data']}
          onAnswer={onAnswer as (a: string) => void}
          revealed={revealed as string | null}
          disabled={disabled}
        />
      );
    case 'Matching':
      return (
        <Matching
          data={question.data as Parameters<typeof Matching>[0]['data']}
          onAnswer={onAnswer as (a: Record<string, string>) => void}
          revealed={revealed as Record<string, string> | null}
          disabled={disabled}
        />
      );
    default:
      return null;
  }
}

const TYPE_LABELS: Record<string, string> = {
  MultipleChoice: 'Izvēles jautājums',
  TrueFalse: 'Patiess / Nepatiess',
  DragSort: 'Secības kārtošana',
  FillBlank: 'Aizpildi trūkstošo',
  CaseStudy: 'Gadījuma izpēte',
  Matching: 'Savienošana',
};

export function GameScreen() {
  const { systemId, levelNumber } = useParams<{ systemId: string; levelNumber: string }>();
  const navigate = useNavigate();
  const { session, submitAnswer, nextQuestion, finishSession } = useGameStore();

  const [feedbackState, setFeedbackState] = useState<FeedbackState>('idle');
  const [revealed, setRevealed] = useState<string | string[] | Record<string, string> | null>(null);
  const [answered, setAnswered] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [hintVisible, setHintVisible] = useState(false);

  const system = qualitySystems.find((s) => s.id === systemId);

  useEffect(() => {
    if (!session) navigate(`/system/${systemId}/level/${levelNumber}`);
  }, [session, navigate, systemId, levelNumber]);

  if (!session || !system) return null;

  const question = session.questions[session.currentIndex];
  const isLast = session.currentIndex >= session.questions.length - 1;
  const progress = (session.currentIndex / session.questions.length) * 100;

  if (!question) {
    finishSession();
    navigate(`/system/${systemId}/level/${levelNumber}/result`);
    return null;
  }

  const handleAnswer = (ans: string | string[] | Record<string, string>) => {
    if (answered) return;
    const correct = submitAnswer(ans);
    setFeedbackState(correct ? 'correct' : 'incorrect');
    setRevealed(question.correctAnswer);
    setAnswered(true);
    setShowExplanation(false);
  };

  const handleNext = () => {
    // 0 lives or last question → finish
    if (session.lives === 0 || isLast) {
      finishSession();
      navigate(`/system/${systemId}/level/${levelNumber}/result`);
      return;
    }
    nextQuestion();
    setFeedbackState('idle');
    setRevealed(null);
    setAnswered(false);
    setShowExplanation(false);
    setHintVisible(false);
  };

  const hearts = Array.from({ length: 3 }, (_, i) => i < session.lives);

  return (
    <div className="min-h-screen px-4 py-6 max-w-2xl mx-auto pb-48">
      {/* Top bar */}
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={() => navigate(`/system/${systemId}`)}
          className="text-white/40 hover:text-white/70 text-sm transition-colors shrink-0"
        >
          ✕
        </button>
        <ProgressBar value={progress} color={system.color} className="flex-1" height={6} />
        {/* Hearts */}
        <div className="flex gap-1 shrink-0">
          {hearts.map((alive, i) => (
            <motion.span
              key={i}
              initial={false}
              animate={{ scale: alive ? 1 : 0.8, opacity: alive ? 1 : 0.3 }}
              className="text-lg"
            >
              {alive ? '❤️' : '🖤'}
            </motion.span>
          ))}
        </div>
      </div>

      {/* Progress counter + streak */}
      <div className="flex items-center gap-3 mb-6">
        {session.streak >= 2 && (
          <motion.div
            key={session.streak}
            initial={{ scale: 1.4 }}
            animate={{ scale: 1 }}
            className="flex items-center gap-1 px-3 py-1 rounded-full text-sm font-semibold bg-orange-500/20 text-orange-400 border border-orange-500/30"
          >
            🔥 {session.streak} sērija
          </motion.div>
        )}
        <div className="text-white/40 text-sm ml-auto">
          {session.currentIndex + 1}/{session.questions.length}
        </div>
      </div>

      {/* Question card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={question.id}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -30 }}
          transition={{ duration: 0.25 }}
        >
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-white/30">
              {TYPE_LABELS[question.type] ?? question.type}
            </span>
          </div>

          <h2 className="font-heading text-2xl font-bold text-white mb-4 leading-snug">
            {question.prompt}
          </h2>

          {question.hint && (
            <div className="mb-6">
              <button
                onClick={() => setHintVisible(true)}
                disabled={hintVisible}
                className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full transition-all cursor-pointer"
                style={{
                  background: hintVisible ? 'rgba(255,255,255,0.04)' : 'rgba(255,200,50,0.10)',
                  color: hintVisible ? 'rgba(255,255,255,0.25)' : 'rgba(255,200,50,0.75)',
                  border: `1px solid ${hintVisible ? 'rgba(255,255,255,0.06)' : 'rgba(255,200,50,0.20)'}`,
                }}
              >
                💡 {hintVisible ? 'Padoms izmantots' : 'Rādīt padomu'}
              </button>
              <AnimatePresence>
                {hintVisible && (
                  <motion.div
                    initial={{ opacity: 0, height: 0, marginTop: 0 }}
                    animate={{ opacity: 1, height: 'auto', marginTop: 8 }}
                    exit={{ opacity: 0, height: 0, marginTop: 0 }}
                    className="text-sm rounded-xl px-4 py-3"
                    style={{ background: 'rgba(255,200,50,0.07)', color: 'rgba(255,255,255,0.55)', border: '1px solid rgba(255,200,50,0.12)' }}
                  >
                    {question.hint}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}

          <QuestionRenderer
            question={question}
            onAnswer={handleAnswer}
            revealed={revealed}
            disabled={answered}
          />
        </motion.div>
      </AnimatePresence>

      {/* Feedback panel — fixed slide-up */}
      <AnimatePresence>
        {feedbackState !== 'idle' && (
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', stiffness: 420, damping: 38 }}
            className={`fixed bottom-0 left-0 right-0 px-4 pb-8 pt-5 rounded-t-3xl border-t ${
              feedbackState === 'correct'
                ? 'bg-[#0a0a0f] border-teal/30'
                : 'bg-[#0a0a0f] border-red-500/30'
            }`}
            style={{
              background:
                feedbackState === 'correct'
                  ? 'linear-gradient(to top, #0a0a0f, #0d1c1c)'
                  : 'linear-gradient(to top, #0a0a0f, #1a0d0d)',
            }}
          >
            <div className="max-w-2xl mx-auto">
              {/* Header row */}
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl">
                  {feedbackState === 'correct' ? '🎉' : '💡'}
                </span>
                <div className="flex-1">
                  <p
                    className={`font-heading font-bold text-lg ${
                      feedbackState === 'correct' ? 'text-teal' : 'text-red-400'
                    }`}
                  >
                    {feedbackState === 'correct'
                      ? `Pareizi! +${session.lastXpGained} XP`
                      : 'Nav pareizi'}
                  </p>
                </div>
                {question.explanation && (
                  <button
                    onClick={() => setShowExplanation((v) => !v)}
                    className="text-xs px-3 py-1.5 rounded-full border border-white/20 text-white/60 hover:text-white/90 transition-colors shrink-0"
                  >
                    {showExplanation ? 'Aizvērt' : 'Kāpēc?'}
                  </button>
                )}
              </div>

              {/* Explanation */}
              <AnimatePresence>
                {showExplanation && question.explanation && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="text-white/60 text-sm mb-3 leading-relaxed overflow-hidden"
                  >
                    {question.explanation}
                  </motion.p>
                )}
              </AnimatePresence>

              {/* Continue button */}
              <button
                onClick={handleNext}
                className="w-full py-4 rounded-2xl font-semibold text-black text-lg transition-all hover:opacity-90 cursor-pointer"
                style={{
                  background:
                    feedbackState === 'correct'
                      ? `linear-gradient(135deg, #4ecdc4, #4ecdc4cc)`
                      : `linear-gradient(135deg, #ff6b6b, #ff6b6bcc)`,
                }}
              >
                {session.lives === 0
                  ? 'Skatīt rezultātus →'
                  : isLast
                  ? 'Skatīt rezultātus →'
                  : 'Turpināt →'}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
