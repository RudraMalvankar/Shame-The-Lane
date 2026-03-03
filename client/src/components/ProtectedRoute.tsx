import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div
        className="h-screen w-screen flex items-center justify-center"
        style={{ background: 'var(--bg-void)' }}
      >
        <div className="flex flex-col items-center gap-4">
          <div className="relative w-12 h-12">
            <div
              className="absolute inset-0 rounded-full border-2 border-red-600/20"
            />
            <div
              className="absolute inset-0 rounded-full border-2 border-red-600 border-t-transparent animate-spin"
            />
          </div>
          <p
            className="text-sm font-medium"
            style={{ color: 'var(--text-secondary)' }}
          >
            Loading...
          </p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}
