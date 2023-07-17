import React from 'react'
// 引入標題元件
import Title from '@/components/title'
import data from '@/data/attraction/attraction.json'

// 渲染畫面
export default function MapSearch() {
  return (
    <>
      {/* 背景圖 */}
      <div className="img-dark-bg">
        <div>經典與新奇並存的不可錯過之處</div>
      </div>

      <div className="container">
        <div className="row">
          <div className="row col-6">
            <div className="a-title-C">踏上旅行之路</div>
            <div className="a-title-E">Embark on a Journey</div>
            <img
              src="/images/attraction/互動地圖-假.png"
              style={{ transform: 'translateY(-13%)' }}
            />
          </div>
          {/* 地圖搜索卡片 */}
          <div className="col-6">
            地圖顯示小卡區
            <div className="a-traffic-box a-text-box-dark ">
              <Title title="地區名稱" style="title_box_light" />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
