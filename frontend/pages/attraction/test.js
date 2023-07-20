import React, { useEffect } from 'react'
import Swiper from 'swiper'
import Image from 'next/image'
import '../../node_modules/swiper/swiper-bundle.css'
import '../../node_modules/swiper/swiper-bundle.js'

export default function MyCarousel() {
  useEffect(() => {
    const swiper = new Swiper('.swiper', {
      // Optional parameters
      direction: 'vertical',
      loop: true,

      // If we need pagination
      pagination: {
        el: '.swiper-pagination',
      },

      // Navigation arrows
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },

      // And if we need scrollbar
      scrollbar: {
        el: '.swiper-scrollbar',
      },
    })
  }, [])

  return (
    <div className="swiper">
      <div className="swiper-wrapper">
        <div className="swiper-slide">
          <Image
            src={'/images/attraction/草神.jpg'}
            alt="草神"
            width={600} // 設定圖片的寬度
            height={400} // 設定圖片的高度
          />
        </div>
        <div className="swiper-slide">
          <Image
            src={'/images/attraction/草神.jpg'}
            alt="草神"
            width={600} // 設定圖片的寬度
            height={400} // 設定圖片的高度
          />
        </div>
        <div className="swiper-slide">
          <Image
            src={'/images/attraction/四神.jpg'}
            alt="草神"
            width={600} // 設定圖片的寬度
            height={400} // 設定圖片的高度
          />
        </div>
        <div className="swiper-slide">
          <Image
            src={'/images/attraction/溫迪.png'}
            alt="草神"
            width={600} // 設定圖片的寬度
            height={400} // 設定圖片的高度
          />
        </div>
      </div>

      <div className="swiper-pagination"></div>

      <div className="swiper-button-prev"></div>
      <div className="swiper-button-next"></div>

      <div className="swiper-scrollbar"></div>
    </div>
  )
}
