import React, { useEffect, useState } from 'react'
import ProductList from '@/components/food/productList'
import StarRating from '@/components/food/StarRating'
// as 是改名
import { faHeart as fasHeart } from '@fortawesome/free-solid-svg-icons'
import { faHeart as farHeart } from '@fortawesome/free-regular-svg-icons'
import Title from '@/components/title'
import axios from 'axios'
import { useRouter } from 'next/router'
import AOS from 'aos'
import 'aos/dist/aos.css'
import 'animate.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGlobe } from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link'
import MyCarousel from '@/components/food/MyCarousel'
import Slider from 'react-slick'

import { useAuthJWT } from '@/hooks/use-auth-jwt' // 0815引用JWT認證

// 懸浮元件
import Float from '@/components/attraction/float-btn'
export default function Index() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false)
    }, 1000)
  }, [])

  const [merchant, setMerchant] = useState({
    merchant_id: '200100001',
    google_place_id: 'ChIJwQ7syDsDbjQRopBo4Lyep0Y',
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
  // 先抓到會員狀態
  const { authJWT } = useAuthJWT()
  const numberid = authJWT.userData.member_id

  // 資料庫抓取資料
  const getMerchantData = async (merchant_id) => {
    // 連接網址
    const url = `http://localhost:3005/search-merchants/${merchant_id}`
    // 連接
    try {
      const res = await axios.get(url)

      // 處理多餘、換行字符
      res.data.introduction = res.data.introduction.replace(/\\n/g, '\n')
      res.data.operating_hours = res.data.operating_hours.replace(/\\n/g, '\n')
      res.data.map_coordinates = res.data.map_coordinates.replace(
        /^\"|\"$/g,
        ''
      )

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
    rating: 5,
  }

  // 介紹圖片
  const img = `/images/food/${merchant.img}`

  // 處理頁面變化的函數
  const handlePageChange = (page) => {
    setCurrentPage(page)
  }

  useEffect(() => {
    if (typeof window !== 'undefined') {
      AOS.init({
        once: true, // 添加這個選項
      })
    }
  }, [])

  const [details, setDetails] = useState(null)

  useEffect(() => {
    if (merchant && merchant.google_place_id) {
      async function fetchData() {
        try {
          const response = await axios.get(
            `http://localhost:3005/api/google/place/details?placeId=${merchant.google_place_id}`
          )
          setDetails(response.data)
        } catch (error) {
          console.error('Error fetching data:', error)
        }
      }

      fetchData()
    }
  }, [merchant])

  const [windowWidth, setWindowWidth] = useState(null)

  useEffect(() => {
    setWindowWidth(window.innerWidth)
    const handleResize = () => setWindowWidth(window.innerWidth)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: windowWidth < 992 ? 1 : windowWidth < 1400 ? 2 : 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 6000,
    nextArrow: <button type="button">下一張</button>,
    prevArrow: <button type="button">上一張</button>,
  }

  // 打開新的瀏覽器分頁，並轉到指定的URL
  const handleClick = () => {
    window.open(`${details.googleMapUrl}`, '_blank')
  }

  const openAuthorReviews = (authorUrl) => {
    window.open(authorUrl, '_blank')
  }
  // 評論彈跳視窗
  const [isModalOpen, setModalOpen] = useState(false)
  const [modalContent, setModalContent] = useState('')

  const openModal = (review) => {
    setModalContent(review.text.replace(/\n/g, '<br />'))
    setModalOpen(true)
  }

  const closeModal = () => {
    setModalOpen(false)
  }

  if (isLoading) {
    return (
      <div className="a-loading">
        <img src="/images/logo.png" />
      </div>
    )
  }

  return (
    <>
      <div>
        {details ? (
          <>
            {/* body */}
            <div className="food-merchant-body">
              {/* 頁首空間 */}
              <div className="head-space"></div>
              {/* top-body */}
              <div className="top-body">
                {/* 介紹圖片 */}
                <img
                  src={img}
                  alt="Food Introduction"
                  data-aos="fade-down"
                  data-aos-duration="1500"
                />

                {/* 商家名、評分、星星 */}
                <div className="title-love-img">
                  <div className="title-name">
                    <div data-aos="fade-right" data-aos-duration="1500">
                      {/* 商家名 */}
                      <h1>{merchant.name_chinese}</h1>
                      <h2 className="english-title">{merchant.name_english}</h2>
                      <div className="rating-star">
                        {/* 評分 */}
                        <div>{details.rating}</div>
                        <StarRating rating={details.rating} />
                      </div>
                    </div>
                  </div>
                  {/* 介紹文 */}
                  <div>
                    <div className="introductory-text">
                      <h2 data-aos="fade-left" data-aos-duration="1500">
                        {merchant.introduction_card}
                      </h2>
                      {merchant.introduction.split('\n').map((line, index) => (
                        <p
                          data-aos="fade-left"
                          data-aos-duration="1500"
                          key={index}
                        >
                          {line}{' '}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
                <div data-aos="fade-up" data-aos-duration="1500">
                  {details ? (
                    <MyCarousel photos={details.photos} />
                  ) : (
                    <p>正在加載...</p>
                  )}
                </div>
              </div>

              {/* middle-body */}
              <div className="middle-body">
                <div className="grid-container">
                  <div className="info-box">
                    <div className="title">
                      <Title
                        title="營業時間"
                        style="title_box_dark"
                        fontSize="30px"
                      />
                    </div>
                    {details.businessHours.map((hour, index) => (
                      <p
                        key={index}
                        data-aos="fade-right"
                        data-aos-duration="1500"
                      >
                        {hour}
                      </p>
                    ))}

                    {/* 其他資訊 */}
                    <div className="title">
                      <Title
                        title="其他資訊"
                        style="title_box_dark"
                        fontSize="30px"
                      />
                    </div>
                    <div className="phone">
                      <p
                        className="website-container"
                        data-aos="fade-right"
                        data-aos-duration="1500"
                      >
                        網站：{' '}
                        {details.website !== '未設立' ? (
                          <div className="website-icon">
                            <Link href={details.website} legacyBehavior>
                              <FontAwesomeIcon icon={faGlobe} />
                            </Link>
                          </div>
                        ) : (
                          '未設立'
                        )}
                      </p>
                      <p data-aos="fade-right" data-aos-duration="1500">
                        類型：{details.types.join(', ')}
                      </p>
                      <p data-aos="fade-right" data-aos-duration="1500">
                        價格層級：{details.priceLevel}
                      </p>
                      <p data-aos="fade-right" data-aos-duration="1500">
                        營業狀態：{details.status}
                      </p>
                      <p data-aos="fade-right" data-aos-duration="1500">
                        電話 : {details.phone}
                      </p>
                    </div>
                  </div>

                  {/* 位置 */}
                  <div className="place">
                    <div className="title">
                      <Title
                        title="位置"
                        style="title_box_dark"
                        fontSize="30px"
                      />
                    </div>
                    <p data-aos="fade-left" data-aos-duration="1500">
                      地址：{details.address}
                    </p>
                    <div
                      className="map-container"
                      data-aos="fade-left"
                      data-aos-duration="1500"
                    >
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
              <div className="bottom-body">
                {/* 產品 */}
                <div className="title">
                  <Title title="產品" style="title_box_dark" fontSize="30px" />
                </div>
                {/* 產品卡片 */}
                <ProductList />
              </div>

              {/* 評論 */}
              <>
                <div className="review-body">
                  {isModalOpen && (
                    <div className="modal" onClick={closeModal}>
                      <div
                        className="modal-content"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <p
                          dangerouslySetInnerHTML={{ __html: modalContent }}
                        ></p>
                      </div>
                    </div>
                  )}
                  {/* 熱門評論 */}
                  <div className="title">
                    <Title
                      title="熱門評論"
                      style="title_box_dark"
                      fontSize="30px"
                    />
                  </div>
                  <h2>google評論總篇數：{details.userRatingsTotal}</h2>
                  <div className="review-body">
                    <Slider className="Slider" {...settings}>
                      {details.reviews.map((review, index) => (
                        <div key={index} className="review">
                          <div className="container">
                            <div className="avatar-name">
                              <img
                                className="img"
                                src={review.profile_photo_url}
                                alt={`${review.author_name} 的頭像`}
                              />
                              <div>
                                <p>{review.author_name}</p>
                                <p className="time">
                                  {review.relative_time_description}
                                </p>
                              </div>
                            </div>
                            <div className="rating">
                              <StarRating rating={review.rating} />
                            </div>
                          </div>
                          <div className="review-text">
                            <p>{review.text}</p>
                          </div>
                          <button
                            className={`show-more ${
                              review.text.length > 137
                                ? 'show-more-visible'
                                : ''
                            }`}
                            onClick={() => openModal(review)}
                          >
                            完整評論
                          </button>
                          <div className="time-review-authorurl">
                            <p>
                              時間：
                              {new Date(review.time * 1000).toLocaleString()}
                            </p>
                            <button
                              className="other-comment-buttons"
                              onClick={() =>
                                openAuthorReviews(review.author_url)
                              }
                            >
                              {review.author_name}其他評論
                            </button>
                          </div>
                        </div>
                      ))}
                    </Slider>
                  </div>
                  <div className="more-comments">
                    <button
                      className="more-comments-buttons"
                      onClick={handleClick}
                    >
                      {merchant.name_chinese}更多評論
                    </button>
                  </div>
                </div>
              </>
              {/* 頁尾空間 */}
              <div className="footer-space"></div>
            </div>
            <Float
              love={false}
              path={'food'}
              id={merchant.merchant_id}
              memberId={numberid}
              dataBaseTableName={'merchant'}
            />
          </>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </>
  )
}
