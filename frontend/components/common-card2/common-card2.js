import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import RWD from '../useRWD'

//載入資料測試
import data from '@/data/Ticket/common-card2.json'
import LoveIcon from './love-icon'
import NoLoveIcon from './nolove-icon'
import CartIcon from './crat-icon'

// 目前尚未解決問題:
// 1.如何丟出json檔案給外部檔案->先抓出並顯示預備丟出資料 V
// 2.card hover-> img 放大   V
// 3.更改RWD樣式

export default function commonCard2() {
  //收藏函式-------------------------
  const initState = data.data.map((v, i) => {
    return { ...v }
  })
  // 初始化定義狀態
  const [lovestate, setLoves] = useState(initState)

  const toggleFav = (id) => {
    const newlove = lovestate.map((v) => {
      if (v.id === id) return { ...v, like: !v.like }
      else return { ...v }
    })
    setLoves(newlove)
  }
  //收藏函式-------------------------

  //hover處理-------------------------------
  const [hover, setHover] = useState(false)
  const hoverchange = (hoverstate) => {
    setHover(hoverstate)
  }
  //hover處理-------------------------------

  //丟資料進購物車並顯示完成--->(暫無)
  //丟資料進購物車並顯示完成--->(暫無)

  //RWD處理區-------------------------------可以用接得值來用
  const screen = RWD()
  // 需求表
  // 1500-> 邊框縮小 字體變小             V
  /*RWD第一階段變化1500    
          padding: 20px 20px 9px 20px;
          p:16->12px
          h4:24->18px
          */

  // table->改成 row排列? 1排 4個->2個   V
  /*RWD第二階段變化table 外部處理 */

  // moible->縮成最小版本
  /*RWD第三階段變化moible 大改 */
  //RWD處理區-------------------------------
  return (
    <>
      {lovestate.map((v, i) => {
        // 圖片載入測試----------------(實際狀況要更改連結位置!!!!!!!!!!!!)
        const img = require(`@/public/images/ticket/${v.img_src}`)

        return (
          /* card本體 */
          <div
            className="commonCard2"
            key={v.id}
            //hover事件
            onMouseEnter={() => {
              hoverchange(true)
            }}
            onMouseLeave={() => {
              hoverchange(false)
            }}
          >
            <Link
              href={v.towheresrc}
              className="linkStyle"
              style={{ textDecoration: 'none' }}
            >
              {/* 圖片框架 hover狀態變化*/}
              <div className={hover ? 'imgboxhover ' : ''}>
                <Image
                  src={img}
                  style={{ height: '300px', width: '100%' }}
                  alt={v.name}
                />
              </div>

              {/* 下層文字框架及icon  上+下*/}
              <div className="textbox">
                {/* title */}
                <h4 className="font h4">{v.name}</h4>
                {/* 下層+icon  左+右*/}
                <div className="footer">
                  {/* 左側文字 上+下*/}
                  <div>
                    {/* 假設狀態為3.4--->不顯示但有高度 */}
                    {v.state > 2 ? (
                      <p className="font p p-st1">{v.time}</p>
                    ) : (
                      <p className="font p fontnull">1</p>
                    )}
                    {v.state > 1 ? (
                      <p className="font p p-st2">{v.introduce}</p>
                    ) : (
                      <p className="fontnull">1</p>
                    )}
                  </div>
                  {/* 右側icon 左+右*/}
                  <div className="iconblock">
                    {/* icon1  缺點擊收藏功能(先切換圖案)*/}
                    {v.state < 4 ? (
                      <button
                        className="buttonStyle"
                        onClick={(e) => {
                          e.preventDefault() //阻止氣泡事件
                          toggleFav(v.id)
                        }}
                      >
                        {v.like ? <LoveIcon /> : <NoLoveIcon />}
                      </button>
                    ) : (
                      ''
                    )}
                    {/* icon2 點擊將資料丟出給購物車頁面 測試中 */}
                    {v.state > 3 ? (
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
            max-width: 360px;
            max-height: 480px;
            box-shadow: 4px 4px 4px 0px rgba(0, 0, 0, 0.25),
              -4px 0px 4px 0px rgba(0, 0, 0, 0.25);
            border-radius: 5px;
            border: 1px solid #bababa;
            background: #fff;
            padding: ${screen === 'pc'
              ? '30px 30px 15px 30px'
              : '20px 20px 9px 20px'};
            margin: 15px;
            overflow: hidden;
          }

          .imgboxhover {
            transform: scale(1.4, 1.15) translateY(-10px);
            border-radius: 5px;
          }
          .textbox {
            margin: 15px 0px 0 0px;
          }
          .footer {
            display: flex;
            justify-content: space-between;
          }
          .iconblock {
            display: flex;
            align-items: flex-end;
            gap: 10px;
          }
          .fontnull {
            visibility: hidden;
          }

          .h4 {
            color: #0d5654;
            font-size: ${screen === 'pc' ? '24' : '20'}px;
            letter-spacing: 4.8px;
          }
          .font {
            font-family: Hanuman;
            font-weight: 700;
          }
          .p {
            margin: 15px 0 0 0;
            font-size: ${screen === 'pc' ? '16' : '14'}px;
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
