import React from 'react'
import Image from 'next/image'
import Box from '@/components/attraction/itinerary-box'

import axios from 'axios'
// 代改 搜索列
import { useState,useEffect } from 'react'
import { SlMagnifier } from 'react-icons/sl' //導入放大鏡icon

export default function Itinerary({ search, setInput }) {
  const [attractions, setAttractions] = useState([]);
  // 搜索列的函式
  useEffect(() => {
    // 使用 Axios 發送 GET 請求獲取資料
    axios.get('/data/attraction/show-card.json')
      .then(res => {
        setAttractions(res.data);
      })
      .catch(error => {
        // 處理錯誤
        console.error('錯誤:', error);
      });
  }, []); 

  const inputHandler = (e) => {
    setInput(e.target.value)
  }
  return (
    <>
      <div className="row m-p-0">
        {/* TODO 分頁 */}
        <div className="col-3 m-p-0">
          <nav>
            {/* 分頁選單 */}
            <ul
              className="nav nav-tabs nav-fill d-flex justify-content-around  text_light_24"
            >
              <li className="nav-item ">
                <button className="nav-link" aria-current="page" href="#">
                  行程表<i class="fa-solid fa-list-check"></i>
                </button>
              </li>
              <li className="nav-item  dark ">
                <button className="nav-link">
                  搜索<i class="fa-solid fa-magnifying-glass"></i>
                </button>
              </li>
              <li className="nav-item">
                <button className="nav-link" href="#">
                  收藏<i class="fa-solid fa-heart"></i>
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
            style={{ height: '89vh', backgroundColor: '#FFF7E3' }}
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
              {attractions.map((v, i) => {
                return (
                  <Box
                    key={i}
                    title={v.title}
                    address={v.address}
                    img={v.img}
                  />
                )
              })}
            </div>
          </div>
        </div>
        {/* 行程分頁 */}
        {/* 行程分頁結束 */}

        {/* 收藏分頁 */}
        {/* 收藏分頁結束 */}

        {/* ----------------------------- */}
        {/* 景點詳細頁 */}
        <div className="col-2 i-bg row d-flex flex-column">
          <div className="i-d-content flex-fill">
            {/* 景點名稱+關閉按鈕 */}
            <div className="row justify-content-between name-close">
              {/* 景點名稱 */}
              <div className="col">景點名稱</div>
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
