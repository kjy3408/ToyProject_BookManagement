/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import axios from 'axios';
import React from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useParams } from 'react-router-dom';
import Sidebar from '../../components/Sidebar/Sidebar';
import RentalList from '../../components/UI/BookDetail/RentalList/RentalList';

const mainContainer = css`
    padding: 10px;
    height: 850px;
    overflow-y: auto;
   
`;

const header = css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 20px;
    font-weight: 600;

    margin-bottom: 30px;
    margin-top: 10px;
`;

// const coverImgContainer = css`
//     display: flex;
//     flex-direction: column;
//     justify-content: center;
//     width: 100px;
//     height: 500px;
// `;

// const coverImg = css`
//    width: 300px;
// `;
                                      
const BookDetail = () => {
    const { bookId } = useParams(); //bookId(params)를 받아옴 
    const queryClient = useQueryClient();

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
        return response;
    });
   
    const getLikeStatus = useQuery(["getLikeStatus"], async () => {
        const option = {
            params : {
                userId: queryClient.getQueryData("principal").data.userId
            },
            headers: {
                Authorization: localStorage.getItem("accessToken")
            }
        }
        const response = await axios.get(`http://localhost:8080/book/${bookId}/like/status`, option)
     
        return response;
    });

    const setLike = useMutation(async() => {
        const option = {
            params : {
                userId: queryClient.getQueryData("principal").data.userId
            },
            headers: {
                "Content-Type": "application/json",
                Authorization: localStorage.getItem("accessToken")
            }
        }
        
        return await axios.post(`http://localhost:8080/book/${bookId}/like`, JSON.stringify({
            userId: queryClient.getQueryData("principal").data.userId
        }), option);
    },{
        onSuccess: () => {
            queryClient.invalidateQueries("getLikeCount");
            queryClient.invalidateQueries("getLikeStatus");
         }
    });
                                                                                                                                                     

    const disLike = useMutation(async() => {
        const option = {
            params : {
                userId: queryClient.getQueryData("principal").data.userId
            },
            headers: {
                Authorization: localStorage.getItem("accessToken")
            }
        }

        return await axios.delete(`http://localhost:8080/book/${bookId}/like`, option);
    },{
        onSuccess: () => {
            queryClient.invalidateQueries("getLikeCount");
            queryClient.invalidateQueries("getLikeStatus");

        }
    });



    if(getBook.isLoading) {
        return <div>불러오는 중....</div>
    }


    return (
        <div css={mainContainer}>
            <Sidebar />
            <header>
                <h1 css={header}>{getBook.data.data.bookName}</h1>
                <p css={header}>분류: {getBook.data.data.categoryName} / 저자명: {getBook.data.data.authorName} / 출판사: {getBook.data.data.publisherName} / 추천: {getLikeCount.isLoading ? "조회중..." : getLikeCount.data.data}</p>
            </header>
            <main >
                <div>
                    <img  src={getBook.data.data.coverImgUrl} alt={getBook.data.data.bookName} />
                </div>
                <div>
                    <RentalList bookId={bookId} />
                </div>
                <div>
                   {getLikeStatus.isLoading 
                    ? "" 
                    : getLikeStatus.data.data === 0 
                        ? (<button onClick={() => {setLike.mutate()}}>추천하기</button>) 
                        : (<button onClick={() => {disLike.mutate()}}>추천취소</button>)}
                </div>
            </main>
        </div>
    );
};

export default BookDetail;