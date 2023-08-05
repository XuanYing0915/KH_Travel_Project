import { add, at } from 'lodash';
import { useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button'
import Offcanvas from 'react-bootstrap/Offcanvas'

export default function Example({
  attraction_id,
  attraction_name,
  img,
  open_time,
  close_time,
  off_day,
  address,
  title}) {
  const [show, setShow] = useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const options = [
    {
      scroll: false,
      backdrop: false,
    },
  ]

  // 帶入的off_day判斷營業日
  // 假設今天是星期一
  // 將off_day轉成陣列
  // 把資料轉成星期二到星期日=營業日
  // 用map判斷星期一到星期日是否有在營業日陣列中
  // 有的話就顯示營業時間
  // 沒有的話就顯示公休

// const offDayArray = off_day.split(',')
// const week = ['星期一','星期二','星期三','星期四','星期五','星期六','星期日','全年無休']
// const weekArray = week.map((v,i)=>{
//   return v
// })
// console.log(weekArray)
// console.log(offDayArray)
// const openDay = weekArray.map((v,i)=>{
//   if(offDayArray.includes(v)){
//     return '公休'
//   }else{
//     return '營業時間'
//   }
// })
  return (
    <>
      <Button variant="primary" onClick={handleShow} className="btn-lg">
        Launch
      </Button>
      <div onClick={handleClose}>
        <Offcanvas
          show={show}
          className="a-i-offcanvas"
          {...options[0]}
          //   onHide={handleClose}
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
              <div className="row justify-content-between name-close">
                <div className="col"></div>
                {/* <button
                  type="button"
                  class="btn-close btn-close-white"
                  aria-label="Close"
                ></button> */}
              </div>

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
                  <i class="bi bi-geo-alt-fill"></i>
                {address}
                </div>
                {/* 營業時間 */}
                <div className="col ">
                  <i class="bi bi-info-circle-fill"></i>營業時間
                </div>
                <div className="time d-flex align flex-column">
                  {/* TODO 用公休判斷營業日期 */}
                  {/* <div>星期二 {offCanvasData[0].open_time} {offCanvasData[0].close_time}</div> */}

                  <div>{off_day} {open_time} – {close_time}</div>
                  <div>星期二 10:00 – 22:00</div>
                  <div>星期二 10:00 – 22:00</div>
                  <div>星期二 10:00 – 22:00</div>
                  <div>星期二 10:00 – 22:00</div>
                  <div>星期二 10:00 – 22:00</div>
                </div>
                {/* 營業時間結束 */}
                <hr />
                {/* 簡介 */}
                <div className="summary">
                  {/* {offCanvasData[0].title} */}
                </div>
              </div>
              {/* 內容結束 */}
              {/* 按鈕 */}
              <div className="col  row justify-content-evenly align-items-end">
                <button className="col-4 add-i-btn rounded-pill ">
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
      </div>
    </>
  )
}

