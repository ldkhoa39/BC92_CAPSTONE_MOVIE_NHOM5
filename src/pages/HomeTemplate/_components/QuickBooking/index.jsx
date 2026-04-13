import React, { useEffect, useState, useMemo, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import moment from "moment";

import {
  fetchMoviesForBooking,
  fetchMovieSchedule,
  clearSchedule,
  selectAllMovies,
  selectMovieSchedule,
} from "../../Booking/slice";

/* CUSTOM SELECT COMPONENT */
function CustomSelect({
  placeholder,
  value,
  onChange,
  options,
  disabled,
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selected = options.find((opt) => opt.value === value);

  return (
    <div ref={ref} className="relative w-full">
      {/* BUTTON */}
      <button
        onClick={() => !disabled && setOpen(!open)}
        className={`w-full text-left p-3 md:p-3.5 rounded-xl border transition-all text-sm md:text-base
        ${disabled
            ? "bg-zinc-800/40 text-zinc-500 cursor-not-allowed border-zinc-800"
            : "bg-zinc-800/60 text-white hover:border-red-500 border-zinc-700"
          }
        focus:border-red-600 outline-none`}
      >
        <span className="block truncate">
          {selected ? selected.label : placeholder}
        </span>
      </button>

      {/* DROPDOWN */}
      {open && !disabled && (
        <div className="absolute z-[100] mt-2 w-full max-h-60 overflow-y-auto bg-zinc-900 border border-zinc-700 rounded-xl shadow-2xl animate-fadeIn custom-scrollbar">
          {options.length === 0 && (
            <div className="p-3 text-zinc-500 text-sm italic">Không có dữ liệu</div>
          )}

          {options.map((opt) => (
            <div
              key={opt.value}
              onClick={() => {
                onChange(opt.value);
                setOpen(false);
              }}
              className={`p-3 cursor-pointer transition-all text-sm md:text-base font-medium
              ${value === opt.value
                  ? "bg-red-600 text-white"
                  : "text-zinc-300 hover:bg-zinc-800 hover:text-white"
                }`}
            >
              {opt.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function QuickBooking() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // STATE
  const [selectedMovieId, setSelectedMovieId] = useState("");
  const [selectedCinemaId, setSelectedCinemaId] = useState("");
  const [selectedSessionId, setSelectedSessionId] = useState("");

  // STORE
  const movieList = useSelector(selectAllMovies);
  const movieSchedule = useSelector(selectMovieSchedule);

  // FETCH MOVIES
  useEffect(() => {
    dispatch(fetchMoviesForBooking());
  }, [dispatch]);

  // FETCH SCHEDULE
  useEffect(() => {
    if (selectedMovieId) {
      dispatch(fetchMovieSchedule(selectedMovieId));
    }
  }, [selectedMovieId, dispatch]);

  // RESET
  const handleMovieChange = (movieId) => {
    setSelectedMovieId(movieId);
    setSelectedCinemaId("");
    setSelectedSessionId("");
    dispatch(clearSchedule());
  };

  // CINEMA LIST
  const cinemaList = useMemo(() => {
    if (!movieSchedule?.heThongRapChieu) return [];
    return movieSchedule.heThongRapChieu.flatMap((htr) =>
      htr.cumRapChieu.map((cum) => ({
        ...cum,
        tenHeThongRap: htr.tenHeThongRap,
      }))
    );
  }, [movieSchedule]);

  // AUTO SELECT CINEMA
  useEffect(() => {
    if (cinemaList.length > 0 && !selectedCinemaId) {
      setSelectedCinemaId(cinemaList[0].maCumRap);
    }
  }, [cinemaList, selectedCinemaId]);

  // SESSION LIST
  const sessionList = useMemo(() => {
    const cinema = cinemaList.find(
      (c) => c.maCumRap === selectedCinemaId
    );
    return cinema?.lichChieuPhim || [];
  }, [cinemaList, selectedCinemaId]);

  // AUTO SELECT SESSION
  useEffect(() => {
    if (sessionList.length > 0 && !selectedSessionId) {
      setSelectedSessionId(sessionList[0].maLichChieu);
    }
  }, [sessionList, selectedSessionId]);

  return (
    <div
      className="bg-zinc-900/80 backdrop-blur-xl 
      p-4 sm:p-5 md:p-6 
      rounded-2xl md:rounded-3xl 
      border border-zinc-800 shadow-2xl 
      flex flex-col lg:flex-row 
      gap-3 md:gap-4 
      lg:items-end"
    >
      {/* CHỌN PHIM */}
      <div className="w-full lg:flex-1">
        <label className="text-xs md:text-sm font-bold text-red-600 uppercase mb-2 block tracking-wide px-1">
          🎬 Chọn Phim
        </label>
        <CustomSelect
          placeholder="Chọn phim bạn muốn xem..."
          value={selectedMovieId}
          onChange={handleMovieChange}
          options={movieList.map((m) => ({
            value: m.maPhim,
            label: m.tenPhim,
          }))}
        />
      </div>

      {/* CHỌN RẠP */}
      <div className="w-full lg:flex-1">
        <label className="text-xs md:text-sm font-bold text-red-600 uppercase mb-2 block tracking-wide px-1">
          📍 Chọn Rạp
        </label>
        <CustomSelect
          placeholder={
            selectedMovieId
              ? "Chọn rạp..."
              : "Vui lòng chọn phim trước"
          }
          value={selectedCinemaId}
          onChange={setSelectedCinemaId}
          disabled={!selectedMovieId}
          options={cinemaList.map((c) => ({
            value: c.maCumRap,
            label: `${c.tenHeThongRap} - ${c.tenCumRap}`,
          }))}
        />
      </div>

      {/* SUẤT CHIẾU */}
      <div className="w-full lg:flex-1">
        <label className="text-xs md:text-sm font-bold text-red-600 uppercase mb-2 block tracking-wide px-1">
          ⏰ Suất Chiếu
        </label>
        <CustomSelect
          placeholder={
            selectedCinemaId
              ? "Chọn suất chiếu..."
              : "Vui lòng chọn rạp trước"
          }
          value={selectedSessionId}
          onChange={setSelectedSessionId}
          disabled={!selectedCinemaId}
          options={sessionList.map((s) => ({
            value: s.maLichChieu,
            label: moment(s.ngayChieuGioChieu).format(
              "DD/MM/YYYY ~ HH:mm"
            ),
          }))}
        />
      </div>

      {/* BUTTON */}
      <button
        disabled={!selectedSessionId}
        onClick={() => navigate(`/checkout/${selectedSessionId}`)}
        className="w-full lg:w-auto
        px-8 md:px-10
        py-3 md:py-3.5
        bg-red-600 hover:bg-white hover:text-red-600
        text-white font-black
        rounded-xl
        transition-all duration-300
        disabled:bg-zinc-700/50 disabled:text-zinc-500
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