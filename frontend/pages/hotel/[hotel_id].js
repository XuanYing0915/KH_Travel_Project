import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'
import Title from '@/components/title'
import FoodCard from '@/components/hotel/foodcard'
import Detail from '@/components/hotel/detail'

export default function hotelDetail() {
  const [food, setFood] = useState([]) // 增加一個狀態變數來保存美食的資料
  const [hotel, setHotel] = useState({
    hotel_id: '',
    hotel_name: '',
    hotel_address: '',
    hotel_tel: '',
    hotel_img: '',
    hotel_introduction: '',
    hotel_lat: '',
    hotel_len: '',
    hotel_zoom: '',
    mrt_name: '',
    area_name: '',
    ategory_name: '',
  })

  // 資料庫抓取飯店資料
  const getHotelData = async (hotel_id) => {
    const url = `http://localhost:3005/hotelkh/${hotel_id}`
    try {
      const res = await axios.get(url)
      // 設定飯店資料  拆開陣列裡面的物件
      setHotel(res.data[0])
      // 0814獲取飯店資料後，同時獲取該地區的美食資料
      getfoodData(res.data[0].area_name)
    } catch (error) {
      console.error(error)
    }
  }
  // 設定動態路由
  const router = useRouter()
  // 當路由準備好時執行
  useEffect(() => {
    if (router.isReady) {
      const { hotel_id } = router.query
      if (hotel_id) getHotelData(hotel_id)
    }
  }, [router.isReady, hotel.hotel_id])

  // 周邊美食顯示
  const getfoodData = async (area_name) => {
    const url = `http://localhost:3005/hotelnearbyfood?area_name=${area_name}`
    try {
      const res = await axios.get(url)
      setFood(res.data) // 保存美食資料
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      <div className="hotelDetailBody">
        {hotel && <Detail data={hotel} cardid={hotel.hotel_id} />}
        <Title title="周邊景點" style="title_box_dark" />
        <div className="d-flex ">
          {/* <Card2
            id={1}
            img_src="洲際.jpg"
            name="洲際飯店"
            like={true}
            towheresrc="#"
            imgrouter="hotel"
          /> */}
        </div>
        <Title title="周邊美食" style="title_box_dark" />
        <div className="d-flex">
          {food.slice(0, 4).map((item, index) => (
            <FoodCard
              key={index}
              id={item.id}
              name={item.name_chinese}
              like={item.like}
              towheresrc="#"
              imgrouter="hotel"
              foodimg={item.img}
            />
          ))}
        </div>
        <div style={{ margin: '50px' }}></div>
      </div>
    </>
  )
}
