import React, { useState, useEffect } from 'react';
import { SlMagnifier } from 'react-icons/sl' //導入放大鏡icon

export default function Search({ searchTerm, setSearchTerm,handleSearchClick, handleKeyPress }) {
  
  // select 選擇地區
  const areaOptions = [
    '鹽埕區',
    '鼓山區',
    '新興區',
    '苓雅區',
    '鳳山區',
    '楠梓區',
    '三民區',
  ]
  const [area, setArea] = useState('') //上面的doofOptions中成員其一

  // select 選擇捷運
  const mrtOptions = [
    '美麗島',
    '西子灣',
    '南岡山',
    '高雄車站',
    '鹽埕埔',
    '三多商圈',
    '巨蛋',
  ]
  const [mrt, setMrt] = useState('') //上面的doofOptions中成員其一

  // 將類別標籤作成陣列
  const category = ['親子旅遊', '寵物友善', '青年旅宿']

  // 將捷運標籤作成陣列
  const mrtTag = ['鹽埕埔', '美麗島', '西子灣']
  const mrtTag2 = ['市議會', '凹子底', '南岡山']

  return (
    <>
      <div className="search">
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
                <li type="button" key={i}>
                  {v}
                </li>
              )
            })}
          </ul>
          <div className="textsection">
            <ul>
              {mrtTag.map((v, i) => {
                return (
                  <li type="button" key={i}>
                    {v}
                  </li>
                )
              })}
            </ul>
          </div>
          <div>
            <ul>
              {mrtTag2.map((v, i) => {
                return (
                  <li type="button" key={i}>
                    {v}
                  </li>
                )
              })}
            </ul>
          </div>
          <div>
            <section id="select">
              <select
                value={mrt}
                onChange={(e) => {
                  setMrt(e.target.value)
                }}
              >
                <option value="">請選擇捷運站</option>
                {mrtOptions.map((v, i) => {
                  return (
                    <option key={i} value={v}>
                      {v}
                    </option>
                  )
                })}
              </select>
            </section>
          </div>
          <div className="textsection">
            <p>鹽埕區</p>
            <p>新興區</p>
            <p>前鎮區</p>
          </div>
          <div>
            <p>苓雅區</p>
            <p>鼓山區</p>
            <p>楠梓區</p>
          </div>
          <div>
            <section id="select">
              <select
                value={area}
                onChange={(e) => {
                  setArea(e.target.value)
                }}
              >
                <option value="">請選擇市區</option>
                {areaOptions.map((v, i) => {
                  return (
                    <option key={i} value={v}>
                      {v}
                    </option>
                  )
                })}
              </select>
            </section>
          </div>        
        </div> 
      </div>
    </>
  )
}
