import React, { useState } from 'react'
// 引入元件
import Title from '@/components/title'

import Card2 from '@/components/common-card2/common-card2'
import Search from '@/components/search'
import SvgMap from '@/components/attraction/KH-map-SVG'
// 搜尋/篩選
import AllSearch from '@/components/attraction/search/a-search'
// 資料
import data from '@/data/attraction/attraction.json'
import more from '@/data/attraction/more_attraction.json'


// 渲染畫面
export default function MapSearch() {
  // 接收map點擊的地區名稱
  const [areaName, setAreaName] = useState('推薦')

  // 接收map點擊的地區id
  const [areaId, setAreaId] = useState(null)
  // 點擊map處發函式 拿到id name
  const AreaClick = (areaId, areaName) => {
    setAreaId(areaId)
    setAreaName(areaName)
  }
  // 依地圖選擇地區顯示卡片
  const [card, setCard] = useState(data.attractions)

// 篩選選擇地區後卡片狀態
  const filterCard = (areaId) => {
    if (areaId === null) {
      setCard(data.attractions)
    } else {
      const newCard = data.attractions.filter((v, i) => {
        return v.area_id === areaId
      })
      setCard(newCard)
    }}


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
          {/* 傳遞點擊的地區給map */}
          <SvgMap AreaClick={setAreaName} />
        </div>
        {/* 地圖搜索卡片 */}
        <div className="col-7 half-bg">
          <div className="attraction-display-box a-text-box-dark m-5">
            {/* map傳回點擊地區的名稱 */}
            <Title title={areaName} style="title_box_light" />
            {/* 3張搜索卡片 */}
            <div className="display-card row ">
              <div className="col-4 left-box">
                <Card2
                  id={1}
                  img_src="溫迪.png"
                  name="洲際飯店"
                  like={false}
                  towheresrc="/attraction/#"
                  imgrouter="attraction"
                />
              </div>
              <div className="col-4 center-box">
                <Card2
                  id={1}
                  img_src="四神.jpg"
                  name="洲際飯店"
                  like={false}
                  towheresrc="#"
                  imgrouter="attraction"
                />
              </div>
              <div className="col-4 right-box">
                <Card2
                  id={1}
                  img_src="草神.jpg"
                  name="洲際飯店"
                  like={false}
                  imgrouter="attraction"
                  towheresrc="#"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="half-bg"></div>
      </div>

      {/* 淺色背景 */}
      <div className="ty-300">
        <AllSearch />

        {/* <div className="row c1">
          <div className="row col-11 c align d-flex justify-content-around">
         
          <Title title="熱門推薦" style="title_box_dark" />
            {more.attractions.map((v, i) => {
              return (
                <Card2
                  id={v.attraction_id}
                  img_src={v.img_src}
                  name={v.attraction_name}
                  time={`${v.open_time.substring(
                    0,
                    5
                  )}-${v.closed_time.substring(0, 5)}`}
                  introduce={`距離 ${v.zoom} 公尺`}
                  like={false}
                  towheresrc={`#${v.attraction_id}`}
                  status={3}
                  imgrouter="attraction"
                />
              )
            })}
          </div>
        </div>*/}
      </div>
      <div className="footer-space-bg "></div>
    </>
  )
}
