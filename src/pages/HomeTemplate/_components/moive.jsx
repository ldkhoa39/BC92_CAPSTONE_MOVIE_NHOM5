import React from 'react';
import { Link } from "react-router-dom";

export default function Movie({ movie }) {

  // Hàm xử lý khi link hình ảnh từ API bị die (lỗi 404 hoặc không tồn tại)
  const handleImageError = (e) => {
    e.target.src = "https://is1-ssl.mzstatic.com/image/thumb/Purple116/v4/0a/63/01/0a63013d-596a-73d8-5b12-426b38c22f0d/AppIcon-0-0-1x_U007emarketing-0-0-0-7-0-0-sRGB-0-0-0-GLES2_U002c0-512MB-85-220-0-0.png/512x512bb.jpg"; 
  };

  return (
    <div className="group relative bg-zinc-900 border border-zinc-800 
      rounded-2xl overflow-hidden shadow-xl 
      hover:shadow-red-600/30 
      transition-all duration-500 
      flex flex-col h-full 
      hover:-translate-y-1">

      {/* IMAGE */}
      <div className="relative overflow-hidden aspect-[2/3] bg-zinc-950">
        <img
          className="w-full h-full object-cover 
          transition-transform duration-700 ease-out 
          group-hover:scale-105"
          src={movie.hinhAnh}
          alt={movie.tenPhim}
          loading="lazy"
        />

        {/* gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-900/20 to-transparent"></div>

        {/* hover button (desktop only) */}
        <div className="hidden lg:flex absolute inset-0 bg-black/50 opacity-0 
          group-hover:opacity-100 transition-all duration-300 
          items-center justify-center backdrop-blur-sm z-20">

          <Link 
            to={`/detail/${movie.maPhim}`}
            className="bg-red-600 hover:bg-white hover:text-red-600 
            text-white font-bold 
            py-3 px-6 rounded-xl 
            translate-y-6 group-hover:translate-y-0 
            transition-all duration-300 shadow-lg uppercase text-sm"
          >
            Mua vé ngay
          </Link>
        </div>

        {/* rating + age */}
        <div className="absolute top-2 right-2 flex flex-col gap-1 items-end z-10">

          <div className="bg-black/80 text-yellow-400 
            text-[10px] sm:text-xs font-bold 
            px-2 py-0.5 rounded backdrop-blur border border-zinc-700 flex items-center gap-1">
            ★ {movie.danhGia}
          </div>

          <div className="bg-red-600 text-white 
            text-[9px] sm:text-[10px] font-bold 
            px-1.5 py-0.5 rounded uppercase">
            C18
          </div>

        </div>
      </div>

      {/* CONTENT */}
      <div className="flex flex-col flex-grow p-3 sm:p-4 md:p-5 gap-2 sm:gap-3">

        {/* TITLE*/}
        <h5
          className="text-sm sm:text-base md:text-lg 
          font-bold text-white uppercase 
          line-clamp-2 leading-snug 
          h-[2.8rem] sm:h-[3.2rem] md:h-[3.5rem] /* Cố định chiều cao cho 2 dòng */
          group-hover:text-red-500 transition-colors"
          title={movie.tenPhim}
        >
          {movie.tenPhim}
        </h5>

        {/* DESCRIPTION */}
        <p
          className="
          text-zinc-400 
          text-xs sm:text-sm 
          leading-relaxed 
          line-clamp-3 
          min-h-[3.5rem] sm:min-h-[4rem] /* Giữ khoảng cách tối thiểu cho 3 dòng */
          flex-grow"
        >
          {movie.moTa || "Mô tả phim đang được cập nhật..."}
        </p>

        {/* BUTTON MOBILE*/}
        <div className="mt-auto"> {/*mt-auto để đẩy nút xuống đáy card */}
          <Link 
            to={`/detail/${movie.maPhim}`}
            className="lg:hidden 
            flex items-center justify-center gap-2 
            w-full py-2.5 sm:py-3 
            text-xs sm:text-sm font-bold 
            text-white bg-zinc-800 border border-zinc-700 
            rounded-xl 
            active:bg-red-600 active:border-red-600 active:scale-95 
            transition-all duration-200 uppercase"
          >
            Đặt vé
            <svg className="w-4 h-4" viewBox="0 0 14 10" fill="none">
              <path d="M1 5h12M13 5L9 1M13 5L9 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}