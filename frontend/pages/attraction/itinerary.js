import React from 'react'
import axios from 'axios'
import moment from 'moment'
import { useState, useEffect } from 'react'
import { SlMagnifier } from 'react-icons/sl' //放大鏡icon
import { AiFillCar } from 'react-icons/ai' //車icon
import PropTypes from 'prop-types'
// mui
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import { ThemeProvider, createTheme } from '@mui/material/styles'

// antd
import { Tabs as AntdTabs } from 'antd'
// 動態引入地圖
import dynamic from 'next/dynamic'
const Map = dynamic(() => import('@/components/attraction/map/map'), {
  ssr: false,
})
// icon
import FavoriteIcon from '@mui/icons-material/Favorite'
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck'
import SearchRoundedIcon from '@mui/icons-material/SearchRounded'
import { yellow } from '@mui/material/colors'
// 介紹分頁元件
import Offcanvas from '@/components/attraction/itinerary/offcanvas'
// 景點卡片元件
import IBox from '@/components/attraction/itinerary/itinerary-box'

// 日期元件
import DateModel from '@/components/attraction/itinerary/date-model'
import dayjs from 'dayjs'
// 動畫效果
import AOS from 'aos'
import 'aos/dist/aos.css'
import 'animate.css'

// 主題設定
const theme = createTheme({
  palette: {
    primary: {
      main: '#6b4f5',
    },
  },
  // 更改斷點
  breakpoints: {
    values: {
      xs: 0,
      sm: 576,
      md: 768,
      lg: 992,
      xl: 1200,
      xxl: 1400,
    },
  },
})

//TAB 設定
function CustomTabPanel(props) {
  const { children, value, index, ...other } = props
  const color = yellow[500]
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  )
}
CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  }
}
//TAB 設定結束

