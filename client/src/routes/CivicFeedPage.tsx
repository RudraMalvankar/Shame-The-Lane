import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CATEGORIES = ['All', 'Roads', 'Sanitation', 'Water', 'Lights', 'Encroachment', 'Corruption'];

const SAMPLE_COMPLAINTS = [
  {
    id: '1',
    title: 'Massive sewage overflow flooding residential street for 11 days',
    ward: 'Dharavi Ward 124',
    category: 'Sanitation',
    pressure: 94,
    confirmations: 217,
    status: 'critical',
    timeAgo: '2h ago',
    imageUrl: null,
    excerpt: 'Raw sewage has been overflowing from a broken main for over a week. Three kids hospitalized. BMC helpline hung up 6 times.',
  },
  {
    id: '2',
    title: 'Pothole cluster on SV Road has swallowed two bikes this week',
    ward: 'Andheri East Ward 89',
    category: 'Roads',
    pressure: 87,
    confirmations: 183,
    status: 'escalated',
    timeAgo: '5h ago',
    imageUrl: null,
    excerpt: 'Six potholes in 30-meter stretch. One moped completely stuck. Contractor awarded tender 3 months ago — zero work done.',
  },
  {
    id: '3',
    title: 'Broken street lights — entire stretch dark for 3 weeks',
    ward: 'Kurla West Ward 211',
    category: 'Lights',
    pressure: 72,
    confirmations: 98,
    status: 'watchlist',
    timeAgo: '1d ago',
    imageUrl: null,
    excerpt: 'Six consecutive street lights non-functional. Two mugging incidents reported. Night vendors unable to operate.',
  },
  {
    id: '4',
    title: 'Garbage dump right next to school entrance — children breathing toxic air',
    ward: 'Ghatkopar Ward 177',
    category: 'Sanitation',
    pressure: 81,
    confirmations: 156,
    status: 'critical',
    timeAgo: '3h ago',
    imageUrl: null,
    excerpt: 'Illegal garbage burning 20 meters from school gate. Ash and smoke every morning at 7am. Principal has written 12 letters.',
  },
  {
    id: '5',
    title: 'Water supply cut for 9 days in 4-building complex',
    ward: 'Mulund East Ward 148',
    category: 'Water',
    pressure: 67,
    confirmations: 74,
    status: 'escalated',
    timeAgo: '6h ago',
    imageUrl: null,
    excerpt: 'No water supply since last Tuesday. Tanker prices tripled. Elderly residents on 3rd floor unable to manage.',
  },
  {
    id: '6',
    title: 'Encroachment of footpath by illegal hawkers — 200m stretch impassable',
    ward: 'Dadar West Ward 55',
    category: 'Encroachment',
    pressure: 58,
    confirmations: 62,
    status: 'pending',
    timeAgo: '12h ago',
    imageUrl: null,
    excerpt: 'Entire footpath blocked. Pedestrians forced onto main road. BMC issued notice 2 months ago — zero action.',
  },
];

const STATUS_CONFIG: Record<string, string> = {
  critical: 'badge-critical',
  escalated: 'badge-escalated',
  watchlist: 'badge-watchlist',
  resolved: 'badge-resolved',
  pending: 'badge-pending',
};

function PressureGauge({ score }: { score: number }) {
  const color = score >= 80 ? '#ef4444' : score >= 60 ? '#f97316' : '#eab308';
  return (
    <div className="flex items-center gap-2">
      <div
        className="relative w-8 h-8 flex items-center justify-center rounded-full text-[10px] font-bold"
        style={{
          border: `2px solid ${color}`,
          color,
          boxShadow: `0 0 8px ${color}40`,
        }}
      >
        {score}
      </div>
      <span className="text-[11px]" style={{ color: 'var(--text-muted)' }}>
        Pressure
      </span>
    </div>
  );
}

