import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useAuthJWT } from '@/hooks/use-auth-jwt' // 0815引用JWT認證
import { usePathname } from 'next/navigation'

// 子元件
import Title from '@/components/title'
import DetailPage from '@/components/ticket/pd-use/detail-page'
import Card2 from '@/components/common-card2/common-card2'
import Float from '@/components/attraction/float-btn'

// 輪播圖理解 X---->  V (缺部分處理)
// pd card V
// 產品卡往下塞(換位置) V (滾動有問題)
// 下部框架CSS V
// 浮動框架加入 > 原收藏刪除 > 判斷收藏中 V
// 手機板
// 問題 產品卡css(1000以下調整) 說明文章太長，隱蔽部分
// 動畫美化

export default function TicketProduct() {
  const [orangeData, setOrangeData] = useState({})




  const pathname = usePathname()
  console.log(pathname)




  
  // 先抓到會員狀態
  const { authJWT } = useAuthJWT()
  const numberid = authJWT.userData.member_id
  // 預設收藏初始值
  let like = false
  // 判斷有無包含在陣列中
  if (orangeData.fk_member_id) {
    like = orangeData.fk_member_id.includes(numberid)
  }
  //判斷結束

  //動態路由設定-------
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
            res.data[0].fk_member_id = []
          }
          setOrangeData(res.data[0])
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
  }, [router.isReady, orangeData.tk_id, authJWT.isAuth])
  // ^^^^^^^^^^^^^^^ isReady=true代表目前水合化(hydration)已經完成，可以開始使用router.query

  return (
    <>
      <div className="all-bg">
        <DetailPage props={orangeData} />

        {/* <!-- 相關推薦 --> */}
        <section className="sectionbg-recommend">
          <div className="container correlation-box">
            <Title title="相關推薦" style="title_box_dark" />
            <div className="pagecontent">
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
        <Float
          love={like} //收藏狀態
          path={'ticket'} //首頁link
          id={orangeData.tk_id} //票卷id
          memberId={numberid} //會員id
          dataBaseTableName={'tk'} //收藏用的資料表名稱
        />
      </div>
    </>
  )
}
