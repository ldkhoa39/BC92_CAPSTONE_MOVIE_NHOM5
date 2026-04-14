import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { fetchLogin } from "./slice";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, loading } = useSelector((state) => state.loginReducer);

  const [user, setUser] = useState({ taiKhoan: "", matKhau: "" });
  const [erros, setErros] = useState({ taiKhoan: "", matKhau: "" });

  const isDisableLogin = !user.taiKhoan || !user.matKhau || erros.taiKhoan || erros.matKhau;

  const handleOnChange = (event) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  // Logic Login chuẩn: Chỉ check rỗng
  const validationForm = (event) => {
    const { name, value } = event.target;
    setErros({
      ...erros,
      [name]: value.trim() === "" ? "Vui lòng điền đầy đủ thông tin <3" : "",
    });
  };

  const handleLogin = (event) => {
  event.preventDefault();
  dispatch(fetchLogin(user))
    .unwrap()
    .then((result) => {
      // Thông báo cho người dùng (tùy chọn)
      alert("Chào mừng " + result.hoTen + " đã quay trở lại!");

      // Kiểm tra mã loại người dùng để điều hướng đúng trang
      if (result.maLoaiNguoiDung === "QuanTri") {
        // Nếu là Admin, đẩy thẳng vào Dashboard
        navigate("/admin/dashboard");
      } else {
        // Nếu là khách hàng bình thường, đẩy ra trang chủ
        navigate("/");
      }
    })
    .catch((err) => {
      // Log lỗi để dễ debug nếu đăng nhập thất bại
      console.error("Lỗi đăng nhập:", err);
    });
};

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-4 relative overflow-hidden">
      
      <div className="absolute top-0 -left-20 w-72 h-72 bg-red-600/10 blur-[100px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-0 -right-20 w-72 h-72 bg-red-900/10 blur-[100px] rounded-full pointer-events-none"></div>

      <div className="bg-zinc-900/80 backdrop-blur-2xl p-6 sm:p-10 rounded-3xl border border-zinc-800 shadow-2xl w-full max-w-md relative z-10 animate-fadeIn">
        
        {/* Nút quay lại trang chủ*/}
        <Link to="/" className="inline-flex items-center gap-2 text-zinc-500 hover:text-white mb-6 text-xs transition-colors group">
          <i className="fa-solid fa-arrow-left group-hover:-translate-x-1 transition-transform"></i> Quay lại
        </Link>

        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-black text-white uppercase italic tracking-tighter mb-2">
            Đăng <span className="text-red-600">Nhập</span>
          </h2>
          <p className="text-zinc-500 text-xs md:text-sm font-medium">
            Chào mừng bạn quay lại với hệ thống rạp chiếu
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-600/10 border-l-4 border-red-600 text-red-500 text-xs md:text-sm rounded-r-xl animate-shake">
            <i className="fa-solid fa-circle-exclamation mr-2"></i> 
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="flex flex-col gap-5">
          {/* Tài Khoản */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-black text-red-600 uppercase ml-1 tracking-[0.2em]">Tài Khoản</label>
            <div className="relative group">
              <i className="fa-regular fa-user absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-red-600 transition-colors"></i>
              <input
                onBlur={validationForm} 
                onChange={handleOnChange} 
                name="taiKhoan" 
                type="text" 
                placeholder="Tên tài khoản..."
                className="w-full bg-zinc-800/50 text-white pl-11 pr-4 py-3.5 rounded-xl border border-zinc-700 focus:border-red-600 focus:bg-zinc-800 transition-all outline-none text-sm"
              />
            </div>
            {erros.taiKhoan && <span className="text-red-500 text-[10px] md:text-xs italic ml-1 block">{erros.taiKhoan}</span>}
          </div>

          {/* Mật Khẩu */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-black text-red-600 uppercase ml-1 tracking-[0.2em]">Mật Khẩu</label>
            <div className="relative group">
              <i className="fa-solid fa-lock absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-red-600 transition-colors"></i>
              <input
                onBlur={validationForm} 
                onChange={handleOnChange} 
                name="matKhau" 
                type="password" 
                placeholder="••••••••"
                className="w-full bg-zinc-800/50 text-white pl-11 pr-4 py-3.5 rounded-xl border border-zinc-700 focus:border-red-600 focus:bg-zinc-800 transition-all outline-none text-sm"
              />
            </div>
            {erros.matKhau && <span className="text-red-500 text-[10px] md:text-xs italic ml-1 block">{erros.matKhau}</span>}
          </div>

          <button
            disabled={isDisableLogin || loading} 
            type="submit"
            className={`w-full mt-4 px-10 py-4 font-black rounded-xl uppercase italic tracking-tighter transition-all active:scale-95 shadow-lg ${
              isDisableLogin || loading 
              ? "bg-zinc-800 text-zinc-600 cursor-not-allowed" 
              : "bg-red-600 text-white hover:bg-white hover:text-red-600 shadow-red-600/20"
            }`}
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <i className="fa-solid fa-circle-notch animate-spin"></i> Đang xử lý...
              </span>
            ) : "Đăng nhập ngay"}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-zinc-800/50 text-center">
          <p className="text-zinc-500 text-xs md:text-sm">
            Chưa có tài khoản?{" "}
            <Link to="/register" className="text-red-500 hover:text-red-400 font-bold transition-all underline underline-offset-4">
              Đăng ký ngay
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}