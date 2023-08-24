import React, { useState, useEffect } from 'react'
import Title from '@/components/title'
import Pscall from '@/components/food/pscall'

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
      <div className="food-query-body">
        {/* 頁首空間 */}
        <div className="head-space"></div>

        {/* 頁首輪播圖 */}
        <div className="BgSlider" data-aos="fade-down" data-aos-duration="1500">
          <BgSlider />
        </div>
        <div
          className="chicken"
          style={{ opacity: 0.3 }}
          data-aos="fade-left"
          data-aos-anchor="#example-anchor"
          data-aos-offset="500"
          data-aos-duration="1000"
        >
          <img src="/images/food/養我.png" />
        </div>

        <div
          className="boat"
          data-aos="fade-right"
          data-aos-anchor="#example-anchor"
          data-aos-offset="500"
          data-aos-duration="3000"
        >
          <img
            src="/images/food/小船.png"
            style={{ opacity: 0.3, transform: 'rotate(-10deg)' }}
          />
        </div>

        {/* 商家查詢標題 */}
        <div className="food-title">
          <Title title="商家查詢" style="title_box_dark" />
        </div>

        {/* 查詢框、卡片、分頁 */}
        <div className="container">
          <Pscall />
        </div>

        {/* 頁尾空間 */}
        <div className="footer-space">
          <div className="crocodile">
            <img src="/images/food/小鱷魚.png" />
          </div>
        </div>
      </div>
    </>
  )
}
