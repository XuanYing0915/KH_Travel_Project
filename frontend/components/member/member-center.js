import React, { useState } from 'react'
import SideBar from '@/components/member/sidebar'

// 渲染畫面
export default function MemberCenter() {
  // selectedImageIndex 紀錄當前輪播圖片位置

  return (
    <>
      <div className="m-100"></div>
      <div className="container  mx-auto">
      {/* Add the Breadcrumb here */}
      <div className="row mb-3">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <a href="/">首頁</a>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                會員中心
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                會員資料修改  
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
            <div>
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
                      className="fa-solid fa-pen"
                      style={{ marginRight: '15px' }}
                    />
                    編輯個人資料
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
                      className="fa-solid fa-unlock"
                      style={{ marginRight: '15px' }}
                    />
                    會員帳號設定
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
                    
                    
                    <button className="btn btn-confirm">確定修改</button>
                  </div>
                </div>
                <div
                  className="tab-pane fade"
                  id="nav-password"
                  role="tabpanel"
                  aria-labelledby="nav-password-tab"
                >
                  {/* 編輯密碼的內容 */}
                  <div className="form-container">
                    <div className="row mb-3">
                    <div className="col-7">
                        <label>電子郵箱</label>
                        <input
                          type="mail"
                          className="form-control"
                          placeholder="請輸入電子郵箱"  
                        />
                      </div>
                      <div className="col-7">
                        <label>新密碼</label>
                        <input
                          type="password"
                          className="form-control"
                          placeholder="請輸入新密碼"
                        />
                      </div>
                      <div className="col-7">
                        <label>密碼確認</label>
                        <input
                          type="password"
                          className="form-control"
                          placeholder="再次輸入新密碼"
                        />
                      </div>
                    </div>
                    <button className="btn btn-confirm">確定修改</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="m-space"></div>
      <style jsx>
        {`
          @import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css');

          p {
            font-size: 20px;
            color: #777777;
          }
          .container {
          }
          .member-container {
          }
          .nav-bar-size {
            margin-botton: 50px {
              /* height:150px; */
            }
          }

          .nav-ink {
            color: #777777;
          }
          .nav-tabs {
            border: none;
            outline: none;
          }

          .nav-tabs .nav-link {
            color: #777777;
            background-color: #e6e6e6;
            border-radius: 0px 0px 0 0;
            border: 1px solid #ccc;
          }

          .nav-tabs .nav-link.active {
            color: #777777; /* 選中的按鈕文字顏色 */
            background-color: #e6e6e6; /* 選中的按鈕背景顏色 */
            border-bottom-color: transparent; /* 選中的按鈕底部邊框透明 */
          }

          /* Remove min-height and set a fixed height for both tab panes */
          .tab-pane {
            background-color: #e6e6e6;
            border-radius: 0px 0px 0px 0px;
            padding: 30px;
            width: 1000px;
            height: 750px;
            box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.25); /* 添加阴影效果 */
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
            color: #6d6969;
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
