import React, { useState, useEffect, useRef, useCallback } from 'react'
import Select from 'react-select'

import { SlMagnifier } from 'react-icons/sl' //導入放大鏡icon
import Card2 from '@/components/common-card2/common-card2'
import Page from '@/components/ticket/index-use/page' // 引入分頁元件

import AOS from 'aos'
import 'aos/dist/aos.css'
import 'animate.css'


export default function Search({ data, tagclass, numberid }) {
  //狀態設置區
  //用於存儲原始資料
  const [allData, setFiltered] = useState([])
  //塞選過後資料(呈現用)
  const [filteredData, setFilteredData] = useState([])
  //排列過後資料(呈現用)
  const [sortData, setSortData] = useState([])
  //新增類別標籤搜尋
  const [cla, setClass] = useState('')
  //新增熱門標籤搜尋
  const [popular, setPopular] = useState('')
  //儲存搜尋文字
  const [searchKeyword, setSearchKeyword] = useState('')
  //輸入關鍵字搜尋按鈕
  const [searchButton, setSearchButton] = useState('')
  //判斷金額用狀態
  const [minCount, setMinCount] = useState(0)
  const [maxCount, setMaxCount] = useState(0)
  const [moneysort, setMoneySort] = useState('預設排列')

  //此區抓資料庫---------------------------------------------------
  // 左側熱門區塊(刪除)
  const category = ['熱門1', '熱門2', '義大', '壽山', '熱門5', '熱門6']
  //select使用資料
  const options = []
  tagclass.map((v) => {
    let tag = { value: v, label: v }
    options.push(tag)
  })
  // console.log('options:',options);
  // 資料庫結束---------------------------------------------------

  //函式建置區----------------------------------------------------
  // 搜尋文字放入函式
  const handleSearcKeyword = (e) => {
    setSearchKeyword(e.target.value)
  }
  // 按下Enter進行搜尋
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      setSearchButton(searchKeyword)
    }
  }
  // 按下按鈕進行搜尋
  const handleBtnClick = () => {
    setSearchButton(searchKeyword)
  }
  // 按下價格按鈕(手機板) 三種狀態 高->低 > 低->高
  const high_to_low = (data, number) => {
    return data.slice().sort((v1, v2) => {
      const item1 = Math.min(...v1.tk_price)
      const item2 = Math.min(...v2.tk_price)
      if (number == 1) {
        return item2 - item1 // 高到低
      } else {
        return item1 - item2 // 低到高
      }
    })
  }

  // 搜尋類純函式(範例如下)
  // filterData(哪個狀態, 資料庫某值的名稱, 全部資料)
  // filterData(popular, tk_name, allData)
  const filterData = (tag, sqlDataName, sqlDataName2, allData) => {
    // 搜尋函式
    if (tag && sqlDataName2) {
      filtered = allData.filter(
        (v) => v[sqlDataName].includes(tag) || v[sqlDataName2].includes(tag)
      )
    } else if (tag) {
      filtered = allData.filter((v) => v[sqlDataName].includes(tag))
    }
    // 金額篩選
    if (minCount > 0) {
      filtered = filtered.filter((v) => Math.min(...v.tk_price) >= minCount)
    }
    if (maxCount > 0) {
      filtered = filtered.filter((v) => Math.min(...v.tk_price) <= maxCount)
    }
    // 把篩選後的結果加入狀態
    setFilteredData(filtered)
    setSortData(filtered)
    setCurrentPage(1)
  }
  //函式建置區結束----------------------------------------------------

  //useEffect區塊----------------------------------------------------
  // 預設原始狀態
  let filtered = allData

  //高低函式判斷 目前刷資料有問題
  useEffect(() => {
    let newdata = []
    if (moneysort == '預設排列') {
      newdata = filteredData
    }
    if (moneysort == '高→低') {
      newdata = high_to_low(filteredData, 1)
    }
    if (moneysort == '低→高') {
      newdata = high_to_low(filteredData, 2)
    }
    console.log(newdata)
    setSortData(newdata)
    setCurrentPage(1)
  }, [moneysort])

  //類別搜尋
  useEffect(() => {
    filterData(cla, 'tk_class_name', '', allData)
  }, [cla, minCount, maxCount])
  //熱門搜尋
  useEffect(() => {
    filterData(popular, 'tk_name', '', allData)
  }, [popular, minCount, maxCount])
  //搜尋框變化
  useEffect(() => {
    filterData(searchButton, 'tk_name', 'tk_explain', allData)
  }, [searchButton, minCount, maxCount])
  // 初始資料匯入
  useEffect(() => {
    setFiltered(data)
    setFilteredData(data)
    setSortData(data)
    console.log('serech have data:', data)
  }, [data])

  //useEffect區塊結束----------------------------------------------------

  //分頁系統(獨立 已完成)-------------------
  const [currentPage, setCurrentPage] = useState(1) //分頁
  // 每頁顯示的數量
  const pageSize = 8
  // 將全部資料/展示資料筆數  向上取整 //計算總頁數
  const totalPages = Math.ceil(sortData.length / pageSize)
  // 處理分頁切換函式
  const handlePageChange = (page) => {
    setCurrentPage(page)
  }
  // 根據當前的頁碼和每頁顯示的數量，從篩選後的資料中篩選出要顯示的資料
  const startIndex = (currentPage - 1) * pageSize
  const endIndex = startIndex + pageSize
  const currentItems = sortData.slice(startIndex, endIndex)
  // console.log('currentItems :', currentItems, totalPages)
  //分頁系統截止(獨立)-------------------



  //select
  const colorStyle = {
    control: (styles) => ({
      ...styles, borderRadius: '20px', padding: '5px', border: '2px solid #0d5654', color: 'gray'
      , fontSize: '18px'
    }),
    option: (styles, { data, isDisable, isFocused, isSelected }) => {
      // console.log('option:', data, isDisable, isFocused, isSelected)
      //資料,?,現在選項為,以選擇選項
      return { ...styles }
    }

  }

  return (
    <>
      <div className="tkSearch" data-aos="fade-up"
        data-aos-anchor-placement="center-bottom">
        <input
          className="searchInput"
          type="text"
          placeholder="搜尋"
          value={searchKeyword}
          onChange={handleSearcKeyword}
          onKeyDown={handleKeyPress}
        />
        <button onClick={handleBtnClick} className="searchbutton">
          <SlMagnifier />
        </button>
        {/* 下方層 */}
        <div className="tkhead">
          <section className="leftbox">
            {/* 熱門 */}
            <div className="tksection no-margin">
              <ul>
                {category.map((v, i) => {
                  return (
                    <li type="button" key={i} onClick={() => setPopular(v)}>
                      {v}
                    </li>
                  )
                })}
              </ul>
            </div>
            {/* 類別 */}
            <div className="tksection ">
              <ul className="have-border">
                {tagclass.map((v, i) => {
                  return (
                    <li type="button" key={i} onClick={() => setClass(v)}>
                      {v}
                    </li>
                  )
                })}
              </ul>
            </div>
          </section>
          {/* 金額塞選 */}
          {/* 此CSS放在ticket */}
          <section className="borderLine">
            <div className="moneyCard ">
              <h6>價格範圍</h6>
              <div className="moneyBox">
                <input
                  className="col"
                  type="text"
                  placeholder="最小值NT$"
                  onChange={(e) => {
                    setMinCount(e.target.value)
                  }}
                />
                <div className="hr"></div>
                <input
                  className="col"
                  type="text"
                  placeholder="最大值NT$"
                  onChange={(e) => {
                    setMaxCount(e.target.value)
                  }}
                />
              </div>
              <h6>價格排序</h6>
            </div>
            <button
              className="money-check"
              onClick={() => {
                moneysort == '預設排列'
                  ? setMoneySort('高→低')
                  : moneysort == '高→低'
                    ? setMoneySort('低→高')
                    : setMoneySort('預設排列')
              }}
            >
              {moneysort == '預設排列'
                ? '預設排列'
                : moneysort == '高→低'
                  ? '高→低'
                  : '低->高'}
            </button>
          </section>
        </div>
        {/* 手機使用區 其餘不顯示 */}

        <div className="tkhead2">
          <Select
            options={options}
            placeholder="選擇分類"
            onChange={(option) => {
              setClass(option.value)
            }}
            styles={colorStyle} //整體預設樣式

            // menuPortalTarget={document.body}
            // menuPosition={'fixed'}
            classNames={{
              control: (state) => ( //調整法 目前單選 只要調整focused即可
                state.isFocused ? 'selecttag' : 'selecttag'
              )
            }}
          />


          <button
            className="money-check"
            onClick={() => {
              moneysort == '預設排列'
                ? setMoneySort('高→低')
                : moneysort == '高→低'
                  ? setMoneySort('低→高')
                  : setMoneySort('預設排列')
            }}
          >
            {moneysort == '預設排列'
              ? '預設排列'
              : moneysort == '高→低'
                ? '高→低'
                : '低->高'}
          </button>

        </div>
        {/* 手機使用區 結束*/}
      </div>
      <div className="pagecontent1" >
        {currentItems.map((v) => (
          <div data-aos="zoom-in-up"
            data-aos-easing="linear"
            data-aos-duration="500">
            <Card2
              key={v.tk_id}
              id={v.tk_id}
              img_src={v.tk_image_src[0]}
              name={v.tk_name}
              introduce={`最低${Math.min(...v.tk_price)}元`}
              like={v.fk_member_id}
              towheresrc={v.tk_id}
              status={2}
              imgrouter="ticket"
              who={4}
            // numberid={numberid}
            />
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
  )
}
