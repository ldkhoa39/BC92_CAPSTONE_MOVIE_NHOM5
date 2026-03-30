import React from 'react';

export default function SkeletonMovie() {
  return (
    <div className="bg-zinc-900/50 rounded-2xl overflow-hidden shadow-lg animate-pulse border border-zinc-800">
      {/* Giả lập Poster phim */}
      <div className="h-[400px] bg-zinc-800"></div>
      
      <div className="p-5 space-y-4">
        {/* Giả lập tên phim */}
        <div className="h-6 bg-zinc-700 rounded w-3/4"></div>
        
        {/* Giả lập thông tin phụ */}
        <div className="space-y-2">
          <div className="h-4 bg-zinc-800 rounded w-full"></div>
          <div className="h-4 bg-zinc-800 rounded w-5/6"></div>
        </div>
        
        {/* Giả lập nút bấm */}
        <div className="h-12 bg-zinc-800 rounded-xl w-full mt-4"></div>
      </div>
    </div>
  );
}