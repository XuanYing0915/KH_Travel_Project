import React from 'react';
import Carousel from 'react-bootstrap/Carousel';

export default function BgSlider() {
  const items = [
    ["/images/attraction/美麗島.jpg", "/images/attraction/美濃湖05.jpg", "/images/attraction/美麗島.jpg"],
    ["/images/attraction/美濃湖05.jpg", "/images/attraction/美濃湖05.jpg", "/images/attraction/美濃湖05.jpg"],
  ];

  return (
    <Carousel fade controls={false} interval={10000} className="animate__animated animate__fadeIn">
      {items.map((itemGroup, index) => (
        <Carousel.Item key={index}>
          <div style={{
            marginTop:'30px',
            height: '300px',
            position: 'relative',
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'center' // 添加此屬性使圖片上下居中
          }}>
            {itemGroup.map((src, idx) => (
              <img
                key={idx}
                src={src}
                style={{
                  width: '30vw',
                  height: '100%',
                  objectFit: 'contain',
                  margin: '0px',
                }}
              />
            ))}
          </div>
        </Carousel.Item>
      ))}
    </Carousel>
  );
}
