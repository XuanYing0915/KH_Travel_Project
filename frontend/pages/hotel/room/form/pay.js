import React, { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

export default function Pay() {
    const [paymentStatus, setPaymentStatus] = useState('');
    const router = useRouter(); 
    const { checkInDate, checkOutDate, hotelName, hotelAddress, roomName, 
        roomType, roomCount, adults, childrens, totalPrice, username,
        userphone, useraddress, useremail } = router.query;
 

               // 將結帳資訊送至後端
               const handlePayment = async (e) => {
                e.preventDefault();
                const creditCardNumber = e.target[0].value;
                const expiryDate = e.target[1].value;
                const securityCode = e.target[2].value;
            
                const orderDetails = {
                    checkInDate, checkOutDate, hotelName, hotelAddress,
                    roomName, roomType, roomCount, adults, childrens, totalPrice,
                    username, userphone, useraddress, useremail, creditCardNumber, expiryDate, securityCode
                };
            
                const submitMessage = async (paymoney) => {
                    try {
                      // 假設你的後端 API 端點為 /api/messages
                      const response = await axios.post('http://localhost:3005/hotelorderdetails/checkout', paymoney);
                      return response.data;
                    } catch (error) {
                      console.error('An error occurred while submitting the message:', error);
                      // 你也可以在這裡顯示錯誤通知給使用者
                      return null;
                    }
                  };
                  
                // 呼叫 submitMessage 函式並將 orderDetails 作為參數傳遞
                const response = await submitMessage(orderDetails);

                if (response && response.ok) {
                    setPaymentStatus('付款成功！訂單處理中...');
                    // 可以進一步重定向或更新應用狀態
                } else {
                    setPaymentStatus('付款失敗。請重試。');
                }
            };


    return (
        <>
            <h1>結帳</h1>
            <form onSubmit={handlePayment}>
                <label>信用卡號碼: <input type="text" required /></label> <br />
                <label>到期日期: <input type="text" required /></label> <br />
                <label>安全碼: <input type="text" required maxLength="3" /></label> <br />
                <button type="submit">付款</button>
            </form>
            <div>
                <p>{paymentStatus}</p>
            </div>
            <div>
                <p>入住日期{checkInDate}</p> 
                <p>退房日期{checkOutDate}</p>
                <p>飯店名稱{hotelName}</p> 
                <p>飯店地址{hotelAddress}</p> 
                <p>客房名子{roomName}</p>
                <p>房型{roomType}</p> 
                <p>客房數量{roomCount}間</p> 
                <p>總價{totalPrice}</p>  
                <p>大人數:{adults}</p>  
                <p>小孩數:{childrens}</p>
                <p>使用者名稱:{username}</p>
                <p>使用者電話:{userphone}</p>
                <p>使用者地址:{useraddress}</p>
                <p>使用者信箱:{useremail}</p>
            </div>
        </>
  )
}
