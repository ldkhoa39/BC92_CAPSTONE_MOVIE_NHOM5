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
    <div className="min-h-screen bg-zinc-950 pt-24 pb-10 text-white">
      <div className="container mx-auto grid grid-cols-12 gap-8 px-4">
        {/* BÊN TRÁI: SƠ ĐỒ GHẾ*/}
        <div className="col-span-12 lg:col-span-8 flex flex-col items-center bg-zinc-900/30 p-8 rounded-3xl border border-zinc-800">
          <div className="w-full h-1 bg-zinc-600 shadow-[0_10px_30px_rgba(220,38,38,0.8)] mb-4 rounded-full"></div>
          <p className="text-zinc-500 text-xs tracking-[1em] mb-12 uppercase">Màn Hình</p>
          <SeatMap />
          <SeatLegend />
        </div>

        {/* BÊN PHẢI: HOÁ ĐƠN*/}
        <div className="col-span-12 lg:col-span-4">
          <TicketInfo />
        </div>
      </div>
    </div>
  );
}