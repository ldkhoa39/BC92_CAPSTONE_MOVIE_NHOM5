import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { datGhe } from '../../Checkout/slice';

export default function SeatMap() {
    const dispatch = useDispatch();
    const { roomTicketDetail, danhSachGheDangDat } = useSelector((state) => state.checkoutReducer);
    const { danhSachGhe } = roomTicketDetail || {};

    return (
        <div
            className="
                grid 
                grid-cols-6 sm:grid-cols-8 md:grid-cols-10 lg:grid-cols-12
                gap-2 sm:gap-2.5 md:gap-3
                justify-center
            "
            >
            {danhSachGhe?.map((ghe) => {
                const isSelected = danhSachGheDangDat.find(
                (g) => g.maGhe === ghe.maGhe
                );

                let classGhe = `
                w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10
                rounded-md 
                text-[10px] sm:text-xs md:text-sm 
                font-bold 
                flex items-center justify-center 
                transition-all duration-200
                `;

                if (ghe.daDat) {
                classGhe += `
                    bg-zinc-700 text-zinc-500 
                    cursor-not-allowed
                `;
                } else if (isSelected) {
                classGhe += `
                    bg-yellow-500 text-zinc-900 
                    scale-110 
                    shadow-[0_0_12px_#eab308]
                `;
                } else {
                classGhe += `
                    bg-red-600 hover:bg-red-500 
                    text-white 
                    cursor-pointer 
                    active:scale-95
                `;
                }

                return (
                <button
                    key={ghe.maGhe}
                    disabled={ghe.daDat}
                    onClick={() => dispatch(datGhe(ghe))}
                    className={classGhe}
                >
                    {ghe.daDat ? (
                    <i className="fa-solid fa-xmark text-xs"></i>
                    ) : (
                    ghe.stt
                    )}
                </button>
                );
            })}
        </div>
    );
}