import { useState } from 'react';
import { Heart, ShieldCheck, Sparkles, ChevronRight } from 'lucide-react';
import type { ConsentState } from '@/lib/data';

interface Props {
  onComplete: (consent: ConsentState) => void;
}

interface ToggleRowProps {
  icon: React.ReactNode;
  title: string;
  desc: string;
  value: boolean;
  onChange: (v: boolean) => void;
}

function ToggleRow({ icon, title, desc, value, onChange }: ToggleRowProps) {
  return (
    <button
      type="button"
      onClick={() => onChange(!value)}
      className="w-full flex items-start gap-4 p-4 rounded-2xl bg-white/70 border border-sage-100 text-left transition-all hover:bg-white active:scale-[0.99]"
    >
      <div className="mt-0.5 shrink-0 w-10 h-10 rounded-xl bg-mist-100 flex items-center justify-center text-mist-600">
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-sage-800">{title}</p>
        <p className="text-sm text-sage-600 mt-0.5 leading-relaxed">{desc}</p>
      </div>
      <div
        className={`mt-1 shrink-0 w-12 h-7 rounded-full p-1 transition-colors duration-200 ${
          value ? 'bg-sage-500' : 'bg-sage-200'
        }`}
      >
        <div
          className={`w-5 h-5 rounded-full bg-white shadow-sm transition-transform duration-200 ${
            value ? 'translate-x-5' : 'translate-x-0'
          }`}
        />
      </div>
    </button>
  );
}

export default function ConsentScreen({ onComplete }: Props) {
  const [checkIns, setCheckIns] = useState(true);
  const [journaling, setJournaling] = useState(true);
  const [passive, setPassive] = useState(false);

  const canContinue = checkIns;

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-mist-50 via-sage-50 to-sand-50 animate-fadeIn">
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-10 max-w-md mx-auto w-full">
        <div className="w-20 h-20 rounded-3xl bg-sage-500 flex items-center justify-center shadow-soft mb-6 animate-popIn">
          <Heart className="w-10 h-10 text-white" strokeWidth={2.2} />
        </div>
        <h1 className="text-3xl font-bold text-sage-800 text-center">Welcome to MindLoop</h1>
        <p className="text-center text-sage-600 mt-3 leading-relaxed">
          A quiet companion that helps you notice how you're doing — anonymously, gently, on your terms.
        </p>

        <div className="w-full mt-8 space-y-3">
          <ToggleRow
            icon={<Sparkles className="w-5 h-5" />}
            title="Daily check-ins"
            desc="A 10-second mood tap each day to spot patterns over time."
            value={checkIns}
            onChange={setCheckIns}
          />
          <ToggleRow
            icon={<Heart className="w-5 h-5" />}
            title="Weekly journaling"
            desc="Four short prompts once a week, kept private to you."
            value={journaling}
            onChange={setJournaling}
          />
          <ToggleRow
            icon={<ShieldCheck className="w-5 h-5" />}
            title="Passive pattern detection"
            desc="Optional. Stays on your device — never uploaded anywhere."
            value={passive}
            onChange={setPassive}
          />
        </div>

        <p className="text-xs text-sage-500 mt-6 text-center leading-relaxed">
          Nothing you share leaves your phone. You can change these anytime in settings.
        </p>
      </div>

      <div className="sticky bottom-0 px-6 pb-8 pt-4 bg-gradient-to-t from-sand-50 to-transparent max-w-md mx-auto w-full">
        <button
          type="button"
          disabled={!canContinue}
          onClick={() =>
            onComplete({
              dailyCheckIns: checkIns,
              weeklyJournaling: journaling,
              passivePattern: passive,
              consented: true,
            })
          }
          className={`w-full flex items-center justify-center gap-2 py-4 rounded-2xl font-semibold text-base transition-all ${
            canContinue
              ? 'bg-sage-500 text-white shadow-soft active:scale-[0.99]'
              : 'bg-sage-200 text-sage-400 cursor-not-allowed'
          }`}
        >
          Continue
          <ChevronRight className="w-5 h-5" />
        </button>
        {!canContinue && (
          <p className="text-center text-sm text-sage-500 mt-2">
            Daily check-ins need to be on to continue.
          </p>
        )}
      </div>
    </div>
  );
}
