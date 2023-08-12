import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Title from '@/components/title'

import DetailPage from '@/components/ticket/pd-use/detail-page'
import Card2 from '@/components/common-card2/common-card2'

//文字排版有誤 --->處理文字轉成陣列再用map轉成各個div  (1.空格或。做分割2.空白先去除用。分割)  V
// 輪播圖理解 X---->  V
// 個功能處理(本地端刪除函式未寫)
//問題 產品卡css 輪播圖css換另一種 說明文章太長，隱蔽部分

export default function TicketProduct() {
  const [orangeData, setOrangeData] = useState({})
  const [favoriteList, setFavoriteList] = useState([]) 



  //動態路由設定-------------------------------------------------------------  have a one bug just a reset page will crash because the page no data so need save the data in loaclstorage
  // 1. 從網址動態路由中得到pid(在router.query中的一個屬性pid)
  const router = useRouter()

  // function-------------------
  const handleFetchData = async (tk_id) => {
    try {
      fetch(`http://localhost:3005/tk/page/${tk_id}`)
        .then((v) => {
          return v.json()
        })
        .then((res) => {
          //處理資料 將內部price轉成數字
          // console.log('From severs data:', res.data[0])
          res.data[0].tk_price = res.data[0].tk_price.map((v) => parseInt(v))
          res.data[0].tk_product_id = res.data[0].tk_product_id.map((v) =>
            parseInt(v)
          )
          if (res.data[0].fk_member_id) {
            res.data[0].fk_member_id = res.data[0].fk_member_id.map((v) =>
              parseInt(v)
            )
          } else {
            res.data[0].fk_member_id=[]
          }
          setOrangeData(res.data[0])
          setFavoriteList(res.data[0].fk_member_id)
          // console.log('orangeData get data = ', res.data[0])

        })
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    // 要確定tkpd可以得到後，才向伺服器要求資料
    if (router.isReady) {
      const { tkpd } = router.query
      //  向伺服器要求資料
      if (tkpd) {
        handleFetchData(tkpd)
        // console.log('tkpd=',tkpd)
      }
      // console.log('OrangeData:', orangeData)
    }
  }, [router.isReady, orangeData.tk_id])
  // ^^^^^^^^^^^^^^^ isReady=true代表目前水合化(hydration)已經完成，可以開始使用router.query

  return (
    <>
      <div className='all-bg'>
        <DetailPage props={orangeData} favoriteList={favoriteList} />


        {/* <!-- 相關推薦 --> */}
        <section className='sectionbg-recommend'>
          <div className="container ">
            <Title title="相關推薦" style="title_box_dark" />
            <div className="row">
              <Card2
                id={1}
                img_src="Wl0quzCsyB.jpg"
                name="狗狗"
                introduce="目前我是一只狗狗 沒有壓力"
                like={false}
                towheresrc="#"
                status={2}
                imgrouter="ticket"
              />
              <Card2
                id={2}
                img_src="Wl0quzCsyB.jpg"
                name="狗狗"
                introduce="目前我是一只狗狗 沒有壓力"
                like={false}
                towheresrc="#"
                status={2}
                imgrouter="ticket"
              />
              <Card2
                id={3}
                img_src="Wl0quzCsyB.jpg"
                name="狗狗"
                introduce="目前我是一只狗狗 沒有壓力"
                like={false}
                towheresrc="#"
                status={2}
                imgrouter="ticket"
              />
              <Card2
                id={4}
                img_src="Wl0quzCsyB.jpg"
                name="狗狗"
                introduce="目前我是一只狗狗 沒有壓力"
                like={false}
                towheresrc="#"
                status={2}
                imgrouter="ticket"
              />
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
