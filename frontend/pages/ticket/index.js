import React, { useEffect, useState } from 'react'
import Search from '@/components/ticket/index-use/search'
import { useAuthJWT } from '@/hooks/use-auth-jwt' // 0815引用JWT認證

import { Swiper, SwiperSlide } from 'swiper/react'
// Import Swiper styles
import 'swiper/css'
import 'swiper/css/effect-fade'
import 'swiper/css/pagination'
// import required modules
import { Autoplay, EffectFade, Pagination } from 'swiper/modules'

export default function index() {
  // 目前問題
  // 1.1920-1200-800 完成 V
  // 2.收藏判斷完成 V
  // 3.swiper圖片未處理
  // 4.手機板CSS  800下手機未完成  -->分類表做好 價格排序完成 最下層分頁需套用新的V
  // 兩項目CSS未弄
  // 動畫美化

  //會員狀態
  const { authJWT } = useAuthJWT()
  const numberid = authJWT.userData.member_id
  // console.log('numberid:',numberid)
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
        if (numberid) {
          v.fk_member_id =
            v.fk_member_id && v.fk_member_id.includes(numberid) ? true : false
        } else {
          v.fk_member_id = false
        }
        v.tk_price = v.tk_price.map((v) => parseInt(v))
      })
      setOrangeData(data.data)
      // console.log('From severs data:', data.data)
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
  }, [authJWT.isAuth])


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
          effect={'fade'}
          centeredSlides={true}
          autoplay={{
            delay: 3000,
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

        {/* 下方搜索框 */}
        <div className="container">
          <Search
            data={orangeData}
            tagclass={orangeClass}
            numberid={numberid}
          />
        </div>

        {/* <div className="row d-flex justify-content-center">{cardList}</div> */}
      </div>
    </>
  )
}
