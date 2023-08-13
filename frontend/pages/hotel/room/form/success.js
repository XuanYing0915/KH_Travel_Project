import React from 'react'
import { useRouter } from 'next/router';

export default function Finish() {

    const router = useRouter(); 
    const { checkInDate, checkOutDate, hotelName, hotelAddress, roomName, 
        roomType, roomCount, adults, childrens, totalPrice, username,
        userphone, useraddress, useremail } = router.query;

  return (
    <>
     <div className="successPage">
      <div className='d-flex justify-content-between successNav' >
            <p>1<span>確認訂單資料</span></p>
            <p>2<span>結帳付款</span></p>
            <p className="success-step">3<span>訂單完成</span></p>
      </div>
      <div  className='successcheck'>
        <div className='successinclude '>
          <div className='chechimg'>
            <img src="../../../images/hotel/經典3.jpg" alt="" />
          </div>
          <div className='successinformation'>
            <h3>您的入住資訊</h3>
            <p>入住日期:{checkInDate}</p> 
            <p>退房日期:{checkOutDate}</p>
            <p>飯店名稱:{hotelName}</p> 
            <p>飯店地址:{hotelAddress}</p> 
            <p>客房名稱:{roomName}</p>
            <p>房型:{roomType}&nbsp;&nbsp;&nbsp;{roomCount}間</p> 
            <p>入住人數:</p>   
            <p>成人:{adults}人</p>  
            <p>兒童:{childrens}人</p>
            <p>總價{totalPrice}(含稅價)</p>  
          </div>
        </div>
      </div>
      <div style={{height:'120px'}}></div>
     </div>
    </>
  )
}
