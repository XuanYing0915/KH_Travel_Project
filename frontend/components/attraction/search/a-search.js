import React, { useState, useEffect } from 'react'
// import axios from 'axios';
import { SlMagnifier } from 'react-icons/sl' //導入放大鏡icon
// 地區JSON
import areaData from '@/data/attraction/area.json'
// 標籤JSON
import tagData from '@/data/attraction/tag.json'
// 景點JSON
import more from '@/data/attraction/more_attraction.json'
// 熱門景點
import popular from '@/data/attraction/popular.json'
// 引入Link
import Link from 'next/link'
// 引入卡片元件
import Card from '@/components/common-card2/common-card2'
// 引入分頁元件
import Page from './page'

// 設定狀態
const AttractionsSearch = () => {
  // 關鍵字搜尋
  const [searchKeyword, setSearchKeyword] = useState('')
  // 標籤多選
  const [selectedTags, setSelectedTags] = useState([])
  // 多選TAG篩選
  const handleTagSelect = (event) => {
    const { value, checked } = event.target

    // 根據是否被勾選，更新選中的標籤
    setSelectedTags((prevTags) =>
      checked ? [...prevTags, value] : prevTags.filter((tag) => tag !== value)
    )
  }
  // 地區下拉選單
  const [selectedArea, setSelectedArea] = useState(null)
  // 景點資料
  const [attractions, setAttractions] = useState(more.attractions)

  // 後端資料
  //   const API_URL = 'https://jsonplaceholder.typicode.com/posts';

  //   useEffect(() => {
  //     // axios連接後端
  //     axios.get(API_URL).then((response) => {
  //       setAttractions(response.data);
  //     });
  //   }, []);

  // 搜尋景點名稱
  const handleKeywordSearch = (e) => {
    setSearchKeyword(e.target.value)
  }

  // 單選下拉選單選擇地區
  const handleAreaSelect = (event) => {
    setSelectedArea(event.target.value)
  }
  // 每頁顯示的資料筆數
  const pageSize = 8
  // 分頁相關狀態
  const [filteredAttractions, setFilteredAttractions] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  // 處理分頁切換
  const handlePageChange = (page) => {
    setCurrentPage(page)
  }

  // 依條件篩選景點
  useEffect(() => {
    // 篩選資料
    const filteredData = attractions.filter((attraction) => {
      // 輸入搜索  
      const nameMatch =
      // 景點名
        attraction.attraction_name.includes(searchKeyword) ||
        // 景點簡介
        attraction.title.includes(searchKeyword)
        // TODO 地區

        // 標籤多選  包含
      const tagsMatch =
        selectedTags.length === 0 ||
        attraction.tags.some((tag) => selectedTags.includes(tag))
        // 地區
      const areaMatch =
        !selectedArea || attraction.fk_area_id.toString() === selectedArea
      return nameMatch && tagsMatch && areaMatch
    })
    // 把篩選後的結果加入狀態
    setFilteredAttractions(filteredData)

    // 計算總頁數  
    // 將全部資料/展示資料筆數  向上取整
    const total = Math.ceil(filteredData.length / pageSize)
    // 更新總頁數狀態
    setTotalPages(total)
    // 當搜索關鍵字 標籤 地區選單  有改變  重新執行渲染
  }, [searchKeyword, selectedTags, selectedArea, attractions])

  // 依分頁狀態顯示對應的資料
  const startIdx = (currentPage - 1) * pageSize
  const endIdx = startIdx + pageSize
  const currentPageData = filteredAttractions.slice(startIdx, endIdx)

  return (
    <>
      <div className="container">
        <div className="a-search">
          {/* 輸入搜尋 */}
          <div className="a-search-input">
            <input
              type="text"
              value={searchKeyword}
              onChange={handleKeywordSearch}
              placeholder="熱門地區:旗津"
              className="search-input"
            />
            {/* 搜尋按鈕 */}
            <button>
              <SlMagnifier />
            </button>
            {/* 熱門景點 */}
            <div className=" mt-2  a-popular">
              {popular.attractions.map((attraction, i) => (
                <>
                  <i
                    className="fa-solid fa-fire"
                    style={{ color: '#137976' }}
                  ></i>
                  <Link
                    key={i}
                    href={`/attraction/${attraction.attraction_id}`}
                    className=" a-popular-search justify-content-start align-items-center"
                  >
                    {attraction.attraction_name}
                  </Link>
                </>
              ))}
            </div>
            <div className="row justify-content-start a-checkbox-select">
              {/* 標籤多選框 */}
              <div className="row col-8   a-tag-box">
                {tagData.map((tag) => (
                  <div key={tag.tag_name_id} className="col-2 d-flex">
                    <input
                      type="checkbox"
                      value={tag.tag_name}
                      onChange={handleTagSelect}
                      className="col-1 a-tag-input"
                      id={`checkbox_${tag.tag_name_id}`}
                    />
                    <label
                      className="col-10 a-tag-label"
                      htmlFor={`checkbox_${tag.tag_name_id}`}
                    >
                      {tag.tag_name}
                    </label>
                  </div>
                ))}
              </div>
              {/* 標籤多選框結束 */}
              {/* 地區下拉選單 */}
              <select
                className="row col-2"
                value={selectedArea}
                onChange={handleAreaSelect}
              >
                <option value="">請選擇地區</option>
                {/* 引入地區資料做選單 */}
                {areaData.map((area) => (
                  <option key={area.area_id} value={area.area_id}>
                    {area.area_name}
                  </option>
                ))}
              </select>
              {/* 地區下拉選單結束 */}
            </div>
          </div>
        </div>
      </div>
      {/* 顯示篩選後的景點或提示信息 */}
      <div className="row c1">
        <div className="row col-11 c align d-flex justify-content-around">
        {/* 當資料=0  出現提示   資料不等於0  出現搜索結果*/}
          {currentPageData.length === 0 ? (
            <div className="a-no-find text-center my-5">
              不好意思!
              <br />
              沒有符合的景點
              <br />
              請您重新搜尋
            </div>
          ) : (
            currentPageData.map((filter) => (
              <div className="d-flex col-3" key={filter.attraction_id}>
                <Card
                  id={filter.attraction_id}
                  name={filter.attraction_name}
                  img_src={filter.images[0]}
                  introduce={filter.title}
                  time={filter.tags.join(' / ')}
                  status={3}
                  like={false}
                  imgrouter="attraction"
                  towheresrc={`#${filter.attraction_id}`}
                />
              </div>
            ))
          )}
        </div>
      </div>
      {/* 分頁元件 */}

      <Page
        currentPage={currentPage}
        totalPages={totalPages}
        handlePageChange={handlePageChange}
      />
    </>
  )
}

export default AttractionsSearch
