import React, { useState } from 'react'
import ProductCard from '@/components/food/product-card'
import StarRating from '@/components/food/StarRating'
import styles from '@/styles/food-introduction.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// as 是改名
import { faHeart as fasHeart } from '@fortawesome/free-solid-svg-icons'
import { faHeart as farHeart } from '@fortawesome/free-regular-svg-icons'
import Title from '@/components/title'
import Page from '@/components/attraction/search/page'

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

  // 假設你每頁要顯示的卡片數量為 4
  const CARDS_PER_PAGE = 4
  // 創建你的卡片數據
  const cardsData = new Array(8)
    .fill(null)
    .map((_, i) => <ProductCard key={i} />)
  // 現在，我們需要一個狀態來跟蹤當前的頁數
  const [currentPage, setCurrentPage] = useState(1)
  // 計算總頁數
  const totalPages = Math.ceil(cardsData.length / CARDS_PER_PAGE)
  // 計算在當前頁面上應顯示的卡片
  const cardsToShow = cardsData.slice(
    (currentPage - 1) * CARDS_PER_PAGE,
    currentPage * CARDS_PER_PAGE
  )

  return (
    <>
      {/* body */}
      <div className={styles['query-body']}>
        {/* 頁首空間 */}
        <div className={styles['head-space']}></div>
        {/* top-body */}
        <div className={styles['top-body']}>
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
            </div>
            {/* 收藏愛心 */}
            <div onClick={toggleFavorite}>
              <FontAwesomeIcon
                icon={favoriteIcon}
                className={styles['favoriteIcon']}
              />
            </div>
            {/* 介紹圖片 */}
            <img src={img} alt="Food Introduction" />
          </div>
          {/* 介紹文 */}
          <div className={styles['introductory-text']}>
            <h2>午後的緣起</h2>
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
        </div>

        {/* middle-body */}
        <div className={styles['middle-body']}>
          <div className={styles['grid-container']}>
            <div className={styles['info-box']}>
              {/* 營業時間 */}
              <div className={styles['title']}>
                <Title title="營業時間" style="title_box_dark" />
              </div>
              <p>星期一 : 11:00 - 21:30</p>
              <p>星期二 : 11:00 - 21:30</p>
              <p>星期三 : 11:00 - 21:30</p>
              <p>星期四 : 11:00 - 21:30</p>
              <p>星期五 : 11:00 - 21:30</p>
              <p>星期六 : 11:00 - 21:30</p>
              <p>星期日 : 11:00 - 21:30</p>

              {/* 聯絡方式 */}
              <div className={styles['title']}>
                <Title title="聯絡方式" style="title_box_dark" />
              </div>
              <p>電話 : 07-791-9222</p>
            </div>

            {/* 位置 */}
            <div className={styles['place']}>
              <div className={styles['title']}>
                <Title title="位置" style="title_box_dark" />
              </div>
              <p>高雄市前鎮區中安路1之1號 SKM Park 大道西2F2樓</p>
              <div className={styles['map-container']}>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3683.913100852003!2d120.32703797618852!3d22.582353232610973!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x346e033bc8ec0ec1%3A0x46a79ebce06890a2!2zU2Vjb25kIEZsb29yIOiys-aok-mrmOmbhFNLTSBQYXJr5bqX!5e0!3m2!1szh-TW!2stw!4v1690977784048!5m2!1szh-TW!2stw"
                  style={{ border: 0 }}
                  allowfullscreen=""
                  loading="lazy"
                  referrerpolicy="no-referrer-when-downgrade"
                ></iframe>
                
              </div>
            </div>
          </div>
        </div>

        {/* bottom-body */}
        <div className={styles['bottom-body']}>
          {/* 產品 */}
          <div className={styles['title']}>
            <Title title="產品" style="title_box_dark" />
          </div>
          {/* 測試卡片 */}
          <div className={styles['test-scard']}>{cardsToShow}</div>
          {/* 分頁元件 */}
          <Page
            currentPage={currentPage}
            totalPages={totalPages}
            handlePageChange={setCurrentPage}
          />
        </div>

        {/* 頁尾空間 */}
        <div className={styles['footer-space']}></div>

      </div>
    </>
  )
}
