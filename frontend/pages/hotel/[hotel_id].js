import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'
import Title from '@/components/title'
import FoodCard from '@/components/hotel/foodcard'
import AttractionCard from '@/components/hotel/attractioncard'
import Detail from '@/components/hotel/detail'

export default function hotelDetail() {
  const [food, setFood] = useState([]) // 增加一個狀態變數來保存美食的資料
  const [attraction, setAttraction] = useState([]) // 增加一個狀態變數來保存美食的資料
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
      getattractionData(res.data[0].area_name)
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

  
  // 連接周邊景點網址  
  const getattractionData = async (area_name) => {
    const url = `http://localhost:3005/hotelnearbyattraction?area_name=${area_name}`
    try {
      const res = await axios.get(url)
      setAttraction(res.data) // 保存景點資料
    } catch (error) {
      console.error(error)
    }
  }


  return (
    <>
      <div className="hotelDetailBody">
        {hotel && <Detail data={hotel} cardid={hotel.hotel_id} />}
        <Title title="周邊景點" style="title_box_dark" />
        <div className="d-flex foodcard">
        {attraction.slice(0, 4).map((itex, index) => (
            <AttractionCard
              key={index}
              id={itex.id}
              name={itex.attraction_name}
              like={itex.like}
              towheresrc="#"
              imgrouter="hotel"
              title={itex.title}
              attractionimg={itex.img_name}
            />
          ))}
        </div>
        <div style={{backgroundColor:'#7fb8b6',marginLeft:'-130px',marginRight:'-130px',paddingLeft:'130px',paddingRight:'130px'}}> 
        <Title title="周邊美食" style="title_box_dark" />
        </div>
        <div className="d-flex foodcard">
          {food.slice(0, 4).map((item, index) => (
            <FoodCard
              key={index}
              id={item.merchant_id}
              name={item.name_chinese}
              like={item.like}
              introduction={item.introduction_card}
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
