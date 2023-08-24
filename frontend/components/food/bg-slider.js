import React from 'react'
import Carousel from 'react-bootstrap/Carousel'
export default function BgSlider() {
  const items = [
    [
      '/images/food/2022-08-17.jpg',
      '/images/food/阪城海鮮料理.jpg',
      '/images/food/大骨麵-好男人系列.jpg',
    ],
    [
      '/images/food/禾苑蔗片冰.jpg',
      '/images/food/PXL_20230123_101633591.jpg',
      '/images/food/日腸小室.jpg',
    ],
    [
      '/images/food/包子叔叔小籠包.jpg',
      '/images/food/北港蔡三代筒仔米糕.jpg',
      '/images/food/阿榮鵝肉.jpg',
    ],
    [
      '/images/food/故事咖啡館.jpg',
      '/images/food/2023-05-20.jpg',
      '/images/food/喬的義百種料理.jpg',
    ],
  ]

  return (
    <div className='outer-frame'>
    <Carousel
      fade
      controls={false}
      interval={5000}
      className="animate__animated animate__fadeIn "
    >
      {items.map((itemGroup, index) => (
        <Carousel.Item key={index}>
          <div className="food-carousel-container">
            {itemGroup.map((src, idx) => (
              <img key={idx} src={src} />
            ))}
          </div>
        </Carousel.Item>
      ))}
    </Carousel></div>
  )
}
