import React from 'react';
import { motion } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import { PageTransition } from '../components/PageTransition';

export default function ResultPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { result } = location.state || {};

  if (!result) {
    return (
      <PageTransition className="flex justify-center items-center min-h-screen bg-[#faf9f6]" style={{ fontFamily: "'Manrope', sans-serif" }}>
        <motion.div className="glass-card p-10 rounded-xl text-center max-w-md" initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.5 }}>
          <motion.span className="material-symbols-outlined text-[#727973] text-5xl mb-4 block" animate={{ rotate: [0, 10, -10, 0] }} transition={{ duration: 2, repeat: Infinity }}>search_off</motion.span>
          <p className="text-[#1a1c1a] font-medium mb-6 text-lg">{"Tidak ada hasil ditemukan. Silakan isi kuis terlebih dahulu."}</p>
          <motion.button onClick={() => navigate('/start')} className="px-8 py-3 rounded-full bg-[#456551] text-white font-semibold text-sm shadow-md" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
            {"Ke Dashboard"}
          </motion.button>
        </motion.div>
      </PageTransition>
    );
  }

  const score = result.score || 0;
  const isScan = result.type === 'scan';
  const isHighRisk = score >= 20;
  const isWarning = score >= 10 && score < 20;

  const statusIcon = isHighRisk ? 'warning' : (isWarning ? 'info' : 'check_circle');
  const statusColor = isHighRisk ? '#ba1a1a' : (isWarning ? '#D4A700' : '#456551');
  const statusBg = isHighRisk ? 'bg-[#ffdad6]/50' : (isWarning ? 'bg-[#FFF5D1]' : 'bg-[#c7ebd1]/30');
  const statusBadgeBg = isHighRisk ? 'bg-[#ffdad6]' : (isWarning ? 'bg-[#FFF5D1]' : 'bg-[#c7ebd1]');
  const statusBadgeText = isHighRisk ? 'text-[#93000a]' : (isWarning ? 'text-[#7A6000]' : 'text-[#012111]');

  const title = isHighRisk ? "Risiko Burnout Tinggi" : isWarning ? "Risiko Burnout Sedang" : "Kondisi Sehat / Baik";
  const badgeLabel = isHighRisk ? "Risiko Tinggi" : isWarning ? "Kelelahan Ringan" : "Terkendali";

  const dateObj = result.created_at ? new Date(result.created_at) : new Date();
  const formattedDate = dateObj.toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' });

  const fatiguePercent = Math.min(Math.round((score / 25) * 100), 100);
  const stressPercent = Math.min(Math.round((score / 25) * 75), 100);
  const anxietyPercent = Math.min(Math.round((score / 25) * 50), 100);

  return (
    <PageTransition className="min-h-screen bg-[#faf9f6] flex flex-col items-center justify-center p-4 sm:p-6 relative" style={{ fontFamily: "'Manrope', sans-serif" }}>

      <motion.div className="ambient-shape ambient-1" animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 14, repeat: Infinity }} />
      <motion.div className="ambient-shape ambient-2" animate={{ scale: [1.1, 1, 1.1] }} transition={{ duration: 18, repeat: Infinity }} />

      <motion.div
        initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-2xl glass-card rounded-xl p-5 sm:p-8 md:p-10 flex flex-col gap-6 sm:gap-8 relative z-10"
      >
        {/* Method + Status Badge */}
        <motion.div className="flex items-center justify-between" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <div className="flex items-center gap-2">
            {/* Method badge */}
            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full font-bold text-[11px] tracking-wider uppercase ${
              isScan ? 'bg-[#006a6a]/10 text-[#006a6a]' : 'bg-[#456551]/10 text-[#456551]'
            }`}>
              <span className="material-symbols-outlined text-[12px]">{isScan ? 'photo_camera' : 'description'}</span>
              {isScan ? "Scan Wajah" : "Kuis"}
            </span>
            {/* Status badge */}
            <motion.span
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full ${statusBadgeBg} ${statusBadgeText} font-semibold text-xs tracking-[0.05em]`}
              initial={{ scale: 0.8 }} animate={{ scale: 1 }} transition={{ delay: 0.3, type: 'spring', stiffness: 300 }}
            >
              <motion.span className="w-2 h-2 rounded-full" style={{ backgroundColor: statusColor }} animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 2, repeat: Infinity }} />
              {badgeLabel}
            </motion.span>
          </div>
          <span className="text-sm text-[#727973]">{formattedDate}</span>
        </motion.div>

        {/* Header with Icon */}
        <motion.div className="flex items-start gap-4" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3, duration: 0.5 }}>
          <motion.div className={`w-16 h-16 rounded-full ${statusBg} flex items-center justify-center shrink-0`} initial={{ scale: 0, rotate: -30 }} animate={{ scale: 1, rotate: 0 }} transition={{ delay: 0.4, type: 'spring', stiffness: 200 }}>
            <span className="material-symbols-outlined filled text-3xl" style={{ color: statusColor }}>{statusIcon}</span>
          </motion.div>
          <div>
            <h1 className="text-[24px] sm:text-[36px] leading-[1.3] font-medium mb-2" style={{ fontFamily: "'Newsreader', serif", color: statusColor }}>
              {title}
            </h1>
            <p className="text-[16px] leading-[1.6] text-[#424843]">{result.description}</p>
          </div>
        </motion.div>

        {/* Emotion label — only for scan results */}
        {isScan && result.emotion_label && (
          <motion.div
            className="flex items-center gap-3 px-5 py-4 rounded-xl bg-[#9deded]/10 border border-[#006a6a]/15"
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }}
          >
            <div className="w-10 h-10 rounded-full bg-[#006a6a]/15 flex items-center justify-center">
              <span className="material-symbols-outlined text-[#006a6a]">face</span>
            </div>
            <div>
              <p className="text-xs font-semibold text-[#727973] uppercase tracking-wider">{"Emosi Terdeteksi"}</p>
              <p className="text-lg font-semibold text-[#006a6a] capitalize">{result.emotion_label}</p>
            </div>
          </motion.div>
        )}

        {/* Score Bars */}
        <motion.div className="flex flex-col gap-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
          <div className="flex items-center gap-3 mb-2">
            <span className="material-symbols-outlined text-[#7c9e87] text-2xl">analytics</span>
            <h3 className="text-[24px] leading-[1.4] font-medium text-[#1a1c1a]" style={{ fontFamily: "'Newsreader', serif" }}>
              {"Hasil Analisis"}
            </h3>
          </div>
          {[
            { label: "Lelah (Fatigue)", percent: fatiguePercent, color: '#7c9e87' },
            { label: "Stres (Stress)", percent: stressPercent, color: '#9e90af' },
            { label: "Cemas (Anxiety)", percent: anxietyPercent, color: '#84d4d4' },
          ].map((bar, idx) => (
            <motion.div key={idx} className="flex flex-col gap-1" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6 + idx * 0.12 }}>
              <div className="flex justify-between items-center font-semibold text-sm tracking-[0.05em]">
                <span className="text-[#1a1c1a]">{bar.label}</span>
                <motion.span style={{ color: bar.color }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 + idx * 0.15 }}>{bar.percent}%</motion.span>
              </div>
              <div className="h-3 w-full bg-[#e3e3df] rounded-full overflow-hidden border border-white/30">
                <motion.div className="h-full rounded-full" style={{ backgroundColor: bar.color }} initial={{ width: 0 }} animate={{ width: `${bar.percent}%` }} transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.7 + idx * 0.15 }} />
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div className="w-full h-px bg-[#c2c8c1]/30" initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 1.1, duration: 0.5 }} />

        {/* Recommendations */}
        <motion.div className="bg-[#faf9f6]/50 rounded-lg p-4 border border-[#c2c8c1]/20" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2 }}>
          <h4 className="font-semibold text-sm tracking-[0.05em] text-[#1a1c1a] mb-2 flex items-center gap-2">
            <span className="material-symbols-outlined text-[#456551] text-sm">lightbulb</span>
            {"Wawasan & Rekomendasi"}
          </h4>
          <p className="text-[16px] leading-[1.6] text-[#424843] text-sm">
            {isHighRisk
              ? "Tingkat kelelahan tinggi terdeteksi. Pertimbangkan untuk mengambil hari istirahat penuh dan berkonsultasi dengan profesional."
              : isWarning
                ? "Stres sedang terdeteksi. Pertimbangkan jeda mindfulness 15 menit."
                : "Tingkat stres Anda terlihat sehat. Terus pertahankan keseimbangan!"}
          </p>
        </motion.div>

        {/* Action Buttons */}
        <motion.div className="flex flex-col sm:flex-row gap-3" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.3 }}>
          <motion.button onClick={() => navigate('/history')} className="flex-1 bg-[#e8e8e5] text-[#1a1c1a] font-semibold text-sm tracking-[0.05em] py-3 rounded-xl border border-[#c2c8c1]/30 hover:bg-[#e3e3df] transition-all" whileHover={{ scale: 1.02, y: -2 }} whileTap={{ scale: 0.98 }}>
            {"Lihat Riwayat"}
          </motion.button>
          <motion.button onClick={() => navigate('/start')} className="flex-1 bg-[#456551] text-white font-semibold text-sm tracking-[0.05em] py-3 rounded-xl hover:bg-[#7c9e87] transition-all shadow-md" whileHover={{ scale: 1.02, y: -2 }} whileTap={{ scale: 0.98 }}>
            {"Kembali ke Dashboard"}
          </motion.button>
        </motion.div>
      </motion.div>
    </PageTransition>
  );
}
