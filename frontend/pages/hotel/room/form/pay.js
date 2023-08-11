import React, { useState } from 'react';
import { useRouter } from 'next/router';

export default function Pay() {
    const [paymentStatus, setPaymentStatus] = useState('');
    const router = useRouter(); 
    const { checkInDate, checkOutDate, hotelName, hotelAddress, roomName, 
        roomType, roomCount, adults, childrens, totalPrice } = router.query;
 

        const handlePayment = (e) => {
            e.preventDefault();
            // 这里你可以添加进一步的验证，例如检查信用卡号码的有效性
            setPaymentStatus('付款成功！訂單處理中...');
        }
        
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
                <p>{checkInDate}</p> 
                <p>{checkOutDate}</p>
                <p>{hotelName}</p> 
                <p>{hotelAddress}</p> 
                <p>{roomName}</p>
                <p>{roomType}</p> 
                <p>{roomCount}</p> 
                <p>{totalPrice}</p>  
                <p>{adults}</p>  
                <p>{childrens}</p>
            </div>
        </>
  )
}
