import React from 'react';

export default function AdminFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-gray-200 py-4 px-8 mt-auto">
      <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
        <div>
          <span className="font-semibold text-blue-600">CyberSoft Movie</span> © {currentYear} All Rights Reserved.
        </div>
        <div className="flex space-x-6 mt-2 md:mt-0">
            <a href="#" className="hover:text-blue-600 transition">Nhóm 5: Lý Đăng Khoa & Nguyễn Minh Tân</a>
          <a href="#" className="hover:text-blue-600 transition">Hỗ trợ kỹ thuật</a>
          <a href="#" className="hover:text-blue-600 transition">Tài liệu API</a>
          <span className="text-gray-300">|</span>
          <span className="font-medium text-gray-400">Version 1.0.4</span>
        </div>
      </div>
    </footer>
  );
}