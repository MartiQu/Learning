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

  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [revealed, setRevealed] = useState<string | string[] | Record<string, string> | null>(null);
  const [answered, setAnswered] = useState(false);

  const system = qualitySystems.find((s) => s.id === systemId);

  useEffect(() => {
    if (!session) navigate(`/system/${systemId}/level/${levelNumber}`);
  }, [session, navigate, systemId, levelNumber]);

  if (!session || !system) return null;

  const question = session.questions[session.currentIndex];
  const isLast = session.currentIndex >= session.questions.length - 1;
  const progress = ((session.currentIndex) / session.questions.length) * 100;

  if (!question) {
    finishSession();
    navigate(`/system/${systemId}/level/${levelNumber}/result`);
    return null;
  }

  const handleAnswer = (ans: string | string[] | Record<string, string>) => {
    if (answered) return;
    const correct = submitAnswer(ans);
    setIsCorrect(correct);
    setRevealed(question.correctAnswer);
    setAnswered(true);
  };

  const handleNext = () => {
    if (isLast) {
      finishSession();
      navigate(`/system/${systemId}/level/${levelNumber}/result`);
    } else {
      nextQuestion();
      setIsCorrect(null);
      setRevealed(null);
      setAnswered(false);
    }
  };

  return (
    <div className="min-h-screen px-4 py-6 max-w-2xl mx-auto">
      {/* Top bar */}
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={() => navigate(`/system/${systemId}`)}
          className="text-white/40 hover:text-white/70 text-sm transition-colors"
        >
          ✕
        </button>
        <ProgressBar value={progress} color={system.color} className="flex-1" height={6} />
        <div className="text-white/50 text-sm shrink-0">
          {session.currentIndex + 1}/{session.questions.length}
        </div>
      </div>

      {/* Streak & XP */}
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
          <span className="text-gold font-semibold">{session.xpGained}</span> XP nopelnīti
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
          {/* Type badge */}
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-white/30">
              {TYPE_LABELS[question.type] ?? question.type}
            </span>
          </div>

          {/* Prompt */}
          <h2 className="font-heading text-2xl font-bold text-white mb-6 leading-snug">
            {question.prompt}
          </h2>

          {/* Question component */}
          <QuestionRenderer
            question={question}
            onAnswer={handleAnswer}
            revealed={revealed}
            disabled={answered}
          />
        </motion.div>
      </AnimatePresence>

      {/* Feedback + Next */}
      <AnimatePresence>
        {answered && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6"
          >
            {/* Feedback bar */}
            <div
              className={`flex items-center gap-3 px-4 py-3 rounded-xl mb-4 ${
                isCorrect
                  ? 'bg-teal/15 border border-teal/30 text-teal'
                  : 'bg-red-500/15 border border-red-500/30 text-red-400'
              }`}
            >
              <span className="text-2xl">{isCorrect ? '🎉' : '💡'}</span>
              <span className="font-semibold">
                {isCorrect
                  ? `Pareizi! +${50 + session.streak * 10} XP`
                  : 'Nav pareizi — apskatiet atbildi augstāk'}
              </span>
            </div>

            <button
              onClick={handleNext}
              className="w-full py-4 rounded-2xl font-semibold text-black text-lg transition-all hover:opacity-90 cursor-pointer"
              style={{ background: `linear-gradient(135deg, ${system.color}, ${system.color}cc)` }}
            >
              {isLast ? 'Skatīt rezultātus →' : 'Nākamais jautājums →'}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
