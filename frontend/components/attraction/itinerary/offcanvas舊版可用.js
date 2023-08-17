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
  favorite,
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
  const [allFavorite, setAllFavorite] = useState(favorite) // 初始未收藏
  const [isFavorite, setIsFavorite] = useState(false) // 初始未收藏

  // 偵測切換就改狀態
  useEffect(() => {
    // 初始渲染判斷是否已收藏
    setShow(offcanvasShow)
    const isAttractionFavorite = favorite.find(
      (item) => item.attraction_id === attraction_id
    )
    setIsFavorite(!!isAttractionFavorite) // 將 undefined 轉換為布林值
  }, [offcanvasShow])

  // 加入收藏函式

  const addFavorite = async () => {
    // 未收藏
    try {
      const newFavoriteStatus = !isFavorite // 反轉收藏狀態
      setIsFavorite(newFavoriteStatus) // 更新顯示狀態
      // setIsFavorite(prevIsFavorite => !prevIsFavorite);
      // 丟狀態給後端判定
      const response = await axios.post(
        'http://localhost:3005/api/favorite/like',
        {
          love: newFavoriteStatus,
          id: attraction_id,
          // TODO 改成會員id
          memberId: 900001,
          dataBaseTableName: 'attraction',
        }
      )
      // console.log('收藏狀態:'+response.data);
      setIsFavorite(response.data)
      console.log('資料庫回傳收藏狀態:' + response.data.love)
    } catch (error) {
      console.error('無法收藏:', error)
    }
    // setAllFavorite(favorite);
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
                onClick={(e) => {}}
              >
                加入行程
              </button>
              <button
                // 更改樣式
                className={`col-4 add-f-btn rounded-pill ${
                  isFavorite.love ? 'remove-f-btn' : 'add-f-btn'
                }`}
                onClick={() => addFavorite(attraction_id)}
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
