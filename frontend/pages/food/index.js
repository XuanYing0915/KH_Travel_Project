import React, { useState, useEffect } from 'react'
import Title from '@/components/title'
import Pscall from '@/components/food/pscall'
import styles from '@/styles/food-query.module.scss'
import BgSlider from '@/components/food/bg-slider'
import AOS from 'aos'
import 'aos/dist/aos.css'
import 'animate.css'

export default function index() {
  //取得資料並每次都重新渲染

  useEffect(() => {
    if (typeof window !== 'undefined') {
      AOS.init({
        once: true, // 添加這個選項
      })
    }
  }, [])

  return (
    <>
      {/* query-body */}
      <div className={styles['query-body']}>
        {/* 頁首空間 */}
        <div className={styles['head-space']}></div>

        {/* 頁首輪播圖 */}
        <div
          className={styles['BgSlider']}
          data-aos="fade-down"
          data-aos-duration="1500"
        >
          <BgSlider />
        </div>
        <div
          className={styles['chicken']}
          style={{ opacity: 0.3 }}
          data-aos="fade-left"
          data-aos-anchor="#example-anchor"
          data-aos-offset="500"
          data-aos-duration="1000"
        >
          <img src="/images/food/養我.png" />
        </div>

        <div
          className={styles['boat']}
          // style={{ opacity: 0.3, transform: 'rotate(-10deg)' }}
          data-aos="fade-right"
          data-aos-anchor="#example-anchor"
          data-aos-offset="500"
          data-aos-duration="3000"
        >
          <img src="/images/food/小船.png" style={{ opacity: 0.3, transform: 'rotate(-10deg)' }} />
        </div>

        <div className={styles['query-bottom']}>
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
        </div>

        {/* 頁尾空間 */}
        <div className={styles['footer-space']}>
          <div className={styles['crocodile']}>
            <img src="/images/food/小鱷魚.png" />
          </div>
        </div>
      </div>
    </>
  )
}