// 頁面開始
export default function Itinerary({}) {
  const [attractions, setAttractions] = useState([]) //原始資料
  const [offcanvasShow, setOffcanvasShow] = useState(false) // offcanvas顯示狀態
  const [offCanvasData, setoffCanvasData] = useState([]) // 給offcanvas的資料
  const [chickMapData, setChickMapData] = useState([]) // 給map的資料
  const [isLoading, setIsLoading] = useState(true) // 等待資料時顯示動畫
  const [favoriteData, setFavoriteData] = useState([]) //收藏資料
  const [value, setValue] = React.useState(0)
  // 收藏要打包的資料
  const [isFavorite, setFavorite] = useState({
    love: [], // 收藏狀態
    id: [],
    memberId: 900001,
    dataBaseTableName: 'attraction',
  })

  // tab切換
  const handleChange = (event, newValue) => {
    setValue(newValue)
  }
  // 解決套件無法水合化問題
  const [hydrated, setHydrated] = useState(false)

  // 取資料函式
  const axiosData = async () => {
    try {
      // 取資料
      const response = await axios.get('http://localhost:3005/attraction')
      // 存入前端
      setAttractions(response.data)
      // console.log('資料庫資料:', response.data)
    } catch (error) {
      console.error('錯誤:', error)
      setIsLoading(false)
    }
  }
  // 收藏資料打包函式
  const FavoriteData = async () => {
    try {
      await setFavorite({ love, id, memberId, dataBaseTableName })
      console.log('收藏狀態:', isFavorite.love)
    } catch (error) {
      console.error('錯誤:', error)
    }
  }

  // 訂定行程
  // 接收時間
  const [timeValue, setTimeValue] = useState(null)
  const handleTimeChange = (time) => {
    setTimeValue(time)
  }
  // 接收日期
  // 起始日
  const [startDate, setStartDate] = useState(dayjs())
  // 結束日
  const [endDate, setEndDate] = useState(dayjs().add(1, 'day'))
  // 遊玩天數
  const [playDays, setPlayDays] = useState(1)
  const handleDateChange = (start, end, playDays) => {
    setStartDate(start)
    setEndDate(end)
    setPlayDays(playDays)
    console.log('父元件接收:開始' + start, '結束' + end, '遊玩' + playDays)
  }

  // 發送日期+時間的按鈕函式
  const submitDT = () => {
    // 觸發父元件的新增行程函數並將日期和時間作為參數傳遞
    onsubmitDT(selectedStartDate, selectedEndDate, selectedTime)
    // 關閉 Modal
    handleClose()
  }
  // [[{景點1},{景點2},{景點3}],[{景點1},{景點2},{景點3}] ]
  //      ^^^第一天^^^                 ^^^第二天^^^
  // 行程表儲存資料
  const [itineraryData, setItineraryData] = useState([])

  // //點卡片後將資料根據id篩選後資料傳給offcanvas

  // // 抓取已收藏函式
  const axiosDataFavorite = async () => {
    try {
      const response = await axios.get(
        'http://localhost:3005/api/favorite/attractionFavorites'
      )
      setFavoriteData(response.data)
      // console.log('該會員收藏(資料庫):', response.data)
    } catch (error) {
      console.error('錯誤:', error)
      setIsLoading(false)
    }
  }

  // 收藏功能
  const toggleFav = (clickid) => {
    if (id === clickid) {
      setFavorite({ ...isFavorite, like: !isFavorite.like })
    }
  }

  //  切換收藏狀態
  const favorite = async () => {
    // 發送 POST
    try {
      // 丟狀態給後端判定
      const response = await axios.post(
        'http://localhost:3005/api/favorite/like',
        {
          love: isFavorite.love,
          id: isFavorite.id,
          memberId: isFavorite.memberId,
          dataBaseTableName: isFavorite.dataBaseTableName,
        }
      )
      console.log('收藏成功:' + response.data.love)
      setFavorite(response.data)
    } catch (error) {
      console.error('無法收藏:', error)
    }
  }

  // 搜索功能
  const [input, setInput] = useState('') // 搜索列輸入的值狀態

  // 抓到搜索值
  const inputHandler = (e) => {
    setInput(e.target.value)
    console.log('輸入:', e.target.value)
  }

  // 定義一個篩選資料的函式
  const [filteredData, setFilteredData] = useState([])
  // 搜尋
  const search = () => {
    // 搜尋景點名稱
    const filteredData = attractions.filter((attraction) => {
      // 輸入搜索
      // 景點名
      const result =
        attraction.attraction_name.includes(input) ||
        // 景點簡介
        attraction.title.includes(input) ||
        // 景點地址
        attraction.address.includes(input)
      return result
    })
    // 把篩選後的結果加入狀態
    setFilteredData(filteredData)
    // console.log('搜尋值:', input)
    // console.log('搜尋資料:', attractions)
    // console.log('搜尋結果:', filteredData)
  }

  // 如果新增收藏 就重新撈資料 並渲染到畫面

  useEffect(() => {
    axiosData()
    axiosDataFavorite()
    search()
  }, [input, isFavorite.love, offCanvasData, offcanvasShow])

  // 景點卡片點擊出現offcanvas
  const handleCardClick = (attraction_id) => {
    // setSelectedAId(attraction_id)
    // 取得selectedAId後 篩選出該景點資料傳遞給offcanvas
    const selectedAttraction = attractions.filter(
      (v) => v.attraction_id === attraction_id
    )
    // console.log('篩選資料:' + selectedAttraction)
    // 將篩選資料傳給offcanvas
    setoffCanvasData(selectedAttraction)
    // console.log('傳給offcanvas的id:'+offCanvasData[0].attraction_id);
    // console.log('傳給offcanvas的資料:' + offCanvasData[0])

    setChickMapData((prevData) => [...prevData, ...selectedAttraction])
    // 展開offcanvas
    setOffcanvasShow(true)
    // console.log('Offcanvas展開狀態:' + offcanvasShow)
  }

  const getChickMapDataLatLng = (lat, lng) => {
    const newPoint = chickMapData[-1].lat
    console.log('第二步取結束座標:', newPoint)
    // setLinePoint((prevData) => [...prevData, ...lineNewPoint])
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

  // 日期model展開
  const [showDateModel, setShowDateModel] = useState(false)
  // 展開
  const openDateModel = () => {
    setShowDateModel(true)
  }
  // 關閉
  const closeDateModel = () => {
    setShowDateModel(false)
  }

  // 加東西都要在此之前
  // 執行渲染
  useEffect(() => {
    // 用 Axios 撈資料
    axiosData()
    // console.log('存入前端:', attractions)
  }, [])
  // 解決套件無法水合化問題
  useEffect(() => {
    setHydrated(true)
  }, [])
  if (!hydrated) {
    return null
  }

  return (
    <>
      {/* 新版 */}
      <div className="row" style={{ margin: '0', padding: '0' }}>
        {/*  分頁+tab */}
        <div
          className="col-sm-12 col-md-4 col-lg-4 col-xl-4 col-xxl-3 rwd-i-tab"
          style={{ margin: '0', padding: '0' }}
        >
          <Box
            sx={{
              width: '100%',
              background: '#FFF7E3',
              height: '90vh',
              position: 'relative',
              zIndex: '3',
              '& .MuiBox-root': {
                padding: '0',
                margin: '0',

                [theme.breakpoints.down('sm')]: {
                  // 斷點為768px及以下
                  height: '40%', // 在768px及以下的情況下改變高度
                },
                [theme.breakpoints.down('sm')]: {
                  // 斷點為768px及以下
                  height: '50%', // 在768px及以下的情況下改變高度
                },
              },
            }}
          >
            <Box
              sx={{ borderBottom: 1, borderColor: 'divider', color: 'yellow' }}
            >
              {/* TABS */}
              <ThemeProvider theme={theme}>
                {/* 整體+背景+nav */}
                <Tabs
                  value={value}
                  onChange={handleChange}
                  // textColor="warning"
                  textColor="primary"
                  indicatorColor="#ffce56"
                  variant="fullWidth"
                  aria-label="basic tabs example"
                  sx={{
                    backgroundColor: '#0d5654',
                    // color: 'warning',
                    maxHeight: '60px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    [theme.breakpoints.down('md')]: {
                      // 斷點為768px及以下
                      height: '30px', // 在768px及以下的情況下改變高度
                      transform: 'translateY(40vh)',
                    },
                    [theme.breakpoints.down('sm')]: {
                      // 斷點為768px及以下
                      height: '30px', // 在768px及以下的情況下改變高度
                      transform: 'translateY(40vh)',
                    },
                    '& .MuiTab-root': {
                      '&:hover': {
                        backgroundColor: '#0d5654',
                        color: '#ffff',
                      },
                    },

                    // 點擊後的樣式
                    '& .Mui-selected': {
                      backgroundColor: '#ffce56',
                      color: '#6b4f5b',
                    },
                    //點擊後的線條
                    '& .MuiTabs-indicator': {
                      backgroundColor: 'red',
                    },
                  }}
                >
                  {/* 行程表 */}
                  <Tab
                    label="行程表"
                    icon={<PlaylistAddCheckIcon fontSize="large" />}
                    iconPosition="end"
                    sx={{
                      backgroundColor: '#95d0c7',
                      color: 'white',
                      fontSize: '20px',
                      fontWeight: 'bold',
                      padding: '10px',
                      maxHeight: '85vh',
                    }}
                    {...a11yProps(0)}
                    onClick={() => {
                      {
                        openDateModel()
                      }
                    }}
                  />
                  {/* 搜索 */}
                  <Tab
                    icon={<SearchRoundedIcon fontSize="large" />}
                    iconPosition="end"
                    label="搜索"
                    {...a11yProps(1)}
                    sx={{
                      backgroundColor: '#137976',
                      color: 'white',
                      fontSize: '20px',
                      fontWeight: 'bold',
                      padding: '10px',
                    }}
                  />
                  {/* 收藏 */}
                  <Tab
                    icon={<FavoriteIcon />}
                    iconPosition="end"
                    label="收藏"
                    {...a11yProps(2)}
                    sx={{
                      backgroundColor: '#95d0c7',
                      color: 'white',
                      fontSize: '20px',
                      fontWeight: 'bold',
                      padding: '10px',
                    }}
                  />
                </Tabs>
              </ThemeProvider>
            </Box>
            {/* TABS結束 */}
            {/* 分頁切換 */}
            {/* 行程表 */}
            <CustomTabPanel
              value={value}
              index={0}
              sx={{
                margin: '0',
                padding: '0',
                marginTop: '50px',
              }}
            >
              <div className="i-card row align-items-start  justify-content-center">
                {/*{顯示景點 */}

                <AntdTabs
                  defaultActiveKey="1"
                  type="card"
                  size="large"
                  style={{ height: '90vh', width: '100%', marginLeft: '30px' }}
                  items={new Array(playDays).fill(null).map((_, i) => {
                    // 設定天數
                    const id = dayjs(startDate).add(i, 'day').format('MM/DD')
                    return {
                      label: `${id}`,
                      key: id,
                      children: (
                        <>
                          {chickMapData.map((v, i) => {
                            return (
                              <React.Fragment key={v.attraction_id}>
                                <IBox
                                  key={v.attraction_id}
                                  id={v.attraction_id}
                                  name={v.attraction_name}
                                  address={v.address}
                                  img={v.img_name}
                                  open_time={v.open_time.substring(0, 5)}
                                  close_time={v.closed_time.substring(0, 5)}
                                  off_day={v.off_day}
                                  title={v.title}
                                  visit_time={v.visiting_time}
                                  // favorite={favoriteData}
                                  onCardClick={handleCardClick}
                                  i={i}
                                  // id={offCanvasData[0].attraction_id}
                                  love={v.fk_member_id}
                                  memberId={900001}
                                  dataBaseTableName={'attraction'}
                                  // onClick={handleShow}
                                />
                                <span className="i-travel-time-box">
                                  距離
                                  <span className="travel-time">
                                    {/* TODO 計算時程 */}1
                                  </span>
                                  公里
                                  <div className="time-box"></div>
                                  <AiFillCar style={{ fontSize: '30px' }} />
                                  <div className="time-box"></div>
                                  車程
                                  <span className="travel-time">
                                    {/* TODO 計算時程 */}
                                    10
                                  </span>
                                  分鐘
                                </span>
                              </React.Fragment>
                            )
                          })}
                        </>
                      ),
                    }
                  })}
                />
                {/* {attractions.map((v, i) => { */}
                {/* return ( */}
                {/* <React.Fragment key={v.attraction_id}> */}
                {/* <IBox */}
                {/* key={v.attraction_id} */}
                {/* id={v.attraction_id} */}
                {/* name={v.attraction_name} */}
                {/* address={v.address} */}
                {/* img={v.img_name} */}
                {/* open_time={v.open_time.substring(0, 5)} */}
                {/* close_time={v.closed_time.substring(0, 5)} */}
                {/* off_day={v.off_day} */}
                {/* title={v.title} */}
                {/* visit_time={v.visiting_time} */}
                {/* // favorite={favoriteData} */}
                {/* onCardClick={handleCardClick} */}
                {/* i={i} */}
                {/* // id={offCanvasData[0].attraction_id} */}
                {/* love={v.fk_member_id} */}
                {/* memberId={900001} */}
                {/* dataBaseTableName={'attraction'} */}
                {/* // onClick={handleShow} */}
                {/* /> */}
                {/* <span className="i-travel-time-box"> */}
                {/* 距離 */}
                {/* <span className="travel-time"> */}
                {/* TODO 計算時程1 */}
                {/* </span> */}
                {/* 公里 */}
                {/* <div className="time-box"></div> */}
                {/* <AiFillCar style={{ fontSize: '30px' }} /> */}
                {/* <div className="time-box"></div> */}
                {/* 車程 */}
                {/* <span className="travel-time"> */}
                {/* TODO 計算時程 */}
                {/* 10 */}
                {/* </span> */}
                {/* 分鐘 */}
                {/* </span> */}
                {/* </React.Fragment> */}
                {/* ) */}
                {/* })} */}
              </div>
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
              <div className="row align-items-start  justify-content-center">
                <div className="col-12">
                  {/*搜索 */}
                  <div className="i-search">
                    <input
                      className="input"
                      type="text"
                      onChange={(e) => inputHandler(e)}
                      placeholder="搜索關鍵字、地區、景點"
                    />
                    <button onClick={(e) => inputHandler(e)}>
                      <SlMagnifier />
                    </button>
                  </div>
                  {/* 搜索結束 */}
                  <div className="i-card row align-items-start  justify-content-center">
                    {/*{顯示景點 */}
                    {filteredData.map((v, i) => {
                      return (
                        <React.Fragment key={v.attraction_id}>
                          <IBox
                            key={v.attraction_id}
                            id={v.attraction_id}
                            name={v.attraction_name}
                            address={v.address}
                            img={v.img_name}
                            open_time={v.open_time.substring(0, 5)}
                            close_time={v.closed_time.substring(0, 5)}
                            off_day={v.off_day}
                            title={v.title}
                            visit_time={v.visiting_time}
                            // favorite={favoriteData}
                            onCardClick={handleCardClick}
                            // id={offCanvasData[0].attraction_id}
                            // love={offCanvasData[0].fk_member_id}
                            memberId={900001}
                            dataBaseTableName={'attraction'}
                            // onClick={handleShow}
                          />
                        </React.Fragment>
                      )
                    })}
                  </div>
                </div>
              </div>
            </CustomTabPanel>
            <CustomTabPanel value={value} index={2}>
              <div className="i-card row align-items-start  justify-content-center ">
                {/*{顯示收藏 */}
                {favoriteData.map((v, i) => {
                  return (
                    <React.Fragment key={v.attraction_id}>
                      <IBox
                        key={v.attraction_id}
                        id={v.attraction_id}
                        name={v.attraction_name}
                        address={v.address}
                        img={v.img_name}
                        open_time={v.open_time.substring(0, 5)}
                        close_time={v.closed_time.substring(0, 5)}
                        off_day={v.off_day}
                        title={v.title}
                        visit_time={v.visiting_time}
                        favorite={favoriteData}
                        onCardClick={handleCardClick}
                        love={900001}
                        memberId={900001}
                        dataBaseTableName={'attraction'}
                        // onClick={handleShow}
                      />
                    </React.Fragment>
                  )
                })}
              </div>
            </CustomTabPanel>
          </Box>
        </div>
        {/* 新版結束 */}
        {/* ----------------------------- */}
        {/* 景點詳細頁 */}

        {offCanvasData && offCanvasData.length > 0 ? (
          <Offcanvas
            offcanvasShow={offcanvasShow}
            // 傳關閉的涵式
            setOffcanvasShow={setOffcanvasShow}
            attraction_id={offCanvasData[0].attraction_id}
            attraction_name={offCanvasData[0].attraction_name}
            img={offCanvasData[0].img_name}
            open_time={offCanvasData[0].open_time.substring(0, 5)}
            close_time={offCanvasData[0].closed_time.substring(0, 5)}
            off_day={offCanvasData[0].off_day}
            address={offCanvasData[0].address}
            title={offCanvasData[0].title}
            visit_time={offCanvasData[0].visiting_time}
            favorite={favoriteData}
            id={offCanvasData[0].attraction_id}
            love={offCanvasData[0].fk_member_id}
            memberId={900001}
            dataBaseTableName={'attraction'}
          />
        ) : (
          <div>{/* //TODO 等待動畫 */}</div>
        )}

        {/* TODO 地圖 */}
        <div
          className="col-9  col-sm-12 "
          style={{ margin: '0', padding: '0' }}
        >
          <Map chickMapData={chickMapData} offcanvasShow={offcanvasShow} />
        </div>
      </div>

      {/* model元件引入 */}
      <DateModel
        show={showDateModel}
        handleClose={closeDateModel}
        onDateChange={handleDateChange}
        onTimeChange={handleTimeChange}
      />
    </>
  )
}
