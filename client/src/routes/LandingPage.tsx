import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function useCountUp(target: number, duration = 2000) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    const start = performance.now();
    const step = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      setValue(Math.floor(progress * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration]);
  return value;
}

const STATS = [
  { label: 'Active Complaints', value: 4291, suffix: '' },
  { label: 'Wards Mapped', value: 227, suffix: '' },
  { label: 'RTIs Generated', value: 1843, suffix: '' },
  { label: 'Issues Resolved', value: 312, suffix: '' },
];

const HOW_IT_WORKS = [
  {
    step: '01',
    title: 'Rant It Out',
    desc: 'Document your civic grievance — attach photos, GPS tag the spot, pick the category. No filter needed.',
    color: '#ef4444',
  },
  {
    step: '02',
    title: 'AI Escalates',
    desc: 'Our AI converts your rage into formal RTI drafts and legal notices automatically, in real time.',
    color: '#f97316',
  },
  {
    step: '03',
    title: 'Pressure Builds',
    desc: 'Community confirmations amplify your complaint. Pressure scores rise. Authorities notice.',
    color: '#eab308',
  },
  {
    step: '04',
    title: 'Change Happens',
    desc: 'Track resolution timelines publicly. Every victory is documented. Every failure is shamed.',
    color: '#22c55e',
  },
];

const VICTORIES = [
  {
    title: 'Sewage Overflow — Dharavi Ward',
    days: 12,
    pressure: 94,
    category: 'Sanitation',
  },
  {
    title: 'Pothole Cluster — Andheri East',
    days: 8,
    pressure: 87,
    category: 'Roads',
  },
  {
    title: 'Broken Street Lights — Kurla',
    days: 21,
    pressure: 79,
    category: 'Infrastructure',
  },
];

