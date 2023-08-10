import React from 'react'
import Image from 'next/image'
export default function ItineraryBox({ id, title, address, img, onCardClick }) {
  // const handleCardClick = (id) => {
  //   setOffcanvasShow(true)
  //   setSelectedAttraction(id)
  // }

  return (
    <>
      {/* 卡片 */}
      <div
        className="itinerary-box col-10 row justify-content-between align-items-center"
        onClick={() => onCardClick(id)}
      >
        {/* 文字 */}
        <div className="col-6 itinerary-content justify-content-start">
          <div className="title">
            {title}
            <div className="address">{address}</div>
          </div>
        </div>
        {/* 文字結束 */}
        {/* 圖片 */}
        <div className="col-5  align-items-center i-img-box">
          <img
            src={'/images/attraction/' + img}
            style={{
              maxHeight: '100%',
              maxWidth: '100%',
              borderRadius: '10px',
              boxShadow: '4px 4px 10px rgba(0, 0, 0, 0.25)',
            }}
            alt={img}
            title={img}
          />
        </div>
        {/* 圖片結束 */}
      </div>
      {/* 卡片結束 */}
      <style jsx>
        {`
          .itinerary-box {
            background-color: #ffffff;
            border-radius: 10px;
            box-shadow: 10px 10px 10px rgba(0, 0, 0, 0.25);
            margin: 10px;
            padding: 10px;
            cursor: pointer;
          
            .itinerary-content {
              font-size: 20px;
              margin: 5px;
              font-weight: 600;
              .title {
                font-size: 20px;
                color: #6b4f5b;
                margin-bottom: 5px;
              }
              .address {
                font-size: 12px;
                color: #7fb8b6;
                margin-top: 10px;
              }
            }
          }
        `}
      </style>
    </>
  )
}
