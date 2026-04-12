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
    <div
      className="
        bg-zinc-900 border border-zinc-800 
        rounded-2xl 
        p-4 sm:p-5 md:p-6 
        w-full mt-10 
        flex flex-col sm:flex-row flex-wrap 
        justify-center md:justify-between 
        gap-4 md:gap-6 
        lg:w-4/5 
        shadow-inner
      "
    >
      {legendItems.map((item, index) => (
        <div
          key={index}
          className="flex items-center gap-3 min-w-[140px]"
        >
          {/* Ô ghế */}
          <div
            className={`
              w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 
              rounded-md 
              flex items-center justify-center 
              font-bold text-[10px] sm:text-xs 
              ${item.class}
            `}
          >
            {item.icon}
          </div>

          {/* Text */}
          <span className="text-gray-400 text-xs sm:text-sm font-medium">
            {item.text}
          </span>
        </div>
      ))}
    </div>
  );
}