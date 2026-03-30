import React from 'react';
import { Link } from "react-router-dom";

export default function Movie({ movie }) {
  return (
    <div className="group relative bg-zinc-800 border border-zinc-700 rounded-xl overflow-hidden shadow-lg hover:shadow-red-600/20 transition-all duration-300 flex flex-col h-full">
      {/* Hình ảnh phim với hiệu ứng Hover Zoom */}
      <div className="relative overflow-hidden aspect-[2/3]">
        <img
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          src={movie.hinhAnh}
          alt={movie.tenPhim}
        />
        {/* Lớp phủ đen mờ khi hover */}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4">
          <Link 
            to={`/detail/${movie.maPhim}`} 
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-full transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 shadow-lg"
          >
            XEM CHI TIẾT
          </Link>
        </div>
        
        {/* Tag đánh giá ở góc hình ảnh */}
        <div className="absolute top-2 right-2 bg-black/70 text-yellow-400 text-xs font-bold px-2 py-1 rounded backdrop-blur-md border border-zinc-600">
          ★ {movie.danhGia}
        </div>
      </div>

      {/* Nội dung phim */}
      <div className="p-5 flex flex-col flex-grow">
        <h5 className="mb-3 text-lg font-bold tracking-tight text-white line-clamp-2 uppercase group-hover:text-red-500 transition-colors">
          {movie.tenPhim}
        </h5>
        
        <p className="text-gray-400 text-sm line-clamp-3 mb-4 flex-grow">
          {movie.moTa || "Mô tả phim đang được cập nhật..."}
        </p>

        {/* Nút bấm phụ cho mobile hoặc khi không hover */}
        <Link 
          to={`/detail/${movie.maPhim}`} 
          className="inline-flex items-center justify-center w-full py-2.5 text-sm font-bold text-center text-white bg-zinc-700 rounded-lg hover:bg-red-600 transition-colors md:hidden"
        >
          CHI TIẾT
          <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
          </svg>
        </Link>
      </div>
    </div>
  );
}