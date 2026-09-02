import { useState } from 'react';
import { MOOD_OPTIONS, type Mood } from '@/lib/data';

interface Props {
  onSubmit: (mood: Mood, note: string) => void;
}

export default function CheckInScreen({ onSubmit }: Props) {
  const [selected, setSelected] = useState<Mood | null>(null);
  const [note, setNote] = useState('');

  const canSubmit = selected !== null;

  return (
    <div className="px-5 pt-8 pb-28 max-w-md mx-auto w-full animate-fadeUp">
      <h1 className="text-2xl font-bold text-sage-800">How are you, right now?</h1>
      <p className="text-sage-600 mt-1.5">Tap the one that fits. There's no wrong answer.</p>

      <div className="mt-7 grid grid-cols-5 gap-2.5">
        {MOOD_OPTIONS.map((m) => {
          const active = selected === m.id;
          return (
            <button
              key={m.id}
              type="button"
              onClick={() => setSelected(m.id)}
              className={`flex flex-col items-center gap-1.5 py-4 rounded-2xl border transition-all active:scale-95 ${
                active
                  ? 'bg-sage-500 border-sage-500 shadow-soft scale-105'
                  : 'bg-white/70 border-sage-100 hover:bg-white'
              }`}
            >
              <span className="text-3xl leading-none">{m.emoji}</span>
              <span className={`text-xs font-semibold ${active ? 'text-white' : 'text-sage-600'}`}>
                {m.label}
              </span>
            </button>
          );
        })}
      </div>

      <div className="mt-7">
        <label className="text-sm font-medium text-sage-700">Want to add anything? (optional)</label>
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value.slice(0, 200))}
          placeholder="A thought, a feeling, whatever's on your mind…"
          rows={3}
          className="mt-2 w-full p-4 rounded-2xl bg-white/70 border border-sage-100 text-sage-800 placeholder:text-sage-400 resize-none focus:outline-none focus:border-sage-300 focus:bg-white transition-colors"
        />
        <div className="flex justify-end mt-1">
          <span className="text-xs text-sage-400">{note.length}/200</span>
        </div>
      </div>

      <button
        type="button"
        disabled={!canSubmit}
        onClick={() => onSubmit(selected!, note)}
        className={`mt-4 w-full py-4 rounded-2xl font-semibold text-base transition-all ${
          canSubmit
            ? 'bg-sage-500 text-white shadow-soft active:scale-[0.99]'
            : 'bg-sage-200 text-sage-400 cursor-not-allowed'
        }`}
      >
        Submit check-in
      </button>
    </div>
  );
}
