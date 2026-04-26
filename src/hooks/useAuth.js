import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

// Hook untuk cek JWT & handle login/logout
export function useAuth() {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(() => !!localStorage.getItem('token'));
  const [username, setUsername] = useState(() => localStorage.getItem('bs_username') || '');

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
    setUsername(localStorage.getItem('bs_username') || '');
  }, []);

  const login = useCallback((token, user) => {
    localStorage.setItem('token', token);
    localStorage.setItem('bs_username', user);
    setIsAuthenticated(true);
    setUsername(user);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('token');
    localStorage.removeItem('bs_username');
    setIsAuthenticated(false);
    setUsername('');
    navigate('/login');
  }, [navigate]);

  const getToken = useCallback(() => localStorage.getItem('token'), []);

  const requireAuth = useCallback(() => {
    if (!localStorage.getItem('token')) { navigate('/login'); return false; }
    return true;
  }, [navigate]);

  return { isAuthenticated, username, login, logout, getToken, requireAuth };
}
