import React from 'react'
import IntroductionCard from '@/components/food/Introduction-card'
import MapQuery from '@/components/food/map-query'
import Title from '@/components/title'
import Pscall from '@/components/hotel/pscall'
import styles from '@/styles/food.module.scss'
export default function index() {
  const card = []
  for (let i = 0; i < 10; i++) {
    card.push(<IntroductionCard />)
  }
  return (
    <>
      {/* query-body */}
      <div className={styles['query-body']}>
        {/* 頁首空間 */}
        <div className={styles['head-space']}></div>

        {/* 互動式地圖 */}
        <MapQuery />

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

        {/* 商家查詢標題 */}
        <div className={styles['title']}>
          <Title title="商家查詢" style="title_box_dark" />
        </div>

        {/* 查詢框、卡片、分頁 */}
        <div>
          <div className="container">
            <Pscall />
          </div>
        </div>

        {/* 測試卡面 */}
        <div className="row d-flex justify-content-center">{card}</div>

        {/* 頁尾空間 */}
        <div className={styles['footer-space']}></div>
      </div>
    </>
  )
}
