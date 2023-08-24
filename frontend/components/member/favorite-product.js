import React from 'react'
import Link from 'next/link'
import Avatar from '@/components/member/avatar'
// import FavoriteProductOne from '@/components/favorite-list/favorite-product-one'
import Image from 'next/image'
import SideBar from '@/components/member/sidebar'
import Title from '@/components/title'
import ProductList from '@/components/member/fav-food-list' // 確保路徑正確
import AttrList from '@/components/member/fav-attr-list' // 確保路徑正確
import HotelList from '@/components/member/fav-hotel-list' // 確保路徑正確
import TicketList from '@/components/member/fav-ticket-list' // 確保路徑正確





export default function FavoriteProduct() {
  return (
    <>
      <div className="bg">
        <div className="m-100"></div>
        <div className="container  mx-auto">
          {/* Add the Breadcrumb here */}
          <div className="row mb-3">
            <nav aria-label="breadcrumb" className="m-breadcrumb">
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <a href="/">首頁</a>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  會員中心
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  我的收藏
                </li>
              </ol>
            </nav>
          </div>
          {/* End of Breadcrumb */}
          <div className="row member-container">
          <div className="col-3 d-flex justify-content-start ">
              <div className="">
                <Avatar/>
                <SideBar />
              </div>
            </div>
            {/* // 這裡是內容 */}
            <div
              className="mt-5 col-7 d-flex justify-content-start nav-bar-size"
              id="nav-bar-size"
            >
              <div className="member-box">
                <Title
                  title="我的收藏"
                  style="title_box_dark"
                  fontSize="30px"
                />
                <nav>
                  <div className="nav nav-tabs" id="nav-tab" role="tablist">
                    <button
                      className="nav-link active edit"
                      id="nav-profile-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#nav-profile"
                      type="button"
                      role="tab"
                      aria-controls="nav-profile"
                      aria-selected="true"
                    >
                      <i
                        className="fa-solid fa-utensils"
                        style={{ marginRight: '15px' }}
                      />
                      美食
                    </button>
                    <button
                      className="nav-link edit"
                      id="nav-ticket-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#nav-ticket"
                      type="button"
                      role="tab"
                      aria-controls="nav-ticket"
                      aria-selected="false"
                    >
                      <i
                        className="fa-solid fa-ticket"
                        style={{ marginRight: '15px' }}
                      />
                      票卷
                    </button>
                    <button
                      className="nav-link edit"
                      id="nav-hotel-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#nav-hotel"
                      type="button"
                      role="tab"
                      aria-controls="nav-hotel"
                      aria-selected="false"
                    >
                      <i
                        className="fa-solid fa-bed"
                        style={{ marginRight: '15px' }}
                      />
                      住宿
                    </button>
                    <button
                      className="nav-link edit"
                      id="nav-attraction-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#nav-attraction"
                      type="button"
                      role="tab"
                      aria-controls="nav-attraction"
                      aria-selected="false"
                    >
                      <i
                        className="fa-solid fa-location-dot"
                        style={{ marginRight: '15px' }}
                      />
                      景點
                    </button>
                  </div>
                </nav>

                <div className="tab-content" id="nav-tabContent">
                  {/* 編輯收藏美食的內容 */}
                  <div
                    className="tab-pane fade show active "
                    id="nav-profile"
                    role="tabpanel"
                    aria-labelledby="nav-profile-tab"
                  >
                    <div className="form-container d-flex justify-content-center ">
                      <div className="row mb-3 ">
                      <ProductList/>
                      </div>
                    </div>
                  </div>
                 
                 
                  {/* 編輯收藏票眷的內容 */}
                  <div
                    className="tab-pane fade"
                    id="nav-ticket"
                    role="tabpanel"
                    aria-labelledby="nav-hotel-tab"
                  >
                    <div className="form-container d-flex justify-content-center ">
                      <div className="row mb-3 ">
                      <TicketList/>
                      </div>
                    </div>
                  </div>
                   {/* 編輯收藏住宿的內容 */}
                   <div
                    className="tab-pane fade"
                    id="nav-hotel"
                    role="tabpanel"
                    aria-labelledby="nav-hotel-tab"
                  >
                   <div className="form-container d-flex justify-content-center ">
                      <div className="row mb-3 ">
                      <HotelList/>
                      </div>
                    </div>
                  </div>
                   {/* 編輯收藏景點的內容 */}
                   <div
                    className="tab-pane fade "
                    id="nav-attraction"
                    role="tabpanel"
                    aria-labelledby="nav-attraction-tab"
                  >
                    <div className="form-container d-flex justify-content-center ">
                      <div className="row mb-3 ">
                      <AttrList/>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="m-space"></div>
      </div>
      <style jsx>
        {`
        @import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css');

.bg {
  background: url('/images/food/紙感背景.jpg');
  background-repeat: repeat;
}
margin: 0;
padding: 0;

p {
  font-size: 20px;
  color: #777777;
}
.container {
  margin-top: 100px;
}
.member-container {
}

.member-box {
  margin-top: -100px;
  padding: 1rem 2rem;
  display: inline-block;
  border: 3px solid #333333;
  font-size: 1rem;
  border-radius: 2% 3% 5% 4% / 1% 1% 2% 4%;
  text-transform: ;
  letter-spacing: 0.3ch;

  {/* 被景色 */}
  background: #7fb8b6;
  position: relative;

  
}

.m-breadcrumb {
  margin-top: 50px;
}
.nav-bar-size {
  margin-botton: 50px {
    /* height:150px; */
  }
}


.nav-tabs {
  border: none;
  outline: none;
  background-color: #137976;
}

.nav-tabs .nav-link {
  width:215px;

  color: #ffffff;
  background-color: #137976;
  border-radius: 0px 0px 0 0;
  border: none;
   {
    /* border: 1px solid #ccc; */
  }
}

.nav-tabs .nav-link.active {
  color: #ffffff; /* 選中的按鈕文字顏色 */
  background-color: #ffffff; /* 選中的按鈕背景顏色 */
  color: #137976;
  border-bottom: 4px solid #ffd367; /* 選中的按鈕底部邊框變黃色 */
  font-weight: bold;
}


/*td{ box-shadow:5px 5px 5px #000; text-align:center; height:40px; }*/

/* Remove min-height and set a fixed height for both tab panes */
.tab-pane {
  background-color: #ffffff;
  border-radius: 0px 0px 0px 0px;
  padding: 30px;
  width: 800px;
  
  margin: 30px;
  box-shadow: 10px 10px 10px #e0e0e0;
  border-spacing: 15px; /* 添加阴影效果 */
  position: relative;
}

/* Add styles for the confirm button */
.btn-confirm {
  position: absolute;
  bottom: 20px;
  right: 335px;

  background-color: #ffce56;
  color: #ffffff;
  border-radius: 5px;
}

/* label 的文字顏色 */
.tab-pane label {
  color: #ffffff;
  margin: 8px;
}

/* input 的樣式 */
.tab-pane input,
.tab-pane select {
  width: 100%;
  height: 50px;
  background-color: #f4f4f4;
  {/* border-radius: 5px; */}
  margin-bottom: 5px;
  padding: 10px;
  border: none;
}
.m-space {
  height: 100px;
}
        `}
      </style>
    </>
  )
}
