import React from "react";
import { useState } from "react";
import { actAuth } from "./slice"
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Loading from "../_components/Loader";

export default function Auth() {

    const dispatch = useDispatch();
    const {loading, data, error} = useSelector((state) => state.authReducer)

    const [user, setUser] = useState({
        taiKhoan: "",
        matKhau: "",
    });

    // state handle validation form
    const [erros, setErros] = useState({
        taiKhoan: "",
        matKhau: "",
    });

    // disable login button
    const isDisableLogin = (!user.taiKhoan || !user.matKhau) || (erros.taiKhoan || erros.matKhau);

    // hàm này xử dụng cho tất cả input trong form, khi có sự kiện onChange xảy ra thì hàm này sẽ được gọi
    const handleOnChange = (event) => {
        /**
         * event.target(input): đại diện cho thẻ input đang dược thao tác
         */
        // console.log(
        //   event.target.name,
        //   event.target.value
        // );
        const { name, value } = event.target;
        setUser({
            ...user, // keep cac gia tri cũ của user
            [name]: value, // update lại value mới cho thuộc tính có tên là name
        })
    };

    // console.log(user);

    const handleLogin = (event) => {
        event.preventDefault();
        console.log("login", user);
        dispatch(actAuth(user));
    };


    const validationForm = (event) => {
        const { name, value } = event.target;

        let mess = value.trim() === "" ? `pls, full this ${name}` : "";

        // validation taikhoan; mat khau
        switch (name) {
            case "taiKhoan":
                if (value.trim() && value.trim().length < 4) {
                    mess = "Tai khoan phai co it nhat 4 ky tu";
                }
                break;

            // case "matKhau":
            //     const letter = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!\s).{0,}$/;
            //     if (value.trim() && !value.match(letter)) {
            //         mess = "Mật khẩu phải chứa ít nhất 1 ký tự viết hoa, 1 ký tự viết thường, 1 chữ số và 1 ký tự đặc biệt";
            //     }
            //     break;



            default:
                break;
        };

        setErros({
            ...erros,
            [name]: mess,
        })
    };


    /**
     * neu data ton tai chuyen huong toi adminTemplate
     */

    if(data){
        return <Navigate to="/admin/dashboard" />
    }

    if (loading) return <Loading/>;

    return (
        <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-4 relative overflow-hidden">
            {/* Background Decor - Tạo hiệu ứng chiều sâu */}
            <div className="absolute top-0 -left-20 w-80 h-80 bg-blue-600/10 blur-[120px] rounded-full"></div>
            <div className="absolute bottom-0 -right-20 w-80 h-80 bg-indigo-900/10 blur-[120px] rounded-full"></div>

            <div className="bg-zinc-900/80 backdrop-blur-xl p-8 md:p-10 rounded-3xl border border-zinc-800 shadow-2xl w-full max-w-md relative z-10 animate-fadeIn">
            
            {/* Header Form */}
            <div className="text-center mb-10">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600/10 rounded-2xl border border-blue-500/20 mb-4">
                <i className="fa-solid fa-shield-halved text-2xl text-blue-500"></i>
                </div>
                <h2 className="text-3xl font-black text-white uppercase italic tracking-tighter">
                Admin <span className="text-blue-500">Access</span>
                </h2>
                <p className="text-zinc-500 text-sm mt-2">Vui lòng đăng nhập để quản trị hệ thống</p>
            </div>

            {/* Thông báo lỗi */}
            {error && (
                <div className="mb-6 p-4 bg-red-500/10 border-l-4 border-red-500 text-red-500 text-xs md:text-sm rounded-r-xl animate-shake flex items-center gap-3">
                <i className="fa-solid fa-triangle-exclamation"></i>
                <span>{error.response?.data?.content || error.message || "Tài khoản hoặc mật khẩu không đúng!"}</span>
                </div>
            )}

            <form onSubmit={handleLogin} className="space-y-6">
                {/* Tài khoản */}
                <div className="space-y-2">
                <label className="text-[10px] font-black text-zinc-400 uppercase ml-1 tracking-widest">Tài Khoản Admin</label>
                <div className="relative group">
                    <i className="fa-solid fa-user-shield absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600 group-focus-within:text-blue-500 transition-colors"></i>
                    <input
                    onBlur={validationForm}
                    onChange={handleOnChange}
                    name="taiKhoan"
                    type="text"
                    className="w-full bg-zinc-800/50 text-white pl-11 pr-4 py-3.5 rounded-xl border border-zinc-700 focus:border-blue-500 focus:bg-zinc-800 transition-all outline-none text-sm placeholder:text-zinc-600"
                    placeholder="Username..."
                    />
                </div>
                {erros.taiKhoan && <span className="text-red-500 text-[10px] italic ml-1">{erros.taiKhoan}</span>}
                </div>

                {/* Mật khẩu */}
                <div className="space-y-2">
                <label className="text-[10px] font-black text-zinc-400 uppercase ml-1 tracking-widest">Mật Mã</label>
                <div className="relative group">
                    <i className="fa-solid fa-key absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600 group-focus-within:text-blue-500 transition-colors"></i>
                    <input
                    onBlur={validationForm}
                    onChange={handleOnChange}
                    name="matKhau"
                    type="password"
                    className="w-full bg-zinc-800/50 text-white pl-11 pr-4 py-3.5 rounded-xl border border-zinc-700 focus:border-blue-500 focus:bg-zinc-800 transition-all outline-none text-sm placeholder:text-zinc-600"
                    placeholder="••••••••"
                    />
                </div>
                {erros.matKhau && <span className="text-red-500 text-[10px] italic ml-1">{erros.matKhau}</span>}
                </div>

                {/* Nút đăng nhập */}
                <button
                disabled={isDisableLogin}
                type="submit"
                className={`w-full py-4 rounded-xl font-black uppercase italic tracking-wider transition-all active:scale-[0.98] shadow-xl flex items-center justify-center gap-2 ${
                    isDisableLogin 
                    ? "bg-zinc-800 text-zinc-600 cursor-not-allowed border border-zinc-700" 
                    : "bg-blue-600 text-white hover:bg-white hover:text-blue-600 shadow-blue-600/20"
                }`}
                >
                {loading ? (
                    <i className="fa-solid fa-circle-notch animate-spin text-lg"></i>
                ) : (
                    <>
                    <i className="fa-solid fa-right-to-bracket"></i>
                    Đăng nhập hệ thống
                    </>
                )}
                </button>
            </form>

            {/* Footer phụ */}
            <div className="mt-8 text-center">
                <button 
                onClick={() => navigate("/")}
                className="text-zinc-600 hover:text-zinc-400 text-[10px] uppercase font-bold tracking-widest transition-colors"
                >
                <i className="fa-solid fa-arrow-left mr-1"></i> Quay lại trang chủ
                </button>
            </div>
            </div>
        </div>
        );
}
