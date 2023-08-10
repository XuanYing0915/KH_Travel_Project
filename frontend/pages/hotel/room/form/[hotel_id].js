import React, { useContext } from 'react';
import {CartContext} from '@/components/hotel/CartContext'
import { useRouter } from 'next/router';

export default function RoomForm() {

  const {adults,childrens} = useContext(CartContext)
  const checkInDate = localStorage.getItem('checkInDate');
  const checkOutDate = localStorage.getItem('checkOutDate');
  const router = useRouter();
  const { roomCount, roomType, roomPrice ,roomName,hotelName, hotelAddress} = router.query;

  return (
    <>
        <h1>客房確認表單</h1>
        入住日期:{checkInDate}  <br />
        退房日期:{checkOutDate}  <br />
        飯店名稱:{hotelName} <br />
        飯店地址:{hotelAddress} <br />
        客房名稱:{roomName}  <br />
        客房類型:{roomType}  <br />
        房間數:{roomCount}  <br />
        成人:{adults} <br />
        兒童:{childrens}  <br />  
        價錢:{roomPrice}  <br />
    </>
  )
}
