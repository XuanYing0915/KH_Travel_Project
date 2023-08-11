import React, { useState, useContext } from 'react';
import {CartContext} from '@/components/hotel/CartContext'
import { useRouter } from 'next/router';

export default function RoomForm() {

  const router = useRouter();
  const {adults,childrens} = useContext(CartContext)
  const checkInDate = localStorage.getItem('checkInDate');
  const checkOutDate = localStorage.getItem('checkOutDate');
  const { roomCount, roomType, roomName, hotelName, hotelAddress} = router.query;
  const totalPrice = router.query.totalPrice; //房間總價

  // 使用useState保存使用者輸入
  const [username, setUserName] = useState('');
  const [userphone, setUserPhone] = useState('');
  const [useraddress, setUserAddress] = useState('');
  const [useremail, setUserEmail] = useState('');

  // 保存訊息入住資訊及個人資訊的訊息
  function handleCheckout(e) {
    e.preventDefault();
    const query = {
      checkInDate,
      checkOutDate,
      hotelName,
      hotelAddress,
      roomName,
      roomType,
      roomCount,
      adults,
      childrens,
      totalPrice,
      username,
      userphone,
      useraddress,
      useremail
    };
    const queryString = new URLSearchParams(query).toString();
    router.push(`/hotel/room/form/pay?${queryString}`);
  }
  

  return (
    <>   
      <form className='confirmationForm'>
        <div className='enterForm'>
          <h2>輸入個人資料</h2>
          <label>姓名:
            <input type="text" value={username} onChange={e => setUserName(e.target.value)} />
          </label> 
          <label>電話:
            <input type="text" value={userphone} onChange={e => setUserPhone(e.target.value)} />
          </label> 
          <label>地址:
            <input type="text" value={useraddress} onChange={e => setUserAddress(e.target.value)} />
          </label>   
          <label>電子信箱:
            <input type="text" value={useremail} onChange={e => setUserEmail(e.target.value)} />
          </label>     
        </div>
        <div className='CheckIninForm'>
          <h2>入住資訊</h2>
           <p>入住日期:{checkInDate}</p>
           <p>退房日期:{checkOutDate}</p>
           <p>飯店名稱:{hotelName}</p>
           <p>飯店地址:{hotelAddress}</p>
           <p>客房名稱:{roomName}</p>
           <p>客房類型:{roomType}</p>
           <p>客房:{roomCount}間</p> 
           <p>成人:{adults}</p>
           <p>兒童:{childrens}</p>
           <p>總價:{totalPrice}(含稅價)</p>
        </div>
        <div className='CheckInbtm'>
          <button type="button" onClick={handleCheckout}>確認預定</button>
        </div>
      </form>
    </>
  )
}
