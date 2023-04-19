import React, { useState } from 'react';

const Callback = () => {
    
    const [cnt, setCnt] = useState(0);
    let count1 = 0;

    const fist = (second, third) => {
        console.log("first 실행(a -> count1의 값 추가를 위한 second호출)")
        setCnt(() => second(third));
    }

    const second = (third) => {
        console.log("\nsecond 실행(third 호출 및 값 추가)")
        count1 = cnt + 100;
        third();
        return count1;
    }
 
    const third = () => {
        console.log("\nthird 실행(count1 출력)");
        console.log("third(count1의 값): " + count1 + "\n");
    }

    const clickHandler = () => {
        fist(second, third)
    }
    
    return (
        <div>
            <button onClick={clickHandler}>버튼</button>
        </div>
    );
};

export default Callback;