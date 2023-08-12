import React, { useEffect, useState } from 'react'
// import Title from '@/components/title'
// import Card2 from '@/components/common-card2/common-card2'
import Search from '@/components/ticket/index-use/search'

import { Swiper, SwiperSlide } from 'swiper/react'
// Import Swiper styles
import 'swiper/css'
import 'swiper/css/effect-fade'
import 'swiper/css/pagination'
// import required modules
import { Autoplay, EffectFade, Pagination } from 'swiper/modules'

export default function index() {
  // 目前問題 5.卡片微調



  const member = 900007


  // // save orange data
  const [orangeData, setOrangeData] = useState([])
  const [orangeClass, setOrangeClass] = useState([])


  //from server get card data
  const handleFetchData = async () => {
    try {
      const res = await fetch(`http://localhost:3005/tk`)
      const data = await res.json()
      // 處理會員收藏狀態    假定會員名稱=('900007') 後續抓會員設定值
      data.data.forEach((v) => {
        if (member) {
          v.fk_member_id =
            v.fk_member_id && v.fk_member_id.includes(member) ? true : false
        }else{
          v.fk_member_id = false
        }
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

  //假定會員狀態被更新
  // useEffect(() => {
  //   // 這裡fetch資料
  //   handleFetchFavorite()
  // }, [member])


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
        <Swiper
          spaceBetween={1000}
          speed={100}

          effect={'fade'}
          centeredSlides={true}
          // autoplay={{
          //   delay: 0,
          //   disableOnInteraction: false,
          // }}
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

        {/* 下方搜索框 */}
        <div className="container">
          <Search data={orangeData} tagclass={orangeClass} />
        </div>

        {/* <div className="row d-flex justify-content-center">{cardList}</div> */}
      </div>
    </>
  )
}
