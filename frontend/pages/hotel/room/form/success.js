import React from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'

export default function Finish() {
  const router = useRouter()
  const { hotel_id } = router.query // 抓取飯店hotel_id
  const {
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
    orderNumber,
  } = router.query

  return (
    <>
      <div className="successPage">
        <div className="d-flex justify-content-between successNav">
          <p>
            1<span>確認客房訂單資料</span>
          </p>
          <p>
            2<span>填寫付款資訊</span>
          </p>
          <p className="success-step">
            3<span>完成訂單</span>
          </p>
        </div>
        <div className="checknumber">
          <h1>訂房成功！</h1>
          <h2>你的訂單編號是：{orderNumber}</h2>
        </div>
        <div className="successcheck">
          <div className="successinclude ">
            <div className="chechimg">
              <img src="../../../images/hotel/經典3.jpg" alt="" />
            </div>
            <div className="successinformation">
              <h3>您的入住資訊</h3>
              <p>入住日期:{checkInDate}</p>
              <p>退房日期:{checkOutDate}</p>
              <p>飯店名稱:{hotelName}</p>
              <p>飯店地址:{hotelAddress}</p>
              <p>客房名稱:{roomName}</p>
              <p>
                床型:{roomType}&nbsp;&nbsp;&nbsp;{roomCount}間
              </p>
              <p>入住人數:</p>
              <p>成人:{adults}人</p>
              <p>兒童:{childrens}人</p>
              <p>總價{totalPrice}(含稅價)</p>
            </div>
          </div>
        </div>
        <div className="comebackHead" style={{ height: '120px' }}>
          <Link href={`/hotel/room/${hotel_id}`}>
            <button className="comebackBtn">回訂房網頁</button>
          </Link>
        </div>
      </div>
    </>
  )
}
