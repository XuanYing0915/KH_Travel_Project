// pscall.js
import React, { useState, useEffect } from 'react'
import Search from '@/components/food/search'
import MapQueryTitle from '@/components/food/map-query'
import Page from '@/components/hotel/page'
import Card2 from '@/components/food/Introduction-card'
import axios from 'axios'

export default function Pscall() {
  const [data, setData] = useState(null) //抓Json資料 data
  const [error, setError] = useState(null) //新增錯誤資料 error
  const [filteredCards, setFilteredCards] = useState([]) //用於存儲過濾後的資料
  const [currentPage, setCurrentPage] = useState(1) //分頁
  const [searchTerm, setSearchTerm] = useState('') //輸入關鍵字搜尋
  const [searchPressed, setSearchPressed] = useState(true) //點擊案件搜尋
  const [categoryTerm, setCategoryTerm] = useState('') //新增類別標籤搜尋--1
  const [categorySearchPressed, setCategorySearchPressed] = useState(false) //類別標籤搜尋--1
  const [areaTerm, setAreaTerm] = useState('') //新增地區標籤搜尋--3
  const [areaSearchPressed, setAreaSearchPressed] = useState(false) //地區標籤搜尋--3
  const [areaSelect, setAreaSelect] = useState([]) //Select行政區選項搜尋--5
  const [areaSelectedOption, setAreaSelectedOption] = useState(null) //Select行政區選項搜尋--5
  const [isRandom, setIsRandom] = useState(false); // 是否隨機

  // 處理類別標籤搜尋的點擊 handleCategoryClick，設置 categorySearchPressed 狀態變量
  const handleCategoryClick = (category) => {
    setCategoryTerm(category)
    setCategorySearchPressed(true)
  }

  // 處理行政區搜尋的點擊 handleAreaClick，設置 areaSearchPressed 狀態變量
  const handleAreaClick = (area) => {
    setAreaTerm(area)
    setAreaSearchPressed(true)
    console.log('設定地區:' + area)
  }

  //Select選擇行政區搜尋
  const areaSelectChange = (areaoption) => {
    setAreaSelect(areaoption);
    setAreaSelectedOption(areaoption); // 存储相应选项对象
  };

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

  // 定義處理隨機點擊的函數
const handleRandomClick = () => {
  setIsRandom(true); // 設置隨機狀態為 true
}

  // 抓nodejs資料
  useEffect(() => {
    axios
      .get('http://localhost:3005/search-merchants')
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
            card2.name_chinese.toLowerCase().includes(searchTerm.toLowerCase())
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

// 在你的搜尋邏輯下方，添加此 useEffect，它會在 isRandom 改變時執行
// 随机逻辑
useEffect(() => {
  if (isRandom) {
    const shuffled = [...filteredCards].sort(() => Math.random() - 0.5);
    setFilteredCards(shuffled); // 设置随机顺序的卡片
    setIsRandom(false); // 重置随机状态
  }
}, [isRandom]); 



  //分頁
  const ITEMS_PER_PAGE = 8 // 每頁顯示的數量
  const totalItems = filteredCards.length
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE)

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage)
  }

  // 根據當前的頁碼和每頁顯示的數量，從篩選後的資料中篩選出要顯示的資料
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const endIndex = startIndex + ITEMS_PER_PAGE
  const currentItems = filteredCards.slice(startIndex, endIndex)

  return (
    <>
      {error ? (
        <div>Error: {error}</div>
      ) : data ? (
        <>
          <MapQueryTitle handleAreaClick={handleAreaClick} />
          {/* 顯示 SearchComponent，將 setSearchTerm 傳遞給它 */}
          <Search
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            handleSearchClick={handleSearchClick}
            handleKeyPress={handleKeyPress}
            handleCategoryClick={handleCategoryClick}
            handleAreaClick={handleAreaClick}
            areaSelectChange={areaSelectChange}
            handleRandomClick={handleRandomClick}
          />

          {/* 顯示 Card2，將 currentItems 傳遞給它 */}
          <div className="pagecontent">
            {currentItems.map((card2, index) => (
              <Card2
                key={index}
                img_src={card2.img}
                id={card2.merchant_id}
                name={card2.name_chinese}
                introduction={card2.introduction_card}
                towheresrc={`${card2.merchant_id}`}
              />
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
