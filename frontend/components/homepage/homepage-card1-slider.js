import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Homecard1 from '@/components/homepage/homepage-card1'
// import axios from 'axios'
import React, { useState, useEffect } from 'react'




export default function HomepageCardSlider() {
  const settings = {
    dots: true,

    infinite: true,
    speed: 1500,
    slidesToShow: 5,
    slidesToScroll: 3,

  }
  // const [card, setCard] = useState([])
  // const getRandomCards = (data, n) => {
  //   const allCards = [...data] // 複製一份原始的資料
  //   // 隨機排序
  //   allCards.sort(() => Math.random() - 0.5)
  //   const randomCards = allCards.slice(0, n)
  //   setCard(randomCards)
  // }

  // const fetchData = async () => {
  //   try {
  //     const response = await axios.get('http://localhost:3005/attraction')
  //     // 存入前端
  //     // setAttractions(response.data)
  //     // console.log('資料庫資料:', response.data)
  //     getRandomCards(response.data, 15)

  //   } catch (error) {
  //     console.error('錯誤:', error)
  //   }
  // }
  // useEffect(() => {

  //   fetchData()
  // }, [])
  // console.log(card)


  return (
    <>

      <Slider {...settings}>

        <div className='slide-pic' >
          <Homecard1
            id={1}
            img_src="美麗島.jpg"
            name="旗津星空隧道"
            like={false}
            towheresrc="/attraction#600001"
            imgrouter="attraction"
          />
        </div>
        <div className='slide-pic'>
          <Homecard1
            id={2}
            img_src="草神.jpg"
            name="蓮池潭"
            like={false}
            towheresrc="/attraction#600002"
            imgrouter="attraction"
          />
        </div>
        <div className='slide-pic'>
          <Homecard1
            id={3}
            img_src="高雄流行音樂中心.jpg"
            name="草衙飛行器館"
            like={false}
            towheresrc="/attraction#600003"
            imgrouter="attraction"
          />
        </div>
        <div className='slide-pic'>
          <Homecard1
            id={4}
            img_src="鍾離.jpg"
            name="夢時代購物中心"
            like={false}
            towheresrc="/attraction#600004"
            imgrouter="attraction"
          />
        </div>
        <div className='slide-pic'>
          <Homecard1
            id={5}
            img_src="流行音樂中心.png"
            name="旗津海灘"
            like={false}
            towheresrc="/attraction#600005"
            imgrouter="attraction"
          />
        </div>
        <div className='slide-pic'>
          <Homecard1
            id={6}
            img_src="草神.jpg"
            name="草衙古道"
            like={false}
            towheresrc="/attraction#600006"
            imgrouter="attraction"
          />
        </div>

      </Slider>
    </>

  )
}
