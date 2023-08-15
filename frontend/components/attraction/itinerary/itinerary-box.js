import React from 'react'
import VisitingTime from './visitTime' //遊玩時間元件
import BusinessDay from './business'
import Accordion from 'react-bootstrap/Accordion'
export default function ItineraryBox({
  id,
  title,
  address,
  img,
  onCardClick,
  offCanvasData,
  favorite,
}) {
  // const handleCardClick = (id) => {
  //   setOffcanvasShow(true)
  //   setSelectedAttraction(id)
  // }
  // console.log(offCanvasData[1].closed_time)
  return (
    <>
      {/* 卡片 */}
      <div
        className="itinerary-box col-10 row justify-content-between align-items-center a-pc"
        onClick={() => onCardClick(id)}
      >
        {/* 文字 */}
        <div className="col-6 itinerary-content justify-content-start ">
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

      {/* rwd版本 */}
      <Accordion
        defaultActiveKey={['0']}
        className="i-accordion-rwd a-rwd"
        onClick={() => onCardClick(id)}
      >
        {/*  */}
        {offCanvasData.map((v, i) => {
          return (
            <Accordion.Item eventKey={i}>
              <Accordion.Header className="i-header">
                <div className="col-10 row justify-content-between">
                  {/* 文字 */}
                  <div className="col-12 d-flex justify-content-center ">
                    <div className="title text-center">{title}</div>
                  </div>
                  {/* 文字結束 */}
                  {/* 圖片 */}
                  {/* <div className="col-5  align-items-center i-img-box">
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
                  </div> */}
                  {/* 圖片結束 */}
                </div>
              </Accordion.Header>
              <Accordion.Body>
                <div className="i-accordion-body row d-flex flex-column ">
                  <div className="i-d-content flex-fill">
                    {/* 圖片 */}
                    <div
                      className="col"
                      style={{
                        height: '26%',
                        margin: 'auto',
                        overflow: 'hidden',
                      }}
                    >
                      <img
                        src={`/images/attraction/${img}`}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                        }}
                      />
                    </div>
                    {/* 圖片結束 */}
                    {/* 內容 */}
                    <div className="col d-content row d-flex flex-fill flex-column align-sekf-stretch">
                      <VisitingTime
                        data={v.visiting_time}
                        currentTime={v.open_time}
                      />
                      {/* 地址 */}
                      <div className="col ">
                        <i className="bi bi-geo-alt-fill"></i>
                        {address}
                      </div>
                      {/* 營業時間 */}
                      <div className="col ">
                        <i className="bi bi-info-circle-fill"></i>營業時間
                      </div>
                      <div className="time d-flex align flex-column">
                        {/* TODO 用公休判斷營業日期 */}
                        {/* <div>星期二 {offCanvasData[0].open_time} {offCanvasData[0].close_time}</div> */}

                        <BusinessDay
                          off_day={v.off_day}
                          open_time={v.open_time.substring(0, 5)}
                          close_time={v.closed_time.substring(0, 5)}
                        />
                      </div>
                      {/* 營業時間結束 */}
                      <hr />
                      {/* 簡介 */}
                      <div className="summary ">{v.title}</div>
                    </div>

                    {/* 內容結束 */}
                    {/* 按鈕 */}
                    {/* <div className="row justify-content-evenly align-items-end flex-fill">
                      <button
                        className="col-4 add-i-btn rounded-pill"
                        onClick={(e) => {}}
                      >
                        加入行程
                      </button>
                      <button
                        // 更改樣式
                        className={`col-4 add-f-btn rounded-pill ${
                          isFavorite.love ? 'remove-f-btn' : 'add-f-btn'
                        }`}
                        onClick={() => addFavorite(v.attraction_id)}
                      >
                        {isFavorite.love ? '加入收藏' : '取消收藏'}
                      </button>
                    </div> */}
                    {/* 按鈕結束 */}
                  </div>
                </div>
                {/* 景點詳細頁結束 */}
              </Accordion.Body>
            </Accordion.Item>
          )
        })}
      </Accordion>

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
