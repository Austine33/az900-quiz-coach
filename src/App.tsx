import { useState } from 'react';
import { CheckCircle2, XCircle, RotateCcw, Brain, Trophy, ChevronRight, TrendingUp, TrendingDown } from 'lucide-react';
import { questions, type Question } from '@/questions';

type Phase = 'intro' | 'question' | 'feedback' | 'result';

function App() {
  const [phase, setPhase] = useState<Phase>('intro');
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [results, setResults] = useState<boolean[]>([]);

  const start = () => {
    setPhase('question');
    setCurrent(0);
    setSelected(null);
    setScore(0);
    setResults([]);
  };

  const choose = (index: number) => {
    if (selected !== null) return;
    const correct = index === questions[current].correctIndex;
    setSelected(index);
    if (correct) {
      setScore((s) => s + 1);
    }
    setResults((r) => {
      const next = [...r];
      next[current] = correct;
      return next;
    });
    setPhase('feedback');
  };

  const next = () => {
    if (current + 1 >= questions.length) {
      setPhase('result');
    } else {
      setCurrent((c) => c + 1);
      setSelected(null);
      setPhase('question');
    }
  };

  const progress = ((current + (phase === 'result' ? 1 : 0)) / questions.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-indigo-50 to-emerald-50 text-slate-800">
      <div className="mx-auto flex min-h-screen max-w-xl flex-col px-5 py-6">
        {/* Header */}
        <header className="mb-5 flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-500 to-indigo-600 text-white shadow-lg shadow-sky-500/30">
            <Brain className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-lg font-bold leading-tight text-slate-900">
              AZ-900 Quiz Coach
            </h1>
            <p className="text-xs font-medium text-slate-500">Unofficial study tool</p>
          </div>
        </header>

        {/* Progress bar (during quiz) */}
        {phase !== 'intro' && phase !== 'result' && (
          <div className="mb-6">
            <div className="mb-1.5 flex items-center justify-between text-xs font-semibold text-slate-500">
              <span>
                Question {current + 1} of {questions.length}
              </span>
              <span>Score: {score}</span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-slate-200">
              <div
                className="h-full rounded-full bg-gradient-to-r from-sky-500 to-indigo-500 transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}

        {/* Main content */}
        <main className="flex flex-1 flex-col">
          {phase === 'intro' && <Intro onStart={start} />}

          {(phase === 'question' || phase === 'feedback') && (
            <QuestionCard
              q={questions[current]}
              selected={selected}
              onChoose={choose}
              showFeedback={phase === 'feedback'}
            />
          )}

          {phase === 'feedback' && (
            <button
              onClick={next}
              className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-sky-600 to-indigo-600 px-6 py-4 text-base font-bold text-white shadow-lg shadow-indigo-500/30 transition active:scale-[0.98]"
            >
              {current + 1 >= questions.length ? 'See my score' : 'Next question'}
              <ChevronRight className="h-5 w-5" />
            </button>
          )}

          {phase === 'result' && (
            <Result
              score={score}
              total={questions.length}
              results={results}
              onRestart={start}
            />
          )}
        </main>

        {/* Footer disclaimer */}
        <footer className="mt-6 border-t border-slate-200 pt-4 text-center">
          <p className="text-xs font-medium leading-relaxed text-slate-400">
            Unofficial study tool, not affiliated with Microsoft.
          </p>
        </footer>
      </div>
    </div>
  );
}

function Intro({ onStart }: { onStart: () => void }) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center text-center">
      <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-3xl bg-gradient-to-br from-sky-500 to-indigo-600 text-white shadow-xl shadow-indigo-500/30">
        <Brain className="h-12 w-12" />
      </div>
      <h2 className="mb-3 text-2xl font-extrabold text-slate-900">
        Ready to test your Azure knowledge?
      </h2>
      <p className="mb-8 max-w-sm text-sm leading-relaxed text-slate-600">
        {questions.length} questions on cloud concepts and Azure fundamentals.
        Pick an answer, get instant feedback, and see your score at the end.
      </p>
      <button
        onClick={onStart}
        className="flex items-center gap-2 rounded-2xl bg-gradient-to-r from-sky-600 to-indigo-600 px-8 py-4 text-base font-bold text-white shadow-lg shadow-indigo-500/30 transition active:scale-[0.98]"
      >
        Start quiz
        <ChevronRight className="h-5 w-5" />
      </button>
    </div>
  );
}

interface QuestionCardProps {
  q: Question;
  selected: number | null;
  onChoose: (index: number) => void;
  showFeedback: boolean;
}

