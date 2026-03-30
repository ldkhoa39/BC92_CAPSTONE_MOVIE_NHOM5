import React from 'react';

// Định nghĩa dữ liệu chú thích 
const legendItems = [
  {
    class: "bg-red-600",
    text: "Ghế còn trống",
    icon: null
  },
  {
    class: "bg-yellow-500",
    text: "Ghế bạn đang chọn",
    icon: null
  },
  {
    class: "bg-zinc-700 text-zinc-500 border border-zinc-600",
    text: "Ghế đã được đặt",
    icon: <i className="fa-solid fa-xmark text-xs"></i> 
  }
];

export default function SeatLegend() {
  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 w-full mt-12 flex flex-col md:flex-row justify-between gap-6 md:gap-4 lg:w-4/5 shadow-inner">
      {legendItems.map((item, index) => (
        <div key={index} className="flex items-center gap-4">
          {/* Ô màu mô phỏng ghế */}
          <div className={`w-8 h-8 rounded-md flex items-center justify-center font-bold text-[10px] ${item.class}`}>
            {item.icon}
          </div>
          {/* Chữ mô tả */}
          <span className="text-gray-400 text-sm font-medium tracking-wide">
            {item.text}
          </span>
        </div>
      ))}
    </div>
  );
}