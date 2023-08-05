import React, { useState, useEffect } from 'react'
// 引入元件
import Title from '@/components/title'

import Card2 from '@/components/common-card2/common-card2'
import Search from '@/components/search'
import SvgMap from '@/components/attraction/KH-map-SVG'
// 搜尋/篩選
import AllSearch from '@/components/attraction/search/a-search'
// 資料
import axios from 'axios'

// import data from '@/data/attraction/attraction.json'
// import more from '@/data/attraction/more_attraction.json'

// 渲染畫面
export default function MapSearch() {
  const [attractions, setAttractions] = useState([]) // 全部景點資訊
  const [isLoading, setIsLoading] = useState(true) // 等待資料時顯示動畫
  const [areaName, setAreaName] = useState('推薦') // 接收map點擊的地區名稱
  const [areaId, setAreaId] = useState(null) // 接收map點擊的地區id
  const [isInitialCardSet, setIsInitialCardSet] = useState(false) // 是否已經設定過初始隨機卡片
  // 撈全部資料的函式 axios
  // const fetchData = async () => {
  //   try {
  //     const response = await axios.get('http://localhost:3005/attraction');
  //     setAttractions(response.data);
  //     console.log('資料庫資料', response.data);
  //   } catch (error) {
  //     console.error('錯誤:', error);
  //   }
  // };
  // 撈全部資料的函式 fetch
  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3005/attraction')
      // 存入前端
      setAttractions(response.data)
      console.log('資料庫資料:', response.data)
      // 如果是初始化，就隨機取3筆資料
      if (!isInitialCardSet) {
        console.log('2.判斷是初始隨機')
        getRandomCards(response.data, 3)
        setIsInitialCardSet(true) // 設定為已經初始化
        setIsLoading(false) //關動畫
      } else {
        if (areaId) {
          console.log('3.判斷是選擇地區:', areaId, areaName)
          setCard(data.filter((v) => v.area_name === areaName))
        } else {
          console.log('2.5判斷是初始隨機')
          getRandomCards(data, 3)
        }
        setIsLoading(false)
      }
    } catch (error) {
      console.error('錯誤:', error)
      setIsLoading(false)
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
    fetchData()
  }, [areaName])

  // 加載動畫
  if (isLoading) {
    return (
      <div className="a-loading">
        <img src="/images/attraction/loading.gif" />
      </div>
    )
  }

  console.log('取得完整資料:', card)
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
          <SvgMap
            AreaClick={AreaClick}
            setAreaId={setAreaId}
            setAreaName={setAreaName}
          />
        </div>
        {/* 地圖搜索卡片 */}
        <div className="col-7 half-bg">
          <div className="attraction-display-box a-text-box-dark m-5">
            {/* map傳回點擊地區的名稱 */}
            <Title title={areaName} style="title_box_light" />
            {/* 3張搜索卡片 */}
            <div className="display-card row ">
              {/* 等待動畫 */}
              <div className="loading"></div>
              {card.map((v, i) => (
                <div className={`col-4 ${cardStyle(i)}`} key={v.attraction_id}>
                  <Card2
                    id={v.attraction_id}
                    img_src={v.img_name}
                    name={v.attraction_name}
                    like={false}
                    towheresrc={v.attraction_id}
                    imgrouter="attraction"
                  />
                </div>
              ))}
              {/* <div className="col-4 left-box">
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
              </div> */}
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
