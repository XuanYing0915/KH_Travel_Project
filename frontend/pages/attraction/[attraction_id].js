import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'
// 引入標題元件
import Title from '@/components/title'

// 周邊json
import more from '@/data/attraction/more_attraction.json'

// 圖片json
import img from '@/data/attraction/img.json'

// 輪播圖元件
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import SilderAI from '@/components/attraction/slider'

// 卡片元件
import Card2 from '@/components/attraction/card-for-zhong/common-card2'

// 分頁元件
import Page from '@/components/attraction/search/page'
// 懸浮元件
import Float from '@/components/attraction/float-btn'
import { logDOM } from '@testing-library/react';


// 渲染畫面
export default function Attraction() {
  // 景點資訊存入狀態
  const [attraction, setAttraction] = useState({
    attraction_id: '',
    attraction_name: '',
    title: '',
    fk_area_id: '',
    area_name: '',
    address: '',
    off_day: '',
    open_time: '',
    closed_time: '',
    phone: '',
    lat: '',
    len: '',
    zoom: '',
    description: '',
    traffic: '',
    tags: '',
    images: '',
  })

  // 把資料整理成陣列
  // 將 description 欄位根據段落拆分+補上句號
  const descriptionArrow = attraction.description
    .split('。')
    .filter((sentence) => sentence.trim() !== '')
    .map((sentence) => `${sentence}。`)
  // 將 tags 欄位根據逗號拆分
  const tagArrow = attraction.tags.split(',')
  // 將 images 欄位根據逗號拆分
  const imageArrow = attraction.images.split(',')
  // 將 traffic 欄位根據<br>拆分
  const trafficArrow = attraction.traffic.split('\r\n')
  // 資料整理完畢

  // 設定動態路由
  const router = useRouter()

  // 當路由準備好時執行
  useEffect(() => {
    if (router.isReady) {
      const { attraction_id } = router.query
      if (attraction_id) getAttractionData(attraction_id)
    }
  // 當頁面準備好.以及路徑查詢改變時執行
  }, [router.isReady, router.query])

  // 資料庫抓取資料
  const getAttractionData = async (attraction_id) => {
    // 連接景點網址
    const urlAttraction = `http://localhost:3005/attraction/${attraction_id}`
    // 連接
    try {
      const res = await axios.get(urlAttraction)
      // console.log(res.data)
      // 設定景點資料  拆開陣列裡面的物件
      setAttraction(res.data[0])
      // 確認資料
      // console.log('圖片陣列', imageArrow)
      // console.log('介紹陣列', descriptionArrow)
      // console.log('標籤陣列', tagArrow)
      // console.log('交通陣列', trafficArrow)
    } catch (error) {
      console.error(error)
    }

    // 連接周邊景點網址
    const urlADistance = `http://localhost:3005/api/Adistance/AtoA/${attraction_id}`
    // /${attraction_id}
    try {
      const res = await axios.get(urlADistance)
      // console.log(res.data)
      // 設定景點資料  拆開陣列裡面的物件
      setAtoA(res.data.nearbyAttractions)
      setAtoH(res.data.nearbyHotels)
      // 確認資料
      // console.log('鄰近景點:', res.data.nearbyAttractions)
      // console.log('鄰近飯店ID', res.data.nearbyHotels[0].hotel_id)
      // console.log('標籤陣列', tagArrow)
      // console.log('交通陣列', trafficArrow)
    } catch (error) {
      console.error(error)
    }
    
  }
  const [AtoA, setAtoA] = useState([]) // 設定鄰近景點狀態
  const [AtoF, setAtoF] = useState([]) // 設定鄰近美食狀態
  const [AtoH, setAtoH] = useState() // 設定鄰近住宿狀態

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

  // 分頁相關狀態
  // 第一組-周邊景點
  let currentPageDataA = []
  const [currentPageA, setCurrentPageA] = useState(1)
  const attractionsPerPage = 8 // 每頁顯示的資料筆數
  // 計算總頁
  const totalPagesA = Math.ceil(AtoA.length / attractionsPerPage)
  // 處理分頁切換
  const handlePageChangeA = (page) => {
    setCurrentPageA(page)
  }
  // 當前分頁的資料
  if (AtoA.length > 0) {
    // console.log('AtoA', AtoA);
  const startIA = (currentPageA - 1) * attractionsPerPage
  const endIA = startIA + attractionsPerPage
  // TODO 往後修改為周邊景點的資料
  currentPageDataA = AtoA.slice(startIA, endIA)
  // console.log('currentPageDataA', currentPageDataA);
  // console.log('currentPageDataA[0]', currentPageDataA[0].distance);
  // console.log('currentPageDataA[0]', currentPageDataA[0].attraction_id);
  // console.log('currentPageDataA[0]', currentPageDataA[0].attraction_name);
  // console.log('currentPageDataA[0]', currentPageDataA[0].img_name);
  // console.log('currentPageDataA[0]', currentPageDataA[0].open_time);
  // console.log('currentPageDataA[0]', currentPageDataA[0].closed_time);
  // console.log('currentPageDataA[0]', currentPageDataA[0]);
  }

  // 第二組-周邊美食
  const [currentPageF, setCurrentPageF] = useState(1)
  const foodPerPage = 4 // 每頁顯示的資料筆數
  // 計算總頁
  const totalPagesF = Math.ceil(more.attractions.length / foodPerPage)
  // 處理分頁切換
  const handlePageChangeF = (page) => {
    setCurrentPageF(page)
  }
  // 當前分頁的資料
  const startIF = (currentPageF - 1) * foodPerPage
  const endIF = startIF + foodPerPage
  // TODO 往後修改為周邊景點的資料
  const currentPageDataF = more.attractions.slice(startIF, endIF)

  // 第三組-周邊住宿
  let currentPageDataH = []
  const [currentPageH, setCurrentPageH] = useState(1)
  const hotelPerPage = 4 // 每頁顯示的資料筆數
  // 計算總頁
  const totalPagesH =AtoH ? Math.ceil(AtoH.length / hotelPerPage):0
  // 處理分頁切換
  const handlePageChangeH = (page) => {
    setCurrentPageH(page)
  }
  // 當前分頁的資料
  if (AtoA.length > 0) {
  const startIH = (currentPageH - 1) * hotelPerPage
  const endIH = startIH + hotelPerPage
  // TODO 往後修改為周邊景點的資料
  currentPageDataH = AtoH.slice(startIH, endIH)  }

  return (
    <>
      {/* 動態背景試玩 */}
      <div className="cloud-right">
        <img src="/images/attraction/cloud-01.svg" />
      </div>
      <div className="cloud-left">
        <img src="/images/attraction/cloud-01.svg" />
      </div>
      {/* 動態背景結束 */}
      <div className="container m-100">
        {/* 上層 包含 景點名稱+基本資訊| 封面圖*/}
        <div className="row">
          <div className="col-5">
            <div className="row">
              {/* 景點名稱 */}
              <div className="attractionName">
                <div className="name d-flex align-items-center">
                  {/* 帶入景點名稱 */}
                  {attraction.attraction_name}
                </div>
              </div>
            </div>
            {/* 基本資訊 */}
            {/* //TODO */}
            {/* map帶入資料 */}

            <div className="m-5 text_24_b" key={attraction.attraction_id}>
              <div>地址：{attraction.address}</div>
              <div>
                開放時間：{attraction.open_time.substring(0, 5)} －{' '}
                {attraction.closed_time.substring(0, 5)}
              </div>
              <div>公休日：{attraction.off_day}</div>
              <div>電話： {attraction.phone}</div>
            </div>
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
        <SilderAI images={imageArrow} onImageChange={handleImageChange} />
      </div>
      {/* 景點介紹 */}
      <div className="container">
        <div>
          {descriptionArrow.map((description, i) => {
            const imageIndex = i % imageArrow.length // 計算 imageArrow 的索引

            return (
             <div className="row d-flex" key={i}>
                 <div className="row d-flex" key={i}>
                  {/* 判斷圖文排列 */}
                  {i % 2 === 0 ? (
                    <>
                      {/* 左文右圖 */}
                      <div className="col-6 a-text-out-box" key={i}>
                        <div
                          className="a-text-box a-text-box-light "
                          dangerouslySetInnerHTML={{ __html: description }}
                          key={i}
                        >
                          {/* {descriptionArrow[i]} */}
                        </div>
                      </div>
                      <div className="col-6" key={i + 'img'}>
                        <img
                          src={`/images/attraction/${imageArrow[imageIndex]}`}
                          className="a-img-box tY-20"
                          alt={img}
                        />
                      </div>
                    </>
                  ) : (
                    <>
                      {/* 右圖左文 */}
                      <div className="col-6" key={i + 'img'}>
                        <img
                          src={`/images/attraction/${imageArrow[imageIndex]}`}
                          className="a-img-box  tY--20"
                          alt={img}
                        />
                      </div>
                      <div
                        className="col-6 a-text-box a-text-box-dark ty-100"
                        dangerouslySetInnerHTML={{ __html: description }}
                        key={i} 
                      >
                        {/* {descriptionArrow[i]} */}
                      </div>
                    </>
                  )}
                </div> 
              </div> 
            )
          })}
        </div>
      </div>
      {/* 景點介紹結束 */}
      <div className="container m-100">
        <div className="row">
          <div className="col-12">
            {/* 交通  */}
            <Title title="交通" style="title_box_dark" />
            <div className="a-align-box a-text-box-dark">
              <div className="row">
                <div className="col-6 d-flex flex-column">
                  {/* 呈現交通資訊段落 */}{' '}
                  <div className="mx-5">
                    {trafficArrow.map((v, i) => (
                      <div key={i} dangerouslySetInnerHTML={{ __html: v }} />
                    ))}
                  </div>
                </div>
                {/* 地圖 */}
                <div className="col-6">
                  <div className="map-container">
                    <iframe
                      src={`https://maps.google.com?output=embed&q=${attraction.address}`}
                      frameBorder="1"
                      width="600"
                      height="500"
                      style={{
                        border: '10px solid #fff',
                        outline: 'dashed 10px #ffce56',
                        borderRadius: '10px',
                        padding: '10px',
                      }}
                    ></iframe>
                  </div>
                </div>
                {/* 地圖結束 */}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row justify-content-center">
        <div className="col-10 row justify-content-center">
          <Title title="周邊景點" style="title_box_dark" />
          {/* TODO 帶入附近景點小卡 */}

          {currentPageDataA.map((v, i) => {
            
            return (
              <div className="d-flex col-3" key={v.attraction_id}>
                <Card2
                  id={v.attraction_id}
                  img_src={v.img_name}
                  name={v.attraction_name}
                  time={`${v.open_time.substring(
                    0,
                    5
                  )}-${v.closed_time.substring(0, 5)}`}
                  introduce={`距離 ${v.distance.toFixed(1)} 公里`}
                  like={false}
                  towheresrc={v.attraction_id}
                  status={3}
                  imgrouter="attraction"
                />
              </div>
            )
          })}
          <Page
            currentPage={currentPageA}
            totalPages={totalPagesA}
            handlePageChange={handlePageChangeA}
          />
        </div>
      </div>
      {/* 周邊美食 */}
      {/* <div className="row justify-content-center">
        <div className="col-10 row justify-content-center">
          <Title title="周邊美食" style="title_box_dark" /> */}
          {/* TODO 帶入美食小卡 */}

          {/* {currentPageDataF.map((v, i) => {
            return (
              <>
                <div className="d-flex col-3" key={i}>
                  <Card2
                    id={v.attraction_id}
                    img_src={v.img_src}
                    name={v.attraction_name}
                    time={`${v.open_time.substring(
                      0,
                      5
                    )}-${v.closed_time.substring(0, 5)}`}
                    introduce={`距離 ${v.zoom} 公里`}
                    like={false}
                    towheresrc={`${v.attraction_id}`}
                    status={3}
                    imgrouter="attraction"
                  />
                </div>
              </>
            )
          })} */}
          {/* <Page
            currentPage={currentPageF}
            totalPages={totalPagesF}
            handlePageChange={handlePageChangeF}
          />
        </div>
      </div> */}
      {/* 周邊住宿 */}
      <div className="row justify-content-center">
        <div className="col-10 row justify-content-center">
          <Title title="周邊住宿" style="title_box_dark" />
          {/* TODO 帶入住宿小卡 */}

          {currentPageDataH.map((v, i) => {
            return (
              <>
                <div className="d-flex col-3" key={i}>
                  <Card2
                    id={v.hotel_id}
                    img_src={v.hotel_img}
                    name={v.hotel_name}
                    time=''
                    introduce={`距離 ${v.distance.toFixed(1)} 公里`}
                    like={false}
                    towheresrc={`${v.hotel_id}`}
                    status={3}
                    imgrouter="hotel"
                  />
                </div>
              </>
            )
          })}
          <Page
            currentPage={currentPageH}
            totalPages={totalPagesH}
            handlePageChange={handlePageChangeH}
          />
        </div>
      </div>
      {/* <Float
        love={false}
        path={'attraction'}
        id={attraction.attraction_id}
        memberId={'900001'}
        dataBaseTableName={'attraction'}
      /> */}
      <div className="footer-space"></div>
    </>
  )
}
