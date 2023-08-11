import React from 'react'
import Link from 'next/link'
// import FavoriteProductOne from '@/components/favorite-list/favorite-product-one'
import Image from 'next/image'
import SideBar from '@/components/member/sidebar'
import Title from '@/components/title'

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
              <SideBar />
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
                      id="nav-password-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#nav-password"
                      type="button"
                      role="tab"
                      aria-controls="nav-password"
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
                      id="nav-password-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#nav-password"
                      type="button"
                      role="tab"
                      aria-controls="nav-password"
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
                      id="nav-password-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#nav-password"
                      type="button"
                      role="tab"
                      aria-controls="nav-password"
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
                  <div
                    className="tab-pane fade show active "
                    id="nav-profile"
                    role="tabpanel"
                    aria-labelledby="nav-profile-tab"
                  >
                    {/* 編輯個人資料的內容 */}
                    <div className="form-container d-flex justify-content-center ">
                      <div className="row mb-3 ">
                        <div className="col-7">
                          <label>聯絡E-mail</label>
                          <input
                            type="email"
                            className="form-control"
                            placeholder="電子郵件"
                          />
                        </div>
                        <div className="col-7">
                          <label>上傳大頭貼</label>
                          <input type="file" className="form-control" />
                        </div>
                        <div className="col-7">
                          <label>姓名</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="姓名"
                          />
                        </div>
                        <div className="col-7">
                          <label>生日</label>
                          <input type="date" className="form-control" />
                        </div>
                        <div className="col-7">
                          <label>手機</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="請輸入手機號碼"
                          />
                        </div>
                        <label>聯絡地址</label>

                        {/* 可先用console log確認有沒有取到值 */}
                        <div className="col-7">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="請手動輸入地址"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="tab-pane fade"
                    id="nav-password"
                    role="tabpanel"
                    aria-labelledby="nav-password-tab"
                  >
                    {/* 票卷 */}
                    {/* 住宿 */}
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
            background: #ffffff;
            position: relative;

            {/* &::before {
              content: '';
              border: 2px solid #353535;
              display: block;
              width: 100%;
              height: 100%;
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate3d(-50%, -50%, 0) scale(1.015) rotate(0.5deg);
              border-radius: 1% 1% 2% 4% / 2% 6% 5% 4%;
            } */}
          }

          .m-breadcrumb {
            margin-top: 50px;
          }
          .nav-bar-size {
            margin-botton: 50px {
              /* height:150px; */
            }
          }

           {
            /* .nav-link {
            color: #137976;
          } */
          }
          .nav-tabs {
            border: none;
            outline: none;
            background-color: #137976;
          }

          .nav-tabs .nav-link {
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
            background-color: #7fb8b6; /* 選中的按鈕背景顏色 */
            border-bottom: 4px solid #ffd367; /* 選中的按鈕底部邊框變黃色 */
             {
              /* border-left:transparent
            border-top:transparent
            border-right:transparent */
            }
          }
           {
            /* .nav-profile{
            background-color: #137976
          } */
          }

          /*td{ box-shadow:5px 5px 5px #000; text-align:center; height:40px; }*/

          /* Remove min-height and set a fixed height for both tab panes */
          .tab-pane {
            background-color: #7fb8b6;
            border-radius: 0px 0px 0px 0px;
            padding: 30px;
            width: 800px;
            height: 750px;
            margin: 30px;
            box-shadow: 10px 10px 10px #e0e0e0;
            border-spacing: 15px; /* 添加阴影效果 */
            position: relative;
          }

          /* Add styles for the confirm button */
          .btn-confirm {
            position: absolute;
            bottom: 20px;
            right: 450px; /* 調整按鈕與右側的距離 */

            background-color: #ffce56;
            color: #ffffff;
            border-radius: 50px;
          }

          /* label 的文字顏色 */
          .tab-pane label {
            color: #ffffff;
            margin:8px;
          }

          /* input 的樣式 */
          .tab-pane input,
          .tab-pane select {
            width: 100%;
            height: 50px;
            background-color: #f4f4f4;
            border-radius: 20px;
            margin-bottom: 20px;
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
