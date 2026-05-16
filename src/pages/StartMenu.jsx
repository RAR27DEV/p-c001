import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { PageTransition, FadeInView, HoverCard } from '../components/PageTransition';
import heroImg from '../assets/illustrations/hero-dashboard.png';
import quizImg from '../assets/illustrations/action-quiz.png';
import scanImg from '../assets/illustrations/action-scan.png';
import historyImg from '../assets/illustrations/action-history.png';
import motivationQuoteImg from '../assets/illustrations/motivation-quote.png';
import motivationFactImg from '../assets/illustrations/motivation-fact.png';

export default function StartMenu() {
  const navigate = useNavigate();

  // Ambil username dari localStorage
  const username = localStorage.getItem('bs_username') || 'Kamu';

  // Sapaan berdasarkan waktu
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 11) return 'Selamat pagi';
    if (hour < 15) return 'Selamat siang';
    if (hour < 18) return 'Selamat sore';
    return 'Selamat malam';
  };

  // Pesan hangat yang berganti
  const warmMessages = [
    "Senang melihatmu kembali. Bagaimana perasaanmu hari ini?",
    "Kamu sudah melangkah sejauh ini. Ayo cek kondisimu sejenak.",
    "Tidak perlu sempurna hari ini. Cukup hadir untuk dirimu sendiri.",
    "Tubuh dan pikiranmu layak mendapat perhatian. Mulai dari sini.",
    "Hari ini adalah hari yang baik untuk peduli pada dirimu.",
  ];

  const [warmMessage] = useState(() => warmMessages[Math.floor(Math.random() * warmMessages.length)]);

  // Brief v2.4 Section 9: Starting Menu punya 3 tombol aksi
  const actionButtons = [
    {
      icon: 'description',
      iconBg: 'bg-green-50',
      iconColor: 'text-[#15803d]',
      title: "Isi Kuesioner",
      desc: "Jawab pertanyaan seputar perasaan harian kamu.",
      route: '/quiz',
      badge: null,
      img: quizImg,
    },
    {
      icon: 'photo_camera',
      iconBg: 'bg-cyan-50',
      iconColor: 'text-cyan-600',
      title: "Scan Wajah AI",
      desc: "Biarkan AI menganalisis ekspresi wajah secara instan.",
      route: '/scan',
      badge: 'AI',
      img: scanImg,
    },
    {
      icon: 'history',
      iconBg: 'bg-purple-50',
      iconColor: 'text-purple-600',
      title: "Lihat Riwayat",
      desc: "Tinjau pemeriksaan sebelumnya dan pantau kemajuanmu.",
      route: '/history',
      badge: null,
      img: historyImg,
    },
  ];

  const quotes = [
    { text: '"Istirahat bukanlah hadiah karena telah bekerja keras. Istirahat adalah kebutuhan dasar manusia."', author: "— Pengingat Harian", type: "motivasi" },
    { text: '"Kamu tidak harus produktif setiap hari untuk membuktikan bahwa kamu berharga."', author: "— Pengingat Diri", type: "motivasi" },
    { text: '"Burnout bukan tanda kelemahan. Itu tanda bahwa kamu sudah terlalu lama memberi tanpa mengisi ulang."', author: "— Fakta Burnout", type: "fakta" },
    { text: '"WHO mengklasifikasikan burnout sebagai fenomena pekerjaan yang ditandai kelelahan, sinisme, dan penurunan efektivitas."', author: "— World Health Organization", type: "fakta" },
    { text: '"Jeda 5 menit setiap jam lebih efektif mencegah kelelahan mental daripada istirahat panjang di akhir hari."', author: "— Riset Produktivitas", type: "fakta" },
    { text: '"Kamu boleh melambat. Hidup bukan lomba sprint — ini maraton yang butuh jeda."', author: "— Pengingat Harian", type: "motivasi" },
    { text: '"76% pekerja pernah mengalami burnout setidaknya sekali. Kamu tidak sendirian dalam ini."', author: "— Gallup Research", type: "fakta" },
    { text: '"Merawat diri sendiri bukan egois. Kamu tidak bisa menuang dari gelas yang kosong."', author: "— Pengingat Diri", type: "motivasi" },
    { text: '"Tidur berkualitas 7-8 jam dapat mengurangi risiko burnout hingga 40%. Tubuhmu butuh pemulihan."', author: "— Sleep Foundation", type: "fakta" },
    { text: '"Tidak apa-apa untuk bilang tidak. Batasanmu adalah bentuk penghormatan terhadap dirimu sendiri."', author: "— Pengingat Harian", type: "motivasi" },
  ];

  const [quoteIndex, setQuoteIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setQuoteIndex((prev) => (prev + 1) % quotes.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  const currentQuote = quotes[quoteIndex];

  return (
    <PageTransition className="min-h-screen relative overflow-hidden flex flex-col bg-[#faf9f6]" style={{ fontFamily: "'Manrope', sans-serif" }}>

      {/* Ambient Background */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <motion.div className="absolute top-[-10%] left-[-5%] w-96 h-96 bg-[#c7ebd1]/25 rounded-full blur-[100px]" animate={{ scale: [1, 1.15, 1], x: [0, 30, 0] }} transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }} />
        <motion.div className="absolute bottom-[20%] right-[-10%] w-[500px] h-[500px] bg-[#b8e8e8]/20 rounded-full blur-[120px]" animate={{ scale: [1.1, 1, 1.1], y: [0, -40, 0] }} transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }} />
        <motion.div className="absolute top-[40%] left-[30%] w-[300px] h-[300px] bg-[#e8d5f0]/15 rounded-full blur-[100px]" animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }} />
      </div>

      <Navbar />

      <main className="max-w-[1280px] mx-auto px-4 sm:px-6 md:px-8 pb-16 sm:pb-20 w-full">

        {/* Hero Section */}
        <motion.section
          className="mt-4 sm:mt-6 relative rounded-3xl overflow-hidden min-h-[280px] sm:min-h-[400px] flex items-center p-5 sm:p-8 lg:p-16"
          initial={{ opacity: 0, y: 30, filter: 'blur(6px)' }} animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="absolute inset-0 z-0">
            <div className="w-full h-full bg-gradient-to-r from-[#dcfce7] to-[#86efac]" />
            <div className="absolute inset-0 opacity-30 pointer-events-none">
              <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 1000 400">
                <path d="M0,400 L0,200 L150,100 L300,300 L450,150 L600,350 L750,200 L900,300 L1000,100 L1000,400 Z" fill="rgba(255,255,255,0.4)" />
              </svg>
            </div>
          </div>

          <motion.div className="relative z-10 bg-white/90 backdrop-blur-sm p-6 sm:p-10 md:p-12 rounded-2xl max-w-2xl border border-white/50 shadow-sm flex flex-col md:flex-row items-center gap-6 md:gap-8" initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.3 }}>
            <div className="flex-1">
              <motion.p className="font-semibold text-xs sm:text-sm tracking-[0.05em] text-[#15803d] mb-3 sm:mb-4 uppercase flex items-center gap-2" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
                <span className="material-symbols-outlined text-[16px]">waving_hand</span>
                {getGreeting()}
              </motion.p>
              <motion.h1 className="text-[28px] sm:text-[40px] md:text-[48px] leading-[1.2] font-bold text-gray-900 mb-4 sm:mb-6" style={{ fontFamily: "'Newsreader', serif", letterSpacing: '-0.02em' }} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
                {"Hei, "}<span className="text-[#456551]">{username}</span>{" 👋"}
              </motion.h1>
              <motion.p className="text-[15px] sm:text-[18px] leading-[1.6] text-gray-600 max-w-md" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.75 }}>
                {warmMessage}
              </motion.p>
            </div>
            <motion.div
              className="flex-shrink-0 w-40 h-40 md:w-56 md:h-56"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              <img src={heroImg} alt="Calm character" className="w-full h-full object-contain" />
            </motion.div>
          </motion.div>
        </motion.section>

        {/* ===== 3 Action Buttons — sesuai brief Section 9 ===== */}
        <section className="mt-12">
          <FadeInView>
            <h2 className="text-[28px] leading-[1.3] font-medium text-[#1a1c1a] mb-2" style={{ fontFamily: "'Newsreader', serif" }}>
              {"Pilih Aksi"}
            </h2>
            <p className="text-[16px] leading-[1.6] text-[#424843] mb-6">
              {"Pilih cara untuk mengevaluasi kondisi kamu hari ini."}
            </p>
          </FadeInView>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {actionButtons.map((btn, idx) => (
              <FadeInView key={idx} delay={idx * 0.1}>
                <HoverCard className="h-full">
                  <motion.div
                    onClick={() => navigate(btn.route)}
                    className="relative p-8 rounded-2xl flex flex-col h-full cursor-pointer group bg-white border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden"
                    whileTap={{ scale: 0.97 }}
                  >
                    {btn.badge && (
                      <div className="absolute top-6 right-6 text-white text-[10px] font-bold px-2.5 py-1 rounded uppercase tracking-wider bg-[#14532d]">{btn.badge}</div>
                    )}
                    <div className="w-20 h-20 mb-6 group-hover:scale-110 transition-transform">
                      <img src={btn.img} alt={btn.title} className="w-full h-full object-contain" />
                    </div>
                    <h3 className="relative z-10 text-[18px] sm:text-[20px] leading-[1.3] font-bold text-[#1a1c1a] mb-3" style={{ fontFamily: "'Newsreader', serif" }}>
                      {btn.title}
                    </h3>
                    <p className="relative z-10 text-[13px] sm:text-[14px] leading-[1.6] text-gray-500 flex-1 mb-8">{btn.desc}</p>
                    
                    {/* CTA button — pill style */}
                    <div className="relative z-10 flex items-center gap-2 px-5 py-2.5 rounded-full bg-gray-50 text-gray-700 font-medium text-sm hover:bg-gray-100 transition-colors w-fit">
                      <span>Mulai</span>
                      <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                    </div>
                  </motion.div>
                </HoverCard>
              </FadeInView>
            ))}
          </div>
        </section>

        {/* Kutipan — Carousel */}
        <FadeInView className="mt-16 sm:mt-20" delay={0.1}>
          <div className="bg-white rounded-3xl p-6 sm:p-8 lg:p-12 relative overflow-hidden border border-gray-100 shadow-sm">
            {/* Background accent based on type */}
            <motion.div
              className="absolute inset-0 opacity-[0.04] pointer-events-none"
              key={quoteIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.04 }}
              transition={{ duration: 0.5 }}
            >
              <div className={`w-full h-full ${currentQuote.type === 'fakta' ? 'bg-[#006a6a]' : 'bg-[#456551]'}`} />
            </motion.div>

            <div className="relative z-10 flex items-center gap-6 lg:gap-10">
              {/* Left illustration */}
              <div className="hidden md:block flex-shrink-0 w-28 lg:w-36">
                <img src={motivationQuoteImg} alt="" className="w-full h-auto object-contain opacity-80" />
              </div>

              {/* Center content */}
              <div className="flex-1 flex flex-col items-center text-center px-2 sm:px-4">
                {/* Type badge */}
                <motion.span
                  key={`badge-${quoteIndex}`}
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold tracking-wider uppercase mb-4 ${
                    currentQuote.type === 'fakta'
                      ? 'bg-[#9deded]/20 text-[#006a6a]'
                      : 'bg-[#c7ebd1]/30 text-[#456551]'
                  }`}
                >
                  <span className="material-symbols-outlined text-[12px]">
                    {currentQuote.type === 'fakta' ? 'science' : 'favorite'}
                  </span>
                  {currentQuote.type === 'fakta' ? 'Fakta Burnout' : 'Motivasi'}
                </motion.span>

                {/* Quote icon */}
                <span className="material-symbols-outlined filled text-3xl sm:text-4xl text-[#7c9e87]/30 mb-3">format_quote</span>

                {/* Animated quote text */}
                <div className="min-h-[80px] sm:min-h-[100px] flex items-center justify-center">
                  <AnimatePresence mode="wait">
                    <motion.p
                      key={quoteIndex}
                      initial={{ opacity: 0, y: 12, filter: 'blur(4px)' }}
                      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                      exit={{ opacity: 0, y: -12, filter: 'blur(4px)' }}
                      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                      className="text-[18px] sm:text-[22px] md:text-[24px] leading-[1.4] font-medium text-[#1a1c1a]"
                      style={{ fontFamily: "'Newsreader', serif" }}
                    >
                      {currentQuote.text}
                    </motion.p>
                  </AnimatePresence>
                </div>

                {/* Author */}
                <AnimatePresence mode="wait">
                  <motion.p
                    key={`author-${quoteIndex}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3, delay: 0.2 }}
                    className="font-semibold text-xs sm:text-sm tracking-[0.05em] text-[#727973] mt-4"
                  >
                    {currentQuote.author}
                  </motion.p>
                </AnimatePresence>

                {/* Dot indicators */}
                <div className="flex items-center gap-1.5 mt-5">
                  {quotes.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setQuoteIndex(idx)}
                      className={`rounded-full transition-all duration-300 ${
                        idx === quoteIndex
                          ? 'w-6 h-2 bg-[#456551]'
                          : 'w-2 h-2 bg-[#c2c8c1]/50 hover:bg-[#7c9e87]/50'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Right illustration */}
              <div className="hidden md:block flex-shrink-0 w-28 lg:w-36">
                <img src={motivationFactImg} alt="" className="w-full h-auto object-contain opacity-80" />
              </div>
            </div>
          </div>
        </FadeInView>
      </main>

      {/* Footer */}
      <FadeInView>
        <footer className="w-full mt-16 sm:mt-20 bg-gradient-to-b from-[#faf9f6] to-[#eef6f0]">
          <div className="max-w-[1280px] mx-auto px-4 sm:px-6 md:px-8">
            {/* Divider */}
            <div className="w-full h-px bg-gradient-to-r from-transparent via-[#7c9e87]/30 to-transparent" />
            
            <div className="py-10 sm:py-14 flex flex-col items-center gap-6">
              {/* Logo */}
              <div className="flex items-center gap-2.5">
                <span className="material-symbols-outlined filled text-[#7c9e87] text-[28px]">spa</span>
                <span className="text-[22px] font-semibold text-[#456551] tracking-tight" style={{ fontFamily: "'Newsreader', serif" }}>BurnoutSense</span>
              </div>

              {/* Tagline */}
              <p className="text-[14px] sm:text-[15px] text-[#727973] text-center max-w-md leading-relaxed">
                Ruang tenang untuk memahami dirimu. Deteksi burnout lebih awal, pulih lebih cepat.
              </p>

              {/* Nav links */}
              <div className="flex items-center gap-6 text-sm font-medium text-[#456551]">
                <button onClick={() => navigate('/quiz')} className="hover:text-[#7c9e87] transition-colors">Kuesioner</button>
                <span className="w-1 h-1 rounded-full bg-[#c2c8c1]" />
                <button onClick={() => navigate('/scan')} className="hover:text-[#7c9e87] transition-colors">Scan Wajah</button>
                <span className="w-1 h-1 rounded-full bg-[#c2c8c1]" />
                <button onClick={() => navigate('/history')} className="hover:text-[#7c9e87] transition-colors">Riwayat</button>
              </div>

              {/* Disclaimer */}
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#c7ebd1]/20 border border-[#7c9e87]/10">
                <span className="material-symbols-outlined text-[14px] text-[#7c9e87]">info</span>
                <span className="text-[11px] sm:text-[12px] text-[#727973]">Bukan pengganti diagnosis profesional</span>
              </div>

              {/* Copyright */}
              <p className="text-[12px] text-[#727973]/60 mt-2">© 2025 BurnoutSense · Capstone Project</p>
            </div>
          </div>
        </footer>
      </FadeInView>
    </PageTransition>
  );
}
