import React from 'react';
import { useSelector } from 'react-redux';

export default function TicketInfo() {

  const { danhSachGheDangDat } = useSelector((state) => state.checkoutReducer);

  const total = danhSachGheDangDat.reduce((sum, ghe) => {
    return sum + ghe.giaVe;
  }, 0);

  return (
    <div className="bg-white p-6 rounded-2xl text-black">
      {/*tổng tiền */}
      <h2 className="text-3xl font-bold text-green-600 border-b pb-4">
        {total.toLocaleString()} VNĐ
      </h2>

      {/* chi tiết ghế đã chọn để kiểm tra */}
      <div className="py-4">
          <p className="text-gray-500">Ghế đang chọn:</p>
          <div className="flex flex-wrap gap-2 mt-2">
              {danhSachGheDangDat.map((ghe) => (
                  <span key={ghe.maGhe} className="text-red-600 font-bold">
                      Ghế {ghe.tenGhe}
                  </span>
              ))}
          </div>
      </div>
      
      {/* Nút thanh toán */}
      <button className="w-full bg-red-600 text-white py-3 rounded-lg mt-4 font-bold">
          THANH TOÁN
      </button>
    </div>
  );
}