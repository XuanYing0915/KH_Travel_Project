import React, { useEffect, useState } from 'react'
import ProductList from '@/components/food/productList'; // 確保路徑正確

import StarRating from '@/components/food/StarRating'
import styles from '@/styles/food-merchant.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// as 是改名
import { faHeart as fasHeart } from '@fortawesome/free-solid-svg-icons'
import { faHeart as farHeart } from '@fortawesome/free-regular-svg-icons'
import Title from '@/components/title'
import axios from 'axios'
import { useRouter } from 'next/router'
// 懸浮元件
import Float from '@/components/attraction/float-btn'
export default function Index() {
  const [merchant, setMerchant] = useState({
    merchant_id: '200100001',
    name_chinese: '貳樓',
    name_english: 'Second Floor Cafe',
    address: '806高雄市前鎮區中安路1 之1號SKM Park 大道西2',
    phone: '07 4598 3102',
    img: '貳樓.jpg',
    introduction_card: '隱密的巷弄間靜靜地倚著大樹的獨棟建築，這是我們的起點。',
    introduction:
      "隱密的巷弄間靜靜地倚著大樹的獨棟建築，這是我們的起點。\n取名為「貳樓」是因為大樓林立的都市裡二樓不會是個商辦空間，也不會是個營業場所；二樓是一間間我們在精神上依靠的住家，同時一份份的溫暖也從二樓開始發生。貳樓就想帶給顧客最純粹的『家的感覺』，裡面有我們希望營造的溫暖自在氛圍以及用心、創意的新美式料理。在這裡，用料理分享愛、用愛創造人情味\nSharing love , sharing food. That's all about Second Floor Cafe",
    operating_hours:
      '星期一、11:00–21:30\n星期二、11:00–21:30\n星期三、11:00–21:30\n星期四、10:30–22:00\n星期五、10:30–22:00\n星期六、10:30–22:00',
    map_coordinates:
      'https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d7367.826481552197!2d120.329613!3d22.582348!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x346e033bc8ec0ec1%3A0x46a79ebce06890a2!2zU2Vjb25kIEZsb29yIOiys-aok-mrmOmbhFNLTSBQYXJr5bqX!5e0!3m2!1szh-TW!2stw!4v1691588612846!5m2!1szh-TW!2stw',
  })

  // 資料庫抓取資料
  const getMerchantData = async (merchant_id) => {
    // 連接網址
    const url = `http://localhost:3005/search-merchants/${merchant_id}`
    // 連接
    try {
      const res = await axios.get(url)
      console.log(res.data)

      // 處理換行字符
      res.data.introduction = res.data.introduction.replace(/\\n/g, '\n')
      res.data.operating_hours = res.data.operating_hours.replace(/\\n/g, '\n')
      res.data.map_coordinates = res.data.map_coordinates.replace(/^\"|\"$/g, '');
      // console.log(res.data.introduction)
      // console.log(res.data.operating_hours)
      // console.log(merchant.address)
      // console.log(merchant.map_coordinates)

      // 設定  拆開陣列裡面的物件
      setMerchant(res.data)
    } catch (error) {
      console.error(error)
    }
  }

  // 設定動態路由
  const router = useRouter()

  // 當路由準備好時執行
  useEffect(() => {
    if (router.isReady) {
      const { merchant_id } = router.query
      if (merchant_id) getMerchantData(merchant_id)
    }
  }, [router.isReady, router.query])

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
  const img = `/images/food/${merchant.img}`

  // // 分頁相關的state和functions
  // const [currentPage, setCurrentPage] = useState(1);
  // const productsPerPage = 8; // 假設每頁有10個產品
  // const [totalPages, setTotalPages] = useState(0); // 你需要從伺服器或數據源獲取這個數據

  // 處理頁面變化的函數
  const handlePageChange = (page) => {
    setCurrentPage(page);
    // 在這裡你可能還需要從伺服器獲取新的產品數據
  }


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
                <h1>{merchant.name_chinese}</h1>
                <h2 className={styles['english-title']}>
                  {merchant.name_english}
                </h2>
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
            <h2>{merchant.introduction_card}</h2>
            {merchant.introduction.split('\n').map((line, index) => (
              <p key={index}>{line}</p>
            ))}
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
              <div className={styles['title']}>
                <Title title="營業時間" style="title_box_dark" />
              </div>
              {merchant.operating_hours.split('\n').map((line, index) => (
                <p key={index}>{line}</p>
              ))}

              {/* 聯絡方式 */}
              <div className={styles['title']}>
                <Title title="聯絡方式" style="title_box_dark" fontSize="40px" />
              </div>
              <p>電話 : {merchant.phone}</p>
            </div>

            {/* 位置 */}
            <div className={styles['place']}>
              <div className={styles['title']}>
                <Title title="位置" style="title_box_dark" />
              </div>
              <p>{merchant.address}</p>
              <div className={styles['map-container']}>
              
                <iframe
                  src={merchant.map_coordinates}
                  style={{ border: 0 }}
                  allowfullScreen=""
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
          {/* 產品卡片 */}
          <ProductList/>
        </div>
        <Float
        love={false}
        path={'food'}
        id={merchant.merchant_id}
        memberId={'900001'}
        dataBaseTableName={'merchant'}
      />
        {/* 頁尾空間 */}
        <div className={styles['footer-space']}></div>
      </div>
    </>
  )
}
