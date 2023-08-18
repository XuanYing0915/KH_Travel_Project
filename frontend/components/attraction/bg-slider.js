import React from 'react'
import Carousel from 'react-bootstrap/Carousel'
export default function BgSlider() {
  return (
    <Carousel
      fade
      controls={false}
      interval={10000}
      className="animate__animated animate__fadeIn"
    >
      <Carousel.Item>
        <div style={{ width: '100vw', height: '300px', position: 'relative' }}>
          {/* 圖片 */}
          <img
            src="/images/attraction/美麗島.jpg"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: '0 42%',
            }}
          />
        </div>
      </Carousel.Item>
      <Carousel.Item>
        <div style={{ width: '100vw', height: '300px', position: 'relative' }}>
          <img
            src="/images/attraction/美濃湖05.jpg"
            style={{
              objectFit: 'cover',
              objectPosition: '0 45%',
              width: '100%',
              height: '100%',
            }}
          />
        </div>
      </Carousel.Item>
      <Carousel.Item>
        <div
          style={{
            width: '100vw',
            height: '300px',
          }}
        >
          <img
            src="/images/attraction/西子灣04.jpg"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: '0 74%',
            }}
          />
        </div>
      </Carousel.Item>
      <Carousel.Item>
        <div style={{ width: '100vw', height: '300px' }}>
          <img
            src="/images/attraction/愛河01.jpg"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: '0 50%',
            }}
          />
        </div>
      </Carousel.Item>
      <Carousel.Item>
        <div style={{ width: '100vw', height: '300px' }}>
          <img
            src="/images/attraction/愛河之心03.jpg"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: '0 44%',
            }}
          />
        </div>
      </Carousel.Item>
      <Carousel.Item>
        <div style={{ width: '100vw', height: '300px' }}>
          <img
            src="/images/attraction/流行音樂中心.png"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: '0 20%',
            }}
          />
        </div>
      </Carousel.Item>
    </Carousel>
  )
}
