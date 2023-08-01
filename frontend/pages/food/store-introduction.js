import React, { useState } from 'react'
import IntroductionCard from '@/components/food/Introduction-card'
import styles from '@/styles/food-introduction.module.scss'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as fasHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as farHeart } from "@fortawesome/free-regular-svg-icons";

export default function Index() {
  const card = []
  for (let i = 0; i < 10; i++) {
    card.push(<IntroductionCard />)
  }

  const [isFavorited, setFavorited] = useState(false);

  const toggleFavorite = () => {
    setFavorited(!isFavorited);
  };

  return (
    <>
      {/* query-body */}
      <div className={styles['query-body']}>
        {/* 頁首空間 */}
        <div className={styles['head-space']}></div>

        {/* 商家名、介紹文、收藏心、 */}
        <h1>貳樓</h1>
        <h2>Second Floor Cafe</h2>
        <div>評分數字及星星圖位置</div>
        <div onClick={toggleFavorite}>
          <FontAwesomeIcon icon={isFavorited ? fasHeart : farHeart} style={{ fontSize: '20px' }} />
        </div>
        <p>
          隱密的巷弄間靜靜地倚著大樹的獨棟建築，這是我們的起點。
          取名為「貳樓」是因為大樓林立的都市裡二樓不會是個商辦空間，也不會是個營業場所；二樓是一間間我們在精神上依靠的住家，同時一份份的溫暖也從二樓開始發生。貳樓就想帶給顧客最純粹的『家的感覺』，裡面有我們希望營造的溫暖自在氛圍以及用心、創意的新美式料理。在這裡，用料理分享愛、用愛創造人情味。
        </p>
        <p>Sharing love , sharing food. That's all about Second Floor Cafe.</p>

        {/* 測試卡面 */}
        <div className="row d-flex justify-content-center">{card}</div>

        {/* 頁尾空間 */}
        <div className={styles['footer-space']}></div>
      </div>
    </>
  )
}
