import React from 'react';

const PromiseStudy = () => {

    
    const a = new Promise((resolve, reject) => {
        console.log("promise 생성됨~");
        // resolve("a함수 resolve(then의 result) 결과 리턴(정상 실행)");
        if(1 !== 1) {
            resolve();
        } else {
            throw new Error("error(reject 호출)");
        }
    });
    
    const clickHandler = () => {
        a
        .then(() => {
            console.log("1번 then 호출");
            return new Promise((resolve, reject) => {
                resolve("리턴 (함수 b호출)");
            })
        })
        .catch((error) => {
            console.log(error);
        })
        .then(b)
    }

    const b = (resolveArg) => {
        console.log(resolveArg);
    }



    return (
        <div>
            <button type='button' onClick={clickHandler}>promiseButton</button>
        </div>
    );
};

export default PromiseStudy;