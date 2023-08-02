import React from 'react'
// import Search from '@/components/search'
// import Title from '@/components/title'
// import Card2 from '@/components/common-card2/common-card2'
import Search from '@/components/ticket/search'
// import Pscall from '@/components/ticket/pscall'

import { Swiper, SwiperSlide } from 'swiper/react'
// Import Swiper styles
import 'swiper/css'
import 'swiper/css/effect-fade'
import 'swiper/css/pagination'
// import required modules
import { Autoplay, EffectFade, Pagination } from 'swiper/modules'

export default function index() {
  // 問題: 輪播圖 OK

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
                <SwiperSlide>
                  <img src={`https://swiperjs.com/demos/images/${v}`} key={i} />
                </SwiperSlide>
              )
            })}
          </Swiper>
        </div>

        {/* 下方搜索框 */}
        <div className="divsearch">
          <Search />
        </div>

        {/* <div className="row d-flex justify-content-center">{cardList}</div> */}
      </div>
    </>
  )
}
