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
import Card2 from '@/components/common-card2/common-card2'

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
            marginBottom: '50px',
            marginTop:'100px'
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
          <div style={{ width: '160px' }}></div>
        </div>


        {/* <HomepageSlider /> */}

        {/* 2.熱門景點 */}
        <div
          style={{
            backgroundColor: '#0D5654',
            height: '-webkit-calc(100vh - 120px)',
            marginTop: '50px',
          }}
          id="homepage-2"
        >
          <div className="d-flex flex-row">
            <Card2
              id={1}
              img_src="溫迪.png"
              name="洲際飯店"
              like={false}
              towheresrc="/attraction/#"
              imgrouter="attraction"
            />
            <Card2
              id={2}
              img_src="溫迪.png"
              name="洲際飯店"
              like={false}
              towheresrc="/attraction/#"
              imgrouter="attraction"
            />
            <Card2
              id={3}
              img_src="溫迪.png"
              name="洲際飯店"
              like={false}
              towheresrc="/attraction/#"
              imgrouter="attraction"
            />
            <Card2
              id={4}
              img_src="溫迪.png"
              name="洲際飯店"
              like={false}
              towheresrc="/attraction/#"
              imgrouter="attraction"
            />
            <Card2
              id={5}
              img_src="溫迪.png"
              name="洲際飯店"
              like={false}
              towheresrc="/attraction/#"
              imgrouter="attraction"
            />
          </div>
        </div>

        {/* 3.天氣API */}

        {/* 4.卡片to各頁面 */}


      </main>

      <style global jsx>
        {`

          
          

          .slider-container {
            position: relative;
            width: 100%;
            overflow: hidden;
          }
          .slide-pic{
            object-fit: contain;
            object-position: 35% 40%;
          }

          .slick-prev{
            position:absolute;
            left:10%;
            {/* z-index:3; */}
          
          }
          .slick-next{
            position:absolute;
            right:10%;
            z-index:-3
          }
          .slick-slider{
            height:-webkit-calc(100vh - 120px);
            overflow:hidden
          }
          .slick-list{
            height:80%
          }

          .slick-dots{
            position:absolute;
            bottom:10%
          }
          .slide-pic img{
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
            right: 80px;
            animation: text1slidein 0s 3s 
          }
          #homepage-text2 {
            position: absolute;
            bottom: calc(35% - 70px);
            right: 80px;
          }
          @keyframes text1slidein{
            from{
              left: 100%;
            }
            to{
              left: 0%;
            }
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
