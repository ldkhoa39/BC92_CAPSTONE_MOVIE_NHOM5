import React from 'react'
import { useSelector } from 'react-redux';
import { Outlet, Navigate } from 'react-router-dom'
import AdminHeader from './_components/Header';
import AdminFooter from './_components/Footer';

export default function AdminTemplate() {
  const { data } = useSelector((state) => state.authReducer);

  if (!data) {
    return <Navigate to="/auth" />;
  }

  if (data.maLoaiNguoiDung !== "QuanTri") {
    alert("Bạn không có quyền truy cập vào trang Admin!");
    return <Navigate to="/" />;
  }

  return (
    <div className="admin-layout flex">
        <aside className="w-64 bg-gray-800 text-white min-h-screen">
            <h2 className="p-4 font-bold">Admin Panel</h2>
            {/* Nên thêm các link điều hướng ở đây */}
            <nav className="p-4">
              <ul>
                <li className="mb-2"><a href="/admin/films">Quản lý phim</a></li>
                <li className="mb-2"><a href="/admin/add-user">Quản lý người dùng</a></li>
              </ul>
            </nav>
        </aside>

        <div className="main-content flex-1">
            <AdminHeader/>
            
            <main className="p-6">
                {/* THAY <Films/> BẰNG <Outlet /> */}
                <Outlet /> 
            </main>
            
            <AdminFooter/>
        </div>
    </div>
  );
}