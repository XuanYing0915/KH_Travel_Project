import React, { useState, useEffect } from 'react'
import SideBar from '@/components/member/sidebar'
import Title from '@/components/title'
import { useAuthJWT } from '@/hooks/use-auth-jwt'
import axios from 'axios'
import Swal from 'sweetalert2'

export default function MemberCenter() {
  const { authJWT } = useAuthJWT()
  // State 用於存放輸入的資料
  const [userData, setUserData] = useState({
    email: authJWT.userData.email,
    first_name: authJWT.userData.first_name,
    last_name: authJWT.userData.last_name,
    birth_date: authJWT.userData.birth_date,
    phone: authJWT.userData.phone,
    country: authJWT.userData.country,
  });
  // Handler 函式用於處理輸入欄位的變化
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({ ...prevData, [name]: value }));
    // setUserData({
    //   ...userData,
    //   [name]: value,
    // })
  };

  // 函式用於處理表單的送出
  const handleSubmit = (e) => {
    e.preventDefault()
    // 選擇性地，你可以在此處加入驗證邏輯
    // ...

    // 送出表單資料，例如透過 axios 發送 POST 請求
    // 包括 member_id
  const dataToSend = {
    ...userData,
    member_id: authJWT.userData.member_id,
  };
    axios
      .post('http://localhost:3005/api/formupdate/edit',  dataToSend)
      .then((response) => {
        // 處理成功的情況
        Swal.fire({
          icon: 'success',
          title: '修改成功',
          text: '你的個人資料已成功更新！',
          confirmButtonText: '確定',
        })
      })
      .catch((error) => {
        // 處理失敗的情況
        Swal.fire({
          icon: 'error',
          title: '出錯了！',
          text: '無法更新你的資料。請稍後再試。',
          confirmButtonText: '確定',
        });
      })
  }
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
              <div className="member-box">
                <Title
                  title="會員資料修改"
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
                    <form
                      action="http://localhost:3005/api/formupdate/edit"
                      method="post"
                      className="form-container d-flex justify-content-center "
                    >
                      <div className="row mb-3">
                        <label for="account" class="col-sm-2 control-label">
                          帳號 (Email)
                        </label>
                        <div class="col-sm-10">
                          <input
                            type="email"
                            class="form-control"
                            id="account"
                            placeholder={
                              authJWT.userData.email
                                ? authJWT.userData.email
                                : '電子郵件'
                            }
                            disabled=""
                            name='email'
                            
                          />
                          {/* <p class="help-block">e-mail即帳號，無法修改。</p> */}
                        </div>

                        <label for="nickname" class="col-sm-2 control-label">
                          真實姓名
                        </label>
                        <div class="col-sm-10">
                          <input
                            type="text"
                            name="first_name"
                            value={userData.first_name}
                            onChange={handleInputChange}
                            class="form-control"
                            id="nickname"
                            placeholder={userData.first_name || '請輸入名字'}
                          />
                          {/* <p class="help-block">請輸入真實姓名。</p> */}
                        </div>
                        <div className="row justify-content-center">
                          <div className="col-sm-6">
                            <label
                              for="birthday"
                              class="col-sm-2 control-label"
                            >
                              生日
                            </label>
                            <input
                            name='birth_date'
                              type="date"
                              className="form-control"
                              value={authJWT.userData.birth_date}
                            />
                          </div>
                          <div className="col-sm-6">
                            <label>手機</label>
                            <input
                              type="text"
                              name='phone'
                              className="form-control"
                              placeholder={authJWT.userData.phone}
                            />
                          </div>
                        </div>
                        <label>聯絡地址</label>
                        <div className="col-sm-12">
                          <input
                            type="text"
                            name='country'
                            className="form-control"
                            placeholder={
                              authJWT.userData.country
                                ? authJWT.userData.country
                                : '請手動輸入地址'
                            }
                          />
                        </div>
                      </div>

                      <button
                        className="btn btn-confirm"
                        type="submit"
                        // onClick={handleSubmit}
                      >
                        確定修改
                      </button>
                    </form>
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
                        <div className="col-sm-12">
                          <label>新密碼</label>
                          <input
                            type="password"
                            className="form-control"
                            placeholder="請輸入新密碼"
                          />
                        </div>
                        <div className="col-sm-12">
                          <label>密碼確認</label>
                          <input
                            type="password"
                            className="form-control"
                            placeholder="再次輸入新密碼"
                          />
                        </div>
                      </div>
                      <button
                        className="btn btn-confirm"
                        onClick={handleSubmit}
                      >
                        確定修改
                      </button>
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
            background: #ffffff;
            position: relative;

             {
              /* &::before {
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
            } */
            }
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
            height: 550px;
            margin: 30px;
            box-shadow: 10px 10px 10px #e0e0e0;
            border-spacing: 15px; /* 添加阴影效果 */
            position: relative;
          }

          /* Add styles for the confirm button */
          .btn-confirm {
            position: absolute;
            bottom: 20px;
            right: 360px;

            background-color: #ffce56;
            color: #ffffff;
            border-radius: 15px;
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
