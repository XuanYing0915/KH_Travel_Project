import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useAuthJWT } from '@/hooks/use-auth-jwt' // 0815引用JWT認證


// 子元件
import Title from '@/components/title'
import DetailPage from '@/components/ticket/pd-use/detail-page'
import Card2 from '@/components/common-card2/common-card2'
import Float from '@/components/attraction/float-btn'

// 動畫美化 AOS 看景點 ==>這頁的文字位置和預設動畫不符合 想詢問如何在滑到更下方時才顯現(文字區)
// 查看jsdoc

export default function TicketProduct() {
  const [orangeData, setOrangeData] = useState({})
  const [relevantData, setRelevantData] = useState([])

  // console.log(relevantData)

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

  // function-------------------商品資料
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
          console.log('orangeData get data = ', res.data[0])
          handleFetchRelevantData(res.data[0].tk_class_name)
        })
    } catch (error) {
      console.error(error)
    }
  }
  // function-------------------相關前四
  const handleFetchRelevantData = async (tk_class_name) => {
    // const tk_class_name = ['展覽優惠', '親子遊玩']
    const data = { data: tk_class_name }

    fetch('http://localhost:3005/tk/relevant', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: { 'Content-type': 'application/json; charset=UTF-8' },
    })
      .then((v) => v.json())
      .then((data) => {
        console.log('Relevant:', data.data)
        data.data.forEach((v) => {
          if (numberid) {
            v.fk_member_id =
              v.fk_member_id && v.fk_member_id.includes(numberid) ? true : false
          } else {
            v.fk_member_id = false
          }
          v.tk_price = v.tk_price.map((v) => parseInt(v))
        })
        setRelevantData(data.data)
      })
      .catch((err) => {
        console.log(err.message)
      })
    // console.log('From severs data:', data.data)
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
  }, [router.isReady, orangeData.tk_id, authJWT.isAuth, numberid, router])
  // ^^^^^^^^^^^^^^^ isReady=true代表目前水合化(hydration)已經完成，可以開始使用router.query

  return (
    <>
      <div className="all-bg">
        <DetailPage props={orangeData} />

        {/* <!-- 相關推薦 --> */}
        <section className="sectionbg-recommend">
          <div className="container correlation-box">
            <Title title="相關推薦" style="title_box_dark" />
            <div className="pagecontent1">
              {relevantData.map((v) => (
                <div
                  data-aos="flip-left"
                  data-aos-easing="ease-out-cubic"
                  data-aos-duration="2000"
                  data-aos-anchor-placement="center-bottom"
                >
                  <Card2
                    key={v.tk_id}
                    id={v.tk_id}
                    img_src={v.tk_image_src[0]}
                    name={v.tk_name}
                    introduce={`最低${Math.min(...v.tk_price)}元`}
                    like={v.fk_member_id}
                    towheresrc={v.tk_id}
                    status={2}
                    imgrouter="ticket"
                    who={4}
                  // numberid={numberid}
                  />
                </div>
              ))}
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
