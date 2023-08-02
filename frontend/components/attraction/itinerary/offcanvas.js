import { useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button'
import Offcanvas from 'react-bootstrap/Offcanvas'

function Example() {
  const [show, setShow] = useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const options = [
    {
      scroll: false,
      backdrop: false,
    },
  ]
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
              景點名稱
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
                <img src="/images/attraction/草神.jpg" />
              </div>
              {/* 圖片結束 */}
              {/* 內容 */}
              <div className="col d-content row d-flex flex-column">
                <div className="col ">
                  <i className="bi bi-alarm-fill"></i>
                  {/* TODO 資料庫增加停留欄位 */}
                  建議停留時間 : 1小時30分
                </div>
                <div className="col ">
                  <i class="bi bi-geo-alt-fill"></i>
                  高雄市鹽埕區真愛路1號
                </div>
                {/* 營業時間 */}
                <div className="col ">
                  <i class="bi bi-info-circle-fill"></i>營業時間
                </div>
                <div className="time d-flex align flex-column">
                  {/* TODO 用公休判斷營業日期 */}
                  <div>星期二 10:00 – 22:00</div>
                  <div>星期二 10:00 – 22:00</div>
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
                  走進絢爛的星空隧道，體驗10種不同的主題光影動畫，來一趟奇幻空間的打卡之旅。
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

export default Example
