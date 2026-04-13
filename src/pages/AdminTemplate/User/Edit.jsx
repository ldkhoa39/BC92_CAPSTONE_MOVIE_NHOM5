import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { actUpdateUser } from "./slice";
import api from "../../../services/api";

export default function EditUser() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  // Mình lấy cả id và taiKhoan đề phòng bạn chưa kịp sửa file route
  const { taiKhoan, id } = useParams();
  const accountToEdit = taiKhoan || id; 

  const [user, setUser] = useState({
    taiKhoan: "",
    matKhau: "",
    hoTen: "",
    email: "",
    soDT: "",
    maLoaiNguoiDung: "KhachHang",
    maNhom: "GP01",
  });

  useEffect(() => {
    const fetchUserDetail = async () => {
      if (!accountToEdit) return;

      try {
        const result = await api.post(
          `QuanLyNguoiDung/LayThongTinNguoiDung?taiKhoan=${accountToEdit}`
        );
        const data = result.data.content;
        
        // Đổ dữ liệu từ API vào state
        setUser({
          taiKhoan: data.taiKhoan,
          matKhau: data.matKhau,
          hoTen: data.hoTen,
          email: data.email,
          soDT: data.soDT, // Chữ T viết hoa theo đúng chuẩn API
          maLoaiNguoiDung: data.maLoaiNguoiDung,
          maNhom: data.maNhom,
        });
      } catch (error) {
        console.error("Lỗi lấy thông tin user:", error);
        alert("Không thể tải thông tin người dùng!");
      }
    };

    fetchUserDetail();
  }, [accountToEdit]);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    // Dùng accountToEdit làm backup nếu user.taiKhoan bị rỗng
    const payload = {
      taiKhoan: user.taiKhoan || accountToEdit,
      matKhau: user.matKhau,
      hoTen: user.hoTen,
      email: user.email,
      soDT: user.soDT,
      maLoaiNguoiDung: user.maLoaiNguoiDung,
      maNhom: "GP01",
    };

    if (!payload.matKhau) {
      alert("Vui lòng nhập mật khẩu!");
      return;
    }

    // Thực hiện dispatch action update
    const resultAction = await dispatch(actUpdateUser(payload));
    
    // Nếu thành công thì quay về trang danh sách
    if (actUpdateUser.fulfilled.match(resultAction)) {
      navigate("/admin/user");
    }
  };

  return (
    <div className="p-6 h-screen flex flex-col bg-zinc-950 text-white animate-fadeIn">
      <div className="flex-1 bg-zinc-900/50 border border-zinc-800 rounded-2xl p-8 shadow-2xl max-w-3xl mx-auto w-full">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-black uppercase italic text-white">
              Cập Nhật <span className="text-blue-500">Thành Viên</span>
            </h2>
            <p className="text-zinc-500 text-sm">Thay đổi thông tin người dùng hệ thống</p>
          </div>
          <Link
            to="/admin/user"
            className="bg-zinc-800 hover:bg-zinc-700 text-white px-4 py-2 rounded-xl text-sm font-bold transition-all flex items-center gap-2"
          >
            <i className="fa-solid fa-angle-left"></i> Quay lại
          </Link>
        </div>

        <form onSubmit={handleUpdate} className="grid grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-xs font-black uppercase text-zinc-400 tracking-wider">
              Tài khoản (Không thể sửa)
            </label>
            <input
              type="text"
              name="taiKhoan"
              value={user.taiKhoan}
              disabled
              className="bg-zinc-800/50 text-zinc-500 rounded-xl px-4 py-3 border border-zinc-800 cursor-not-allowed focus:outline-none"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs font-black uppercase text-zinc-400 tracking-wider">Mật khẩu</label>
            <input
              type="password"
              name="matKhau"
              value={user.matKhau}
              onChange={handleOnChange}
              required
              className="bg-zinc-800 text-white rounded-xl px-4 py-3 border border-zinc-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all outline-none"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs font-black uppercase text-zinc-400 tracking-wider">Họ và Tên</label>
            <input
              type="text"
              name="hoTen"
              value={user.hoTen}
              onChange={handleOnChange}
              className="bg-zinc-800 text-white rounded-xl px-4 py-3 border border-zinc-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all outline-none"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs font-black uppercase text-zinc-400 tracking-wider">Số điện thoại</label>
            <input
              type="text"
              name="soDT"
              value={user.soDT}
              onChange={handleOnChange}
              className="bg-zinc-800 text-white rounded-xl px-4 py-3 border border-zinc-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all outline-none"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs font-black uppercase text-zinc-400 tracking-wider">Địa chỉ Email</label>
            <input
              type="email"
              name="email"
              value={user.email}
              onChange={handleOnChange}
              className="bg-zinc-800 text-white rounded-xl px-4 py-3 border border-zinc-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all outline-none"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs font-black uppercase text-zinc-400 tracking-wider">Phân quyền</label>
            <select
              name="maLoaiNguoiDung"
              value={user.maLoaiNguoiDung}
              onChange={handleOnChange}
              className="bg-zinc-800 text-white rounded-xl px-4 py-3 border border-zinc-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all outline-none appearance-none cursor-pointer"
            >
              <option value="KhachHang">Khách hàng</option>
              <option value="QuanTri">Quản trị</option>
            </select>
          </div>

          <div className="col-span-2 mt-4">
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black uppercase tracking-wider py-4 rounded-xl transition-all shadow-lg shadow-blue-600/20"
            >
              <i className="fa-solid fa-check mr-2"></i> Xác nhận cập nhật
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}