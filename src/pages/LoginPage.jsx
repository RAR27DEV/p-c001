import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { AuthAPI } from '../services/api';
import { PageTransition, AnimatedSection } from '../components/PageTransition';

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
    <PageTransition className="min-h-screen flex overflow-hidden bg-[#faf9f6] text-[#1a1c1a]" style={{ fontFamily: "'Manrope', sans-serif" }}>
      
      {/* Panel Kiri */}
      <AnimatedSection className="hidden lg:flex w-1/2 relative flex-col justify-between p-16 bg-[#e3e3df] overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-[#7c9e87]/30 to-[#faf9f6]/90 mix-blend-overlay" />
          <div className="absolute inset-0 bg-[#e3e3df]/40 backdrop-blur-[2px]" />
        </div>

        <motion.svg 
          className="absolute top-20 right-20 w-32 h-32 text-[#456551]/10 -rotate-12" 
          fill="currentColor" viewBox="0 0 100 100"
          animate={{ rotate: [-12, -8, -12], y: [0, -10, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        >
          <path d="M50 10 Q70 40 50 90 Q30 40 50 10" fill="none" stroke="currentColor" strokeWidth="2" />
        </motion.svg>

        <div className="relative z-10 flex items-center gap-3">
          <span className="material-symbols-outlined filled text-[#456551] text-3xl">spa</span>
          <span className="text-[28px] text-[#424843] tracking-tight" style={{ fontFamily: "'Newsreader', serif" }}>BurnoutSense</span>
        </div>

        <div className="relative z-10 flex-grow flex items-center justify-center my-12">
          <motion.svg className="w-full max-w-md h-auto drop-shadow-2xl" fill="none" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg" initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}>
            <circle cx="200" cy="180" fill="#c7ebd1" fillOpacity="0.3" r="140" className="blur-2xl" />
            <circle cx="200" cy="180" fill="#abcfb6" fillOpacity="0.4" r="100" className="blur-xl" />
            <motion.path d="M200 120 C220 120 230 100 230 80 C230 60 215 45 200 45 C185 45 170 60 170 80 C170 100 180 120 200 120 Z" fill="#7c9e87" animate={{ y: [0, -3, 0] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }} />
            <motion.path d="M140 280 C140 220 160 160 200 160 C240 160 260 220 260 280 C290 290 310 320 280 340 C240 340 160 340 120 340 C90 320 110 290 140 280 Z" fill="#456551" animate={{ y: [0, -3, 0] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }} />
            <motion.path d="M170 200 C150 240 130 250 110 240" stroke="#7c9e87" strokeLinecap="round" strokeWidth="12" animate={{ rotate: [0, 3, 0] }} transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }} style={{ transformOrigin: '170px 200px' }} />
            <motion.path d="M230 200 C250 240 270 250 290 240" stroke="#7c9e87" strokeLinecap="round" strokeWidth="12" animate={{ rotate: [0, -3, 0] }} transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }} style={{ transformOrigin: '230px 200px' }} />
            <ellipse cx="200" cy="350" fill="#1a1c1a" fillOpacity="0.05" rx="120" ry="15" />
            <motion.circle cx="100" cy="120" fill="#9e90af" fillOpacity="0.6" r="8" animate={{ y: [0, -8, 0] }} transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }} />
            <motion.circle cx="300" cy="150" fill="#a0f0f0" fillOpacity="0.6" r="12" animate={{ y: [0, 6, 0] }} transition={{ duration: 4, repeat: Infinity, delay: 1, ease: 'easeInOut' }} />
            <motion.circle cx="260" cy="80" fill="#7c9e87" fillOpacity="0.5" r="6" animate={{ y: [0, -5, 0] }} transition={{ duration: 3.5, repeat: Infinity, delay: 0.5, ease: 'easeInOut' }} />
          </motion.svg>
        </div>

        <div className="relative z-10 max-w-lg">
          <motion.div className="w-12 h-1 bg-[#456551]/30 mb-6 rounded-full" initial={{ width: 0 }} animate={{ width: 48 }} transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }} />
          <p className="text-[36px] leading-[1.3] font-medium text-[#1a1c1a] mb-4" style={{ fontFamily: "'Newsreader', serif" }}>
            "Istirahat bukan hadiah karena bekerja keras, melainkan fondasi kehidupan."
          </p>
          <p className="text-[18px] leading-[1.6] text-[#424843]/80">
            Berikan diri Anda ruang untuk bernapas, pulih, dan tumbuh.
          </p>
        </div>
      </AnimatedSection>

      {/* Panel Kanan: Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 relative">
        <motion.div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] rounded-full bg-[#c7ebd1]/40 blur-[100px] pointer-events-none mix-blend-multiply" animate={{ scale: [1, 1.08, 1], x: [0, 20, 0] }} transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }} />
        <motion.div className="absolute bottom-[-10%] left-[-20%] w-[500px] h-[500px] rounded-full bg-[#a0f0f0]/30 blur-[100px] pointer-events-none mix-blend-multiply" animate={{ scale: [1.08, 1, 1.08], y: [0, -20, 0] }} transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }} />

        <motion.div initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }} animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }} className="w-full max-w-[440px] p-8 sm:p-10 rounded-[32px] bg-white/60 backdrop-blur-[20px] border border-white/50 shadow-[0_40px_80px_rgba(124,158,135,0.06)] relative z-10">
          <motion.div className="flex lg:hidden justify-center items-center gap-2 mb-8" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: 0.2 }}>
            <span className="material-symbols-outlined filled text-[#456551] text-2xl">spa</span>
            <span className="text-2xl text-[#1a1c1a] tracking-tight" style={{ fontFamily: "'Newsreader', serif" }}>BurnoutSense</span>
          </motion.div>

          <motion.div className="text-center mb-8" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.15 }}>
            <h1 className="text-[36px] leading-[1.3] font-medium text-[#1a1c1a] mb-2" style={{ fontFamily: "'Newsreader', serif" }}>Selamat Datang</h1>
            <p className="text-[16px] leading-[1.6] text-[#424843]">Lanjutkan perjalanan pemulihan Anda.</p>
          </motion.div>

          <motion.div className="flex p-1.5 bg-[#f4f4f0]/50 backdrop-blur-sm rounded-xl mb-8 border border-white/20 shadow-inner" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.25 }}>
            <button className="w-1/2 py-2.5 rounded-lg bg-white shadow-[0_4px_12px_rgba(0,0,0,0.05)] text-[#456551] font-semibold text-sm tracking-[0.05em] transition-all flex items-center justify-center gap-2">
              <span className="material-symbols-outlined text-[18px]">login</span>Masuk
            </button>
            <button onClick={() => navigate('/register')} className="w-1/2 py-2.5 rounded-lg text-[#424843] hover:text-[#456551] font-semibold text-sm tracking-[0.05em] transition-all flex items-center justify-center gap-2 hover:bg-white/30">
              <span className="material-symbols-outlined text-[18px]">person_add</span>Daftar
            </button>
          </motion.div>

          <form onSubmit={handleLogin} className="space-y-5">
            <motion.div initial={{ opacity: 0, x: -15 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.35 }}>
              <label className="block font-semibold text-sm tracking-[0.05em] text-[#1a1c1a] mb-1.5 ml-1">Email / Nama Pengguna</label>
              <div className="relative group">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[#727973]/60 group-focus-within:text-[#456551] transition-colors duration-300">mail</span>
                <input type="text" placeholder="masukkan email Anda" value={form.username} onChange={e => setForm({...form, username: e.target.value})} required className="w-full pl-12 pr-4 py-3.5 bg-white/50 border border-[#c2c8c1]/40 rounded-xl text-[16px] leading-[1.6] text-[#1a1c1a] placeholder:text-[#727973]/50 focus:outline-none focus:border-[#456551]/50 focus:ring-4 focus:ring-[#456551]/10 transition-all duration-300 shadow-sm hover:border-[#c2c8c1] hover:shadow-md" />
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: -15 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.45 }}>
              <label className="block font-semibold text-sm tracking-[0.05em] text-[#1a1c1a] mb-1.5 ml-1">Kata Sandi</label>
              <div className="relative group">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[#727973]/60 group-focus-within:text-[#456551] transition-colors duration-300">lock</span>
                <input type={showPassword ? 'text' : 'password'} placeholder="••••••••" value={form.password} onChange={e => setForm({...form, password: e.target.value})} required className="w-full pl-12 pr-12 py-3.5 bg-white/50 border border-[#c2c8c1]/40 rounded-xl text-[16px] leading-[1.6] text-[#1a1c1a] placeholder:text-[#727973]/50 focus:outline-none focus:border-[#456551]/50 focus:ring-4 focus:ring-[#456551]/10 transition-all duration-300 shadow-sm hover:border-[#c2c8c1] hover:shadow-md" />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#727973]/60 hover:text-[#1a1c1a] transition-colors duration-300">
                  <span className="material-symbols-outlined text-[20px]">{showPassword ? 'visibility' : 'visibility_off'}</span>
                </button>
              </div>
            </motion.div>

            <motion.button type="submit" disabled={loading} className="w-full mt-8 py-4 bg-[#456551] text-white rounded-xl font-semibold text-[15px] tracking-wide hover:bg-[#456551]/90 hover:shadow-[0_12px_24px_rgba(69,101,81,0.25)] hover:-translate-y-0.5 transition-all duration-400 ease-in-out flex justify-center items-center gap-2 group relative overflow-hidden disabled:opacity-70" whileTap={{ scale: 0.97 }} whileHover={{ scale: 1.01 }} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.6 }}>
              {loading ? (
                <motion.div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full" animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }} />
              ) : (
                <>
                  <span className="relative z-10">Masuk Sekarang</span>
                  <span className="material-symbols-outlined text-[20px] relative z-10 group-hover:translate-x-1.5 transition-transform duration-400">arrow_right_alt</span>
                </>
              )}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out" />
            </motion.button>
          </form>
        </motion.div>
      </div>
    </PageTransition>
  );
}
