import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actFetchUsers, actDeleteUser } from "./slice"; 
import { Link } from "react-router-dom";

export default function UserManager() {
  const dispatch = useDispatch();
  
  const { listUser, loading } = useSelector((state) => state.userReducer);

  useEffect(() => {
    dispatch(actFetchUsers());
  }, []);

  const handleDelete = (taiKhoan) => {
    if (window.confirm(`Bạn có chắc muốn xóa người dùng: ${taiKhoan}?`)) {
      dispatch(actDeleteUser(taiKhoan));
    }
  };

  if (loading) return <div className="p-10 text-center">Đang tải dữ liệu...</div>;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-heading">Quản Lý Người Dùng</h2>

        <Link 
          to="/admin/add-user" 
          className="bg-brand text-white px-4 py-2 rounded-base hover:bg-brand-strong transition"
        >
          + Thêm Người Dùng
        </Link>
      </div>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-body">
          <thead className="text-xs text-heading uppercase bg-neutral-secondary-medium">
            <tr>
              <th className="px-6 py-3">Tài khoản</th>
              <th className="px-6 py-3">Họ Tên</th>
              <th className="px-6 py-3">Email</th>
              <th className="px-6 py-3">Số ĐT</th>
              <th className="px-6 py-3">Loại</th>
              <th className="px-6 py-3 text-center">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {listUser?.map((user) => (
              <tr key={user.taiKhoan} className="bg-white border-b hover:bg-gray-50">
                <td className="px-6 py-4 font-medium text-heading">{user.taiKhoan}</td>
                <td className="px-6 py-4">{user.hoTen}</td>
                <td className="px-6 py-4">{user.email}</td>
                <td className="px-6 py-4">{user.soDT}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded text-xs ${user.maLoaiNguoiDung === 'QuanTri' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'}`}>
                    {user.maLoaiNguoiDung}
                  </span>
                </td>
                <td className="px-6 py-4 text-center">

                  <Link
                    to={`/admin/edit-user/${user.taiKhoan}`}
                    className="font-medium text-blue-600 hover:underline mr-3"
                  >
                    Sửa
                  </Link>
                  <button
                    onClick={() => handleDelete(user.taiKhoan)}
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