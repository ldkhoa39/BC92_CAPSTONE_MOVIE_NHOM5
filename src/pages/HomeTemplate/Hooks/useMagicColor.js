import { useEffect, useState } from "react";

export const useMagicColor = () =>{
    const [color, setColor] = useState("red");

    useEffect(() => {
        let interval = setInterval(() => {
            // random code color
            const codeColor = Math.floor(Math.random() * 999999);
            setColor(`#${codeColor}`);
        }, 1000);

        return () => {
            clearInterval(interval);
        };
    }, []);

    return color;
};