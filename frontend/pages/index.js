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
  const settings = {
    dots: true,
    fade: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  }
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
            <HomepageSlider />
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
            <p className='text-center text-secondary pt-5 mb-1' >POPULATION ATTRACTIONS</p>
            <p className='text-center text-light fw-bolder fs-1' style={{ letterSpacing: '4px' }}>熱門景點</p>
          </div>
          
          {/* 2-3 輪播圖 */}
          <HomepageCardSlider />
          
        </div>

        {/* 3.天氣API */}

        {/* 4.卡片to各頁面 */}


      </main>

      <style global jsx>
        {`
          #homepage-1 .slider-container {
            position: relative;
            width: 100%;
            overflow: hidden;
          }
          #homepage-1 .slide-pic{
            object-fit: contain;
            object-position: right bottom
          }

          {/* #homepage-1 .slick-prev{
            position:absolute;
            left:10%;
            z-index:3;
          
          }
          #homepage-1 .slick-next{
            position:absolute;
            right:10%;
            z-index:-3
          } */}
          #homepage-1 .slick-slider{
            height:-webkit-calc(100vh - 120px);
            overflow:hidden
          }
          #homepage-1 .slick-list{
            height:85%
          }

          #homepage-1 .slick-dots{
            position:absolute;
            bottom:7%
          }
          #homepage-1 .slide-pic img{
            width:100%;
            height:100%;
            object-fit:cover
          }

          .homepage-text {
            background: white;
            padding-inline: 20px;
            font-size: 24px;
            font-weight: 700;
          }

          #homepage-text1 {
            position: absolute;
            bottom: 35%;
            
            animation: text-slidein 0.8s  ease-in forwards;
          }
          #homepage-text2 {
            position: absolute;
            bottom: calc(35% - 70px);
            
            animation: text-slidein 1s  ease-in forwards;
          }
          @keyframes text-slidein{
            from{
              opacity:0.3;
              right: 0%;
            }
            to{
              opacity:1;
              right: 80px;
            }
          }
          .background-circles{
            position:absolute;
            top:30px;
            left:-30px
          }
          .circle{
            background-color:white;
            width:60px;
            height:60px;
            border-radius:50%;
            display:inline-block;
            margin:10px;
          }
          #homepage-2{
            position:relative
          }

          #homepage-2 .slick-prev{
            position:absolute;
            left:38%;
            width:50px;
            height:50px;
            background-color:#bf1111;
            z-index:3;
          
          }
          #homepage-2 .slick-next{
            position:absolute;
            right:38%;
            width:50px;
            height:50px;
            background-color:#bf1111;
            z-index:3;
          }
          #homepage-2 .slick-dots{
            visibility:hidden
          }

          .media-icon {
            font-size: 30px;
            color: #5f5f5f;
            margin-top: 12px;
          }
          .media-icon:hover {
            color: #b1b1b1;
          }

          .card-cover {
            background-repeat: no-repeat;
            background-position: center center;
            background-size: cover;
          }

          .text-shadow-1 {
            text-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.25);
          }
          .text-shadow-2 {
            text-shadow: 0 0.25rem 0.5rem rgba(0, 0, 0, 0.25);
          }
          .text-shadow-3 {
            text-shadow: 0 0.5rem 1.5rem rgba(0, 0, 0, 0.25);
          }
        `}
      </style>
    </>
  )
}
