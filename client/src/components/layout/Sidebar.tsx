import { NavLink, useNavigate } from 'react-router-dom';

const navItems = [
  {
    to: '/feed',
    label: 'Civic Feed',
    icon: (
      <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6h16.5M3.75 12h16.5M3.75 18H12" />
      </svg>
    ),
  },
  {
    to: '/heatmap',
    label: 'Heatmap',
    icon: (
      <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 20.25V3.75M15 20.25V9.75M3 20.25V14.25M21 20.25V14.25" />
        <circle cx="9" cy="2" r="0.75" fill="currentColor" />
      </svg>
    ),
  },
  {
    to: '/authority',
    label: 'Authority View',
    icon: (
      <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <rect x="3" y="3" width="7" height="7" rx="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="14" y="3" width="7" height="7" rx="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="3" y="14" width="7" height="7" rx="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="14" y="14" width="7" height="7" rx="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

export default function Sidebar() {
  const navigate = useNavigate();

  return (
    <aside
      className="w-[60px] lg:w-56 flex flex-col shrink-0"
      style={{ background: 'var(--bg-deep)', borderRight: '1px solid var(--border)' }}
    >
      {/* Logo */}
      <div
        className="flex items-center gap-3 px-4 py-4 shrink-0"
        style={{ borderBottom: '1px solid var(--border)' }}
      >
        <div
          className="w-8 h-8 shrink-0 flex items-center justify-center rounded"
          style={{ background: 'rgba(239,68,68,0.15)', border: '1px solid rgba(239,68,68,0.3)' }}
        >
          <svg className="w-4 h-4 text-red-500" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2L2 22h20L12 2z" />
          </svg>
        </div>
        <div className="hidden lg:block min-w-0">
          <div className="font-display font-bold text-sm leading-none text-white truncate">Shame</div>
          <div className="font-display font-bold text-sm leading-none text-red-500 truncate">The Lane</div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 py-3 px-2 space-y-0.5">
        <p className="hidden lg:block section-label px-3 pb-2 pt-1">Navigation</p>
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 ${
                isActive ? 'text-white' : ''
              }`
            }
            style={({ isActive }) =>
              isActive
                ? {
                    background: 'rgba(239,68,68,0.12)',
                    color: '#ef4444',
                    border: '1px solid rgba(239,68,68,0.2)',
                  }
                : {
                    color: 'var(--text-secondary)',
                    border: '1px solid transparent',
                  }
            }
            onMouseEnter={e => {
              const el = e.currentTarget as HTMLAnchorElement;
              if (!el.getAttribute('aria-current')) {
                el.style.background = 'var(--bg-surface)';
                el.style.color = 'var(--text-primary)';
              }
            }}
            onMouseLeave={e => {
              const el = e.currentTarget as HTMLAnchorElement;
              if (!el.getAttribute('aria-current')) {
                el.style.background = '';
                el.style.color = 'var(--text-secondary)';
              }
            }}
          >
            {item.icon}
            <span className="hidden lg:block truncate">{item.label}</span>
          </NavLink>
        ))}
      </nav>

      {/* Report Issue CTA */}
      <div className="px-2 pb-4 space-y-2">
        <button
          onClick={() => navigate('/escalate')}
          className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-bold text-white transition-all duration-200"
          style={{
            background: 'linear-gradient(135deg, #dc2626, #b91c1c)',
            boxShadow: '0 0 20px rgba(239,68,68,0.25)',
          }}
          onMouseEnter={e => ((e.currentTarget as HTMLButtonElement).style.boxShadow = '0 0 30px rgba(239,68,68,0.4)')}
          onMouseLeave={e => ((e.currentTarget as HTMLButtonElement).style.boxShadow = '0 0 20px rgba(239,68,68,0.25)')}
        >
          <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          <span className="hidden lg:inline">REPORT ISSUE</span>
        </button>

        <div style={{ borderTop: '1px solid var(--border)' }} className="pt-2 space-y-0.5">
          <button
            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all"
            style={{ color: 'var(--text-muted)' }}
            onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.color = 'var(--text-primary)'; (e.currentTarget as HTMLButtonElement).style.background = 'var(--bg-surface)'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.color = 'var(--text-muted)'; (e.currentTarget as HTMLButtonElement).style.background = ''; }}
          >
            <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
            </svg>
            <span className="hidden lg:inline text-xs">Settings</span>
          </button>
        </div>
      </div>
    </aside>
  );
}
