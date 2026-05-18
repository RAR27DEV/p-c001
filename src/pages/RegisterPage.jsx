import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { AuthAPI } from '../services/api';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.05 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 14, filter: 'blur(4px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } }
};

const stepVariants = {
  enter: (dir) => ({ opacity: 0, x: dir > 0 ? 30 : -30, filter: 'blur(4px)' }),
  center: { opacity: 1, x: 0, filter: 'blur(0px)', transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] } },
  exit: (dir) => ({ opacity: 0, x: dir > 0 ? -30 : 30, filter: 'blur(4px)', transition: { duration: 0.2 } }),
};

export default function RegisterPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(1);
  const [form, setForm] = useState({ username: '', password: '', age: '', gender: '', job_role: '', years_experience: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [customAge, setCustomAge] = useState(false);
  const [customJobRole, setCustomJobRole] = useState(false);
  const [customExperience, setCustomExperience] = useState(false);

  const ageOptions = [18, 21, 25, 30, 35, 40, 45, 50];
  const experienceOptions = [1, 2, 3, 5];

  const genderOptions = [
    { value: 'Male', label: 'Laki-laki', icon: 'man' },
    { value: 'Female', label: 'Perempuan', icon: 'woman' },
    { value: 'Non-binary', label: 'Non-biner', icon: 'transgender' },
    { value: 'Prefer not to say', label: 'Lainnya', icon: 'more_horiz' },
  ];

  const jobRoleOptions = [
    { value: 'Analyst', label: 'Analyst', icon: 'analytics' },
    { value: 'Engineer', label: 'Engineer', icon: 'code' },
    { value: 'Developer', label: 'Developer', icon: 'integration_instructions' },
    { value: 'Manager', label: 'Manager', icon: 'supervisor_account' },
    { value: 'Sales', label: 'Sales', icon: 'storefront' },
    { value: 'HR', label: 'HR', icon: 'badge' },
  ];

  const validateStep1 = () => {
    const e = {};
    if (!form.username.trim()) e.username = 'Nama pengguna wajib diisi';
    if (form.password.length < 6) e.password = 'Minimal 6 karakter';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const validateStep2 = () => {
    const e = {};
    if (!form.age || parseInt(form.age) < 1) e.age = 'Usia harus valid';
    if (!form.gender) e.gender = 'Pilih jenis kelamin';
    if (!form.job_role) e.job_role = 'Pilih peran pekerjaan';
    if (!form.years_experience || parseInt(form.years_experience) < 0) e.years_experience = 'Pengalaman kerja harus valid';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleNext = () => { if (validateStep1()) { setDirection(1); setStep(2); } };
  const handleBack = () => { setDirection(-1); setStep(1); };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!validateStep2()) return;
    setLoading(true);
    try {
      await AuthAPI.register(form.username, form.password, parseInt(form.age), form.gender, form.job_role, parseInt(form.years_experience));
      await AuthAPI.login(form.username, form.password);
      localStorage.setItem('bs_years_experience', form.years_experience);
      navigate('/start');
    } catch (err) {
      alert(err?.response?.data?.message || "Pendaftaran gagal.");
    } finally { setLoading(false); }
  };

  const inputClass = "w-full pl-12 pr-4 py-3 sm:py-3.5 bg-[#E8F0FE] border-transparent rounded-2xl text-sm text-[#1a1c1a] placeholder:text-gray-400 focus:bg-white focus:border-[#456551] focus:ring-2 focus:ring-[#456551]/20 transition-all shadow-sm";

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="p-6 sm:p-8 md:p-10 rounded-3xl bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)]"
    >
        {/* Logo mobile */}
        <motion.div variants={itemVariants} className="flex lg:hidden justify-center items-center gap-2 mb-6">
          <span className="material-symbols-outlined filled text-[#456551] text-2xl">spa</span>
          <span className="text-2xl text-[#1a1c1a] tracking-tight" style={{ fontFamily: "'Newsreader', serif" }}>BurnoutSense</span>
        </motion.div>

        {/* Header */}
        <motion.div variants={itemVariants} className="text-center mb-5">
          <h1 className="text-[26px] sm:text-[32px] leading-[1.3] font-medium text-[#1a1c1a] mb-2" style={{ fontFamily: "'Newsreader', serif" }}>{step === 1 ? "Buat Akun" : "Profil Kamu"}</h1>
          <p className="text-[13px] sm:text-[15px] leading-[1.6] text-[#424843]">{step === 1 ? "Siapkan kredensial login kamu." : "Ceritakan sedikit tentang dirimu."}</p>
        </motion.div>

        {/* Step indicator */}
        <motion.div variants={itemVariants} className="flex items-center justify-center gap-3 mb-5 sm:mb-6 px-1">
          {[1, 2].map((s) => (
            <div key={s} className="flex items-center gap-2 flex-1">
              <motion.div
                className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs sm:text-sm font-bold leading-none transition-all duration-300 ${step >= s ? 'bg-[#456551] text-white' : 'bg-[#e3e3df] text-[#727973]'}`}
                animate={step >= s ? { scale: [1, 1.08, 1] } : {}}
                transition={{ duration: 0.3 }}
              >
                {s}
              </motion.div>
              <span className={`text-xs font-semibold tracking-wide transition-colors hidden sm:inline ${step >= s ? 'text-[#456551]' : 'text-[#727973]'}`}>{s === 1 ? 'Akun' : 'Profil'}</span>
              {s === 1 && (
                <div className="flex-1 h-0.5 rounded-full overflow-hidden bg-[#e3e3df]">
                  <motion.div className="h-full bg-[#456551] rounded-full" animate={{ width: step >= 2 ? '100%' : '0%' }} transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }} />
                </div>
              )}
            </div>
          ))}
        </motion.div>

        {/* Tab Masuk / Daftar */}
        <motion.div variants={itemVariants} className="flex p-1 bg-gray-50 rounded-2xl mb-5 sm:mb-6">
          <button onClick={() => navigate('/login')} className="flex-1 flex items-center justify-center gap-2 py-3 text-sm font-medium text-gray-500 hover:text-gray-800 transition-all">
            <span className="material-symbols-outlined text-[18px]">login</span>Masuk
          </button>
          <button className="flex-1 flex items-center justify-center gap-2 py-3 bg-white rounded-xl shadow-sm text-sm font-medium text-gray-800 transition-all">
            <span className="material-symbols-outlined text-[18px] text-[#456551]">person_add</span>Daftar
          </button>
        </motion.div>

        {/* Form */}
        <form onSubmit={step === 2 ? handleRegister : (e) => { e.preventDefault(); handleNext(); }}>
          <AnimatePresence mode="wait" custom={direction}>
            {step === 1 && (
              <motion.div key="step1" custom={direction} variants={stepVariants} initial="enter" animate="center" exit="exit" className="space-y-4">
                <div>
                  <label className="block font-semibold text-sm tracking-[0.05em] text-[#1a1c1a] mb-1.5 ml-1">Nama Pengguna</label>
                  <div className="relative group">
                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[#727973]/60 group-focus-within:text-[#456551] transition-colors">person</span>
                    <input type="text" placeholder="Pilih nama pengguna" value={form.username} onChange={e => setForm({ ...form, username: e.target.value })} className={inputClass} />
                  </div>
                  {errors.username && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xs text-[#ba1a1a] mt-1 ml-1">{errors.username}</motion.p>}
                </div>
                <div>
                  <label className="block font-semibold text-sm tracking-[0.05em] text-[#1a1c1a] mb-1.5 ml-1">Kata Sandi (Min 6)</label>
                  <div className="relative group">
                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[#727973]/60 group-focus-within:text-[#456551] transition-colors">lock</span>
                    <input type={showPassword ? 'text' : 'password'} placeholder="••••••••" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} className={inputClass + " !pr-12"} />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#727973]/60 hover:text-[#1a1c1a] transition-colors">
                      <span className="material-symbols-outlined text-[20px]">{showPassword ? 'visibility' : 'visibility_off'}</span>
                    </button>
                  </div>
                  {errors.password && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xs text-[#ba1a1a] mt-1 ml-1">{errors.password}</motion.p>}
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div key="step2" custom={direction} variants={stepVariants} initial="enter" animate="center" exit="exit" className="space-y-4">
                {/* Usia */}
                <div>
                  <label className="block font-semibold text-sm tracking-[0.05em] text-[#1a1c1a] mb-2 ml-1 flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[16px] text-[#456551]">cake</span>Usia
                  </label>
                  <div className="grid grid-cols-4 gap-2">
                    {ageOptions.map((age) => {
                      const isSelected = !customAge && parseInt(form.age) === age;
                      return (
                        <motion.button key={age} type="button" onClick={() => { setForm({ ...form, age: String(age) }); setCustomAge(false); }} className={`py-2 sm:py-2.5 rounded-xl border-2 font-semibold text-xs sm:text-sm transition-all duration-200 ${isSelected ? 'bg-[#456551] text-white border-[#456551] shadow-md' : 'bg-white/60 text-[#1a1c1a] border-[#c2c8c1]/30 hover:border-[#7c9e87] hover:bg-white'}`} whileTap={{ scale: 0.93 }}>
                          {age}
                        </motion.button>
                      );
                    })}
                  </div>
                  <motion.button type="button" onClick={() => { setCustomAge(true); setForm({ ...form, age: '' }); }} className={`mt-2 w-full py-2 sm:py-2.5 rounded-xl border-2 border-dashed font-medium text-xs sm:text-sm flex items-center justify-center gap-2 transition-all ${customAge ? 'bg-[#456551] text-white border-[#456551]' : 'bg-white/40 text-[#456551] border-[#7c9e87]/50 hover:border-[#456551]'}`} whileTap={{ scale: 0.98 }}>
                    <span className="material-symbols-outlined text-[16px]">edit</span>Lainnya
                  </motion.button>
                  <AnimatePresence>
                    {customAge && (
                      <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="mt-2 overflow-hidden">
                        <div className="relative group">
                          <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[#727973]/60 group-focus-within:text-[#456551] transition-colors">tag</span>
                          <input type="number" min="1" max="120" autoFocus placeholder="Usia (contoh: 24)" value={form.age} onChange={e => setForm({ ...form, age: e.target.value })} className={inputClass} />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                  {errors.age && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xs text-[#ba1a1a] mt-1 ml-1">{errors.age}</motion.p>}
                </div>

                {/* Jenis Kelamin */}
                <div>
                  <label className="block font-semibold text-sm tracking-[0.05em] text-[#1a1c1a] mb-2 ml-1 flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[16px] text-[#456551]">wc</span>Jenis Kelamin
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {genderOptions.map((opt) => {
                      const isSelected = form.gender === opt.value;
                      return (
                        <motion.button key={opt.value} type="button" onClick={() => setForm({ ...form, gender: opt.value })} className={`py-2.5 sm:py-3 px-2 rounded-xl border-2 font-medium text-[11px] sm:text-xs flex flex-col items-center gap-1 transition-all duration-200 ${isSelected ? 'bg-[#456551] text-white border-[#456551] shadow-md' : 'bg-white/60 text-[#1a1c1a] border-[#c2c8c1]/30 hover:border-[#7c9e87] hover:bg-white'}`} whileTap={{ scale: 0.93 }}>
                          <span className="material-symbols-outlined text-[20px] sm:text-[22px]">{opt.icon}</span>
                          <span>{opt.label}</span>
                        </motion.button>
                      );
                    })}
                  </div>
                  {errors.gender && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xs text-[#ba1a1a] mt-1 ml-1">{errors.gender}</motion.p>}
                </div>

                {/* Peran Pekerjaan */}
                <div>
                  <label className="block font-semibold text-sm tracking-[0.05em] text-[#1a1c1a] mb-2 ml-1 flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[16px] text-[#456551]">work</span>Peran Pekerjaan
                  </label>
                  <div className="flex flex-col gap-2">
                    {jobRoleOptions.map((opt) => {
                      const isSelected = !customJobRole && form.job_role === opt.value;
                      return (
                        <motion.button key={opt.value} type="button" onClick={() => { setForm({ ...form, job_role: opt.value }); setCustomJobRole(false); }} className={`px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl border-2 font-medium text-xs sm:text-sm text-left flex items-center gap-2 sm:gap-3 transition-all duration-200 ${isSelected ? 'bg-[#456551] text-white border-[#456551] shadow-md' : 'bg-white/60 text-[#1a1c1a] border-[#c2c8c1]/30 hover:border-[#7c9e87] hover:bg-white'}`} whileHover={{ x: 3 }} whileTap={{ scale: 0.98 }}>
                          <span className={`material-symbols-outlined text-[18px] sm:text-[20px] ${isSelected ? 'text-white' : 'text-[#456551]'}`}>{opt.icon}</span>
                          <span>{opt.label}</span>
                        </motion.button>
                      );
                    })}
                  </div>
                  <motion.button
                    type="button"
                    onClick={() => { setCustomJobRole(true); setForm({ ...form, job_role: '' }); }}
                    className={`mt-2 w-full py-2.5 sm:py-3 rounded-xl border-2 border-dashed font-medium text-xs sm:text-sm flex items-center justify-center gap-2 transition-all ${customJobRole ? 'bg-[#456551] text-white border-[#456551]' : 'bg-white/40 text-[#456551] border-[#7c9e87]/50 hover:border-[#456551]'}`}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="material-symbols-outlined text-[16px]">edit</span>Lainnya (isi manual)
                  </motion.button>
                  <AnimatePresence>
                    {customJobRole && (
                      <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="mt-2 overflow-hidden">
                        <div className="relative group">
                          <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[#727973]/60 group-focus-within:text-[#456551] transition-colors">work</span>
                          <input type="text" autoFocus placeholder="Ketik peran pekerjaanmu" value={form.job_role} onChange={e => setForm({ ...form, job_role: e.target.value })} className={inputClass} />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                  {errors.job_role && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xs text-[#ba1a1a] mt-1 ml-1">{errors.job_role}</motion.p>}
                </div>

                {/* Pengalaman Kerja */}
                <div>
                  <label className="block font-semibold text-sm tracking-[0.05em] text-[#1a1c1a] mb-2 ml-1 flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[16px] text-[#456551]">trending_up</span>Pengalaman Kerja (tahun)
                  </label>
                  <div className="grid grid-cols-4 gap-2">
                    {experienceOptions.map((yr) => {
                      const isSelected = !customExperience && parseInt(form.years_experience) === yr;
                      return (
                        <motion.button key={yr} type="button" onClick={() => { setForm({ ...form, years_experience: String(yr) }); setCustomExperience(false); }} className={`py-2 sm:py-2.5 rounded-xl border-2 font-semibold text-xs sm:text-sm transition-all duration-200 ${isSelected ? 'bg-[#456551] text-white border-[#456551] shadow-md' : 'bg-white/60 text-[#1a1c1a] border-[#c2c8c1]/30 hover:border-[#7c9e87] hover:bg-white'}`} whileTap={{ scale: 0.93 }}>
                          {yr}
                        </motion.button>
                      );
                    })}
                  </div>
                  <motion.button type="button" onClick={() => { setCustomExperience(true); setForm({ ...form, years_experience: '' }); }} className={`mt-2 w-full py-2 sm:py-2.5 rounded-xl border-2 border-dashed font-medium text-xs sm:text-sm flex items-center justify-center gap-2 transition-all ${customExperience ? 'bg-[#456551] text-white border-[#456551]' : 'bg-white/40 text-[#456551] border-[#7c9e87]/50 hover:border-[#456551]'}`} whileTap={{ scale: 0.98 }}>
                    <span className="material-symbols-outlined text-[16px]">edit</span>Lainnya (isi manual)
                  </motion.button>
                  <AnimatePresence>
                    {customExperience && (
                      <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="mt-2 overflow-hidden">
                        <div className="relative group">
                          <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[#727973]/60 group-focus-within:text-[#456551] transition-colors">tag</span>
                          <input type="number" min="0" max="50" autoFocus placeholder="Jumlah tahun (contoh: 4)" value={form.years_experience} onChange={e => setForm({ ...form, years_experience: e.target.value })} className={inputClass} />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                  {errors.years_experience && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xs text-[#ba1a1a] mt-1 ml-1">{errors.years_experience}</motion.p>}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Action buttons */}
          <div className="flex gap-3 pt-5">
            {step === 2 && (
              <motion.button type="button" onClick={handleBack} className="flex-1 py-3 sm:py-3.5 border border-[#c2c8c1]/50 rounded-xl font-semibold text-sm text-[#424843] hover:bg-white/50 transition-all flex items-center justify-center gap-2" whileTap={{ scale: 0.97 }}>
                <span className="material-symbols-outlined text-[18px]">arrow_back</span>Kembali
              </motion.button>
            )}
            <motion.button type="submit" disabled={loading} className={`${step === 1 ? 'w-full' : 'flex-1'} py-3 sm:py-3.5 bg-[#456551] text-white rounded-2xl font-semibold text-[14px] sm:text-[15px] tracking-wide hover:bg-[#456551]/90 transition-all duration-300 flex justify-center items-center gap-2 group relative overflow-hidden disabled:opacity-70`} whileTap={{ scale: 0.97 }} whileHover={{ scale: 1.01, y: -1 }}>
              {loading ? (
                <motion.div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full" animate={{ rotate: 360 }} transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }} />
              ) : (
                <>
                  <span>{step === 1 ? "Lanjut — Profil" : "Daftar Sekarang"}</span>
                  <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform duration-300">{step === 1 ? 'arrow_forward' : 'check'}</span>
                </>
              )}
            </motion.button>
          </div>
        </form>

        {/* Link ke login */}
      </motion.div>
  );
}
