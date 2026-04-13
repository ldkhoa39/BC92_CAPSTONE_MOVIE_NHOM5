import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function AdminHeader() {
  const navigate = useNavigate();
  
  // Lấy dữ liệu an toàn
  const getAdminData = () => {
    try {
      return JSON.parse(localStorage.getItem("USER_ADMIN")) || 
             JSON.parse(localStorage.getItem("USER_LOGIN"));
    } catch (e) {
      return null;
    }
  };

  const userAdmin = getAdminData();

  const handleLogout = () => {
    if (window.confirm("Khoa ơi, bạn có chắc chắn muốn đăng xuất không?")) {
      // 1. Xóa sạch dấu vết trong LocalStorage
      localStorage.removeItem("USER_ADMIN");
      localStorage.removeItem("USER_LOGIN");
      
      // 2. Nếu project của Khoa dùng Redux, hãy cân nhắc thêm lệnh reload 
      // để xóa sạch State cũ, tránh trường hợp quay lại trang admin bằng nút Back của trình duyệt
      window.location.href = "/auth"; 
    }
  };

  return (
    <header className="h-16 bg-zinc-950/70 backdrop-blur-xl border-b border-zinc-800 flex items-center justify-between px-4 md:px-8 sticky top-0 z-50">
      
      {/* Breadcrumbs */}
      <div className="flex items-center space-x-2 text-[10px] md:text-sm text-zinc-500">
        <span 
          className="hover:text-blue-500 cursor-pointer transition-colors flex items-center gap-1" 
          onClick={() => navigate('/admin/dashboard')}
        >
          <i className="fa-solid fa-gauge-high"></i> Dashboard
        </span>
        <span className="text-zinc-800">/</span>
        <span className="text-zinc-300 font-medium truncate max-w-[100px] md:max-w-none">
          Quản lý hệ thống
        </span>
      </div>

      <div className="flex items-center space-x-4">
        {/* Info Admin - Desktop */}
        <div className="text-right hidden md:block">
          <p className="text-xs font-black text-zinc-200 uppercase tracking-tighter">
            {userAdmin?.hoTen || "Administrator"}
          </p>
          <p className="text-[9px] text-blue-500 font-black uppercase tracking-[0.2em] leading-none mt-1">
            System {userAdmin?.maLoaiNguoiDung || "Admin"}
          </p>
        </div>
        
        {/* Avatar & Dropdown */}
        <div className="relative group">
          {/* Avatar Button */}
          <button className="w-10 h-10 bg-zinc-800 border border-zinc-700 rounded-xl flex items-center justify-center text-white font-black hover:border-blue-500 hover:bg-zinc-700 transition-all shadow-xl group-hover:scale-95">
            {userAdmin?.hoTen?.charAt(0).toUpperCase() || "K"}
          </button>

          {/* Dropdown Menu - Tinh chỉnh Animation */}
          <div className="absolute right-0 mt-2 w-60 bg-zinc-900/95 backdrop-blur-2xl border border-zinc-800 shadow-[0_20px_50px_rgba(0,0,0,0.5)] rounded-2xl py-2 invisible opacity-0 group-hover:visible group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 z-[60]">
            
            {/* User Profile Header (Mobile & Tablet) */}
            <div className="px-4 py-4 border-b border-zinc-800/50 mb-1">
               <p className="text-sm font-black text-white truncate">{userAdmin?.hoTen || "Admin Khoa"}</p>
               <p className="text-[10px] text-zinc-500 truncate mt-0.5 font-medium">{userAdmin?.email || "khoa.it@example.com"}</p>
            </div>
            
            {/* Menu Items */}
            <div className="px-2 space-y-0.5">
              <button className="w-full text-left px-3 py-2 text-xs font-bold text-zinc-400 hover:bg-blue-600 hover:text-white rounded-lg transition-all flex items-center gap-3">
                <i className="fa-regular fa-user-circle text-base"></i> Hồ sơ cá nhân
              </button>
              
              <button className="w-full text-left px-3 py-2 text-xs font-bold text-zinc-400 hover:bg-zinc-800 hover:text-white rounded-lg transition-all flex items-center gap-3">
                <i className="fa-solid fa-sliders text-base"></i> Cài đặt hệ thống
              </button>
            </div>

            <div className="h-[1px] bg-zinc-800/50 my-2 mx-4" />
            
            {/* Logout Button */}
            <div className="px-2">
              <button 
                onClick={handleLogout}
                className="w-full text-left px-3 py-2.5 text-xs text-red-500 hover:bg-red-500/10 rounded-lg font-black transition-all flex items-center gap-3 uppercase tracking-wider"
              >
                <i className="fa-solid fa-power-off text-base"></i> Đăng xuất
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}