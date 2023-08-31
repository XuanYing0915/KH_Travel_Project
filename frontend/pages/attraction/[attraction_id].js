import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'
import Accordion from 'react-bootstrap/Accordion'
// 引入標題元件
import Title from '@/components/title'

// 輪播圖元件
import SwiperAI from '@/components/attraction/Swiper'
import SilderAI from '@/components/attraction/slider'

// 卡片元件
import Card2 from '@/components/common-card2/common-card2'

// 分頁元件
import Page from '@/components/attraction/search/page'
// 懸浮元件
import Float from '@/components/attraction/float-btn'
import { logDOM } from '@testing-library/react'

import AOS from 'aos'
import 'aos/dist/aos.css'
import 'animate.css'

import { useAuthJWT } from '@/hooks/use-auth-jwt'

// 延遲載入圖片
import { LazyLoadImage } from 'react-lazy-load-image-component'
import 'react-lazy-load-image-component/src/effects/blur.css'
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
  const [isLoading, setIsLoading] = useState(true)

  const { authJWT } = useAuthJWT()
  const memberId = authJWT.userData.member_id

  // 當路由準備好時執行
  useEffect(() => {
    setIsLoading(true)
    if (router.isReady) {
      const { attraction_id } = router.query
      if (attraction_id) getAttractionData(attraction_id)
    }
    // 當頁面準備好.以及路徑查詢改變時執行
    setTimeout(() => {
      setIsLoading(false)
    }, 500)
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
      console.log('介紹陣列', descriptionArrow)
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
  const [AtoH, setAtoH] = useState() // 設定鄰近住宿狀態

  // selectedImageIndex 紀錄當前輪播圖片位置
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  // selectedImage 顯示展示圖
  const [selectedImage, setSelectedImage] = useState(
    imageArrow[selectedImageIndex]
  )

  // 點擊輪播圖觸發的函數
  // 更新 selectedImageIndex 和 selectedImage 狀態。
  const handleImageChange = (imagePath, index) => {
    setSelectedImageIndex(index)
    setSelectedImage(imagePath)
  }

  useEffect(() => {
    setSelectedImage(imageArrow[selectedImageIndex])
  }, [selectedImageIndex])
  // 分頁相關狀態
  // 第一組-周邊景點
  let currentPageDataA = []
  const [currentPageA, setCurrentPageA] = useState(1)
  // const attractionsPerPage = 8 // 每頁顯示的資料筆數
  const [pageSizeA, setPageSizeA] = useState(8)
  // 計算總頁
  const totalPagesA = Math.ceil(AtoA.length / pageSizeA)
  // 處理分頁切換
  const handlePageChangeA = (page) => {
    setCurrentPageA(page)
  }
  // 當前分頁的資料
  if (AtoA.length > 0) {
    // console.log('AtoA', AtoA);
    const startIA = (currentPageA - 1) * pageSizeA
    const endIA = startIA + pageSizeA
    currentPageDataA = AtoA.slice(startIA, endIA)
  }

  useEffect(() => {
    const handleResize = () => {
      const windowWidth = window.innerWidth
      if (windowWidth < 600) {
        setPageSizeA(1)
      } else if (windowWidth < 960) {
        setPageSizeA(2)
      } else if (windowWidth < 1200) {
        setPageSizeA(6)
      } else {
        setPageSizeA(8)
      }
    } // 初始設置
    handleResize()

    // 監聽視窗大小變化
    window.addEventListener('resize', handleResize)

    // 在清理 effect 時取消事件監聽
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  // 第二組-周邊住宿
  let currentPageDataH = []
  const [currentPageH, setCurrentPageH] = useState(1)
  const [pageSizeH, setPageSizeH] = useState(4)

  // 計算總頁
  const totalPagesH = AtoH ? Math.ceil(AtoH.length / pageSizeH) : 0
  // 處理分頁切換
  const handlePageChangeH = (page) => {
    setCurrentPageH(page)
  }
  useEffect(() => {
    const handleResize = () => {
      const windowWidth = window.innerWidth
      if (windowWidth < 600) {
        setPageSizeH(1)
      } else if (windowWidth < 960) {
        setPageSizeH(2)
      } else if (windowWidth < 1300) {
        setPageSizeH(3)
      } else {
        setPageSizeH(4)
      }
    } // 初始設置
    handleResize()

    // 監聽視窗大小變化
    window.addEventListener('resize', handleResize)

    // 在清理 effect 時取消事件監聽
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  // 當前分頁的資料
  if (AtoA.length > 0) {
    const startIH = (currentPageH - 1) * pageSizeH
    const endIH = startIH + pageSizeH
    currentPageDataH = AtoH.slice(startIH, endIH)
  }
  // 解決動畫問題
  const [hasScrolledToPosition, setHasScrolledToPosition] = useState(false)

  // 設定滾動到指定位置後才觸發動畫
  const handleScroll = () => {
    const targetElement = document.getElementById('AOSid')
    if (targetElement) {
      const targetPosition = targetElement.getBoundingClientRect().top
      if (targetPosition <= window.innerHeight && !hasScrolledToPosition) {
        setHasScrolledToPosition(true)
        AOS.refresh() // 重新初始化 AOS，以應用動畫
      }
    }
  }

  // 初始話aos
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
          setHasScrolledToPosition(true)
        } else {
          setHasScrolledToPosition(false)
        }
      })
    }
    AOS.init()
    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  if (isLoading) {
    return (
      <div className="a-loading">
        <img src="/images/logo.png" />
      </div>
    )
  }

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
          <div className="col-5 d-flex ">
            {/* 基本資訊 */}
            <div className="mb-5 text_24_b a-information-box align-self-end">
              <div>地址：{attraction.address}</div>
              <div>
                開放時間：{attraction.open_time.substring(0, 5)} －
                {attraction.closed_time.substring(0, 5)}
              </div>
              <div>公休日：{attraction.off_day}</div>
              <div>電話： {attraction.phone}</div>
            </div>
          </div>
          {/* 基本資訊結束 */}
          <div className="col-7">
            <div className="row attractionNameBox">
              {/* 景點名稱 */}
              <div className="attractionName">
                <div className="name d-flex align-items-center">
                  {/* 帶入景點名稱 */}
                  {attraction.attraction_name}
                </div>
              </div>
            </div>
            {/* 封面圖 */}
            <LazyLoadImage
              className="title_cover"
              src={`/images/attraction/${imageArrow[selectedImageIndex]}`}
              alt={`${imageArrow[selectedImageIndex]}`}
              effect="blur"
            />
          </div>
          {/* 封面圖結束 */}
        </div>
      </div>
      {/* 景點名稱+基本資訊| 封面圖結束 */}
      {/* 預覽圖  */}
      {/* <div className="silderA-bg"> */}
      {/* 傳遞 images 和 handleImageChange 函數給子元件 */}
      {/* <SilderAI images={imageArrow} onImageChange={handleImageChange} /> */}
      {/* </div> */}
      <SwiperAI images={imageArrow} onImageChange={handleImageChange} />
      {/* 景點介紹 */}
      <div className="a-pc row">
        {descriptionArrow.map((description, i) => {
          const imageIndex = i % imageArrow.length // 計算 imageArrow 的索引

          return (
            <div className="row d-flex  col-11 mt-5" key={i}>
              {/* 判斷圖文排列 */}
              {i % 2 === 0 ? (
                <>
                  <div className="col-1"></div>
                  {/* 左文右圖 */}
                  {/* 左文 */}
                  <div
                    className="col-5"
                    key={i}
                    data-aos={hasScrolledToPosition ? 'fade-right' : ''}
                  >
                    <div
                      className="a-text-box a-text-box-light"
                      dangerouslySetInnerHTML={{ __html: description }}
                      key={i}
                    >
                      {/* {descriptionArrow[i]} */}
                    </div>
                  </div>
                  <div className="col-1"></div>
                  {/* 右圖 */}
                  <div className="col-5 ty-r-img" key={i + 'img'}>
                    <LazyLoadImage
                      src={`/images/attraction/${imageArrow[imageIndex]}`}
                      className="a-img-box"
                      data-aos="fade-left"
                      alt={`${imageArrow[selectedImageIndex]}`}
                      effect="blur"
                    />
                  </div>
                </>
              ) : (
                <>
                  <div className="col-1"></div>
                  {/* 右圖左文 */}
                  {/* 左圖 */}
                  <div
                    className="col-5 d-flex justify-content-center ty-l-img"
                    //animate__animated animate__fadeInRight
                    data-aos="fade-right"
                    key={i + 'img'}
                  >
                    <LazyLoadImage
                      src={`/images/attraction/${imageArrow[imageIndex]}`}
                      className="a-img-box"
                      alt={`${imageArrow[selectedImageIndex]}`}
                      effect="blur"
                    />
                  </div>
                  <div className="col-1"></div>
                  {/* 右文 */}
                  <div className="d-flex flex-column col-5 ">
                    <div className="a-text-space"></div>
                    <div
                      className="a-text-box a-text-box-dark ty-r-text"
                      data-aos="fade-left"
                      data-aos-anchor-placement="center-bottom"
                      dangerouslySetInnerHTML={{ __html: description }}
                      key={i}
                    >
                      {/* {descriptionArrow[i]} */}
                    </div>
                  </div>
                </>
              )}
            </div>
          )
        })}

        {/* 景點介紹結束 */}

        <div className="row d-flex justify-content-center mt-5 traffic-box">
          <div
            className="col-10 d-flex justify-content-center mt-5"
            data-aos="zoom-in-left"
            data-aos-anchor-placement="center"
            data-aos-offset="500"
            data-aos-duration="500"
          >
            {/* 交通  */}
            <Title title="交通" style="title_box_dark" />
            <div className="a-align-box a-text-box-dark">
              <div className="row">
                <div className="col-6 d-flex flex-column">
                  {/* 呈現交通資訊段落 */}
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
                      width="100%"
                      height="100%"
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

      {/* rwd切換 */}
      <div className="container">
        <Accordion defaultActiveKey={['0']} className="a-accordion-rwd">
          <Accordion.Item eventKey="0">
            <Accordion.Header>
              <div className="a-accordion-header">景點基本資訊</div>
            </Accordion.Header>
            <Accordion.Body>
              <div className="a-accordion-body">
                <div>地址：{attraction.address}</div>
                <div>
                  開放時間：{attraction.open_time.substring(0, 5)} －
                  {attraction.closed_time.substring(0, 5)}
                </div>
                <div>公休日：{attraction.off_day}</div>
                <div>電話： {attraction.phone}</div>
              </div>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="1">
            <Accordion.Header>
              <div className="a-accordion-header-info">景點介紹</div>
            </Accordion.Header>
            <Accordion.Body>
              {descriptionArrow.map((description, i) => {
                const imageIndex = i % imageArrow.length
                return (
                  <>
                    <div key={i} className="description-rwd">
                      {descriptionArrow[i]}
                    </div>
                    <div key={i + 'img'}>
                      <LazyLoadImage
                        src={`/images/attraction/${imageArrow[imageIndex]}`}
                        className="a-img-box"
                        alt={`${imageArrow[selectedImageIndex]}`}
                        effect="blur"
                      />
                    </div>
                  </>
                )
              })}
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="2">
            <Accordion.Header>
              <div className="a-accordion-header-info">交通資訊</div>
            </Accordion.Header>
            <Accordion.Body>
              {trafficArrow.map((v, i) => (
                <div
                  key={i}
                  className="traffic-rwd"
                  dangerouslySetInnerHTML={{ __html: v }}
                />
              ))}
              <div className="map-container-rwd">
                <iframe
                  src={`https://maps.google.com?output=embed&q=${attraction.address}`}
                  frameBorder="1"
                  width="100%"
                  height="100%"
                  style={{
                    border: '10px solid #fff',
                    outline: 'dashed 10px #ffce56',
                    borderRadius: '10px',
                    // padding: '10px',
                  }}
                ></iframe>
              </div>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </div>
      {/* rwd切換結束 */}
      {/* <div className="row justify-content-center"> */}
      <div className="col-10 row justify-content-center m-auto">
        <Title title="周邊景點" style="title_box_dark" />
        {/* TODO 帶入附近景點小卡 */}

        {currentPageDataA.map((v, i) => {
          return (
            <div
              className="d-flex col-xl-3 col-lg-4 col-md-6 col-sm-6 col-12 a-nearby-card mt-4"
              data-aos="flip-left"
              data-aos-easing="ease-out-cubic"
              data-aos-duration="2000"
              data-aos-anchor-placement="center-bottom"
              key={v.attraction_id}
            >
              <Card2
                id={v.attraction_id}
                img_src={v.img_name}
                name={v.attraction_name}
                time={`${v.open_time.substring(0, 5)}-${v.closed_time.substring(
                  0,
                  5
                )}`}
                introduce={`距離 ${v.distance.toFixed(1)} 公里`}
                like={false}
                towheresrc={v.attraction_id}
                status={3}
                imgrouter="attraction"
              />
            </div>
          )
        })}
      </div>
      {/* </div> */}
      <Page
        currentPage={currentPageA}
        totalPages={totalPagesA}
        handlePageChange={handlePageChangeA}
      />
      {/* 周邊住宿 */}
      {/* <div className="row justify-content-center"> */}
      <div className="col-10 row justify-content-center m-auto">
        <Title title="周邊住宿" style="title_box_dark" />
        {/* TODO 帶入住宿小卡 */}

        {currentPageDataH.map((v, i) => {
          return (
            <>
              <div
                className="d-flex col-xl-3 col-lg-4 col-md-6  col-sm-6 col-12"
                key={i}
                data-aos="flip-left"
                data-aos-easing="ease-out-cubic"
                data-aos-duration="2000"
                data-aos-anchor-placement="center-bottom"
              >
                <Card2
                  id={v.hotel_id}
                  img_src={v.hotel_img}
                  name={v.hotel_name}
                  time=""
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
      </div>
      {/* </div> */}
      <Page
        currentPage={currentPageH}
        totalPages={totalPagesH}
        handlePageChange={handlePageChangeH}
      />
      <Float
        love={attraction.fk_member_id}
        path={'attraction'}
        id={attraction.attraction_id}
        memberId={memberId}
        dataBaseTableName={'attraction'}
      />
      <div className="footer-space"></div>
    </>
  )
}
