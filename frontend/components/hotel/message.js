import React, { useState, useEffect } from "react";
import MessagesData from "@/data/hotel/message.json";
import { format } from 'date-fns'
import { utcToZonedTime } from 'date-fns-tz'



export default function Message() {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      fetch('http://localhost:3005/hotel')
        .then(response => {
          if (!response.ok) { throw Error(response.statusText); }
          return response.json();
        })
        .then(data => {
          const roomData = data.filter(hotel => hotel.hotel_name === "福容大飯店");
          setData(roomData); //把取得的資料存入 data 狀態
       
        })
        .catch(error => setError(error.toString()));
    }, []);


    const taipeiTime = utcToZonedTime(new Date(), 'Asia/Taipei')
    // 星星評分 紀錄分數0~5
    const [rating, setRating] = useState(null)
    // 滑鼠hover專用狀態
    const [hover, setHover] = useState(0)

    const [input, setInput] = useState("");
    const [showForm, setShowForm] = useState(false);
    const [form, setForm] = useState({
        first_name: "",
        last_name:"",
        room_name: "",
        message_head: "",
        message_content: ""
    });
  
    const handleInputChange = (e) => {
        setInput(e.target.value);
      };
  

    const [messages, setMessages] = useState(Array.isArray(MessagesData.data) ? MessagesData.data : []);

    const handleFormSubmit = (e) => {
        e.preventDefault();
        const newMessage = {
          message_id: messages.length,
          first_name: form.first_name,  // 對應姓氏
          last_name: form.last_name,  // 對應名子
          room_name: form.room_name,
          message_head: form.message_head,
          message_content: form.message_content,
          message_evaluate: rating, 
          message_time: format(taipeiTime, 'yyyy-MM-dd HH:mm:ss')
        };
        setMessages([...messages, newMessage]);
        setForm({
            first_name: "",
            last_name:"",
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
            {Array.isArray(messages) && messages.map((message) => (
                <li key={message.message_id}>
                    <div className="messageCard">
                        <div className="msgsection1">
                            <p>{message.first_name}{message.last_name}</p>
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
                        <span>姓氏</span>
                        <label>                
                        <input
                            type="text"
                            name="first_name"
                            value={form.first_name}
                            onChange={handleFormInputChange}
                        />
                        </label>
                        <span>客房名稱</span>
                        <label>
                            <select  name="room_name" value={form.room_name} onChange={handleFormInputChange}>
                            <option value="">請選擇房型</option>
                            <option value="豪華特大號床間">豪華特大號床間</option>
                            <option value="尊爵套房">尊爵套房</option>
                            <option value="單臥室行政特級特大雙人床套房">單臥室行政特級特大雙人床套房</option>
                            <option value="家庭房">家庭房</option>
                            <option value="連通雙臥室家庭套房">連通雙臥室家庭套房</option>
                            </select>
                        </label>
                    </div>
                    <div>
                        <span>名子</span>
                        <label>  
                        <input
                            type="text"
                            name="last_name"
                            value={form.last_name}
                            onChange={handleFormInputChange}
                        />
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
