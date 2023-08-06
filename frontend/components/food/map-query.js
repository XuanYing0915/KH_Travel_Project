// 互動SVG地圖的React元件。使用者可以點擊地圖的特定區域，並在畫面上顯示被選擇區域的詳細資訊。
// React引入useState和useEffect。引入了SCSS樣式、地圖的JSON數據。
import React, { useState, useEffect, useMemo } from 'react'
import styles from './map-query.module.scss'
import areaData from '@/data/food/map-svg.json'

// SvgMap是一個SVG地圖的React元件。當地圖的某一區域被點擊時，clickMap函數會被觸發。該函數會獲取被點擊區域的ID和名稱，並通過AreaClick函數將這些數據傳遞出去。
const getRandomColor = () => {
  const colors = ['#4D9BAC', '#00CCEA', '#CBFDFF']
  const randomIndex = Math.floor(Math.random() * 3)
  return colors[randomIndex]
}

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

  // getRandomColor是一個函數，它返回一個隨機的顏色。顏色是由預定義的顏色數組中選擇的。

  const coloredAreaData = useMemo(() => {
    return areaData.map((v) => ({
      ...v,
      fill:
        v.id === selectedAreaId
          ? '#FF5733' // 替換成被選擇的顏色
          : v.id === hoveredAreaId
          ? '#ffc700'
          : getRandomColor(),
    }))
  }, [hoveredAreaId, selectedAreaId])

  // SVG元素的定義。這些SVG元素表示地圖的各個區域。這些區域會隨機填充顏色，並在被點擊時觸發clickMap函數。
  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={900}
        height={600}
        viewBox="0 -10 1350 900"
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
          {coloredAreaData.map((v) => (
            <path
              key={v.id}
              id={v.id}
              name={v.name}
              fill={v.fill} // 使用处理后的填充颜色
              stroke="#fff"
              d={v.d}
              className={
                v.id === selectedAreaId
                  ? `${styles.path} ${styles['selected-area']}`
                  : styles.path
              }
              pointerEvents="initial"
              onClick={clickMap}
              onMouseEnter={() => handleAreaMouseEnter(v.id)} // 使用傳入的函數
              onMouseLeave={handleAreaMouseLeave} // 使用傳入的函數
            />
          ))}
        </g>
      </svg>
    </>
  )
}

// MapQueryTitle是主React元件。它使用了兩個狀態變量areaId和areaName來儲存當前被選擇的區域的ID和名稱。
const MapQueryTitle = () => {
  const [hoveredAreaId, setHoveredAreaId] = useState(null)

  const [areaId, setAreaId] = useState(null)
  const [areaName, setAreaName] = useState(null)
  const [selectedAreaData, setSelectedAreaData] = useState(null)

  const handleAreaMouseEnter = (id) => {
    setHoveredAreaId(id) // 設置懸停區域 ID
    const area = areaData.find((item) => item.id === id)
    setSelectedAreaData(area)
  }

  const handleAreaMouseLeave = () => {
    setHoveredAreaId(null) // 清除懸停區域 ID
    setSelectedAreaData(null)
  }

  // handleAreaClick是一個函數，用於設置areaId和areaName。該函數將由SvgMap元件的clickMap函數調用，並將被點擊的區域的ID和名稱傳遞給它。
  const handleAreaClick = (id, name) => {
    setAreaId(id)
    setAreaName(name)
  }

  const randomColors = useMemo(() => areaData.map(() => getRandomColor()), [])

  return (
    <>
      <div className={styles['map-query']}>
        <div className={styles['map']}>
          <SvgMap
            AreaClick={handleAreaClick}
            selectedAreaId={areaId}
            hoveredAreaId={hoveredAreaId}
            handleAreaMouseEnter={handleAreaMouseEnter}
            handleAreaMouseLeave={handleAreaMouseLeave}
            randomColors={randomColors} // 将随机颜色传递给 SvgMap
          />
        </div>

        {/* 箭頭標題區域 */}
        {areaData.map((area, index) => (
          <div
            key={area.id}
            onMouseEnter={() => handleAreaMouseEnter(area.id)}
            onMouseLeave={handleAreaMouseLeave}
            className={`${styles[`container-${index + 1}`]} ${
              hoveredAreaId === area.id ? styles['hovered-area'] : ''
            }`} // 增加這一行
          >
            <div className={styles['arrow-icon']}>
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
            <div className={styles['text-container']}>
              <h2>{area.name}</h2>
              <p
                className={
                  hoveredAreaId === area.id ? styles['hovered-text'] : ''
                }
              >
                {area.details}
              </p>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

export default MapQueryTitle
