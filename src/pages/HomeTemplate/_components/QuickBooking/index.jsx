import React, { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';

import {
  fetchMoviesForBooking,
  fetchMovieSchedule,
  clearSchedule,
  selectAllMovies,
  selectMovieSchedule,
} from '../../Booking/slice';

export default function QuickBooking() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //STATE 
  const [selectedMovieId, setSelectedMovieId] = useState('');
  const [selectedCinemaId, setSelectedCinemaId] = useState('');
  const [selectedSessionId, setSelectedSessionId] = useState('');

  //SELECTORS
  const movieList = useSelector(selectAllMovies);
  const movieSchedule = useSelector(selectMovieSchedule);

  //ETCH MOVIES
  useEffect(() => {
    dispatch(fetchMoviesForBooking());
  }, [dispatch]);

  //FETCH SCHEDULE
  useEffect(() => {
    if (selectedMovieId) {
      dispatch(fetchMovieSchedule(selectedMovieId));
    }
  }, [selectedMovieId, dispatch]);

  //RESET CINEMA + SESSION
  const handleMovieChange = (movieId) => {
    setSelectedMovieId(movieId);
    setSelectedCinemaId('');
    setSelectedSessionId('');
    dispatch(clearSchedule());
  };

  //COMPUTED CINEMA LIST
  const cinemaList = useMemo(() => {
    if (!movieSchedule?.heThongRapChieu) return [];
    return movieSchedule.heThongRapChieu.flatMap((htr) =>
      htr.cumRapChieu.map((cum) => ({
        ...cum,
        tenHeThongRap: htr.tenHeThongRap,
      }))
    );
  }, [movieSchedule]);

  //AUTO SELECT CINEMA & SESSION
  useEffect(() => {
    if (cinemaList.length > 0) {
      //Nếu chưa chọn rạp, auto chọn rạp đầu tiên
      if (!selectedCinemaId) {
        const firstCinema = cinemaList[0];
        setSelectedCinemaId(firstCinema.maCumRap);
      }
    }
  }, [cinemaList, selectedCinemaId]);

  const sessionList = useMemo(() => {
    const cinema = cinemaList.find((c) => c.maCumRap === selectedCinemaId);
    return cinema?.lichChieuPhim || [];
  }, [cinemaList, selectedCinemaId]);

  useEffect(() => {
    if (sessionList.length > 0) {
      //Nếu chưa chọn suất, auto chọn suất đầu tiên
      if (!selectedSessionId) {
        setSelectedSessionId(sessionList[0].maLichChieu);
      }
    }
  }, [sessionList, selectedSessionId]);

  //
  return (
    <div className="bg-zinc-900/80 backdrop-blur-xl 
      p-4 sm:p-5 md:p-6 
      rounded-2xl md:rounded-3xl 
      border border-zinc-800 shadow-2xl 
      flex flex-col lg:flex-row 
      gap-3 md:gap-4 
      lg:items-end">

      {/* 1. CHỌN PHIM */}
      <div className="w-full lg:flex-1">
        <label className="text-xs md:text-sm font-bold text-red-600 uppercase mb-2 block tracking-wide px-1">
          🎬 Chọn Phim
        </label>
        <select className="w-full bg-zinc-800/50 text-white 
          p-3 md:p-3.5 
          rounded-xl border border-zinc-700 
          outline-none 
          focus:border-red-600 focus:bg-zinc-800 
          transition-all cursor-pointer 
          text-sm md:text-base" value={selectedMovieId} onChange={(e)=> handleMovieChange(e.target.value)}
          >
          <option value="">Chọn phim bạn muốn xem...</option>
          {movieList.map((movie) => (
          <option key={movie.maPhim} value={movie.maPhim} className="bg-zinc-900">
            {movie.tenPhim}
          </option>
          ))}
        </select>
      </div>

      {/* 2. CHỌN RẠP */}
      <div className="w-full lg:flex-1">
        <label className="text-xs md:text-sm font-bold text-red-600 uppercase mb-2 block tracking-wide px-1">
          📍 Chọn Rạp
        </label>
        <select disabled={!selectedMovieId || cinemaList.length===0} className="w-full bg-zinc-800/50 text-white 
          p-3 md:p-3.5 
          rounded-xl border border-zinc-700 
          outline-none 
          focus:border-red-600 focus:bg-zinc-800 
          transition-all cursor-pointer 
          disabled:opacity-40 disabled:cursor-not-allowed
          text-sm md:text-base" value={selectedCinemaId} onChange={(e)=> setSelectedCinemaId(e.target.value)}
          >
          <option value="">
            {selectedMovieId ? "Chọn rạp..." : "Vui lòng chọn phim trước"}
          </option>
          {cinemaList.map((cum) => (
          <option key={cum.maCumRap} value={cum.maCumRap} className="bg-zinc-900">
            {cum.tenHeThongRap} - {cum.tenCumRap}
          </option>
          ))}
        </select>
      </div>

      {/* 3. CHỌN SUẤT CHIẾU */}
      <div className="w-full lg:flex-1">
        <label className="text-xs md:text-sm font-bold text-red-600 uppercase mb-2 block tracking-wide px-1">
          ⏰ Suất Chiếu
        </label>
        <select disabled={!selectedCinemaId || sessionList.length===0} className="w-full bg-zinc-800/50 text-white 
          p-3 md:p-3.5 
          rounded-xl border border-zinc-700 
          outline-none 
          focus:border-red-600 focus:bg-zinc-800 
          transition-all cursor-pointer 
          disabled:opacity-40 disabled:cursor-not-allowed
          text-sm md:text-base" value={selectedSessionId} onChange={(e)=> setSelectedSessionId(e.target.value)}
          >
          <option value="">
            {selectedCinemaId ? "Chọn suất chiếu..." : "Vui lòng chọn rạp trước"}
          </option>
          {sessionList.map((lich) => (
          <option key={lich.maLichChieu} value={lich.maLichChieu} className="bg-zinc-900">
            {moment(lich.ngayChieuGioChieu).format("DD/MM/YYYY ~ HH:mm")}
          </option>
          ))}
        </select>
      </div>

      {/* BUTTON */}
      <button disabled={!selectedSessionId} onClick={()=> navigate(`/checkout/${selectedSessionId}`)}
        className="w-full lg:w-auto
        px-8 md:px-10
        py-3 md:py-3.5
        bg-red-600 hover:bg-white hover:text-red-600
        text-white font-black
        rounded-xl
        transition-all duration-300
        disabled:bg-zinc-700/50 disabled:text-zinc-500 disabled:scale-100
        active:scale-95
        uppercase tracking-tight
        shadow-lg shadow-red-600/20
        mt-1 lg:mt-0"
        >
        Mua vé ngay
      </button>
    </div>
  );
}