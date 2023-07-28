// 引入 React 的 useState 函式
import { useState } from 'react'
// 引入 Next.js 的 Link 組件，用於客戶端路由跳轉
import Link from 'next/link'
// 引入兩個自定義的圖標組件
import LoveIcon from './love-icon'
import NoLoveIcon from './nolove-icon'
// 引入樣式文件
import styles from './IntroductionCard.module.scss'

// 定義一個 React 函式組件，默認導出
export default function IntroductionCard({
  // 定義組件的接收的 props 及其默認值
  id = 1,
  img_src = '花季.jpg',
  name = '好喝咖啡',
  introduce = '品味與濃郁交織，香氣四溢，令人沉醉於其中的絕佳咖啡享受。',
  like = false,
  towheresrc = '#',
}) {
  // 定義圖片路徑
  const img = `/images/hotel/${img_src}`

  // 定義一個喜歡的狀態及其設定函式，默認值來自 props
  const [lovestate, setLoves] = useState(like)
  // 定義一個切換喜歡狀態的函式，根據 id 是否相同來切換
  const toggleFav = (clickid) => {
    if (id === clickid) {
      setLoves(!lovestate)
    }
  }

  // 定義一個表示滑鼠是否在元素上的狀態及其設定函式，默認值為 false
  const [hover, setHover] = useState(false)
  // 定義一個改變滑鼠狀態的函式
  const hoverchange = (hoverstate) => {
    setHover(hoverstate)
  }

  // 返回組件的渲染結果
  return (
    // 根據滑鼠是否在元素上改變元素的類名
    <div
      className={styles.introductionCard}
      key={id}
      onMouseEnter={() => hoverchange(true)}
      onMouseLeave={() => hoverchange(false)}
    >
      {/* 使用 Link 組件創建一個指向 towheresrc 的連結 */}
      <Link href={towheresrc}>
        {/* 創建一個 div，並設置其背景圖片 */}
        <div
          className={`${styles['content-overlay']} ${hover ? 'shadow' : ''}`}
          style={{
            backgroundImage: `url(${img})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          {/* 創建一個 button，點擊時切換喜歡的狀態 */}
          <button
            className={`${styles.buttonStyle} heart-icon`}
            onClick={(e) => {
              e.preventDefault()
              toggleFav(id)
            }}
          >
            {/* 根據喜歡的狀態渲染不同的圖標 */}
            {lovestate ? <LoveIcon /> : <NoLoveIcon />}
          </button>
          {/* 顯示名字和簡介，並根據滑鼠是否在元素上改變它們的顯示樣式 */}
          <div className={styles.textbox}>
            <h4
              className={`${styles.font} ${styles.h4} ${
                hover ? styles['title-hover'] : styles.title
              }`}
            >
              {name}
            </h4>
            <p
              className={`${styles.font} ${styles.p} ${styles['p-st2']} ${
                hover ? styles.visible : styles.invisible
              }`}
            >
              {introduce}
            </p>
          </div>
        </div>
      </Link>
    </div>
  )
}
