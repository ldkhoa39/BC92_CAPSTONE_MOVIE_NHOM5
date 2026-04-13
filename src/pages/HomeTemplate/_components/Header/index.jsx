import React from 'react';
import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logOut } from '../../Login/slice';

export default function Header() {

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const dispatch = useDispatch();
  
  // Lấy state từ loginReducer
  const { userLogin } = useSelector((state) => state.loginReducer);

  const handleLogout = () => {
    dispatch(logOut());
    setIsMenuOpen(false);
  };

  // Style cho các link điều hướng khi Active
  const navLinkClass = ({ isActive }) =>
    `block py-2 px-3 rounded md:p-0 transition-all duration-300 ${
      isActive ? "text-red-500 font-bold" : "text-gray-300 hover:text-white"
    }`;

  return (
    <nav className="bg-zinc-950 border-b border-zinc-800 sticky top-0 z-50 w-full h-16 md:h-20 flex items-center">
      <div className="w-full max-w-screen-xl flex flex-wrap items-center justify-between mx-auto px-4 md:px-6">
        
        {/* LOGO */}
        <NavLink to="/" className="flex items-center space-x-3 italic shrink-0">
          <span className="self-center text-xl md:text-2xl font-black whitespace-nowrap text-white">
            BC92<span className="text-red-600 underline">MOVIE</span>
          </span>
        </NavLink>

        {/* Nút Menu cho Mobile */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-400 rounded-lg lg:hidden hover:bg-zinc-800 focus:outline-none"
        >
          <span className="sr-only">Open main menu</span>
          {isMenuOpen ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 17 14">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
            </svg>
          )}
        </button>

        {/* MENU ITEMS */}
        <div className={`${isMenuOpen ? "block" : "hidden"} w-full lg:block lg:w-auto transition-all duration-300`} id="navbar-default">
          <ul className="font-medium flex flex-col p-4 lg:p-0 mt-4 border border-zinc-800 rounded-2xl bg-zinc-900 lg:flex-row lg:space-x-6 xl:space-x-8 lg:mt-0 lg:border-0 lg:bg-transparent items-center">
            <li>
              <NavLink to="/" className={navLinkClass} end onClick={() => setIsMenuOpen(false)}>Trang chủ</NavLink>
            </li>
            <li>
              <NavLink to="/list-movie" className={navLinkClass} onClick={() => setIsMenuOpen(false)}>Phim đang chiếu</NavLink>
            </li>
            <li>
              <NavLink to="/booking" className={navLinkClass} onClick={() => setIsMenuOpen(false)}>Đặt vé</NavLink>
            </li>
            
            <li className="hidden lg:block w-[1px] h-5 bg-zinc-700 mx-2"></li>
            
            {/* Cụm nút bấm: Xử lý hiển thị theo trạng thái đăng nhập */}
            <li className="flex flex-col lg:flex-row gap-3 w-full lg:w-auto mt-4 lg:mt-0 items-center">
              {userLogin ? (
                // Trường hợp ĐÃ ĐĂNG NHẬP
                <div className="flex items-center gap-4">
                  <div className="flex flex-col items-end">
                    <span className="text-[10px] text-zinc-500 uppercase font-black tracking-tighter">Thành viên</span>
                    <span className="text-white font-bold text-sm">
                      Xin chào, <span className="text-red-500">{userLogin.hoTen}</span>
                    </span>
                  </div>
                  <button 
                    onClick={handleLogout}
                    className="text-white bg-zinc-800 hover:bg-red-600 border border-zinc-700 hover:border-red-600 font-bold rounded-xl text-xs px-4 py-2 text-center transition-all active:scale-95"
                  >
                    ĐĂNG XUẤT
                  </button>
                </div>
              ) : (
                // Trường hợp CHƯA ĐĂNG NHẬP
                <>
                  <NavLink 
                    to="/login" 
                    onClick={() => setIsMenuOpen(false)}
                    className="text-white bg-red-600 hover:bg-white hover:text-red-600 font-bold rounded-xl text-xs xl:text-sm px-5 py-2.5 text-center transition-all shadow-lg shadow-red-600/20"
                  >
                    ĐĂNG NHẬP
                  </NavLink>

                  <NavLink 
                    to="/register" 
                    onClick={() => setIsMenuOpen(false)}
                    className="text-white bg-red-600 hover:bg-white hover:text-red-600 font-bold rounded-xl text-xs xl:text-sm px-5 py-2.5 text-center transition-all shadow-lg shadow-red-600/20"
                  >
                    ĐĂNG KÝ
                  </NavLink>
                </>
              )}

              {/* Luôn hiển thị nút Admin */}
              <NavLink 
                to="/auth" 
                onClick={() => setIsMenuOpen(false)}
                className="text-white bg-amber-600 hover:bg-amber-700 font-bold rounded-xl text-xs xl:text-sm px-5 py-2.5 text-center transition-all"
              >
                ADMIN
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}