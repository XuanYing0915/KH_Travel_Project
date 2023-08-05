import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useRouter } from 'next/router'
import Title from '@/components/title'
import Card2 from '@/components/common-card2/common-card2'
import Detail from '@/components/hotel/detail'


export default function hotelDetail() {
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
    mrt_name:'',
    area_name:'',
    ategory_name:'',
  });

  // 資料庫抓取資料
  const getHotelData = async (hotel_id) => {
    // 連接網址
    const url = `http://localhost:3005/hotelkh/${hotel_id}`
    // 連接
    try {
      const res = await axios.get(url)
      console.log(res.data)
      // 設定景點資料  拆開陣列裡面的物件
      setHotel(res.data[0])
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


  return (
    <> 
        <div className="hotelDetailBody">
           {hotel && <Detail data={hotel} />}
          <Title title="周邊景點" style="title_box_dark" />
          <div className="d-flex">
            <Card2
              id={1}
              img_src="洲際.jpg"
              name="洲際飯店"
              like={true}
              towheresrc="#"
              imgrouter="hotel"
            />
            <Card2
              id={1}
              img_src="洲際.jpg"
              name="洲際飯店"
              like={true}
              towheresrc="#"
              imgrouter="hotel"
            />
            <Card2
              id={1}
              img_src="洲際.jpg"
              name="洲際飯店"
              like={true}
              towheresrc="#"
              imgrouter="hotel"
            />
            <Card2
              id={1}
              img_src="洲際.jpg"
              name="洲際飯店"
              like={true}
              towheresrc="#"
              imgrouter="hotel"
            />
          </div>
          <Title title="周邊美食" style="title_box_dark" />
          <div className="d-flex">
            <Card2
              id={1}
              img_src="洲際.jpg"
              name="洲際飯店"
              like={true}
              towheresrc="#"
              imgrouter="hotel"
            />
            <Card2
              id={1}
              img_src="洲際.jpg"
              name="洲際飯店"
              like={true}
              towheresrc="#"
              imgrouter="hotel"
            />
            <Card2
              id={1}
              img_src="洲際.jpg"
              name="洲際飯店"
              like={true}
              towheresrc="#"
              imgrouter="hotel"
            />
            <Card2
              id={1}
              img_src="洲際.jpg"
              name="洲際飯店"
              like={true}
              towheresrc="#"
              imgrouter="hotel"
            />
          </div>
          <div style={{ margin: '50px' }}></div>
        </div>
    </>
  )
}
