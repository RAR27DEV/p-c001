import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { QuizAPI } from '../services/api';
import { PageTransition } from '../components/PageTransition';

export default function QuizPage() {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    QuizAPI.getQuestions().then(res => {
      setQuestions(res.data.questions || res.data);
      setLoading(false);
    });
  }, []);

  const q = questions[current];
  const total = questions.length;
  const progress = total > 0 ? ((current + 1) / total) * 100 : 0;

  const handleAnswer = (value) => { setAnswers({ ...answers, [q.field]: value }); };
  const goNext = () => { if (current < total - 1) { setDirection(1); setCurrent(current + 1); } };
  const goPrev = () => { if (current > 0) { setDirection(-1); setCurrent(current - 1); } };

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      const payload = {
        years_experience: parseInt(answers.years_experience) || 0,
        work_hours_per_week: answers.work_hours_per_week || '',
        remote_ratio: answers.remote_ratio || '',
        satisfaction_score: parseInt(answers.satisfaction_score) || 3,
        stress_score: parseInt(answers.stress_score) || 5,
        work_life_balance: parseInt(answers.work_life_balance) || 5,
        sleep_hours: parseFloat(answers.sleep_hours) || 7,
        physical_activity_hrs: parseFloat(answers.physical_activity_hrs) || 1,
        manager_support: parseInt(answers.manager_support) || 3,
        has_mental_health_support: answers.has_mental_health_support ?? false,
        burnout_class: answers.burnout_class || '',
        source: answers.source || '',
      };
      const res = await QuizAPI.submitResult(payload);
      navigate('/result', { state: { result: res.data } });
    } catch (err) {
      alert("Gagal mengirim. Silakan coba lagi.");
    } finally { setSubmitting(false); }
  };

  const isAnswered = q && answers[q.field] !== undefined && answers[q.field] !== '';
  const isLast = current === total - 1;

  const validateNumber = (val) => {
    if (q.field === 'years_experience') return val >= 0 && val <= 50;
    if (q.field === 'sleep_hours') return val >= 0 && val <= 24;
    if (q.field === 'physical_activity_hrs') return val >= 0 && val <= 100;
    return true;
  };

  if (loading) {
    return (
      <PageTransition className="min-h-screen bg-[#faf9f6] flex flex-col items-center justify-center" style={{ fontFamily: "'Manrope', sans-serif" }}>
        <motion.div className="flex flex-col items-center gap-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <motion.div className="w-12 h-12 border-[3px] border-[#e3e3df] border-t-[#7c9e87] rounded-full" animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }} />
          <p className="text-[#727973] font-medium">Memuat pertanyaan...</p>
        </motion.div>
      </PageTransition>
    );
  }

  return (
    <PageTransition className="min-h-screen bg-[#faf9f6] flex flex-col" style={{ fontFamily: "'Manrope', sans-serif" }}>
      <div className="w-full px-6 py-4 flex items-center justify-between max-w-3xl mx-auto">
        <motion.button onClick={() => navigate('/start')} className="flex items-center gap-2 text-[#727973] hover:text-[#1a1c1a] transition-colors font-medium text-sm" whileHover={{ x: -3 }} whileTap={{ scale: 0.95 }}>
          <span className="material-symbols-outlined text-[20px]">arrow_back</span>Keluar
        </motion.button>
        <span className="text-sm font-semibold text-[#456551] tracking-wide">{current + 1} / {total}</span>
      </div>

      <div className="w-full max-w-3xl mx-auto px-6">
        <div className="h-2 w-full bg-[#e3e3df] rounded-full overflow-hidden">
          <motion.div className="h-full rounded-full bg-gradient-to-r from-[#456551] to-[#7c9e87]" animate={{ width: `${progress}%` }} transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }} />
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-2xl">
          <AnimatePresence mode="wait" custom={direction}>
            {q && (
              <motion.div key={q.id} custom={direction} initial={{ opacity: 0, x: direction * 60, filter: 'blur(4px)' }} animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }} exit={{ opacity: 0, x: -direction * 60, filter: 'blur(4px)' }} transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }} className="flex flex-col gap-8">
                <div>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#c7ebd1]/30 text-[#456551] font-bold text-xs tracking-wider uppercase mb-4">
                    <span className="material-symbols-outlined text-[14px]">quiz</span>{q.id.toUpperCase()}
                  </span>
                  <h2 className="text-[28px] leading-[1.35] font-medium text-[#1a1c1a] mt-3" style={{ fontFamily: "'Newsreader', serif" }}>
                    {q.text_id}
                  </h2>
                </div>

                {q.type === 'number' ? (
                  <div className="relative group max-w-xs">
                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[#727973]/60 group-focus-within:text-[#456551] transition-colors">tag</span>
                    <input type="number" step={q.field === 'sleep_hours' || q.field === 'physical_activity_hrs' ? '0.5' : '1'} min="0" placeholder={q.placeholder_id} value={answers[q.field] ?? ''} onChange={(e) => { const val = e.target.value; if (val === '' || validateNumber(parseFloat(val))) handleAnswer(val); }} className="w-full pl-12 pr-4 py-4 bg-white/60 border-2 border-[#c2c8c1]/40 rounded-2xl text-[18px] text-[#1a1c1a] placeholder:text-[#727973]/40 focus:outline-none focus:border-[#456551] focus:ring-4 focus:ring-[#456551]/10 transition-all duration-300 shadow-sm" />
                  </div>
                ) : (
                  <div className="flex flex-col gap-3">
                    {q.options.map((opt, idx) => {
                      const isSelected = answers[q.field] === opt.value;
                      return (
                        <motion.button key={idx} type="button" onClick={() => handleAnswer(opt.value)} className={`text-left px-5 py-4 rounded-2xl border-2 transition-all duration-300 font-medium text-[15px] flex items-center gap-3 ${isSelected ? 'bg-[#456551] text-white border-[#456551] shadow-[0_4px_16px_rgba(69,101,81,0.2)]' : 'bg-white/60 text-[#1a1c1a] border-[#c2c8c1]/30 hover:border-[#7c9e87] hover:bg-white'}`} whileHover={{ scale: 1.01, x: 4 }} whileTap={{ scale: 0.99 }}>
                          <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 transition-all ${isSelected ? 'border-white bg-white/20' : 'border-[#c2c8c1]'}`}>
                            {isSelected && <div className="w-2.5 h-2.5 rounded-full bg-white" />}
                          </div>
                          <span>{opt.label_id}</span>
                        </motion.button>
                      );
                    })}
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="w-full max-w-2xl mx-auto px-6 pb-8 flex items-center justify-between gap-4">
        <motion.button onClick={goPrev} disabled={current === 0} className="px-5 py-3 rounded-xl font-semibold text-sm text-[#424843] border border-[#c2c8c1]/40 hover:bg-white/50 transition-all disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-2" whileHover={current > 0 ? { scale: 1.02 } : {}} whileTap={current > 0 ? { scale: 0.98 } : {}}>
          <span className="material-symbols-outlined text-[18px]">arrow_back</span>Sebelumnya
        </motion.button>

        {isLast ? (
          <motion.button onClick={handleSubmit} disabled={!isAnswered || submitting} className="px-8 py-3 rounded-xl font-semibold text-sm bg-[#456551] text-white shadow-md hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2" whileHover={isAnswered ? { scale: 1.03, y: -2 } : {}} whileTap={isAnswered ? { scale: 0.97 } : {}}>
            {submitting ? <motion.div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full" animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }} /> : <><span className="material-symbols-outlined text-[18px]">check_circle</span>Kirim Jawaban</>}
          </motion.button>
        ) : (
          <motion.button onClick={goNext} disabled={!isAnswered} className="px-8 py-3 rounded-xl font-semibold text-sm bg-[#456551] text-white shadow-md hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2" whileHover={isAnswered ? { scale: 1.03, y: -2 } : {}} whileTap={isAnswered ? { scale: 0.97 } : {}}>
            Selanjutnya<span className="material-symbols-outlined text-[18px]">arrow_forward</span>
          </motion.button>
        )}
      </div>
    </PageTransition>
  );
}
