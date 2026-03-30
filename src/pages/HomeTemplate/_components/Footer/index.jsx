import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-zinc-950 border-t border-zinc-800">
      <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
        <div className="md:flex md:justify-between">
          <div className="mb-6 md:mb-0">
            <a href="/" className="flex items-center">
              <span className="self-center text-xl font-bold text-white tracking-widest">
                BC92<span className="text-red-600">MOVIE</span>
              </span>
            </a>
            <p className="mt-4 text-gray-500 text-sm max-w-xs">
              Hệ thống đặt vé xem phim trực tuyến hiện đại, nhanh chóng và bảo mật nhất hiện nay.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-2">
            <div>
              <h2 className="mb-6 text-sm font-semibold text-white uppercase tracking-wider">Hỗ trợ</h2>
              <ul className="text-gray-500 font-medium">
                <li className="mb-4"><a href="#" className="hover:text-red-500 transition-colors">Góp ý</a></li>
                <li><a href="#" className="hover:text-red-500 transition-colors">Rạp & Giá vé</a></li>
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-sm font-semibold text-white uppercase tracking-wider">Pháp lý</h2>
              <ul className="text-gray-500 font-medium">
                <li className="mb-4"><a href="#" className="hover:text-red-500 transition-colors">Chính sách bảo mật</a></li>
                <li><a href="#" className="hover:text-red-500 transition-colors">Điều khoản dịch vụ</a></li>
              </ul>
            </div>
          </div>
        </div>
        <hr className="my-6 border-zinc-800 sm:mx-auto lg:my-8" />
        <div className="sm:flex sm:items-center sm:justify-between">
          <span className="text-sm text-gray-500 sm:text-center italic">
            © 2026 <a href="/" className="hover:underline">BC92 Movie™</a>. Thiết kế bởi Lý Đăng Khoa.
          </span>
        </div>
      </div>
    </footer>
  );
}