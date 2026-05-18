import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { PageTransition } from '../components/PageTransition';
import Navbar from '../components/Navbar';
import { AuthAPI } from '../services/api';

export default function ProfilePage() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState(null);
  const [yearsExperience, setYearsExperience] = useState('');

  const experienceOptions = [1, 2, 3, 5];
  const [customMode, setCustomMode] = useState(false);

  // Fetch profile saat mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await AuthAPI.getProfile();
        const data = res.data.data || res.data;
        setProfile(data);
        const yrs = String(data.years_experience || '');
        setYearsExperience(yrs);
        setCustomMode(!experienceOptions.includes(parseInt(yrs)));
      } catch (err) {
        setError("Gagal memuat profil");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleSave = async () => {
    if (!yearsExperience || parseInt(yearsExperience) < 0) return;
    setSaving(true);
    setError(null);
    try {
      await AuthAPI.updateProfile({ years_experience: parseInt(yearsExperience) });
      localStorage.setItem('bs_years_experience', yearsExperience);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch (err) {
      setError(err?.response?.data?.message || "Gagal menyimpan");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <PageTransition className="min-h-screen bg-[#faf9f6] flex flex-col" style={{ fontFamily: "'Manrope', sans-serif" }}>
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <motion.div className="w-12 h-12 border-[3px] border-gray-200 border-t-[#456551] rounded-full" animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }} />
        </div>
      </PageTransition>
    );
  }

  return (
    <PageTransition className="min-h-screen bg-[#faf9f6] flex flex-col" style={{ fontFamily: "'Manrope', sans-serif" }}>
      <Navbar />

      <main className="max-w-lg mx-auto px-4 sm:px-6 py-8 sm:py-12 w-full">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <button onClick={() => navigate('/start')} className="w-9 h-9 rounded-full bg-gray-50 flex items-center justify-center hover:bg-gray-100 transition-colors">
            <span className="material-symbols-outlined text-gray-600 text-[20px]">arrow_back</span>
          </button>
          <h1 className="text-[24px] sm:text-[28px] font-bold text-gray-900" style={{ fontFamily: "'Newsreader', serif" }}>Profil</h1>
        </div>

        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-sm space-y-5">
          {/* Username */}
          <div>
            <label className="block font-semibold text-sm text-gray-700 mb-2 flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[16px] text-[#456551]">person</span>Nama Pengguna
            </label>
            <div className="px-4 py-3 bg-gray-50 rounded-2xl text-sm text-gray-600 border border-gray-100">
              {profile?.username || '—'}
            </div>
          </div>

          {/* Age */}
          <div>
            <label className="block font-semibold text-sm text-gray-700 mb-2 flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[16px] text-[#456551]">cake</span>Usia
            </label>
            <div className="px-4 py-3 bg-gray-50 rounded-2xl text-sm text-gray-600 border border-gray-100">
              {profile?.age || '—'} tahun
            </div>
          </div>

          {/* Gender */}
          <div>
            <label className="block font-semibold text-sm text-gray-700 mb-2 flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[16px] text-[#456551]">wc</span>Jenis Kelamin
            </label>
            <div className="px-4 py-3 bg-gray-50 rounded-2xl text-sm text-gray-600 border border-gray-100">
              {profile?.gender || '—'}
            </div>
          </div>

          {/* Job Role */}
          <div>
            <label className="block font-semibold text-sm text-gray-700 mb-2 flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[16px] text-[#456551]">work</span>Peran Pekerjaan
            </label>
            <div className="px-4 py-3 bg-gray-50 rounded-2xl text-sm text-gray-600 border border-gray-100">
              {profile?.job_role || '—'}
            </div>
          </div>

          {/* Years Experience (editable) */}
          <div>
            <label className="block font-semibold text-sm text-gray-700 mb-2 flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[16px] text-[#456551]">trending_up</span>Pengalaman Kerja (tahun)
            </label>
            <div className="grid grid-cols-4 gap-2">
              {experienceOptions.map((yr) => {
                const isSelected = !customMode && parseInt(yearsExperience) === yr;
                return (
                  <motion.button
                    key={yr}
                    type="button"
                    onClick={() => { setYearsExperience(String(yr)); setCustomMode(false); }}
                    className={`py-2.5 rounded-xl border-2 font-semibold text-sm transition-all duration-200 ${isSelected ? 'bg-[#456551] text-white border-[#456551] shadow-md' : 'bg-white text-gray-700 border-gray-200 hover:border-[#7c9e87]'}`}
                    whileTap={{ scale: 0.93 }}
                  >
                    {yr}
                  </motion.button>
                );
              })}
            </div>
            <motion.button
              type="button"
              onClick={() => { setCustomMode(true); setYearsExperience(''); }}
              className={`mt-2 w-full py-2.5 rounded-xl border-2 border-dashed font-medium text-sm flex items-center justify-center gap-2 transition-all ${customMode ? 'bg-[#456551] text-white border-[#456551]' : 'bg-white text-[#456551] border-[#7c9e87]/50 hover:border-[#456551]'}`}
              whileTap={{ scale: 0.98 }}
            >
              <span className="material-symbols-outlined text-[16px]">edit</span>Lainnya (isi manual)
            </motion.button>
            {customMode && (
              <div className="mt-2 relative group">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#456551] transition-colors">tag</span>
                <input
                  type="number"
                  min="0"
                  max="50"
                  autoFocus
                  placeholder="Jumlah tahun (contoh: 4)"
                  value={yearsExperience}
                  onChange={e => setYearsExperience(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-[#E8F0FE] border-transparent rounded-2xl text-sm text-gray-900 placeholder:text-gray-400 focus:bg-white focus:border-[#456551] focus:ring-2 focus:ring-[#456551]/20 transition-all"
                />
              </div>
            )}
          </div>

          {error && (
            <div className="px-4 py-3 rounded-xl bg-red-50 text-red-600 text-sm border border-red-100">
              {error}
            </div>
          )}

          {/* Save Button */}
          <motion.button
            onClick={handleSave}
            disabled={saving}
            className="w-full py-3.5 bg-[#456551] text-white rounded-2xl font-semibold text-sm hover:bg-[#456551]/90 transition-colors flex items-center justify-center gap-2 disabled:opacity-70"
            whileTap={{ scale: 0.97 }}
          >
            {saving ? (
              <motion.div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full" animate={{ rotate: 360 }} transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }} />
            ) : saved ? (
              <>
                <span className="material-symbols-outlined text-[18px]">check</span>Tersimpan!
              </>
            ) : (
              <>
                <span className="material-symbols-outlined text-[18px]">save</span>Simpan Perubahan
              </>
            )}
          </motion.button>
        </div>

        <p className="text-center text-xs text-gray-400 mt-6">
          Saat ini hanya pengalaman kerja yang bisa diubah.
        </p>
      </main>
    </PageTransition>
  );
}
