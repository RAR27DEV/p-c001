import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import loginImg from '../assets/illustrations/login.png';
import registerImg from '../assets/illustrations/register.png';

// Kutipan motivasi burnout — berubah otomatis
const quotes = [
  { text: '"Kamu layak mendapat hari-hari yang tidak dipenuhi kecemasan."', sub: "Langkah pertama adalah mengenali." },
  { text: '"Burnout bukan kegagalan. Itu sinyal bahwa kamu butuh perubahan."', sub: "Dengarkan tubuhmu." },
  { text: '"Produktivitas tanpa jeda adalah jalan menuju kehancuran."', sub: "Jeda adalah investasi." },
  { text: '"Kamu lebih dari sekadar output pekerjaanmu."', sub: "Nilai dirimu bukan dari jam kerja." },
  { text: '"Meminta bantuan adalah tanda keberanian, bukan kelemahan."', sub: "Kamu tidak harus sendiri." },
  { text: '"Setiap napas dalam adalah langkah kecil menuju pemulihan."', sub: "Mulai dari yang sederhana." },
];

export default function AuthLayout({ children, mode = 'login' }) {
  const location = useLocation();
  const [quoteIndex, setQuoteIndex] = useState(0);

  // Rotate quotes every 7 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setQuoteIndex((prev) => (prev + 1) % quotes.length);
    }, 7000);
    return () => clearInterval(interval);
  }, []);

  const currentQuote = quotes[quoteIndex];
  const isLogin = mode === 'login';

  return (
    <div className="h-screen flex flex-col lg:flex-row overflow-hidden bg-[#faf9f6] text-[#1a1c1a]" style={{ fontFamily: "'Manrope', sans-serif" }}>
      
      {/* Panel Kiri — hidden di mobile, TIDAK ikut animasi page transition */}
      <div className="hidden lg:flex w-1/2 relative flex-col justify-between p-10 xl:p-16 bg-[#E1EBE2] overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-[#7c9e87]/30 to-[#faf9f6]/90 mix-blend-overlay" />
          <div className="absolute inset-0 bg-[#e3e3df]/40 backdrop-blur-[2px]" />
        </div>

        {/* Floating decorative elements */}
        <motion.div
          className="absolute top-16 right-16 w-24 h-24 rounded-full bg-[#c7ebd1]/20 blur-xl"
          animate={{ scale: [1, 1.2, 1], y: [0, -10, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-32 left-12 w-16 h-16 rounded-full bg-[#9deded]/15 blur-lg"
          animate={{ scale: [1.1, 1, 1.1], x: [0, 8, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Logo */}
        <div className="relative z-10 flex items-center gap-3">
          <span className="material-symbols-outlined filled text-[#456551] text-3xl">spa</span>
          <span className="text-[28px] text-[#424843] tracking-tight" style={{ fontFamily: "'Newsreader', serif" }}>BurnoutSense</span>
        </div>

        {/* Ilustrasi — berubah saat switch login/register */}
        <div className="relative z-10 flex-grow flex items-center justify-center my-8 xl:my-12">
          <AnimatePresence mode="wait">
            <motion.img
              key={mode}
              src={mode === 'login' ? loginImg : registerImg}
              alt="Character illustration"
              className="max-w-[280px] xl:max-w-[340px] w-full h-auto object-contain drop-shadow-2xl"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            />
          </AnimatePresence>
        </div>

        {/* Kutipan — berubah otomatis */}
        <div className="relative z-10 max-w-lg">
          <div className="w-12 h-1 bg-[#456551]/30 mb-5 rounded-full" />
          
          <div className="min-h-[120px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={quoteIndex}
                initial={{ opacity: 0, y: 12, filter: 'blur(3px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -12, filter: 'blur(3px)' }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              >
                <p className="text-[24px] xl:text-[30px] leading-[1.35] font-medium text-[#1a1c1a] mb-3" style={{ fontFamily: "'Newsreader', serif" }}>
                  {currentQuote.text}
                </p>
                <p className="text-[15px] xl:text-[17px] leading-[1.6] text-[#424843]/70">
                  {currentQuote.sub}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Dot indicators */}
          <div className="flex items-center gap-1.5 mt-4">
            {quotes.map((_, idx) => (
              <div
                key={idx}
                className={`rounded-full transition-all duration-300 ${
                  idx === quoteIndex ? 'w-5 h-1.5 bg-[#456551]' : 'w-1.5 h-1.5 bg-[#456551]/20'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Panel Kanan: Form — slide kiri/kanan saat switch */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-5 py-6 sm:px-12 sm:py-8 relative h-screen lg:h-auto overflow-hidden">
        {/* Ambient blobs */}
        <motion.div className="absolute top-[-10%] right-[-10%] w-[400px] sm:w-[600px] h-[400px] sm:h-[600px] rounded-full bg-[#c7ebd1]/25 blur-[100px] pointer-events-none" animate={{ scale: [1, 1.05, 1] }} transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }} />
        <motion.div className="absolute bottom-[-10%] left-[-15%] w-[300px] sm:w-[400px] h-[300px] sm:h-[400px] rounded-full bg-[#a0f0f0]/15 blur-[100px] pointer-events-none" animate={{ scale: [1.05, 1, 1.05] }} transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }} />

        <div className="w-full max-w-[480px] max-h-[calc(100vh-3rem)] overflow-y-auto relative z-10 scrollbar-hide py-2">
          {children}
        </div>
      </div>
    </div>
  );
}
