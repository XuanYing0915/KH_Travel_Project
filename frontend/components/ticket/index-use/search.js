import React, { useState, useEffect } from 'react'
import Select from 'react-select'

import { SlMagnifier } from 'react-icons/sl' //導入放大鏡icon
import Card2 from '@/components/common-card2/common-card2'
import Page from '@/components/ticket/index-use/page' // 引入分頁元件
import Luckdraw from '@/components/common-card2/test-singlecard/luck-draw' //抽獎鈕

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
  const [searchButton, setSearchButton] = useState({ text: '' })
  //判斷金額用狀態---->目前有問題 會反覆渲染
  const [minCount, setMinCount] = useState(0)
  const [maxCount, setMaxCount] = useState(0)
  const [Count, setCount] = useState({ mix: 0, max: 0 })
  //金額塞選按鈕
  const [moneysort, setMoneySort] = useState('預設排列')
  //加載動畫按鈕
  const [isLoading, setIsLoading] = useState(false)

  // console.log('allData:', allData);
  // console.log('Count', Count);
  //select使用資料
  const options = []
  tagclass.map((v) => {
    let tag = { value: v, label: v }
    options.push(tag)
  })
  // console.log('options:',options);

  // 搜尋文字放入函式
  const handleSearcKeyword = (e) => {
    setSearchKeyword(e.target.value)
  }
  // 按下Enter進行搜尋
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      setSearchButton({ ...searchButton, text: searchKeyword })
      setClass('')
    }
  }
  // 按下按鈕進行搜尋
  const handleBtnClick = () => {
    setSearchButton({ ...searchButton, text: searchKeyword })
    setClass('')
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
    setIsLoading(true) //開動畫
    // 搜尋函式
    if (tag && sqlDataName2) {
      filtered = allData.filter(
        (v) => v[sqlDataName].includes(tag) || v[sqlDataName2].includes(tag)
      )
    } else if (tag) {
      filtered = allData.filter((v) => v[sqlDataName].includes(tag))
    }
    // 金額篩選
    if (Count.mix > 0) {
      filtered = filtered.filter((v) => Math.min(...v.tk_price) >= minCount)
    }
    if (Count.max > 0) {
      filtered = filtered.filter((v) => Math.min(...v.tk_price) <= maxCount)
    }
    // 把篩選後的結果加入狀態
    setFilteredData(filtered)
    setSortData(filtered)
    setCurrentPage(1)
    setTimeout(() => {
      setIsLoading(false) //關動畫
    }, 500)
  }

  // 預設原始狀態
  let filtered = allData
  //高低函式判斷
  useEffect(() => {
    setIsLoading(true) //開動畫
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
    // console.log(newdata)
    setSortData(newdata)
    setCurrentPage(1)
    setTimeout(() => {
      setIsLoading(false) //關動畫
    }, 500)
  }, [moneysort])

  //類別搜尋
  useEffect(() => {
    filterData(cla, 'tk_class_name', '', allData)
    setMoneySort('預設排列')
  }, [cla, Count])
  //熱門搜尋
  useEffect(() => {
    filterData(popular, 'tk_name', '', allData)
    setMoneySort('預設排列')
  }, [popular, Count])
  //搜尋框變化
  useEffect(() => {
    filterData(searchButton.text, 'tk_name', 'tk_explain', allData)
    setMoneySort('預設排列')
  }, [searchButton, Count])
  // 初始資料匯入
  useEffect(() => {
    setFiltered(data)
    setFilteredData(data)
    setSortData(data)
    // console.log('serech have data:', data)
  }, [data])

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

  useEffect(() => {
    if (typeof window !== 'undefined') {
      AOS.init()
    }
  }, [currentPage])

  //select
  const colorStyle = {
    control: (styles) => ({
      ...styles,
      borderRadius: '20px',
      padding: '5px',
      border: '2px solid #0d5654',
      color: 'gray',
      fontSize: '18px',
      hight: '100%',
    }),
    option: (styles, { data, isDisable, isFocused, isSelected }) => {
      // console.log('option:', data, isDisable, isFocused, isSelected)
      //資料,?,現在選項為,以選擇選項
      return { ...styles }
    },
  }

  return (
    <>
      <div
        className="tkSearch"
        data-aos="fade-up"
        data-aos-anchor-placement="center-bottom"
      >
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
          {/* 抽獎 */}
          <div className="luckbox">
            <Luckdraw />
          </div>
          {/* 類別 */}
          <div className="tksection ">
            <ul>
              {tagclass.map((v, i) => {
                return (
                  <li
                    type="button"
                    key={i}
                    onClick={() => {
                      setClass(v)
                      setSearchKeyword('')
                    }}
                    className={cla == v ? 'tagcheck' : ''}
                  >
                    {v}
                  </li>
                )
              })}
            </ul>
          </div>

          {/* 金額塞選 */}
          <section className="borderLine">
            <div className="moneyCard ">
              {/* <h6>價格範圍</h6> */}
              <button
                className="setmoney"
                onClick={() => {
                  setCount({ mix: minCount, max: maxCount })
                }}
              >
                設定價格
              </button>
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
          <div className="tkhead2-top">
            <Luckdraw />
          </div>

          <div className="tkhead2-down">
            <Select
              options={options}
              placeholder="選擇分類"
              onChange={(option) => {
                setClass(option.value)
              }}
              isSearchable={false}
              styles={colorStyle} //整體預設樣式
              classNames={{
                control: (
                  state //調整法 目前單選 只要調整focused即可
                ) => (state.isFocused ? 'selecttag' : 'selecttag'),
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
        </div>
        {/* 手機使用區 結束*/}
      </div>

      {isLoading ? (
        <div className="t-loading">
          <div className="transitiontext"></div>
          <div className="transition"></div>
        </div>
      ) : (
        <>
          <div className="pagecontent1">
            {currentItems.map((v) => (
              <div
                data-aos="zoom-in-up"
                data-aos-easing="linear"
                data-aos-duration="500"
                key={v.tk_id}
              >
                <Card2
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
          <Page
            currentPage={currentPage}
            totalPages={totalPages}
            handlePageChange={handlePageChange}
          />
        </>
      )}
    </>
  )
}
