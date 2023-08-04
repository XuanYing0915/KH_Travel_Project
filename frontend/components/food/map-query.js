import styles from './map-query.module.scss'
import KaohsiungMap from '@/components/food/Kaohsiung-map'

import React from 'react'

export default function MapQueryTitle() {
  return (
    <>
      <div className={styles['map-query']}>
        {/* 高雄市地圖 */}
        <div className={styles['map']}>
          <KaohsiungMap />
        </div>
        {/* ====== */}

        {/* 箭頭區域標題 */}
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
        {/* ====== */}
      </div>
    </>
  )
}
