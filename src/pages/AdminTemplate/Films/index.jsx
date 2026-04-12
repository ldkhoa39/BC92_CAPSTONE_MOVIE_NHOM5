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
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Quản lý Phim</h2>
      
      {/* Nút Thêm Phim */}
      <NavLink 
        to="/admin/films/addnew" 
        className="bg-blue-600 text-white px-4 py-2 rounded mb-4 inline-block hover:bg-blue-700"
      >
        + Thêm Phim Mới
      </NavLink>

      {/* Bảng Danh sách phim */}
      <div className="overflow-x-auto shadow-md sm:rounded-lg mt-4">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th className="px-6 py-3">Mã Phim</th>
              <th className="px-6 py-3">Hình Ảnh</th>
              <th className="px-6 py-3">Tên Phim</th>
              <th className="px-6 py-3">Mô Tả</th>
              <th className="px-6 py-3 text-center">Hành Động</th>
            </tr>
          </thead>
          <tbody>
            {listMovie?.map((movie) => (
              <tr key={movie.maPhim} className="bg-white border-b hover:bg-gray-50">
                <td className="px-6 py-4 font-medium text-gray-900">{movie.maPhim}</td>
                <td className="px-6 py-4">
                  <img src={movie.hinhAnh} alt={movie.tenPhim} className="w-16 h-16 object-cover rounded" />
                </td>
                <td className="px-6 py-4 font-semibold text-gray-900">{movie.tenPhim}</td>
                <td className="px-6 py-4 truncate max-w-xs">{movie.moTa}</td>
                <td className="px-6 py-4 flex justify-center space-x-3">
                  <NavLink 
                    to={`/admin/films/edit/${movie.maPhim}`}
                    className="font-medium text-blue-600 hover:underline"
                  >
                    Sửa
                  </NavLink>
                  <button 
                    onClick={() => handleDelete(movie.maPhim)}
                    className="font-medium text-red-600 hover:underline"
                  >
                    Xóa
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}