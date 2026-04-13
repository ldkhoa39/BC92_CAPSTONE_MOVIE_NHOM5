import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import {bookTicket, clearBooking} from "../../Checkout/slice";

export default function TicketInfo() {
  const { danhSachGheDangDat } = useSelector((state) => state.checkoutReducer);
  const dispatch = useDispatch();
  
  // Lấy mã lịch chiếu từ trên thanh URL xuống
  const { maLichChieu } = useParams();

  // Tính tổng tiền
  const total = danhSachGheDangDat.reduce((sum, ghe) => {
    return sum + ghe.giaVe;
  }, 0);

  // Hàm xử lý khi bấm nút Thanh toán
  const handleCheckout = () => {
    // Build mảng ghế đang chọn đúng chuẩn API yêu cầu (chỉ lấy maGhe và giaVe)
    const danhSachVeApi = danhSachGheDangDat.map((ghe) => ({
      maGhe: ghe.maGhe,
      giaVe: ghe.giaVe,
    }));

    // Đóng gói dữ liệu
    const bookingInfo = {
      maLichChieu: Number(maLichChieu), // Luôn là số
      danhSachVe: danhSachVeApi,
    };

    // Dispatch action đặt vé và đợi kết quả
    dispatch(bookTicket(bookingInfo))
      .unwrap()
      .then(() => {
        // Nếu API báo đặt thành công, tiến hành dọn dẹp mảng ghế đang chọn cho sạch sẽ
        dispatch(clearBooking());
      })
      .catch((error) => {
        // Nếu có lỗi (ví dụ: mất mạng, hoặc token sai) thì báo lên
        console.log("Lỗi đặt vé: ", error);
        alert(error || "Có lỗi xảy ra khi đặt vé!");
      });
  };

  return (
    <div className="bg-white p-4 md:p-6 rounded-2xl md:rounded-3xl text-black shadow-2xl relative overflow-hidden">
      {/* Hiệu ứng đường răng cưa*/}
      <div className="hidden md:block absolute -left-2 top-1/2 -translate-y-1/2 w-4 h-8 bg-zinc-950 rounded-full"></div>
      <div className="hidden md:block absolute -right-2 top-1/2 -translate-y-1/2 w-4 h-8 bg-zinc-950 rounded-full"></div>

      {/*TỔNG TIỀN */}
      <div className="text-center md:text-left border-b border-dashed border-zinc-300 pb-4">
        <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-1">Tổng tiền thanh toán</p>
        <h2 className="text-3xl md:text-4xl font-black text-green-600">
          {total.toLocaleString()} <span className="text-sm">VNĐ</span>
        </h2>
      </div>

      {/*CHI TIẾT GHẾ */}
      <div className="py-4 border-b border-dashed border-zinc-300">
        <div className="flex justify-between items-center mb-2">
          <p className="text-xs font-bold text-zinc-500 uppercase">Ghế đang chọn:</p>
          <span className="bg-red-100 text-red-600 text-[10px] px-2 py-0.5 rounded-full font-bold">
            {danhSachGheDangDat.length} ghế
          </span>
        </div>
        
        <div className="flex flex-wrap gap-2 min-h-[40px]">
          {danhSachGheDangDat.length > 0 ? (
            danhSachGheDangDat.map((ghe) => (
              <span 
                key={ghe.maGhe} 
                className="text-sm font-black text-red-600 bg-red-50 px-3 py-1 rounded-lg border border-red-100 animate-pulse"
              >
                {ghe.tenGhe}
              </span>
            ))
          ) : (
            <span className="text-sm italic text-zinc-400">Vui lòng chọn ghế...</span>
          )}
        </div>
      </div>

      {/*THÔNG TIN BỔ SUNG */}
      <div className="py-4 space-y-2">
        <div className="flex justify-between text-xs">
          <span className="text-zinc-500">Hình thức:</span>
          <span className="font-bold text-zinc-800">Trực tuyến</span>
        </div>
        <div className="flex justify-between text-xs">
          <span className="text-zinc-500">Phí dịch vụ:</span>
          <span className="font-bold text-zinc-800">Miễn phí</span>
        </div>
      </div>
      
      {/*NÚT THANH TOÁN */}
      <button 
        disabled={danhSachGheDangDat.length === 0}
        onClick={handleCheckout} 
        className="w-full bg-red-600 hover:bg-zinc-900 disabled:bg-zinc-200 disabled:text-zinc-400 text-white py-4 rounded-xl mt-2 font-black transition-all duration-300 shadow-lg shadow-red-600/20 uppercase tracking-wider active:scale-95"
      >
        Thanh toán ngay
      </button>
      
      <p className="text-[10px] text-zinc-400 text-center mt-4 italic">
        * Kiểm tra kỹ thông tin trước khi thanh toán
      </p>
    </div>
  );
}