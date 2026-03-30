import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { datGhe } from '../../Checkout/slice';

export default function SeatMap() {
    const dispatch = useDispatch();
    const { roomTicketDetail, danhSachGheDangDat } = useSelector((state) => state.checkoutReducer);
    const { danhSachGhe } = roomTicketDetail || {};

    return (
        <div className="grid grid-cols-10 gap-2 md:gap-3">
            {danhSachGhe?.map((ghe) => {
                // Kiểm tra trạng thái ghế
                const isSelected = danhSachGheDangDat.find(g => g.maGhe === ghe.maGhe);

                let classGhe = "w-7 h-7 md:w-9 md:h-9 rounded-md text-[10px] font-bold flex items-center justify-center transition-all ";

                if (ghe.daDat) {
                    classGhe += "bg-zinc-700 text-zinc-500 cursor-not-allowed";
                } else if (isSelected) {
                    classGhe += "bg-yellow-500 text-zinc-900 scale-110 shadow-[0_0_10px_#eab308]";
                } else {
                    classGhe += "bg-red-600 hover:bg-red-500 text-white cursor-pointer";
                }

                return (
                    <button
                        key={ghe.maGhe}
                        disabled={ghe.daDat}
                        onClick={() => dispatch(datGhe(ghe))}
                        className={classGhe}
                    >
                        {ghe.daDat ? (
                            <i className="fa-solid fa-xmark text-zinc-500 text-xs"></i>
                        ) : (
                            ghe.stt
                        )}
                    </button>
                );
            })}
        </div>
    );
}