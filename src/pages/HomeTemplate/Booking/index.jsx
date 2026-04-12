import React from 'react'
import QuickBooking from '../_components/QuickBooking';

export default function Booking() {
  return (
    <div className="bg-zinc-950 min-h-screen pt-24 md:pt-32 pb-20 selection:bg-red-600/30">
      <div className="container mx-auto px-4 text-center mb-12">
        <h1 className="text-3xl md:text-5xl font-black text-white uppercase mb-4 tracking-tighter italic animate-fade-in">
          Đặt vé <span className="text-red-600">nhanh</span>
        </h1>
        <div className="w-16 md:w-24 h-1.5 bg-red-600 mx-auto mb-6 rounded-full shadow-[0_0_15px_rgba(220,38,38,0.5)]"></div>
        
        <p className="text-zinc-500 text-sm md:text-base max-w-lg mx-auto font-light leading-relaxed">
          Không cần chờ đợi. Chọn ngay bộ phim bom tấn và vị trí rạp thuận tiện nhất cho bạn chỉ trong vài thao tác đơn giản.
        </p>
      </div>

      <div className="container mx-auto px-4 max-w-6xl">
        <div className="relative group">
          {/* Hiệu ứng hắt sáng nhẹ phía sau */}
          <div className="absolute -inset-1 bg-gradient-to-r from-red-600/20 to-zinc-900/0 rounded-[2.5rem] blur-2xl opacity-50 group-hover:opacity-100 transition duration-1000"></div>
          
          <div className="relative">
            <QuickBooking />
          </div>
        </div>
      </div>
      
      <div className="mt-16 text-center opacity-20 pointer-events-none">
        <p className="text-[60px] md:text-[100px] font-black text-zinc-800 uppercase select-none tracking-tighter">
          Quick Ticket
        </p>
      </div>
    </div>
  );
}
