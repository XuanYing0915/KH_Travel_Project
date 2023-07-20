import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'


//載入資料測試
import LoveIcon from './love-icon'
import NoLoveIcon from './nolove-icon'
import CartIcon from './crat-icon'

// 目前尚未解決問題:
// 1.如何丟出json檔案給外部檔案->先抓出並顯示預備丟出資料 V
// 2.card hover-> img 放大   V
// 3.更改RWD樣式    缺1000下
// 4.丟資料態    V

export default function commonCard2({ id, img_src = '', name = "", time = '', introduce = '', like = false, cart_src = '#', towheresrc = '#', status = 1 }) {

  const data = [{
    id: id,
    img_src: img_src,
    name: name,
    time: time,
    introduce: introduce,
    like: like,
    cart_src: cart_src,
    towheresrc: towheresrc,
    status: status,
  }]
  //收藏函式-------------------------
  const initState = data.map((v, i) => {
    return { ...v }
  })
  // 初始化定義狀態
  const [lovestate, setLoves] = useState(initState)
  console.log(initState)

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



  //RWD處理區-------------------------------
  // table->改成 row排列? 1排 4個->2個 尚未  
  /*RWD第二階段變化table 外部處理??? */

  // moible->縮成最小版本  尚未 
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
              style={{ textDecoration: 'none' }}
            >
              {/* 圖片框架 hover狀態變化*/}
              <div className={hover ? 'imgboxhover imgbox' : 'imgbox'}>
                <Image
                  src={img}
                  style={{ height: '100%', width: '100%' }}
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
                    {v.status > 2 ? (
                      <p className="font p p-st1">{v.time}</p>
                    ) : (
                      <p className="font p fontnull">1</p>
                    )}
                    {v.status > 1 ? (
                      <p className="font p p-st2">{v.introduce}</p>
                    ) : (
                      <p className="fontnull">1</p>
                    )}
                  </div>
                  {/* 右側icon 左+右*/}
                  <div className="iconblock">
                    {/* icon1  缺點擊收藏功能(先切換圖案)*/}
                    {v.status < 4 ? (
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
                    {v.status > 3 ? (
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
    </>
  )
}
