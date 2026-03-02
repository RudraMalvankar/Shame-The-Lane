import { useState } from 'react';

const METRICS = [
  {
    label: 'Total Complaints',
    value: '4,291',
    delta: '+127 today',
    deltaUp: true,
    color: '#ef4444',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
      </svg>
    ),
  },
  {
    label: 'Critical Alerts',
    value: '38',
    delta: '+5 unresolved',
    deltaUp: true,
    color: '#f97316',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
      </svg>
    ),
  },
  {
    label: 'RTIs Generated',
    value: '1,843',
    delta: '+42 this week',
    deltaUp: true,
    color: '#3b82f6',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
      </svg>
    ),
  },
  {
    label: 'Issues Resolved',
    value: '312',
    delta: '↑ 7% vs prev month',
    deltaUp: true,
    color: '#22c55e',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
      </svg>
    ),
  },
];

const WARD_DATA = [
  { ward: 'Dharavi 124', complaints: 217, resolved: 12, category: 'Sanitation' },
  { ward: 'Andheri East 89', complaints: 183, resolved: 28, category: 'Roads' },
  { ward: 'Ghatkopar 177', complaints: 156, resolved: 5, category: 'Sanitation' },
  { ward: 'Kurla West 211', complaints: 98, resolved: 14, category: 'Lights' },
  { ward: 'Mulund East 148', complaints: 74, resolved: 9, category: 'Water' },
];

const SENTIMENT_DATA = [
  { month: 'Oct', rage: 55, hope: 45 },
  { month: 'Nov', rage: 62, hope: 38 },
  { month: 'Dec', rage: 71, hope: 29 },
  { month: 'Jan', rage: 84, hope: 16 },
];

const PRIORITY_ZONES = [
  { id: 'DH124', ward: 'Dharavi 124', category: 'Sanitation', overdue: 34, pressureScore: 94, risk: 'critical' },
  { id: 'AE089', ward: 'Andheri East 89', category: 'Roads', overdue: 28, pressureScore: 87, risk: 'critical' },
  { id: 'GK177', ward: 'Ghatkopar 177', category: 'Sanitation', overdue: 21, pressureScore: 81, risk: 'high' },
  { id: 'KW211', ward: 'Kurla West 211', category: 'Lights', overdue: 15, pressureScore: 72, risk: 'high' },
  { id: 'ME148', ward: 'Mulund East 148', category: 'Water', overdue: 9, pressureScore: 67, risk: 'medium' },
];

function MetricCard({ metric }: { metric: typeof METRICS[number] }) {
  return (
    <div className="card p-5">
      <div className="flex items-start justify-between mb-4">
        <div
          className="w-10 h-10 flex items-center justify-center rounded-lg"
          style={{ background: `${metric.color}18`, border: `1px solid ${metric.color}30`, color: metric.color }}
        >
          {metric.icon}
        </div>
      </div>
      <p className="text-3xl font-bold mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
        {metric.value}
      </p>
      <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
        {metric.label}
      </p>
      <p
        className="text-xs font-semibold mt-2"
        style={{ color: metric.deltaUp ? metric.color : '#22c55e' }}
      >
        {metric.delta}
      </p>
    </div>
  );
}

function SentimentChart() {
  const maxVal = 100;
  return (
    <div className="card p-5">
      <div className="flex items-center justify-between mb-5">
        <div>
          <p className="section-label mb-1">Citizen Sentiment Volatility</p>
          <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
            Rage vs Hope
          </p>
        </div>
        <div className="flex gap-4">
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
            <span className="text-xs" style={{ color: 'var(--text-muted)' }}>Rage</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-blue-500" />
            <span className="text-xs" style={{ color: 'var(--text-muted)' }}>Hope</span>
          </div>
        </div>
      </div>
      <div className="flex items-end gap-4 h-32">
        {SENTIMENT_DATA.map((d) => (
          <div key={d.month} className="flex-1 flex flex-col items-center gap-1">
            <div className="w-full flex flex-col-reverse gap-0.5 h-28 justify-end">
              <div
                className="w-full rounded-t-sm transition-all duration-500"
                style={{
                  height: `${(d.hope / maxVal) * 100}%`,
                  background: 'rgba(59,130,246,0.5)',
                  borderTop: '1px solid rgba(59,130,246,0.8)',
                }}
              />
              <div
                className="w-full rounded-t-sm"
                style={{
                  height: `${(d.rage / maxVal) * 60}%`,
                  background: `linear-gradient(180deg, rgba(239,68,68,0.9), rgba(239,68,68,0.4))`,
                  borderTop: '1px solid rgba(239,68,68,0.8)',
                }}
              />
            </div>
            <span className="text-[10px]" style={{ color: 'var(--text-muted)' }}>{d.month}</span>
          </div>
        ))}
      </div>
      <p className="text-[11px] mt-3" style={{ color: 'var(--text-muted)' }}>
        ⚠ Rage index increased 53% since October. Immediate attention required.
      </p>
    </div>
  );
}

