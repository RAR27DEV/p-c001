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
  // Quiz: { burnout_class (0|1), class_label, topfactor_attributions, class_propabilities: { 0, 1, 2, resultScore } }
  // Scan: { prediction, confidence, face_detected, face_confidence }
  const label = (result.class_label || result.prediction || '').toLowerCase();
  const burnoutClass = result.burnout_class;
  const resultScore = parseFloat(result.class_propabilities?.resultScore) || (result.confidence ? result.confidence * 100 : 0);
  
  // Probability burnout (class 1) — lebih meaningful dari resultScore
  const burnoutProb = parseFloat(result.class_propabilities?.['1']) || result.confidence || 0;
  const burnoutScore = Math.round(burnoutProb * 100);

  // Interpretasi: class 1 dengan prob >= 85% = Burnout (karena class 2 gak pernah muncul dari model)
  const isHighRisk = burnoutClass === 2 || (burnoutClass === 1 && burnoutProb >= 0.85) || label === 'burnout';
  const isWarning = !isHighRisk && (burnoutClass === 1 || label === 'akan burnout');

  const title = isHighRisk ? "Burnout" : isWarning ? "Akan Burnout" : "Tidak Burnout";
  const badgeLabel = isHighRisk ? "BURNOUT" : isWarning ? "AKAN BURNOUT" : "TIDAK BURNOUT";
  const badgeColor = isHighRisk ? 'bg-red-50 text-red-600 border-red-200' : isWarning ? 'bg-amber-50 text-amber-600 border-amber-200' : 'bg-green-50 text-[#15803d] border-green-200';
  const illustration = isHighRisk ? imgTinggi : isWarning ? imgSedang : imgRendah;
  const illustrationLabel = isHighRisk ? "BURNOUT" : isWarning ? "AKAN BURNOUT" : "TIDAK BURNOUT";

  // Top factors from backend
  const topFactors = result.topfactor_attributions || [];

  const description = result.description
    || (isHighRisk
      ? "Burnout terdeteksi. Kondisimu menunjukkan kelelahan yang signifikan."
      : isWarning
        ? "Kamu menunjukkan tanda-tanda menuju burnout. Segera perhatikan kondisimu."
        : "Kondisimu terlihat sehat dan seimbang.");

  const recommendation = isHighRisk
    ? "Burnout terdeteksi. Pertimbangkan untuk mengambil istirahat penuh dan berkonsultasi dengan profesional."
    : isWarning
      ? "Tanda-tanda burnout mulai muncul. Atur ulang prioritas, ambil jeda, dan bicara dengan seseorang yang kamu percaya."
      : "Kondisimu baik. Terus pertahankan keseimbangan dan rutinitas positifmu!";

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

          {/* Top Factors — dari backend */}
          <motion.div
            className="w-full flex flex-col gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <h4 className="text-sm font-semibold text-gray-700 flex items-center gap-1.5 mb-1">
              <span className="material-symbols-outlined text-[16px] text-[#456551]">analytics</span>
              Faktor yang Mempengaruhi
            </h4>
            <p className="text-[11px] text-gray-400 mb-4">Faktor dari jawabanmu yang paling berpengaruh terhadap hasil.</p>
            {topFactors.length > 0 ? (
              topFactors.map((factor, idx) => {
                const absValue = Math.abs(factor.value);
                const percent = Math.min(Math.round(absValue * 100), 100);
                const isNegative = factor.direction === 'increases_burnout';
                const color = isNegative ? '#ef4444' : '#22c55e';
                const labelMap = {
                  stress_score: 'Tingkat Stres',
                  sleep_hours: 'Jam Tidur',
                  work_life_balance: 'Work-Life Balance',
                  manager_support: 'Dukungan Atasan',
                  work_hours_per_week: 'Jam Kerja/Minggu',
                  physical_activity_hrs: 'Aktivitas Fisik',
                  satisfaction_score: 'Kepuasan Kerja',
                  remote_ratio: 'Rasio Remote',
                  years_experience: 'Pengalaman Kerja',
                  age: 'Usia',
                  has_mental_health_support: 'Dukungan Kesehatan Mental',
                  stress_sleep_ratio: 'Rasio Stres-Tidur',
                  work_overload_stress: 'Beban Kerja Berlebih',
                  support_deficit: 'Kurangnya Dukungan',
                  satisfaction_stress_gap: 'Gap Kepuasan-Stres',
                  recovery_score: 'Skor Pemulihan',
                  stress_score_was_imputed: 'Stres (Imputasi)',
                  sleep_hours_was_imputed: 'Tidur (Imputasi)',
                  physical_activity_hrs_was_imputed: 'Aktivitas Fisik (Imputasi)',
                  work_life_balance_was_imputed: 'Work-Life Balance (Imputasi)',
                  manager_support_was_imputed: 'Dukungan Atasan (Imputasi)',
                };
                const displayLabel = labelMap[factor.key] || factor.key.replace(/_/g, ' ');
                const explanation = isNegative
                  ? "Memperburuk kondisi burnout"
                  : "Melindungi dari burnout";
                return (
                  <div key={idx} className="flex flex-col gap-1">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-700 font-medium">{displayLabel}</span>
                      <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${isNegative ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-700'}`}>
                        {isNegative ? '⚠ Penyebab' : '✓ Pelindung'}
                      </span>
                    </div>
                    <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full rounded-full"
                        style={{ backgroundColor: color }}
                        initial={{ width: 0 }}
                        animate={{ width: `${percent}%` }}
                        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.6 + idx * 0.12 }}
                      />
                    </div>
                    <p className="text-[10px] text-gray-400">{explanation}</p>
                  </div>
                );
              })
            ) : (
              <p className="text-xs text-gray-400">Data faktor tidak tersedia untuk hasil ini.</p>
            )}

            {/* Burnout Score — selalu tampil */}
            <div className="mt-2 pt-3 border-t border-gray-100">
                <div className="flex justify-between items-center text-sm mb-1.5">
                  <span className="text-gray-700 font-semibold">Skor Burnout</span>
                  <span className={`font-bold ${isHighRisk ? 'text-red-500' : isWarning ? 'text-amber-500' : 'text-green-600'}`}>{burnoutScore}%</span>
                </div>
                <div className="h-3 w-full bg-gray-100 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full rounded-full"
                    style={{ backgroundColor: isHighRisk ? '#ef4444' : isWarning ? '#f59e0b' : '#22c55e' }}
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min(burnoutScore, 100)}%` }}
                    transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.8 }}
                  />
                </div>
                <p className="text-[11px] text-gray-400 mt-2">
                  {burnoutScore >= 85 
                    ? "Skor sangat tinggi — model AI sangat yakin kamu mengalami burnout."
                    : burnoutScore >= 50
                      ? "Skor menunjukkan kecenderungan burnout. Perhatikan faktor-faktor di atas."
                      : "Skor relatif rendah. Tetap jaga keseimbangan hidupmu."}
                </p>
              </div>
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
