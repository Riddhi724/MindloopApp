import { useEffect, useRef, useState } from 'react';
import { Zap, RotateCcw, Trophy } from 'lucide-react';

interface Props {
  onComplete: (avgMs: number, varianceMs: number, focusScore: number) => void;
}

type Phase = 'idle' | 'waiting' | 'active' | 'done';

interface RoundResult {
  reactionMs: number;
}

const TOTAL_ROUNDS = 10;

export default function GameScreen({ onComplete }: Props) {
  const [phase, setPhase] = useState<Phase>('idle');
  const [round, setRound] = useState(0);
  const [results, setResults] = useState<RoundResult[]>([]);
  const [target, setTarget] = useState({ x: 50, y: 50 });
  const [tooEarly, setTooEarly] = useState(false);

  const appearTime = useRef(0);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const startGame = () => {
    setResults([]);
    setRound(0);
    setPhase('idle');
    beginRound(0);
  };

  const beginRound = (r: number) => {
    if (r >= TOTAL_ROUNDS) {
      finish();
      return;
    }
    setRound(r);
    setPhase('waiting');
    setTooEarly(false);
    const delay = 800 + Math.random() * 1800;
    timeoutRef.current = setTimeout(() => {
      setTarget({
        x: 15 + Math.random() * 70,
        y: 18 + Math.random() * 60,
      });
      appearTime.current = performance.now();
      setPhase('active');
    }, delay);
  };

  const handleScreenTap = () => {
    if (phase === 'waiting') {
      setTooEarly(true);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      setPhase('idle');
    }
  };

  const handleTargetTap = () => {
    const rt = performance.now() - appearTime.current;
    const next = [...results, { reactionMs: rt }];
    setResults(next);
    setPhase('idle');
    setTimeout(() => beginRound(round + 1), 400);
  };

  const finish = () => {
    const all = results.map((r) => r.reactionMs);
    const avg = all.reduce((a, b) => a + b, 0) / all.length;
    const variance =
      all.reduce((a, b) => a + (b - avg) ** 2, 0) / all.length;
    // focus score: lower ms = higher score. 300ms -> ~100, 800ms -> ~30
    const focus = Math.round(Math.max(0, Math.min(100, 110 - (avg - 250) / 6)));
    setPhase('done');
    onComplete(avg, variance, focus);
  };

  if (phase === 'done') {
    const avg = results.reduce((a, b) => a + b.reactionMs, 0) / results.length;
    const focus = Math.round(Math.max(0, Math.min(100, 110 - (avg - 250) / 6)));
    return (
      <div className="px-5 pt-8 pb-28 max-w-md mx-auto w-full animate-fadeUp">
        <div className="flex flex-col items-center text-center py-8">
          <div className="w-16 h-16 rounded-2xl bg-sage-100 flex items-center justify-center mb-4">
            <Trophy className="w-8 h-8 text-sage-600" />
          </div>
          <h1 className="text-2xl font-bold text-sage-800">Nice focus!</h1>
          <p className="text-sage-600 mt-2">Here's how your 10 rounds looked:</p>

          <div className="w-full mt-6 p-5 rounded-3xl bg-white shadow-card border border-sage-100">
            <p className="text-sm text-sage-500 font-medium">Focus score</p>
            <p className="text-5xl font-bold text-sage-700 mt-1">{focus}</p>
            <div className="mt-4 grid grid-cols-2 gap-3 text-center">
              <div className="p-3 rounded-xl bg-sage-50">
                <p className="text-xs text-sage-500">Avg reaction</p>
                <p className="text-lg font-semibold text-sage-700">{Math.round(avg)}ms</p>
              </div>
              <div className="p-3 rounded-xl bg-sage-50">
                <p className="text-xs text-sage-500">Consistency</p>
                <p className="text-lg font-semibold text-sage-700">
                  {Math.round(Math.sqrt(results.reduce((a, b) => a + (b.reactionMs - avg) ** 2, 0) / results.length))}ms
                </p>
              </div>
            </div>
          </div>

          <button
            onClick={startGame}
            className="mt-6 w-full flex items-center justify-center gap-2 py-4 rounded-2xl bg-sage-500 text-white font-semibold shadow-soft active:scale-[0.99] transition-transform"
          >
            <RotateCcw className="w-5 h-5" /> Play again
          </button>
        </div>
      </div>
    );
  }

  const showTarget = phase === 'active';

  return (
    <div className="px-5 pt-8 pb-28 max-w-md mx-auto w-full animate-fadeUp">
      <h1 className="text-2xl font-bold text-sage-800">Focus Tap</h1>
      <p className="text-sage-600 mt-1.5">
        Tap the circle as fast as you can when it appears. {TOTAL_ROUNDS} rounds.
      </p>

      <div className="mt-4 flex items-center justify-between text-sm">
        <span className="text-sage-500">Round {Math.min(round + 1, TOTAL_ROUNDS)} / {TOTAL_ROUNDS}</span>
        <span className="text-sage-500">{results.length} done</span>
      </div>
      <div className="mt-2 h-2 rounded-full bg-sage-100 overflow-hidden">
        <div
          className="h-full bg-sage-400 transition-all duration-300"
          style={{ width: `${(results.length / TOTAL_ROUNDS) * 100}%` }}
        />
      </div>

      <div
        onClick={handleScreenTap}
        className="mt-5 relative w-full h-[420px] rounded-3xl bg-gradient-to-b from-mist-50 to-sage-50 border border-sage-100 overflow-hidden select-none"
      >
        {phase === 'idle' && (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
            {tooEarly && (
              <p className="text-sand-500 font-medium mb-3 animate-fadeIn">Too early! Wait for the circle.</p>
            )}
            <button
              onClick={(e) => {
                e.stopPropagation();
                startGame();
              }}
              className="flex items-center gap-2 px-6 py-4 rounded-2xl bg-sage-500 text-white font-semibold shadow-soft active:scale-[0.99] transition-transform"
            >
              <Zap className="w-5 h-5" /> {results.length > 0 ? 'Try again' : 'Start'}
            </button>
          </div>
        )}

        {phase === 'waiting' && (
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="text-sage-500 font-medium animate-pulse">Wait for it…</p>
          </div>
        )}

        {showTarget && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleTargetTap();
            }}
            className="absolute w-20 h-20 rounded-full bg-sage-400 shadow-soft active:scale-90 transition-transform animate-popIn"
            style={{
              left: `${target.x}%`,
              top: `${target.y}%`,
              transform: 'translate(-50%, -50%)',
            }}
          />
        )}
      </div>
    </div>
  );
}
