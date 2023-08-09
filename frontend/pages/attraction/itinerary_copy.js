import  {useState, useEffect } from 'react'
import axios from 'axios'
import { SlMagnifier } from 'react-icons/sl' //放大鏡icon
import { AiFillCar } from 'react-icons/ai' //車icon
// 介紹分頁元件
import Offcanvas from '@/components/attraction/itinerary-copy/offcanvas'
// 景點卡片元件
import Box from '@/components/attraction/itinerary/itinerary-box'
export default function Itinerary({ search, setInput }) {
  const [attractions, setAttractions] = useState([]) //原始資料
  const [offcanvasShow, setOffcanvasShow] = useState(false) // offcanvas顯示
  // const [offCanvasData, setoffCanvasData] = useState([]) // offcanvas顯示
  const [isLoading, setIsLoading] = useState(true) // 等待資料時顯示動畫
  const handleShow = () => setOffcanvasShow(true)
  const [selectedAttraction, setSelectedAttraction] = useState(null);
  // 搜索列的函式
  const axiosData = async () => {
    try {
      // 取資料
      const response = await axios.get(
        'http://localhost:3005/attraction'
      )
      // 存入前端
      setAttractions(response.data)
      console.log('資料庫資料:', response.data)
      
    } catch (error) {
      console.error('錯誤:', error)
      setIsLoading(false)
    }
  }
  //點卡片後將資料根據id篩選後資料傳給offcanvas

  // 搜索列
  const inputHandler = (e) => {
    setInput(e.target.value)
  }

  // 景點卡片點擊出現offcanvas
  const handleCardClick = (attraction) => {
    setSelectedAttraction(attraction);
    setOffcanvasShow(true); // 打开 Offcanvas
  };


  // 關閉offcanvas
  const handleCloseOffcanvas = () => {
    setOffcanvasShow(false)
  }

  // 執行渲染
  useEffect(() => {
    axiosData();
  }, []);
  return (
    <>
      {/* <div className="container-space"></div> */}
      <div className="row m-p-0">
        {/* TODO 分頁 */}
        <div className="col-3 m-p-0">
          <nav>
            {/* 分頁選單 */}
            <ul className="nav nav-tabs nav-fill d-flex justify-content-around  text_light_24">
              <li className="nav-item ">
                <button className="nav-link" aria-current="page" href="#">
                  行程表<i className="fa-solid fa-list-check"></i>
                </button>
              </li>
              <li className="nav-item  dark ">
                <button className="nav-link">
                  搜索<i className="fa-solid fa-magnifying-glass"></i>
                </button>
              </li>
              <li className="nav-item">
                <button className="nav-link" href="#">
                  收藏<i className="fa-solid fa-heart"></i>
                </button>
              </li>
            </ul>
          </nav>
          {/* 分頁選單結束 */}
          {/* TODO 卷軸 */}
          {/* TODO 使用資料 景點名 地址 圖片 */}
          {/* 搜索分頁 */}
          <div
            // className="tab-content "
            style={{ height: '81vh', backgroundColor: '#FFF7E3' }}
          >
            {/* 放卡片區 */}
            <div className="row align-items-start  justify-content-center ">
              {/*搜索 */}
              <div className="i-search">
                <input
                  className="input"
                  onChange={inputHandler}
                  type="text"
                  value={'搜索'}
                />
                <button onClick={search}>
                  <SlMagnifier />
                </button>
              </div>
              {/* 搜索結束 */}
              <div className="i-card row align-items-start  justify-content-center ">
                {/*{顯示景點 */}
                {attractions.map((v, i) => {
                  return (
                    <>
                      <Box
                        key={v.attraction_id}
                        id={v.attraction_id}
                        title={v.attraction_name}
                        address={v.address}
                        img={v.img_name}
                        onCardClick={handleCardClick}
                        // handleShow={handleShow} 
                        
                      />
                      <span className="i-travel-time-box">
                        <AiFillCar style={{ fontSize: '30px' }} />
                        <div className="time-box"></div>
                        車程
                        <span className="travel-time">
                          {/* TODO 計算時程 */}
                          10
                        </span>
                        分鐘
                      </span>
                    </>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
        {/* 行程分頁 */}
        {/* 行程分頁結束 */}

        {/* 收藏分頁 */}
        {/* 收藏分頁結束 */}

        {/* ----------------------------- */}
        {/* 景點詳細頁 */}
        
        {selectedAttraction && (
        <Offcanvas
          show={offcanvasShow}
          onClose={handleCloseOffcanvas}
          attraction_id={selectedAttraction.attraction_id}
          attraction_name={selectedAttraction.attraction_name}
          img={selectedAttraction.img_name}
          open_time={selectedAttraction.open_time}
          close_time={selectedAttraction.close_time}
          off_day={selectedAttraction.off_day}
          address={selectedAttraction.address}
          title={selectedAttraction.title}
        />
      )}



        <div className="col-2 i-bg row d-flex flex-column">
          <div className="i-d-content flex-fill">
            {/* 景點名稱+關閉按鈕 */}
            <div className="row justify-content-between name-close">
              {/* 景點名稱 */}
              <div className="col">{selectedAttraction[0].attraction_name}</div>
              {/* 關閉按鈕 */}
              <button
                type="button"
                class="btn-close btn-close-white"
                aria-label="Close"
              ></button>
            </div>
            {/* 景點名稱+關閉按鈕結束 */}
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

        {/* TODO 地圖 */}
        <div className="col-9"></div>
      </div>
    </>
  )
}
