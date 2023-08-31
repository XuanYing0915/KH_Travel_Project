import React, { useState, useEffect } from 'react'
// 引入元件
import Title from '@/components/title'

import Card2 from '@/components/common-card2/common-card2'
// import Search from '@/components/search'
import SvgMap from '@/components/attraction/KH-map-SVG'
// 搜尋/篩選
import AllSearch from '@/components/attraction/search/a-search'
// 資料
import axios from 'axios'
// 輪播
import BgSlider from '@/components/attraction/bg-slider'
import AOS from 'aos'
import 'aos/dist/aos.css'
import 'animate.css'

import { useAuthJWT } from '@/hooks/use-auth-jwt'
// 渲染畫面
export default function MapSearch() {
  const [attractions, setAttractions] = useState([]) // 全部景點資訊
  const [isLoading, setIsLoading] = useState(true) // 等待資料時顯示動畫
  const [areaName, setAreaName] = useState('推薦') // 接收map點擊的地區名稱
  const [areaId, setAreaId] = useState(null) // 接收map點擊的地區id
  const [isInitialCardSet, setIsInitialCardSet] = useState(false) // 是否已經設定過初始隨機卡片

  const { authJWT } = useAuthJWT()
  const memberId = authJWT.userData.member_id
  //  取得會員資料
  // const [member, setMember] = useState('')
  // useEffect(() => {
  //   const member = JSON.parse(localStorage.getItem('member')) || ''
  //   setMember(member)
  // }, [])
  const member = 900001
  // };
  // 撈全部資料的函式 fetch
  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3005/attraction')
      // 存入前端
      // setAttractions(response.data)
      console.log('資料庫資料:', response.data)
      // console.log('標籤陣列', tagArrow)

      // 如果是初始化，就隨機取3筆資料
      if (!isInitialCardSet) {
        console.log('2.判斷是初始隨機')
        getRandomCards(response.data, 3)
        setIsInitialCardSet(true) // 設定為已經初始化

        // setIsLoading(false) //關動畫
      } else {
        if (areaId) {
          console.log('3.判斷是選擇地區:', areaId, areaName)
          // 只取前三筆
          setCard(
            response.data.filter((v) => v.area_name === areaName).slice(0, 3)
          )
        } else {
          console.log('2.5判斷是初始隨機')
          getRandomCards(data, 3)
        }

        // setIsLoading(false)
      }
      // 取response.data中會員收藏狀態
      response.data.forEach((v) => {
        // 如果會員有值就判斷是否有收藏
        if (memberId) {
          // 如果會員有收藏就回傳true
          v.fk_member_id =
            v.fk_member_id && v.fk_member_id.includes(memberId) ? true : false
        } else {
          // 沒有就回傳false
          v.fk_member_id = false
        }
      })
      setAttractions(response.data)
      console.log('會員狀態:', response.data[0].fk_member_id)

      setTimeout(() => {
        setIsLoading(false)
      }, 500)
    } catch (error) {
      console.error('錯誤:', error)
      setTimeout(() => {
        setIsLoading(false)
      }, 500)
    }
  }

  // 定義map顯示的卡片
  const [card, setCard] = useState([])

  // 卡片的樣式
  // 用索引決定樣式
  const cardStyle = (i) => {
    const styles = ['left-box', 'center-box', 'right-box']
    return styles[i % styles.length]
  }
  // 隨機選取n筆資料
  const getRandomCards = (data, n) => {
    console.log('進入隨機函式')
    const allCards = [...data] // 複製一份原始的資料
    // 隨機排序
    allCards.sort(() => Math.random() - 0.5)
    // 取前n筆資料
    console.log('洗牌完')
    console.log('allCards:', allCards)
    // 取前3筆

    const randomCards = allCards.slice(0, n)
    console.log('隨機3筆:', randomCards)
    setCard(randomCards)
  }

  // 點擊map處發函式 拿到id name
  const AreaClick = (areaId, areaName) => {
    console.log(areaId, areaName)
  }

  //取得資料並每次都重新渲染

  useEffect(() => {
    if (typeof window !== 'undefined') {
      AOS.init()
    }
    fetchData()
  }, [areaName])

  // 加載動畫
  // 設定延時0.5秒關閉動畫

  if (isLoading) {
    return (
      <div className="a-loading">
        <img src="/images/logo.png" />
      </div>
    )
  }

  // setTimeout(() => {
  //   setIsLoading(false)
  // }, 500)

  console.log('取得完整資料:', card)

  return (
    <>
      {/* 背景圖 */}

      {/* <div className="img-dark-bg"> */}
      <BgSlider />
      {/* <div>經典與新奇並存的不可錯過之處</div> */}
      {/* </div> */}

      {/* <div className="container"> */}
      <div className="row">
        <div
          className="row col-xl-5 col-lg-6 col-sm-12 half-bg relative"
          data-aos="fade-right"
          data-aos-duration="1500"
        >
          <div
            className="a-title-box row"
            data-aos="fade-right"
            data-aos-duration="3000"
          >
            <div className="a-title-C">踏上旅行之路</div>
            <div className="a-title-E">Embark on a Journey</div>
          </div>
          {/* 傳遞點擊的地區給map */}
          <SvgMap
            AreaClick={AreaClick}
            setAreaId={setAreaId}
            setAreaName={setAreaName}
          />
        </div>
        {/* 地圖搜索卡片 */}
        <div className="col-xl-7 col-lg-6 col-sm-12 half-bg">
          <div className="attraction-display-box a-text-box-dark m-5 animate__animated animate__lightSpeedInRight">
            {/* map傳回點擊地區的名稱 */}
            <Title title={areaName} style="title_box_light" />
            {/* 3張搜索卡片 */}
            <div className="display-card row ">
              {/* 等待動畫 */}
              <div className="loading"></div>
              {card.map((v, i) => (
                <div
                  className={`col-xl-4 col-sm-12 ${cardStyle(
                    i
                  )} animate__animated animate__fadeIn`}
                  key={v.attraction_id}
                >
                  {/* className="animate__animated animate__fadeInUp" */}
                  <Card2
                    id={v.attraction_id}
                    img_src={v.img_name}
                    name={v.attraction_name}
                    like={v.fk_member_id}
                    towheresrc={v.attraction_id}
                    imgrouter="attraction"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* 淺色背景 */}
        <div className="half-bg"></div>
      </div>
      {/* 淺色背景 */}
      <div className="ty-300">
        {/* 搜索列 */}
        <AllSearch data={attractions} />
      </div>
      {/* 懸浮元件 */}
      {/* <Float love={false} path={'attraction'} /> */}

      <div className="footer-space-bg "></div>
    </>
  )
}
