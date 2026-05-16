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
      className="p-6 sm:p-8 md:p-10 rounded-3xl bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)]"
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
        <motion.div variants={itemVariants} className="flex p-1 bg-gray-50 rounded-2xl mb-6 sm:mb-8">
          <button className="flex-1 flex items-center justify-center gap-2 py-3 bg-white rounded-xl shadow-sm text-sm font-medium text-gray-800 transition-all">
            <span className="material-symbols-outlined text-[18px] text-[#456551]">login</span>Masuk
          </button>
          <button onClick={() => navigate('/register')} className="flex-1 flex items-center justify-center gap-2 py-3 text-sm font-medium text-gray-500 hover:text-gray-800 transition-all">
            <span className="material-symbols-outlined text-[18px]">person_add</span>Daftar
          </button>
        </motion.div>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-4 sm:space-y-5">
          <motion.div variants={itemVariants}>
            <label className="block font-semibold text-sm tracking-[0.05em] text-[#1a1c1a] mb-1.5 ml-1">Nama Pengguna</label>
            <div className="relative group">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[#727973]/60 group-focus-within:text-[#456551] transition-colors duration-300">person</span>
              <input type="text" placeholder="masukkan nama pengguna" value={form.username} onChange={e => setForm({...form, username: e.target.value})} required className="w-full pl-12 pr-4 py-3.5 bg-[#E8F0FE] border-transparent rounded-2xl text-sm text-[#1a1c1a] placeholder:text-gray-400 focus:bg-white focus:border-[#456551] focus:ring-2 focus:ring-[#456551]/20 transition-all shadow-sm" />
            </div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <label className="block font-semibold text-sm tracking-[0.05em] text-[#1a1c1a] mb-1.5 ml-1">Kata Sandi</label>
            <div className="relative group">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[#727973]/60 group-focus-within:text-[#456551] transition-colors duration-300">lock</span>
              <input type={showPassword ? 'text' : 'password'} placeholder="••••••••" value={form.password} onChange={e => setForm({...form, password: e.target.value})} required className="w-full pl-12 pr-12 py-3.5 bg-[#E8F0FE] border-transparent rounded-2xl text-sm text-[#1a1c1a] placeholder:text-gray-400 focus:bg-white focus:border-[#456551] focus:ring-2 focus:ring-[#456551]/20 transition-all shadow-sm tracking-widest" />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#727973]/60 hover:text-[#1a1c1a] transition-colors duration-300">
                <span className="material-symbols-outlined text-[20px]">{showPassword ? 'visibility' : 'visibility_off'}</span>
              </button>
            </div>
          </motion.div>

          <motion.button
            variants={itemVariants}
            type="submit"
            disabled={loading}
            className="w-full mt-6 sm:mt-8 py-4 bg-[#456551] text-white rounded-2xl font-semibold text-sm tracking-wide hover:bg-[#456551]/90 transition-colors flex justify-center items-center gap-2 group disabled:opacity-70"
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
          </motion.button>
        </form>
      </motion.div>
  );
}
