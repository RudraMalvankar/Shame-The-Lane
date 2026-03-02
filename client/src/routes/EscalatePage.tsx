import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const CATEGORIES = [
  { label: 'Roads', icon: '🛣️' },
  { label: 'Sanitation', icon: '🗑️' },
  { label: 'Water', icon: '💧' },
  { label: 'Lights', icon: '💡' },
  { label: 'Encroachment', icon: '🚧' },
  { label: 'Corruption', icon: '💼' },
  { label: 'Flooding', icon: '🌊' },
  { label: 'Noise', icon: '🔊' },
];

const URGENCY_LABELS = ['Mild', 'Annoying', 'Serious', 'Critical', 'EMERGENCY'];

function getUrgencyColor(level: number) {
  const colors = ['#22c55e', '#eab308', '#f97316', '#ef4444', '#dc2626'];
  return colors[level] ?? '#ef4444';
}

export default function EscalatePage() {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [title, setTitle] = useState('');
  const [rant, setRant] = useState('');
  const [category, setCategory] = useState('');
  const [urgency, setUrgency] = useState(2);
  const [ward, setWard] = useState('');
  const [location, setLocation] = useState('');
  const [images, setImages] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const urgencyColor = getUrgencyColor(urgency);
  const urgencyLabel = URGENCY_LABELS[urgency];

  function generateRTIPreview() {
    if (!rant.trim() || !category) return null;
    return `To,
The Public Information Officer,
Municipal Corporation (ward: ${ward || 'N/A'}),
Mumbai.

Subject: RTI Application under Section 6 of the RTI Act, 2005

Sir/Madam,

I, a citizen of Mumbai, hereby seek the following information regarding:

COMPLAINT: ${title || 'Civic infrastructure failure'}

CATEGORY: ${category}
URGENCY: ${urgencyLabel}

DETAILS:
${rant}

Information sought:
1. Current status of the above complaint
2. Name & designation of the officer responsible
3. Action taken report (ATR) within 30 days
4. Budget allocated & spent on this ward for ${category.toLowerCase()} in FY 2024–25
5. Contractor details if work was outsourced

This application is made in good faith. Non-compliance within 30 days will result in escalation to the State Information Commission.

Date: ${new Date().toLocaleDateString('en-IN')}
Filed via: ShameTheLane Civic Platform`;
  }

  const rtiPreview = generateRTIPreview();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!rant.trim() || !category) return;
    setIsSubmitting(true);
    await new Promise(r => setTimeout(r, 1500));
    setIsSubmitting(false);
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="flex items-center justify-center h-full" style={{ background: 'var(--bg-void)' }}>
        <div className="text-center max-w-sm px-6">
          <div
            className="w-16 h-16 mx-auto mb-6 flex items-center justify-center rounded-full"
            style={{ background: 'rgba(239,68,68,0.15)', border: '2px solid rgba(239,68,68,0.4)' }}
          >
            <svg className="w-8 h-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold mb-3" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Complaint Filed.
          </h2>
          <p className="text-sm mb-6" style={{ color: 'var(--text-secondary)' }}>
            Your rant has been weaponized into a legal RTI draft. Authorities have been notified. The clock is ticking.
          </p>
          <div className="flex gap-3 justify-center">
            <button className="btn-rage" onClick={() => navigate('/feed')}>View Live Feed</button>
            <button className="btn-ghost" onClick={() => { setSubmitted(false); setRant(''); setTitle(''); setCategory(''); }}>
              File Another
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-full overflow-hidden" style={{ background: 'var(--bg-void)' }}>
      {/* ── Left: Form Panel ── */}
      <div className="flex-1 overflow-y-auto p-6 min-w-0">
        <div className="max-w-xl mx-auto">
          <div className="mb-7">
            <h1 className="text-2xl font-bold mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              File a Complaint
            </h1>
            <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
              Your rant becomes a legal RTI in real-time. Be specific. Be loud.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Issue Title */}
            <div>
              <label className="section-label block mb-2">Issue Title</label>
              <input
                className="input"
                placeholder="e.g. Sewage has been overflowing on my street for 11 days"
                value={title}
                onChange={e => setTitle(e.target.value)}
                required
              />
            </div>

            {/* Evidence Upload */}
            <div>
              <label className="section-label block mb-2">Evidence Photos</label>
              <div
                className="rounded-xl p-6 text-center cursor-pointer transition-all"
                style={{
                  border: '2px dashed var(--border-light)',
                  background: 'var(--bg-surface)',
                }}
                onClick={() => fileInputRef.current?.click()}
                onMouseEnter={e => ((e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(239,68,68,0.4)')}
                onMouseLeave={e => ((e.currentTarget as HTMLDivElement).style.borderColor = 'var(--border-light)')}
              >
                <svg className="w-8 h-8 mx-auto mb-2" style={{ color: 'var(--text-muted)' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
                </svg>
                <p className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>
                  Drop photos here or click to upload
                </p>
                <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>
                  JPG, PNG, MP4 up to 10MB
                </p>
                {images.length > 0 && (
                  <p className="text-xs mt-2 font-semibold text-red-400">{images.length} file(s) selected</p>
                )}
              </div>
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept="image/*,video/*"
                className="hidden"
                onChange={e => setImages(Array.from(e.target.files ?? []).map(f => f.name))}
              />
            </div>

            {/* GPS Location */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="section-label block mb-2">Ward / Area</label>
                <input
                  className="input"
                  placeholder="e.g. Dharavi Ward 124"
                  value={ward}
                  onChange={e => setWard(e.target.value)}
                />
              </div>
              <div>
                <label className="section-label block mb-2">Street / Landmark</label>
                <input
                  className="input"
                  placeholder="e.g. Near SV Road signal"
                  value={location}
                  onChange={e => setLocation(e.target.value)}
                />
              </div>
            </div>

            {/* Category */}
            <div>
              <label className="section-label block mb-2">Category</label>
              <div className="flex flex-wrap gap-2">
                {CATEGORIES.map(cat => (
                  <button
                    key={cat.label}
                    type="button"
                    onClick={() => setCategory(cat.label)}
                    className={`pill ${category === cat.label ? 'active' : ''}`}
                  >
                    <span>{cat.icon}</span>
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Rant Textarea */}
            <div>
              <div className="flex justify-between mb-2">
                <label className="section-label">Your Rant</label>
                <span className="text-[11px]" style={{ color: 'var(--text-muted)' }}>
                  {rant.length} chars
                </span>
              </div>
              <textarea
                className="input min-h-[160px] resize-none leading-relaxed"
                placeholder="Tell us exactly what happened. Don't hold back. Every detail matters — when, where, what, how many times you reported, what response you got..."
                value={rant}
                onChange={e => setRant(e.target.value)}
                required
              />
            </div>

            {/* Urgency Meter */}
            <div>
              <div className="flex justify-between mb-3">
                <label className="section-label">Urgency Level</label>
                <span
                  className="text-xs font-bold uppercase tracking-wider"
                  style={{ color: urgencyColor }}
                >
                  {urgencyLabel}
                </span>
              </div>
              <input
                type="range"
                min={0}
                max={4}
                value={urgency}
                onChange={e => setUrgency(Number(e.target.value))}
                className="w-full h-1.5 rounded-full appearance-none cursor-pointer"
                style={{
                  background: `linear-gradient(90deg, ${urgencyColor} ${(urgency / 4) * 100}%, var(--border) ${(urgency / 4) * 100}%)`,
                }}
              />
              <div className="flex justify-between text-[10px] mt-1.5" style={{ color: 'var(--text-muted)' }}>
                {URGENCY_LABELS.map(l => <span key={l}>{l}</span>)}
              </div>
            </div>

            {/* Community Impact */}
            <div
              className="p-4 rounded-xl text-sm"
              style={{ background: 'rgba(239,68,68,0.06)', border: '1px solid rgba(239,68,68,0.15)', color: 'var(--text-secondary)' }}
            >
              <p className="font-semibold mb-1" style={{ color: '#ef4444' }}>Community Impact Note</p>
              <p>
                Your complaint will be visible to other citizens. Confirmations from neighbours amplify your pressure score.
                Anonymous filing is available in settings.
              </p>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting || !rant.trim() || !category}
              className="btn-rage w-full py-3.5 text-base"
            >
              {isSubmitting ? (
                <>
                  <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Filing & Generating RTI…
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  File Complaint + Generate RTI
                </>
              )}
            </button>
          </form>
        </div>
      </div>

      {/* ── Right: RTI Preview Panel ── */}
      <div
        className="hidden lg:flex flex-col w-96 shrink-0 overflow-hidden"
        style={{ borderLeft: '1px solid var(--border)', background: 'var(--bg-deep)' }}
      >
        <div
          className="flex items-center justify-between px-5 py-4 shrink-0"
          style={{ borderBottom: '1px solid var(--border)' }}
        >
          <div className="flex items-center gap-2">
            <div
              className="w-6 h-6 flex items-center justify-center rounded"
              style={{ background: 'rgba(59,130,246,0.15)', border: '1px solid rgba(59,130,246,0.25)' }}
            >
              <svg className="w-3.5 h-3.5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
              </svg>
            </div>
            <span className="text-sm font-bold text-blue-400">AI Legal Draft</span>
          </div>
          <span className="text-[11px]" style={{ color: 'var(--text-muted)' }}>
            {rtiPreview ? 'Live' : 'Waiting…'}
          </span>
        </div>

        <div className="flex-1 overflow-y-auto p-5">
          {rtiPreview ? (
            <div
              className="p-4 rounded-xl font-mono text-xs leading-relaxed whitespace-pre-wrap animate-fade-in"
              style={{
                background: 'rgba(59,130,246,0.05)',
                border: '1px solid rgba(59,130,246,0.12)',
                color: 'var(--text-secondary)',
              }}
            >
              {rtiPreview}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center gap-4">
              <div
                className="w-12 h-12 flex items-center justify-center rounded-full"
                style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)' }}
              >
                <svg className="w-6 h-6" style={{ color: 'var(--text-muted)' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>RTI Draft Pending</p>
                <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
                  Select a category and start writing your rant. The AI will generate a formal RTI/legal notice in real-time.
                </p>
              </div>
            </div>
          )}
        </div>

        {rtiPreview && (
          <div
            className="p-4 flex gap-3 shrink-0"
            style={{ borderTop: '1px solid var(--border)' }}
          >
            <button className="btn-civic flex-1 py-2 text-xs">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
              </svg>
              Download RTI
            </button>
            <button className="btn-ghost flex-1 py-2 text-xs">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z" />
              </svg>
              Share Draft
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