function ComplaintCard({ complaint }: { complaint: typeof SAMPLE_COMPLAINTS[number] }) {
  const navigate = useNavigate();
  return (
    <div
      className="card-hover p-5 cursor-pointer"
      onClick={() => navigate(`/issue/${complaint.id}`)}
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-2 flex-wrap">
          <span className={STATUS_CONFIG[complaint.status] ?? 'badge-pending'}>
            {complaint.status}
          </span>
          <span className="pill">{complaint.category}</span>
        </div>
        <span className="text-[11px] shrink-0" style={{ color: 'var(--text-muted)' }}>
          {complaint.timeAgo}
        </span>
      </div>

      <h3 className="font-semibold text-sm leading-snug mb-2" style={{ color: 'var(--text-primary)' }}>
        {complaint.title}
      </h3>
      <p className="text-xs leading-relaxed mb-4" style={{ color: 'var(--text-secondary)' }}>
        {complaint.excerpt}
      </p>

      <div className="divider mb-4" />

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <svg className="w-3.5 h-3.5" style={{ color: 'var(--text-muted)' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
          </svg>
          <span className="text-[11px]" style={{ color: 'var(--text-muted)' }}>{complaint.ward}</span>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            <svg className="w-3.5 h-3.5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
            <span className="text-[11px] font-semibold text-blue-400">{complaint.confirmations}</span>
          </div>
          <PressureGauge score={complaint.pressure} />
        </div>
      </div>
    </div>
  );
}

export default function CivicFeedPage() {
  const [activeCategory, setActiveCategory] = useState('All');

  const filtered = activeCategory === 'All'
    ? SAMPLE_COMPLAINTS
    : SAMPLE_COMPLAINTS.filter(c => c.category === activeCategory);

  const cityIndex = 74;
  const totalComplaints = SAMPLE_COMPLAINTS.length;
  const criticalCount = SAMPLE_COMPLAINTS.filter(c => c.status === 'critical').length;

  return (
    <div className="flex h-full overflow-hidden" style={{ background: 'var(--bg-void)' }}>
      {/* ── Main Feed ── */}
      <div className="flex-1 overflow-y-auto min-w-0">
        {/* Header */}
        <div className="px-6 py-5 sticky top-0 z-10" style={{ background: 'rgba(5,5,8,0.9)', backdropFilter: 'blur(12px)', borderBottom: '1px solid var(--border)' }}>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-xl font-bold" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Civic Feed</h1>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                  {totalComplaints} active · {criticalCount} critical
                </span>
              </div>
            </div>
            <div className="flex gap-2">
              <select
                className="text-xs px-3 py-2 rounded-lg"
                style={{ background: 'var(--bg-card)', border: '1px solid var(--border-light)', color: 'var(--text-secondary)' }}
              >
                <option>Newest First</option>
                <option>Highest Pressure</option>
                <option>Most Confirmations</option>
              </select>
            </div>
          </div>

          {/* Category pills */}
          <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`pill shrink-0 ${activeCategory === cat ? 'active' : ''}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Cards */}
        <div className="p-6 space-y-4">
          {filtered.map((c, i) => (
            <div key={c.id} className="animate-slide-up" style={{ animationDelay: `${i * 40}ms` }}>
              <ComplaintCard complaint={c} />
            </div>
          ))}
        </div>
      </div>

      {/* ── Right Sidebar ── */}
      <div
        className="hidden xl:flex flex-col w-72 shrink-0 overflow-y-auto p-5 gap-5"
        style={{ borderLeft: '1px solid var(--border)', background: 'var(--bg-deep)' }}
      >
        {/* City Neglect Index */}
        <div className="card p-5">
          <p className="section-label mb-3">City Neglect Index</p>
          <div className="flex items-end gap-2 mb-3">
            <span
              className="text-4xl font-bold"
              style={{ fontFamily: "'Space Grotesk', sans-serif", background: 'linear-gradient(90deg, #ef4444, #f97316)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
            >
              7.4
            </span>
            <span className="text-sm pb-1" style={{ color: 'var(--text-muted)' }}>/10</span>
          </div>
          <div className="pressure-bar-track mb-2">
            <div className="pressure-bar-fill" style={{ width: `${cityIndex}%` }} />
          </div>
          <p className="text-[11px]" style={{ color: 'var(--text-muted)' }}>
            ↑ 0.3 from last week
          </p>
        </div>

        {/* Ward Tension */}
        <div className="card p-5">
          <p className="section-label mb-4">Hottest Wards</p>
          <div className="space-y-3">
            {[
              { ward: 'Dharavi 124', score: 94 },
              { ward: 'Andheri East 89', score: 87 },
              { ward: 'Ghatkopar 177', score: 81 },
              { ward: 'Kurla West 211', score: 72 },
              { ward: 'Dadar West 55', score: 58 },
            ].map(w => (
              <div key={w.ward}>
                <div className="flex justify-between text-xs mb-1.5">
                  <span style={{ color: 'var(--text-secondary)' }}>{w.ward}</span>
                  <span className="font-bold text-red-400">{w.score}</span>
                </div>
                <div className="pressure-bar-track">
                  <div className="pressure-bar-fill" style={{ width: `${w.score}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AI Action Prediction */}
        <div
          className="p-5 rounded-xl"
          style={{ background: 'rgba(59,130,246,0.06)', border: '1px solid rgba(59,130,246,0.15)' }}
        >
          <div className="flex items-center gap-2 mb-3">
            <svg className="w-4 h-4 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm1 15h-2v-6h2zm0-8h-2V7h2z" />
            </svg>
            <p className="text-xs font-bold text-blue-400 uppercase tracking-wider">AI Action Prediction</p>
          </div>
          <p className="text-sm font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>
            Dharavi Sewage likely to get response
          </p>
          <p className="text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            Based on 94/100 pressure score and 3 pending RTIs, municipal action predicted within 5–7 days.
          </p>
          <div className="mt-3">
            <div className="flex justify-between text-[11px] mb-1" style={{ color: 'var(--text-muted)' }}>
              <span>Confidence</span>
              <span className="text-blue-400 font-bold">82%</span>
            </div>
            <div className="pressure-bar-track">
              <div style={{ height: '100%', width: '82%', background: 'linear-gradient(90deg, #3b82f6, #60a5fa)', borderRadius: '99px', boxShadow: '0 0 8px rgba(59,130,246,0.5)' }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
