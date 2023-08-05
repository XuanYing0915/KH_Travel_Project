import React, { useState, useEffect } from 'react'
import axios from 'axios';
import RoomPhoto from '@/components/hotel/roomphoto'
import Table from '@/components/hotel/table'
import Input from '@/components/hotel/input'
import Message from '@/components/hotel/message'


export default function hotelroom() {

  const [messages, setMessages] = useState([]); // 初始化 messages 為空陣列
  const [table, setTable] = useState([]); //客房房間room路由設定
  const [images, setImages] = useState([]); //客房照片photo路由設定
  const [error, setError] = useState(null);

  //評論區message路設定 http://localhost:3005/hotelmessage
  useEffect(() => {
    axios.get('http://localhost:3005/hotelmessage')
        .then(response => {
            const roomData = response.data.filter(hotel => hotel.hotel_name === "福容大飯店");
            setMessages(roomData);  // 更新 messages 為取得的資料
        })
        .catch(error => setError(error.toString()));
}, []);


  //客房room路由設定 http://localhost:3005/hotelroom
  useEffect(() => {
    axios.get('http://localhost:3005/hotelroom')
      .then(response => {
        const roomData = response.data.filter(hotel => hotel.hotel_name === "高雄萬豪酒店");
        setTable(roomData);
      })
      .catch(error => setError(error.toString()));
  }, []);

  //客房photo路由設定 http://localhost:3005/hotelimg
  useEffect(() => {
    axios.get('http://localhost:3005/hotelimg')
      .then(res => {
        const imgs = res.data.filter(item => item.hotel_name === "高雄萬豪酒店").map(item => '/images/hotel/' + item.img_src);
        setImages(imgs);
      })
      .catch(error => console.error(error));
  }, []);
  

  return (
    <>
      <div className='hotelRoomBody'> 
          {images && <RoomPhoto data={images} />}
          <h2 style={{margin:'30px',textAlign:'center'}}>預定客房</h2>
          <Input />     
          {table && <Table data={table} />}
          <h2 style={{margin:'30px',textAlign:'center'}}>住客評語</h2>
          {messages && <Message data={messages} />}
      </div>
    </>
  )
}
