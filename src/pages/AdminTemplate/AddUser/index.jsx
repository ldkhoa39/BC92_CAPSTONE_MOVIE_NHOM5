import { useState } from "react";
import { actAddUser } from "./slice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";

export default function AddUser() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.addUserReducer);

  const [user, setUser] = useState({
    taiKhoan: "",
    matKhau: "",
    email: "",
    soDt: "",
    maNhom: "GP01",
    maLoaiNguoiDung: "KhachHang", // Mặc định là Khách Hàng
    hoTen: "",
  });

  const handleOnchange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const hanldAddUser = async (e) => {
    e.preventDefault();
    
    const result = await dispatch(actAddUser(user));

    if (actAddUser.fulfilled.match(result)) {
      navigate("/admin/user"); // Thêm xong tự chuyển về danh sách
    }
  };

  return (
    <div className="p-4 md:p-6 min-h-screen flex flex-col bg-zinc-950 text-white animate-fadeIn">
      {/* Container */}
      <div className="flex-1 bg-zinc-900/50 border border-zinc-800 rounded-2xl p-5 md:p-8 shadow-2xl max-w-3xl mx-auto w-full">
        
        {/* Header Section*/}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-black uppercase italic text-white">
              Thêm <span className="text-blue-500">Thành Viên</span>
            </h2>
            <p className="text-zinc-500 text-sm">Tạo tài khoản mới cho hệ thống</p>
          </div>
          <Link
            to="/admin/user"
            className="w-full sm:w-auto justify-center bg-zinc-800 hover:bg-zinc-700 text-white px-4 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center gap-2"
          >
            <i className="fa-solid fa-angle-left"></i> Quay lại
          </Link>
        </div>

        {/* Form: Quan trọng nhất là grid-cols-1 md:grid-cols-2 */}
        <form onSubmit={hanldAddUser} className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
          
          {/* Group Input */}
          {[
            { label: "Tài khoản", name: "taiKhoan", type: "text", placeholder: "Nhập tài khoản" },
            { label: "Mật khẩu", name: "matKhau", type: "password", placeholder: "Nhập mật khẩu" },
            { label: "Họ và Tên", name: "hoTen", type: "text", placeholder: "Nhập họ tên" },
            { label: "Số điện thoại", name: "soDt", type: "text", placeholder: "Nhập số điện thoại" },
            { label: "Địa chỉ Email", name: "email", type: "email", placeholder: "Nhập email" },
          ].map((field) => (
            <div key={field.name} className="flex flex-col gap-2">
              <label className="text-[10px] md:text-xs font-black uppercase text-zinc-400 tracking-wider">
                {field.label}
              </label>
              <input
                onChange={handleOnchange}
                name={field.name}
                type={field.type}
                required
                className="bg-zinc-800/80 text-white rounded-xl px-4 py-3 border border-zinc-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all outline-none text-sm md:text-base"
                placeholder={field.placeholder}
              />
            </div>
          ))}

          {/* Select Phân quyền */}
          <div className="flex flex-col gap-2">
            <label className="text-[10px] md:text-xs font-black uppercase text-zinc-400 tracking-wider">
              Phân quyền
            </label>
            <div className="relative">
              <select
                name="maLoaiNguoiDung"
                onChange={handleOnchange}
                value={user.maLoaiNguoiDung}
                className="w-full bg-zinc-800/80 text-white rounded-xl px-4 py-3 border border-zinc-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all outline-none appearance-none cursor-pointer text-sm md:text-base"
              >
                <option value="KhachHang">Khách hàng</option>
                <option value="QuanTri">Quản trị</option>
              </select>
              {/* Icon mũi tên*/}
              <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-zinc-500">
                <i className="fa-solid fa-chevron-down text-[10px]"></i>
              </div>
            </div>
          </div>

          {/* Button Submit*/}
          <div className="md:col-span-2 mt-4">
            <button
              type="submit"
              disabled={loading}
              className={`w-full bg-blue-600 hover:bg-blue-700 text-white font-black uppercase tracking-wider py-4 rounded-xl transition-all shadow-lg shadow-blue-600/20 active:scale-[0.98] ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {loading ? "Đang xử lý..." : "Xác nhận thêm mới"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}