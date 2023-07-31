// pages/index.js

import Link from 'next/link'
import Image from 'next/image'
import PlaceholderText from '@/components/common/placeholder-text'
import background from '@/public/images/index/高流.jpg'
import { FaFacebook } from 'react-icons/fa'
import { FaTwitter } from 'react-icons/fa'
import { FaInstagram } from 'react-icons/fa'
// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
import HomepageSlider from '@/components/homepage/homepage-slider'
import Homecard1 from '@/components/homepage/homepage-card1'
import HomepageCardSlider from '@/components/homepage/homepage-card1-slider'

export default function Home() {

  return (
    <>
      <main style={{ marginBlock: '90px' }}>
        {/* 1. 輪播圖 */}
        <div
          className="d-flex flex-row "
          style={{
            height: '-webkit-calc(100vh - 120px)',
            marginBottom: '10px',
            marginTop: '100px'
          }}
          id="homepage-1"
        >
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

          {/* 1-2. 輪播圖 */}
          <div className="slider-container" >
            <HomepageSlider
            />
            <span className="homepage-text" id="homepage-text1">
              在高雄
            </span>
            <span className="homepage-text" id="homepage-text2">
              盡情探索驚喜與美景
            </span>
          </div>

          {/* 1-3 */}
          <div style={{ width: '160px' }}></div>
        </div>


        {/* 2.熱門景點 */}
        <div
          style={{
            backgroundColor: '#0D5654',
            height: '-webkit-calc(100vh - 80px)',

          }}
          id="homepage-2"

        >
          {/* 2-1 Title */}
          <div className="flex-row page2-title ">
            <div className='background-circles'>
              <div>
                <div className='circle'></div>
                <div className='circle'></div>
                <div className='circle'></div>
              </div>
              <div>
                <div className='circle'></div>
                <div className='circle'></div>
                <div className='circle'></div>
              </div>
            </div>
            <p className='text-center text-secondary pt-5 mb-1' id='homepage2-title1'>POPULATION ATTRACTIONS</p>
            <p className='text-center text-light fw-bolder fs-1'  id='homepage2-title2'>熱門景點</p>
          </div>

          {/* 2-3 輪播圖 */}
          <HomepageCardSlider />

        </div>

        {/* 3.天氣API */}

        {/* 4.卡片to各頁面 */}


      </main>

      <style global jsx>
        {`

        `}
      </style>
    </>
  )
}
