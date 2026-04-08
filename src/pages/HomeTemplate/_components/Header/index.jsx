import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Header() {
  // Style cho các link điều hướng khi Active
  const navLinkClass = ({ isActive }) =>
    `block py-2 px-3 rounded md:p-0 transition-all duration-300 ${
      isActive ? "text-red-500 font-bold" : "text-gray-300 hover:text-white"
    }`;

  return (
    <nav className="bg-zinc-950 border-b border-zinc-800 sticky top-0 z-50 w-full">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        {/* LOGO */}
        <NavLink to="/" className="flex items-center space-x-3 italic">
          <span className="self-center text-2xl font-black whitespace-nowrap text-white">
            BC92<span className="text-red-600 underline">MOVIE</span>
          </span>
        </NavLink>

        {/* Nút Menu cho Mobile (Flowbite logic) */}
        <button
          data-collapse-toggle="navbar-default"
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-400 rounded-lg md:hidden hover:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-zinc-600"
          aria-controls="navbar-default"
          aria-expanded="false"
        >
          <span className="sr-only">Open main menu</span>
          <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
          </svg>
        </button>

        {/* MENU ITEMS */}
        <div className="hidden w-full md:block md:w-auto" id="navbar-default">
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-zinc-800 rounded-lg bg-zinc-900 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-transparent items-center">
            <li>
              <NavLink to="/" className={navLinkClass} end>Trang chủ</NavLink>
            </li>
            <li>
              <NavLink to="/list-movie" className={navLinkClass}>Phim đang chiếu</NavLink>
            </li>
            <li>
              <NavLink to="/booking" className={navLinkClass}>Đặt vé</NavLink>
            </li>
            <li className="hidden md:block w-[1px] h-5 bg-zinc-700 mx-2"></li>
            <li>
              <NavLink 
                to="/login" 
                className="text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-900 font-bold rounded-lg text-sm px-5 py-2 text-center transition-all"
              >
                ĐĂNG NHẬP
              </NavLink>

              <NavLink 
                to="/register" 
                className="text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-900 font-bold rounded-lg text-sm px-5 py-2 ml-3 text-center transition-all"
              >
                ĐĂNG KÝ
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}