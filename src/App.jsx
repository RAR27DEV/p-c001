import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import StartMenu from './pages/StartMenu';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
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
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

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
