import React from 'react';
import { motion } from 'framer-motion';
import { HoverCard } from './PageTransition';

// Kartu histori — support tipe kuis & scan
export default function HistoryCard({ item, onClick }) {
  const isQuiz = item.type === 'quiz';
  const dateObj = new Date(item.created_at);
  const formattedDate = dateObj.toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' });
  const formattedTime = dateObj.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });

  const getLevelInfo = (item) => {
    // Backend uses burnout_class (0=Low, 1=Moderate, 2=High) or burnout_label
    const label = (item.burnout_label || '').toLowerCase();
    const cls = item.burnout_class;
    
    let level;
    if (label === 'high' || cls === 2 || (item.score && item.score >= 20)) {
      level = 'high';
    } else if (label === 'moderate' || cls === 1 || (item.score && item.score >= 10)) {
      level = 'moderate';
    } else {
      level = 'low';
    }
    
    if (level === 'high') return { level: 'Tinggi', badgeBg: 'bg-[#ffdad6]', badgeText: 'text-[#93000a]', dotColor: '#ba1a1a', barColor: '#ba1a1a', icon: 'sentiment_stressed', iconBg: 'bg-[#ffdad6]/40', iconColor: 'text-[#ba1a1a]' };
    if (level === 'moderate') return { level: 'Sedang', badgeBg: 'bg-[#FFF5D1]', badgeText: 'text-[#7A6000]', dotColor: '#D4A700', barColor: '#D4A700', icon: 'sentiment_neutral', iconBg: 'bg-[#FFF5D1]/60', iconColor: 'text-[#D4A700]' };
    return { level: 'Rendah', badgeBg: 'bg-[#c7ebd1]', badgeText: 'text-[#012111]', dotColor: '#456551', barColor: '#456551', icon: 'sentiment_satisfied', iconBg: 'bg-[#c7ebd1]/40', iconColor: 'text-[#456551]' };
  };

  const info = getLevelInfo(item);
  // Use confidence_score (0-1) if available, else legacy score (0-25)
  const scorePercent = item.confidence_score
    ? Math.round(item.confidence_score * 100)
    : Math.round(((item.score || 0) / 25) * 100);
  const displayScore = item.confidence_score
    ? `${Math.round(item.confidence_score * 100)}%`
    : `${item.score || 0}/25`;

  return (
    <HoverCard className="h-full">
      <article className="bg-white rounded-2xl p-5 flex flex-col gap-4 h-full group cursor-pointer border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300" onClick={onClick}>
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <motion.div className={`w-11 h-11 rounded-xl ${info.iconBg} ${info.iconColor} flex items-center justify-center`} whileHover={{ rotate: 10, scale: 1.1 }} transition={{ duration: 0.25 }}>
              <span className="material-symbols-outlined text-[22px]">{info.icon}</span>
            </motion.div>
            <div>
              <div className="flex items-center gap-2">
                <p className="font-semibold text-[15px] text-[#1a1c1a] leading-tight">
                  {isQuiz ? "Pemeriksaan Kuis" : "Scan Wajah"}
                </p>
                <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold tracking-wider uppercase ${isQuiz ? 'bg-[#456551]/10 text-[#456551]' : 'bg-[#006a6a]/10 text-[#006a6a]'}`}>
                  <span className="material-symbols-outlined text-[10px]">{isQuiz ? 'description' : 'photo_camera'}</span>
                  {isQuiz ? 'Kuis' : 'Scan'}
                </span>
              </div>
              <p className="text-[13px] text-[#727973]">{formattedDate} · {formattedTime}</p>
            </div>
          </div>
          <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full ${info.badgeBg} ${info.badgeText} font-bold text-[11px] tracking-wider uppercase`}>
            <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: info.dotColor }} />
            {info.level}
          </span>
        </div>

        {!isQuiz && item.emotion_label && (
          <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[#9deded]/10 border border-[#006a6a]/10">
            <span className="material-symbols-outlined text-[#006a6a] text-[16px]">face</span>
            <span className="text-[13px] font-medium text-[#006a6a] capitalize">Emosi: {item.emotion_label}</span>
          </div>
        )}

        <div className="flex flex-col gap-1.5">
          <div className="flex items-baseline justify-between">
            <span className="text-[13px] font-medium text-[#727973]">Skor</span>
            <span className="text-[20px] font-bold text-[#1a1c1a]" style={{ fontFamily: "'Newsreader', serif" }}>
              {displayScore}
            </span>
          </div>
          <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
            <motion.div className="h-full rounded-full" style={{ backgroundColor: info.barColor }} initial={{ width: 0 }} whileInView={{ width: `${scorePercent}%` }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }} />
          </div>
        </div>

        <div className="flex items-center justify-end mt-auto pt-2">
          <span className="text-[#456551] font-semibold text-[13px] flex items-center gap-1 opacity-50 group-hover:opacity-100 transition-all duration-300">
            Lihat Detail
            <span className="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform duration-300">arrow_forward</span>
          </span>
        </div>
      </article>
    </HoverCard>
  );
}
