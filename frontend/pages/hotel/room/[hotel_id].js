import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Table from '@/components/hotel/table'
import Message from '@/components/hotel/message'
import { useRouter } from 'next/router'
import Roomphoto from '@/components/hotel/roomphoto'

//飯店編號映射飯店名稱
const hotelIdToName = {
  500010001: '宮賞藝術大飯店',
  500010002: '捷絲旅高雄站前館',
  500010003: '橋大飯店 - 火車站前館',
  500010004: 'WO Hotel',
  500010005: '華園大飯店草衙館',
  500010006: '秝芯旅店駁二館',
  500010007: '巨蛋旅店',
  500010008: '義大皇家酒店',
  500010009: '義大天悅飯店',
  500010010: '鈞怡大飯店',
  500010011: '高雄萬豪酒店',
  500010037: '福容大飯店',
  500010043: '高雄洲際酒店',
  500010025: '棚棚屋民宿Inn',
}

export default function hotelroom() {
  const [messages, setMessages] = useState([]) // 初始化 messages 為空陣列
  const [table, setTable] = useState([]) //客房房間room路由設定
  const [images, setImages] = useState([]) //客房照片photo路由設定
  const [error, setError] = useState(null)

  // 抓取飯店hotel_id以對應飯店資料
  const router = useRouter()
  const { hotel_id } = router.query

  //評論區message路設定 http://localhost:3005/hotelmessage
  useEffect(() => {
    console.log(hotel_id)
    const hotel_name = hotelIdToName[hotel_id] // 根據 hotel_id 從映射中找到 hotel_name
    if (hotel_name) {
      axios
        .get(`http://localhost:3005/hotelmessage?hotel_name=${hotel_name}`)
        .then((response) => {
          const messageData = response.data.filter(
            (hotel) => hotel.hotel_name === hotel_name
          )
          setMessages(messageData) // 更新 messages 為取得的資料
        })
        .catch((error) => setError(error.toString()))
    }
  }, [hotel_id])

  //客房room路由設定 http://localhost:3005/hotelroom
  useEffect(() => {
    const hotel_name = hotelIdToName[hotel_id]
    if (hotel_name) {
      axios
        .get(`http://localhost:3005/hotelroom?hotel_name=${hotel_name}`)
        .then((response) => {
          const roomData = response.data.filter(
            (hotel) => hotel.hotel_name === hotel_name
          )
          setTable(roomData)
        })
        .catch((error) => setError(error.toString()))
    }
  }, [hotel_id])

  //客房photo路由設定 http://localhost:3005/hotelimg
  useEffect(() => {
    const hotel_name = hotelIdToName[hotel_id]
    if (hotel_name) {
      axios
        .get(`http://localhost:3005/hotelimg?hotel_name=${hotel_name}`)
        .then((res) => {
          const imgs = res.data
            .filter((item) => item.hotel_name === hotel_name)
            .map((item) => '/images/hotel/' + item.img_src)
          setImages(imgs)
        })
        .catch((error) => console.error(error))
    }
  }, [hotel_id])

  return (
    <>
      <div className="hotelRoomBody">
        {/* <div id="background-wrap">
          <div class="bubble x1"></div>
          <div class="bubble x2"></div>
          <div class="bubble x3"></div>
          <div class="bubble x4"></div>
          <div class="bubble x5"></div>
          <div class="bubble x6"></div>
          <div class="bubble x7"></div>
          <div class="bubble x8"></div>
          <div class="bubble x9"></div>
          <div class="bubble x10"></div>
        </div> */}
        {images && <Roomphoto data={images} />}
        <h2 style={{ margin: '30px', textAlign: 'center' }}>預定客房</h2>
        {table && <Table data={table} />}
        {/* {table && images && <Table data={table} imagesData={images} />} */}
        <h2 style={{ margin: '30px', textAlign: 'center' }}>住客評語</h2>
        {messages && <Message data={messages} />}
      </div>
    </>
  )
}
