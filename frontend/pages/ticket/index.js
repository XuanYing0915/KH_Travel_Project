import React, { useEffect, useState, useContext } from 'react'
import Search from '@/components/ticket/index-use/search'
import { useAuthJWT } from '@/hooks/use-auth-jwt' // 0815引用JWT認證
import { Swiper, SwiperSlide } from 'swiper/react'
// Import Swiper styles
import 'swiper/css'
import 'swiper/css/effect-fade'
import 'swiper/css/pagination'
// import required modules
import { Autoplay, EffectFade, Pagination } from 'swiper/modules'

//全域鉤子
import { CartContext } from '@/components/hotel/CartContext'

export default function index() {
  //特殊功能 目前可運行-->導覽頁已連結(OK)+商品頁未連--最後動畫(點開按鈕後從按鈕那移動到固定位置 結束後收回)

  // 動畫美化 AOS 看景點 V 換頁沒效果-->詳細頁的有點問題
  
  
  //like-collect元件 沒會員的點擊 改成有效果的-->等做好
  //價格按鈕change->改onclick或確認
  //loading動畫
  //點選各類搜索->1秒加載動畫 再出現

  //會員狀態
  const { authJWT } = useAuthJWT()
  const numberid = authJWT.userData.member_id
  // console.log('numberid:',numberid)
  //save orange data
  const [orangeData, setOrangeData] = useState([])
  const [orangeClass, setOrangeClass] = useState([])
  //用來確保資料有無取得再處理後續函式
  const [dataLoaded, setDataLoaded] = useState(false) 

  //全域鉤子 類別優惠=('null')
  const { discount, setDiscount } = useContext(CartContext)

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
      setDataLoaded(true) // 確認收到資料，設定為true開始確認價格變更

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

  // get luckPrice function
  const luckprice = (data, discount) => {
    // console.log('重新渲染' + discount)
    if (discount) {
      // console.log('第二次確認' + discount)
      const luck = data
      const luck_price = luck.map((v) => ({
        ...v,
        tk_price: v.tk_class_name.includes(discount)
          ? v.tk_price.map((price) => Math.floor(price * 0.9))
          : v.tk_price,
      }))
      setOrangeData(luck_price)
      // console.log('luck_price:', luck_price);
    } else {
      handleFetchData()
    }
  }

  useEffect(() => {
    // 這裡fetch資料
    handleFetchData()
    handleFetchClass()
  }, [authJWT.isAuth])
  // 優惠變化(1.discount變更時刷新 2.dataLoaded, discount 確保重刷頁面後的設定變化)
  useEffect(() => {
    luckprice(orangeData, discount)
  }, [discount])
  useEffect(() => {
    if (dataLoaded && discount) {
      luckprice(orangeData, discount)
    }
  }, [dataLoaded, discount])

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
