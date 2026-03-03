import { useState, FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(email, password);
      navigate('/feed');
    } catch (err: any) {
      setError(err.message ?? 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ background: 'var(--bg-void)' }}>
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
          <a href='/'>
            <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: '1rem', letterSpacing: '-0.02em' }}>
              Shame<span className="text-red-500">TheLane</span>
            </span>
          </a>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/signup')}
            className="text-sm font-medium transition-colors"
            style={{ color: 'var(--text-secondary)' }}
            onMouseEnter={e => ((e.currentTarget as HTMLButtonElement).style.color = 'white')}
            onMouseLeave={e => ((e.currentTarget as HTMLButtonElement).style.color = 'var(--text-secondary)')}
          >
            Sign Up
          </button>
        </div>
      </nav>

      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1
              className="text-4xl font-bold mb-3"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              Welcome back
            </h1>
            <p className="text-base" style={{ color: 'var(--text-secondary)' }}>
              Sign in to keep the pressure on
            </p>
          </div>

          <form onSubmit={handleSubmit} className="card p-8 space-y-5">
            {error && (
              <div
                className="rounded-lg px-4 py-3 text-sm font-medium animate-slide-up"
                style={{
                  background: 'rgba(239,68,68,0.12)',
                  border: '1px solid rgba(239,68,68,0.3)',
                  color: '#ef4444'
                }}
              >
                {error}
              </div>
            )}

            <div>
              <label
                className="block text-sm font-semibold mb-2"
                style={{ color: 'var(--text-primary)' }}
              >
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input"
                placeholder="you@example.com"
                required
              />
            </div>

            <div>
              <label
                className="block text-sm font-semibold mb-2"
                style={{ color: 'var(--text-primary)' }}
              >
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input"
                placeholder="••••••••"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full font-bold px-6 py-3.5 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed text-base"
              disabled={loading}
              style={{
                background: loading ? 'var(--bg-surface)' : 'linear-gradient(135deg, #ef4444, #dc2626)',
                boxShadow: loading ? 'none' : '0 0 30px rgba(239,68,68,0.35)',
                color: 'white'
              }}
              onMouseEnter={e => !loading && ((e.currentTarget as HTMLButtonElement).style.boxShadow = '0 0 45px rgba(239,68,68,0.5)')}
              onMouseLeave={e => !loading && ((e.currentTarget as HTMLButtonElement).style.boxShadow = '0 0 30px rgba(239,68,68,0.35)')}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Signing in...
                </span>
              ) : (
                'Sign In'
              )}
            </button>

            <p
              className="text-center text-sm pt-2"
              style={{ color: 'var(--text-secondary)' }}
            >
              No account?{' '}
              <Link
                to="/signup"
                className="font-semibold transition-colors"
                style={{ color: '#ef4444' }}
                onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.color = '#dc2626')}
                onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.color = '#ef4444')}
              >
                Sign up
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
