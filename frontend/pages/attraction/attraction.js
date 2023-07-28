import React, { useState } from 'react'
// 引入標題元件
import Title from '@/components/title'
// 景點json
import attraction from '@/data/attraction/attraction.json'
// 周邊json
import more from '@/data/attraction/more_attraction.json'

// 圖片json
import img from '@/data/attraction/img.json'
import Head from 'next/head'

// 輪播圖元件
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import SilderAI from '@/components/attraction/slider'

// 卡片元件
import Card2 from '@/components/common-card2/common-card2'

// 渲染畫面
export default function Attraction() {
  // selectedImageIndex 紀錄當前輪播圖片位置
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  // selectedImage 顯示展示圖
  const [selectedImage, setSelectedImage] = useState(img[selectedImageIndex])

  // 點擊輪播圖觸發的函數
  // 更新 selectedImageIndex 和 selectedImage 狀態。
  const handleImageChange = (imagePath, index) => {
    setSelectedImageIndex(index)
    setSelectedImage(imagePath)
  }
  return (
    <>
   
      <Head>
        <link
          rel="stylesheet"
          type="text/css"
          charset="UTF-8"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
        />
        <link
          rel="stylesheet"
          type="text/css"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
        />
      </Head>
      <div className="container">
        {/* 上層 包含 景點名稱+基本資訊| 封面圖*/}
        <div className="row">
          <div className="col-5">
            <div className="row">
              {/* 景點名稱 */}
              <div className="attractionName">
                <div className="name d-flex align-items-center">
                  {/* 帶入景點名稱 */}
                  {attraction.attractions[0].attraction_name}
                </div>
              </div>
            </div>
            {/* 基本資訊 */}
            {/* map帶入資料 */}
            {attraction.attractions.map((v, i) => {
              return (
                <div className="m-5 text_24_b" key={v.attraction_id}>
                  <div>地址：{v.address}</div>
                  <div>
                    開放時間：{v.open_time} － {v.closed_time}
                  </div>
                  <div>公休日：{v.off_day}</div>
                  <div>電話： {v.phone}</div>
                </div>
              )
            })}
          </div>
          {/* 基本資訊結束 */}
          <div className="col-7">
            {/* 封面圖 */}
            <img
              className="title_cover"
              //TODO 帶入圖片資料
              src={`/images/attraction/${selectedImage}`}
              alt={selectedImage}
            />
          </div>
          {/* 封面圖結束 */}
        </div>
      </div>
      {/* 景點名稱+基本資訊| 封面圖結束 */}
      <div className="row"></div>
      <div className="col demo"> </div>
      {/* 預覽圖  */}
      <div className="silderA-bg">
        {/* 傳遞 images 和 handleImageChange 函數給子元件 */}
        <SilderAI images={img} onImageChange={handleImageChange} />
      </div>

      {/* 景點介紹 */}
      <div className="container">
        {attraction.attractions.map((v, i) => {
          const description = v.description
          {
            /* 段落切割 */
          }
          const paragraphs = description.split('\n\n')
          return (
            <div className="row d-flex" key={i}>
              {img.map((v, i) => (
                <div className="row d-flex" key={i}>
                  {/* 判斷圖文排列 */}
                  {i % 2 === 0 ? (
                    <>
                      {/* 左文右圖 */}
                      <div className="col-6 ">
                        <div className="a-text-box a-text-box-light ">
                          {paragraphs[i]}
                        </div>
                      </div>
                      <div className="col-6">
                        <img
                          src={`/images/attraction/${v}`}
                          className="a-img-box tY-20"
                          alt={v}
                        />
                      </div>
                    </>
                  ) : (
                    <>
                      {/* 右圖左文 */}
                      <div className="col-6">
                        <img
                          src={`/images/attraction/${v}`}
                          className="a-img-box  tY--20  
"
                          alt={v}
                        />
                      </div>
                      <div className="col-6 a-text-box a-text-box-dark ty-100">
                        {paragraphs[i]}
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          )
        })}
      </div>
      {/* 景點介紹結束 */}

      <div className="container m-100">
        <div className="row">
          <div className="col-12">
            {/* 交通  */}
            <Title title="交通" style="title_box_dark" />
            <div className="a-align-box a-text-box-dark">
              <div className="row">
                {attraction.attractions.map((v, i) => {
                  {
                    /*  段落切割 */
                  }
                  const paragraphsTraffic = v.traffic.split('\r\n')
                  {
                    /* TODO改資料庫   取消div  */
                  }
                  return (
                    <div className="col-6 d-flex flex-column" key="i">
                      {/* 呈現交通資訊段落 */}
                      <div className="mx-5">
                        {paragraphsTraffic.map((paragraph, i) => (
                          <div key={i}>{paragraph}</div>
                        ))}
                      </div>
                    </div>
                  )
                })}
                {/* //TODO地圖*/}
                <div className="col-6">
                  <div className="map-container">地圖放置處</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* 周邊美食 */}
      <div className="row justify-content-center">
        <div className="col-10 row justify-content-center">
          <Title title="周邊美食" style="title_box_dark" />
          {/* TODO 帶入美食小卡 */}

          {more.attractions.map((v, i) => {
            return (
              <>
                <div className="d-flex col-3">
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
                </div>
              </>
            )
          })}
        </div>
      </div>

      {/* 周邊住宿 */}
      <div className="row justify-content-center">
        <div className="col-10 row justify-content-center">
          <Title title="周邊住宿" style="title_box_dark" />
          {/* TODO 帶入住宿小卡 */}

          {more.attractions.map((v, i) => {
            return (
              <>
                <div className="d-flex col-3">
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
                </div>
              </>
            )
          })}
        </div>
      </div>
      <div className="footer-space"></div>
    </>
  )
}
