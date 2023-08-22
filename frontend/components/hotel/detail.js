import React, { useState, useEffect } from 'react'
import Weather from '@/components/hotel/weather'
import Link from 'next/link'
import AOS from 'aos' // 0820 動畫
import 'aos/dist/aos.css'
import 'animate.css'

export default function MyComponent({ data }) {
  // 圖片載入
  const img = `/images/hotel/${data.hotel_img}`

  // 動畫-----
  const [hasScrolledToPosition, setHasScrolledToPosition] = useState(false)

  // 設定滾動到指定位置後才觸發動畫
  const handleScroll = () => {
    const targetElement = document.getElementById('AOSid')
    if (targetElement) {
      const targetPosition = targetElement.getBoundingClientRect().top
      if (targetPosition <= window.innerHeight && !hasScrolledToPosition) {
        setHasScrolledToPosition(true)
        AOS.refresh() // 重新初始化 AOS，以應用動畫
      }
    }
  }

  // 初始話aos
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
          setHasScrolledToPosition(true)
        } else {
          setHasScrolledToPosition(false)
        }
      })
    }
    AOS.init()
    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <div className="detailHead">
      <div className="detailhotelname">
        <div style={{ display: 'flex' }}>
          <h2>{data.hotel_name}</h2>
        </div>
        <hr />
        <div className="detailinfomation">
          <div>
            <h4>地址 ｜ {data.hotel_address}</h4>
            <h4>電話 ｜ {data.hotel_tel}</h4>
            <h4>定價 ｜ TWD{data.hotel_price}</h4>
            <h4>
              設施 ｜ 健身中心 、室內游泳池、免費停車場 <br />
              &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
              &nbsp;家庭房、無障礙設施、SPA 及養生會館
            </h4>
            <Link href={`/hotel/room/${data.hotel_id}`}>
              <button className="reservebtm">預定客房</button>
            </Link>
          </div>
          <div className="imgframe">
            <img className="imgphoto" src={img} alt="" />
          </div>
        </div>
        <hr />
        <section className="detailsection">
          <div className="hotelIntroduce">
            <h4>飯店介紹</h4>
            <p className="text-p">{data.hotel_introduction}</p>
          </div>
        </section>
      </div>
      <div className="googleweather">
        <div
          data-aos="zoom-in-down"
          data-aos-easing="ease-out-cubic"
          data-aos-duration="1000"
          data-aos-anchor-placement="center-bottom"
        >
          <iframe
            src={`https://maps.google.com?output=embed&q=${data.hotel_address}`}
            frameborder="1"
            width="500"
            height="350"
          ></iframe>
        </div>
        <div
          data-aos="fade-up-left"
          data-aos-easing="ease-out-cubic"
          data-aos-duration="1000"
          data-aos-anchor-placement="center-bottom"
          className="weathersmall"
        >
          <Weather />
        </div>
      </div>
    </div>
  )
}
