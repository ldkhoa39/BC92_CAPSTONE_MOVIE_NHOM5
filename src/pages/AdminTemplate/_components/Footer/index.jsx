import React from 'react';

export default function AdminFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-zinc-950 border-t border-zinc-800 py-6 px-4 md:px-8 mt-auto">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-xs md:text-sm">
        
        <div className="text-zinc-500 text-center md:text-left">
          <span className="font-black text-white italic mr-2">BC92<span className="text-red-600">MOVIE</span></span> 
          © {currentYear} — Designed by <span className="text-zinc-300 font-medium">Lý Đăng Khoa & Minh Tân</span>
        </div>

        <div className="flex flex-wrap justify-center gap-4 md:gap-8 text-zinc-500">
          <a href="#" className="hover:text-red-500 transition-colors">Hỗ trợ kỹ thuật</a>
          <a href="#" className="hover:text-red-500 transition-colors">Tài liệu API</a>
          <div className="hidden md:block w-[1px] h-4 bg-zinc-800"></div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            <span className="font-mono text-zinc-600">v1.0.4</span>
          </div>
        </div>
      </div>
    </footer>
  );
}