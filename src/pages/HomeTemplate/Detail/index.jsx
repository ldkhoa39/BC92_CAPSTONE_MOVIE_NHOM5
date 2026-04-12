import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; 
import { useDispatch, useSelector } from 'react-redux';
import { fetchDetailMovie } from './slice';
import LichChieuDetail from '../_components/LichChieuDetail';

export default function Detail() {
    const dispatch = useDispatch();
    const navigate = useNavigate(); 
    const { maPhim } = useParams();

    const { loading, data } = useSelector((state) => state.detailMovieReducer);
    const { detail, schedule } = data || {};

    const handleBooking = (maLichChieu) => {
        if (maLichChieu) {
            navigate(`/checkout/${maLichChieu}`);
        } else {
            alert("Hiện tại phim chưa có lịch chiếu cụ thể.");
        }
    };

    const firstTicketId = schedule?.heThongRapChieu?.[0]?.cumRapChieu?.[0]?.lichChieuPhim?.[0]?.maLichChieu;

    useEffect(() => {
        if (maPhim) {
            dispatch(fetchDetailMovie(maPhim));
        }
        window.scrollTo(0, 0);
    }, [maPhim, dispatch]);

    if (loading) return (
        <div className="flex justify-center items-center h-screen bg-zinc-950">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-red-600"></div>
        </div>
    );

    if (!data) return (
        <div className="h-screen bg-zinc-950 flex items-center justify-center text-white text-xl">
            Không tìm thấy thông tin phim.
        </div>
    );

    return (
        <div className="bg-zinc-950 min-h-screen text-white pb-20">
            {/* Banner blur */}
            <div className="relative h-[300px] md:h-[400px] w-full overflow-hidden">
                <img
                    src={detail?.hinhAnh}
                    className="w-full h-full object-cover blur-xl opacity-30 scale-110"
                    alt="backdrop"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 to-transparent"></div>
            </div>

            {/* Nội dung chính */}
            <div className="container mx-auto px-4 sm:px-6 -mt-32 md:-mt-64 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
                    
                    {/* Poster Phim */}
                    <div className="md:col-span-1 flex flex-col items-center md:items-start">
                        <img
                            src={detail?.hinhAnh}
                            alt={detail?.tenPhim}
                            className="w-2/3 md:w-full rounded-2xl shadow-2xl border-4 border-zinc-800 shadow-red-900/20"
                        />
                        <button
                            onClick={() => handleBooking(firstTicketId)}
                            className="w-2/3 md:w-full mt-6 bg-red-600 hover:bg-red-700 text-white font-black py-3 md:py-4 rounded-xl transition-all shadow-lg hover:scale-105 uppercase text-sm md:text-base">
                            Mua vé ngay
                        </button>
                    </div>

                    {/* Thông tin Phim */}
                    <div className="md:col-span-2 flex flex-col justify-end pb-4 text-center md:text-left mt-6 md:mt-0">
                        <h1 className="text-3xl sm:text-4xl md:text-6xl font-black uppercase tracking-tighter text-white mb-4">
                            {detail?.tenPhim}
                        </h1>

                        <div className="flex items-center justify-center md:justify-start space-x-3 md:space-x-4 mb-6">
                            <span className="bg-red-600 text-[10px] md:text-xs font-bold px-2 md:px-2.5 py-1 rounded">C18</span>
                            <span className="text-yellow-400 font-bold text-sm md:text-base">★ {detail?.danhGia}/10</span>
                            <span className="text-gray-400 text-sm md:text-base">{new Date(detail?.ngayKhoiChieu).getFullYear()}</span>
                        </div>

                        <div className="bg-zinc-900/80 backdrop-blur-md p-5 md:p-6 rounded-2xl border border-zinc-800 text-left">
                            <h2 className="text-red-500 font-bold uppercase mb-2 tracking-widest text-xs md:text-sm">Nội dung phim</h2>
                            <p className="text-gray-300 leading-relaxed text-sm md:text-lg italic line-clamp-4 md:line-clamp-none">
                                "{detail?.moTa || 'Đang cập nhật nội dung...'}"
                            </p>
                        </div>
                    </div>
                </div>

                {/* Phần Lịch Chiếu */}
                <div className="mt-16 md:mt-20">
                    <h3 className="text-xl md:text-2xl font-bold mb-6 md:mb-8 border-l-4 border-red-600 pl-4 uppercase tracking-wider">
                        Lịch chiếu & Suất chiếu
                    </h3>

                    {schedule?.heThongRapChieu?.length > 0 ? (
                        <div className="grid grid-cols-1 lg:grid-cols-4 bg-zinc-900 rounded-2xl border border-zinc-800 shadow-2xl overflow-hidden">

                            {/* TABS LOGO (Responsive: Ngang trên Mobile, Dọc trên Desktop) */}
                            <div className="col-span-1 border-b lg:border-b-0 lg:border-r border-zinc-800 bg-zinc-950/80 flex lg:flex-col overflow-x-auto scrollbar-hide no-scrollbar-y">
                                {schedule.heThongRapChieu.map((htr) => (
                                    <button
                                        key={htr.maHeThongRap}
                                        className="flex-shrink-0 min-w-[140px] lg:w-full flex lg:flex-row flex-col items-center justify-center lg:justify-start p-4 hover:bg-zinc-800 transition-all border-r lg:border-r-0 lg:border-b border-zinc-800 group"
                                    >
                                        <img src={htr.logo} className="w-10 h-10 md:w-12 md:h-12 grayscale group-hover:grayscale-0 transition-all mb-2 lg:mb-0" alt={htr.tenHeThongRap} />
                                        <span className="lg:ml-3 font-bold text-gray-400 group-hover:text-white uppercase text-[10px] md:text-sm text-center lg:text-left">
                                            {htr.tenHeThongRap}
                                        </span>
                                    </button>
                                ))}
                            </div>

                            {/* CỤM RẠP & SUẤT CHIẾU  */}
                            <div className="col-span-1 lg:col-span-3 p-4 md:p-6 h-auto">
                                {schedule.heThongRapChieu[0]?.cumRapChieu.map((cumRap) => (
                                    <div key={cumRap.maCumRap} className="mb-8 md:mb-10 last:mb-0">
                                        <h4 className="text-lg md:text-xl font-bold text-red-500 mb-4 flex items-center">
                                            <svg className="w-5 h-5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" />
                                            </svg>
                                            <span className="truncate">{cumRap.tenCumRap}</span>
                                        </h4>

                                        <LichChieuDetail 
                                            lichChieu={cumRap.lichChieuPhim} 
                                            handleBooking={handleBooking} 
                                        />
                                        
                                        <hr className="mt-6 md:mt-8 border-zinc-800" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <div className="p-8 md:p-10 bg-zinc-900 rounded-2xl border border-dashed border-zinc-700 text-center text-gray-500">
                            Phim hiện chưa có lịch chiếu trên hệ thống.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}