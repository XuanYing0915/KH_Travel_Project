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
            src="/images/hotel/暫存/承億.jpg"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
        </div>
      </Carousel.Item>
      <Carousel.Item>
        <div style={{ width: '100vw', height: '400px' }}>
          <img
            src="/images/hotel/暫存/漢神.jpg"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: '0 70%',
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
            src="/images/hotel/暫存/晶英.jpg"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: '0 80%',
            }}
          />
        </div>
      </Carousel.Item>
      <Carousel.Item>
        <div style={{ width: '100vw', height: '400px' }}>
          <img
            src="/images/hotel/暫存/高雄美景1.jpg"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: '0 30%',
            }}
          />
        </div>
      </Carousel.Item>
      <Carousel.Item>
        <div style={{ width: '100vw', height: '400px', position: 'relative' }}>
          <img
            src="/images/hotel/暫存/義大皇家.jpg"
            style={{
              objectFit: 'cover',
              objectPosition: '0 100%',
              width: '100%',
              height: '100%',
            }}
          />
        </div>
      </Carousel.Item>
    </Carousel>
  )
}
