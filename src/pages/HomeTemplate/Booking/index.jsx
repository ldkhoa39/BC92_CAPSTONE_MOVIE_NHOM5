import React from 'react'
import QuickBooking from '../_components/QuickBooking';

export default function Booking() {
  return (
    <div className="bg-zinc-950 min-h-screen pt-32 pb-20">
      <div className="container mx-auto px-4 text-center mb-10">
        <h1 className="text-4xl font-black text-white uppercase mb-2">Đặt vé nhanh</h1>
        <p className="text-zinc-500">Chọn phim và suất chiếu yêu thích của bạn chỉ trong vài giây</p>
      </div>

      <div className="container mx-auto px-4">
        
        <QuickBooking />
      </div>
      
      
    </div>
  );
}
