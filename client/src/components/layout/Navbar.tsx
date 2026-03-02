import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [search, setSearch] = useState('');

  return (
    <header
      className="flex items-center gap-4 px-5 py-3 shrink-0"
      style={{
        background: 'var(--bg-deep)',
        borderBottom: '1px solid var(--border)',
      }}
    >
      {/* Search */}
      <div className="flex-1 max-w-xl relative">
        <svg
          className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4"
          style={{ color: 'var(--text-muted)' }}
          fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
        </svg>
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search complaints, wards, issues…"
          className="w-full pl-9 pr-4 py-2 rounded-lg text-sm transition-all duration-200"
          style={{
            background: 'var(--bg-surface)',
            border: '1px solid var(--border-light)',
            color: 'var(--text-primary)',
          }}
          onFocus={e => (e.target.style.borderColor = 'rgba(239,68,68,0.4)')}
          onBlur={e => (e.target.style.borderColor = 'var(--border-light)')}
        />
      </div>

      {/* Right section */}
      <div className="flex items-center gap-3">
        {/* Bell */}
        <button
          className="relative w-9 h-9 flex items-center justify-center rounded-lg transition-colors"
          style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)' }}
          onMouseEnter={e => ((e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--border-light)')}
          onMouseLeave={e => ((e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--border)')}
        >
          <svg className="w-4 h-4" style={{ color: 'var(--text-secondary)' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 17H9a6 6 0 1 1 12 0h-6zm0 0v1a3 3 0 1 1-6 0v-1" />
          </svg>
          <span
            className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-red-500"
            style={{ boxShadow: '0 0 6px rgba(239,68,68,0.8)' }}
          />
        </button>

        {/* User */}
        {user ? (
          <div className="flex items-center gap-2">
            <button
              className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white"
              style={{ background: 'linear-gradient(135deg, #ef4444, #b91c1c)' }}
            >
              {user.name?.charAt(0).toUpperCase() ?? 'U'}
            </button>
            <button
              onClick={logout}
              className="text-xs font-medium transition-colors hidden sm:block"
              style={{ color: 'var(--text-muted)' }}
              onMouseEnter={e => ((e.currentTarget as HTMLButtonElement).style.color = 'var(--text-primary)')}
              onMouseLeave={e => ((e.currentTarget as HTMLButtonElement).style.color = 'var(--text-muted)')}
            >
              Logout
            </button>
          </div>
        ) : (
          <button
            onClick={() => navigate('/login')}
            className="text-xs font-semibold px-4 py-2 rounded-lg transition-all"
            style={{
              background: 'var(--bg-surface)',
              border: '1px solid var(--border-light)',
              color: 'var(--text-secondary)',
            }}
          >
            Sign In
          </button>
        )}
      </div>
    </header>
  );
}
