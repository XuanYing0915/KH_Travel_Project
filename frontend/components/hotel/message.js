import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { format } from 'date-fns'
import { utcToZonedTime } from 'date-fns-tz'
import { useRouter } from 'next/router'
import Swal from 'sweetalert2'
import { Swiper, SwiperSlide } from 'swiper/react' //0819
import { Autoplay, Pagination, FreeMode } from 'swiper/modules' //0819
// 0819 Import Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/free-mode'

export default function Message({ data }) {
  const [messages, setMessages] = useState([]) // 留言板訊息新增設定
  const [rooms, setRooms] = useState([]) // 留言板房間選單鉤子
  const taipeiTime = utcToZonedTime(new Date(), 'Asia/Taipei')
  const [rating, setRating] = useState(null) // 星星評分 紀錄分數0~5
  const [hover, setHover] = useState(0) // 滑鼠hover專用狀態
  const router = useRouter() // 抓取飯店hotel_id
  const { hotel_id } = router.query // 抓取飯店hotel_id
  const [memberId, setMemberId] = useState(null) //抓取會員ID
  const [showForm, setShowForm] = useState(false) //評論表單鉤子
  const [form, setForm] = useState({
    nickname: '',
    room_name: '',
    message_head: '',
    message_content: '',
  })

  // 將留言板表單寫入至後端
  const submitMessage = async (message) => {
    try {
      // 假設你的後端 API 端點為 /api/messages
      const response = await axios.post(
        'http://localhost:3005/hotelmessage/api/messages',
        message
      )
      return response.data
    } catch (error) {
      console.error('An error occurred while submitting the message:', error)
      // 你也可以在這裡顯示錯誤通知給使用者
      return null
    }
  }

  // 寫入後端的表單對應值
  const handleFormSubmit = async (e) => {
    e.preventDefault()

    Swal.fire({
      title: '要送出表單了嗎?',
      showDenyButton: true,
      // showCancelButton: true,
      confirmButtonText: '送出',
      denyButtonText: `不要送出`,
    }).then(async (result) => {
      if (result.isConfirmed) {
        const newMessage = {
          hotel_id: hotel_id,
          message_id: data.length,
          room_name: form.room_name,
          message_nickname: form.nickname,
          message_head: form.message_head,
          message_content: form.message_content,
          message_evaluate: rating,
          message_time: format(taipeiTime, 'yyyy-MM-dd HH:mm:ss'),
          member_id: memberId,
        }
        console.log('傳去後端的資料!!', newMessage)
        const submittedMessage = await submitMessage(newMessage)

        if (submittedMessage) {
          setMessages([...messages, submittedMessage])
        }

        // 清除表單內容
        setForm({
          nickname: '',
          room_name: '',
          message_head: '',
          message_content: '',
        })
        setRating(null)
        setShowForm(false)

        Swal.fire('表單已送出', '', 'success').then(() => {
          window.location.reload() // 刷新頁面
        })
      } else if (result.isDenied) {
        Swal.fire('表單未送出', '', 'info')
      }
    })
  }

  const handleFormInputChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    })
  }

  // 新增一個 state 來跟踪訂單編號輸入框的值
  const [orderNumber, setOrderNumber] = useState('')
  const [showOrderForm, setShowOrderForm] = useState(false)

  const verifyOrderNumber = async (orderNumber) => {
    try {
      // 將訂單編號發送到後端進行驗證
      const response = await axios.post(
        'http://localhost:3005/hotelorderdetails',
        { orderNumber }
      )
      console.log(response)
      if (response.data.success) {
        const { room_order_name, last_name, member_id } = response.data.details
        setForm((prevForm) => ({
          ...prevForm,
          room_name: room_order_name,
          nickname: `${last_name}`,
        }))
        setMemberId(member_id)
        setShowForm(true) // 如果驗證成功，則顯示留言表單
      } else {
        Swal.fire('訂單編號不正確', '', 'error')
      }
    } catch (error) {
      console.error('驗證訂單號時出錯:' + error)
    }
  }

  // 在點擊撰寫評語按鈕時呼叫
  const handleButtonClick = () => {
    Swal.fire({
      title: '請輸入訂單編號',
      input: 'text',
      inputAttributes: {
        autocapitalize: 'off',
      },
      showCancelButton: true,
      confirmButtonText: '驗證',
      showLoaderOnConfirm: true,
      preConfirm: (orderNumber) => {
        // 這裡您可以調用您的 verifyOrderNumber 函數
        return verifyOrderNumber(orderNumber)
      },
      allowOutsideClick: () => !Swal.isLoading(),
    }).then((result) => {
      if (result.isConfirmed) {
        // 如果驗證成功，您可以在這裡處理成功的邏輯
      }
    })
  }

  return (
    <>
      <Swiper
        effect={'coverflow'}
        grabCursor={true}
        centeredSlides={true}
        coverflowEffect={{
          rotate: 60,
          stretch: 0,
          depth: 50,
          modifier: 1,
          slideShadows: true,
        }}
        pagination={{
          //下層圈圈
          clickable: true,
        }}
        modules={[Autoplay, Pagination, FreeMode]}
        autoplay={{
          delay: 3000,
          // disableOnInteraction: true,
        }}
        loop={true}
        // speed={5000}
        slidesPerView={1}
        breakpoints={{
          1008: {
            slidesPerView: 3,
          },
        }}
        className="messageUl"
      >
        {Array.isArray(data) &&
          data.map((message) => (
            <SwiperSlide key={message.message_id}>
              <div className="messageCard">
                <div className="msgsection1">
                  <div className="messageText">
                    <p style={{ flex: '10' }} className="text">
                      {message.message_nickname}
                    </p>
                    <p
                      style={{
                        // flex: '1.5',
                        background: '#137976',
                        textAlign: 'center',
                        borderRadius: '5px 5px 5px 0',
                        paddingInline: '3px',
                        width: '40px',
                        marginRight: '5px',
                        paddingTop: '2px',
                        color: '#fff',
                      }}
                      className="evaluate"
                    >
                      {message.message_evaluate}
                    </p>
                  </div>
                  <p className="roomName">{message.room_name}</p>
                </div>
                <div className="msgsection2">
                  <p className="pHead">{message.message_head}</p>
                  <p className="content">{message.message_content}</p>
                </div>
                <div className="msgsection3">
                  <p className="time">{message.message_time}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
      </Swiper>
      <div className="messageform">
        {showForm && (
          <form onSubmit={handleFormSubmit} class="form-floating p-5">
            <span>姓名</span>
            <div class="form-floating mb-3 mt-1">
              <input
                type="text"
                class="form-control"
                id="floatingNickname"
                name="nickname"
                value={form.nickname}
                onChange={handleFormInputChange}
                style={{ background: 'rgb(211, 211, 211)' }}
                readOnly
              />
            </div>
            <span>入住客房</span>
            <div class="form-floating mb-3 mt-1">
              <input
                type="text"
                class="form-control"
                id="floatingRoomName"
                name="room_name"
                value={form.room_name}
                onChange={handleFormInputChange}
                style={{ background: 'rgb(211, 211, 211)' }}
                readOnly
              />
            </div>
            <span>標題</span>
            <div class="form-floating mb-3 mt-1">
              <input
                type="text"
                class="form-control"
                id="floatingMessageHead"
                name="message_head"
                value={form.message_head}
                onChange={handleFormInputChange}
              />
            </div>
            <span>想說的話</span>
            <div class="form-floating mb-3 mt-1">
              <textarea
                class="form-control"
                id="floatingMessageContent"
                name="message_content"
                value={form.message_content}
                onChange={handleFormInputChange}
                style={{ height: '100px' }}
              ></textarea>
            </div>

            <div className="formstar">
              <span>用戶體驗</span>
              {Array(5)
                .fill(1)
                .map((v, i) => {
                  // 每顆星星的分數
                  const score = i + 1
                  return (
                    <button
                      key={i}
                      // 分數小於等於目前評分狀態的星星圖示，全部都要亮起
                      className={
                        score <= rating || score <= hover ? 'on' : 'off'
                      }
                      onClick={(e) => {
                        e.preventDefault()
                        setRating(score)
                      }}
                      onMouseEnter={() => {
                        setHover(score) // 暫時設定某點亮狀態
                      }}
                      onMouseLeave={() => {
                        setHover(0) // 恢復原本初始狀態
                      }}
                    >
                      &#9733;
                    </button>
                  )
                })}
            </div>
            <div className="msgbut">
              <button className="submitbut" type="submit">
                提交
              </button>
              <button
                className="backbut"
                type="button"
                onClick={() => setShowForm(false)}
              >
                返回
              </button>
            </div>
          </form>
        )}
      </div>
      <div className="divbutton">
        <button className="msgbutton" onClick={handleButtonClick}>
          撰寫評語
        </button>
        {showOrderForm && (
          <div className="order-form">
            <input
              type="text"
              value={orderNumber}
              onChange={(e) => setOrderNumber(e.target.value)}
            />
            <button onClick={verifyOrderNumber}>驗證訂單編號</button>
          </div>
        )}
      </div>
    </>
  )
}
