import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import StartMenu from './pages/StartMenu';
import AuthPage from './pages/AuthPage';
import QuizPage from './pages/QuizPage';
import ResultPage from './pages/ResultPage';
import HistoryPage from './pages/HistoryPage';
import ScanPage from './pages/ScanPage';

// Auth guard — redirect ke login kalau belum login
function ProtectedRoute({ children }) {
  const isAuth = !!localStorage.getItem('token');
  if (!isAuth) return <Navigate to="/login" replace />;
  return children;
}

function AnimatedRoutes() {
  const location = useLocation();
  
  // Untuk login/register, gunakan key yang sama supaya gak trigger page transition
  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';
  const routeKey = isAuthPage ? 'auth' : location.pathname;

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={routeKey}>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<AuthPage />} />
        <Route path="/register" element={<AuthPage />} />

        {/* Halaman butuh login */}
        <Route path="/start" element={<ProtectedRoute><StartMenu /></ProtectedRoute>} />
        <Route path="/quiz" element={<ProtectedRoute><QuizPage /></ProtectedRoute>} />
        <Route path="/scan" element={<ProtectedRoute><ScanPage /></ProtectedRoute>} />
        <Route path="/result" element={<ProtectedRoute><ResultPage /></ProtectedRoute>} />
        <Route path="/history" element={<ProtectedRoute><HistoryPage /></ProtectedRoute>} />

        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-[#faf9f6] text-[#1a1c1a] font-['Manrope',sans-serif] antialiased">
        <AnimatedRoutes />
      </div>
    </Router>
  );
}

export default App;