function StatCard({ label, value, suffix }: { label: string; value: number; suffix: string }) {
  const count = useCountUp(value, 1800);
  return (
    <div className="flex flex-col items-center gap-1 px-6">
      <span
        className="text-3xl lg:text-4xl font-bold tabular-nums"
        style={{ fontFamily: "'Space Grotesk', sans-serif", color: 'var(--text-primary)' }}
      >
        {count.toLocaleString()}
        {suffix}
      </span>
      <span className="text-xs font-medium" style={{ color: 'var(--text-muted)' }}>
        {label}
      </span>
    </div>
  );
}

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen text-white" style={{ background: '#050508' }}>
      {/* ── Top Bar ── */}
      <nav
        className="flex items-center justify-between px-6 lg:px-12 py-4 sticky top-0 z-50"
        style={{ background: 'rgba(5,5,8,0.85)', backdropFilter: 'blur(12px)', borderBottom: '1px solid #1e1e2e' }}
      >
        <div className="flex items-center gap-2.5">
          <div
            className="w-7 h-7 flex items-center justify-center rounded"
            style={{ background: 'rgba(239,68,68,0.15)', border: '1px solid rgba(239,68,68,0.3)' }}
          >
            <svg className="w-4 h-4 text-red-500" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2L2 22h20L12 2z" />
            </svg>
          </div>
          <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: '1rem', letterSpacing: '-0.02em' }}>
            Shame<span className="text-red-500">TheLane</span>
          </span>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/login')}
            className="text-sm font-medium transition-colors hidden sm:block"
            style={{ color: 'var(--text-secondary)' }}
            onMouseEnter={e => ((e.currentTarget as HTMLButtonElement).style.color = 'white')}
            onMouseLeave={e => ((e.currentTarget as HTMLButtonElement).style.color = 'var(--text-secondary)')}
          >
            Sign In
          </button>
          <button
            onClick={() => navigate('/escalate')}
            className="text-sm font-bold px-4 py-2 rounded-lg transition-all"
            style={{
              background: 'linear-gradient(135deg, #dc2626, #b91c1c)',
              boxShadow: '0 0 20px rgba(239,68,68,0.3)',
            }}
          >
            File a Complaint
          </button>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section
        className="relative overflow-hidden pt-24 pb-16 px-6 lg:px-12"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 50% -5%, rgba(239,68,68,0.1) 0%, transparent 65%), #050508',
        }}
      >
        <div className="max-w-4xl mx-auto text-center relative z-10">
          {/* Live badge */}
          <div className="inline-flex items-center gap-2 mb-6 px-3 py-1.5 rounded-full text-xs font-semibold"
            style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.25)', color: '#ef4444' }}>
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
            LIVE — City-Wide Civic Pressure System
          </div>

          <h1
            className="text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] mb-6"
            style={{ fontFamily: "'Space Grotesk', sans-serif", letterSpacing: '-0.03em' }}
          >
            We didn't calm<br />
            your anger.{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #ef4444, #f97316)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              We made it useful.
            </span>
          </h1>

          <p className="text-lg max-w-2xl mx-auto mb-10" style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>
            File civic complaints that automatically escalate to RTIs and legal notices. Build public pressure on authorities.
            Track every promise, shame every failure.
          </p>

          <div className="flex flex-wrap gap-4 justify-center">
            <button
              onClick={() => navigate('/escalate')}
              className="text-base font-bold px-8 py-3.5 rounded-xl transition-all"
              style={{
                background: 'linear-gradient(135deg, #ef4444, #dc2626)',
                boxShadow: '0 0 30px rgba(239,68,68,0.35)',
              }}
              onMouseEnter={e => ((e.currentTarget as HTMLButtonElement).style.boxShadow = '0 0 45px rgba(239,68,68,0.5)')}
              onMouseLeave={e => ((e.currentTarget as HTMLButtonElement).style.boxShadow = '0 0 30px rgba(239,68,68,0.35)')}
            >
              File a Complaint →
            </button>
            <button
              onClick={() => navigate('/feed')}
              className="text-base font-semibold px-8 py-3.5 rounded-xl transition-all"
              style={{
                border: '1px solid var(--border-light)',
                color: 'var(--text-secondary)',
                background: 'var(--bg-card)',
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = '#3a3a5e'; (e.currentTarget as HTMLButtonElement).style.color = 'white'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--border-light)'; (e.currentTarget as HTMLButtonElement).style.color = 'var(--text-secondary)'; }}
            >
              View Live Feed
            </button>
          </div>
        </div>

        {/* City Tension Widget */}
        <div
          className="mt-16 max-w-sm mx-auto p-5 rounded-2xl"
          style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border)',
            boxShadow: '0 0 60px rgba(0,0,0,0.6)',
          }}
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-xs font-semibold text-red-500 uppercase tracking-wider">City-Wide Tension Index</p>
              <p className="text-3xl font-bold mt-0.5" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                <span style={{ background: 'linear-gradient(90deg, #ef4444, #f97316)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  7.4
                </span>
                <span className="text-base font-normal ml-1" style={{ color: 'var(--text-muted)', WebkitTextFillColor: 'var(--text-muted)' }}>/10</span>
              </p>
            </div>
            <div className="text-right">
              <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Status</p>
              <p className="text-sm font-bold text-orange-400 mt-0.5">ELEVATED</p>
            </div>
          </div>
          <div className="pressure-bar-track">
            <div className="pressure-bar-fill" style={{ width: '74%' }} />
          </div>
          <p className="text-[11px] mt-2" style={{ color: 'var(--text-muted)' }}>
            Based on 4,291 active complaints across 227 wards
          </p>
        </div>
      </section>

      {/* ── Stats Bar ── */}
      <section style={{ borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', background: 'var(--bg-deep)' }}>
        <div className="max-w-5xl mx-auto py-8 grid grid-cols-2 md:grid-cols-4 divide-x" style={{ '--tw-divide-opacity': 1 } as React.CSSProperties}>
          {STATS.map((s) => (
            <StatCard key={s.label} label={s.label} value={s.value} suffix={s.suffix} />
          ))}
        </div>
      </section>

      {/* ── Heatmap Preview ── */}
      <section className="py-20 px-6 lg:px-12">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            <div className="lg:w-1/2">
              <p className="section-label mb-3">Live Intelligence</p>
              <h2 className="text-4xl font-bold leading-tight mb-5" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                Pressure Heatmap.<br />
                <span style={{ color: 'var(--text-secondary)', fontWeight: 500 }}>Every ward. Every failure.</span>
              </h2>
              <p className="text-base leading-relaxed mb-8" style={{ color: 'var(--text-secondary)' }}>
                Real-time geographic visualization of civic neglect. Glowing red pressure zones show where authorities
                have the most overdue complaints. Tap a ward to see its full history.
              </p>
              <button
                onClick={() => navigate('/heatmap')}
                className="btn-outline-rage"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 20.25V3.75M15 20.25V9.75M3 20.25V14.25M21 20.25V14.25" />
                </svg>
                Open Live Heatmap
              </button>
            </div>
            <div className="lg:w-1/2 w-full">
              <div
                className="aspect-[4/3] rounded-2xl overflow-hidden relative flex items-center justify-center"
                style={{
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border)',
                  boxShadow: '0 0 60px rgba(239,68,68,0.08)',
                }}
              >
                {/* SVG placeholder map */}
                <svg width="100%" height="100%" viewBox="0 0 480 360" fill="none" xmlns="http://www.w3.org/2000/svg"
                  className="absolute inset-0">
                  <rect width="480" height="360" fill="#050508" />
                  {/* Grid lines */}
                  {Array.from({ length: 10 }).map((_, i) => (
                    <line key={`h${i}`} x1="0" y1={i * 36} x2="480" y2={i * 36} stroke="#1e1e2e" strokeWidth="0.8" />
                  ))}
                  {Array.from({ length: 13 }).map((_, i) => (
                    <line key={`v${i}`} x1={i * 40} y1="0" x2={i * 40} y2="360" stroke="#1e1e2e" strokeWidth="0.8" />
                  ))}
                  {/* Pressure blobs */}
                  <ellipse cx="200" cy="150" rx="80" ry="60" fill="rgba(239,68,68,0.18)" />
                  <ellipse cx="200" cy="150" rx="45" ry="35" fill="rgba(239,68,68,0.28)" />
                  <ellipse cx="200" cy="150" rx="20" ry="16" fill="rgba(239,68,68,0.5)" />
                  <ellipse cx="340" cy="200" rx="60" ry="45" fill="rgba(249,115,22,0.14)" />
                  <ellipse cx="340" cy="200" rx="30" ry="22" fill="rgba(249,115,22,0.25)" />
                  <ellipse cx="120" cy="250" rx="50" ry="38" fill="rgba(239,68,68,0.12)" />
                  <ellipse cx="120" cy="250" rx="25" ry="18" fill="rgba(239,68,68,0.22)" />
                  {/* Ward labels */}
                  <text x="150" y="155" fill="#ef4444" fontSize="9" fontFamily="Inter" fontWeight="600">Dharavi</text>
                  <text x="297" y="205" fill="#f97316" fontSize="9" fontFamily="Inter" fontWeight="600">Andheri</text>
                  <text x="80" y="255" fill="#ef4444" fontSize="9" fontFamily="Inter" fontWeight="600">Kurla</text>
                </svg>
                <div className="absolute bottom-4 right-4 flex flex-col gap-1.5">
                  {[
                    { color: '#ef4444', label: 'Critical' },
                    { color: '#f97316', label: 'High' },
                    { color: '#eab308', label: 'Medium' },
                  ].map(p => (
                    <div key={p.label} className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ background: p.color, boxShadow: `0 0 6px ${p.color}` }} />
                      <span className="text-[10px] font-medium" style={{ color: 'var(--text-muted)' }}>{p.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── How it Works ── */}
      <section className="py-20 px-6 lg:px-12" style={{ background: 'var(--bg-deep)' }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <p className="section-label mb-3">The System</p>
            <h2 className="text-4xl font-bold" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              How it works
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {HOW_IT_WORKS.map((step, i) => (
              <div
                key={step.step}
                className="card p-6 relative animate-slide-up"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <div className="text-[11px] font-bold mb-4" style={{ color: step.color, fontFamily: "'Space Grotesk', sans-serif" }}>
                  {step.step}
                </div>
                <h3 className="font-bold text-lg mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  {step.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  {step.desc}
                </p>
                {i < 3 && (
                  <div className="hidden lg:block absolute top-10 -right-3 z-10">
                    <svg className="w-6 h-6" style={{ color: 'var(--border-light)' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Recent Victories ── */}
      <section className="py-20 px-6 lg:px-12">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="section-label mb-2">Accountability Works</p>
              <h2 className="text-3xl font-bold" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                Recent Victories
              </h2>
            </div>
            <button
              onClick={() => navigate('/feed')}
              className="text-sm font-medium transition-colors hidden sm:block"
              style={{ color: 'var(--text-muted)' }}
              onMouseEnter={e => ((e.currentTarget as HTMLButtonElement).style.color = '#ef4444')}
              onMouseLeave={e => ((e.currentTarget as HTMLButtonElement).style.color = 'var(--text-muted)')}
            >
              View all →
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {VICTORIES.map((v, i) => (
              <div
                key={i}
                className="card-hover p-5 cursor-pointer"
                onClick={() => navigate('/feed')}
              >
                <div className="flex items-start justify-between mb-4">
                  <span className="badge-resolved">Resolved</span>
                  <span
                    className="text-xs font-medium"
                    style={{ color: 'var(--text-muted)' }}
                  >
                    {v.days}d
                  </span>
                </div>
                <h3 className="font-semibold mb-1 text-sm leading-snug" style={{ color: 'var(--text-primary)' }}>
                  {v.title}
                </h3>
                <p className="text-xs mb-4" style={{ color: 'var(--text-muted)' }}>{v.category}</p>
                <div>
                  <div className="flex justify-between text-[11px] mb-1.5" style={{ color: 'var(--text-muted)' }}>
                    <span>Peak Pressure</span>
                    <span className="text-red-400 font-bold">{v.pressure}/100</span>
                  </div>
                  <div className="pressure-bar-track">
                    <div className="pressure-bar-fill" style={{ width: `${v.pressure}%` }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section
        className="py-24 px-6 lg:px-12 text-center"
        style={{
          background: 'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(239,68,68,0.07) 0%, transparent 70%), var(--bg-deep)',
          borderTop: '1px solid var(--border)',
        }}
      >
        <div className="max-w-2xl mx-auto">
          <h2 className="text-4xl lg:text-5xl font-bold mb-5" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Your anger is{' '}
            <span style={{ background: 'linear-gradient(135deg, #ef4444, #f97316)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              evidence.
            </span>
          </h2>
          <p className="text-lg mb-10" style={{ color: 'var(--text-secondary)' }}>
            Stop venting in DMs. Start building legal pressure. Every rant becomes a documented civic complaint.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <button
              onClick={() => navigate('/escalate')}
              className="text-base font-bold px-10 py-4 rounded-xl transition-all"
              style={{
                background: 'linear-gradient(135deg, #ef4444, #dc2626)',
                boxShadow: '0 0 40px rgba(239,68,68,0.3)',
              }}
            >
              Start Filing Now →
            </button>
            <button
              onClick={() => navigate('/heatmap')}
              className="text-base font-semibold px-10 py-4 rounded-xl transition-all"
              style={{ border: '1px solid var(--border-light)', color: 'var(--text-secondary)' }}
            >
              Explore Heatmap
            </button>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer
        className="px-6 lg:px-12 py-8"
        style={{ background: 'var(--bg-void)', borderTop: '1px solid var(--border)' }}
      >
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div
              className="w-6 h-6 flex items-center justify-center rounded"
              style={{ background: 'rgba(239,68,68,0.15)', border: '1px solid rgba(239,68,68,0.25)' }}
            >
              <svg className="w-3 h-3 text-red-500" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2L2 22h20L12 2z" />
              </svg>
            </div>
            <span className="text-sm font-semibold" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Shame<span className="text-red-500">TheLane</span>
            </span>
          </div>
          <p className="text-xs text-center" style={{ color: 'var(--text-muted)' }}>
            Made with rage and responsibility · AfterMath-MetaBytes 2026
          </p>
          <div className="flex gap-5">
            {['Civic Feed', 'Heatmap', 'Authority'].map(link => (
              <button
                key={link}
                className="text-xs transition-colors"
                style={{ color: 'var(--text-muted)' }}
                onClick={() => navigate(`/${link.toLowerCase().replace(' ', '')}`)}
                onMouseEnter={e => ((e.currentTarget as HTMLButtonElement).style.color = 'var(--text-primary)')}
                onMouseLeave={e => ((e.currentTarget as HTMLButtonElement).style.color = 'var(--text-muted)')}
              >
                {link}
              </button>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
