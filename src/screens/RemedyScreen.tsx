import { useEffect, useState } from 'react';
import { Heart, Sparkles, Wind, MessageCircle, Check, ArrowLeft } from 'lucide-react';
import { type ScoreBand } from '@/lib/data';

interface Props {
  band: ScoreBand;
  onDone: () => void;
  onCounsellorRequest: () => void;
}

const BAND_COPY: Record<ScoreBand, { title: string; body: string }> = {
  stable: {
    title: "You're doing okay today",
    body: "That's worth noticing. Small steady days add up to real steadiness over time.",
  },
  mild: {
    title: 'A little weight today',
    body: "It's okay to feel off. A short exercise can help ease the load.",
  },
  elevated: {
    title: "Today feels heavy",
    body: "You showed up anyway, and that counts. Let's take this gently, one breath at a time.",
  },
  critical: {
    title: "Today is really hard",
    body: "Please be gentle with yourself. You don't have to carry this alone.",
  },
};

function BreathingTimer() {
  const phases = ['Breathe in', 'Hold', 'Breathe out', 'Hold'] as const;
  const [phase, setPhase] = useState(0);
  const [cycle, setCycle] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setPhase((p) => {
        if (p === 3) {
          setCycle((c) => c + 1);
          return 0;
        }
        return p + 1;
      });
    }, 4000);
    return () => clearInterval(t);
  }, []);

  const scale = phase === 0 || phase === 1 ? 'scale-110' : 'scale-90';

  return (
    <div className="flex flex-col items-center py-6">
      <div className="relative w-40 h-40 flex items-center justify-center">
        <div
          className={`absolute w-32 h-32 rounded-full bg-mist-200 transition-transform duration-[4000ms] ease-in-out ${scale}`}
        />
        <div className="relative w-24 h-24 rounded-full bg-mist-300 flex items-center justify-center">
          <Wind className="w-10 h-10 text-mist-700" />
        </div>
      </div>
      <p className="mt-5 text-lg font-semibold text-mist-700">{phases[phase]}</p>
      <p className="text-sm text-mist-500 mt-1">4-4-4-4 · {cycle} cycles</p>
    </div>
  );
}

export default function RemedyScreen({ band, onDone, onCounsellorRequest }: Props) {
  const copy = BAND_COPY[band];
  const [requested, setRequested] = useState(false);

  return (
    <div className="px-5 pt-8 pb-28 max-w-md mx-auto w-full animate-fadeUp">
      <button
        onClick={onDone}
        className="flex items-center gap-1.5 text-sage-600 text-sm font-medium mb-5 active:scale-95 transition-transform"
      >
        <ArrowLeft className="w-4 h-4" /> Back to check-in
      </button>

      <div className="flex items-center gap-3 mb-2">
        <div className="w-11 h-11 rounded-2xl bg-sage-100 flex items-center justify-center">
          <Heart className="w-6 h-6 text-sage-600" />
        </div>
        <h1 className="text-2xl font-bold text-sage-800">{copy.title}</h1>
      </div>
      <p className="text-sage-600 leading-relaxed">{copy.body}</p>

      {band === 'stable' && (
        <div className="mt-6 p-5 rounded-3xl bg-white shadow-card border border-sage-100 animate-fadeUp">
          <div className="flex items-center gap-2 text-sage-700 font-semibold">
            <Sparkles className="w-5 h-5" /> Try this
          </div>
          <p className="text-sage-600 mt-2 leading-relaxed">
            Name three things you're grateful for today — small counts. A warm drink, a text from a friend, the sun for five minutes.
          </p>
        </div>
      )}

      {(band === 'mild' || band === 'elevated' || band === 'critical') && (
        <div className="mt-6 p-5 rounded-3xl bg-white shadow-card border border-sage-100 animate-fadeUp">
          <div className="flex items-center gap-2 text-mist-700 font-semibold">
            <Wind className="w-5 h-5" /> Box breathing
          </div>
          <p className="text-sage-600 mt-2 leading-relaxed text-sm">
            Follow the circle. Inhale four, hold four, exhale four, hold four. A few rounds can quiet the noise.
          </p>
          <BreathingTimer />
        </div>
      )}

      {(band === 'elevated' || band === 'critical') && !requested && (
        <div className="mt-4 p-5 rounded-3xl bg-mist-50 shadow-card border border-mist-100 animate-fadeUp">
          <div className="flex items-center gap-2 text-mist-700 font-semibold">
            <MessageCircle className="w-5 h-5" /> Talk to a counsellor anonymously
          </div>
          <p className="text-sage-600 mt-2 leading-relaxed text-sm">
            You don't have to share your name. A trained counsellor will listen — no pressure, no judgment.
          </p>
          <button
            onClick={() => setRequested(true)}
            className="mt-4 w-full py-3.5 rounded-2xl bg-mist-500 text-white font-semibold active:scale-[0.99] transition-transform"
          >
            Request an anonymous session
          </button>
        </div>
      )}

      {requested && (
        <div className="mt-4 p-6 rounded-3xl bg-sage-50 border border-sage-200 flex flex-col items-center text-center animate-popIn">
          <div className="w-12 h-12 rounded-full bg-sage-500 flex items-center justify-center mb-3">
            <Check className="w-7 h-7 text-white" />
          </div>
          <p className="font-semibold text-sage-800">Session requested</p>
          <p className="text-sage-600 text-sm mt-1 leading-relaxed">
            You'll be matched anonymously with a counsellor within 24 hours. We'll notify you gently — no rush.
          </p>
        </div>
      )}
    </div>
  );
}
