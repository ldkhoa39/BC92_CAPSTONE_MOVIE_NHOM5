import React from "react";
import { useState } from "react";
import { actAuth } from "./slice"
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";


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

    if (loading) return <p>...Loading</p>;

    return (

        <div>
            <form className="max-w-sm mx-auto " onSubmit={handleLogin}>

                {error && (
                    <div
                        className="p-4 mb-4 text-sm text-fg-danger-strong rounded-base bg-danger-soft"
                        role="alert"
                    >
                        {error.response?.data?.content || error.message || "Đã có lỗi xảy ra!"}
                    </div>
                )}

                <div className="mb-5">
                    <label
                        htmlFor="email"
                        className="block mb-2.5 text-sm font-medium text-heading"
                    >
                        Tai khoan
                    </label>
                    <input
                        onBlur={validationForm}
                        onChange={handleOnChange}
                        name="taiKhoan"
                        type="text"
                        className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
                        placeholder="nhap tai khoan"
                    />
                    <div className="text-danger text-sm">{erros.taiKhoan}</div>
                </div>
                <div className="mb-5">
                    <label
                        htmlFor="password"
                        className="block mb-2.5 text-sm font-medium text-heading"
                    >
                        Mat khau
                    </label>
                    <input
                        onBlur={validationForm}
                        onChange={handleOnChange}
                        name="matKhau"
                        type="password"
                        className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
                        placeholder="nhap mat khau"
                    />
                    <div className="text-danger text-sm">{erros.matKhau}</div>
                </div>
                <button
                    disabled={isDisableLogin}
                    type="submit"
                    className={`${isDisableLogin ? "disabled:opacity-50 text-white bg-brand box-border border border-transparent hover:bg-brand-strong focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none" : "text-white bg-brand box-border border border-transparent hover:bg-brand-strong focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none"}`}
                >
                    Login
                </button>
            </form>
        </div>
    );
}
