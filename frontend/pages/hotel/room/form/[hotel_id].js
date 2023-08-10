import React, { useContext } from 'react';
import {CartContext} from '@/components/hotel/CartContext'
import { useRouter } from 'next/router';

export default function RoomForm() {

  const router = useRouter();
  const {adults,childrens} = useContext(CartContext)
  const checkInDate = localStorage.getItem('checkInDate');
  const checkOutDate = localStorage.getItem('checkOutDate');
  const { roomCount, roomType, roomName, hotelName, hotelAddress} = router.query;
  const totalPrice = router.query.totalPrice; //房間總價

  return (
    <>   
      <div className='confirmationForm'>
        <form className='enterForm'>
          <h1>顧客資料</h1>
          <label htmlFor="">姓名:
            <input type="text" />
          </label> <br />
          <label htmlFor="">生日:
            <input type="text" />
          </label>  <br />
          <label htmlFor="">電話:
            <input type="text" />
          </label>  <br />
          <label htmlFor="">地址:
            <input type="text" />
          </label>   <br />       
        </form>
        <div className='CheckIninForm'>
          <h1>入住資訊</h1>
            入住日期:{checkInDate} <br/>
            退房日期:{checkOutDate} <br/>
            飯店名稱:{hotelName} <br/>
            飯店地址:{hotelAddress} <br/>
            客房名稱:{roomName} <br/>
            客房類型:{roomType} <br/>
            房間數:{roomCount} <br/>
            成人:{adults} <br/>
            兒童:{childrens} <br/>  
            總價:{totalPrice}(含稅價) <br/>
        </div>
      </div>
    </>
  )
}
