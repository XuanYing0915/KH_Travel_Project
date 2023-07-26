import { useState } from 'react'
import Link from 'next/link'
import LoveIcon from './love-icon'
import NoLoveIcon from './nolove-icon'

export default function CommonCard2({
  id = 1,
  img_src = '',
  name = '好喝咖啡',
  introduce = '品味與濃郁交織，香氣四溢，令人沉醉於其中的絕佳咖啡享受。',
  like = false,
  towheresrc = '#',
  imgrouter = '',
}) {
  const img = `/images/${imgrouter}/${img_src}`

  // 收藏狀態的狀態管理
  const [lovestate, setLoves] = useState(like)

  // 切換收藏狀態的函式
  const toggleFav = (clickid) => {
    if (id === clickid) {
      setLoves(!lovestate)
    }
  }

  // Hover狀態的狀態管理
  const [hover, setHover] = useState(false)

  // 設定Hover狀態的變化函式
  const hoverchange = (hoverstate) => {
    setHover(hoverstate)
  }

  return (
    <div
      className={`commonCard2`}
      key={id}
      onMouseEnter={() => hoverchange(true)}
      onMouseLeave={() => hoverchange(false)}
    >
      <Link href={towheresrc}>
        <div
          className={`content-overlay ${hover ? 'shadow' : ''}`}
          style={{
            backgroundImage: `url(${img})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <button
            className="buttonStyle heart-icon"
            onClick={(e) => {
              e.preventDefault()
              toggleFav(id)
            }}
          >
            {lovestate ? <LoveIcon /> : <NoLoveIcon />}
          </button>
          <div className="textbox">
            <h4 className="font h4">{name}</h4>
            <p className={`font p p-st2 ${hover ? 'visible' : 'invisible'}`}>
              {introduce}
            </p>
          </div>
        </div>
      </Link>
      <style jsx>{`
        .commonCard2 {
          width: 270px;
           {
            /* // 卡片寬度設為 300px */
          }
          position: relative;
           {
            /* // 對內部絕對定位元素定位 */
          }
        }
        .content-overlay {
          padding-top: 60%;
           {
            /* // 按照 16:9 的寬高比設定上內邊距 */
          }
          position: relative;
           {
            /* // 對內部絕對定位元素定位 */
          }
          overflow: hidden;
           {
            /* // 內容超出卡片的部分將被隱藏 */
          }
          display: flex;
           {
            /* // 使用彈性佈局 */
          }
          flex-direction: column;
           {
            /* // 子元素垂直排列 */
          }
          justify-content: flex-end;
           {
            /* // 子元素靠卡片底部對齊 */
          }
          align-items: center;
           {
            /* // 子元素在水平方向上居中對齊 */
          }
          color: white;
           {
            /* // 文字顏色為白色 */
          }
        }
        .buttonStyle {
          position: absolute;
           {
            /* // 絕對定位 */
          }
          top: 10px;
           {
            /* // 距離卡片頂部 10px */
          }
          right: 10px;
           {
            /* // 距離卡片右側 10px */
          }
          background: transparent;
           {
            /* // 背景色為透明 */
          }
          border: none;
           {
            /* // 去除邊框 */
          }
          cursor: pointer;
           {
            /* // 鼠標樣式設為手指 */
          }
        }
        .textbox {
          padding: 10px;
           {
            /* // 內容的內邊距設為 10px */
          }
          background: rgba(0, 0, 0, 0.5);
           {
            /* // 背景色為半透明的黑色 */
          }
        }
        .shadow {
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
           {
            /* // 添加陰影效果 */
          }
        }
        .invisible {
          opacity: 0;
           {
            /* // 透明度設為 0，即完全透明 */
          }
        }
        .visible {
          opacity: 1;
           {
            /* // 透明度設為 1，即完全不透明 */
          }
          transition: opacity 0.3s;
           {
            /* // 透明度變化過渡時間設為 0.3 秒 */
          }
        }
      `}</style>
    </div>
  )
}
