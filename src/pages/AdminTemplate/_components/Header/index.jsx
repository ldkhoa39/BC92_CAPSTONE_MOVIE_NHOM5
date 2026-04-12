import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function AdminHeader() {
  const navigate = useNavigate();
  
  // Lấy thông tin user (Ưu tiên lấy từ localStorage giống logic cũ của bạn)
  const userAdmin = JSON.parse(localStorage.getItem("USER_ADMIN"));

  const handleLogout = () => {
    if (window.confirm("Khoa ơi, bạn có chắc muốn đăng xuất không?")) {
      localStorage.removeItem("USER_ADMIN");
      // Thay vì reload, mình navigate về auth để trải nghiệm mượt hơn
      navigate("/auth");
      // Nếu project dùng Redux, hãy dispatch action clear data ở đây
    }
  };

  return (
    <header className="h-16 bg-zinc-900/50 backdrop-blur-md border-b border-zinc-800 flex items-center justify-between px-4 md:px-8 sticky top-0 z-40">
      
      {/* Breadcrumbs - Tối ưu cho mobile */}
      <div className="flex items-center space-x-2 text-xs md:text-sm text-zinc-500 overflow-hidden whitespace-nowrap">
        <span 
          className="hover:text-red-500 cursor-pointer transition-colors" 
          onClick={() => navigate('/admin/dashboard')}
        >
          Dashboard
        </span>
        <span className="text-zinc-700">/</span>
        <span className="text-zinc-300 font-medium truncate">Quản lý hệ thống BC92</span>
      </div>

      <div className="flex items-center space-x-4">
        {/* Info Admin */}
        <div className="text-right hidden md:block">
          <p className="text-sm font-bold text-zinc-200">{userAdmin?.hoTen || "Quản trị viên"}</p>
          <p className="text-[10px] text-green-500 font-bold uppercase tracking-wider">{userAdmin?.maLoaiNguoiDung}</p>
        </div>
        
        {/* Avatar & Dropdown */}
        <div className="relative group">
          <div className="w-10 h-10 bg-gradient-to-tr from-red-600 to-orange-500 rounded-xl flex items-center justify-center text-white font-black cursor-pointer shadow-lg shadow-red-600/20 hover:scale-105 transition-transform">
            {userAdmin?.hoTen?.charAt(0).toUpperCase() || "A"}
          </div>

          {/* Dropdown menu */}
          <div className="absolute right-0 mt-3 w-56 bg-zinc-900 border border-zinc-800 shadow-2xl rounded-2xl py-2 hidden group-hover:block animate-fadeIn">
            <div className="px-4 py-3 border-b border-zinc-800 md:hidden">
               <p className="text-sm font-bold text-white">{userAdmin?.hoTen}</p>
               <p className="text-xs text-zinc-500">{userAdmin?.email}</p>
            </div>
            
            <button className="w-full text-left px-4 py-2.5 text-sm text-zinc-400 hover:bg-zinc-800 hover:text-white transition-colors flex items-center gap-2">
              <i className="fa-regular fa-circle-user"></i> Hồ sơ cá nhân
            </button>
            <button className="w-full text-left px-4 py-2.5 text-sm text-zinc-400 hover:bg-zinc-800 hover:text-white transition-colors flex items-center gap-2">
              <i className="fa-solid fa-gear"></i> Cài đặt
            </button>
            
            <div className="h-[1px] bg-zinc-800 my-1 mx-2" />
            
            <button 
              onClick={handleLogout}
              className="w-full text-left px-4 py-2.5 text-sm text-red-500 hover:bg-red-500/10 font-bold transition-colors flex items-center gap-2"
            >
              <i className="fa-solid fa-arrow-right-from-bracket"></i> Đăng xuất
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}