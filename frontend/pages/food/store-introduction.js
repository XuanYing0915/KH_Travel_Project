import React, { useState } from 'react'
import IntroductionCard from '@/components/food/Introduction-card'
import StarRating from '@/components/food/StarRating'
import styles from '@/styles/food-introduction.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// as 是改名
import { faHeart as fasHeart } from '@fortawesome/free-solid-svg-icons'
import { faHeart as farHeart } from '@fortawesome/free-regular-svg-icons'

export default function Index({ img_src = '2017-07-02.jpg' }) {
  // 收藏愛心
  const [isFavorited, setFavorited] = useState(false)
  const favoriteIcon = isFavorited ? fasHeart : farHeart
  const toggleFavorite = () => {
    setFavorited(!isFavorited)
  }

  // 評分
  const rating = {
    rating: 4.5,
  }

  // 介紹圖片
  const img = `/images/food/${img_src}`

  // 測試卡片
  const card = []
  for (let i = 0; i < 10; i++) {
    card.push(<IntroductionCard />)
  }

  return (
    <>
      {/* body */}
      <div className={styles['query-body']}>
        {/* 頁首空間 */}
        <div className={styles['head-space']}></div>

        {/* 商家名、評分、星星、收藏愛心 */}
        <div className={styles['title-love-img']}>
          <div className={styles['title-with-love']}>
            <div>
              {/* 商家名 */}
              <h1>貳樓</h1>
              <h2 className={styles['english-title']}>Second Floor Cafe</h2>
              <div className={styles['rating-star']}>
                {/* 評分 */}
                <div>{rating.rating}</div>
                <StarRating rating={rating.rating} />
              </div>
            </div>
            {/* 收藏愛心 */}
            <div onClick={toggleFavorite}>
              <FontAwesomeIcon
                icon={favoriteIcon}
                className={styles['favoriteIcon']}
              />
            </div>
          </div>
          {/* 介紹圖片 */}
          <img src={img} alt="Food Introduction" />
        </div>
        {/* 介紹文 */}
        <div className={styles['introductory-text']}>
          <h2>午後的緣起</h2>
          <br />
          <p>
            隱密的巷弄間靜靜地倚著大樹的獨棟建築，這是我們的起點。
            取名為「貳樓」是因為大樓林立的都市裡二樓不會是個商辦空間，也不會是個營業場所；二樓是一間間我們在精神上依靠的住家，同時一份份的溫暖也從二樓開始發生。貳樓就想帶給顧客最純粹的『家的感覺』，裡面有我們希望營造的溫暖自在氛圍以及用心、創意的新美式料理。在這裡，用料理分享愛、用愛創造人情味
          </p>
          <p>
            Sharing love , sharing food. That's all about Second Floor Cafe.
          </p>
        </div>
        {/* 介紹圖片 */}
        <div className={styles['images-container']}>
          <img src={img} alt="Food Introduction" />
          <img src={img} alt="Food Introduction" />
          <img src={img} alt="Food Introduction" />
        </div>
        {/* 測試卡片 */}
        <div className="row d-flex justify-content-center">{card}</div>
        {/* 頁尾空間 */}
        <div className={styles['footer-space']}></div>
      </div>
    </>
  )
}
