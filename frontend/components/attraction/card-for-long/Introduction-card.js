import { useState } from 'react'
import Link from 'next/link'
import styles from './IntroductionCard.module.scss'
import LikeCollect from '@/components/attraction/card-for-long/like-collect'

import FavoriteSuccess from '@/components/attraction/toast-alert/favorite-success'
import FavoriteError from '@/components/attraction/toast-alert/favorite-error'
import FavoriteRemove from '@/components/attraction/toast-alert/favorite-remove'

import { useAuthJWT } from '@/hooks/use-auth-jwt'

// icon
import { BsSuitHeartFill, BsSuitHeart } from 'react-icons/bs'
export default function IntroductionCard({
  id = '',
  img_src = '',
  name = '',
  introduce = '',
  like = false,
  towheresrc = '#',
  member_id = '',
  who = 1, //比對後端資料庫
}) {
  // 定義圖片路徑
  const img = `/images/attraction/${img_src}`

  // 定義一個喜歡的狀態及其設定函式，默認值來自 props
  // const [lovestate, setLoves] = useState(like)
  // 定義一個切換喜歡狀態的函式，根據 id 是否相同來切換
  // const toggleFav = (clickid) => {
  //   if (id === clickid) {
  //     setLoves(!lovestate)
  //   }
  // }

  const { authJWT } = useAuthJWT()
  const memberId = authJWT.userData.member_id

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
            backgroundImage: `linear-gradient(
      0deg,
      rgba(0, 0, 0, 0.4),
      rgba(0, 0, 0, 0.01),
      rgba(0, 0, 0, 0)
    ), url(${img})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
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
            {/* {lovestate ? (
              <BsSuitHeartFill size={40} color="#FFCE56" />
            ) : (
              <BsSuitHeart size={40} color="#FFCE56" />
            )} */}
            {/* 改成收藏元件 */}
            {/* 初始傳false */}
            <LikeCollect like={like} cardid={id} who={1} numberid={memberId} />
          </button>
          {/* 顯示名字和簡介，並根據滑鼠是否在元素上改變它們的顯示樣式 */}
          <div
            className={`${styles.textbox} ${styles.h4} ${
              hover ? styles['textbox-hover'] : styles.textbox
            }`}
          >
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
