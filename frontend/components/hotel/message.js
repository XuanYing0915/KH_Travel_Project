import React, { useState, useEffect } from "react";
import axios from 'axios';
import { format } from 'date-fns'
import { utcToZonedTime } from 'date-fns-tz'



export default function Message({data,selectedHotelName}) {
    const [messages, setMessages] = useState([]); //0807留言板訊息新增設定
    const [rooms, setRooms] = useState([]); //0807留言板房間選單鉤子
    const taipeiTime = utcToZonedTime(new Date(), 'Asia/Taipei')
    // 星星評分 紀錄分數0~5
    const [rating, setRating] = useState(null)
    // 滑鼠hover專用狀態
    const [hover, setHover] = useState(0)

    const [input, setInput] = useState("");
    const [showForm, setShowForm] = useState(false);
    const [form, setForm] = useState({
        nickname:"",
        room_name: "",
        message_head: "",
        message_content: ""
    });

   //0807 房間選單
    useEffect(() => {
        fetch(`http://localhost:3005/hotelroom?hotel_name=${selectedHotelName}`)
          .then((res) => res.json())
          .then((data) => setRooms(data));
      }, [selectedHotelName]);
    
    //0807留言板表單傳送至後端
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
      //留言板表單傳送至後端到這為止


    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const newMessage = {
          message_id: data.length,
          message_nickname: form.nickname,  // 對應暱稱
          room_name: form.room_name,
          message_head: form.message_head,
          message_content: form.message_content,
          message_evaluate: rating, 
          message_time: format(taipeiTime, 'yyyy-MM-dd HH:mm:ss')
        };
        
        const submittedMessage = await submitMessage(newMessage);

        if (submittedMessage) {
          setMessages([...messages, submittedMessage]);
        }
         // 清除表單
        setForm({
            nickname:"",
            room_name: "",
            message_head: "",
            message_content: ""
        });
        setRating(null);
        setShowForm(false);
      };
  
      const handleFormInputChange = (e) => {
        setForm({
          ...form,
          [e.target.name]: e.target.value
        });
      };
  
      const handleButtonClick = () => {
        setShowForm(true);
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
                        <span>名稱</span>
                        <label>                
                        <input
                            type="text"
                            name="nickname"
                            value={form.nickname}
                            onChange={handleFormInputChange}
                        />
                        </label>
                        <span>客房名稱</span>
                        <label>
                        <select
                            name="room_name"
                            value={form.room_name}
                            onChange={handleFormInputChange}
                        >
                            <option value="">請選擇房型</option>
                            {rooms.map((room) => (
                            <option value={room.room_id} key={room.room_id}>
                                {room.room_name}
                            </option>
                            ))}
                        </select>
                        </label>
                    </div>
                    <div>
                        <span>標題</span>
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
                    <span>內容</span>  
                        <label>                     
                        <textarea
                            name="message_content"
                            value={form.message_content}
                            onChange={handleFormInputChange}
                        />
                        </label>
                    </div>
                    <div className="formstar">
                     <span>評分</span>
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
        </div>    
    </>
  )
}
