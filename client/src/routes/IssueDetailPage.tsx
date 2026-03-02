import { useParams, useNavigate } from 'react-router-dom';

const MOCK_ISSUE = {
  id: '1',
  title: 'Massive sewage overflow flooding residential street for 11 days',
  ward: 'Dharavi Ward 124',
  category: 'Sanitation',
  status: 'critical',
  pressure: 84,
  confirmations: 217,
  reportedAt: '14 Jan 2025',
  images: ['evidence-1', 'evidence-2', 'evidence-3'],
  rant: `Raw sewage has been overflowing from a broken main outside C-Block for 11 days straight.
The entire lane is flooded with waste water. Three children from the building were hospitalised
with gastroenteritis. I have called the BMC helpline 6 times — they hang up or ask me to "wait".
A plumber visited once, looked at it, and left. Nothing changed.
The stench is unbearable. Elderly residents cannot leave their homes. The contractor who was
awarded this ward's sanitation budget hasn't done any maintenance in 8 months. Someone needs
to be held accountable.`,
  reporterName: 'Anonymous Citizen',
  timeline: [
    { date: '14 Jan 2025', event: 'Complaint Filed', note: 'Initial report submitted with photographic evidence', done: true, type: 'rage' },
    { date: '15 Jan 2025', event: 'RTI Generated', note: 'AI auto-generated formal RTI filed to Municipal Corporation', done: true, type: 'rage' },
    { date: '17 Jan 2025', event: 'Acknowledgement Received', note: 'BMC issued case number #BMC2025/DH124/0041', done: true, type: 'civic' },
    { date: '25 Jan 2025', event: 'Field Inspection Due', note: 'Assigned to Junior Engineer Rajan Mehta', done: false, type: 'neutral' },
    { date: '14 Feb 2025', event: '30-Day RTI Response Deadline', note: 'Legal response mandated by RTI Act', done: false, type: 'neutral' },
    { date: '28 Feb 2025', event: 'Escalation to SIC', note: 'Auto-escalate to State Information Commission if unresolved', done: false, type: 'neutral' },
  ],
  aiEscalation: `FORMAL COMPLAINT & ESCALATION NOTICE

To,
The Commissioner,
Brihanmumbai Municipal Corporation,
Mumbai — 400 001

CC: Ward Officer — Ward 124 (Dharavi Division)
    RTI Department, Municipal Corporation of Greater Mumbai

Sub: Urgent escalation of unresolved sewage overflow — Ward 124, Dharavi
Ref: Case No. BMC2025/DH124/0041

Sir/Madam,

This letter serves as a FORMAL ESCALATION of a public health emergency that has
persisted unresolved for 11 days despite prior RTI filing and multiple helpline
complaints.

FACTUAL SUMMARY:
• Sewage main failure at C-Block, Dharavi Ward 124 since 14 January 2025
• 3 children hospitalised with gastroenteritis (medical records attached)
• 6 helpline calls made — no resolution
• Contractor on record: ABC Sanitation Pvt Ltd (Contract #BMC-SAN-2024-0872)
• Last maintenance logged: 14 May 2024 (8 months ago)

LEGAL NOTICE:
Under Section 3 of the Environment Protection Act, 1986 and Article 21 of the
Constitution of India (right to a healthy environment), this situation constitutes
a violation of citizens' fundamental rights.

You are hereby directed to:
1. Deploy emergency repair team within 48 hours
2. Provide written action taken report within 7 days
3. Disclose contractor performance audit under RTI Act

Failure to comply will result in immediate filing of a writ petition in the
Bombay High Court.

Regards,
Citizen Filing No: STL-2025-01-0041`,
};

function PressureGaugeLarge({ score }: { score: number }) {
  const color = score >= 80 ? '#ef4444' : score >= 60 ? '#f97316' : '#eab308';
  const angle = (score / 100) * 180 - 90;
  const needleX = 80 + 55 * Math.cos(((angle - 90) * Math.PI) / 180);
  const needleY = 80 + 55 * Math.sin(((angle - 90) * Math.PI) / 180);

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-44 h-24 overflow-hidden">
        <svg viewBox="0 0 160 90" className="w-full h-full">
          <path d="M 10 80 A 70 70 0 0 1 150 80" stroke="#1e1e2e" strokeWidth="10" fill="none" strokeLinecap="round" />
          <path
            d="M 10 80 A 70 70 0 0 1 150 80"
            stroke="url(#gauge-g)"
            strokeWidth="10"
            fill="none"
            strokeLinecap="round"
            strokeDasharray={`${(score / 100) * 219.9} 220`}
          />
          <defs>
            <linearGradient id="gauge-g" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#f97316" />
              <stop offset="100%" stopColor="#ef4444" />
            </linearGradient>
          </defs>
          <line x1="80" y1="80" x2={needleX} y2={needleY} stroke="white" strokeWidth="2" strokeLinecap="round" />
          <circle cx="80" cy="80" r="5" fill={color} />
        </svg>
      </div>
      <div className="flex items-baseline gap-1">
        <span className="text-4xl font-bold" style={{ fontFamily: "'Space Grotesk', sans-serif", color }}>
          {score}
        </span>
        <span className="text-sm" style={{ color: 'var(--text-muted)' }}>/100</span>
      </div>
      <p className="text-xs mt-1 font-semibold uppercase tracking-wider" style={{ color }}>
        {score >= 80 ? 'Critical Pressure' : score >= 60 ? 'High Pressure' : 'Moderate'}
      </p>
    </div>
  );
}

