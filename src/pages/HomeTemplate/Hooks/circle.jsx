import { useEffect, useState } from "react";
import { useMagicColor } from "./useMagicColor";

export default function Circle() {
    const color = useMagicColor();

    return (
        <div
            style={{ backgroundColor: color }}
            className="w-40 h-40 rounded-full flex items-center justify-center shadow-lg transition-colors duration-300"
        >
            <h1 className="text-white font-bold text-xl drop-shadow-md">
                Circle
            </h1>
        </div>
    );
};