import React, { useState, useEffect } from 'react';
import moment from "moment"

export default function LichChieuDetail({ lichChieu }) {
  // 1. State lưu trữ ngày đang được chọn (mặc định chưa chọn gì)
  const [selectedDate, setSelectedDate] = useState(null);

  // 2. Hàm Logic: Nhóm tất cả suất chiếu theo Ngày (DD/MM/YYYY)
  const groupLichChieuByDate = (data) => {
    if (!data) return {};
    return data.reduce((groups, item) => {
      // Lấy nhãn ngày (Key)
      const date = moment(item.ngayChieuGioChieu).format('DD/MM/YYYY');
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(item);
      return groups;
    }, {});
  };

  // 3. Thực hiện nhóm dữ liệu
  const groupedData = groupLichChieuByDate(lichChieu);
  const dates = Object.keys(groupedData); // Lấy danh sách các ngày có suất chiếu

  // 4. Tự động chọn ngày đầu tiên khi dữ liệu vừa load xong
  useEffect(() => {
    if (dates.length > 0 && !selectedDate) {
      setSelectedDate(dates[0]);
    }
  }, [dates, selectedDate]);

  if (!lichChieu || lichChieu.length === 0) {
    return <div className="text-zinc-500 italic">Hiện chưa có lịch chiếu cho phim này.</div>;
  }

  return (
    <div className="mt-2">
      {/* Hàng chọn Ngày (Tabs) */}
      <div className="flex gap-2 overflow-x-auto pb-4 mb-4 scrollbar-hide">
        {dates.map((date) => (
          <button
            key={date}
            onClick={() => setSelectedDate(date)}
            className={`min-w-[80px] py-2 px-3 rounded-xl border transition-all ${
              selectedDate === date
                ? "bg-red-600 border-red-600 text-white"
                : "bg-zinc-800 border-zinc-700 text-zinc-500"
            }`}
          >
            <div className="text-[10px] uppercase font-bold">{moment(date, 'DD/MM/YYYY').format('ddd')}</div>
            <div className="text-sm font-black">{date.split('/')[0]}/{date.split('/')[1]}</div>
          </button>
        ))}
      </div>

      {/* Danh sách giờ chiếu */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {groupedData[selectedDate]?.map((suat) => (
          <button
            key={suat.maLichChieu}
            // GỌI HÀM handleBooking KHI CLICK
            onClick={() => handleBooking(suat.maLichChieu)}
            className="p-3 bg-zinc-800 hover:bg-red-600 border border-zinc-700 rounded-lg transition-all text-center group"
          >
            <span className="text-lg font-bold font-mono">
              {moment(suat.ngayChieuGioChieu).format('HH:mm')}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}