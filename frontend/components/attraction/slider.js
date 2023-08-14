import React, { useEffect, useState } from 'react'
import Slider from 'react-slick'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { IoIosArrowDropleftCircle } from 'react-icons/io'
import { IoIosArrowDroprightCircle } from 'react-icons/io'
// 下一頁箭頭設定
function SampleNextArrow(props) {
  const { style, onClick } = props
  return (
    <div
      // className={className}
      style={{ ...style, display: 'block', padding: '20px' }}
      onClick={onClick}
    >
      <IoIosArrowDroprightCircle size={50} color="#137976 " />
    </div>
  )
}
// 前一頁箭頭設定
function SamplePrevArrow(props) {
  const {  style, onClick } = props
  return (
    <div
      // className={className}
      style={{ ...style, display: 'block',padding:'20px' }}
      onClick={onClick}
    >
      <IoIosArrowDropleftCircle size={50} color="#137976" />
    </div>
  )
}
// 輪播本體
const CenterModeSlider = ({ images, onImageChange }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  // 輪播設定
  // 監聽輪播圖觸發 onImageChange 函數來設定圖片
  useEffect(() => {
    if (images.length > 0) {
      onImageChange(images[currentImageIndex], currentImageIndex)
    }
  }, [currentImageIndex, images, onImageChange])

  const settings = {
    className: 'center',
    centerMode: true,
    dots: true,
    autoplay: true,
    autoplaySpeed: 4000,
    infinite: true,
    centerPadding: '200px',
    slidesToShow: 3,
    slidesToScroll: 1,
    speed: 500,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    // 設定 RWD 斷點

    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2,
          infinite: true,
          dots: true,
        },
      },
      ,
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],

    // 設定 afterChange 事件觸發的函式
    afterChange: (index) => {
      setCurrentImageIndex(index) // 更新當前顯示的圖片索引
      onImageChange(images[index], index) // 更新大圖的顯示
    },
  }


  // 處理點擊輪播圖片的事件
  const handleImageClick = (index) => {
    setCurrentImageIndex(index) // 更新當前顯示的圖片索引
    if (typeof onImageChange === 'function') {
      onImageChange(images[index], index) // 更新大圖的顯示
    }
  }

  return (
    <>
      <div className="carousel-wrapper">
        <Slider {...settings}>
          {images.map((v, i) => (
            <div key={i} onClick={() => handleImageClick(i)} className="slider-img-box">
              <img
                src={`/images/attraction/${v}`}
              />
            </div>
          ))}
        </Slider>
      </div>
    </>
  )
}
export default CenterModeSlider
