import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { AuthAPI } from '../services/api';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.05 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 16, filter: 'blur(4px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } }
};

export default function LoginPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ username: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await AuthAPI.login(form.username, form.password);
      navigate('/start');
    } catch (err) {
      alert("Gagal masuk, periksa kembali data Anda.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="p-6 sm:p-8 md:p-10 rounded-[24px] sm:rounded-[32px] bg-white/60 backdrop-blur-[20px] border border-white/50 shadow-[0_24px_60px_rgba(124,158,135,0.08)]"
    >
        {/* Logo mobile */}
        <motion.div variants={itemVariants} className="flex lg:hidden justify-center items-center gap-2 mb-6">
          <span className="material-symbols-outlined filled text-[#456551] text-2xl">spa</span>
          <span className="text-2xl text-[#1a1c1a] tracking-tight" style={{ fontFamily: "'Newsreader', serif" }}>BurnoutSense</span>
        </motion.div>

        {/* Header */}
        <motion.div variants={itemVariants} className="text-center mb-6 sm:mb-8">
          <h1 className="text-[28px] sm:text-[36px] leading-[1.3] font-medium text-[#1a1c1a] mb-2" style={{ fontFamily: "'Newsreader', serif" }}>Selamat Datang</h1>
          <p className="text-[14px] sm:text-[16px] leading-[1.6] text-[#424843]">Lanjutkan perjalanan pemulihan Anda.</p>
        </motion.div>

        {/* Tab Masuk / Daftar */}
        <motion.div variants={itemVariants} className="flex p-1.5 bg-[#f4f4f0]/50 backdrop-blur-sm rounded-xl mb-6 sm:mb-8 border border-white/20 shadow-inner">
          <button className="w-1/2 py-2.5 rounded-lg bg-white shadow-[0_4px_12px_rgba(0,0,0,0.05)] text-[#456551] font-semibold text-sm tracking-[0.05em] transition-all flex items-center justify-center gap-2">
            <span className="material-symbols-outlined text-[18px]">login</span>Masuk
          </button>
          <button onClick={() => navigate('/register')} className="w-1/2 py-2.5 rounded-lg text-[#424843] hover:text-[#456551] font-semibold text-sm tracking-[0.05em] transition-all flex items-center justify-center gap-2 hover:bg-white/30">
            <span className="material-symbols-outlined text-[18px]">person_add</span>Daftar
          </button>
        </motion.div>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-4 sm:space-y-5">
          <motion.div variants={itemVariants}>
            <label className="block font-semibold text-sm tracking-[0.05em] text-[#1a1c1a] mb-1.5 ml-1">Nama Pengguna</label>
            <div className="relative group">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[#727973]/60 group-focus-within:text-[#456551] transition-colors duration-300">person</span>
              <input type="text" placeholder="masukkan nama pengguna" value={form.username} onChange={e => setForm({...form, username: e.target.value})} required className="w-full pl-12 pr-4 py-3 sm:py-3.5 bg-white/50 border border-[#c2c8c1]/40 rounded-xl text-[15px] sm:text-[16px] leading-[1.6] text-[#1a1c1a] placeholder:text-[#727973]/50 focus:outline-none focus:border-[#456551]/50 focus:ring-4 focus:ring-[#456551]/10 transition-all duration-300 shadow-sm hover:border-[#c2c8c1] hover:shadow-md" />
            </div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <label className="block font-semibold text-sm tracking-[0.05em] text-[#1a1c1a] mb-1.5 ml-1">Kata Sandi</label>
            <div className="relative group">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[#727973]/60 group-focus-within:text-[#456551] transition-colors duration-300">lock</span>
              <input type={showPassword ? 'text' : 'password'} placeholder="••••••••" value={form.password} onChange={e => setForm({...form, password: e.target.value})} required className="w-full pl-12 pr-12 py-3 sm:py-3.5 bg-white/50 border border-[#c2c8c1]/40 rounded-xl text-[15px] sm:text-[16px] leading-[1.6] text-[#1a1c1a] placeholder:text-[#727973]/50 focus:outline-none focus:border-[#456551]/50 focus:ring-4 focus:ring-[#456551]/10 transition-all duration-300 shadow-sm hover:border-[#c2c8c1] hover:shadow-md" />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#727973]/60 hover:text-[#1a1c1a] transition-colors duration-300">
                <span className="material-symbols-outlined text-[20px]">{showPassword ? 'visibility' : 'visibility_off'}</span>
              </button>
            </div>
          </motion.div>

          <motion.button
            variants={itemVariants}
            type="submit"
            disabled={loading}
            className="w-full mt-6 sm:mt-8 py-3.5 sm:py-4 bg-[#456551] text-white rounded-xl font-semibold text-[15px] tracking-wide hover:bg-[#3a5745] hover:shadow-[0_12px_24px_rgba(69,101,81,0.25)] transition-all duration-300 ease-out flex justify-center items-center gap-2 group relative overflow-hidden disabled:opacity-70"
            whileTap={{ scale: 0.97 }}
            whileHover={{ scale: 1.01, y: -1 }}
          >
            {loading ? (
              <motion.div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full" animate={{ rotate: 360 }} transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }} />
            ) : (
              <>
                <span>Masuk Sekarang</span>
                <span className="material-symbols-outlined text-[20px] group-hover:translate-x-1 transition-transform duration-300">arrow_right_alt</span>
              </>
            )}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out" />
          </motion.button>
        </form>
      </motion.div>
  );
}
