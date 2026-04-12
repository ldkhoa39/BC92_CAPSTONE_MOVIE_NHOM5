import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { fetchRegister, resetRegisterState } from "./slice";

export default function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, loading, success } = useSelector((state) => state.registerReducer);

  const [user, setUser] = useState({ taiKhoan: "", matKhau: "", hoTen: "", email: "", soDt: "" });
  const [erros, setErros] = useState({ taiKhoan: "", matKhau: "", hoTen: "", email: "", soDt: "" });

  // Kiểm tra xem có lỗi nào không hoặc có trường nào chưa nhập không
  const isDisableRegister = Object.values(user).some(val => val === "") || Object.values(erros).some(val => val !== "");

  useEffect(() => {
    dispatch(resetRegisterState());
  }, [dispatch]);

  // Nếu đăng ký thành công thì đá về trang đăng nhập
  useEffect(() => {
    if (success) {
      alert("Đăng ký thành công! Vui lòng đăng nhập.");
      navigate("/login");
    }
  }, [success, navigate]);

  const handleOnChange = (event) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  // Hàm Validate cực mạnh dành cho Đăng ký
  const validationForm = (event) => {
    const { name, value } = event.target;
    let mess = value.trim() === "" ? "Vui lòng không bỏ trống" : "";

    if (value.trim() !== "") {
      switch (name) {
        case "taiKhoan":
          if (value.length < 4) mess = "Tài khoản phải có ít nhất 4 ký tự";
          break;
        case "matKhau":
          const passRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!\s).{6,}$/;
          if (!value.match(passRegex)) mess = "Mật khẩu cần 1 chữ hoa, 1 thường, 1 số, 1 ký tự đặc biệt và tối thiểu 6 ký tự";
          break;
        case "email":
          const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
          if (!value.match(emailRegex)) mess = "Email không đúng định dạng";
          break;
        case "soDt":
          const phoneRegex = /^[0-9]+$/;
          if (!value.match(phoneRegex)) mess = "Số điện thoại chỉ được chứa chữ số";
          break;
        default: break;
      }
    }

    setErros({ ...erros, [name]: mess });
  };

  const handleRegister = (event) => {
    event.preventDefault();
    dispatch(fetchRegister(user));
  };

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-4 py-12 md:py-20 relative overflow-hidden selection:bg-red-600/30">
      
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-red-600/10 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-blue-900/10 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="bg-zinc-900/80 backdrop-blur-2xl p-6 sm:p-10 rounded-3xl border border-zinc-800 shadow-2xl w-full max-w-2xl relative z-10 animate-fadeIn">
        
        {/* Nút quay lại */}
        <Link to="/" className="inline-flex items-center gap-2 text-zinc-500 hover:text-white mb-6 text-xs transition-colors group">
          <i className="fa-solid fa-arrow-left group-hover:-translate-x-1 transition-transform"></i> Quay lại trang chủ
        </Link>

        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-black text-white uppercase italic tracking-tighter mb-2">
            Đăng Ký <span className="text-red-600">Thành Viên</span>
          </h2>
          <p className="text-zinc-500 text-xs md:text-sm font-medium">
            Trở thành thành viên để tận hưởng những ưu đãi xem phim tốt nhất
          </p>
        </div>

        {error && (
          <div className="md:col-span-2 mb-6 p-4 bg-red-600/10 border-l-4 border-red-600 text-red-500 text-xs md:text-sm rounded-r-xl animate-shake">
            <i className="fa-solid fa-circle-exclamation mr-2"></i> {error}
          </div>
        )}

        <form onSubmit={handleRegister} className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
          
          {/* Họ và Tên */}
          <div className="md:col-span-2 space-y-1.5">
            <label className="text-[10px] font-black text-red-600 uppercase ml-1 tracking-[0.2em]">Họ và Tên</label>
            <div className="relative group">
              <i className="fa-regular fa-address-card absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-red-600 transition-colors"></i>
              <input 
                onBlur={validationForm} onChange={handleOnChange} name="hoTen" type="text" 
                placeholder="Nhập họ và tên đầy đủ..." 
                className="w-full bg-zinc-800/50 text-white pl-11 pr-4 py-3.5 rounded-xl border border-zinc-700 focus:border-red-600 focus:bg-zinc-800 transition-all outline-none text-sm" 
              />
            </div>
            {erros.hoTen && <span className="text-red-500 text-[10px] md:text-xs italic ml-1 block">{erros.hoTen}</span>}
          </div>

          {/* Tài Khoản */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-black text-red-600 uppercase ml-1 tracking-[0.2em]">Tài Khoản</label>
            <div className="relative group">
              <i className="fa-regular fa-user absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-red-600 transition-colors"></i>
              <input 
                onBlur={validationForm} onChange={handleOnChange} name="taiKhoan" type="text" 
                placeholder="Tên đăng nhập..." 
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
                onBlur={validationForm} onChange={handleOnChange} name="matKhau" type="password" 
                placeholder="••••••••" 
                className="w-full bg-zinc-800/50 text-white pl-11 pr-4 py-3.5 rounded-xl border border-zinc-700 focus:border-red-600 focus:bg-zinc-800 transition-all outline-none text-sm" 
              />
            </div>
            {erros.matKhau && <span className="text-red-500 text-[10px] md:text-xs italic ml-1 block">{erros.matKhau}</span>}
          </div>

          {/* Email */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-black text-red-600 uppercase ml-1 tracking-[0.2em]">Email</label>
            <div className="relative group">
              <i className="fa-regular fa-envelope absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-red-600 transition-colors"></i>
              <input 
                onBlur={validationForm} onChange={handleOnChange} name="email" type="email" 
                placeholder="example@mail.com" 
                className="w-full bg-zinc-800/50 text-white pl-11 pr-4 py-3.5 rounded-xl border border-zinc-700 focus:border-red-600 focus:bg-zinc-800 transition-all outline-none text-sm" 
              />
            </div>
            {erros.email && <span className="text-red-500 text-[10px] md:text-xs italic ml-1 block">{erros.email}</span>}
          </div>

          {/* Số Điện Thoại */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-black text-red-600 uppercase ml-1 tracking-[0.2em]">Số Điện Thoại</label>
            <div className="relative group">
              <i className="fa-solid fa-mobile-screen-button absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-red-600 transition-colors"></i>
              <input 
                onBlur={validationForm} onChange={handleOnChange} name="soDt" type="text" 
                placeholder="090 123 4567" 
                className="w-full bg-zinc-800/50 text-white pl-11 pr-4 py-3.5 rounded-xl border border-zinc-700 focus:border-red-600 focus:bg-zinc-800 transition-all outline-none text-sm" 
              />
            </div>
            {erros.soDt && <span className="text-red-500 text-[10px] md:text-xs italic ml-1 block">{erros.soDt}</span>}
          </div>

          {/* Nút Đăng ký */}
          <div className="md:col-span-2 mt-6">
            <button
              disabled={isDisableRegister || loading} type="submit"
              className={`w-full px-10 py-4 font-black rounded-xl uppercase italic tracking-tighter transition-all active:scale-[0.98] shadow-lg ${
                isDisableRegister || loading 
                ? "bg-zinc-800 text-zinc-600 cursor-not-allowed" 
                : "bg-red-600 text-white hover:bg-white hover:text-red-600 shadow-red-600/20"
              }`}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <i className="fa-solid fa-circle-notch animate-spin"></i> Đang đăng ký...
                </span>
              ) : "Hoàn tất đăng ký"}
            </button>
          </div>
        </form>

        <div className="mt-8 pt-6 border-t border-zinc-800/50 text-center">
          <p className="text-zinc-500 text-xs md:text-sm font-medium">
            Đã có tài khoản?{" "}
            <Link to="/login" className="text-red-500 hover:text-red-400 font-bold transition-all underline underline-offset-4">
              Đăng nhập ngay
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}