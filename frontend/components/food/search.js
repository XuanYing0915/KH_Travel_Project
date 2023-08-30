import React, { useState, useEffect } from 'react'
import Select from 'react-select'
import { SlMagnifier } from 'react-icons/sl' // 導入放大鏡圖示
import AOS from 'aos' // AOS庫，用於動畫效果
import 'aos/dist/aos.css'
import 'animate.css' // 導入animate.css用於動畫'

export default function Search({
  searchTerm,
  setSearchTerm,
  handleSearchClick,
  handleKeyPress,
  handleCategoryClick,
  areaSelectChange,
  handleRandomClick,
}) {
  // select 選擇行政區
  const [areaSelectedOption, setAreaSelectedOption] = useState(null)
  const areaoptions = [
    { value: '鹽埕區', label: '鹽埕區' },
    { value: '鼓山區', label: '鼓山區' },
    { value: '新興區', label: '新興區' },
    { value: '苓雅區', label: '苓雅區' },
    { value: '鳳山區', label: '鳳山區' },
    { value: '三民區', label: '三民區' },
  ]

  // 將類別、捷運、地區標籤作成陣列
  const category = ['優質百貨商家', '米其林餐廳', '鮮鮮海產', '特色美食']

  //select
  const colorStyle = {
    control: (styles) => ({
      ...styles,
      borderRadius: '20px',
      border: '2px solid #0d5654',
      color: 'gray',
      fontSize: '14px',
      hight: '100%',
    }),
    option: (styles, { data, isDisable, isFocused, isSelected }) => {
      return { ...styles }
    },
  }



 // 初始化AOS庫
  useEffect(() => {
    if (typeof window !== 'undefined') {
      AOS.init({
        once: true, // 添加這個選項
      })
    }
  }, [])

  return (
    <>
        <div
          className="foodSearch"
          data-aos="fade-down"
          data-aos-duration="1500"
        >
          <input
            type="text"
            placeholder="搜尋"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleKeyPress}
          />
          <button onClick={handleSearchClick}>
            <SlMagnifier />
          </button>

          <div className="texThead">
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
              <li type="button" onClick={handleRandomClick}>試試手氣</li>

              <li className="section">
                <section>
                  <Select
                    styles={colorStyle} //整體預設樣式
                    instanceId="area-select"
                    value={areaSelectedOption}
                    onChange={(option) => {
                      setAreaSelectedOption(option)
                      areaSelectChange(option)
                    }}
                    options={areaoptions}
                    isSearchable
                    placeholder="請選擇行政區"
                  />
                </section>
              </li>
             
            </ul>
          </div>
        </div>
    </>
  )
}
