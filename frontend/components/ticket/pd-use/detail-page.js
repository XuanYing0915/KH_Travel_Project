import { useEffect, useState } from 'react'
import loveIcon from '@/components/common-card2/love-icon'
import NoLoveIcon from 'components/common-card2/nolove-icon'
import { Swiper, SwiperSlide } from 'swiper/react'
import Title from '@/components/title'

// import { Children } from 'react'
import Pdcard from './pd-card'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

// import required modules
import { Autoplay, Navigation, Pagination } from 'swiper/modules'

//問題 產品卡css 輪播圖css換另一種 說明文章太長，隱蔽部分

export default function DetailPage({ props }) {
  const [prop, setProps] = useState({})
  const [cardlist, setCardList] = useState([])

  useEffect(() => {
    setProps(props)
    console.log('page get data = ', props)
    //處理卡片資料包
    if (props.tk_id) {
      const cardls = props.tk_pd_name.map((v, i) => {
        return {
          id: props.tk_product_id[i],
          name: v,
          price: props.tk_price[i],
        }
      })
      setCardList(cardls)
    }
  }, [props.tk_id])

  const {
    tk_product_id,
    fk_member_id, //用來判斷有無收藏
    tk_class_name, //no
    tk_description,
    tk_directions,
    tk_expiry_date, //卡片用
    tk_explain,
    tk_id, //用來判斷有無收藏
    tk_image_src,
    tk_name,
    tk_pd_name, //卡片用
    tk_price, //卡片用
    tk_purchase_notes,
    tk_remark,
    tk_status,
  } = prop

  //簡介轉換
  const min_tk_price = tk_price || [0, 0]

  const description = tk_description
  //產品說明
  const explain = tk_explain
  //使用須知
  const directions = tk_directions
  //購買須知
  const purchase_notes = tk_purchase_notes

  //處理文字函式 V
  function textReady(text, status) {
    if (text) {
      // 使用 map 方法處理每個元素，將它們包裹在 <p> 標籤中
      const textReady = text.replace(/\s+|"/g, '').split('。')
      const textFinish = textReady
        .filter((v) => v.trim() !== '')
        .map((v, i) => {
          if (status == 1) {
            return <p key={i}>{`${i + 1}\t ${v}。`}</p>
          } else {
            return <p key={i}>{`${v}。`}</p>
          }
        })
      return <div>{textFinish}</div>
    }
  }

  const handleClickScroll = () => {
    const clickbutton = document.getElementById('click-button')
    const buybutton = document.getElementById('buy-button')
    if (clickbutton) {
      clickbutton.scrollIntoView({ behavior: 'smooth' })
      if (buybutton.classList.contains('collapsed')) {
        buybutton.click()
      }
    }
  }

  return (
    <>
      {/*<!-- 圖片及介紹+按鈕 -->*/}

      <div className="ticketPd">
        <section className="sectionbg-E5EFEF">
          <div className="container">
            {/* <!-- 上方標題列 --> */}

            <div className="title col-8 offset-md-1">
              <h4>{tk_name}</h4>
              <button className="buttonStyle">
                <NoLoveIcon />
              </button>
            </div>
            <div className="line-border-3cm col-8 offset-md-1"></div>

            {/* <!-- 輪播圖 --> */}
            <div className="col-10 offset-md-1">
              {tk_image_src && (
                <Swiper
                  slidesPerView={'auto'}
                  // spaceBetween={30}
                  centeredSlides={true}
                  autoplay={{
                    delay: 1000,
                    disableOnInteraction: false,
                    speed: 400,
                    loop: true,
                  }}
                  // navigation={true} //箭頭
                  pagination={{
                    //下層圈圈
                    clickable: true,
                  }}
                  modules={[Autoplay, Pagination]} //Navigation
                  className="mySwiper"
                >
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
                </Swiper>
              )}
            </div>
            {/* <!-- 下方橫條 --> */}
            <div className="line-border-3cm col-6 offset-md-1"></div>

            {/* <!-- 下方文字+按鈕框 --> */}
            <div className="justify-content-around between">
              <div className="col-5 introduction">
                <div className="text_16">備註: {tk_remark}</div>
                <div className="text_16">{textReady(description, 2)}</div>
              </div>
              <div className="col-3 click-button-box">
                <p className="button-text text_16">
                  價格最低<b>TWD{Math.min(...min_tk_price)}元</b>起
                </p>
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
        {/* <!-- 購買按鈕區塊+跳出顯示 --> */}
        <section>
          <div className="container buy-box">
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
              className="accordion-collapse collapse  container"
              data-bs-parent="#buy-button"
            >
              <div className="buy-card-box">
                {cardlist.map((v, i) => {
                  return (
                    <Pdcard
                      id={v.id}
                      title={v.name}
                      note={''}
                      price={v.price}
                      number={1}
                      key={v.name}
                    />
                  )
                })}
              </div>
            </div>
          </div>
        </section>

        {/* <!-- 產品說明 --> */}
        <section className="sectionbg-E5EFEF">
          <div className="container sectionbg nobcakground ">
            <Title title="產品說明" style="title_box_dark" />
            <div className="text_24 p-style-dark">{textReady(explain, 2)}</div>
          </div>
        </section>

        {/* <!-- 如何使用 --> */}
        <section>
          <div className="container sectionbg sectionbg-white">
            <Title title="如何使用" style="title_box_dark" />
            <p className="text_24 p-style-dark">{textReady(directions, 2)}</p>
          </div>
        </section>

        {/* <!-- 購買須知 --> */}
        <section>
          <div className="container sectionbg ">
            <Title title="購買須知" style="title_box_white" />
            <p className="text_24 p-style-light">
              {textReady(purchase_notes, 1)}
            </p>
          </div>
        </section>
      </div>
    </>
  )
}
