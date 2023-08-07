import React, { useEffect, useState } from 'react'
// import Title from '@/components/title'
// import Card2 from '@/components/common-card2/common-card2'
import Search from '@/components/ticket/search'

import { Swiper, SwiperSlide } from 'swiper/react'
// Import Swiper styles
import 'swiper/css'
import 'swiper/css/effect-fade'
import 'swiper/css/pagination'
// import required modules
import { Autoplay, EffectFade, Pagination } from 'swiper/modules'




export default function index() {
  // // save orange data
  const [orangeData, setOrangeData] = useState([])
  const [orangeClass, setOrangeClass] = useState([])

  //from server get card data
  const handleFetchData = async () => {
    try {
      const res = await fetch(`http://localhost:3005/tk`)
      const data = await res.json()
      // //處理會員收藏狀態    假定會員名稱=('aaa') 後續抓會員設定值
      data.data.forEach((v) => {
        v.fk_member_id =
          v.fk_member_id && v.fk_member_id.includes('aaa') ? true : false
      })
      setOrangeData(data.data)
      console.log('From severs data:', data.data)
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }
  //from server get classlist data
  const handleFetchClass = async () => {
    const res = await fetch(`http://localhost:3005/tk/class`)
    const data = await res.json()
    const orangeClassobj = data.data
    let classlist = []
    for (let i = 0; i < orangeClassobj.length; i++) {
      classlist[i] = orangeClassobj[i]['tk_class_name']
    }
    // console.log('From severs classdata:', data.data)
    // console.log('classlist:',classlist)
    setOrangeClass(classlist)
  }

  useEffect(() => {
    // 這裡fetch資料
    handleFetchData()
    handleFetchClass()
  }, [])

  //封面照片輪替OK 缺圖片--------------------------------------------
  const imgtag = [
    'nature-1.jpg',
    'nature-2.jpg',
    'nature-3.jpg',
    'nature-4.jpg',
  ]

  return (
    <>
      <div className="ticket">
        <div className="container">
          <Swiper
            spaceBetween={30}
            effect={'fade'}
            centeredSlides={true}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
            }}
            modules={[Autoplay, EffectFade, Pagination]}
            className="mySwiper"
          >
            {/* 圖片替換區 */}
            {imgtag.map((v, i) => {
              return (
                <SwiperSlide key={i}>
                  <img src={`https://swiperjs.com/demos/images/${v}`} />
                </SwiperSlide>
              )
            })}
          </Swiper>
        </div>

        {/* 下方搜索框 */}
        <div className="divsearch">
          <Search data={orangeData} tagclass={orangeClass}  />
        </div>

        {/* <div className="row d-flex justify-content-center">{cardList}</div> */}
      </div>
    </>
  )
}
