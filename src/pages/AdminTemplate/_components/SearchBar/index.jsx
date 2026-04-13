import { useState, useEffect } from "react";

export default function SearchBar({ onSearch }) { // Nhận hàm onSearch từ cha
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      onSearch(searchTerm); // Gửi từ khóa về cho cha
    }, 300); // 300ms là đủ nhanh

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  return (
    <div className="relative w-full max-w-md group">
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
        <i className="fa-solid fa-magnifying-glass text-zinc-500 group-focus-within:text-red-500 transition-colors"></i>
      </div>
      <input
        type="text"
        className="block w-full pl-11 pr-4 py-3 bg-zinc-900/80 border border-zinc-800 text-zinc-200 text-sm rounded-xl focus:ring-1 focus:ring-red-600 focus:border-red-600 outline-none transition-all placeholder:text-zinc-600 shadow-inner"
        placeholder="Tìm kiếm tài khoản hoặc họ tên..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  );
}