export default function IssueDetailPage() {
  useParams();
  const navigate = useNavigate();
  const issue = MOCK_ISSUE;

  return (
    <div className="min-h-full pb-10" style={{ background: 'var(--bg-void)' }}>
      {/* Header */}
      <div className="px-6 py-5" style={{ borderBottom: '1px solid var(--border)', background: 'var(--bg-deep)' }}>
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-sm mb-4 transition-colors"
          style={{ color: 'var(--text-muted)' }}
          onMouseEnter={e => ((e.currentTarget as HTMLButtonElement).style.color = 'var(--text-primary)')}
          onMouseLeave={e => ((e.currentTarget as HTMLButtonElement).style.color = 'var(--text-muted)')}
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
          </svg>
          Back to Feed
        </button>
        <div className="flex flex-wrap items-start gap-3">
          <span className="badge-critical">{issue.status}</span>
          <span className="pill active">{issue.category}</span>
          <span className="text-xs" style={{ color: 'var(--text-muted)' }}>Filed {issue.reportedAt}</span>
        </div>
        <h1 className="text-xl lg:text-2xl font-bold leading-snug mt-3" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
          {issue.title}
        </h1>
        <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>📍 {issue.ward}</p>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main */}
        <div className="lg:col-span-2 space-y-6">
          {/* Evidence Gallery */}
          <div className="card p-5">
            <p className="section-label mb-4">Visual Evidence</p>
            <div className="grid grid-cols-3 gap-3">
              {issue.images.map((img, i) => (
                <div
                  key={img}
                  className="aspect-square rounded-lg flex flex-col items-center justify-center"
                  style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)' }}
                >
                  <svg className="w-7 h-7 mb-1" style={{ color: 'var(--text-muted)' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                  </svg>
                  <span className="text-[10px]" style={{ color: 'var(--text-muted)' }}>Photo {i + 1}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Citizen Rant */}
          <div className="p-5 rounded-xl" style={{ background: 'rgba(239,68,68,0.05)', border: '1px solid rgba(239,68,68,0.15)' }}>
            <div className="flex items-start gap-3 mb-3">
              <svg className="w-5 h-5 text-red-500 shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>
              <p className="text-sm leading-relaxed italic" style={{ color: 'var(--text-secondary)' }}>
                {issue.rant.split('\n').slice(0, 3).join(' ')}
              </p>
            </div>
            <p className="text-xs font-semibold" style={{ color: 'var(--text-muted)' }}>— {issue.reporterName}</p>
          </div>

          {/* AI Escalation Protocol */}
          <div className="card p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
                </svg>
                <p className="text-sm font-bold text-blue-400">AI Escalation Protocol</p>
              </div>
              <button className="btn-ghost py-1.5 px-3 text-xs">
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                </svg>
                Download
              </button>
            </div>
            <pre
              className="text-xs leading-relaxed whitespace-pre-wrap rounded-xl p-4"
              style={{
                background: 'rgba(59,130,246,0.05)',
                border: '1px solid rgba(59,130,246,0.1)',
                color: 'var(--text-secondary)',
                fontFamily: "'Courier New', monospace",
                maxHeight: '320px',
                overflowY: 'auto',
              }}
            >
              {issue.aiEscalation}
            </pre>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-5">
          {/* Pressure Hub */}
          <div className="card p-5 text-center">
            <p className="section-label mb-4">Public Pressure Hub</p>
            <PressureGaugeLarge score={issue.pressure} />
            <div className="divider my-4" />
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 rounded-lg" style={{ background: 'var(--bg-surface)' }}>
                <p className="text-xl font-bold" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{issue.confirmations}</p>
                <p className="text-[10px] mt-0.5" style={{ color: 'var(--text-muted)' }}>Confirmations</p>
              </div>
              <div className="p-3 rounded-lg" style={{ background: 'var(--bg-surface)' }}>
                <p className="text-xl font-bold text-blue-400" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>3</p>
                <p className="text-[10px] mt-0.5" style={{ color: 'var(--text-muted)' }}>RTIs Filed</p>
              </div>
            </div>
            <button className="btn-rage w-full mt-4 text-sm py-2.5">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              </svg>
              Confirm This Complaint
            </button>
          </div>

          {/* Timeline */}
          <div className="card p-5">
            <p className="section-label mb-4">Progress Timeline</p>
            <div className="space-y-0">
              {issue.timeline.map((step, i) => {
                const dotColor = step.done
                  ? step.type === 'civic' ? '#22c55e' : '#ef4444'
                  : 'var(--border)';
                return (
                  <div key={i} className="flex gap-3 pb-4 relative">
                    {i < issue.timeline.length - 1 && (
                      <div className="absolute left-[11px] top-6 bottom-0 w-px" style={{ background: step.done ? 'var(--border-light)' : 'var(--border)' }} />
                    )}
                    <div
                      className="w-5 h-5 rounded-full shrink-0 flex items-center justify-center mt-0.5 z-10"
                      style={{ background: step.done ? `${dotColor}20` : 'var(--bg-surface)', border: `2px solid ${dotColor}` }}
                    >
                      {step.done && (
                        <svg className="w-2.5 h-2.5" style={{ color: dotColor }} fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-semibold" style={{ color: step.done ? 'var(--text-primary)' : 'var(--text-muted)' }}>
                        {step.event}
                      </p>
                      <p className="text-[10px] mt-0.5" style={{ color: 'var(--text-muted)' }}>{step.date}</p>
                      <p className="text-[11px] mt-1 leading-snug" style={{ color: 'var(--text-secondary)' }}>{step.note}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
