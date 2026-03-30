import { useEffect, useState } from "react";
import { useMagicColor } from "./useMagicColor";

export default function Square() {
    
    const color = useMagicColor();

    return (
        <div style={{ backgroundColor: color }} className="w-40 h-40 flex items-center justify-center">
            <h1 className="text-white font-bold">Square</h1>
        </div>
    );
};