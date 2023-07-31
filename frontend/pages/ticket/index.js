import React from 'react'
// import Search from '@/components/search'
// import Title from '@/components/title'
// import Card2 from '@/components/common-card2/common-card2'
import SearchTk from '@/components/ticket/search';
import Pscall from '@/components/ticket/pscall';

import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';

// import required modules
import { Autoplay, EffectFade, Pagination } from 'swiper/modules';
// import Search from '@/components/search';



export default function index() {
  // const cardList = []
  // for (let i = 0; i < 8; i++) {
  //   cardList.push(<Card2 />)
  // }



  return (
    <>
      <div className="ticket">
        <div>
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
            <SwiperSlide>
              <img src="https://swiperjs.com/demos/images/nature-1.jpg" />
            </SwiperSlide>
            <SwiperSlide>
              <img src="https://swiperjs.com/demos/images/nature-2.jpg" />
            </SwiperSlide>
            <SwiperSlide>
              <img src="https://swiperjs.com/demos/images/nature-3.jpg" />
            </SwiperSlide>
            <SwiperSlide>
              <img src="https://swiperjs.com/demos/images/nature-4.jpg" />
            </SwiperSlide>
          </Swiper>
        </div>

        {/* 下方搜索框 */}
        <div className="divsearch">
          <SearchTk />
        </div>




        {/* <div className="row d-flex justify-content-center">{cardList}</div> */}
      </div>
    </>
  )
}
