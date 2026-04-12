import React, { useEffect } from 'react'; 
import { useSelector, useDispatch } from 'react-redux';
import { fetchListMovieAdmin } from "../Films/slice";

export default function Dashboard() {
  const dispatch = useDispatch();
  const { listMovie } = useSelector((state) => state.filmsReducer);

  useEffect(() => {
    dispatch(fetchListMovieAdmin());
  }, [dispatch]); 

  const total = listMovie?.length || 0;
  const currentlyShowing = listMovie?.filter(item => item.dangChieu).length || 0;
  const upcoming = listMovie?.filter(item => item.sapChieu).length || 0;

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Tiêu đề Dashboard */}
      <div>
        <h1 className="text-2xl font-black text-white uppercase tracking-tight">Tổng quan hệ thống</h1>
        <p className="text-zinc-500 text-sm">Số liệu thống kê cập nhật mới nhất từ rạp phim.</p>
      </div>

      {/* Grid Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Tổng phim */}
        <div className="p-6 bg-zinc-900 border border-zinc-800 rounded-2xl hover:border-red-600/50 transition-colors group">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-blue-500/10 rounded-xl">
              <i className="fa-solid fa-film text-blue-500 text-xl"></i>
            </div>
            <span className="text-[10px] font-bold text-blue-500 bg-blue-500/10 px-2 py-1 rounded-md">MOVIE</span>
          </div>
          <p className="text-sm text-zinc-400 font-medium">Tổng phim hệ thống</p>
          <p className="text-3xl font-black text-white mt-1 group-hover:text-blue-500 transition-colors">{total}</p>
        </div>

        {/* Đang chiếu */}
        <div className="p-6 bg-zinc-900 border border-zinc-800 rounded-2xl hover:border-green-600/50 transition-colors group">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-green-500/10 rounded-xl">
              <i className="fa-solid fa-play text-green-500 text-xl"></i>
            </div>
            <span className="text-[10px] font-bold text-green-500 bg-green-500/10 px-2 py-1 rounded-md">LIVE</span>
          </div>
          <p className="text-sm text-zinc-400 font-medium">Phim đang chiếu</p>
          <p className="text-3xl font-black text-white mt-1 group-hover:text-green-500 transition-colors">{currentlyShowing}</p>
        </div>

        {/* Sắp chiếu */}
        <div className="p-6 bg-zinc-900 border border-zinc-800 rounded-2xl hover:border-amber-600/50 transition-colors group">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-amber-500/10 rounded-xl">
              <i className="fa-solid fa-clock text-amber-500 text-xl"></i>
            </div>
            <span className="text-[10px] font-bold text-amber-500 bg-amber-500/10 px-2 py-1 rounded-md">SOON</span>
          </div>
          <p className="text-sm text-zinc-400 font-medium">Phim sắp chiếu</p>
          <p className="text-3xl font-black text-white mt-1 group-hover:text-amber-500 transition-colors">{upcoming}</p>
        </div>

        {/* Cụm rạp */}
        <div className="p-6 bg-zinc-900 border border-zinc-800 rounded-2xl hover:border-purple-600/50 transition-colors group">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-purple-500/10 rounded-xl">
              <i className="fa-solid fa-building text-purple-500 text-xl"></i>
            </div>
            <span className="text-[10px] font-bold text-purple-500 bg-purple-500/10 px-2 py-1 rounded-md">LOCATION</span>
          </div>
          <p className="text-sm text-zinc-400 font-medium">Cụm rạp quản lý</p>
          <p className="text-3xl font-black text-white mt-1 group-hover:text-purple-500 transition-colors">8</p>
        </div>

      </div>

      {/* Khoa có thể thêm một cái biểu đồ */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 text-center">
         <p className="text-zinc-500 italic">Dữ liệu chi tiết về doanh thu.</p>
      </div>
    </div>
  );
}