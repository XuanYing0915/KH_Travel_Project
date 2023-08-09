import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { SlMagnifier } from 'react-icons/sl' //放大鏡icon
import { AiFillCar } from 'react-icons/ai' //車icon
import PropTypes from 'prop-types'
// mui
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Typography from '@mui/material/Typography' 
import Box from '@mui/material/Box'
import { ThemeProvider, createTheme } from '@mui/material/styles';
// icon
import FavoriteIcon from '@mui/icons-material/Favorite'
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck'
import SearchRoundedIcon from '@mui/icons-material/SearchRounded'
import { yellow } from '@mui/material/colors'
// 介紹分頁元件
import Offcanvas from '@/components/attraction/itinerary/offcanvas'
// 景點卡片元件
import IBox from '@/components/attraction/itinerary/itinerary-box'

const theme = createTheme({
  palette: {
    primary: {
      main: '#6b4f5', // 替換為你想要的顏色值
    },
  },
});
//TAB
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

export default function Itinerary({ }) {
  const [attractions, setAttractions] = useState([]) //原始資料
  const [offcanvasShow, setOffcanvasShow] = useState(false) // offcanvas顯示狀態
  const [offCanvasData, setoffCanvasData] = useState([]) // 給offcanvas的資料
  const [isLoading, setIsLoading] = useState(true) // 等待資料時顯示動畫

  const [value, setValue] = React.useState(0)
  const handleChange = (event, newValue) => {
    setValue(newValue)
  }
  const [hydrated, setHydrated] = useState(false);

  // 搜索列的函式
  const axiosData = async () => {
    try {
      // 取資料
      const response = await axios.get('http://localhost:3005/attraction')
      // 存入前端
      setAttractions(response.data)
      console.log('資料庫資料:', response.data)
    } catch (error) {
      console.error('錯誤:', error)
      setIsLoading(false)
    }
  }
  //點卡片後將資料根據id篩選後資料傳給offcanvas




  // 搜索功能
  const [input, setInput] = useState('') // 搜索列輸入的值狀態

  // 抓到搜索值
  const inputHandler = (e) => {
    setInput(e.target.value)
console.log('輸入:', e.target.value)
  }

  // 定義一個篩選資料的函式
  const[filteredData,setFilteredData]=useState([])
// 搜尋
  const search = () => {  
    // 搜尋景點名稱
    const filteredData = attractions.filter((attraction) => {
      // 輸入搜索
        // 景點名
        const result= attraction.attraction_name.includes(input) ||
        // 景點簡介
        attraction.title.includes(input)||
        // 景點地址
        attraction.address.includes(input)
        return result
    })
    // 把篩選後的結果加入狀態
    setFilteredData(filteredData)
    console.log('搜尋值:', input);
    console.log('搜尋資料:', attractions);
    console.log('搜尋結果:', filteredData)
  }

    useEffect(() => {
      axiosData()
       search()
    }, [input]) 

  // useEffect(() => {
  
  // }, [input])

  // 景點卡片點擊出現offcanvas
  const handleCardClick = (attraction_id) => {
    // setSelectedAId(attraction_id)
    // 取得selectedAId後 篩選出該景點資料傳遞給offcanvas
    const selectedAttraction = attractions.filter(
      (v) => v.attraction_id === attraction_id
    )
    console.log('篩選資料:' + selectedAttraction)
    // 將篩選資料傳給offcanvas
    setoffCanvasData(selectedAttraction)
    // console.log('傳給offcanvas的id:'+offCanvasData[0].attraction_id);
    console.log('傳給offcanvas的資料:' + offCanvasData[0])
    // 展開offcanvas
    setOffcanvasShow(true)
    console.log('Offcanvas展開狀態:' + offcanvasShow)
  }


  // 執行渲染
  useEffect(
    () => {
      // 用 Axios 撈資料
      axiosData()
      console.log('存入前端:', attractions)
    },
    [offCanvasData],
    [offcanvasShow]
  )
// 解決套件無法水合化問題
  useEffect(() => {
      setHydrated(true);
  }, []);
  if (!hydrated) {
      return null;
  }
  return (
    <>
      {/* 新版 */}
      
      <Box
        sx={{
          width: '25%',
          background: '#FFF7E3',
          height: '90vh',
          '& .MuiBox-root': {
            padding: '0',
            margin: '0',
            
          },
        }}
      >
        <Box sx={{ borderBottom: 1, borderColor: 'divider', color: 'yellow' }}>
          {/* TABS */}
          <ThemeProvider theme={theme}>
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
              color: 'warning',
              maxHeight: '60px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',

              '& .MuiTab-root': {
                '&:hover': {
                  backgroundColor: '#0d5654', // 設定 hover 時的背景顏色為黃色
                  color: '#ffff', // 設定 hover 時的文字顏色為黑色
                },
              },

              // 點擊後的樣式
              '& .Mui-selected': {
                backgroundColor: '#ffce56',
                color: '#6b4f5b',
              },
              //點擊後的線條
              '& .MuiTabs-indicator': {
                backgroundColor: '#ffce56', // 將指示器顏色設定為黃色
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
          <div className="i-card row align-items-start  justify-content-center ">
            {/*{顯示景點 */}
            {attractions.map((v, i) => {
              return (
                <React.Fragment key={v.attraction_id}>
                  <IBox
                    key={v.attraction_id}
                    id={v.attraction_id}
                    title={v.attraction_name}
                    address={v.address}
                    img={v.img_name}
                    onCardClick={handleCardClick}
                    // onClick={handleShow}
                  />
                  <span className="i-travel-time-box">
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
          </div>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <div className="row align-items-start  justify-content-center ">
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
            <div className="i-card row align-items-start  justify-content-center ">
              {/*{顯示景點 */}
              {filteredData.map((v, i) => {
                return (
                  <React.Fragment key={v.attraction_id}>
                    <IBox
                      key={v.attraction_id}
                      id={v.attraction_id}
                      title={v.attraction_name}
                      address={v.address}
                      img={v.img_name}
                      onCardClick={handleCardClick}
                      // onClick={handleShow}
                    />
                
                  </React.Fragment>
                )
              })}
            </div>
          </div>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
          Item Three
        </CustomTabPanel>
      </Box>
      {/* 新版結束 */}
      {/* ----------------------------- */}
      {/* 景點詳細頁 */}

      {offCanvasData && offCanvasData.length > 0 ? (
        <Offcanvas
          offcanvasShow={offcanvasShow}
          attraction_id={offCanvasData[0].attraction_id}
          attraction_name={offCanvasData[0].attraction_name}
          img={offCanvasData[0].img_name}
          open_time={offCanvasData[0].open_time}
          close_time={offCanvasData[0].close_time}
          off_day={offCanvasData[0].off_day}
          address={offCanvasData[0].address}
          title={offCanvasData[0].title}
        />
      ) : (
        <div>{/* //TODO 等待動畫 */}</div>
      )}

      {/* TODO 地圖 */}
      <div className="col-9"></div>
    </>
  )
}
