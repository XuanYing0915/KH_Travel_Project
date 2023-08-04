import React, { useState, useEffect } from 'react'
import areaData from '@/data/food/map-svg.json'

const SvgMap = ({ AreaClick, setAreaId, setAreaName }) => {
  // 點擊地圖  回傳地區id
  const clickMap = (e) => {
    //  console.log(e.target)
    const clickAreaId = e.target.getAttribute('id')
    const clickAreaName = e.target.getAttribute('name')
    setAreaId(clickAreaId)
    setAreaName(clickAreaName)
    console.log(clickAreaId, clickAreaName)
    // 設定父元件函式來傳遞地區名稱
    AreaClick(clickAreaId, clickAreaName)
  }
  // 更改顏色
  const getRandomColor = () => {
    const colors = ['#4D9BAC', '#00CCEA', '#CBFDFF']
    const randomIndex = Math.floor(Math.random() * 3)
    return colors[randomIndex]
  }
  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={900}
        height={600}
        viewBox="0 0 900 00"
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
          {areaData.map((v) => (
            <path
              key={v.id} // 使用 key 屬性來確保 React 可以識別不同的元素
              id={v.id}
              name={v.name}
              fill={getRandomColor()}
              stroke="#fff"
              d={v.d}
              className="data geoblock town"
              pointerEvents="initial"
              onClick={clickMap}
            />
          ))}
        </g>
      </svg>
      <style jsx>
        {`
          svg {
             {
              /* height: 1000px;
            width: 1000px;
            background: linear-gradient(to bottom, white 0%, white 50%); */
            }
          }
          path {
            stroke: white;
            transition: 0.3s;
            cursor: pointer;
          }
          path:hover {
            fill: #ffc700;
            transform: translate(5px, -5px);
            stroke: yellow;
          }
        `}
      </style>
    </>
  )
}
export default SvgMap
