import React from 'react'
import Carousel from 'react-bootstrap/Carousel'
export default function BgSlider() {
  return (
    <Carousel
      fade
      controls={false}
      interval={10000}
      style={{ marginBottom: '50px' }}
    >
      <Carousel.Item>
        <div style={{ width: '100vw', height: '400px', position: 'relative' }}>
          {/* 圖片 */}
          <img
            src="/images/hotel/暫存/洲際.jpg"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
          {/* 文字 */}
          <div
            style={{
              position: 'absolute',
              bottom: '200px',
              right: '200px',
              color: 'white',
              backgroundColor: 'rgba(0, 0, 0, 0.5)', // 背景色設為半透明黑色，增加可讀性
              padding: '5px 10px',
              borderRadius: '5px',
              fontSize: '30px',
            }}
          >
            洲際人生 行走天下
          </div>
        </div>
      </Carousel.Item>
      <Carousel.Item>
        <div style={{ width: '100vw', height: '400px', position: 'relative' }}>
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
            height: '400px',
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
        <div style={{ width: '100vw', height: '400px' }}>
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
        <div style={{ width: '100vw', height: '400px' }}>
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
        <div style={{ width: '100vw', height: '400px' }}>
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
