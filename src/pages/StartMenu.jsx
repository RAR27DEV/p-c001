import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { PageTransition, FadeInView, HoverCard } from '../components/PageTransition';

export default function StartMenu() {
  const navigate = useNavigate();

  const facts = [
    { icon: 'trending_up', iconBg: 'bg-[#ffdad6]/50', iconColor: 'text-[#ba1a1a]', title: "77% Pekerja", desc: "Pernah mengalami kelelahan kerja setidaknya satu kali dalam peran mereka saat ini." },
    { icon: 'health_and_safety', iconBg: 'bg-[#7c9e87]/20', iconColor: 'text-[#7c9e87]', title: "Diakui WHO", desc: "WHO mengklasifikasikan burnout sebagai fenomena pekerjaan." },
    { icon: 'bedtime', iconBg: 'bg-[#9e90af]/20', iconColor: 'text-[#655975]', title: "Kekuatan Tidur", desc: "Tidur berkualitas 7-8 jam dapat mengurangi risiko burnout hingga 40%." },
    { icon: 'self_improvement', iconBg: 'bg-[#9deded]/30', iconColor: 'text-[#006a6a]', title: "Jeda Mikro", desc: "Jeda 5 menit setiap jam lebih efektif mencegah kelelahan mental." },
    { icon: 'nature_people', iconBg: 'bg-[#e3e3df]', iconColor: 'text-[#424843]', title: "Efek Alam", desc: "Paparan visual terhadap alam menurunkan tingkat kortisol stres." },
    { icon: 'diversity_1', iconBg: 'bg-[#c7ebd1]', iconColor: 'text-[#012111]', title: "Koneksi Sosial", desc: "Dukungan komunitas adalah pelindung terkuat melawan sinisme burnout." },
  ];

  // Brief v2.4 Section 9: Starting Menu punya 3 tombol aksi
  const actionButtons = [
    {
      icon: 'description',
      iconBg: 'bg-[#c7ebd1]/30',
      iconColor: 'text-[#456551]',
      title: "Isi Kuesioner",
      desc: "Jawab pertanyaan seputar perasaan harian kamu (Q4-Q15).",
      route: '/quiz',
      badge: null,
    },
    {
      icon: 'photo_camera',
      iconBg: 'bg-[#9deded]/30',
      iconColor: 'text-[#006a6a]',
      title: "Scan Wajah AI",
      desc: "Biarkan AI menganalisis ekspresi wajah secara instan.",
      route: '/scan',
      badge: 'AI',
    },
    {
      icon: 'history',
      iconBg: 'bg-[#9e90af]/15',
      iconColor: 'text-[#655975]',
      title: "Lihat Riwayat",
      desc: "Tinjau pemeriksaan sebelumnya dan pantau kemajuanmu.",
      route: '/history',
      badge: null,
    },
  ];

  const quote = {
    text: '"Istirahat bukanlah hadiah karena telah bekerja keras. Istirahat adalah kebutuhan dasar manusia."',
    author: "— Pengingat Harian"
  };

  return (
    <PageTransition className="min-h-screen relative overflow-hidden flex flex-col bg-[#faf9f6]" style={{ fontFamily: "'Manrope', sans-serif" }}>

      {/* Ambient Background */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <motion.div className="absolute top-[-10%] left-[-5%] w-96 h-96 bg-[#7c9e87]/10 rounded-full blur-[100px]" animate={{ scale: [1, 1.15, 1], x: [0, 30, 0] }} transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }} />
        <motion.div className="absolute bottom-[20%] right-[-10%] w-[500px] h-[500px] bg-[#9deded]/10 rounded-full blur-[120px]" animate={{ scale: [1.1, 1, 1.1], y: [0, -40, 0] }} transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }} />
      </div>

      <Navbar />

      <main className="max-w-[1280px] mx-auto px-8 pb-20 w-full">

        {/* Hero Section */}
        <motion.section
          className="mt-8 relative rounded-xl overflow-hidden min-h-[420px] flex items-center p-8 md:p-16"
          initial={{ opacity: 0, y: 30, filter: 'blur(6px)' }} animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="absolute inset-0 z-0">
            <div className="w-full h-full bg-gradient-to-br from-[#2d4a3a] via-[#3d5e4a] to-[#5a8a6c]" />
            <svg className="absolute inset-0 w-full h-full opacity-10" viewBox="0 0 1200 500" fill="none">
              <path d="M0 500 L100 200 L200 500Z" fill="#1a2e22" /><path d="M150 500 L300 150 L450 500Z" fill="#1a2e22" />
              <path d="M350 500 L500 100 L650 500Z" fill="#1a2e22" /><path d="M600 500 L750 180 L900 500Z" fill="#1a2e22" />
              <path d="M800 500 L950 120 L1100 500Z" fill="#1a2e22" /><path d="M1000 500 L1150 160 L1200 500Z" fill="#1a2e22" />
            </svg>
            <div className="absolute inset-0 bg-gradient-to-r from-[#faf9f6]/90 via-[#faf9f6]/60 to-transparent" />
          </div>

          <motion.div className="relative z-10 glass-card p-10 md:p-12 rounded-xl max-w-2xl" initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.3 }}>
            <motion.p className="font-semibold text-sm tracking-[0.05em] text-[#7c9e87] mb-4 uppercase" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
              {"Ruang Tenang Kamu"}
            </motion.p>
            <motion.h1 className="text-[48px] leading-[1.2] font-semibold text-[#1a1c1a] mb-6" style={{ fontFamily: "'Newsreader', serif", letterSpacing: '-0.02em' }} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
              {"Hei, bagaimana harimu?"}
            </motion.h1>
            <motion.p className="text-[18px] leading-[1.6] text-[#424843] max-w-lg" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.75 }}>
              {"Mari luangkan waktu sejenak untuk memeriksa kondisi mental dan fisik kamu."}
            </motion.p>
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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {actionButtons.map((btn, idx) => (
              <FadeInView key={idx} delay={idx * 0.1}>
                <HoverCard className="h-full">
                  <motion.div
                    onClick={() => navigate(btn.route)}
                    className="glass-card p-6 rounded-xl flex flex-col h-full cursor-pointer group border border-white/40 hover:border-[#7c9e87]/30 transition-all duration-300 relative overflow-hidden"
                    whileTap={{ scale: 0.98 }}
                  >
                    {btn.badge && (
                      <div className="absolute top-0 right-0 text-white text-[10px] font-bold px-3 py-1 rounded-bl-xl uppercase tracking-wider bg-gradient-to-r from-[#456551] to-[#006a6a]">{btn.badge}</div>
                    )}
                    <motion.div
                      className={`w-14 h-14 rounded-2xl ${btn.iconBg} flex items-center justify-center mb-5 border border-white/60`}
                      whileHover={{ rotate: 8, scale: 1.1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <span className={`material-symbols-outlined filled ${btn.iconColor} text-[26px]`}>{btn.icon}</span>
                    </motion.div>
                    <h3 className="text-[20px] leading-[1.3] font-semibold text-[#1a1c1a] mb-2" style={{ fontFamily: "'Newsreader', serif" }}>
                      {btn.title}
                    </h3>
                    <p className="text-[14px] leading-[1.6] text-[#424843] flex-1">{btn.desc}</p>
                    <div className="flex items-center gap-1 mt-4 text-[#456551] font-semibold text-sm opacity-50 group-hover:opacity-100 transition-all duration-300">
                      {"Mulai"}
                      <span className="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform duration-300">arrow_forward</span>
                    </div>
                  </motion.div>
                </HoverCard>
              </FadeInView>
            ))}
          </div>
        </section>

        {/* Kutipan */}
        <FadeInView className="mt-20" delay={0.1}>
          <motion.div className="glass-card rounded-xl p-8 flex items-center justify-center" whileHover={{ scale: 1.005 }}>
            <div className="text-center px-8 max-w-2xl">
              <span className="material-symbols-outlined filled text-4xl text-[#7c9e87]/40 mb-4">format_quote</span>
              <p className="text-[24px] leading-[1.4] font-medium text-[#1a1c1a] mb-4" style={{ fontFamily: "'Newsreader', serif" }}>{quote.text}</p>
              <p className="font-semibold text-sm tracking-[0.05em] text-[#727973]">{quote.author}</p>
            </div>
          </motion.div>
        </FadeInView>

        {/* Facts Grid */}
        <section className="mt-20">
          <FadeInView>
            <h2 className="text-[36px] leading-[1.3] font-medium text-[#1a1c1a] mb-2" style={{ fontFamily: "'Newsreader', serif" }}>
              {"Fakta Menarik Burnout"}
            </h2>
            <p className="text-[16px] leading-[1.6] text-[#424843] mb-8">
              {"Memahami kondisi untuk pemulihan yang lebih baik."}
            </p>
          </FadeInView>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {facts.map((fact, idx) => (
              <FadeInView key={idx} delay={idx * 0.08}>
                <HoverCard className="h-full">
                  <div className="glass-card p-6 rounded-xl flex flex-col h-full cursor-default">
                    <motion.div className={`w-12 h-12 rounded-full ${fact.iconBg} flex items-center justify-center mb-6 border border-white/60`} whileHover={{ rotate: 10, scale: 1.1 }}>
                      <span className={`material-symbols-outlined filled ${fact.iconColor}`}>{fact.icon}</span>
                    </motion.div>
                    <h3 className="text-[24px] leading-[1.4] font-medium text-[#1a1c1a] mb-3" style={{ fontFamily: "'Newsreader', serif" }}>{fact.title}</h3>
                    <p className="text-[16px] leading-[1.6] text-[#424843] flex-1">{fact.desc}</p>
                  </div>
                </HoverCard>
              </FadeInView>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <FadeInView>
        <footer className="bg-[#FAF7F2] w-full py-10 mt-20 border-t border-[#dadad7]">
          <div className="max-w-7xl mx-auto px-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined filled text-[#7C9E87]">spa</span>
              <span className="text-lg font-semibold text-[#7C9E87]" style={{ fontFamily: "'Newsreader', serif" }}>BurnoutSense</span>
            </div>
            <div className="text-sm text-[#727973]">© 2024 BurnoutSense. {"Hak cipta dilindungi."}</div>
          </div>
        </footer>
      </FadeInView>
    </PageTransition>
  );
}
