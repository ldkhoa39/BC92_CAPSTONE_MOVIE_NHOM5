import React, { useState, useEffect } from 'react';
import moment from "moment";

export default function LichChieuDetail({ lichChieu }) {
  const [selectedDate, setSelectedDate] = useState(null);

  // Logic nhóm dữ liệu (giữ nguyên của Khoa)
  const groupLichChieuByDate = (data) => {
    if (!data) return {};
    return data.reduce((groups, item) => {
      const date = moment(item.ngayChieuGioChieu).format('DD/MM/YYYY');
      if (!groups[date]) groups[date] = [];
      groups[date].push(item);
      return groups;
    }, {});
  };

  const groupedData = groupLichChieuByDate(lichChieu);
  const dates = Object.keys(groupedData);

  useEffect(() => {
    if (dates.length > 0 && !selectedDate) {
      setSelectedDate(dates[0]);
    }
  }, [dates, selectedDate]);

  if (!lichChieu || lichChieu.length === 0) {
    return <div className="text-zinc-500 italic">Hiện chưa có lịch chiếu cho phim này.</div>;
  }

  return (
    <div className="mt-4 w-full h-auto no-scrollbar-y">
      {/*KHU VỰC CHỌN NGÀY */}
      <div className="relative overflow-hidden h-[85px]">
        <div className="flex gap-3 overflow-x-auto pb-10 scrollbar-hide no-scrollbar-y select-none">
          {dates.map((date) => {
            const isSelected = selectedDate === date;
            const [day, month] = date.split('/');

            return (
              <button
                key={date}
                onClick={() => setSelectedDate(date)}
                className={`flex-shrink-0 min-w-[85px] py-3 px-2 rounded-2xl border transition-all duration-300 ${isSelected
                    ? "bg-red-600 border-red-600 text-white shadow-lg shadow-red-900/40"
                    : "bg-zinc-900 border-zinc-800 text-zinc-500 hover:border-zinc-700"
                  }`}
              >
                <div className="text-[10px] uppercase font-bold tracking-tighter opacity-80">
                  {moment(date, 'DD/MM/YYYY').format('ddd')}
                </div>
                <div className="text-base font-black">
                  {day}/{month}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/*KHU VỰC GIỜ CHIẾU */}
      <div className="mt-4">
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3">
          {groupedData[selectedDate]?.map(({ maLichChieu, ngayChieuGioChieu }) => (
            <button
              key={maLichChieu}
              onClick={() => handleBooking?.(maLichChieu)}
              className="py-2.5 bg-zinc-900 hover:bg-red-600 border border-zinc-800 hover:border-red-500 rounded-lg transition-all group"
            >
              <span className="text-sm md:text-base font-bold font-mono text-zinc-300 group-hover:text-white">
                {moment(ngayChieuGioChieu).format('HH:mm')}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}