import React, { useState, useEffect, useRef } from 'react'
import { SlMagnifier } from 'react-icons/sl' //導入放大鏡icon
import data from '@/data/Ticket/ticket-all-data.json'
import Card2 from '@/components/common-card2/common-card2'
import Page from '@/components/ticket/page' // 引入分頁元件

export default function Search() {
  // 目前問題1.按鍵輸入尚未設定 2.熱門 OR 更多標籤判斷+上金額判斷 3.路由部分尚未  4.微調

  //狀態設置區
  //用於存儲原始資料    V
  const [allData, setFiltered] = useState(data.data)
  //塞選過後資料(呈現用) V
  const [filteredData, setFilteredData] = useState([])
  //新增類別標籤搜尋-- V
  const [cla, setClass] = useState('')
  //輸入關鍵字搜尋
  const [searchKeyword, setSearchKeyword] = useState('')
  const [searchPressed, setSearchPressed] = useState(true) //點擊案件搜尋

  //此區抓資料庫---------------------------------------------------
  // 左側熱門區塊(刪除)
  const category = ['熱門1', '熱門2', '熱門3', '熱門4', '熱門5', '熱門6']

  //中間區塊
  const tkTag = [
    '動物園',
    '親子遊玩',
    '樂園優惠',
    '展覽優惠',
    '電影優惠',
    '古蹟',
  ]

  //右側價格區塊(用好數值後變成判斷用)
  // const areaTag = ['鹽埕區', '新興區', '前鎮區', '苓雅區', '鼓山區', '楠梓區']

  // 資料庫結束---------------------------------------------------
  //函式建置區----------------------------------------------------
  // 點擊搜尋按鈕進行搜尋
  const handleSearchClick = () => {
    setSearchPressed(true) // 設置按鍵狀態為 true，觸發搜尋
  }

  // 按下Enter進行搜尋
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearchClick() // Call the handleSearchClick function when Enter key is pressed
    }
  }
  //函式建置區結束----------------------------------------------------

  //useEffect區塊----------------------------------------------------
  //尚未新增 熱門(刪除)及金額塞選
  // 預設原始狀態
  let filtered = allData
  //類別搜尋
  useEffect(() => {
    if (cla) {
      filtered = allData.filter((v) => v.tk_class_name.includes(cla))
    }
    // 把篩選後的結果加入狀態
    setFilteredData(filtered)
    // setSearchPressed(false) 尚未設定
    setCurrentPage(1)
    // 當搜索關鍵字 類別 地區選單  有改變  重新執行渲染
  }, [cla])
  //useEffect區塊結束----------------------------------------------------

  //分頁系統(獨立 已完成)-------------------
  const [currentPage, setCurrentPage] = useState(1) //分頁
  // 每頁顯示的數量
  const pageSize = 8
  // 將全部資料/展示資料筆數  向上取整 //計算總頁數
  const totalPages = Math.ceil(filteredData.length / pageSize)
  // 處理分頁切換函式
  const handlePageChange = (page) => {
    setCurrentPage(page)
  }
  // 根據當前的頁碼和每頁顯示的數量，從篩選後的資料中篩選出要顯示的資料
  const startIndex = (currentPage - 1) * pageSize
  const endIndex = startIndex + pageSize
  const currentItems = filteredData.slice(startIndex, endIndex)
  //分頁系統截止(獨立)-------------------

  return (
    <>
      <div className="container">
        <div className="tkSearch ">
          <input
            className="searchInput"
            type="text"
            placeholder="搜尋"
            // value={searchTerm}
            // onChange={(e) => setSearchTerm(e.target.value)}
            // onKeyDown={handleKeyPress}
          />
          <button onClick={handleSearchClick}>
            <SlMagnifier />
          </button>
          {/* 下方層 */}
          <div className="texthead">
            {/* 熱門 */}
            <div className="textsection2 ">
              <ul>
                {category.map((v, i) => {
                  return (
                    <li
                      type="button"
                      key={i}
                      onClick={() => handleCategoryClick(v)}
                    >
                      {v}
                    </li>
                  )
                })}
              </ul>
            </div>
            {/* 類別 */}
            <div className="textsection2 ">
              <ul>
                {tkTag.map((v, i) => {
                  return (
                    <li type="button" key={i} onClick={() => setClass(v)}>
                      {v}
                    </li>
                  )
                })}
              </ul>
            </div>
            {/* 金額塞選 */}
            {/* 此CSS放在ticket */}
            <div className="borderLine">
              <div className="moneyCard ">
                <h6>價格範圍</h6>
                <div className="moneyBox">
                  <input className="col" type="text" placeholder="最小值NT$" />
                  <div className="hr"></div>
                  <input className="col" type="text" placeholder="最大值NT$" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="pagecontent">
        {currentItems.map((v) => (
          <Card2
            key={v.id}
            id={v.id}
            img_src={v.tk_image_src[0]}
            name={v.tk_name}
            introduce={`最低${Math.min(v.tk_price[0])}元`}
            like={false}
            towheresrc={v.id}
            status={2}
            imgrouter="ticket"
          />
        ))}
      </div>

      {/* introduce={`最低${Math.min(...v.tk_price[0])}元`} 先放者 */}

      {/* 分頁元件，將 currentPage 和 handlePageChange 傳遞給它 */}
      <Page
        currentPage={currentPage}
        totalPages={totalPages}
        handlePageChange={handlePageChange}
      />
    </>
  )
}
