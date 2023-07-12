import React from 'react'
import Carousel from '@/components/product/carousel'

export default function Detail() {
  return (
    <>
      <div className="row mt-5 mx-2">
        <div className="col-sm-7">
          <div className="position-sticky" style={{ top: '2rem' }}>
            <Carousel />
          </div>
        </div>
        <div className="col-sm-5">
          <h4>Nike Air Force 1 PLT.AF.ORM</h4>
          <p>女鞋</p>
          <p>$4,000</p>
          <p className="product-desc">
            穿上 Nike Air Force 1 PLT.AF.ORM. 用經典好穿的 AF1 風格脫穎而出。
            優雅版型搭配加厚中底，為籃球鞋系列注入傲嬌新風貌。
            皮革鞋面隨形貼合且越穿越柔軟；塑型鞋領加上柔軟如枕的鞋跟，舒適耐穿。
            一現身就風靡全場。
          </p>
          <ul>
            <li>顯示顏色： 白/白/白/Summit White</li>
            <li>款式： DJ9946-100</li>
          </ul>
          <button className="btn btn-primary w-100 mb-3">加入購物車</button>
          <button className="btn btn-outline-primary w-100">
            <i className="bi bi-suit-heart"></i> 最愛
          </button>
          <div className="product-info my-5">
            <div
              className="accordion accordion-flush"
              id="accordionFlushExample"
            >
              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    aria-expanded="false"
                    data-bs-target="#panelsStayOpen-collapseOne"
                    aria-controls="panelsStayOpen-collapseOne"
                  >
                    尺寸與版型
                  </button>
                </h2>
                <div
                  id="panelsStayOpen-collapseOne"
                  className="accordion-collapse collapse"
                >
                  <div className="accordion-body px-1">
                    <ul>
                      <li>版型較大，建議訂購小半號</li>
                      <li>尺寸：尺寸指南</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#panelsStayOpen-collapseTwo"
                    aria-expanded="false"
                    aria-controls="panelsStayOpen-collapseTwo"
                  >
                    免費寄送及退貨
                  </button>
                </h2>
                <div
                  id="panelsStayOpen-collapseTwo"
                  className="accordion-collapse collapse"
                >
                  <div className="accordion-body px-1">
                    <p>訂單金額滿新臺幣 4,500 元即享免費標準運送服務</p>
                    <p>
                      臺北市:標準運送的商品可於 2-5 個工作天內送達
                      快遞運送的商品可於 2-3 個工作天內送達
                    </p>
                    <p>
                      其它縣市: 標準運送的商品可於 3-6 個工作天內送達
                      快遞運送的商品可於 3-5 個工作天內送達
                    </p>
                    <p>訂單皆於星期一至星期五之間處理與寄送 (國定假日除外)</p>
                    <p>會員享免費退貨服務免費退貨。退貨政策例外情況。</p>
                  </div>
                </div>
              </div>
              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#panelsStayOpen-collapseThree"
                    aria-expanded="false"
                    aria-controls="panelsStayOpen-collapseThree"
                  >
                    評價(370){'  '}
                    <span className="star">&#9733;</span>
                    <span className="star">&#9733;</span>
                    <span className="star">&#9733;</span>
                    <span className="star">&#9733;</span>
                    <span className="star">&#9733;</span>
                  </button>
                </h2>
                <div
                  id="panelsStayOpen-collapseThree"
                  className="accordion-collapse collapse"
                >
                  <div className="accordion-body px-1">
                    <div className="commet">
                      <div className="rating">
                        <span className="star">&#9733;</span>
                        <span className="star">&#9733;</span>
                        <span className="star">&#9733;</span>
                        <span className="star">&#9733;</span>
                        <span className="star">&#9733;</span>
                      </div>
                      <p>great shoes overall Ella579458843 - 2023年6月19日</p>
                      <p>
                        overall one of my favorite shoes at the moment. go with
                        any of my outfits, i can wear sweatpants with them or to
                        a nice dinner with a dress. the only “problem” i have
                        with them is that they’re difficult to break into even
                        if you half size up, it took me a while to break into
                        them. but overall i recommend these shoes if you just
                        want some great shoes for any occasion.... 更多
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row mt-5 mx-2">
        <div className="col-sm-12">
          <h4 className="text-center mb-5">探索 Nike Air Force 1 '07 女鞋</h4>
          <img className="w-100  my-5 " src="/images/pd-1.webp" />
          <p className="text-center my-5 font-weight-light fs-4">
            鞋面採用車縫皮革裝飾片，全面提升經典指標性、耐久性和支撐力。
          </p>
          <img className="w-100  my-5 " src="/images/pd-3.webp" />
          <p className="text-center my-5 font-weight-light fs-4">
            低筒版型，造型俐落簡練。
          </p>
        </div>
      </div>
    </>
  )
}
