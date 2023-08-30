import { useState } from 'react'
import LikeCollect from '@/components/common-card2/like-collect'
import { useRouter } from 'next/router' //0812

import { LazyLoadImage } from 'react-lazy-load-image-component'
import 'react-lazy-load-image-component/src/effects/blur.css'
//載入資料測試
import CartIcon from './crat-icon'

//0812 改用router push丟連結 棄用link
// 目前尚未解決問題:宣盈的中間及下層文字改小
//

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
  who = 1, //08/11新增
}) {
  // img router
  const router = useRouter()
  const img = `/images/${imgrouter}/${img_src}`

  //hover處理-------------------------------
  const [hover, setHover] = useState(false)
  const hoverchange = (hoverstate) => {
    setHover(hoverstate)
  }
  //hover處理-------------------------------

  //RWD處理區-------------------------------
  //  缺少 800下 RWD 用最小版即可
  //RWD處理區-------------------------------
  return (
    <>
      {/* card本體 */}
      <div
        className={
          status < 5
            ? imgrouter !== 'attraction'
              ? 'commonCard2'
              : 'commonCard2 big'
            : 'likeCard'
        }
        key={id}
        //hover事件
        onMouseEnter={() => {
          hoverchange(true)
        }}
        onMouseLeave={() => {
          hoverchange(false)
        }}
      >
        <span
          onClick={(e) => {
            router.push({
              pathname: `/${imgrouter}/${towheresrc}`,
            })
          }}
        >
          <div className="wh100-1">
            {/* 圖片框架 hover狀態變化*/}
            <div className={hover ? 'imgboxhover imgbox' : 'imgbox'}>
              <LazyLoadImage src={img} alt={name} />
            </div>

            {/* 下層文字框架及icon  上+下*/}
            <div className="textbox">
              {/* title */}
              <h4
                className={
                  status == 1 || status == 5
                    ? 'font text_16 text-center'
                    : 'font text_16'
                }
              >
                {name}
              </h4>
              {/* 下層+icon  左+右*/}
              <div className="card2down">
                {/* 左側文字 上+下*/}
                <div>
                  {/* 假設狀態為3.4--->不顯示但有高度 */}
                  {status > 2 ? (
                    status < 5 ? (
                      <p className="font p p-st1">{time}</p>
                    ) : (
                      ''
                    )
                  ) : (
                    // <p className="font p fontnull">1</p>
                    ''
                  )}
                  {status > 1 ? (
                    status < 5 ? (
                      <p className="font p p-st2">{introduce}</p>
                    ) : (
                      ''
                    )
                  ) : (
                    <p className="fontnull">1</p>
                  )}
                </div>
                {/* 右側icon 左+右*/}
                <div className="iconblock">
                  {/* icon1  缺點擊收藏功能(先切換圖案)*/}
                  {status != 4 ? (
                    <LikeCollect like={like} cardid={id} who={who} />
                  ) : (
                    //------------------------------------------
                    ''
                  )}
                  {/* icon2 點擊將資料丟出給購物車頁面 測試中 */}
                  {status == 4 ? (
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
          </div>
        </span>
      </div>
    </>
  )
}
