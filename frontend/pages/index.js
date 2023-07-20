// pages/index.js

import Link from 'next/link'
import Image from 'next/image'
import PlaceholderText from '@/components/common/placeholder-text'
import background from '@/public/images/index/高流.jpg'
import { FaFacebook } from 'react-icons/fa';
import { FaTwitter } from 'react-icons/fa';
import { FaInstagram } from 'react-icons/fa';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";




export default function Home() {
  const settings = {
    dots: true,
    fade: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  }
  return (
    <>
      <main style={{ marginTop: '90px' }}>

        <div className='d-flex flex-row' style={{ maxHeight: 'calc(100vh -120px)' }}>
          <div className='d-flex flex-column align-items-center justify-content-end' style={{ width: '160px', paddingBottom: '5px' }}>
            <a href="#"><FaFacebook className='media-icon' /></a>
            <a href="#"><FaTwitter className='media-icon' /></a>
            <a href="#"><FaInstagram className='media-icon' /></a>
          </div>
          <div className='homepage-pic'
            style={{ backgroundImage: `url(${background.src})` }} >
            <span className='homepage-text' id='homepage-text1'>在高雄</span>
            <span className='homepage-text' id='homepage-text2'>盡情探索驚喜與美景</span>
          </div>
          <div style={{ width: '160px' }}>
          </div>
        </div>
        <div className='container'>
          123
        </div>

        <Slider {...settings}>
          <div className='slide-pic' style={{height:'550px'}}>
            <img src="/images/index/高流.jpg" />
          </div>
          <div className='slide-pic'>
            <img src="images\index\高捷美麗島站.jpg" />
          </div>
          <div className='slide-pic'>
            <img src="images/index/河景.jpg" />
          </div>
        </Slider>


      </main>

      <style global jsx>
        {`
         .homepage-pic{
          position:relative;
          width: 100%;
          min-height: 70vh;
          overflow: hidden;
          
          background-repeat: no-repeat;
          background-size: cover;
          background-position: 35% 40%;
         }
         .homepage-text{
          background:white;
          padding-inline:20px;
          font-size:24px;
          font-weight:700;
         }
         #homepage-text1{
          position:absolute;
          bottom:35%;
          right:80px;
         }
         #homepage-text2{
          position:absolute;
          bottom:calc(35% - 70px);
          right:80px;
         }
         .slick-slide {
          height: auto; 
        }
        .slick-track {
          display: flex;
          flex-direction: row;
          flex-wrap: nowrap;
          align-items: stretch;
        }

        .media-icon{
          font-size:30px;
          color:#5F5F5F;
          margin-top:12px;
        }
        .media-icon:hover{
          
          color:#B1B1B1;
          
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