function IgnoredWardsChart() {
  const max = Math.max(...WARD_DATA.map(w => w.complaints));
  return (
    <div className="card p-5">
      <p className="section-label mb-4">Most Ignored Wards</p>
      <div className="space-y-4">
        {WARD_DATA.map(w => (
          <div key={w.ward}>
            <div className="flex justify-between text-xs mb-1.5">
              <span style={{ color: 'var(--text-secondary)' }}>{w.ward}</span>
              <div className="flex gap-3">
                <span style={{ color: 'var(--text-muted)' }}>{w.resolved} resolved</span>
                <span className="font-bold" style={{ color: w.complaints > 150 ? '#ef4444' : 'var(--text-primary)' }}>
                  {w.complaints}
                </span>
              </div>
            </div>
            <div className="flex gap-1 h-1.5 rounded-full overflow-hidden" style={{ background: 'var(--border)' }}>
              <div
                className="h-full rounded-full"
                style={{
                  width: `${(w.complaints / max) * 100}%`,
                  background: 'linear-gradient(90deg, #f97316, #ef4444)',
                  boxShadow: w.complaints > 150 ? '0 0 6px rgba(239,68,68,0.5)' : 'none',
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function RTIGenerator() {
  const [ward, setWard] = useState('');
  const [subject, setSubject] = useState('');
  const [generated, setGenerated] = useState(false);

  return (
    <div className="card p-5">
      <div className="flex items-center gap-2 mb-4">
        <svg className="w-4 h-4 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
        </svg>
        <p className="text-sm font-bold text-blue-400">Generate Legal RTI</p>
      </div>
      {!generated ? (
        <div className="space-y-3">
          <input
            className="input"
            placeholder="Ward / jurisdiction"
            value={ward}
            onChange={e => setWard(e.target.value)}
          />
          <input
            className="input"
            placeholder="Subject of RTI (e.g. road repairs)"
            value={subject}
            onChange={e => setSubject(e.target.value)}
          />
          <button
            className="btn-civic w-full py-2.5"
            disabled={!ward || !subject}
            onClick={() => setGenerated(true)}
          >
            Generate RTI Draft
          </button>
        </div>
      ) : (
        <div>
          <div
            className="p-3 rounded-lg text-xs leading-relaxed mb-3"
            style={{ background: 'rgba(59,130,246,0.06)', border: '1px solid rgba(59,130,246,0.15)', color: 'var(--text-secondary)', fontFamily: 'monospace' }}
          >
            {`RTI Application — ${ward}\nSub: ${subject}\nFiled: ${new Date().toLocaleDateString('en-IN')}\n\nRequest for inspection reports, budget utilisation, contractor details and action taken report for the period 2024-25.`}
          </div>
          <div className="flex gap-2">
            <button className="btn-civic flex-1 py-2 text-xs">Download</button>
            <button className="btn-ghost flex-1 py-2 text-xs" onClick={() => setGenerated(false)}>Reset</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function AuthorityDashboardPage() {
  return (
    <div className="min-h-full pb-10" style={{ background: 'var(--bg-void)' }}>
      {/* Header */}
      <div className="px-6 py-5" style={{ borderBottom: '1px solid var(--border)', background: 'var(--bg-deep)' }}>
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              <span className="text-xs font-semibold text-red-400 uppercase tracking-wider">Command Center</span>
            </div>
            <h1 className="text-2xl font-bold" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Authority Dashboard
            </h1>
            <p className="text-sm mt-0.5" style={{ color: 'var(--text-muted)' }}>
              Real-time civic pressure intelligence for Mumbai
            </p>
          </div>
          <div className="text-right hidden sm:block">
            <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Last updated</p>
            <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
              {new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-6 space-y-6">
        {/* Metrics */}
        <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
          {METRICS.map(m => <MetricCard key={m.label} metric={m} />)}
        </div>

        {/* Charts row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <SentimentChart />
          <IgnoredWardsChart />
        </div>

        {/* Priority Neglect Zones */}
        <div className="card p-5">
          <div className="flex items-center justify-between mb-5">
            <p className="section-label">Priority Neglect Zones</p>
            <span className="text-[11px] font-semibold text-red-400">
              {PRIORITY_ZONES.filter(z => z.risk === 'critical').length} critical
            </span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border)' }}>
                  {['Ward', 'Category', 'Overdue', 'Pressure', 'Risk', 'Action'].map(h => (
                    <th key={h} className="text-left pb-3 pr-4 text-[11px] font-semibold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {PRIORITY_ZONES.map((zone, i) => (
                  <tr
                    key={zone.id}
                    style={{ borderBottom: i < PRIORITY_ZONES.length - 1 ? '1px solid var(--border)' : 'none' }}
                    className="transition-colors"
                    onMouseEnter={e => ((e.currentTarget as HTMLTableRowElement).style.background = 'var(--bg-card-hover)')}
                    onMouseLeave={e => ((e.currentTarget as HTMLTableRowElement).style.background = '')}
                  >
                    <td className="py-3 pr-4 font-medium" style={{ color: 'var(--text-primary)' }}>
                      <div>{zone.ward}</div>
                      <div className="text-[10px] font-mono" style={{ color: 'var(--text-muted)' }}>#{zone.id}</div>
                    </td>
                    <td className="py-3 pr-4">
                      <span className="pill text-[11px] py-1">{zone.category}</span>
                    </td>
                    <td className="py-3 pr-4 font-bold text-orange-400">
                      {zone.overdue}
                    </td>
                    <td className="py-3 pr-4">
                      <div className="flex items-center gap-2">
                        <div className="w-16 pressure-bar-track">
                          <div className="pressure-bar-fill" style={{ width: `${zone.pressureScore}%` }} />
                        </div>
                        <span className="text-xs font-bold text-red-400">{zone.pressureScore}</span>
                      </div>
                    </td>
                    <td className="py-3 pr-4">
                      <span className={`badge-${zone.risk === 'critical' ? 'critical' : zone.risk === 'high' ? 'escalated' : 'watchlist'}`}>
                        {zone.risk}
                      </span>
                    </td>
                    <td className="py-3">
                      <button className="btn-outline-rage py-1 px-3 text-xs">
                        Generate RTI
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* RTI Generator */}
        <div className="max-w-lg">
          <RTIGenerator />
        </div>
      </div>
    </div>
  );
}
