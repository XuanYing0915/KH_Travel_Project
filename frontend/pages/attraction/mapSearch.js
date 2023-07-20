import React from 'react'
// 引入標題元件
import Title from '@/components/title'
import data from '@/data/attraction/attraction.json'
import Card from '@/components/common-card2/common-card2'
import Search from '@/components/search'
import { Button } from 'bootstrap'

// 渲染畫面
export default function MapSearch() {
  return (
    <>
      {/* 背景圖 */}
      <div className="img-dark-bg">
        <div>經典與新奇並存的不可錯過之處</div>
      </div>

      {/* <div className="container"> */}
      <div className="row">
        <div className="row col-5 half-bg relative">
          <div className="a-title-box row">
            <div className="a-title-C">踏上旅行之路</div>
            <div className="a-title-E">Embark on a Journey</div>
          </div>
          <img
            src="/images/attraction/互動地圖-全部區域.png"
            style={{
              transform: 'translateY(20%)',
              width: '80%',
              height: '80%',
              marginLeft: '100px',
              position: 'relative',
              zIndex: '10',
            }}
          />
        </div>
        {/* 地圖搜索卡片 */}
        <div className="col-7 half-bg">
          <div className="attraction-display-box a-text-box-dark m-5">
            <Title title="地區名稱" style="title_box_light" />
            {/* 3張搜索卡片 */}
            <div className="display-card row ">
              <div className="col-4 left-box">
                <Card />
              </div>
              <div className="col-4 center-box">
                <Card />
              </div>
              <div className="col-4 right-box">
                <Card />
              </div>
            </div>
          </div>
        </div>

        <div className="half-bg"></div>
      </div>

      {/* 淺色背景 */}
      <div className="ty-300">
        <div className="container">
          {/* <div className="row">
            <div className="row col-1"></div>
            <div className="row col-10">  */}
          <Search />
          {/* </div> 
             <div className="row col-1"></div> 
          </div>*/}
        </div>
        <div className="row c1">
          <div className="row col-11 c align d-flex justify-content-around ">
            <Card />
            <Card />
            <Card />
            <Card />
          </div>
          <div className="row col-11 align c d-flex justify-content-around">
            <Card />
            <Card />
            <Card />
            <Card />
          </div>
        </div>
      </div>
    </>
  )
}
