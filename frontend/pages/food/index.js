import React, { useState, useEffect } from 'react'
import Title from '@/components/title'
import Pscall from '@/components/food/pscall'

import BgSlider from '@/components/food/bg-slider'
import AOS from 'aos'
import 'aos/dist/aos.css'
import 'animate.css'

export default function index() {
  
const [isLoading, setIsLoading] = useState(true); // 等待資料時顯示動畫

useEffect(() => {
  setTimeout(() => {
    setIsLoading(false);
  }, 1000);
}, []);

  //取得資料並每次都重新渲染

  useEffect(() => {
    if (typeof window !== 'undefined') {
      AOS.init({
        once: true, // 添加這個選項
      })
    }
  }, [])

  
  if (isLoading) {
    return (
      <div className="a-loading">
        <img src="/images/logo.png" />
      </div>
    )
  }

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
        <div className="chicken">
          <img src="/images/food/養我.png" />
        </div>

        <div className="boat">
          <img src="/images/food/小船.png" />
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
