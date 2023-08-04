import React, { useState, useEffect } from 'react'
import styles from './map-query.module.scss'
import areaData from '@/data/food/map-svg.json'

const SvgMap = ({ AreaClick }) => {
  const clickMap = (e) => {
    const clickAreaId = e.target.getAttribute('id')
    const clickAreaName = e.target.getAttribute('name')
    AreaClick(clickAreaId, clickAreaName)
  }

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
          {areaData.map((v) => (
            <path
              key={v.id}
              id={v.id}
              name={v.name}
              fill={getRandomColor()}
              stroke="#fff"
              d={v.d}
              className={styles.path} 
              pointerEvents="initial"
              onClick={clickMap}
            />
          ))}
        </g>
      </svg>
    </>
  )
}

const MapQueryTitle = () => {
  const [areaId, setAreaId] = useState(null)
  const [areaName, setAreaName] = useState(null)

  const handleAreaClick = (id, name) => {
    setAreaId(id)
    setAreaName(name)
  }

  return (
    <>
      <div className={styles['map-query']}>
        <div className={styles['map']}>
          <SvgMap AreaClick={handleAreaClick} />
        </div>

        <div>
          <div className={styles['container-1']}>
            <img src="/images/food/箭頭標示.svg" />
            <div className={styles['text-container']}>
              <h2>左營區</h2>
              <p>
                蓮池潭商圈
                <br />
                、瑞豐夜市
              </p>
            </div>
          </div>
        </div>
        <div>
          <div className={styles['container-2']}>
            <img src="/images/food/箭頭標示.svg" />
            <div className={styles['text-container']}>
              <h2>鼓山區</h2>
              <p>風華再現商圈</p>
            </div>
          </div>
        </div>
        <div>
          <div className={styles['container-3']}>
            <img src="/images/food/箭頭標示.svg" />
            <div className={styles['text-container']}>
              <h2>
                鹽埕區 <br />
                前金區 新興區
              </h2>
              <p>
                鹽埕崛江商圈、新崛江商圈
                <br />
                、鹽埕埔夜市、六合夜市
              </p>
            </div>
          </div>
        </div>
        <div>
          <div className={styles['container-4']}>
            <img src="/images/food/箭頭標示.svg" />
            <div className={styles['text-container']}>
              <h2>苓雅區</h2>
              <p>
                苓雅自強夜市
                <br />
                、光華夜市
              </p>
            </div>
          </div>
        </div>
        <div>
          <div className={styles['container-5']}>
            <img src="/images/food/箭頭標示.svg" />
            <div className={styles['text-container']}>
              <h2>旗津區</h2>
              <p>旗津老街 </p>
            </div>
          </div>
        </div>
        <div>
          <div className={styles['container-6']}>
            <img src="/images/food/箭頭標示.svg" />
            <div className={styles['text-container']}>
              <h2>前鎮區</h2>
              <p>凱旋夜市</p>
            </div>
          </div>
        </div>
        <div>
          <div className={styles['container-7']}>
            <img src="/images/food/箭頭標示.svg" />
            <div className={styles['text-container']}>
              <h2>鳳山區</h2>
              <p>
                鳳山青年夜市、
                <br />
                鳳山自強夜市
              </p>
            </div>
          </div>
        </div>
        <div>
          <div className={styles['container-8']}>
            <img src="/images/food/箭頭標示.svg" />
            <div className={styles['text-container']}>
              <h2>鳥松區</h2>
              <p>鳥松夜市</p>
            </div>
          </div>
        </div>
        <div>
          <div className={styles['container-9']}>
            <img src="/images/food/箭頭標示.svg" />
            <div className={styles['text-container']}>
              <h2>三民區</h2>
              <p>
                後驛商圈、
                <br />
                大連商圈、吉林夜市
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default MapQueryTitle