function QuestionCard({ q, selected, onChoose, showFeedback }: QuestionCardProps) {
  const letters = ['A', 'B', 'C', 'D'];

  return (
    <div className="flex flex-1 flex-col">
      <div className="mb-5 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-100">
        <div className="mb-2 flex items-center gap-2">
          <span className="inline-block rounded-full bg-sky-100 px-3 py-1 text-xs font-bold text-sky-700">
            Question {q.id}
          </span>
          <span className="inline-block rounded-full bg-indigo-100 px-3 py-1 text-xs font-bold text-indigo-700">
            {q.topic}
          </span>
        </div>
        <h2 className="text-lg font-bold leading-snug text-slate-900">{q.prompt}</h2>
      </div>

      <div className="flex flex-col gap-3">
        {q.options.map((option, index) => {
          const isCorrect = index === q.correctIndex;
          const isSelected = index === selected;

          let cls =
            'border-slate-200 bg-white text-slate-700 hover:border-sky-400 hover:bg-sky-50';
          if (showFeedback) {
            if (isCorrect) {
              cls = 'border-emerald-500 bg-emerald-50 text-emerald-900';
            } else if (isSelected) {
              cls = 'border-rose-500 bg-rose-50 text-rose-900';
            } else {
              cls = 'border-slate-200 bg-white text-slate-400';
            }
          }

          return (
            <button
              key={index}
              onClick={() => onChoose(index)}
              disabled={showFeedback}
              className={`flex items-center gap-3 rounded-2xl border-2 px-4 py-4 text-left text-sm font-semibold transition ${cls} ${
                !showFeedback ? 'active:scale-[0.99]' : ''
              }`}
            >
              <span
                className={`flex h-8 w-8 flex-none items-center justify-center rounded-full text-sm font-bold ${
                  showFeedback && isCorrect
                    ? 'bg-emerald-500 text-white'
                    : showFeedback && isSelected
                    ? 'bg-rose-500 text-white'
                    : 'bg-slate-100 text-slate-600'
                }`}
              >
                {showFeedback && isCorrect ? (
                  <CheckCircle2 className="h-5 w-5" />
                ) : showFeedback && isSelected ? (
                  <XCircle className="h-5 w-5" />
                ) : (
                  letters[index]
                )}
              </span>
              <span className="leading-snug">{option}</span>
            </button>
          );
        })}
      </div>

      {showFeedback && (
        <div
          className={`mt-5 rounded-2xl p-4 ${
            selected === q.correctIndex
              ? 'bg-emerald-50 ring-1 ring-emerald-200'
              : 'bg-amber-50 ring-1 ring-amber-200'
          }`}
        >
          <p
            className={`mb-1.5 text-sm font-bold ${
              selected === q.correctIndex ? 'text-emerald-700' : 'text-amber-700'
            }`}
          >
            {selected === q.correctIndex ? 'Correct!' : 'Not quite right'}
          </p>
          <p className="text-sm leading-relaxed text-slate-700">{q.explanation}</p>
        </div>
      )}
    </div>
  );
}

interface TopicScore {
  topic: string;
  correct: number;
  total: number;
}

function Result({
  score,
  total,
  results,
  onRestart,
}: {
  score: number;
  total: number;
  results: boolean[];
  onRestart: () => void;
}) {
  const pct = Math.round((score / total) * 100);
  const pass = pct >= 70;

  let message: string;
  let emoji: string;
  if (pct === 100) {
    message = 'Perfect score! You really know your Azure basics.';
    emoji = '🌟';
  } else if (pass) {
    message = 'Great work! You are on track for the AZ-900 exam.';
    emoji = '🎉';
  } else {
    message = 'Keep practising! Review the explanations and try again.';
    emoji = '📚';
  }

  const topicScores: TopicScore[] = Object.entries(
    questions.reduce<Record<string, TopicScore>>((acc, q, i) => {
      const t = (acc[q.topic] ??= { topic: q.topic, correct: 0, total: 0 });
      t.total += 1;
      if (results[i]) t.correct += 1;
      return acc;
    }, {})
  )
    .map(([, v]) => v)
    .sort((a, b) => b.total - a.total);

  return (
    <div className="flex flex-1 flex-col items-center text-center">
      <div
        className={`mb-5 flex h-20 w-20 items-center justify-center rounded-3xl text-white shadow-xl ${
          pass
            ? 'bg-gradient-to-br from-emerald-500 to-teal-600 shadow-emerald-500/30'
            : 'bg-gradient-to-br from-amber-500 to-orange-600 shadow-amber-500/30'
        }`}
      >
        <Trophy className="h-10 w-10" />
      </div>
      <p className="mb-1 text-3xl">{emoji}</p>
      <h2 className="mb-1 text-3xl font-extrabold text-slate-900">
        {score} / {total}
      </h2>
      <p className="mb-2 text-lg font-bold text-slate-600">{pct}%</p>
      <p className="mb-6 max-w-xs text-sm leading-relaxed text-slate-600">{message}</p>

      {/* Topic breakdown */}
      <div className="mb-6 w-full rounded-2xl bg-white p-5 text-left shadow-sm ring-1 ring-slate-100">
        <h3 className="mb-4 text-sm font-bold uppercase tracking-wide text-slate-500">
          Score by topic
        </h3>
        <div className="flex flex-col gap-4">
          {topicScores.map((t) => {
            const tpct = Math.round((t.correct / t.total) * 100);
            const strong = tpct >= 70;
            return (
              <div key={t.topic}>
                <div className="mb-1.5 flex items-center justify-between gap-2">
                  <span className="flex items-center gap-1.5 text-sm font-semibold text-slate-700">
                    {strong ? (
                      <TrendingUp className="h-4 w-4 text-emerald-500" />
                    ) : (
                      <TrendingDown className="h-4 w-4 text-amber-500" />
                    )}
                    {t.topic}
                  </span>
                  <span
                    className={`text-xs font-bold ${
                      strong ? 'text-emerald-600' : 'text-amber-600'
                    }`}
                  >
                    {t.correct}/{t.total}
                  </span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      strong
                        ? 'bg-gradient-to-r from-emerald-400 to-teal-500'
                        : 'bg-gradient-to-r from-amber-400 to-orange-500'
                    }`}
                    style={{ width: `${tpct}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <button
        onClick={onRestart}
        className="flex items-center gap-2 rounded-2xl bg-gradient-to-r from-sky-600 to-indigo-600 px-8 py-4 text-base font-bold text-white shadow-lg shadow-indigo-500/30 transition active:scale-[0.98]"
      >
        <RotateCcw className="h-5 w-5" />
        Try again
      </button>
    </div>
  );
}

export default App;
