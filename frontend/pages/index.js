// pages/index.js
import { FaFacebook } from 'react-icons/fa'
import { FaTwitter } from 'react-icons/fa'
import { FaInstagram } from 'react-icons/fa'
import HomepageSlider from '@/components/homepage/homepage-slider'
import HomepageCardSlider from '@/components/homepage/homepage-card1-slider'
import Homecard2 from '@/components/homepage/homepage-card2'
import 'aos/dist/aos.css'
import 'animate.css'

export default function Home() {
  return (
    <div id="homepage">
      {/* 1. 輪播圖 */}
      <section id="homepage-1" className="d-flex flex-row ">
        {/*1-1.icon列  */}
        <div
          className="d-flex flex-column align-items-center justify-content-end"
          style={{ width: '160px', paddingBottom: '20vh' }}
        >
          <a href="#">
            <FaFacebook className="media-icon" />
          </a>
          <a href="#">
            <FaTwitter className="media-icon" />
          </a>
          <a href="#">
            <FaInstagram className="media-icon" />
          </a>
        </div>

        {/* 1-2 輪播圖 */}
        <div className="slider-container">
          {/* 1-2-1輪播圖 */}
          <HomepageSlider />
          {/* 1-2-2輪播圖文字 */}
          <span className="homepage-text" id="homepage-text1">
            在高雄
          </span>
          <span className="homepage-text" id="homepage-text2">
            盡情探索驚喜與美景
          </span>
        </div>

        {/* 1-3 */}
        <div style={{ width: '160px' }}></div>
      </section>

      {/* 2.熱門景點 */}
      <section id="homepage-2">
        {/* 2-1 Title */}
        <div className="flex-row page2-title ">
          {/* 2-1-1 背景圈圈 */}
          <div className="background-circles">
            <div>
              <div className="circle"></div>
              <div className="circle"></div>
              <div className="circle"></div>
            </div>
            <div>
              <div className="circle"></div>
              <div className="circle"></div>
              <div className="circle"></div>
            </div>
          </div>
          {/* 2-1-2 小標題 */}
          <p
            className="text-center text-secondary pt-5 mb-1 "
            id="homepage2-title1"
            style={{ textShadow: '0.1em 0.1em 0.1em #333' }}
          >
            POPULATION ATTRACTIONS
          </p>
          <h2
            className="text-center text-light fw-bold fs-1"
            id="homepage2-title2"
            style={{
              textShadow: '0.1em 0.1em 0.1em #333',
              letterSpacing: '3px',
            }}
          >
            熱門景點
          </h2>
        </div>

        {/* 2-2 輪播圖 */}
        <HomepageCardSlider />
      </section>

      {/* 3.天氣API */}

      {/* 4.卡片to各頁面 */}
      <section id="homepage-4">
        {/* 4-1 背景波浪 */}
        <div className="wave"></div>
        <div className="wave"></div>
        <div className="wave"></div>
        {/* 4-2 標題 */}
        <h2
          className="text-center text-primary fw-bold fs-1 py-5"
          id="homepage4-title"
          style={{
            letterSpacing: '3px',
            fontWeight: '900',
            fontFamily: 'Noto Sans TC',
          }}
        >
          開啟你的高雄之旅
        </h2>
        <div className=" card-container " style={{ textAlign: 'center' }}>
          <Homecard2
            id={1}
            img_src="美麗島.jpg"
            name="推薦行程"
            towheresrc="/attraction"
            imgrouter="attraction"
          />
          <Homecard2
            id={2}
            img_src="美麗島.jpg"
            name="美食小吃"
            towheresrc="/food/store-introduction"
            imgrouter="attraction"
          />
          <Homecard2
            id={3}
            img_src="美麗島.jpg"
            name="票券優惠"
            towheresrc="/ticket"
            imgrouter="attraction"
          />
          <Homecard2
            id={4}
            img_src="美麗島.jpg"
            name="溫馨住宿"
            towheresrc="/hotel/hotelSearch"
            imgrouter="attraction"
          />
        </div>
      </section>
    </div>
  )
}
