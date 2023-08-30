import { useState, useEffect } from 'react'
import VisitingTime from './visitTime' //遊玩時間元件
import BusinessDay from './business'
import Accordion from 'react-bootstrap/Accordion'
import FavoriteBtn from '../button/favorite-btn'

// toast
import FavoriteSuccess from '@/components/attraction/toast-alert/favorite-success.js'
import FavoriteError from '@/components/attraction/toast-alert/favorite-error.js'
import FavoriteRemove from '@/components/attraction/toast-alert/favorite-remove.js'

import { LazyLoadImage } from 'react-lazy-load-image-component'
import 'react-lazy-load-image-component/src/effects/blur.css'

export default function ItineraryBox({
  id,
  name,
  title,
  address,
  img,
  onCardClick,
  open_time,
  close_time,
  off_day,
  visit_time,
  // favorite,
  // id,
  love,
  memberId,
  dataBaseTableName,
  className = '',
}) {
  // const handleCardClick = (id) => {
  //   setOffcanvasShow(true)
  //   setSelectedAttraction(id)
  // }
  // console.log(offCanvasData[1].closed_time)

  // 收藏狀態
  const [isFavorite, setFavorite] = useState({
    love,
    id,
    memberId,
    dataBaseTableName,
  })

  // 初始判斷收藏狀態
  useEffect(() => {
    setFavorite({ love, id, memberId, dataBaseTableName })
  }, [love, id, memberId, dataBaseTableName])

  //切換函式
  const toggleFav = (clickid) => {
    if (id === clickid) {
      setFavorite({ ...isFavorite, love: !isFavorite.love })
    }
  }

  //  切換收藏狀態
  const favorite = async () => {
    // 發送 POST
    try {
      console.log(
        '收藏狀態:',
        isFavorite.love,
        isFavorite.id,
        isFavorite.memberId,
        isFavorite.dataBaseTableName
      )
      // 丟狀態給後端判定
      const response = await axios.post(
        'http://localhost:3005/api/favorite/like',
        {
          love: isFavorite.love,
          id: isFavorite.id,
          memberId: isFavorite.memberId,
          dataBaseTableName: isFavorite.dataBaseTableName,
        }
      )
      console.log('收藏成功:' + response.data.love)
      setFavorite(response.data)
      // 收藏成功加入彈窗
      if (isFavorite.love) {
        FavoriteRemove()
      } else {
        FavoriteSuccess()
      }
    } catch (error) {
      console.error('無法收藏:', error)
      //  收藏失敗加入彈窗
      FavoriteError()
    }
  }

  return (
    <>
      {/* 卡片 */}
      <div
        // 依傳入值判斷是否加入class
        className={`itinerary-box col-10 row justify-content-between align-items-center a-pc ${className}`}
        onClick={() => onCardClick(id)}
      >
        {/* 文字 */}
        <div className="col-6 itinerary-content justify-content-start ">
          <div className="title">
            {name}
            <div className="address">{address}</div>
          </div>
        </div>
        {/* 文字結束 */}
        {/* 圖片 */}
        <div className="col-5  align-items-center i-img-box">
          <LazyLoadImage
            src={'/images/attraction/' + img}
            style={{
              maxHeight: '100%',
              maxWidth: '100%',
              borderRadius: '10px',
              boxShadow: '4px 4px 10px rgba(0, 0, 0, 0.25)',
            }}
            alt={img}
            title={img}
            effect="blur"
          />
        </div>
        {/* 圖片結束 */}
      </div>
      {/* 卡片結束 */}
      {/* rwd版本 */}
      <Accordion
        defaultActiveKey={[]}
        className="i-accordion-rwd a-rwd"
        onClick={() => onCardClick(id)}
      >
        <Accordion.Item eventKey="0">
          <Accordion.Header className="i-header">
            <div className="col-10 row justify-content-between">
              {/* 文字 */}
              <div className="col-12 d-flex justify-content-center ">
                <div className="title text-center">{name}</div>
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
                  <LazyLoadImage
                    src={`/images/attraction/${img}`}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                    }}
                    effect="blur"
                  />
                </div>
                {/* 圖片結束 */}
                {/* 內容 */}
                <div className="col d-content row d-flex flex-fill flex-column align-sekf-stretch">
                  <VisitingTime data={visit_time} currentTime={open_time} />
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
                      off_day={off_day}
                      open_time={open_time}
                      close_time={close_time}
                    />
                  </div>
                  {/* 營業時間結束 */}
                  <hr />
                  {/* 簡介 */}
                  <div className="summary ">{title}</div>
                </div>

                {/* 內容結束 */}
                {/* 按鈕 */}
                <div className="row justify-content-evenly align-items-end flex-fill mx-3">
                  <button
                    className="add-i-btn rounded-pill  my-3 col-sm-10 col-xl-4"
                    onClick={(e) => {}}
                  >
                    加入行程
                  </button>

                  <FavoriteBtn favorite={favorite} isFavorite={isFavorite} />
                </div>
                {/* 按鈕結束 */}
              </div>
            </div>
            {/* 景點詳細頁結束 */}
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>

      {/* rwd版本結束 */}

      <style jsx>
        {`
          .itinerary-box-search {
            margin: 10px;
          }
          .itinerary-box-list {
            width: 84%;
            margin-top: 10px;
          }

          .itinerary-box {
            background-color: #ffffff;
            border-radius: 10px;
            box-shadow: 10px 10px 10px rgba(0, 0, 0, 0.25);
            transform: translateX(25px);
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
