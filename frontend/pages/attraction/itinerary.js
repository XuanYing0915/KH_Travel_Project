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
// import QueueAnim from 'rc-queue-anim'
// 動態引入地圖
import dynamic from 'next/dynamic'
const Map = dynamic(() => import('@/components/attraction/itinerary/map/map'), {
  ssr: false,
})
// icon
import FavoriteIcon from '@mui/icons-material/Favorite'
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck'
import SearchRoundedIcon from '@mui/icons-material/SearchRounded'
import { yellow } from '@mui/material/colors'
// 介紹分頁元件
import Offcanvas from '@/components/attraction/itinerary/tabs/offcanvas'
// 景點卡片元件
import IBox from '@/components/attraction/itinerary/tabs/itinerary-box'

// 日期元件
import DateModel from '@/components/attraction/itinerary/tabs/date-model'
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
  const [value, setValue] = useState(1) // tab定位初始未置在搜索
  // 收藏要打包的資料
  const [isFavorite, setFavorite] = useState({
    love: '', // 收藏狀態  布林值
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
      setTimeout(() => {
        setIsLoading(false)
      }, 1000)
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
  const [timeValue, setTimeValue] = useState(dayjs().format('HH:mm'))
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
  // 設定過就不會跳出日期model
  const [isDateModel, setIsDateModel] = useState(false)
  //
  const handleDateChange = (start, end, playDays, startTime) => {
    setStartDate(start)
    setEndDate(end)
    setPlayDays(playDays)
    setIsDateModel(true)
    setTimeValue(dayjs(startTime).format('HH:mm'))
    // console.log(
    //   '父元件接收:開始' + start,
    //   '結束' + end,
    //   '遊玩' + playDays + '起程時間' + startTime
    // )
  }

  // [[{景點1},{景點2},{景點3}],[{景點1},{景點2},{景點3}] ]
  //      ^^^第一天^^^                 ^^^第二天^^^
  // 行程表儲存資料
  // const [itineraryData, setItineraryData] = useState([])

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

  let loveResult = ''
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
      console.log('收藏成功 love:' + response.data.love)
      console.log('收藏成功 data:' + response.data)
      setFavorite({
        love: response.data.love,
        id: response.data.id,
        memberId: response.data.memberId,
      })
      console.log('加入完畢:' + response.data.love)
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
  }, [input, offCanvasData, offcanvasShow])

  useEffect(() => {
    //增加收藏或取消收藏時重新撈取收藏資料
    axiosDataFavorite()
    console.log('收藏狀態isFavorite:', isFavorite)
  }, [isFavorite.love])

  // 景點卡片點擊出現offcanvas
  const handleCardClick = (attraction_id) => {
    //  給id篩選出景點資料傳遞給offcanvas
    const selectedAttraction = attractions.filter(
      (v) => v.attraction_id === attraction_id
    )
    // console.log('篩選資料:' + selectedAttraction)
    // 將篩選資料傳給offcanvas
    setoffCanvasData(selectedAttraction)
    // console.log('傳給offcanvas的id:'+offCanvasData[0].attraction_id);
    // console.log('傳給offcanvas的資料:' + offCanvasData[0])

    // setChickMapData((prevData) => [...prevData, ...selectedAttraction])
    // 展開offcanvas
    setOffcanvasShow(true)
  }

  // TODO嘗試轉部分成useEffect

  useEffect(() => {
    // 加入地圖
    if (chickMapData.length === 0) {
      console.log('沒有行程座標')
    } else {
      // 進入取得行程座標函式
      console.log('進入行程座標函式')
      if (chickMapData.length > 1) {
        console.log('chickMapData>1:', chickMapData)
        getChickMapDataLatLng(chickMapData)
      }
    }
  }, [chickMapData])

  // 加入行程
  const handleAddItinerary = (attraction_id) => {
    // 用id篩選出景點資料
    const selectedAttraction = attractions.filter(
      (v) => v.attraction_id === attraction_id
    )
    // 加入地圖
    setChickMapData((prevData) => [...prevData, ...selectedAttraction])
    console.log('加入行程的資料:', chickMapData)
    // 關閉offcanvas
    setOffcanvasShow(false)
  }

  const [distance, setDistance] = useState([]) //兩地距離
  // 取得行程座標函式
  const getChickMapDataLatLng = (chickMapData) => {
    // 取得最後一組物件
    const lastData = chickMapData[chickMapData.length - 1]
    // 取得最後一組物件的經緯度
    const lastLat = lastData.lat
    const lastLng = lastData.lng
    // console.log('最後的Lat:', lastLat)
    // console.log('最後的lng:', lastLng)

    // 取倒數第二組物件
    const lastTwoData = chickMapData[chickMapData.length - 2]
    const lastTwoLat = lastTwoData.lat
    const lastTwoLng = lastTwoData.lng

    // console.log('前一個Lat:', lastTwoLat)
    // console.log('前一個lng:', lastTwoLng)
    // TODO 計算行程座標
    if (lastTwoLat && lastTwoLng && lastLat && lastLng) {
      let newdistance = mathDistance(
        lastTwoLat,
        lastTwoLng,
        lastLat,
        lastLng,
        'K'
      )

      // 計算時程
      let travelTime = mathTime(newdistance)

      // 將newdistance加入distance陣列中
      setDistance((prevData) => [...prevData, newdistance])
      console.log('兩地之間距離:', newdistance)
      setTravelTime((prevData) => [...prevData, travelTime])
      console.log('兩地之間時程:', travelTime)
    }
  }

  //計算行程座標函式
  const mathDistance = (lat1, lon1, lat2, lon2, unit) => {
    if (lat1 === lat2 && lon1 === lon2) {
      return 0
    } else {
      const radlat1 = (Math.PI * lat1) / 180
      const radlat2 = (Math.PI * lat2) / 180
      const theta = lon1 - lon2
      const radtheta = (Math.PI * theta) / 180
      let dist =
        Math.sin(radlat1) * Math.sin(radlat2) +
        Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta)
      if (dist > 1) {
        dist = 1
      }
      dist = Math.acos(dist)
      dist = (dist * 180) / Math.PI
      dist = dist * 60 * 1.1515
      if (unit === 'K') {
        dist = dist * 1.609344
      }
      if (unit === 'N') {
        dist = dist * 0.8684
      }
      return dist
    }
  }

  // 時程狀態
  const [travelTime, setTravelTime] = useState([])
  // TODO 計算時程
  const mathTime = (distance) => {
    // 速度
    const speed = 50 / 60 // 時數換算成分鐘

    let waitTime = 1 // 預設等待時間

    if (distance < 1) {
      waitTime = 1
    } else if (distance < 2) {
      waitTime = 3
    } else if (distance < 3) {
      waitTime = 5
    } else if (distance < 6) {
      waitTime = 8
    } else if (distance < 8) {
      waitTime = 12
    } else {
      waitTime = 20
    }

    const travelTime = Math.floor(distance / speed + waitTime)
    return travelTime
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
    setIsDateModel(true)
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

  if (isLoading) {
    return (
      <div className="a-loading">
        <img src="/images/logo.png" />
      </div>
    )
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
                    {...a11yProps(1)}
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
                    {...a11yProps(0)}
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
              <div className="i-card">
                {/* 有選擇日期時間再顯示Tabs */}
                {isDateModel ? (
                  <AntdTabs
                    defaultActiveKey="1"
                    type="card"
                    size="large"
                    className="i-antd-tabs"
                    items={new Array(playDays).fill(null).map((_, i) => {
                      const id = dayjs(startDate).add(i, 'day').format('MM/DD')
                      return {
                        label: `${id}`,
                        key: id,
                        children: (
                          <>
                            {i === 0 && (
                              <>
                                <div className="start-time">
                                  啟程時間 : {timeValue}
                                </div>
                                {!chickMapData.length > 0 ? (
                                  <div className="i-arrow2">
                                    <div className="i-arrow-box">
                                      <img
                                        src="/images/attraction/箭頭.png"
                                        className="i-arrow-info"
                                      />
                                    </div>
                                    第二步: 可以新增景點啦!
                                    <br />
                                    搜尋你想去的景點吧!
                                  </div>
                                ) : (
                                  chickMapData.map((v, index) => (
                                    <React.Fragment key={v.attraction_id}>
                                      <IBox
                                        key={v.attraction_id}
                                        id={v.attraction_id}
                                        name={v.attraction_name}
                                        address={v.address}
                                        img={v.img_name}
                                        open_time={v.open_time.substring(0, 5)}
                                        close_time={v.closed_time.substring(
                                          0,
                                          5
                                        )}
                                        off_day={v.off_day}
                                        title={v.title}
                                        visit_time={v.visiting_time}
                                        onCardClick={handleCardClick}
                                        i={index} // Use the index from map function
                                        love={v.fk_member_id}
                                        memberId={900001}
                                        dataBaseTableName={'attraction'}
                                        className="itinerary-box-list"
                                      />
                                      {distance.length > 0 &&
                                        distance[index] > 0 && (
                                          <span className="i-travel-time-box">
                                            距離
                                            <span className="travel-time">
                                              {Number(distance[index]).toFixed(
                                                1
                                              )}
                                            </span>
                                            公里
                                            <div className="time-box"></div>
                                            <AiFillCar
                                              style={{ fontSize: '30px' }}
                                            />
                                            <div className="time-box"></div>
                                            車程
                                            <span className="travel-time">
                                              {Number(travelTime[index])}
                                            </span>
                                            分鐘
                                          </span>
                                        )}
                                    </React.Fragment>
                                  ))
                                )}
                              </>
                            )}
                          </>
                        ),
                      }
                    })}
                  />
                ) : (
                  <div className="i-arrow">
                    第一步: <br />
                    決定出發日和起程時間!
                  </div>
                )}
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
                  <div className="i-card ">
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
                            className="itinerary-box-search"
                          />
                        </React.Fragment>
                      )
                    })}
                  </div>
                </div>
              </div>
            </CustomTabPanel>
            <CustomTabPanel value={value} index={2}>
              <div className="i-card ">
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
                        className="itinerary-box-search"
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
          offCanvasData.map((v, i) => {
            return (
              <Offcanvas
                offcanvasShow={offcanvasShow}
                // 傳關閉的涵式
                setOffcanvasShow={setOffcanvasShow}
                attraction_id={v.attraction_id}
                attraction_name={v.attraction_name}
                img={v.img_name}
                open_time={v.open_time.substring(0, 5)}
                close_time={v.closed_time.substring(0, 5)}
                off_day={v.off_day}
                address={v.address}
                title={v.title}
                visit_time={v.visiting_time}
                favorite={favoriteData}
                id={v.attraction_id}
                love={v.fk_member_id}
                memberId={900001}
                dataBaseTableName={'attraction'}
                handleAddItinerary={handleAddItinerary}
              />
            )
          })
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
        show={showDateModel && !isDateModel}
        handleClose={closeDateModel}
        onDateChange={handleDateChange}
        onTimeChange={handleTimeChange}
      />
    </>
  )
}
