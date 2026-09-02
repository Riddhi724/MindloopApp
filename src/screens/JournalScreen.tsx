import { useState } from 'react';
import { PenLine, Clock, Check } from 'lucide-react';
import { JOURNAL_QUESTIONS, daysUntilNextJournal, type JournalEntry } from '@/lib/data';

interface Props {
  lastEntry: JournalEntry | null;
  onSubmit: (answers: Record<string, string>) => void;
}

export default function JournalScreen({ lastEntry, onSubmit }: Props) {
  const daysLeft = daysUntilNextJournal(lastEntry?.date ?? null);
  const canJournal = daysLeft === 0;

  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    onSubmit(answers);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="px-5 pt-8 pb-28 max-w-md mx-auto w-full animate-fadeUp">
        <div className="flex flex-col items-center text-center py-12">
          <div className="w-14 h-14 rounded-full bg-sage-500 flex items-center justify-center mb-4 animate-popIn">
            <Check className="w-7 h-7 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-sage-800">Saved quietly</h1>
          <p className="text-sage-600 mt-2 leading-relaxed">
            Your week is captured. Come back in 7 days for the next reflection.
          </p>
        </div>
      </div>
    );
  }

  if (!canJournal) {
    return (
      <div className="px-5 pt-8 pb-28 max-w-md mx-auto w-full animate-fadeUp">
        <h1 className="text-2xl font-bold text-sage-800">Weekly journal</h1>
        <div className="mt-6 p-6 rounded-3xl bg-white shadow-card border border-sage-100 text-center">
          <div className="w-14 h-14 rounded-2xl bg-mist-100 flex items-center justify-center mx-auto mb-4">
            <Clock className="w-7 h-7 text-mist-600" />
          </div>
          <p className="text-sage-700 font-semibold text-lg">Come back in {daysLeft} {daysLeft === 1 ? 'day' : 'days'}</p>
          <p className="text-sage-500 text-sm mt-1">Reflection works best with a little space between.</p>
        </div>

        {lastEntry && (
          <div className="mt-5 p-5 rounded-3xl bg-sage-50 border border-sage-100">
            <p className="text-sm font-medium text-sage-500 mb-3">
              Your last entry · {new Date(lastEntry.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
            </p>
            <div className="space-y-3">
              {JOURNAL_QUESTIONS.map((q) => (
                <div key={q}>
                  <p className="text-xs text-sage-500 font-medium">{q}</p>
                  <p className="text-sage-700 text-sm mt-0.5 leading-relaxed">
                    {lastEntry.answers[q] || '—'}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="px-5 pt-8 pb-28 max-w-md mx-auto w-full animate-fadeUp">
      <div className="flex items-center gap-3 mb-1">
        <PenLine className="w-6 h-6 text-sage-600" />
        <h1 className="text-2xl font-bold text-sage-800">Weekly journal</h1>
      </div>
      <p className="text-sage-600">Four short prompts. Take your time, or skip — whatever feels right.</p>

      <div className="mt-6 space-y-4">
        {JOURNAL_QUESTIONS.map((q) => (
          <div key={q} className="p-4 rounded-2xl bg-white/70 border border-sage-100">
            <label className="text-sm font-semibold text-sage-700">{q}</label>
            <textarea
              value={answers[q] ?? ''}
              onChange={(e) => setAnswers({ ...answers, [q]: e.target.value })}
              rows={2}
              placeholder="Type here…"
              className="mt-2 w-full p-3 rounded-xl bg-sage-50 border border-sage-100 text-sage-800 placeholder:text-sage-400 resize-none focus:outline-none focus:border-sage-300 transition-colors"
            />
          </div>
        ))}
      </div>

      <button
        onClick={handleSubmit}
        className="mt-5 w-full py-4 rounded-2xl bg-sage-500 text-white font-semibold shadow-soft active:scale-[0.99] transition-transform"
      >
        Submit
      </button>
    </div>
  );
}
