import { useEffect, useState } from 'react'
import LikeCollect from '@/components/common-card2/like-collect'
import { Swiper, SwiperSlide } from 'swiper/react'
import Title from '@/components/title'
import Pdcard from './pd-card'


import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { VscTriangleRight } from 'react-icons/vsc' //箭頭icon


// Import Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/effect-coverflow'

// import required modules
import { Autoplay, Pagination, EffectCoverflow } from 'swiper/modules'



export default function DetailPage({ props }) {
  const [prop, setProps] = useState({})
  const [cardlist, setCardList] = useState([])


  const {
    fk_member_id, //用來判斷有無收藏(不用)
    tk_class_name, //no
    tk_description,
    tk_directions,
    tk_explain,
    tk_id, //用來判斷有無收藏
    tk_image_src,
    tk_name,
    tk_price, //最小值用
    tk_purchase_notes,
    tk_remark,
    tk_status, //no
  } = prop


  // console.log(like);
  useEffect(() => {
    setProps(props)
    // console.log('page get data = ', props)
    //處理卡片資料包
    if (props.tk_id) {
      const cardls = props.tk_pd_name.map((v, i) => {
        let expiry_date = ''
        if (props.tk_expiry_date) {
          expiry_date = props.tk_expiry_date[i]
        }

        return {
          tk_id: props.tk_id,
          id: props.tk_product_id[i],
          name: v,
          price: props.tk_price[i],
          tk_expiry_date: expiry_date,
          tk_image_src: props.tk_image_src[0]
        }
      })
      setCardList(cardls)

    }
  }, [props.tk_id])



  //簡介轉換

  const min_tk_price = tk_price || [0, 0]
  const description = tk_description
  //產品說明
  const explain = tk_explain
  //使用須知
  const directions = tk_directions
  //購買須知
  const purchase_notes = tk_purchase_notes

  //處理文字函式 -->明天改成元件再傳入值處理即可
  function textReady(text, status, css) {
    if (text) {
      // 使用 map 方法處理每個元素，將它們包裹在 <p> 標籤中
      const textReady = text.replace(/\s+|"/g, '').split('。')
      const textFinish = textReady
        .filter((v) => v.trim() !== '')
        .map((v, i) => {
          if (status == 1) {
            return <p className={`${css}`} key={i}>{`${i + 1}\t ${v}。`}</p>
          }
          if (status == 2) {
            return <p className={`${css}`} key={i}>{`${v}。`}</p>
          }
          if (status == 3) {
            return <p className={`${css}`} key={i}><VscTriangleRight />{`\t ${v}。`}</p>
          }
        })
      return <div>{textFinish}</div>
    }
  }

  const handleClickScroll = () => {
    const clickbutton = document.getElementById('click-button')
    const buybutton = document.getElementById('buy-button')
    if (clickbutton) {
      // buybutton.scrollIntoView({ behavior: 'smooth' })
      const headerOffset = 115
      const elementPosition = buybutton.getBoundingClientRect().top
      const offsetPosition = elementPosition - headerOffset

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      })
      if (!buybutton.classList.contains('collapsed')) {
        buybutton.click()
      }
    }
  }

  return (
    <>
      {/*<!-- 圖片及介紹+按鈕 -->*/}

      <div className="ticketPd">
        <section>
          <div className="container sectionbg nobcakground">
            {/* <!-- 上方標題列 --> */}

            <div className="col-lg-8 offset-md-1">
              <h4 className="text_24 title-text">{tk_name}</h4>
            </div>
            <div className="line-border-3cm col-8 offset-md-1"></div>

            {/* <!-- 輪播圖 --> */}
            <div className="col-10 offset-md-1">
              {tk_image_src && (
                <Swiper
                  effect={'coverflow'}
                  grabCursor={true}
                  centeredSlides={true}
                  coverflowEffect={{
                    rotate: 60,
                    stretch: 0,
                    depth: 50,
                    modifier: 1,
                    slideShadows: true,
                  }}
                  pagination={{
                    //下層圈圈
                    clickable: true,
                  }}
                  modules={[Autoplay, Pagination, EffectCoverflow]}
                  autoplay={{
                    delay: 3000,
                    // disableOnInteraction: true,
                  }}
                  loop={true}
                  // speed={5000}
                  slidesPerView={2}
                  className="mySwiper"
                >
                  <div class="swiper-wrapper">
                    {/* 圖片替換區 */}
                    {tk_image_src.map((v) => {
                      return (
                        <SwiperSlide key={v}>
                          <div className="slider">
                            <img src={`/images/ticket/${v}`} />
                          </div>
                        </SwiperSlide>
                      )
                    })}
                  </div>
                </Swiper>
              )}
            </div>

            {/* <!-- 下方橫條 --> */}
            <div className="line-border-3cm col-6 offset-md-1"></div>

            <Title title="基礎資訊" style="title_box_dark mobile-use" />

            {/* <!-- 下方文字+按鈕框 --> */}
            <div className="top-text-box">
              <div className="col-5 introduction">
                <div className="text_16 font">備註: {tk_remark}</div>
                {textReady(description, 2, 'text_16 font')}
              </div>
              <div className="col click-button-box">
                <p className="text_16 button-text ">
                  價格最低<b>TWD{Math.min(...min_tk_price)}元</b>起
                </p>
                {/* <!-- 購買按鈕區塊+跳出顯示 --> */}
                <button
                  className="click-button"
                  onClick={handleClickScroll}
                  id="click-button"
                >
                  選擇方案
                </button>
              </div>
            </div>
          </div>
        </section>

        <div className="moible-notuse">
          {/* <!-- 產品說明 --> */}
          <section className="sectionbg-E5EFEF">
            <div className="container sectionbg nobcakground ">
              <Title title="產品說明" style="title_box_dark" />
              {textReady(explain, 2, 'text_20 p-style-dark')}
            </div>
          </section>
          {/* <!-- 如何使用 --> */}
          <section>
            <div className="container sectionbg nobcakground">
              <Title title="如何使用" style="title_box_dark" />
              {textReady(directions, 2, 'text_20 p-style-dark')}
            </div>
          </section>
          {/* <!-- 購買須知 --> */}
          <section>
            <div className="container sectionbg ">
              <Title title="購買須知" style="title_box_white" />
              {textReady(purchase_notes, 1, 'text_20 p-style-light')}
            </div>
          </section>
          <section>
            <div className="buy-box">
              {/* <!-- 按鈕+外框 --> */}
              <div className="flex-center">
                <button
                  className="buy-button"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#buy-card-box"
                  id="buy-button"
                >
                  <div className="buy-button-text">選擇方案</div>
                </button>
              </div>
              {/* <!-- 下方顯示框架 --> */}
              <div
                id="buy-card-box"
                className="accordion-collapse collapse "
                data-bs-parent="#buy-button"
              >
                <div className="buy-card-box col-10 offset-1">
                  {cardlist.map((v, i) => {
                    return (
                      <Pdcard
                        tk_id={v.tk_id}
                        id={v.id}
                        title={v.name}
                        tk_expiry_date={v.tk_expiry_date}
                        price={v.price}
                        key={v.id}
                        tk_image_src={v.tk_image_src}
                      />
                    )
                  })}
                </div>
              </div>
            </div>
          </section>
        </div>
        <div className="mobile-use">
          <div className="container sectionbg nobcakground ">
            <Title title="購買資訊" style="title_box_dark" />
          </div>

          <div className="buy-card-box ">
            {cardlist.map((v, i) => {
              return (
                <Pdcard
                  tk_id={v.tk_id}
                  id={v.id}
                  title={v.name}
                  tk_expiry_date={v.tk_expiry_date}
                  price={v.price}
                  key={v.id}
                  tk_image_src={v.tk_image_src}
                />
              )
            })}
          </div>
          <Tabs defaultActiveKey="1" id="fill-tab-example" fill>
            <Tab eventKey="1" title="產品說明" tabClassName="tabss">
              {textReady(explain, 3, 'p-style-dark font')}
            </Tab>
            <Tab eventKey="2" title="如何使用">
              {textReady(directions, 3, 'p-style-dark font')}
            </Tab>
            <Tab eventKey="3" title="購買須知">
              {textReady(purchase_notes, 3, 'p-style-dark font')}
            </Tab>
          </Tabs>
        </div>
      </div>
    </>
  )
}
