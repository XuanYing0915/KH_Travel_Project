import React, { useState } from "react";
import MessagesData from "@/data/hotel/message.json";
import { format } from 'date-fns'
import { utcToZonedTime } from 'date-fns-tz'



export default function Message() {

    const taipeiTime = utcToZonedTime(new Date(), 'Asia/Taipei')

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
          room_name: form.room,
          message_head: form.title,
          message_content: form.content,
          message_evaluate: "", // you may need to add a field to the form for this
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
        <div>
            {showForm &&
                <form onSubmit={handleFormSubmit}>
                    <label>
                    姓氏:
                    <input
                        type="text"
                        name="first_name"
                        value={form.first_name}
                        onChange={handleFormInputChange}
                    />
                    </label>
                    <label>
                    名子:
                    <input
                        type="text"
                        name="last_name"
                        value={form.last_name}
                        onChange={handleFormInputChange}
                    />
                    </label>
                    <label>
                    客房名稱:
                    <input
                        type="text"
                        name="room"
                        value={form.room}
                        onChange={handleFormInputChange}
                    />
                    </label>
                    <label>
                    標題:
                    <input
                        type="text"
                        name="title"
                        value={form.title}
                        onChange={handleFormInputChange}
                    />
                    </label>
                    <label>
                    內容:
                    <textarea
                        name="content"
                        value={form.content}
                        onChange={handleFormInputChange}
                    />
                    </label>
                    <button type="submit">提交</button>
                </form>
            }
        </div>
        <div className="divbutton">
            <button className="msgbutton" onClick={handleButtonClick}>撰寫評語</button>
        </div>    
    </>
  )
}
