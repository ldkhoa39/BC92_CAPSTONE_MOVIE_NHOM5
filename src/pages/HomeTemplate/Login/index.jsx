import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { fetchLogin } from "./slice";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, loading } = useSelector((state) => state.authReducer);

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
      .then(() => navigate("/")) 
      .catch((err) => console.log(err));
  };

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-4">
      <div className="bg-zinc-900/80 backdrop-blur-xl p-8 rounded-3xl border border-zinc-800 shadow-2xl w-full max-w-md">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-black text-white uppercase italic tracking-tighter mb-2">Đăng Nhập</h2>
          <p className="text-zinc-500 text-sm">Chào mừng bạn quay lại với hệ thống rạp chiếu</p>
        </div>

        {error && (
          <div className="mb-6 p-3 bg-red-600/20 border border-red-600/50 text-red-500 text-sm rounded-xl text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="flex flex-col gap-6">
          <div>
            <label className="text-[10px] font-black text-red-600 uppercase mb-2 block tracking-widest">Tài Khoản</label>
            <input
              onBlur={validationForm} onChange={handleOnChange} name="taiKhoan" type="text" placeholder="Nhập tên tài khoản..."
              className="w-full bg-zinc-800 text-white p-3 rounded-xl border border-zinc-700 focus:border-red-600 transition-all outline-none"
            />
            {erros.taiKhoan && <span className="text-red-500 text-xs italic mt-2 block">{erros.taiKhoan}</span>}
          </div>

          <div>
            <label className="text-[10px] font-black text-red-600 uppercase mb-2 block tracking-widest">Mật Khẩu</label>
            <input
              onBlur={validationForm} onChange={handleOnChange} name="matKhau" type="password" placeholder="Nhập mật khẩu..."
              className="w-full bg-zinc-800 text-white p-3 rounded-xl border border-zinc-700 focus:border-red-600 transition-all outline-none"
            />
            {erros.matKhau && <span className="text-red-500 text-xs italic mt-2 block">{erros.matKhau}</span>}
          </div>

          <button
            disabled={isDisableLogin || loading} type="submit"
            className={`w-full mt-2 px-10 py-4 font-black rounded-xl uppercase italic tracking-tighter transition-all ${
              isDisableLogin || loading ? "bg-zinc-800 text-zinc-600" : "bg-red-600 text-white hover:bg-white hover:text-red-600 shadow-red-600/20 shadow-lg"
            }`}
          >
            {loading ? "Đang xử lý..." : "Đăng nhập ngay"}
          </button>
        </form>

        <p className="text-center text-zinc-500 text-sm mt-6">
          Chưa có tài khoản? <Link to="/register" className="text-red-500 hover:text-white font-bold transition-all">Đăng ký ngay</Link>
        </p>
      </div>
    </div>
  );
}