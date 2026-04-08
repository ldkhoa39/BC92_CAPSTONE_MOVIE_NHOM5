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
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-4 py-20">
      <div className="bg-zinc-900/80 backdrop-blur-xl p-8 rounded-3xl border border-zinc-800 shadow-2xl w-full max-w-2xl">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-black text-white uppercase italic tracking-tighter mb-2">Đăng Ký Tài Khoản</h2>
          <p className="text-zinc-500 text-sm">Trở thành thành viên để tận hưởng ưu đãi</p>
        </div>

        {error && (
          <div className="mb-6 p-3 bg-red-600/20 border border-red-600/50 text-red-500 text-sm rounded-xl text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleRegister} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          <div className="md:col-span-2">
            <label className="text-[10px] font-black text-red-600 uppercase mb-2 block tracking-widest">Họ và Tên</label>
            <input onBlur={validationForm} onChange={handleOnChange} name="hoTen" type="text" placeholder="Nhập họ và tên đầy đủ..." className="w-full bg-zinc-800 text-white p-3 rounded-xl border border-zinc-700 focus:border-red-600 transition-all outline-none" />
            {erros.hoTen && <span className="text-red-500 text-xs italic mt-2 block">{erros.hoTen}</span>}
          </div>

          <div>
            <label className="text-[10px] font-black text-red-600 uppercase mb-2 block tracking-widest">Tài Khoản</label>
            <input onBlur={validationForm} onChange={handleOnChange} name="taiKhoan" type="text" placeholder="Tên đăng nhập..." className="w-full bg-zinc-800 text-white p-3 rounded-xl border border-zinc-700 focus:border-red-600 transition-all outline-none" />
            {erros.taiKhoan && <span className="text-red-500 text-xs italic mt-2 block">{erros.taiKhoan}</span>}
          </div>

          <div>
            <label className="text-[10px] font-black text-red-600 uppercase mb-2 block tracking-widest">Mật Khẩu</label>
            <input onBlur={validationForm} onChange={handleOnChange} name="matKhau" type="password" placeholder="Nhập mật khẩu..." className="w-full bg-zinc-800 text-white p-3 rounded-xl border border-zinc-700 focus:border-red-600 transition-all outline-none" />
            {erros.matKhau && <span className="text-red-500 text-xs italic mt-2 block">{erros.matKhau}</span>}
          </div>

          <div>
            <label className="text-[10px] font-black text-red-600 uppercase mb-2 block tracking-widest">Email</label>
            <input onBlur={validationForm} onChange={handleOnChange} name="email" type="email" placeholder="example@mail.com" className="w-full bg-zinc-800 text-white p-3 rounded-xl border border-zinc-700 focus:border-red-600 transition-all outline-none" />
            {erros.email && <span className="text-red-500 text-xs italic mt-2 block">{erros.email}</span>}
          </div>

          <div>
            <label className="text-[10px] font-black text-red-600 uppercase mb-2 block tracking-widest">Số Điện Thoại</label>
            <input onBlur={validationForm} onChange={handleOnChange} name="soDt" type="text" placeholder="0901234567" className="w-full bg-zinc-800 text-white p-3 rounded-xl border border-zinc-700 focus:border-red-600 transition-all outline-none" />
            {erros.soDt && <span className="text-red-500 text-xs italic mt-2 block">{erros.soDt}</span>}
          </div>

          <div className="md:col-span-2 mt-4">
            <button
              disabled={isDisableRegister || loading} type="submit"
              className={`w-full px-10 py-4 font-black rounded-xl uppercase italic tracking-tighter transition-all ${
                isDisableRegister || loading ? "bg-zinc-800 text-zinc-600" : "bg-red-600 text-white hover:bg-white hover:text-red-600 shadow-red-600/20 shadow-lg"
              }`}
            >
              {loading ? "Đang đăng ký..." : "Hoàn tất đăng ký"}
            </button>
          </div>
        </form>

        <p className="text-center text-zinc-500 text-sm mt-6">
          Đã có tài khoản? <Link to="/login" className="text-red-500 hover:text-white font-bold transition-all">Đăng nhập</Link>
        </p>
      </div>
    </div>
  );
}