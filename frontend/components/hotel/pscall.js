// pscall.js
import React, { useState, useEffect } from 'react'
import Search from '@/components/hotel/search'
import Page from '@/components/hotel/page'
import Card2 from '@/components/hotel/card2'
import axios from 'axios'
import AOS from 'aos'
import 'aos/dist/aos.css'
import 'animate.css'

export default function Pscall() {
  const [data, setData] = useState(null) //抓Json資料 data
  const [error, setError] = useState(null) //新增錯誤資料 error
  const [filteredCards, setFilteredCards] = useState([]) //用於存儲過濾後的資料
  const [currentPage, setCurrentPage] = useState(1) //分頁
  const [searchTerm, setSearchTerm] = useState('') //輸入關鍵字搜尋
  const [searchPressed, setSearchPressed] = useState(true) //點擊按鍵搜尋
  const [categoryTerm, setCategoryTerm] = useState('') //新增類別標籤搜尋--1
  const [categorySearchPressed, setCategorySearchPressed] = useState(false) //類別標籤搜尋--1
  const [mrtTerm, setMrtTerm] = useState('') //新增捷運標籤搜尋--2
  const [mrtSearchPressed, setMrtSearchPressed] = useState(false) //捷運標籤搜尋--2
  const [areaTerm, setAreaTerm] = useState('') //新增地區標籤搜尋--3
  const [areaSearchPressed, setAreaSearchPressed] = useState(false) //地區標籤搜尋--3
  const [mrtSelect, setMrtSelect] = useState([]) //Select捷運選項搜尋--4
  const [mrtSelectedOption, setMrtSelectedOption] = useState(null) //Select捷運選項搜尋--4
  const [areaSelect, setAreaSelect] = useState([]) //Select行政區選項搜尋--5
  const [areaSelectedOption, setAreaSelectedOption] = useState(null) //Select行政區選項搜尋--5

  // 處理類別標籤搜尋的點擊 handleCategoryClick，設置 categorySearchPressed 狀態變量
  const handleCategoryClick = (category) => {
    setCategoryTerm(category)
    setCategorySearchPressed(true)
  }
  // 處理捷運站搜尋的點擊 handleMrtClick，設置 mrtSearchPressed 狀態變量
  const handleMrtClick = (mrt) => {
    setMrtTerm(mrt)
    setMrtSearchPressed(true)
  }
  // 處理行政區搜尋的點擊 handleAreaClick，設置 areaSearchPressed 狀態變量
  const handleAreaClick = (area) => {
    setAreaTerm(area)
    setAreaSearchPressed(true)
  }

  //Select選擇捷運搜尋
  const mrtSelectChange = (mrtoption) => {
    setMrtSelect(mrtoption)
    setMrtSelectedOption(true)
  }

  //Select選擇行政區搜尋
  const areaSelectChange = (areaoption) => {
    setAreaSelect(areaoption)
    setAreaSelectedOption(true)
  }

  //點擊搜尋按鈕進行搜尋
  const handleSearchClick = () => {
    setSearchPressed(true) // 設置按鍵狀態為 true，觸發搜尋
  }

  //按下Enter進行搜尋
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearchClick() // Call the handleSearchClick function when Enter key is pressed
    }
  }

  // 抓nodejs資料
  useEffect(() => {
    axios
      .get('http://localhost:3005/hotelkh')
      .then((response) => {
        setData(response.data) //把取得的資料存入 data 狀態
        setSearchPressed(true)
      })
      .catch((error) => setError(error.toString()))
  }, [])

  // 搜尋邏輯，只在 searchPressed 狀態為 true 時執行
  useEffect(() => {
    if (searchPressed) {
      if (data) {
        const filtered = data.filter(
          (card2) =>
            searchTerm.trim() === '' ||
            card2.hotel_name.toLowerCase().includes(searchTerm.toLowerCase())
        )
        setFilteredCards(filtered)
      }
      setSearchPressed(false) // Reset the searchPressed state to false after searching
      setCurrentPage(1)
    }
  }, [searchTerm, searchPressed])

  //類別搜尋
  useEffect(() => {
    if (categorySearchPressed) {
      const filtered = data.filter(
        (card2) =>
          categoryTerm.trim() === '' ||
          card2.category_name.toLowerCase().includes(categoryTerm.toLowerCase())
      )
      setFilteredCards(filtered)
      setSearchPressed(false)
      setCurrentPage(1)
    }
  }, [categoryTerm, categorySearchPressed])

  //捷運站搜尋
  useEffect(() => {
    if (mrtSearchPressed) {
      const filtered = data.filter(
        (card2) =>
          mrtTerm.trim() === '' ||
          card2.mrt_name.toLowerCase().includes(mrtTerm.toLowerCase())
      )
      setFilteredCards(filtered)
      setSearchPressed(false)
      setCurrentPage(1)
    }
  }, [mrtTerm, mrtSearchPressed])

  //行政區搜尋
  useEffect(() => {
    if (areaSearchPressed) {
      const filtered = data.filter(
        (card2) =>
          areaTerm.trim() === '' ||
          card2.area_name.toLowerCase().includes(areaTerm.toLowerCase())
      )
      setFilteredCards(filtered)
      setSearchPressed(false)
      setCurrentPage(1)
    }
  }, [areaTerm, areaSearchPressed])

  //SELECT-捷運站搜尋
  useEffect(() => {
    if (mrtSelectedOption) {
      const filtered = data.filter(
        (card2) =>
          mrtSelect.value.trim() === '' ||
          card2.mrt_name.toLowerCase().includes(mrtSelect.value.toLowerCase())
      )
      setFilteredCards(filtered)
      setSearchPressed(false)
      setCurrentPage(1)
    }
  }, [mrtSelect, mrtSelectedOption])

  //SELECT-行政區搜尋
  useEffect(() => {
    if (areaSelectedOption) {
      const filtered = data.filter(
        (card2) =>
          areaSelect.value.trim() === '' ||
          card2.area_name.toLowerCase().includes(areaSelect.value.toLowerCase())
      )
      setFilteredCards(filtered)
      setSearchPressed(false)
      setCurrentPage(1)
    }
  }, [areaSelect, areaSelectedOption])

  //分頁
  const ITEMS_PER_PAGE = 12 // 每頁顯示的數量
  const totalItems = filteredCards.length
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE)

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage)
  }

  // 根據當前的頁碼和每頁顯示的數量，從篩選後的資料中篩選出要顯示的資料
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const endIndex = startIndex + ITEMS_PER_PAGE
  const currentItems = filteredCards.slice(startIndex, endIndex)

  // 動畫-----
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

  // 初始化aos
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

  return (
    <>
      {error ? (
        <div>Error: {error}</div>
      ) : data ? (
        <>
          {/* 顯示 SearchComponent，將 setSearchTerm 傳遞給它 */}
          <Search
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            handleSearchClick={handleSearchClick}
            handleKeyPress={handleKeyPress}
            handleCategoryClick={handleCategoryClick}
            handleMrtClick={handleMrtClick}
            handleAreaClick={handleAreaClick}
            mrtSelectChange={mrtSelectChange}
            areaSelectChange={areaSelectChange}
          />

          {/* 顯示 Card2，將 currentItems 傳遞給它 */}
          <div className="pagecontent">
            {currentItems.map((card2, index) => (
              <div
                data-aos="zoom-in-down"
                data-aos-easing="ease-out-cubic"
                data-aos-duration="1000"
                data-aos-anchor-placement="center-bottom"
                key={index}
              >
                <Card2 key={index} v={card2} />
              </div>
            ))}
          </div>

          {/* 分頁元件，將 currentPage 和 handlePageChange 傳遞給它 */}
          <Page
            currentPage={currentPage}
            totalPages={totalPages}
            handlePageChange={handlePageChange}
          />
        </>
      ) : (
        'Loading...'
      )}
    </>
  )
}
