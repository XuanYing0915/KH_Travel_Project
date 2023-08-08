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
import { createTheme } from '@mui/material/styles'
// icon
import FavoriteIcon from '@mui/icons-material/Favorite'
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck'
import SearchRoundedIcon from '@mui/icons-material/SearchRounded'
import { yellow } from '@mui/material/colors'

// 介紹分頁元件
import Offcanvas from '@/components/attraction/itinerary/offcanvas'
// 景點卡片元件
import IBox from '@/components/attraction/itinerary/itinerary-box'

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

export default function Itinerary({ search, setInput }) {
  const [attractions, setAttractions] = useState([]) //原始資料
  const [offcanvasShow, setOffcanvasShow] = useState(false) // offcanvas顯示
  const [offCanvasData, setoffCanvasData] = useState([]) // 給offcanvas的資料
  const [isLoading, setIsLoading] = useState(true) // 等待資料時顯示動畫
  

  const [value, setValue] = React.useState(0)
  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

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

  // 搜索列
  const inputHandler = (e) => {
    setInput(e.target.value)
  }

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

  // 關閉offcanvas
  const handleCloseOffcanvas = () => {
    setOffcanvasShow(false)
  }

  // 執行渲染
  useEffect(() => {
    // 用 Axios 撈資料
    axiosData()
    console.log('存入前端:', attractions)
  }, [offCanvasData])
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
          <Tabs
            value={value}
            onChange={handleChange}
            textColor="warning"
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
        </Box>
        {/* TABS結束 */}
        <CustomTabPanel
          value={value}
          index={0}
          sx={{ backgroundColor: '#FFF7E3', color: 'white', maxHeight: '85vh' }}
        ></CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <div className="row align-items-start  justify-content-center ">
            {/*搜索 */}
            <div className="i-search">
              <input
                className="input"
                onChange={inputHandler}
                type="text"
                value={'搜索'}
              />
              <button onClick={search}>
                <SlMagnifier />
              </button>
            </div>
            {/* 搜索結束 */}
            <div className="i-card row align-items-start  justify-content-center ">
              {/*{顯示景點 */}
              {attractions.map((v, i) => {
                return (
                  <>
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
                  </>
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
            onClose={handleCloseOffcanvas}
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
          <div>
          {/* //TODO 等待動畫 */}
          </div>
        )}

       
        {/* TODO 地圖 */}
        <div className="col-9"></div>
    
    </>
  )
}
