import React, { useEffect, useState } from 'react'

import Slider from 'react-slick'
import { IoIosArrowDropleftCircle } from 'react-icons/io'
import { IoIosArrowDroprightCircle } from 'react-icons/io'
// 下一頁箭頭設定
function SampleNextArrow(props) {
  const { style, onClick } = props
  return (
    <div
      // className={className}
      style={{ ...style, display: 'block' }}
      onClick={onClick}
    >
      <IoIosArrowDroprightCircle size={50} color="#137976" />
    </div>
  )
}
// 前一頁箭頭設定
function SamplePrevArrow(props) {
  const {  style, onClick } = props
  return (
    <div
      // className={className}
      style={{ ...style, display: 'block' }}
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
  // 監聽 currentImageIndex 狀態的變化，並在輪播器初始化時觸發 onImageChange 函數來設定預設的圖片
  useEffect(() => {
    if (images.length > 0) {
      if (typeof onImageChange === 'function') {
        onImageChange(images[currentImageIndex], currentImageIndex)
      }
    }
  }, [currentImageIndex, images, onImageChange])

    
  const settings = {
    className: 'center',
    centerMode: true,
    dots: true,
    autoplay: true,
    autoplaySpeed: 3000,
    infinite: true,
    centerPadding: '100px',
    slidesToShow: 4,
    slidesToScroll: 1,
    speed: 500,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    // 設定 afterChange 事件觸發的函式
    afterChange: (index) => {
      setCurrentImageIndex(index) // 更新當前顯示的圖片索引
      if (typeof onImageChange === 'function') {
        onImageChange(images[index], index) // 更新大圖的顯示
      }
    },
  }
  // 圖片設定
  const imageStyle = {
    width: '300px',
    height: '200px',
    objectFit: 'cover',
    border: '10px solid #ffffff',
    boxShadow: '10px 10px 10px rgba(0, 0, 0, 0.25)',
    margin: '5px',
  }

  // 處理點擊輪播圖片的事件
  const handleImageClick = (index) => {
    setCurrentImageIndex(index) // 更新當前顯示的圖片索引
    if (typeof onImageChange === 'function') {
      onImageChange(images[index], index) // 更新大圖的顯示
    }
  }

  return (
    <div>
      <Slider {...settings}>
        {images.map((v, i) => (
          <div key={i} onClick={() => handleImageClick(i)}>
            <img src={`/images/attraction/${v}`} style={imageStyle} />
          </div>
        ))}
      </Slider>
    </div>
  )
}
export default CenterModeSlider
