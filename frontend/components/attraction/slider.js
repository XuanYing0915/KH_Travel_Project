import React, { Component } from 'react'
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
const CenterModeSlider = ({ images }) => {
  // 輪播設定
  
    const settings = {
      className: 'center',
      centerMode: true,
      infinite: true,
      centerPadding: '100px',
      slidesToShow: 4,
      slidesToScroll: 1,
      speed: 500,
      nextArrow: <SampleNextArrow />,
      prevArrow: <SamplePrevArrow />,
    }
// 圖片設定
    const imageStyle = {
      maxWidth: '300px', 
      maxHeight: '200px', 
      objectFit: 'cover', 
      border: '10px solid #ffffff',
      boxShadow: '10px 10px 10px rgba(0, 0, 0, 0.25)',
      margin: '5px',
  
    }

    return (
      <div>
        <Slider {...settings}>
          {images.map((v, i) => (
            <div key={i}>
              <img src={`/images/attraction/${v}`} style={imageStyle} />
            </div>
          ))}
        </Slider>
      </div>
    )
  }
export default CenterModeSlider
