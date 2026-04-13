import { useEffect, useState } from "react"; // Thêm useState
import { useDispatch, useSelector } from "react-redux";
import { actFetchUsers, actDeleteUser } from "./slice";
import { Link } from "react-router-dom";
import SearchBar from "../_components/SearchBar";

export default function UserManager() {
  const dispatch = useDispatch();
  const { listUser, loading } = useSelector((state) => state.userReducer || { listUser: [] });
  
  // Tạo state để lưu từ khóa tìm kiếm
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    dispatch(actFetchUsers());
  }, [dispatch]);

  const handleDelete = (taiKhoan) => {
    if (window.confirm(`Bạn có chắc muốn xoá tài khoản ${taiKhoan}?`)) {
      dispatch(actDeleteUser(taiKhoan));
    }
  };

  // Logic lọc danh sách người dùng dựa trên keyword
  // Nó sẽ tự động tính toán lại mỗi khi keyword hoặc listUser thay đổi
  const filteredUsers = listUser?.filter((user) => {
    const searchLow = keyword.toLowerCase().trim();
    return (
      user.taiKhoan.toLowerCase().includes(searchLow) ||
      user.hoTen.toLowerCase().includes(searchLow)
    );
  });

  return (
    <div className="p-4 md:p-6 h-screen flex flex-col bg-zinc-950 text-white animate-fadeIn">
      {/* Header*/}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 flex-shrink-0">
        <div>
          <h2 className="text-2xl md:text-3xl font-black tracking-tighter uppercase italic text-white">
            Quản Lý <span className="text-red-600">Người Dùng</span>
          </h2>
          <p className="text-zinc-500 text-sm">Quản lý tài khoản và phân quyền hệ thống</p>
        </div>

        {/* Search Bar*/}
        <div className="w-full lg:flex-1 lg:max-w-md">
          <SearchBar onSearch={(val) => setKeyword(val)} />
        </div>

        <Link
          to="/admin/user/add-user"
          className="w-full sm:w-auto bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl font-bold transition-all shadow-lg shadow-red-600/20 flex justify-center items-center gap-2 text-sm md:text-base whitespace-nowrap"
        >
          <i className="fa-solid fa-user-plus"></i>
          Thêm Người Dùng
        </Link>
      </div>

      {/* Main Content Container */}
      <div className="flex-1 bg-zinc-900/50 border border-zinc-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col mt-4 md:mt-0">
        <div className="overflow-auto flex-1 custom-scrollbar">
          
          {/* loading*/}
          {loading ? (
            <div className="flex flex-col items-center justify-center h-full py-20 space-y-4">
              <div className="w-10 h-10 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
              <p className="text-zinc-500 animate-pulse font-bold text-xs tracking-widest uppercase">Đang đồng bộ dữ liệu...</p>
            </div>
          ) : (
            <>
              {/*Desktop Table*/}
              <table className="hidden lg:table w-full text-left border-collapse table-fixed">
                <thead className="sticky top-0 z-10 bg-zinc-800 shadow-md">
                  <tr className="border-b border-zinc-700 whitespace-nowrap">
                    <th className="w-[18%] px-6 py-5 text-xs font-black uppercase text-zinc-400">Tài khoản</th>
                    <th className="w-[18%] px-6 py-5 text-xs font-black uppercase text-zinc-400">Họ Tên</th>
                    <th className="w-[25%] px-6 py-5 text-xs font-black uppercase text-zinc-400">Email</th>
                    <th className="w-[15%] px-6 py-5 text-xs font-black uppercase text-zinc-400">Số ĐT</th>
                    <th className="w-[10%] px-6 py-5 text-xs font-black uppercase text-zinc-400">Loại</th>
                    <th className="w-[14%] px-6 py-5 text-xs font-black uppercase text-zinc-400 text-center">Hành động</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800/50">
                  {filteredUsers?.map((user) => (
                    <tr key={user.taiKhoan} className="hover:bg-zinc-800/30 transition-colors">
                      <td className="px-6 py-4 font-mono text-blue-400 font-bold truncate text-sm">{user.taiKhoan}</td>
                      <td className="px-6 py-4 font-semibold text-zinc-200 truncate text-sm">{user.hoTen}</td>
                      <td className="px-6 py-4 text-zinc-400 truncate text-sm">{user.email}</td>
                      <td className="px-6 py-4 text-zinc-400 text-sm whitespace-nowrap">{user.soDT}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-0.5 rounded-md text-[9px] font-black border whitespace-nowrap ${
                          user.maLoaiNguoiDung === 'QuanTri'
                            ? 'bg-purple-500/10 text-purple-500 border-purple-500/20'
                            : 'bg-zinc-700/50 text-zinc-400 border-zinc-600/30'
                        }`}>
                          {user.maLoaiNguoiDung}
                        </span>
                      </td>
                      <td className="px-6 py-4 action-icons">
                        <div className="flex justify-center items-center gap-1.5">
                          <Link
                            to={`/admin/user/edit/${user.taiKhoan}`}
                            className="w-8 h-8 rounded-lg bg-zinc-800 text-zinc-400 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all"
                          >
                            <i className="fa-solid fa-user-gear text-xs"></i>
                          </Link>
                          <button
                            onClick={() => handleDelete(user.taiKhoan)}
                            className="w-8 h-8 rounded-lg bg-zinc-800 text-zinc-400 flex items-center justify-center hover:bg-red-600 hover:text-white transition-all"
                          >
                            <i className="fa-solid fa-trash-can text-xs"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/*Mobile & Tablet Card Layout*/}
              <div className="lg:hidden grid grid-cols-1 divide-y divide-zinc-800">
                {filteredUsers?.map((user) => (
                  <div key={user.taiKhoan} className="p-5 flex flex-col gap-4">
                    <div className="flex justify-between items-start gap-3">
                      <div className="flex-1 min-w-0">
                        <p className="text-blue-400 font-mono font-bold text-base md:text-lg break-all">{user.taiKhoan}</p>
                        <p className="font-semibold text-zinc-200 text-sm md:text-base break-words mt-0.5">{user.hoTen}</p>
                      </div>
                      <span className={`px-2 py-1 rounded-md text-[10px] md:text-xs font-black border whitespace-nowrap ${
                        user.maLoaiNguoiDung === 'QuanTri'
                          ? 'bg-purple-500/10 text-purple-500 border-purple-500/20'
                          : 'bg-zinc-700/50 text-zinc-400 border-zinc-600/30'
                      }`}>
                        {user.maLoaiNguoiDung}
                      </span>
                    </div>
                    
                    <div className="text-sm md:text-base text-zinc-400 space-y-1.5 flex-1">
                      <p className="break-all flex items-center">
                        <i className="fa-solid fa-envelope mr-2.5 w-4 text-zinc-600"></i>
                        {user.email}
                      </p>
                      <p className="flex items-center">
                        <i className="fa-solid fa-phone mr-2.5 w-4 text-zinc-600"></i>
                        {user.soDT}
                      </p>
                    </div>

                    <div className="flex flex-row gap-3 pt-3 border-t border-zinc-800 action-buttons">
                      <Link
                        to={`/admin/user/edit/${user.taiKhoan}`}
                        className="flex-1 bg-zinc-800 py-3 rounded-xl text-center text-sm font-bold text-zinc-300 hover:bg-blue-600 hover:text-white transition-all flex justify-center items-center gap-2"
                      >
                        <i className="fa-solid fa-user-gear text-sm"></i> SỬA
                      </Link>
                      <button
                        onClick={() => handleDelete(user.taiKhoan)}
                        className="flex-1 bg-zinc-800 py-3 rounded-xl text-center text-sm font-bold text-zinc-300 hover:bg-red-600 hover:text-white transition-all flex justify-center items-center gap-2"
                      >
                        <i className="fa-solid fa-trash-can text-sm"></i> XÓA
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}