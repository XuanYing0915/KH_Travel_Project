import React, { useState, useEffect, useMemo } from 'react'
import areaData from '@/data/food/map-svg.json'
import AOS from 'aos'
import 'aos/dist/aos.css'
import 'animate.css'

// 從三種顏色中隨機選擇一種
const getRandomColor = () => {
  const colors = ['#4D9BAC', '#00CCEA', '#CBFDFF']
  const randomIndex = Math.floor(Math.random() * 3)
  return colors[randomIndex]
}

// 在 SvgMap 元件中，我們也定義了一個名為 clickMap 的函數，這個函數用來處理地圖區域被點擊的事件。當一個地圖區域被點擊時，這個函數會先從事件對象（e）的目標元素（e.target）中取出該元素的 id 和 name 屬性的值，然後將這兩個值作為參數呼叫 AreaClick 函數。
const SvgMap = ({
  AreaClick,
  selectedAreaId,
  hoveredAreaId,
  handleAreaMouseEnter,
  handleAreaMouseLeave,
}) => {
  const clickMap = (e) => {
    const clickAreaId = e.target.getAttribute('id')
    const clickAreaName = e.target.getAttribute('name')
    AreaClick(clickAreaId, clickAreaName)
  }

  // coloredAreaData 是一個新的數據結構，裡面的每個區域都會有自己的填充顏色和邊線顏色。並且這些顏色會根據區域是否被選中或者被懸停來動態變化。
  const coloredAreaData = useMemo(() => {
    return areaData.map((v) => ({
      ...v,
      fill:
        v.id === selectedAreaId
          ? '#FF5733'
          : v.id === hoveredAreaId
          ? '#ffc700'
          : getRandomColor(),
      stroke: v.id === hoveredAreaId ? 'red' : '#fff',
    }))
  }, [hoveredAreaId, selectedAreaId])

  // 繪製一個地圖
  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={900}
        height={800}
        viewBox="-100 -10 900 800"
        preserveAspectRatio="xMidYMid"
        style={{
          overflow: 'hidden',
          position: 'relative',
          width: '100%',
          height: '100%',
          fontFamily: 'Arial',
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          width={300}
          height={0}
        >
          <defs>
            <filter id="innerStroke-undefined" width={1} height={1} x={0} y={0}>
              <feMorphology in="SourceGraphic" radius={3} result="erode" />
              <feColorMatrix
                in="SourceGraphic"
                result="color"
                values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"
              />
              <feMerge>
                <feMergeNode in="color" />
                <feMergeNode in="erode" />
              </feMerge>
            </filter>
            <filter
              id="shadow-undefined"
              width={2}
              height={2}
              x={-0.5}
              y={-0.5}
            >
              <feGaussianBlur
                in="SourceAlpha"
                result="blur"
                stdDeviation={9.5}
              />
              <feMorphology
                in="SourceGraphic"
                operator="dilate"
                radius={2}
                result="dilate"
              />
              <feColorMatrix
                in="dilate"
                result="color"
                values="0.2 0 0 0 0 0 0.2 0 0 0 0 0 0.2 0 0 0 0 0 1 0"
              />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="color" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
        </svg>
        <g className="data-group">
          {/* 每塊都map出來 */}
          {coloredAreaData.map((v) => (
            <path
              key={v.id}
              id={v.id}
              name={v.name}
              fill={v.fill}
              stroke="#fff"
              d={v.d}
              className={
                v.id === selectedAreaId
                  ? 'food-path food-selected-area'
                  : 'food-path'
              }
              pointerEvents="initial"
              onClick={clickMap}
              onMouseEnter={() => handleAreaMouseEnter(v.id)}
              onMouseLeave={handleAreaMouseLeave}
            />
          ))}
        </g>
      </svg>
    </>
  )
}

// 控制地圖上區域的選取與滑鼠懸停狀態，並記錄相關的狀態信息
const MapQueryTitle = ({ handleAreaClick }) => {
  const [hoveredAreaId, setHoveredAreaId] = useState(null)
  const [areaId, setAreaId] = useState(null)
  const [areaName, setAreaName] = useState(null)
  const [selectedAreaData, setSelectedAreaData] = useState(null)
  const [neighborAreaIds, setNeighborAreaIds] = useState([]) // 新增狀態存放鄰近區域ID
  const randomColors = useMemo(() => areaData.map(() => getRandomColor()), [])

  const handleAreaMouseEnter = (id) => {
    setHoveredAreaId(id)
    const area = areaData.find((item) => item.id === id)
    setSelectedAreaData(area)
  }

  const handleAreaMouseLeave = () => {
    setHoveredAreaId(null)
    setSelectedAreaData(null)
    setNeighborAreaIds([]) // 離開時清除鄰近區域
  }

  // 點擊向下滑
  const handClickScroll = () => {
    const offset = 1250
    window.scrollTo({
      top: offset,
      behavior: 'smooth',
    })
  }

  useEffect(() => {
    if (typeof window !== 'undefined') {
      AOS.init({
        // once: true, // 添加這個選項
      })
    }
  }, [])
  return (
    <>
      <div className="food-map-query">
        {/* 地圖區域 */}
        <div className="map" data-aos="zoom-out" data-aos-duration="2000">
          <SvgMap
            AreaClick={handleAreaClick}
            selectedAreaId={areaId}
            hoveredAreaId={hoveredAreaId}
            neighborAreaIds={neighborAreaIds} // 新增參數，傳遞給SvgMap
            handleAreaMouseEnter={handleAreaMouseEnter}
            handleAreaMouseLeave={handleAreaMouseLeave}
            randomColors={randomColors}
          />
        </div>

        {/* 箭頭標題區域 */}
        <div
          className="area-control"
          data-aos="zoom-in-up"
          data-aos-duration="2000"
        >
          {areaData.map((area, index) => (
            <div
              key={area.id}
              onMouseEnter={() => handleAreaMouseEnter(area.id)}
              onMouseLeave={handleAreaMouseLeave}
              onClick={() => {
                handClickScroll()
                handleAreaClick(area.name)
              }}
              className={`container-${index + 1} ${
                hoveredAreaId === area.id || neighborAreaIds.includes(area.id)
                  ? 'hovered-area'
                  : ''
              }`}
            >
              {/* 箭頭svg */}
              <div className="arrow-icon">
                <svg
                  width="65"
                  height="65"
                  viewBox="0 0 65 65"
                  fill={hoveredAreaId === area.id ? '#FF5733' : '#137976'}
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    cx="32.5"
                    cy="32.5"
                    r="32.5"
                    fill={
                      hoveredAreaId === area.id
                        ? '#ffc700'
                        : selectedAreaData && area.id === selectedAreaData.id
                        ? '#FF5733'
                        : '#137976'
                    }
                  />
                  <path
                    d="M18.2002 30.4336C16.8195 30.4336 15.7002 31.5529 15.7002 32.9336C15.7002 34.3143 16.8195 35.4336 18.2002 35.4336V30.4336ZM50.3013 34.7014C51.2776 33.725 51.2776 32.1421 50.3013 31.1658L34.3914 15.2559C33.4151 14.2796 31.8322 14.2796 30.8559 15.2559C29.8795 16.2322 29.8795 17.8151 30.8559 18.7915L44.998 32.9336L30.8559 47.0757C29.8795 48.052 29.8795 49.635 30.8559 50.6113C31.8322 51.5876 33.4151 51.5876 34.3914 50.6113L50.3013 34.7014ZM18.2002 35.4336H48.5335V30.4336H18.2002V35.4336Z"
                    fill="white"
                  />
                </svg>
              </div>
              {/* 標題文字介紹 */}
              <div className="text-container">
                <h2>{area.name}</h2>
                <p className={hoveredAreaId === area.id ? 'hovered-text' : ''}>
                  {area.details}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default MapQueryTitle
