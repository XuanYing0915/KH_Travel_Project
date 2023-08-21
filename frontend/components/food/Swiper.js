import React, { useEffect, useState } from 'react'
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/free-mode'
import {
  IoIosArrowDropleftCircle,
  IoIosArrowDroprightCircle,
} from 'react-icons/io'
import { IconContext } from 'react-icons'
// import required modules
import {
  Autoplay,
  Navigation,
  Pagination,
  Mousewheel,
  FreeMode,
  Keyboard,
} from 'swiper/modules'
import { yellow } from '@mui/material/colors'

// 箭頭樣式
const arrowStyle = {
  position: 'absolute',
  color: '#fff',
  padding: '20px',
  marginInline: '15px',
  borderRadius: '50%',
  background: '#137976',
  boxShadow: '4px 4px 10px rgba(0, 0, 0, 0.25)',
}
export default function SwiperAI({ images, onImageChange }) {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0)

  const handleSlideChange = (swiper) => {
    setCurrentSlideIndex(swiper.activeIndex)
  }

  const handleImageClick = (index) => {
    setCurrentSlideIndex(index) // 更新當前顯示的圖片索引
    if (typeof onImageChange === 'function') {
      onImageChange(images[index], index) // 更新大圖的顯示
    }
  }
  useEffect(() => {
    if (images.length > 0) {
      onImageChange(images[currentSlideIndex], currentSlideIndex)
    }
  }, [currentSlideIndex, images, onImageChange])
  return (
    <>
      <IconContext.Provider value={{ color: '#137976', size: '30px' }}>
        <div className="a-Swiper-box">
          <Swiper
            grabCursor={true}
            // centeredSlides={true}
            slidesPerView={'auto'}
            // initialSlide={2} //初始索引
            spaceBetween={100}
            navigation={{
              prevEl: '.swiper-button-prev',
              nextEl: '.swiper-button-next',
            }}
            mousewheel={true}
            keyboard={true}
            freeMode={true}
            watchSlidesProgress={true} //監視滑動進度
            onSlideChange={handleSlideChange}
            loop={true}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false, //使用者操作後是否停止自動撥放
              speed: 400,
            }}
            modules={[
              FreeMode,
              Autoplay,
              Navigation,
              Pagination,
              Mousewheel,
              Keyboard,
            ]}
            className="mySwiper"
          >
            {images.map((v, i) => (
              <div key={`image_${i}`} className="slider-img-box">
                <SwiperSlide>
                  <img
                    src={`/images/attraction/${v}`}
                    onClick={() => handleImageClick(i)}
                  />
                </SwiperSlide>
              </div>
            ))}
          </Swiper>
          {/* <p>Current Slide Index: {currentSlideIndex}</p> */}
          <div className="swiper-button-prev" style={arrowStyle}>
            <IoIosArrowDropleftCircle />
          </div>
          <div className="swiper-button-next" style={arrowStyle}>
            <IoIosArrowDroprightCircle />
          </div>
        </div>
      </IconContext.Provider>
    </>
  )
}
