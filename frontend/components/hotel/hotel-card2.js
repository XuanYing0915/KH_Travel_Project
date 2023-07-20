import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

//載入資料測試
import data from '@/data/Ticket/common-card2.json'
import LoveIcon from './love'
import NoLoveIcon from './nolove'
import CartIcon from './crat-icon'

// 目前尚未解決問題:
// 2.如何丟出json檔案給外部檔案->先抓出並顯示預備丟出資料 V
// 3.card hover-> img 放大
// 4.上述解決後 用狀態更改顯示 需求 4
// 5.更改RWD樣式

//目前狀態1 :左三 右0   2: 左三 右2    1  2 以好

export default function hotelCard2({v}) {
  //收藏函式-------------------------
  const initState = data.data.map((v, i) => {
    return { ...v }
  })

  // 初始化定義狀態
  const [lovestate, setLoves] = useState(initState)

  const toggleFav = (hotel_id) => {
    const newlove = lovestate.map((v) => {
      if (v.hotel_id === hotel_id) return { ...v, like: !v.like }
      else return { ...v }
    })
    setLoves(newlove)
  }
  //收藏函式-------------------------

  //丟資料進購物車並顯示完成

  return (
    <>
      {lovestate.map((v, i) => {
        // 圖片載入測試
        const img = require(`@/assets/Wl0quzCsyB.jpg`)

        return (
          /* card本體 */
          <div className="commonCard2 my-3" key={v.hotel_id}>
            <Link
              href={v.towheresrc}
              className="linkStyle"
              style={{ textDecoration: 'none' }}
            >
              {/* 圖片框架 */}
              <div className="imgBox">
                <Image
                  src={img}
                  style={{ height: '315px', width: '100%' }}
                  alt={v.hotel_name}
                />
              </div>

              {/* 下層文字框架及icon  上+下*/}
              <div>
                {/* title */}
                <h4 className="fontst h4">{v.hotel_name}</h4>
                {/* 下層+icon  左+右*/}
                <div className="footer">
                  {/* 左側文字 上+下*/}
                 
                  {/* 右側icon 左+右*/}
                  <div className="iconblock">
                    {/* icon1  缺點擊收藏功能(先切換圖案)*/}
                    {v.state === 2 ?(
                    <button
                      className="buttonStyle"
                      onClick={(e) => {
                        e.preventDefault() //阻止氣泡事件
                        toggleFav(v.hotel_id)
                      }}
                    >
                      {v.like ? <LoveIcon /> : <NoLoveIcon />}
                    </button>
                    ):('')}
                    {/* icon2 點擊將資料丟出給購物車頁面 測試中 */}
                    {v.state === 2 ? (
                      <button
                        className="buttonStyle"
                        onClick={(e) => {
                          e.preventDefault()
                          lovestate.map((v) => {
                            // console.log(v)
                          })
                        }}
                      >
                        <CartIcon />
                      </button>
                    ) : (
                      ''
                    )}
                  </div>
                </div>
              </div>
            </Link>
          </div>
        )
      })}

      <style jsx>
        {`
          .commonCard2 {
            aspect-ratio: 3 / 4;
            width:360px;
            box-shadow: 4px 4px 4px 0px rgba(0, 0, 0, 0.25),
              -4px 0px 4px 0px rgba(0, 0, 0, 0.25);
            border-radius: 5px;
            border: 1px solid #bababa;
            background: #fff;
            padding:0px
          }

          .imgBox {
            margin: 30px 30px 15px 30px;
          }
          .footer {
            display: flex;
            justify-content: space-between;
            margin: 0 30px 15px 30px;
          }
          .iconblock {
            display: flex;
            align-items: flex-end;
            gap: 10px;
          }
          .fontst {
            font-family: Hanuman;
            font-weight: 700;
          }
          .h4 {
            margin: 0 30px 0 30px;
            color: #0d5654;
            font-size: 24px;
            letter-spacing: 4.8px;
          }
          .p {
            margin: 15px 0 0 0;
            font-size: 16px;
            letter-spacing: 3.2px;
          }
          .p-st1 {
            color: #f09f03;
          }
          .p-st2 {
            color: #7fb8b6;
          }
          .buttonStyle {
            border: 0;
            background: transparent;
          }
        `}
      </style>
    </>
  )
}
