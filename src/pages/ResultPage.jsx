import React from 'react';
import { motion } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import { PageTransition } from '../components/PageTransition';
import imgRendah from '../assets/illustrations/rendah.png';
import imgSedang from '../assets/illustrations/sedang.png';
import imgTinggi from '../assets/illustrations/tinggi.png';

export default function ResultPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { result } = location.state || {};

  if (!result) {
    return (
      <PageTransition className="flex justify-center items-center min-h-screen bg-[#faf9f6]" style={{ fontFamily: "'Manrope', sans-serif" }}>
        <div className="bg-white rounded-3xl p-10 text-center max-w-md shadow-sm border border-gray-100">
          <span className="material-symbols-outlined text-gray-400 text-5xl mb-4 block">search_off</span>
          <p className="text-gray-900 font-medium mb-6 text-lg">Tidak ada hasil ditemukan. Silakan isi kuis terlebih dahulu.</p>
          <button onClick={() => navigate('/start')} className="px-8 py-3 rounded-full bg-[#456551] text-white font-semibold text-sm">
            Ke Dashboard
          </button>
        </div>
      </PageTransition>
    );
  }

  // Backend response format:
  // Quiz: { burnout_class (0|1), class_label, topfactor_attributions, class_propabilities: { 0, 1, resultScore } }
  // Scan: { prediction, confidence, face_detected, face_confidence }
  const label = (result.class_label || result.prediction || '').toLowerCase();
  const burnoutClass = result.burnout_class;
  const resultScore = parseFloat(result.class_propabilities?.resultScore) || (result.confidence ? result.confidence * 100 : 0);

  // 2 class: "Burnout" (class 1) dan "Tidak Burnout" (class 0)
  const isHighRisk = burnoutClass === 1 || label === 'burnout' || resultScore >= 60;
  const isWarning = !isHighRisk && (label === 'akan burnout' || label === 'moderate' || (resultScore >= 30 && resultScore < 60));

  const title = isHighRisk ? "Burnout Terdeteksi" : isWarning ? "Risiko Sedang" : "Tidak Burnout";
  const badgeLabel = isHighRisk ? "BURNOUT" : isWarning ? "RISIKO SEDANG" : "TIDAK BURNOUT";
  const badgeColor = isHighRisk ? 'bg-red-50 text-red-600 border-red-200' : isWarning ? 'bg-amber-50 text-amber-600 border-amber-200' : 'bg-green-50 text-[#15803d] border-green-200';
  const illustration = isHighRisk ? imgTinggi : isWarning ? imgSedang : imgRendah;
  const illustrationLabel = isHighRisk ? "BURNOUT DETECTED" : isWarning ? "MODERATE RISK" : "NO BURNOUT";

  // Score bars based on resultScore (0-100)
  const fatiguePercent = Math.min(Math.round(resultScore), 100);
  const stressPercent = Math.min(Math.round(resultScore * 0.75), 100);
  const anxietyPercent = Math.min(Math.round(resultScore * 0.5), 100);

  const description = result.description
    || (isHighRisk
      ? "Burnout terdeteksi. Kondisimu menunjukkan tanda-tanda kelelahan yang signifikan."
      : isWarning
        ? "Kamu menunjukkan tanda-tanda menuju burnout. Perhatikan kondisimu."
        : "Kondisimu terlihat sehat dan seimbang.");

  const recommendation = isHighRisk
    ? "Tingkat kelelahan tinggi terdeteksi. Pertimbangkan untuk mengambil hari istirahat penuh dan berkonsultasi dengan profesional."
    : isWarning
      ? "Tanda-tanda burnout terdeteksi. Pertimbangkan jeda, atur ulang prioritas, dan bicara dengan seseorang yang kamu percaya."
      : "Tingkat stres Anda terlihat sehat. Terus pertahankan keseimbangan dan rutinitas positifmu!";

  // Top factors from backend
  const topFactors = result.topfactor_attributions || [];

  return (
    <PageTransition className="min-h-screen bg-[#faf9f6] flex flex-col items-center justify-center px-4 py-8" style={{ fontFamily: "'Manrope', sans-serif" }}>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-md bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center gap-3 px-6 py-4 border-b border-gray-100">
          <button onClick={() => navigate('/start')} className="w-9 h-9 rounded-full bg-gray-50 flex items-center justify-center hover:bg-gray-100 transition-colors">
            <span className="material-symbols-outlined text-gray-600 text-[20px]">arrow_back</span>
          </button>
          <h1 className="text-lg font-bold text-gray-900" style={{ fontFamily: "'Newsreader', serif" }}>Hasil Analisis</h1>
        </div>

        {/* Content */}
        <div className="px-6 py-8 flex flex-col items-center text-center">
          
          {/* Badge */}
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className={`inline-block px-4 py-1.5 rounded-full text-[11px] font-bold tracking-wider uppercase border ${badgeColor}`}
          >
            {badgeLabel}
          </motion.span>

          {/* Illustration */}
          <motion.div
            className="my-6 w-44 h-44 sm:w-52 sm:h-52"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <img src={illustration} alt={illustrationLabel} className="w-full h-full object-contain" />
          </motion.div>

          {/* Caption under illustration */}
          <p className="text-[10px] text-gray-400 uppercase tracking-widest font-semibold -mt-2 mb-4">{illustrationLabel}</p>

          {/* Title */}
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-[24px] sm:text-[28px] font-bold text-gray-900 mb-2"
            style={{ fontFamily: "'Newsreader', serif" }}
          >
            {title}
          </motion.h2>

          {/* Description */}
          <p className="text-sm text-gray-500 mb-8 max-w-xs">{description}</p>

          {/* Score Bars */}
          <motion.div
            className="w-full flex flex-col gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {[
              { label: "Lelah (Fatigue)", percent: fatiguePercent, color: '#22c55e' },
              { label: "Stres (Stress)", percent: stressPercent, color: '#6366f1' },
              { label: "Cemas (Anxiety)", percent: anxietyPercent, color: '#06b6d4' },
            ].map((bar, idx) => (
              <div key={idx} className="flex flex-col gap-1.5">
                <div className="flex justify-between items-center text-sm font-medium">
                  <span className="text-gray-700">{bar.label}</span>
                  <span className="text-gray-500">{bar.percent}%</span>
                </div>
                <div className="h-2.5 w-full bg-gray-100 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full rounded-full"
                    style={{ backgroundColor: bar.color }}
                    initial={{ width: 0 }}
                    animate={{ width: `${bar.percent}%` }}
                    transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.6 + idx * 0.15 }}
                  />
                </div>
              </div>
            ))}
          </motion.div>

          {/* Recommendations */}
          <motion.div
            className="w-full mt-8 bg-gray-50 rounded-2xl p-5 text-left"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
          >
            <h4 className="font-semibold text-sm text-gray-900 mb-2 flex items-center gap-2">
              <span className="material-symbols-outlined text-[16px] text-red-400">lightbulb</span>
              Wawasan & Rekomendasi
            </h4>
            <p className="text-[13px] leading-[1.7] text-gray-500">
              {recommendation}
            </p>
          </motion.div>
        </div>

        {/* Action Buttons */}
        <div className="px-6 pb-6 flex flex-col gap-3">
          <motion.button
            onClick={() => navigate('/start')}
            className="w-full py-3.5 rounded-full bg-[#456551] text-white font-semibold text-sm hover:bg-[#456551]/90 transition-colors"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1 }}
            whileTap={{ scale: 0.97 }}
          >
            Kembali ke Dashboard
          </motion.button>
          <motion.button
            onClick={() => navigate('/history')}
            className="w-full py-3.5 rounded-full bg-white border border-gray-200 text-gray-700 font-semibold text-sm hover:bg-gray-50 transition-colors"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
            whileTap={{ scale: 0.97 }}
          >
            Lihat Riwayat
          </motion.button>
        </div>
      </motion.div>
    </PageTransition>
  );
}
