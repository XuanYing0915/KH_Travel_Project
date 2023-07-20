import React from 'react'
import Image from 'next/image'
import Box from '@/components/attraction/itinerary-box'
import data from '@/data/attraction/show-card.json'
export default function Itinerary() {
  return (
    <>
      <div className="row">
        {/* TODO 分頁 */}
        <div className="col-3">
          <nav>
            {/* 分頁選單 */}
            <ul
              className="nav nav-tabs nav-fill d-flex justify-content-around a-text-box-light mt-5 text_light_24"
              // style={{ height: '1000px' }}
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
          {/* 搜索分頁 */}
          <div
            className="tab-content"
            style={{ height: '1000px', backgroundColor: '#FFF7E3' }}
          >
            {/* 放卡片區 */}
            <div className="row align-items-start  justify-content-center">
              {data.map((v, i) => {
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
        <div className="col-2 ">123</div>
        {/* 景點詳細頁結束 */}

        {/* TODO 地圖 */}
        <div className="col-9"></div>
      </div>
    </>
  )
}
