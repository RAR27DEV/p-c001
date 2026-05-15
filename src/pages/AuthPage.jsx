import React from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import AuthLayout from '../components/AuthLayout';
import LoginPage from './LoginPage';
import RegisterPage from './RegisterPage';

export default function AuthPage() {
  const location = useLocation();
  const isLogin = location.pathname === '/login';

  return (
    <AuthLayout mode={isLogin ? 'login' : 'register'}>
      <AnimatePresence mode="wait" initial={false}>
        {isLogin ? (
          <motion.div
            key="login"
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <LoginPage />
          </motion.div>
        ) : (
          <motion.div
            key="register"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 40 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <RegisterPage />
          </motion.div>
        )}
      </AnimatePresence>
    </AuthLayout>
  );
}
