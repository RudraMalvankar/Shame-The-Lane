import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { SocketProvider } from './context/SocketContext';
import Navbar from './components/layout/Navbar';
import Sidebar from './components/layout/Sidebar';
import LandingPage from './routes/LandingPage';
import CivicFeedPage from './routes/CivicFeedPage';
import HeatmapPage from './routes/HeatmapPage';
import EscalatePage from './routes/EscalatePage';
import IssueDetailPage from './routes/IssueDetailPage';
import AuthorityDashboardPage from './routes/AuthorityDashboardPage';
import LoginPage from './routes/LoginPage';
import SignupPage from './routes/SignupPage';

function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen overflow-hidden" style={{ background: 'var(--bg-void)' }}>
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden min-w-0">
        <Navbar />
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <SocketProvider>
          <Routes>
            {/* Public full-page routes (no shell) */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />

            {/* App shell routes */}
            <Route path="/feed" element={<AppShell><CivicFeedPage /></AppShell>} />
            <Route path="/heatmap" element={<AppShell><HeatmapPage /></AppShell>} />
            <Route path="/escalate" element={<AppShell><EscalatePage /></AppShell>} />
            <Route path="/issue/:id" element={<AppShell><IssueDetailPage /></AppShell>} />
            <Route path="/authority" element={<AppShell><AuthorityDashboardPage /></AppShell>} />

            {/* Legacy redirects */}
            <Route path="/map" element={<Navigate to="/heatmap" replace />} />
            <Route path="/rant" element={<Navigate to="/escalate" replace />} />
            <Route path="/shame" element={<Navigate to="/authority" replace />} />
            <Route path="/fame" element={<Navigate to="/authority" replace />} />

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </SocketProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
