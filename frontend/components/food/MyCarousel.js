import React from 'react'
import Slider from 'react-slick'

// 引入slick的CSS
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

const MyCarousel = ({ photos }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 6000,
  }

  return (
    <Slider {...settings}>
      {photos.map((photo, index) => (
        <div key={index}>
          <img
            src={photo}
            alt="地點照片"
            style={{ width: '300px', height: '200px' }}
          />
        </div>
      ))}
    </Slider>
  )
}

export default MyCarousel
