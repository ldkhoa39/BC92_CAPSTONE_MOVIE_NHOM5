import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { fetchListMovieAdmin, deleteMovie } from "./slice";

export default function Films() {
  const dispatch = useDispatch();
  
  // Lấy state từ Redux Store
  const { listMovie, loading } = useSelector((state) => state.filmsReducer);

  // Gọi API lấy danh sách phim ngay khi component được render
  useEffect(() => {
    dispatch(fetchListMovieAdmin());
  }, [dispatch]);

  const handleDelete = (maPhim) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa phim này không?")) {
      dispatch(deleteMovie(maPhim))
        .unwrap()
        .then(() => {
          alert("Xóa phim thành công!");
          // Load lại danh sách sau khi xóa
          dispatch(fetchListMovieAdmin());
        })
        .catch((error) => {
          alert(error || "Xóa phim thất bại!");
        });
    }
  };

  if (loading) return <div className="text-center mt-10 text-xl">Đang tải dữ liệu phim...</div>;

  return (
    <div className="p-4 md:p-6 animate-fadeIn">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div>
          <h2 className="text-2xl font-black text-white uppercase tracking-tight">Quản lý Phim</h2>
          <p className="text-zinc-500 text-sm">Danh sách toàn bộ phim trên hệ thống.</p>
        </div>
        
        <NavLink 
          to="/admin/films/addnew" 
          className="bg-red-600 hover:bg-red-700 text-white px-5 py-2.5 rounded-xl font-bold transition-all shadow-lg shadow-red-600/20 flex items-center gap-2"
        >
          <i className="fa-solid fa-plus"></i> Thêm Phim Mới
        </NavLink>
      </div>

      <div className="overflow-x-auto bg-zinc-900 border border-zinc-800 rounded-2xl shadow-xl">
        <table className="w-full text-sm text-left text-zinc-400">
          <thead className="text-xs text-zinc-300 uppercase bg-zinc-800/50 border-b border-zinc-800">
            <tr>
              <th className="px-6 py-4 font-black">Mã Phim</th>
              <th className="px-6 py-4 font-black">Hình Ảnh</th>
              <th className="px-6 py-4 font-black">Tên Phim</th>
              <th className="px-6 py-4 font-black">Mô Tả</th>
              <th className="px-6 py-4 font-black text-center">Hành Động</th>
            </tr>
          </thead>
          <tbody>
            {listMovie?.map((movie) => (
              <tr key={movie.maPhim} className="border-b border-zinc-800 hover:bg-zinc-800/50 transition-colors">
                <td className="px-6 py-4 font-bold text-white">{movie.maPhim}</td>
                <td className="px-6 py-4">
                  <div className="w-16 h-20 rounded-lg overflow-hidden border border-zinc-700 shadow-md">
                    <img src={movie.hinhAnh} alt={movie.tenPhim} className="w-full h-full object-cover" />
                  </div>
                </td>
                <td className="px-6 py-4 font-bold text-white">{movie.tenPhim}</td>
                <td className="px-6 py-4">
                  <p className="truncate max-w-[200px] text-zinc-400" title={movie.moTa}>{movie.moTa}</p>
                </td>
                <td className="px-6 py-4">
                  <div className="flex justify-center items-center space-x-3">
                    <NavLink 
                      to={`/admin/films/edit/${movie.maPhim}`}
                      className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-500 flex items-center justify-center hover:bg-blue-500 hover:text-white transition-colors"
                      title="Chỉnh sửa"
                    >
                      <i className="fa-solid fa-pen-to-square"></i>
                    </NavLink>
                    <button 
                      onClick={() => handleDelete(movie.maPhim)}
                      className="w-8 h-8 rounded-lg bg-red-500/10 text-red-500 flex items-center justify-center hover:bg-red-500 hover:text-white transition-colors"
                      title="Xóa phim"
                    >
                      <i className="fa-solid fa-trash-can"></i>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}