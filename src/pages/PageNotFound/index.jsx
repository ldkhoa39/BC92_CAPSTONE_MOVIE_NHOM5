import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

export default function PageNotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center p-4 text-center font-sans overflow-hidden">
      
      {/* Khối hiệu ứng 404 */}
      <div className="relative animate-fadeIn">
        {/* Chữ 404 khổng lồ chìm phía sau */}
        <h1 className="text-[120px] md:text-[200px] font-black text-zinc-900 tracking-tighter select-none">
          404
        </h1>
        
        {/* Icon cuộn phim phát sáng ở giữa */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="relative">
             <i className="fa-solid fa-film text-6xl md:text-8xl text-red-600 animate-pulse drop-shadow-[0_0_30px_rgba(220,38,38,0.6)]"></i>
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[2px] bg-zinc-950 rotate-45"></div>
          </div>
        </div>
      </div>

      {/* Nội dung thông báo */}
      <div className="space-y-6 mt-[-20px] relative z-10 animate-fadeIn" style={{ animationDelay: '0.2s' }}>
        <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight">
          Oops! Mất kết nối tín hiệu...
        </h2>
        <p className="text-zinc-400 max-w-lg mx-auto text-sm md:text-base leading-relaxed">
          Có vẻ như thông tin bạn đang tìm kiếm đã bị hủy, hoặc không tồn tại trong hệ thống rạp <span className="font-bold text-white italic">BC92<span className="text-red-600">MOVIE</span></span> của chúng tôi.
        </p>

        {/* Cụm nút điều hướng */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
          <button 
            onClick={() => navigate(-1)}
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl border border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:text-white font-bold transition-all flex items-center justify-center gap-2 group"
          >
            <i className="fa-solid fa-arrow-left-long group-hover:-translate-x-1 transition-transform"></i> 
            Quay lại trang trước
          </button>
          
          <NavLink 
            to="/"
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold shadow-lg shadow-red-600/20 transition-all flex items-center justify-center gap-2 group"
          >
            <i className="fa-solid fa-house group-hover:-translate-y-1 transition-transform"></i> 
            Về trang chủ
          </NavLink>
        </div>
      </div>

      {/* Hiệu ứng noise/grain*/}
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-zinc-950/50 to-zinc-950 opacity-80 z-0"></div>
    </div>
  );
}