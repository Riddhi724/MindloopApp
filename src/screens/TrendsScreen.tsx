import { TrendingUp, BookOpen } from 'lucide-react';
import { WEEKLY_SCORES, BAND_META, bandForScore } from '@/lib/data';

interface Props {
  currentScore: number;
  focusSessions: { date: string; focusScore: number }[];
}

function LineChart() {
  const data = WEEKLY_SCORES;
  const w = 320;
  const h = 160;
  const pad = { l: 8, r: 8, t: 16, b: 28 };
  const innerW = w - pad.l - pad.r;
  const innerH = h - pad.t - pad.b;
  const maxScore = 100;

  const points = data.map((d, i) => {
    const x = pad.l + (i / (data.length - 1)) * innerW;
    const y = pad.t + (1 - d.score / maxScore) * innerH;
    return { x, y, ...d };
  });

  const pathD = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
  const areaD = `${pathD} L ${points[points.length - 1].x} ${pad.t + innerH} L ${points[0].x} ${pad.t + innerH} Z`;

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-auto">
      <defs>
        <linearGradient id="scoreFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7da08d" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#7da08d" stopOpacity="0" />
        </linearGradient>
      </defs>

      {[25, 50, 75].map((g) => {
        const y = pad.t + (1 - g / maxScore) * innerH;
        return (
          <line
            key={g}
            x1={pad.l}
            y1={y}
            x2={w - pad.r}
            y2={y}
            stroke="#e3ece6"
            strokeWidth="1"
            strokeDasharray="3 4"
          />
        );
      })}

      <path d={areaD} fill="url(#scoreFill)" />
      <path d={pathD} fill="none" stroke="#5d8472" strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" />

      {points.map((p) => (
        <g key={p.weekLabel}>
          {p.isExamWeek && (
            <rect
              x={p.x - 12}
              y={p.y - 14}
              width="24"
              height="24"
              rx="6"
              fill="#c39e78"
              opacity="0.18"
            />
          )}
          <circle
            cx={p.x}
            cy={p.y}
            r={p.isExamWeek ? 5 : 3.5}
            fill={p.isExamWeek ? '#b3865e' : '#5d8472'}
            stroke="#fff"
            strokeWidth="1.5"
          />
          {p.isExamWeek && p.examLabel && (
            <text
              x={p.x}
              y={p.y - 18}
              textAnchor="middle"
              className="fill-sand-500"
              style={{ fontSize: '8px', fontWeight: 600 }}
            >
              {p.examLabel}
            </text>
          )}
        </g>
      ))}

      {points.map((p, i) => (
        <text
          key={`label-${i}`}
          x={p.x}
          y={h - 8}
          textAnchor="middle"
          className="fill-sage-400"
          style={{ fontSize: '8px' }}
        >
          {i + 1}
        </text>
      ))}
    </svg>
  );
}

function generateInsight(): string {
  const lowest = WEEKLY_SCORES.reduce((min, w) => (w.score < min.score ? w : min));
  if (lowest.isExamWeek && lowest.examLabel) {
    return `Your score dipped to ${lowest.score} during ${lowest.weekLabel}, which overlaps with ${lowest.examLabel.toLowerCase()} — this is a common pattern among students.`;
  }
  return `Your lowest week was ${lowest.weekLabel} at ${lowest.score}. Noticing the dip is the first step to easing it.`;
}

export default function TrendsScreen({ currentScore, focusSessions }: Props) {
  const band = bandForScore(currentScore);
  const meta = BAND_META[band];
  const insight = generateInsight();
  const latestFocus = focusSessions[focusSessions.length - 1];

  return (
    <div className="px-5 pt-8 pb-28 max-w-md mx-auto w-full animate-fadeUp">
      <div className="flex items-center gap-3 mb-1">
        <TrendingUp className="w-6 h-6 text-sage-600" />
        <h1 className="text-2xl font-bold text-sage-800">Your trends</h1>
      </div>
      <p className="text-sage-600">A private look at how your weeks have been going.</p>

      <div className={`mt-5 p-6 rounded-3xl ${meta.bg} border border-sage-100 text-center`}>
        <p className="text-sm text-sage-500 font-medium">Current weekly score</p>
        <p className="text-6xl font-bold text-sage-800 mt-1">{currentScore}</p>
        <div className="mt-3 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/70">
          <span className={`w-2.5 h-2.5 rounded-full ${meta.color}`} />
          <span className={`text-sm font-semibold ${meta.text}`}>{meta.label}</span>
        </div>
      </div>

      <div className="mt-5 p-5 rounded-3xl bg-white shadow-card border border-sage-100">
        <p className="text-sm font-semibold text-sage-700 mb-1">Last 8 weeks</p>
        <p className="text-xs text-sage-400 mb-2">
          <span className="inline-flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-sand-500" /> marked weeks overlap exam periods
          </span>
        </p>
        <LineChart />
      </div>

      <div className="mt-4 p-5 rounded-3xl bg-sage-50 border border-sage-100">
        <div className="flex items-start gap-3">
          <BookOpen className="w-5 h-5 text-sage-600 shrink-0 mt-0.5" />
          <p className="text-sage-700 text-sm leading-relaxed">{insight}</p>
        </div>
      </div>

      {latestFocus && (
        <div className="mt-4 p-5 rounded-3xl bg-mist-50 border border-mist-100">
          <p className="text-sm font-semibold text-mist-700">Latest focus session</p>
          <p className="text-mist-500 text-sm mt-1">
            Focus score {latestFocus.focusScore} · {new Date(latestFocus.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
          </p>
        </div>
      )}
    </div>
  );
}
