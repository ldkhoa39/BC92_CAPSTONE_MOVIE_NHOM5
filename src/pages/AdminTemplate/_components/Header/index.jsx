import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function AdminHeader() {
  const navigate = useNavigate();
  
  // Lấy thông tin user để hiển thị tên
  const userAdmin = JSON.parse(localStorage.getItem("USER_ADMIN"));

  const handleLogout = () => {
    if (window.confirm("Bạn có muốn đăng xuất?")) {
      localStorage.removeItem("USER_ADMIN");
      navigate("/auth");
      window.location.reload(); // Reset lại toàn bộ state
    }
  };

  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8 sticky top-0 z-50 shadow-sm">
      
      <div className="flex items-center space-x-2 text-gray-500">
        <span className="hover:text-blue-600 cursor-pointer" onClick={() => navigate('/admin/dashboard')}>Dashboard</span>
        <span>/</span>
        <span className="text-gray-800 font-medium">Quản lý hệ thống rạp chiếu BC92 movice</span>
      </div>

     
      <div className="flex items-center space-x-4">
        <div className="text-right hidden sm:block">
          <p className="text-sm font-bold text-gray-700">{userAdmin?.hoTen || "Admin"}</p>
          <p className="text-xs text-green-600 font-medium">{userAdmin?.maLoaiNguoiDung}</p>
        </div>
        
        {/* Avatar*/}
        <div className="relative group">
          <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold cursor-pointer hover:bg-blue-600 transition shadow-inner">
            {userAdmin?.hoTen?.charAt(0) || "A"}
          </div>

          {/* Dropdown menu khi hover */}
          <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-100 shadow-xl rounded-lg py-2 hidden group-hover:block transition-all animate-fadeIn">
            <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Hồ sơ cá nhân</button>
            <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Cài đặt hệ thống</button>
            <hr className="my-1 border-gray-100" />
            <button 
              onClick={handleLogout}
              className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 font-medium"
            >
              Đăng xuất
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}