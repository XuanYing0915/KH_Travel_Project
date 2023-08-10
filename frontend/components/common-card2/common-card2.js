import { useState } from 'react'
import Link from 'next/link'

//載入資料測試
import LoveIcon from './love-icon'
import NoLoveIcon from './nolove-icon'
import CartIcon from './crat-icon'

// 目前尚未解決問題:
// 1.如何丟出json檔案給外部檔案->先抓出並顯示預備丟出資料 V
// 2.尚未加入新版的收藏函式
// 3.更改RWD樣式    缺1000下

export default function commonCard2({
  id = 1,
  img_src = '',
  name = '',
  time = 'error',
  introduce = 'error',
  like = false,
  cart_src = '#',
  towheresrc = '#',
  status = 1,
  imgrouter = '',
  member_id = '', //08/09新增
}) {
  // img router
  const img = `/images/${imgrouter}/${img_src}`

  //收藏函式------------------------- 若加入新的 此區砍掉
  // 初始化定義狀態
  const [lovestate, setLoves] = useState(like)
  //切換函式
  const toggleFav = (clickid) => {
    if (id === clickid) {
      setLoves(!lovestate)
    }
  }
  // 收藏丟資料庫(一半)
  // const likesave = (lovestate) => {
  //   if (lovestate) {

  //   } else {
  //   }
  // }
  //收藏函式-------------------------

  //hover處理-------------------------------
  const [hover, setHover] = useState(false)
  const hoverchange = (hoverstate) => {
    setHover(hoverstate)
  }
  //hover處理-------------------------------

  //丟資料進購物車並顯示完成--->(暫無)

  //RWD處理區-------------------------------
  // table->改成 row排列? 1排 4個->2個 尚未
  /*RWD第二階段變化table 外部處理??? */
  // moible->縮成最小版本  尚未
  /*RWD第三階段變化moible 大改 */
  //RWD處理區-------------------------------
  return (
    <>
      {/* card本體 */}
      <div
        className="commonCard2"
        key={id}
        //hover事件
        onMouseEnter={() => {
          hoverchange(true)
        }}
        onMouseLeave={() => {
          hoverchange(false)
        }}
      >
        <Link
          href={`/${imgrouter}/${towheresrc}`}
          style={{ textDecoration: 'none' }}
        >
          {/* 圖片框架 hover狀態變化*/}
          <div className={hover ? 'imgboxhover imgbox' : 'imgbox'}>
            <img
              src={img}
              style={{ height: '100%', width: '100%' }}
              alt={name}
            />
          </div>

          {/* 下層文字框架及icon  上+下*/}
          <div className="textbox">
            {/* title */}
            <h4 className={status > 1 ? 'font h4' : 'font h4 text-center'}>
              {name}
            </h4>
            {/* 下層+icon  左+右*/}
            <div className="card2down">
              {/* 左側文字 上+下*/}
              <div>
                {/* 假設狀態為3.4--->不顯示但有高度 */}
                {status > 2 ? (
                  <p className="font p p-st1">{time}</p>
                ) : (
                  // <p className="font p fontnull">1</p>
                  ''
                )}
                {status > 1 ? (
                  <p className="font p p-st2">{introduce}</p>
                ) : (
                  <p className="fontnull">1</p>
                )}
              </div>
              {/* 右側icon 左+右*/}
              <div className="iconblock">
                {/* icon1  缺點擊收藏功能(先切換圖案)*/}
                {status < 4 ? (
                  //-----------------------------------------收藏紐 若有則變成子元件08/09
                  <button
                    className="buttonStyle"
                    onClick={(e) => {
                      e.preventDefault() //阻止氣泡事件
                      toggleFav(id)
                    }}
                  >
                    {lovestate ? <LoveIcon /> : <NoLoveIcon />}
                  </button>
                ) : (
                  //------------------------------------------
                  ''
                )}
                {/* icon2 點擊將資料丟出給購物車頁面 測試中 */}
                {status > 3 ? (
                  <button
                    className="buttonStyle"
                    onClick={(e) => {
                      e.preventDefault()
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
    </>
  )
}
