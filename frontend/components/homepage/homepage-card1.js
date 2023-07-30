import { useState } from 'react'
import Link from 'next/link'


// 目前尚未解決問題:
// 1.如何丟出json檔案給外部檔案->先抓出n並顯示預備丟出資料 V
// 3.更改RWD樣式    缺1000下

export default function HomeCard1({
  id = 1,
  img_src = '',
  name = '',
  time = 'error',
  introduce = 'error',
  like = false,
  cart_src = '#',
  towheresrc = '#',
  status = 1,
  imgrouter = ''
}) {


  const img = `/images/${imgrouter}/${img_src}`


  //收藏函式-------------------------

  //hover處理-------------------------------
  const [hover, setHover] = useState(false)
  const hoverchange = (hoverstate) => {
    setHover(hoverstate)
  }

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
        <Link href={towheresrc} style={{ textDecoration: 'none' }}>
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
            <div className="footer">
              {/* 左側文字 上+下*/}
              <div>
                {/* 假設狀態為3.4--->不顯示但有高度 */}
                {status > 2 ? (
                  <p className="font p p-st1">{time}</p>
                ) : (
                  <p className="font p fontnull">1</p>
                )}
                {status > 1 ? (
                  <p className="font p p-st2">{introduce}</p>
                ) : (
                  <p className="fontnull">1</p>
                )}
              </div>      
            </div>
          </div>
        </Link>
      </div>
    </>
  )
}
