import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const displayName = localStorage.getItem('bs_username') || 'Pengguna';
  const menuRef = useRef(null);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('bs_username');
    navigate('/login');
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav className="glass-nav sticky top-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-8 flex justify-between items-center h-20">
        <div className="flex items-center gap-2 cursor-pointer group" onClick={() => navigate('/start')}>
          <span className="material-symbols-outlined filled text-[#7C9E87] text-[28px] group-hover:rotate-12 transition-transform duration-500">spa</span>
          <span className="text-2xl font-bold tracking-tight text-[#7C9E87]" style={{ fontFamily: "'Newsreader', serif" }}>BurnoutSense</span>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative" ref={menuRef}>
            <button 
              onClick={() => setShowMenu(!showMenu)}
              className="w-10 h-10 rounded-full bg-[#e8e8e5] overflow-hidden border border-white/40 shadow-sm cursor-pointer hover:ring-2 hover:ring-[#7c9e87]/30 transition-all duration-300 flex items-center justify-center"
            >
              <span className="material-symbols-outlined text-[#727973] text-[20px]">person</span>
            </button>

            {showMenu && (
              <div 
                className="absolute right-0 top-14 w-52 rounded-2xl bg-white/90 backdrop-blur-xl border border-white/50 shadow-[0_20px_50px_rgba(0,0,0,0.1)] overflow-hidden z-50"
                style={{ animation: 'fadeSlideDown 0.25s ease-out' }}
              >
                <div className="px-4 py-3 border-b border-[#e3e3df]">
                  <p className="text-sm font-semibold text-[#1a1c1a]">{displayName}</p>
                  <p className="text-xs text-[#727973]">BurnoutSense</p>
                </div>
                <button onClick={() => { navigate('/start'); setShowMenu(false); }} className="w-full flex items-center gap-3 px-4 py-3 text-sm text-[#424843] hover:bg-[#f4f4f0] transition-colors">
                  <span className="material-symbols-outlined text-[18px]">dashboard</span>Dashboard
                </button>
                <button onClick={() => { navigate('/profile'); setShowMenu(false); }} className="w-full flex items-center gap-3 px-4 py-3 text-sm text-[#424843] hover:bg-[#f4f4f0] transition-colors">
                  <span className="material-symbols-outlined text-[18px]">settings</span>Profil
                </button>
                <button onClick={() => { navigate('/history'); setShowMenu(false); }} className="w-full flex items-center gap-3 px-4 py-3 text-sm text-[#424843] hover:bg-[#f4f4f0] transition-colors">
                  <span className="material-symbols-outlined text-[18px]">history</span>Riwayat
                </button>
                <div className="border-t border-[#e3e3df]">
                  <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 text-sm text-[#ba1a1a] hover:bg-[#ffdad6]/30 transition-colors">
                    <span className="material-symbols-outlined text-[18px]">logout</span>Keluar
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
