import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import { login as apiLogin, signup as apiSignup } from '../api/authApi';

interface User {
  _id: string;
  name: string;
  email: string;
  role: 'user' | 'admin' | 'moderator';
  avatar?: string;
  pressureScore: number;
}

interface AuthContextValue {
  user: User | null;
  token: string | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Restore from localStorage
  useEffect(() => {
    const stored = localStorage.getItem('stl_token');
    const storedUser = localStorage.getItem('stl_user');
    if (stored && storedUser) {
      setToken(stored);
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const persist = (u: User, t: string) => {
    localStorage.setItem('stl_token', t);
    localStorage.setItem('stl_user', JSON.stringify(u));
    setUser(u);
    setToken(t);
  };

  const login = async (email: string, password: string) => {
    const { user, token } = await apiLogin(email, password);
    persist(user, token);
  };

  const signup = async (name: string, email: string, password: string) => {
    const { user, token } = await apiSignup(name, email, password);
    persist(user, token);
  };

  const logout = () => {
    localStorage.removeItem('stl_token');
    localStorage.removeItem('stl_user');
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuthContext = (): AuthContextValue => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuthContext must be used within AuthProvider');
  return ctx;
};
