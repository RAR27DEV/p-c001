import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { HistoryAPI } from '../services/api';
import Navbar from '../components/Navbar';
import HistoryCard from '../components/HistoryCard';
import { PageTransition, FadeInView, HoverCard } from '../components/PageTransition';
import emptyImg from '../assets/illustrations/mental-health-1.png';

export default function HistoryPage() {
  const navigate = useNavigate();
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('all');

  useEffect(() => {
    HistoryAPI.getHistory().then(res => {
      setHistory(res.data);
      setLoading(false);
    });
  }, []);

  // Filter by type (quiz/scan) — sekarang bisa bekerja karena response punya field `type`
  const filteredHistory = activeFilter === 'all'
    ? history
    : history.filter(h => h.type === activeFilter);

  const filters = [
    { key: 'all', label: "Semua", icon: 'list' },
    { key: 'quiz', label: "Kuis", icon: 'description' },
    { key: 'scan', label: "Scan", icon: 'photo_camera' },
  ];

  // Compute stats
  const totalChecks = history.length;
  const avgScore = totalChecks > 0 ? Math.round(history.reduce((s, h) => s + (h.score || 0), 0) / totalChecks) : 0;
  const lastCheckDate = totalChecks > 0 ? new Date(history[0].created_at).toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' }) : '—';
  const healthyCount = history.filter(h => (h.score || 0) < 10).length;
  const healthyPercent = totalChecks > 0 ? Math.round((healthyCount / totalChecks) * 100) : 0;

  const quizCount = history.filter(h => h.type === 'quiz').length;
  const scanCount = history.filter(h => h.type === 'scan').length;

  const wellnessTips = [
    { icon: 'self_improvement', color: 'text-[#7c9e87]', bg: 'bg-[#c7ebd1]/30', title: "Pernafasan Sadar", desc: "Coba pernapasan 4-7-8: tarik 4 detik, tahan 7 detik, buang 8 detik. Hanya 3 siklus bisa menenangkan sistem saraf." },
    { icon: 'directions_walk', color: 'text-[#006a6a]', bg: 'bg-[#9deded]/20', title: "Jeda Gerak", desc: "Jalan kaki 10 menit di luar ruangan bisa mengurangi hormon stres hingga 25%." },
    { icon: 'music_note', color: 'text-[#655975]', bg: 'bg-[#9e90af]/15', title: "Terapi Suara", desc: "Mendengarkan musik tenang selama 15 menit dapat menurunkan tingkat kecemasan secara signifikan." },
  ];

  return (
    <PageTransition className="min-h-screen bg-[#faf9f6] flex flex-col relative overflow-x-hidden" style={{ fontFamily: "'Manrope', sans-serif" }}>

      {/* Ambient Background */}
      <div className="fixed inset-0 z-[-1] pointer-events-none overflow-hidden">
        <motion.div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-[#abcfb6]/20 blur-[120px]" animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 16, repeat: Infinity }} />
        <motion.div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] rounded-full bg-[#84d4d4]/12 blur-[150px]" animate={{ scale: [1.1, 1, 1.1] }} transition={{ duration: 20, repeat: Infinity }} />
      </div>

      <Navbar />

      <main className="max-w-[1280px] mx-auto px-4 sm:px-6 md:px-8 py-8 sm:py-12 flex flex-col gap-8 sm:gap-12 w-full">

        {/* Judul */}
        <FadeInView className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <motion.div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#c7ebd1]/40 text-[#456551] font-semibold text-xs tracking-[0.08em] uppercase mb-4" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }}>
              <span className="material-symbols-outlined text-[14px]">monitoring</span>
              {"Perjalananmu"}
            </motion.div>
            <h1 className="text-[28px] sm:text-[36px] md:text-[44px] leading-[1.15] font-semibold text-[#1a1c1a] mb-3" style={{ fontFamily: "'Newsreader', serif", letterSpacing: '-0.02em' }}>
              {"Riwayat Pemeriksaan"}
            </h1>
            <p className="text-[17px] leading-[1.6] text-[#424843] max-w-xl">
              {"Setiap pemeriksaan adalah langkah maju. Tinjau perjalananmu dan rayakan kemajuanmu."}
            </p>
          </div>
          <motion.button onClick={() => navigate('/start')} className="px-6 py-3 bg-[#456551] text-white font-semibold text-sm tracking-[0.05em] rounded-full shadow-md flex items-center gap-2 shrink-0 self-start md:self-auto" whileHover={{ scale: 1.03, y: -2 }} whileTap={{ scale: 0.97 }}>
            <span className="material-symbols-outlined text-[18px]">add</span>{"Pemeriksaan Baru"}
          </motion.button>
        </FadeInView>

        {/* Stat Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { icon: 'assignment_turned_in', label: "Total Pemeriksaan", value: totalChecks, color: 'text-[#15803d]', bg: 'bg-green-50', iconBg: 'bg-green-100' },
            { icon: 'description', label: "Kuis", value: `${quizCount}x`, color: 'text-gray-700', bg: 'bg-white', iconBg: 'bg-gray-100' },
            { icon: 'photo_camera', label: "Scan", value: `${scanCount}x`, color: 'text-cyan-700', bg: 'bg-cyan-50', iconBg: 'bg-cyan-100' },
            { icon: 'favorite', label: "Tingkat Sehat", value: `${healthyPercent}%`, color: 'text-gray-700', bg: 'bg-rose-50', iconBg: 'bg-rose-100' },
          ].map((stat, idx) => (
            <FadeInView key={idx} delay={0.05 + idx * 0.08}>
              <HoverCard>
                <div className={`${stat.bg} rounded-2xl p-5 border border-gray-100 flex flex-col gap-3 h-full`}>
                  <div className={`w-10 h-10 ${stat.iconBg} rounded-xl flex items-center justify-center`}>
                    <span className={`material-symbols-outlined ${stat.color} text-[20px]`}>{stat.icon}</span>
                  </div>
                  <div>
                    <p className="text-[10px] sm:text-xs font-semibold text-gray-500 tracking-[0.05em] uppercase mb-1">{stat.label}</p>
                    <p className={`text-[24px] font-bold ${stat.color} leading-tight`} style={{ fontFamily: "'Newsreader', serif" }}>{stat.value}</p>
                  </div>
                </div>
              </HoverCard>
            </FadeInView>
          ))}
        </div>

        {/* History List */}
        <section className="flex flex-col gap-6">
          {/* Section Header + Filters */}
          <FadeInView delay={0.15}>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <h2 className="text-[28px] leading-[1.3] font-medium text-[#1a1c1a]" style={{ fontFamily: "'Newsreader', serif" }}>
                {"Semua Catatan"}
              </h2>
              <div className="flex gap-2">
                {filters.map((filter) => (
                  <motion.button
                    key={filter.key}
                    onClick={() => setActiveFilter(filter.key)}
                    className={`px-4 py-2 rounded-full font-medium text-sm transition-all duration-300 flex items-center gap-1.5 ${
                      activeFilter === filter.key ? 'bg-[#456551] text-white shadow-sm' : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="material-symbols-outlined text-[16px]">{filter.icon}</span>
                    {filter.label}
                  </motion.button>
                ))}
              </div>
            </div>
          </FadeInView>

          {/* Content */}
          {loading ? (
            <div className="flex items-center justify-center py-24">
              <div className="flex flex-col items-center gap-4">
                <motion.div className="w-12 h-12 border-[3px] border-[#e3e3df] border-t-[#7c9e87] rounded-full" animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }} />
                <p className="text-[#727973] font-medium">{"Memuat kemajuanmu..."}</p>
              </div>
            </div>
          ) : filteredHistory.length === 0 ? (
            <FadeInView delay={0.2}>
              <div className="bg-green-50/50 rounded-3xl border border-gray-100">
                <div className="flex flex-col justify-center items-center text-center gap-4 py-16 px-8">
                  <motion.img
                    src={emptyImg}
                    alt="Empty state illustration"
                    className="w-36 h-36 sm:w-44 sm:h-44 object-contain"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                  />
                  <div>
                    <h3 className="text-[22px] sm:text-[24px] font-bold text-gray-900 mb-2" style={{ fontFamily: "'Newsreader', serif" }}>
                      {activeFilter !== 'all'
                        ? `Belum ada catatan ${activeFilter === 'quiz' ? 'kuis' : 'scan'}`
                        : "Ceritamu Dimulai di Sini"}
                    </h3>
                    <p className="text-[14px] sm:text-[15px] text-gray-500 max-w-sm mx-auto leading-relaxed">
                      Mulai pemeriksaan pertamamu hari ini untuk melihat riwayat perjalanan kesehatan mentalmu di sini.
                    </p>
                  </div>
                  <motion.button onClick={() => navigate('/start')} className="mt-2 px-8 py-3 rounded-full bg-[#456551] text-white font-semibold text-sm shadow-sm flex items-center gap-2" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                    <span className="material-symbols-outlined text-[18px]">play_arrow</span>Mulai Pemeriksaan
                  </motion.button>
                </div>
              </div>
            </FadeInView>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredHistory.map((item, idx) => (
                <FadeInView key={item.id} delay={0.15 + idx * 0.06}>
                  <HistoryCard item={item} onClick={() => navigate('/result', { state: { result: item } })} />
                </FadeInView>
              ))}
            </div>
          )}
        </section>

        {/* Wellness Tips */}
        <section className="mt-4">
          <FadeInView>
            <h2 className="text-[28px] leading-[1.3] font-medium text-[#1a1c1a] mb-1" style={{ fontFamily: "'Newsreader', serif" }}>{"Kotak Peralatan Pemulihan"}</h2>
            <p className="text-[15px] text-[#424843] mb-6">{"Praktik sederhana untuk mendukung kesejahteraanmu."}</p>
          </FadeInView>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {wellnessTips.map((tip, idx) => (
              <FadeInView key={idx} delay={0.1 + idx * 0.1}>
                <HoverCard className="h-full">
                  <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex flex-col gap-4 h-full">
                    <motion.div className={`w-12 h-12 rounded-xl ${tip.bg} flex items-center justify-center`} whileHover={{ rotate: -8, scale: 1.1 }}>
                      <span className={`material-symbols-outlined filled ${tip.color} text-[24px]`}>{tip.icon}</span>
                    </motion.div>
                    <div>
                      <h3 className="text-[18px] font-semibold text-gray-900 mb-2" style={{ fontFamily: "'Newsreader', serif" }}>{tip.title}</h3>
                      <p className="text-[14px] leading-[1.65] text-gray-500">{tip.desc}</p>
                    </div>
                  </div>
                </HoverCard>
              </FadeInView>
            ))}
          </div>
        </section>

        {/* Banner Motivasi */}
        <FadeInView>
          <motion.div className="relative rounded-2xl overflow-hidden mt-4" whileHover={{ scale: 1.005 }}>
            <div className="absolute inset-0 bg-gradient-to-r from-[#456551] via-[#5a8a6c] to-[#456551]" />
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6 p-8 md:p-10">
              <div className="flex items-center gap-5">
                <motion.div className="w-14 h-14 rounded-full bg-white/15 backdrop-blur-sm flex items-center justify-center border border-white/20 shrink-0" animate={{ rotate: [0, 5, 0] }} transition={{ duration: 6, repeat: Infinity }}>
                  <span className="material-symbols-outlined filled text-white text-[28px]">eco</span>
                </motion.div>
                <div>
                  <h3 className="text-[22px] font-semibold text-white mb-1" style={{ fontFamily: "'Newsreader', serif" }}>{'"Kemajuan, bukan kesempurnaan."'}</h3>
                  <p className="text-[14px] text-white/70 leading-relaxed max-w-md">{"Setiap langkah menuju kesadaran adalah kemenangan."}</p>
                </div>
              </div>
              <motion.button onClick={() => navigate('/start')} className="px-6 py-3 bg-white text-[#456551] font-semibold text-sm rounded-full shadow-lg flex items-center gap-2 shrink-0" whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }}>
                <span className="material-symbols-outlined text-[18px]">spa</span>{"Periksa Lagi"}
              </motion.button>
            </div>
          </motion.div>
        </FadeInView>
      </main>

      {/* Footer */}
      <FadeInView>
        <footer className="w-full mt-12 sm:mt-16">
          <div className="max-w-[1280px] mx-auto px-4 sm:px-6 md:px-8">
            <div className="w-full h-px bg-gradient-to-r from-transparent via-[#7c9e87]/30 to-transparent" />
            <div className="py-10 sm:py-14 flex flex-col items-center gap-6">
              <div className="flex items-center gap-2.5">
                <span className="material-symbols-outlined filled text-[#7c9e87] text-[28px]">spa</span>
                <span className="text-[22px] font-semibold text-[#456551] tracking-tight" style={{ fontFamily: "'Newsreader', serif" }}>BurnoutSense</span>
              </div>
              <p className="text-[14px] text-gray-500 text-center max-w-md leading-relaxed">
                Ruang tenang untuk memahami dirimu. Deteksi burnout lebih awal, pulih lebih cepat.
              </p>
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#c7ebd1]/20 border border-[#7c9e87]/10">
                <span className="material-symbols-outlined text-[14px] text-[#7c9e87]">info</span>
                <span className="text-[11px] sm:text-[12px] text-gray-500">Bukan pengganti diagnosis profesional</span>
              </div>
              <p className="text-[12px] text-gray-400 mt-2">© 2025 BurnoutSense · Capstone Project</p>
            </div>
          </div>
        </footer>
      </FadeInView>
    </PageTransition>
  );
}
