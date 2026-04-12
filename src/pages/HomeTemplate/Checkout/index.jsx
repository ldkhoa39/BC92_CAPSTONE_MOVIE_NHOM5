import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRoomDetail } from './slice';
import SeatMap from './../_components/SeatMap';
import TicketInfo from './../_components/TicketInfo';
import SeatLegend from '../_components/SeatLegend';

export default function Checkout() {
  const { maLichChieu } = useParams();
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.checkoutReducer);

  useEffect(() => {
    dispatch(fetchRoomDetail(maLichChieu));
  }, [maLichChieu]);

  if (loading) return <div className="text-white text-center pt-20">Đang tải phòng vé...</div>;

  return (
    <div className="min-h-screen bg-zinc-950 pt-20 md:pt-28 pb-10 text-white selection:bg-red-600/30">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-12 gap-6 lg:gap-10">
          
          {/* BÊN TRÁI: KHÔNG GIAN ĐẶT GHẾ */}
          <div className="col-span-12 lg:col-span-8 flex flex-col items-center">
            
            {/* KHU VỰC MÀN HÌNH CẢM HỨNG CINEMA */}
            <div className="relative w-full mb-16 mt-4 md:mt-0">
              {/* Hiệu ứng màn hình cong và hắt sáng */}
              <div className="w-[90%] mx-auto h-1.5 bg-gradient-to-r from-transparent via-zinc-400 to-transparent rounded-full shadow-[0_15px_40px_rgba(220,38,38,0.5)]"></div>
              <div className="absolute top-2 left-1/2 -translate-x-1/2 w-[80%] h-20 bg-gradient-to-b from-red-600/10 to-transparent blur-2xl opacity-50"></div>
              <p className="text-center text-zinc-500 text-[10px] md:text-xs tracking-[1.5em] mt-6 uppercase font-black">
                Màn Hình
              </p>
            </div>

            {/* SƠ ĐỒ GHẾ*/}
            <div className="w-full overflow-x-auto pb-8 scrollbar-hide no-scrollbar-y">
               <div className="min-w-[600px] md:min-w-full flex justify-center">
                  <SeatMap />
               </div>
            </div>

            {/* CHÚ THÍCH GHẾ */}
            <div className="w-full mt-4 p-6 bg-zinc-900/40 rounded-3xl border border-zinc-800/50">
               <SeatLegend />
            </div>
          </div>

          {/* BÊN PHẢI: HOÁ ĐƠN THANH TOÁN*/}
          <div className="col-span-12 lg:col-span-4 lg:relative">
            <div className="lg:sticky lg:top-28 transition-all duration-300">
              <TicketInfo />
              
              {/* Thông tin hỗ trợ nhanh dưới bill */}
              <div className="mt-6 px-4 py-3 bg-zinc-900/20 border border-zinc-800/50 rounded-2xl">
                <p className="text-[10px] text-zinc-500 leading-relaxed uppercase tracking-tighter">
                  Lưu ý: Vé đã mua không thể đổi trả. Vui lòng kiểm tra kỹ số ghế và rạp chiếu trước khi hoàn tất.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}