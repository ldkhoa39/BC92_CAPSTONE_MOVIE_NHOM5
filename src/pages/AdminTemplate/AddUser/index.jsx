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
    maLoaiNguoiDung: "KhachHang", // Để mặc định là Khách Hàng
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
    
    // API yêu cầu soDT (chữ T viết hoa) cho một số endpoint, 
    // nhưng với ThemNguoiDung thường là soDt. 
    // Mình sẽ tạo payload chuẩn dựa trên state của bạn.
    const result = await dispatch(actAddUser(user));

    if (actAddUser.fulfilled.match(result)) {
      navigate("/admin/user"); // Thêm xong tự chuyển về danh sách
    }
  };

  return (
    <div className="p-6 h-screen flex flex-col bg-zinc-950 text-white animate-fadeIn">
      <div className="flex-1 bg-zinc-900/50 border border-zinc-800 rounded-2xl p-8 shadow-2xl max-w-3xl mx-auto w-full">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-black uppercase italic text-white">
              Thêm <span className="text-blue-500">Thành Viên</span>
            </h2>
            <p className="text-zinc-500 text-sm">Tạo tài khoản mới cho hệ thống</p>
          </div>
          <Link
            to="/admin/user"
            className="bg-zinc-800 hover:bg-zinc-700 text-white px-4 py-2 rounded-xl text-sm font-bold transition-all flex items-center gap-2"
          >
            <i className="fa-solid fa-angle-left"></i> Quay lại
          </Link>
        </div>

        <form onSubmit={hanldAddUser} className="grid grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-xs font-black uppercase text-zinc-400 tracking-wider">Tài khoản</label>
            <input
              onChange={handleOnchange}
              name="taiKhoan"
              type="text"
              required
              className="bg-zinc-800 text-white rounded-xl px-4 py-3 border border-zinc-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all outline-none"
              placeholder="Nhập tài khoản"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs font-black uppercase text-zinc-400 tracking-wider">Mật khẩu</label>
            <input
              onChange={handleOnchange}
              name="matKhau"
              type="password"
              required
              className="bg-zinc-800 text-white rounded-xl px-4 py-3 border border-zinc-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all outline-none"
              placeholder="Nhập mật khẩu"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs font-black uppercase text-zinc-400 tracking-wider">Họ và Tên</label>
            <input
              onChange={handleOnchange}
              name="hoTen"
              type="text"
              required
              className="bg-zinc-800 text-white rounded-xl px-4 py-3 border border-zinc-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all outline-none"
              placeholder="Nhập họ tên"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs font-black uppercase text-zinc-400 tracking-wider">Số điện thoại</label>
            <input
              onChange={handleOnchange}
              name="soDt"
              type="text"
              required
              className="bg-zinc-800 text-white rounded-xl px-4 py-3 border border-zinc-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all outline-none"
              placeholder="Nhập số điện thoại"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs font-black uppercase text-zinc-400 tracking-wider">Địa chỉ Email</label>
            <input
              onChange={handleOnchange}
              name="email"
              type="email"
              required
              className="bg-zinc-800 text-white rounded-xl px-4 py-3 border border-zinc-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all outline-none"
              placeholder="Nhập email"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs font-black uppercase text-zinc-400 tracking-wider">Phân quyền</label>
            <select
              name="maLoaiNguoiDung"
              onChange={handleOnchange}
              value={user.maLoaiNguoiDung}
              className="bg-zinc-800 text-white rounded-xl px-4 py-3 border border-zinc-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all outline-none appearance-none cursor-pointer"
            >
              <option value="KhachHang">Khách hàng</option>
              <option value="QuanTri">Quản trị</option>
            </select>
          </div>

          <div className="col-span-2 mt-4">
            <button
              type="submit"
              disabled={loading}
              className={`w-full bg-blue-600 hover:bg-blue-700 text-white font-black uppercase tracking-wider py-4 rounded-xl transition-all shadow-lg shadow-blue-600/20 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {loading ? "Đang xử lý..." : "Xác nhận thêm mới"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}