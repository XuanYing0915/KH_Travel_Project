import React, { useEffect, useState } from 'react'
// import Title from '@/components/title'
// import Card2 from '@/components/common-card2/common-card2'
import Search from '@/components/ticket/search'

import { Swiper, SwiperSlide } from 'swiper/react'
// Import Swiper styles
import 'swiper/css'
import 'swiper/css/effect-fade'
import 'swiper/css/pagination'
// import required modules
import { Autoplay, EffectFade, Pagination } from 'swiper/modules'




export default function index() {

  // // 儲存原始資料
  const [orangeData, setOrangeData] = useState([])



  const handleFetchData = async () => {
    const res = await fetch(`http://localhost:3005/tk`);
    const data = await res.json();
    setOrangeData(data.data)
    console.log("From severs data:", data.data)
  }


  useEffect(() => {
    // 這裡fetch資料
    handleFetchData()
  }, [])





  //封面照片輪替OK 缺圖片--------------------------------------------
  const imgtag = [
    'nature-1.jpg',
    'nature-2.jpg',
    'nature-3.jpg',
    'nature-4.jpg',
  ]

  return (
    <>
      <div className="ticket">
        <div className="container">
          <Swiper
            spaceBetween={30}
            effect={'fade'}
            centeredSlides={true}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
            }}
            modules={[Autoplay, EffectFade, Pagination]}
            className="mySwiper"
          >
            {/* 圖片替換區 */}
            {imgtag.map((v, i) => {
              return (
                <SwiperSlide key={i}>
                  <img src={`https://swiperjs.com/demos/images/${v}`} />
                </SwiperSlide>
              )
            })}
          </Swiper>
        </div>

        {/* 下方搜索框 */}
        <div className="divsearch">
          <Search data={orangeData} />
        </div>

        {/* <div className="row d-flex justify-content-center">{cardList}</div> */}
      </div>
    </>
  )
}
