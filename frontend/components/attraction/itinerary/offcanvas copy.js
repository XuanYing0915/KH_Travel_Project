import { useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button'
import Offcanvas from 'react-bootstrap/Offcanvas'
import BusinessDay from './business' //營業時間元件
import VisitingTime from './visitTime' //遊玩時間元件
import axios from 'axios'

export default function ItineraryOffcanvas({
  attraction_id,
  attraction_name,
  img,
  open_time,
  close_time,
  off_day,
  address,
  title,
  visit_time,
  offcanvasShow,
  setOffcanvasShow,
  id,
  love,
  memberId,
  dataBaseTableName,
}) {
  // 導覽列狀態
  const [show, setShow] = useState()
  // 關閉導覽列
  const handleClose = () => {
    setOffcanvasShow(false)
  }

  const options = [
    {
      scroll: false,
      backdrop: false,
    },
  ]

  // 收藏狀態
  const [isFavorite, setFavorite] = useState({
    love,
    attraction_id,
    memberId,
    dataBaseTableName,
  })
  // 初始判斷收藏狀態
  useEffect(() => {
    setFavorite({ love, id, memberId, dataBaseTableName })
  }, [love, attraction_id, memberId, dataBaseTableName, offcanvasShow])

  //切換函式
  const toggleFav = (clickid) => {
    if (id === clickid) {
      setFavorite({ ...isFavorite, like: !isFavorite.like })
    }
  }

  //  切換收藏狀態
  const favorite = async () => {
    // 發送 POST
    try {
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
    } catch (error) {
      console.error('無法收藏:', error)
    }
  }

  return (
    <>
      {/* <div onClick={handleClose}> */}
      <Offcanvas
        show={show}
        className="a-i-offcanvas a-pc"
        {...options[0]}
        onHide={handleClose}
        onEscapeKeyDown={handleClose}
      >
        {/* 關閉按鈕 */}
        <Offcanvas.Header closeButton>
          {/* 景點名稱 */}
          <Offcanvas.Title className="a-i-offcanvas-title">
            {attraction_name}
          </Offcanvas.Title>
        </Offcanvas.Header>
        {/* <Offcanvas.Body> */}
        <div className="col-12 i-bg row d-flex flex-column ">
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
            <div className="row justify-content-evenly align-items-end flex-fill">
              <button
                className="col-4 add-i-btn rounded-pill"
                onClick={() => {}}
              >
                加入行程
              </button>
              <button
                // 更改樣式
                className={`col-4 add-f-btn rounded-pill ${
                  isFavorite.love ? 'remove-f-btn' : 'add-f-btn'
                }`}
                onClick={favorite}
              >
                {isFavorite.love ? '加入收藏' : '取消收藏'}
              </button>
            </div>
            {/* 按鈕結束 */}
          </div>
        </div>
        {/* 景點詳細頁結束 */}
        {/* </Offcanvas.Body> */}
      </Offcanvas>
      {/* </div> */}
    </>
  )
}
