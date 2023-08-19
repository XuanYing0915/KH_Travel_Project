import React, { useState, useContext } from 'react'
import { CartContext } from '@/components/hotel/CartContext'
import { useRouter } from 'next/router'
import { useAuthJWT } from '@/hooks/use-auth-jwt'
import Link from 'next/link'

export default function RoomForm() {
  // 0815會員判斷
  const { authJWT } = useAuthJWT()
  // 未登入時，不會出現頁面內容
  if (!authJWT.isAuth)
    return (
      <>
        <div>請登入會員</div>
      </>
    )

  const router = useRouter()
  const { adults, childrens } = useContext(CartContext)
  const checkInDate = localStorage.getItem('checkInDate')
  const checkOutDate = localStorage.getItem('checkOutDate')
  const { roomCount, roomType, roomName, hotelName, hotelAddress, hotel_id } =
    router.query
  const totalPrice = router.query.totalPrice //房間總價

  // 使用useState保存使用者輸入

  const [username, setUserName] = useState(
    authJWT.userData.first_name + '' + authJWT.userData.last_name
  )
  const [userphone, setUserPhone] = useState(authJWT.userData.phone)
  const [useraddress, setUserAddress] = useState(authJWT.userData.country)
  const [useremail, setUserEmail] = useState(authJWT.userData.email)
  const memberID = authJWT.userData.member_id
  // 保存訊息入住資訊及個人資訊的訊息
  function handleCheckout(e) {
    e.preventDefault()
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
      useremail,
      memberID,
      hotel_id,
    }
    const queryString = new URLSearchParams(query).toString()
    router.push(`/hotel/room/form/pay?${queryString}`)
  }

  return (
    <>
      <form className="confirmationForm">
        <div className="d-flex justify-content-between successNav">
          <p className="success-step">
            1<span>確認訂單資料</span>
          </p>
          <p>
            2<span>結帳付款</span>
          </p>
          <p>
            3<span>訂單完成</span>
          </p>
        </div>
        <div className="enterForm">
          <h3>輸入個人資料</h3>
          <label>
            姓名:
            <input
              type="text"
              value={username}
              onChange={(e) => setUserName(e.target.value)}
            />
          </label>{' '}
          <br />
          <label>
            電話:
            <input
              type="text"
              value={userphone}
              onChange={(e) => setUserPhone(e.target.value)}
            />
          </label>{' '}
          <br />
          <label>
            地址:
            <input
              type="text"
              value={useraddress}
              onChange={(e) => setUserAddress(e.target.value)}
            />
          </label>
          <label style={{ paddingRight: '30px' }}>
            電子信箱:
            <input
              type="text"
              value={useremail}
              onChange={(e) => setUserEmail(e.target.value)}
            />
          </label>
        </div>
        <div className="CheckIninForm">
          <div className="chechimg">
            <img src="../../../images/hotel/經典3.jpg" alt="" />
          </div>
          <div className="checkcontent">
            <h3>入住資訊</h3>
            <p>入住日期:&nbsp;{checkInDate}</p>
            <p>退房日期:&nbsp;{checkOutDate}</p>
            <p>飯店名稱:&nbsp;{hotelName}</p>
            <p>飯店地址:&nbsp;{hotelAddress}</p>
            <p>客房名稱:&nbsp;{roomName}</p>
            <p>
              床型:&nbsp;{roomType}&nbsp;&nbsp;&nbsp;{roomCount}間
            </p>
            <p>入住人數</p>
            <p>成人:&nbsp;{adults}</p>
            <p>兒童:&nbsp;{childrens}</p>
            <p>總價:&nbsp;{totalPrice}(含稅價)</p>
          </div>
        </div>
        <div className="CheckInbtm">
          <button type="button" onClick={handleCheckout}>
            確認預定
          </button>
          <Link href={`/hotel/room/${hotel_id}`}>
            <button type="button" style={{ marginLeft: '20px' }}>
              回上頁
            </button>
          </Link>
        </div>
      </form>
    </>
  )
}
