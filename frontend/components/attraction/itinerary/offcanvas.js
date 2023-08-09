
import { useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button'
import Offcanvas from 'react-bootstrap/Offcanvas'
import BusinessDay from './business'
export default function ItineraryOffcanvas({
  attraction_id,
  attraction_name,
  img,
  open_time,
  close_time,
  off_day,
  address,
  title, 
  offcanvasShow,
  setOffcanvasShow
}) {
    // 導覽列狀態
  const [show, setShow] = useState()

  // 關閉導覽列
  const handleClose = () => {
    setOffcanvasShow(false)}

  const options = [
    {
      scroll: false,
      backdrop: false,
    },
  ]
// 偵測切換就改狀態
  useEffect(() => {
    setShow(offcanvasShow)
  }, [offcanvasShow])


  return (
    <>
      {/* <div onClick={handleClose}> */}
        <Offcanvas
          show={show}
          className="a-i-offcanvas"
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
          <div className="col-12 i-bg row d-flex flex-column">
            <div className="i-d-content flex-fill">
              {/* 圖片 */}
              <div className="col">
                <img src={`/images/attraction/${img}`} />
              </div>
              {/* 圖片結束 */}
              {/* 內容 */}
              <div className="col d-content row d-flex flex-column">
                <div className="col ">
                  <i className="bi bi-alarm-fill"></i>
                  {/* TODO 資料庫增加停留欄位 */}
                  建議停留時間 : 1小時30分
                  {/* 待增加資料庫 */}
                </div>
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
                  
                  <BusinessDay off_day={off_day} open_time={open_time} close_time={close_time} />
                  
                </div>
                {/* 營業時間結束 */}
                <hr />
                {/* 簡介 */}
                <div className="summary ">{title}</div>
              </div>
              {/* 內容結束 */}
              {/* 按鈕 */}
              <div className="row justify-content-evenly align-items-end flex-fill ">
                <button className="col-4 add-i-btn rounded-pill">
                  加入行程
                </button>
                <button className="col-4 add-f-btn rounded-pill ">
                  加入收藏
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

