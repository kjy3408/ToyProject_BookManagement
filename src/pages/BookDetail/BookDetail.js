/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React from 'react';
import Sidebar from '../../components/Sidebar/Sidebar';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import axios from 'axios';

const mainContainer = css`
    padding: 10px;
`;
                                      
const BookDetail = () => {
    const { bookId } = useParams(); //bookId(params)를 받아옴 

    const getBook = useQuery(["getBook"], async () => { //getbook은 queryKey!, async/awiat 함수 사용하므로서 getBookKey를 사용하는 요청은 여러개의 요청이라도 서버에선 하나의요청(getBookKey)만 받는다
        const option = { //요청 보낼때 headers에 있는 Authorization에 localStorage속에 있는 token을 넣어줌
            headers: {
                Authorization: localStorage.getItem("accessToken")
            }
        }
        const response = await axios.get(`http://localhost:8080/book/${bookId}`, option) //axios를 사용하여 함께 요청을 보냄
   
        return response
        //return이 요청에 의한 응답이기에 getBook 함수를 호출하면 응답을 호출 할 수 있음.
    });

    const getLikeCount = useQuery(["getLikeCount"], async () => {
        const option = {
            headers: {
                Authorization: localStorage.getItem("accessToken")
            }
        }
        const response = await axios.get(`http://localhost:8080/book/${bookId}/like`, option)
        console.log(response)
        return response;
    });

    if(getBook.isLoading) {
        return <div>불러오는 중....</div>
    }


    return (
        <div css={mainContainer}>
            <Sidebar />
            <header>
                <h1>{getBook.data.data.bookName}</h1>
                <p>분류: {getBook.data.data.categoryName} / 저자명: {getBook.data.data.authorName} / 출판사: {getBook.data.data.publisherName} / 추천: {getLikeCount.isLoading ? "조회중..." : getLikeCount.data.data}</p>
            </header>
            <main>
                <div>
                    <img src={getBook.data.data.coverImgUrl} alt={getBook.data.data.bookName} />
                </div>
                <div>

                </div>
                <div>
                    <button>추천버턴</button>
                </div>
            </main>
        </div>
    );
};

export default BookDetail;