import React from 'react'; 
import { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import {fetchListMovieAdmin} from "../Films/slice"

export default function Dashboard() {
  const dispatch = useDispatch();
  
  // 3. Lấy listMovie từ store
  const { listMovie } = useSelector((state) => state.filmsReducer);

  // 4. Lệnh "đi chợ": Cứ vào Dashboard là tự động gọi API lấy phim về
  useEffect(() => {
    dispatch(fetchListMovieAdmin());
  }, []); 

  // 5. Tính toán con số để hiển thị
  const total = listMovie?.length || 0;
  const currentlyShowing = listMovie?.filter(item => item.dangChieu).length || 0;

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-5 bg-white border border-gray-200 rounded-lg shadow-sm">
          <p className="text-sm text-gray-500 mb-1">Tổng phim hệ thống</p>
          <p className="text-3xl font-light text-blue-600">{total}</p>
        </div>
        <div className="p-5 bg-white border border-gray-200 rounded-lg shadow-sm">
          <p className="text-sm text-gray-500 mb-1">Phim đang chiếu</p>
          <p className="text-3xl font-light text-gray-800">{currentlyShowing}</p>
        </div>
        <div className="p-5 bg-white border border-gray-200 rounded-lg shadow-sm">
          <p className="text-sm text-gray-500 mb-1">Cụm rạp quản lý</p>
          <p className="text-3xl font-light text-gray-800">8</p>
        </div>
      </div>
    </div>
  );
}