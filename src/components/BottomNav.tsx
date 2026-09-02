import { Heart, Gamepad2, PenLine, TrendingUp } from 'lucide-react';
import type { Tab } from '@/lib/data';

interface Props {
  active: Tab;
  onChange: (tab: Tab) => void;
}

const TABS: { id: Tab; label: string; icon: React.ReactNode }[] = [
  { id: 'checkin', label: 'Check-in', icon: <Heart className="w-5 h-5" /> },
  { id: 'games', label: 'Games', icon: <Gamepad2 className="w-5 h-5" /> },
  { id: 'journal', label: 'Journal', icon: <PenLine className="w-5 h-5" /> },
  { id: 'trends', label: 'Trends', icon: <TrendingUp className="w-5 h-5" /> },
];

export default function BottomNav({ active, onChange }: Props) {
  return (
    <nav className="fixed bottom-0 inset-x-0 z-30 bg-white/90 backdrop-blur-md border-t border-sage-100">
      <div className="max-w-md mx-auto flex items-stretch justify-around px-2 py-1.5 pb-[calc(env(safe-area-inset-bottom)+6px)]">
        {TABS.map((t) => {
          const isActive = active === t.id;
          return (
            <button
              key={t.id}
              onClick={() => onChange(t.id)}
              className={`flex flex-col items-center gap-0.5 py-2 px-4 rounded-xl transition-all active:scale-95 ${
                isActive ? 'text-sage-600' : 'text-sage-300'
              }`}
            >
              <span className={`transition-transform duration-200 ${isActive ? 'scale-110' : ''}`}>
                {t.icon}
              </span>
              <span className="text-[11px] font-semibold">{t.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
