import React, { useState, useEffect } from "react";
import axios from 'axios';
import { format } from 'date-fns'
import { utcToZonedTime } from 'date-fns-tz'
import { useRouter } from 'next/router';
import Swal from 'sweetalert2';

//0808飯店編號映射飯店名稱(客房選單用)
const roomSelectName = {
    '500010001': '宮賞藝術大飯店',
    '500010002': '捷絲旅高雄站前館',
    '500010003': '橋大飯店 - 火車站前館',
    '500010004': 'WO Hotel',
    '500010005': '華園大飯店草衙館',
    '500010006': '秝芯旅店駁二館',
    '500010007': '巨蛋旅店',
    '500010008': '義大皇家酒店',
    '500010009': '義大天悅飯店',
    '500010010': '鈞怡大飯店',
    '500010011': '高雄萬豪酒店',
    '500010037': '福容大飯店',
    '500010043': '高雄洲際酒店',
    '500010025': '棚棚屋民宿Inn',
  };
  
export default function Message({data,selectedHotelName}) {
    const [messages, setMessages] = useState([]); // 留言板訊息新增設定
    const [rooms, setRooms] = useState([]); // 留言板房間選單鉤子
    const taipeiTime = utcToZonedTime(new Date(), 'Asia/Taipei')
    const [rating, setRating] = useState(null) // 星星評分 紀錄分數0~5
    const [hover, setHover] = useState(0)     // 滑鼠hover專用狀態
    const router = useRouter();  // 抓取飯店hotel_id
    const { hotel_id } = router.query; // 抓取飯店hotel_id
  
    
    const [showForm, setShowForm] = useState(false); //評論表單鉤子
    const [form, setForm] = useState({
        nickname:"",
        room_name: "",
        message_head: "",
        message_content: ""
    });

   // 房間選單路由
    useEffect(() => {
        if (hotel_id) { // 確保 hotel_id 有值
        const hotel_name = roomSelectName[hotel_id]; //0808根據 hotel_id 從映射中找到 
        axios.get(`http://localhost:3005/hotelroom?hotel_name=${hotel_name}`)
          .then(response => {
            const messageData = response.data.filter(hotel => hotel.hotel_name === hotel_name);
          setRooms(messageData);
          })
          .catch(error => setError(error.toString()));
        }
      }, [hotel_id]); // 當 hotel_id 改變時，重新執行這個 effect
      //------------------0808測試
    
      
    // 將留言板表單傳送至後端
    const submitMessage = async (message) => {
        try {
          // 假設你的後端 API 端點為 /api/messages
          const response = await axios.post('http://localhost:3005/hotelmessage/api/messages', message);
          return response.data;
        } catch (error) {
          console.error('An error occurred while submitting the message:', error);
          // 你也可以在這裡顯示錯誤通知給使用者
          return null;
        }
      };
      
    // 寫入後端的表單對應值 測試:0809
    const handleFormSubmit = async (e) => {
      e.preventDefault();
    
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
          };
    
          const submittedMessage = await submitMessage(newMessage);
    
          if (submittedMessage) {
            setMessages([...messages, submittedMessage]);
          }
    
          // 清除表單內容
          setForm({
            nickname: "",
            room_name: "",
            message_head: "",
            message_content: "",
          });
          setRating(null);
          setShowForm(false);
    
          Swal.fire('表單已送出', '', 'success').then(() => {
            window.location.reload(); // 刷新頁面
          });
        } else if (result.isDenied) {
          Swal.fire('表單未送出', '', 'info');
        }
      });
    };

      const handleFormInputChange = (e) => {
        setForm({
          ...form,
          [e.target.name]: e.target.value
        });
      };
      
      // 新增一個 state 來跟踪訂單編號輸入框的值
      const [orderNumber, setOrderNumber] = useState("");
      const [showOrderForm, setShowOrderForm] = useState(false);

      const verifyOrderNumber = async () => {
        try {
          // 將訂單編號發送到後端進行驗證
          const response = await axios.post('http://localhost:3005/hotelorderdetails', { orderNumber });
  
          if (response.data.success) {
            setShowForm(true); // 如果驗證成功，則顯示留言表單
          } else {
            Swal.fire('訂單編號不正確', '', 'error');
          }
        } catch (error) {
          console.error('Error verifying order number:', error);
        }
      };

      // 在點擊撰寫評語按鈕時呼叫
      const handleButtonClick = () => {
        setShowOrderForm(true); // 顯示訂單編號輸入框
      };


  return (
    <>
        <ul className="messageUl">
            {Array.isArray(data) && data.map((message) => (
                <li key={message.message_id}>
                    <div className="messageCard">
                        <div className="msgsection1">
                            <p>{message.message_nickname}</p>
                            <p className="roomName">{message.room_name}</p>
                            <p className="time">{message.message_time}</p>
                        </div>
                        <div className="msgsection2">
                            <p className="pHead">{message.message_head}</p> 
                            <p className="content">{message.message_content}</p>
                        </div>
                        <div className="msgsection3">
                           <p className="evaluate">{message.message_evaluate}</p>
                        </div>                    
                     </div>
                </li>
            ))}
        </ul>
        <div className="messageform">
            {showForm &&
                <form onSubmit={handleFormSubmit}>
                    <div>
                        <span style={{marginLeft:'40px'}}>名稱</span>
                        <label>                
                        <input
                            type="text"
                            name="nickname"
                            value={form.nickname}
                            onChange={handleFormInputChange}
                        />
                        </label> <br />
                        <span>客房名稱</span>
                        <label>
                        <select
                            name="room_name"
                            value={form.room_name}
                            onChange={handleFormInputChange}
                        >
                            <option>請選擇房型</option>
                            {rooms.map((room) => (
                            <option value={room.room_id} key={room.room_id}>
                                {room.room_name}
                            </option>
                            ))}
                        </select>
                        </label>
                    </div>
                    <div>
                        <span style={{marginLeft:'40px'}}>標題</span>
                        <label>            
                        <input
                            type="text"
                            name="message_head"
                            value={form.message_head}
                            onChange={handleFormInputChange}
                        />
                        </label>
                    </div>  
                    <div>
                    <span style={{marginLeft:'40px'}}>內容</span>  
                        <label>
                        <div style={{width:'200px'}}>                    
                        <textarea
                            name="message_content"
                            value={form.message_content}
                            onChange={handleFormInputChange}
                          
                        />
                        </div> 
                        </label>
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
                                className={score <= rating || score <= hover ? 'on' : 'off'}
                                onClick={(e) => {
                                    e.preventDefault();
                                    setRating(score)
                                }}
                                onMouseEnter={() => {setHover(score)// 暫時設定某點亮狀態
                                }}
                                onMouseLeave={() => {setHover(0) // 恢復原本初始狀態
                                }}
                                >
                                &#9733;
                                </button>
                            )
                        })}
                    </div>
                    <div className="msgbut">
                    <button className="submitbut" type="submit">提交</button>
                    <button className="backbut" type="button"  onClick={() => setShowForm(false)}>返回</button> 
                    </div>
                </form>
            }
        </div>
        <div className="divbutton">
            <button className="msgbutton" onClick={handleButtonClick}>撰寫評語</button>
            {showOrderForm &&
              <div className="order-form">
                <input type="text" value={orderNumber} onChange={e => setOrderNumber(e.target.value)} />
                <button onClick={verifyOrderNumber}>驗證訂單編號</button>
              </div>
            }
        </div>    
    </>
  )
}
