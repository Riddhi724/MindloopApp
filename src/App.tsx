import { useState } from 'react';
import ConsentScreen from '@/screens/ConsentScreen';
import CheckInScreen from '@/screens/CheckInScreen';
import CrisisScreen from '@/screens/CrisisScreen';
import RemedyScreen from '@/screens/RemedyScreen';
import GameScreen from '@/screens/GameScreen';
import JournalScreen from '@/screens/JournalScreen';
import TrendsScreen from '@/screens/TrendsScreen';
import BottomNav from '@/components/BottomNav';
import {
  type Tab,
  type Mood,
  type ConsentState,
  type JournalEntry,
  MOOD_OPTIONS,
  bandForScore,
  isCrisisText,
} from '@/lib/data';

type Overlay = null | 'crisis' | 'remedy';

interface FocusSession {
  date: string;
  focusScore: number;
  avgMs: number;
  varianceMs: number;
}

export default function App() {
  const [consent, setConsent] = useState<ConsentState | null>(null);
  const [tab, setTab] = useState<Tab>('checkin');
  const [overlay, setOverlay] = useState<Overlay>(null);
  const [remedyBand, setRemedyBand] = useState<ReturnType<typeof bandForScore>>('stable');
  const [currentScore, setCurrentScore] = useState(71);
  const [journalEntry, setJournalEntry] = useState<JournalEntry | null>(null);
  const [focusSessions, setFocusSessions] = useState<FocusSession[]>([]);

  if (!consent) {
    return <ConsentScreen onComplete={setConsent} />;
  }

  if (overlay === 'crisis') {
    return <CrisisScreen onBack={() => setOverlay(null)} />;
  }

  if (overlay === 'remedy') {
    return (
      <RemedyScreen
        band={remedyBand}
        onDone={() => setOverlay(null)}
        onCounsellorRequest={() => {}}
      />
    );
  }

  const handleCheckIn = (mood: Mood, note: string) => {
    const opt = MOOD_OPTIONS.find((m) => m.id === mood)!;
    const newScore = Math.round(opt.score * 0.6 + currentScore * 0.4);
    setCurrentScore(newScore);

    if (note.trim() && isCrisisText(note)) {
      setOverlay('crisis');
      return;
    }

    const band = bandForScore(newScore);
    if (band === 'critical') {
      setOverlay('crisis');
      return;
    }
    setRemedyBand(band);
    setOverlay('remedy');
  };

  const handleGameComplete = (avgMs: number, varianceMs: number, focusScore: number) => {
    setFocusSessions([...focusSessions, { date: new Date().toISOString(), focusScore, avgMs, varianceMs }]);
  };

  const handleJournalSubmit = (answers: Record<string, string>) => {
    setJournalEntry({ date: new Date().toISOString(), answers });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-mist-50 via-sage-50 to-sage-50">
      <main className="no-scrollbar min-h-screen overflow-y-auto">
        {tab === 'checkin' && <CheckInScreen onSubmit={handleCheckIn} />}
        {tab === 'games' && <GameScreen onComplete={handleGameComplete} />}
        {tab === 'journal' && <JournalScreen lastEntry={journalEntry} onSubmit={handleJournalSubmit} />}
        {tab === 'trends' && (
          <TrendsScreen currentScore={currentScore} focusSessions={focusSessions} />
        )}
      </main>
      <BottomNav active={tab} onChange={setTab} />
    </div>
  );
}
