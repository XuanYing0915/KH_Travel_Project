import React, { useState } from 'react';
import Select from 'react-select';
import { SlMagnifier } from 'react-icons/sl' //導入放大鏡icon

export default function Search({ searchTerm, setSearchTerm,handleSearchClick, 
  handleKeyPress,handleCategoryClick,handleMrtClick, handleAreaClick, mrtSelectChange, areaSelectChange }) {
  

    // select 選擇捷運站
    const [mrtSelectedOption, setMrtSelectedOption] = useState(null);
    const mrtoptions = [     
      { value: '美麗島', label: '美麗島' },
      { value: '西子灣', label: '西子灣' },
      { value: '南岡山', label: '南岡山' },
      { value: '鹽埕埔', label: '鹽埕埔' },
      { value: '小港', label: '小港' },
      { value: '凹子底', label: '凹子底' },
    ];
    
     // select 選擇行政區
     const [areaSelectedOption, setAreaSelectedOption] = useState(null);
     const areaoptions = [     
       { value: '鹽埕區', label: '鹽埕區' },
       { value: '鼓山區', label: '鼓山區' },
       { value: '新興區', label: '新興區' },
       { value: '苓雅區', label: '苓雅區' },
       { value: '鳳山區', label: '鳳山區' },
       { value: '楠梓區', label: '楠梓區' },
       { value: '三民區', label: '三民區' },
     ];
     

  // 將類別、捷運、地區標籤作成陣列
  const category = ['親子同樂', '寵物友善', '青年旅宿']
  const mrtTag = ['鹽埕埔', '美麗島', '西子灣','市議會', '凹子底', '技擊館']
  const areaTag = ['鹽埕區', '新興區', '前鎮區','苓雅區','鼓山區','楠梓區']


  return (
    <>
      <div className="hotelSearch">
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
          
        <div className="texthead">
          <ul>
            {category.map((v, i) => {
              return (
                <li type="button" key={i} onClick={() => handleCategoryClick(v)}>
                  {v}
                </li>
              )
            })}
          </ul>
          <div className="textsection2">
            <ul>
              {mrtTag.map((v, i) => {
                return (
                  <li type="button" key={i} onClick={() => handleMrtClick(v)}>
                    {v}
                  </li>
                )
              })}
            </ul>
          </div>
          <div>
            <section className='sectionSelect1' id="select">
            <Select
                  instanceId="mrt-select"
                  value={mrtSelectedOption}
                  onChange={option => {
                    setMrtSelectedOption(option);
                    mrtSelectChange(option);
                  }}
                  options={mrtoptions}
                  isSearchable
                  placeholder="請選擇捷運站"
                />
            </section>
          </div>
          <div className="textsection2">
          <ul>
              {areaTag.map((v, i) => {
                return (
                  <li type="button" key={i} onClick={() => handleAreaClick(v)}>
                    {v}
                  </li>
                )
              })}
            </ul>
          </div>
          <div>
            <section className='sectionSelect2' id="select">
            <Select
                  instanceId="area-select"
                  value={areaSelectedOption}
                  onChange={option => {
                    setAreaSelectedOption(option);
                    areaSelectChange(option);
                  }}
                  options={areaoptions}
                  isSearchable
                  placeholder="請選擇行政區"
                />
            </section>
          </div>        
        </div> 
      </div>
    </>
  )
}