import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'
import Title from '@/components/title'
import FoodCard from '@/components/hotel/foodcard'
import AttractionCard from '@/components/hotel/attractioncard'
import Detail from '@/components/hotel/detail'
import Float from '@/components/hotel/favorite-btn'
import { useAuthJWT } from '@/hooks/use-auth-jwt' // 0818引用JWT認證
import AOS from 'aos'
import 'aos/dist/aos.css'
import 'animate.css'

export default function hotelDetail() {
  const { authJWT } = useAuthJWT()
  const numberid = authJWT.userData.member_id
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

  // 動畫-----
  const [hasScrolledToPosition, setHasScrolledToPosition] = useState(false)

  // 設定滾動到指定位置後才觸發動畫
  const handleScroll = () => {
    const targetElement = document.getElementById('AOSid')
    if (targetElement) {
      const targetPosition = targetElement.getBoundingClientRect().top
      if (targetPosition <= window.innerHeight && !hasScrolledToPosition) {
        setHasScrolledToPosition(true)
        AOS.refresh() // 重新初始化 AOS，以應用動畫
      }
    }
  }

  // 初始話aos
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
          setHasScrolledToPosition(true)
        } else {
          setHasScrolledToPosition(false)
        }
      })
    }
    AOS.init()
    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <>
      <div className="hotelDetailBody">
        {hotel && <Detail data={hotel} cardid={hotel.hotel_id} />}
        <Title title="周邊景點" style="title_box_dark" />
        <div className="d-flex foodcard">
          {attraction.slice(0, 4).map((itex, index) => (
            <div
              className="d-flex col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12 a-nearby-card mt-4"
              data-aos="flip-left"
              data-aos-easing="ease-out-cubic"
              data-aos-duration="2000"
              data-aos-anchor-placement="center-bottom"
              key={itex.attraction_id}
            >
              <AttractionCard
                key={index}
                id={itex.attraction_id}
                name={itex.attraction_name}
                like={itex.like}
                towheresrc="#"
                imgrouter="hotel"
                title={itex.title}
                attractionimg={itex.img_name}
              />
            </div>
          ))}
        </div>
        <div className="titleCss">
          <Title title="周邊美食" style="title_box_dark" />
        </div>
        <div className="d-flex foodcard">
          {food.slice(0, 4).map((item, index) => (
            <div
              className="d-flex col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12 a-nearby-card mt-4"
              data-aos="flip-left"
              data-aos-easing="ease-out-cubic"
              data-aos-duration="2000"
              data-aos-anchor-placement="center-bottom"
              key={item.merchant_id}
            >
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
            </div>
          ))}
        </div>
        <Float
          love={hotel.fk_member_id}
          path={'hotel'}
          id={hotel.hotel_id}
          memberId={numberid}
          dataBaseTableName={'hotel'}
        />
      </div>
    </>
  )
}
