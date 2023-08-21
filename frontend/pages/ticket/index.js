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
// Import AOS styles
import AOS from 'aos'
import 'aos/dist/aos.css'
import 'animate.css'

export default function index() {

  // 剩下CSS未弄 swiper   swiper(商品頁)想改成 依照螢幕寬度 變成3->1 這樣 導覽頁想加個文字
  // 手機板的金額塞選改用拉條(先預設沒有)
  //特殊功能 目前可運行-->尚未與導覽頁+商品頁相連及變更價格 --最後動畫(點開按鈕後從按鈕那移動到固定位置 結束後收回)
  // 動畫美化 AOS 看景點 V 換頁沒效果

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
    if (typeof window !== 'undefined') {
      AOS.init()
    }
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
