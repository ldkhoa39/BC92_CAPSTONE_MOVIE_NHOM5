import { useState, useEffect, useCallback, useMemo } from "react";
import Child from "./child";
import Fruit from "./fruits";
import Square from "./square";
import Circle from "./circle";

export default function Hooks() {
    console.log("Hooks component rendered");
    const [count, setCount] = useState(1);

    const [fruits, setFruits] = useState([
        { id: 1, name: "Apple" },
        { id: 2, name: "Banana" },
        { id: 3, name: "Orange" },
    ]);

    // const handleDelete = (id) => {
    //     // filter => update state
    //     // Lọc ra những trái cây có id khác với id được truyền vào
    //     const newFruits = fruits.filter((fruit) => fruit.id !== id);
    //     setFruits(newFruits);
    // };

    const handleDelete = useCallback((id) => {
        setFruits((preFruits) => preFruits.filter((item) => item.id !== id));
    }, []);

    const renderListFruit = () => {
        return fruits.map((fruit) => (
            <Fruit
                key={fruit.id}
                fruit={fruit}
                onDelete={handleDelete}
            />
        ));
    };

    /**
     * useEffect chạy 1 lần duy nhất khi component được chạy render đầu tiên
     * nếu dependancies [] rỗng  
     */
    useEffect(() => {
        // tôi muốn viết một hàm để gọi lên server lấy danh sách sản phẩm
        const fetchData = () => {
            console.log("Fetching data from server...");
        };

        fetchData();
    }, []);

    /**
     * useEffect chạy mỗi khi dependacies [] thay đổi
     */
    useEffect(() => {
        const fetchDataPagination = () => {
            console.log("fetching data for pagination...", count);
        };
        fetchDataPagination();
    }, [count]);

    //   useEffect(()=>{
    //     const interval = setInterval (()=>{
    //         console.log("fetching data every second...");
    //     },1000);

    //     return () => {
    //         // destroy các process chạy ngầm
    //         clearInterval(interval);
    //     }
    //   },[]);

    const handleReceivetData = () => {

    };
    const handleReceivetDataCallback = useCallback * (handleReceivetData, []);

    const increateCountUp = () => {
        let i = 0;

        while (i < 1000) {
            i++;
        }

        console.log(i);
        return i;
    };

    const increateCountUpMemo = useMemo(() => increateCountUp(), []);

    return (
        <div>
            <h1>Hooks</h1>
            <p>Count: {count}</p>
            <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => setCount(count + 1)}
            >
                Increment
            </button>
            <hr />
            <p>Count up: {increateCountUpMemo}</p>
            <hr />

            <Child onReceive={handleReceivetDataCallback} />

            {renderListFruit()}

            <Square/>
            <Circle/>

        </div>
    );
}