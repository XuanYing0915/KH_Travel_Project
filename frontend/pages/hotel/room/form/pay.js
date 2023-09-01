import React, { useState } from 'react'
import { useRouter } from 'next/router'
import Cards from 'react-credit-cards-2'
import axios from 'axios'
import 'react-credit-cards-2/dist/es/styles-compiled.css'
import Swal from 'sweetalert2'

export default function Pay() {
  const [paymentStatus, setPaymentStatus] = useState('')
  const router = useRouter()

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
    username,
    userphone,
    useraddress,
    useremail,
    memberID,
    hotel_id,
  } = router.query

  // 信用卡動畫
  const [state, setState] = useState({
    number: '',
    expiry: '',
    cvc: '',
    name: '',
    focus: '',
  })
  const handleInputChange = (evt) => {
    const { name, value } = evt.target

    setState((prev) => ({ ...prev, [name]: value }))
  }

  const handleInputFocus = (evt) => {
    setState((prev) => ({ ...prev, focus: evt.target.name }))
  }

  //信用卡判斷式
  const validateCardDetails = (number, name, expiry, cvc) => {
    const cardNumberPattern = /^\d{16}$/ // 16位數字
    const cardNamePattern = /^[a-zA-Z\s\u4e00-\u9fa5]+$/
    const expiryPattern = /^(0[1-9]|1[0-2])\/?([0-9]{4}|[0-9]{2})$/ // MM/YY 或 MM/YYYY 格式
    const cvcPattern = /^\d{3}$/ // 3或4位數字

    if (!cardNumberPattern.test(number)) return '卡號無效'
    if (!cardNamePattern.test(name)) return '姓名無效'
    if (!expiryPattern.test(expiry)) return '到期日期無效'
    if (!cvcPattern.test(cvc)) return '安全碼無效'

    return true
  }

  // 0812訂單編號生成
  const generateOrderNumber = () => {
    const datePart = new Date().toISOString().slice(0, 10).replace(/-/g, '')
    const randomPart = Math.floor(Math.random() * 1000000)
      .toString()
      .padStart(6, '0')
    return `${datePart}-${randomPart}`
  }

  // 結帳資訊
  const handlePayment = async (e) => {
    e.preventDefault()

    const validationMessage = validateCardDetails(
      state.number,
      state.name,
      state.expiry,
      state.cvc
    )
    if (validationMessage !== true) {
      setPaymentStatus(validationMessage) // 使用具體的錯誤消息
      return // 如果信用卡信息無效，則退出函數
    }

    const orderNumber = generateOrderNumber() // 生成訂單號

    const orderDetails = {
      hotel_order_checkin: checkInDate,
      hotel_order_checkout: checkOutDate,
      hotel_order_name: hotelName,
      hotel_order_address: hotelAddress,
      room_order_name: roomName,
      room_order_type: roomType,
      hotel_order_roomCount: roomCount,
      hotel_order_adult: adults,
      hotel_order_child: childrens,
      hotel_order_price: totalPrice,
      hotel_order_number: orderNumber,
      member_id: memberID,
      customer_name: username,
      customer_phone: userphone,
      customer_address: useraddress,
      customer_email: useremail,
    }

    const submitMessage = async (paymoney) => {
      try {
        // 假設你的後端 API 端點為 /api/messages
        const response = await axios.post(
          'http://localhost:3005/hotelorderdetails/checkout',
          paymoney
        )
        return response.data
      } catch (error) {
        console.error('An error occurred while submitting the message:', error)
        // 你也可以在這裡顯示錯誤通知給使用者
        return null
      }
    }

    // 呼叫 submitMessage 函式並將 orderDetails 作為參數傳遞
    const response = await submitMessage(orderDetails)
    if (response && response.ok) {
      Swal.fire({
        icon: 'success',
        title: '付款成功！',
        showConfirmButton: false,
        timer: 1500,
      }).then((result) => {
        if (result.dismiss === Swal.DismissReason.timer) {
          router.push({
            pathname: 'http://localhost:3000/hotel/room/form/success',
            query: {
              orderNumber,
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
              memberID,
              username,
              userphone,
              useraddress,
              useremail,
              hotel_id,
            },
          })
        }
      })
    } else {
      setPaymentStatus('付款失敗。請重試。')
    }
  }

  return (
    <>
      <div className="payPage">
        <div className="d-flex justify-content-between payNav">
          <p>
            1<span>確認客房訂單資料</span>
          </p>
          <p className="pay-step">
            2<span>填寫付款資訊</span>
          </p>
          <p>
            3<span>完成訂單</span>
          </p>
        </div>
        <div className="paycontainer">
          <div className="CheckIninForm">
            <div className="chechimg">
              <img src="../../../images/hotel/經典3.jpg" alt="" />
            </div>
            <div className="checkcontent">
              <h3>入住資訊</h3>
              <p>姓名:{username}</p>
              <p>電話:{userphone}</p>
              <p>地址:{useraddress}</p>
              <p>信箱:{useremail}</p>
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
          {/* 信用卡 */}
          <div className="payform">
            <Cards
              number={state.number}
              expiry={state.expiry}
              cvc={state.cvc}
              name={state.name}
              focused={state.focus}
            />
            {/* 信用卡 */}
            <div style={{ margin: '10px' }}>
              <h4 style={{ color: 'red' }}>{paymentStatus}</h4>
            </div>
            <form onSubmit={handlePayment}>
              <input
                type="text"
                name="number"
                placeholder="請輸入信用卡號"
                value={state.number}
                onChange={handleInputChange}
                onFocus={handleInputFocus}
                maxLength="16"
                required
              />{' '}
              <br />
              <input
                type="name"
                name="name"
                placeholder="請輸入姓名"
                value={state.name}
                onChange={handleInputChange}
                onFocus={handleInputFocus}
                maxLength="15"
                required
              />{' '}
              <br />
              <input
                type="text"
                name="expiry"
                placeholder="MM / YY"
                value={state.expiry}
                onChange={handleInputChange}
                onFocus={handleInputFocus}
                maxLength="4"
                required
              />{' '}
              <br />
              <input
                type="text"
                name="cvc"
                placeholder="安全碼"
                value={state.cvc}
                onChange={handleInputChange}
                onFocus={handleInputFocus}
                maxLength="3"
                required
              />{' '}
              <br />
              <button className="paybyn" type="submit">
                付款
              </button>
            </form>
          </div>
        </div>
        <div style={{ height: '120px' }}></div>
      </div>
    </>
  )
}
