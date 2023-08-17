import React from 'react'
// import MapQuery from '@/components/food/map-query'
import Title from '@/components/title'
import Pscall from '@/components/food/pscall'
import styles from '@/styles/food-query.module.scss'
export default function index() {

  return (
    <>
      {/* query-body */}
      <div className={styles['query-body']}>
        {/* 頁首空間 */}
        <div className={styles['head-space']}></div>

        {/* 互動式地圖 */}
        {/* <MapQuery /> */}

        {/* 可愛圖片 */}
        <div className={styles['cute-pictures']}>
          <div className={styles['boat']}>
            <img src="/images/food/小船.png" />
          </div>
          <div className={styles['crocodile']}>
            <img src="/images/food/小鱷魚.png" />
          </div>
          <div className={styles['chicken']}>
            <img src="/images/food/養我.png" />
          </div>
        </div>

        <div className={styles['query-bottom']}>
          {/* 商家查詢標題 */}
          <div className={styles['title']}>
            <Title title="商家查詢" style="title_box_dark" />
          </div>

          {/* 查詢框、卡片、分頁 */}
          <div>
            <div className="container">
              <Pscall  />
            </div>
          </div>
        </div>

        {/* 頁尾空間 */}
        <div className={styles['footer-space']}></div>
      </div>
    </>
  )
}
