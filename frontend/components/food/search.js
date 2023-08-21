import React, { useState } from 'react'
import Select from 'react-select'
import { SlMagnifier } from 'react-icons/sl' //導入放大鏡icon
import styles from './search.module.scss'


export default function Search({
  searchTerm,
  setSearchTerm,
  handleSearchClick,
  handleKeyPress,
  handleCategoryClick,
  handleAreaClick,
  areaSelectChange,
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
  return (
    <>
      <div className={styles['foodSearch']}>
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

        <div className={styles['texThead']}>
          <ul >
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
            <li className={styles['section']}><section>
              <Select
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
            </section></li>
          </ul>
        </div>
      </div>
    </>
  )
}
