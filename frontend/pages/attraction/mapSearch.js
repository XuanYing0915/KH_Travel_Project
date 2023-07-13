import React from 'react'
// 引入標題元件
import Title from '@/components/title'

// 渲染畫面
export default function MapSearch() {
  return (
    <>
      <div className="container">
        {/* 上層 包含 景點名稱+基本資訊| 封面圖*/}
        <div className="row">
          <div className="col-5">
            {/* 景點名稱 */}
            <div class="attractionName">
              <div class="name">景點名稱xxxxx</div>
            </div>
            {/* 基本資訊 */}
          </div>
          <div className="col-7">
            {/* 封面圖 */}
            <img class="title_cover" src="/images/attraction/綠湖.jpg" alt="" />
          </div>
        </div>
        <div className="row">
          <div className="col">
            <Title title="周邊景點" />
          </div>
          <div className="red"></div>
        </div>
        <div className="col">
          <Title title="周邊美食" />
        </div>
        <div className="col">
          <Title title="周邊住宿" />
        </div>
      </div>
    </>
  )
}
