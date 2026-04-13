import React, { useState } from 'react'; // Thêm useState
import { useSelector } from 'react-redux';
import { Outlet, Navigate, NavLink } from 'react-router-dom';
import AdminHeader from './_components/Header';
import AdminFooter from './_components/Footer';

export default function AdminTemplate() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State đóng mở mobile menu
  const { data } = useSelector((state) => state.authReducer);

  // Hàm helper để style cho NavLink
  const navLinkClass = ({ isActive }) => 
    `flex items-center gap-3 p-3 rounded-lg transition-all ${
      isActive ? "bg-red-600 text-white" : "text-gray-400 hover:bg-gray-700 hover:text-white"
    }`;

  if (!data) {
    return <Navigate to="/login" />; // Chuyển về login nếu chưa có data
  }

  if (data.maLoaiNguoiDung !== "QuanTri") {
    alert("Bạn không có quyền truy cập vào trang Admin!");
    return <Navigate to="/" />;
  }

  return (
    <div className="flex min-h-screen bg-zinc-950 text-white relative">
      
      {/* OVERLAY: Chỉ hiện trên mobile khi mở sidebar để che phần nội dung */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      {/* SIDEBAR */}
      <aside className={`
        fixed md:static inset-y-0 left-0 z-50 w-64 bg-zinc-900 border-r border-zinc-800 transform transition-transform duration-300 ease-in-out
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} 
        md:translate-x-0 flex flex-col
      `}>
        <div className="p-6 border-b border-zinc-800 flex justify-between items-center">
          <h2 className="font-black text-xl italic tracking-tighter">
            BC92<span className="text-red-600">ADMIN</span>
          </h2>
          {/* Nút đóng sidebar trên mobile */}
          <button className="md:hidden text-gray-400" onClick={() => setIsSidebarOpen(false)}>
            <i className="fa-solid fa-xmark text-xl"></i>
          </button>
        </div>

        <nav className="p-4 flex-1">
          <ul className="space-y-2">
            <li>
              <NavLink to="/admin/dashboard" className={navLinkClass} onClick={() => setIsSidebarOpen(false)}>
                <i className="fa-solid fa-chart-pie w-5"></i> Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink to="/admin/films" className={navLinkClass} onClick={() => setIsSidebarOpen(false)}>
                <i className="fa-solid fa-film w-5"></i> Quản lý phim
              </NavLink>
            </li>
            <li>
              <NavLink to="/admin/user" className={navLinkClass} onClick={() => setIsSidebarOpen(false)}>
                <i className="fa-solid fa-user-plus w-5"></i> Quản lý người dùng
              </NavLink>
            </li>
          </ul>
        </nav>

        <div className="p-4 border-t border-zinc-800">
          <NavLink to="/" className="text-gray-500 hover:text-white text-sm flex items-center gap-2 transition-colors">
            <i className="fa-solid fa-arrow-left"></i> Quay lại Home
          </NavLink>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 border-b border-zinc-800 bg-zinc-900/50 backdrop-blur-md sticky top-0 z-30 flex items-center px-4">
          {/* Nút mở sidebar trên mobile */}
          <button 
            className="p-2 md:hidden text-gray-400 hover:bg-zinc-800 rounded-lg mr-2"
            onClick={() => setIsSidebarOpen(true)}
          >
            <i className="fa-solid fa-bars-staggered text-xl"></i>
          </button>
          
          <div className="flex-1">
             <AdminHeader/>
          </div>
        </header>
        
        <main className="p-4 md:p-8 overflow-x-hidden">
          <div className="max-w-6xl mx-auto">
            <Outlet />
          </div>
        </main>
        
        <AdminFooter/>
      </div>
    </div>
  );
}