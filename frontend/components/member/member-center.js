import React, { useState, useEffect } from 'react'
import SideBar from '@/components/member/sidebar'
import Avatar from '@/components/member/avatar'
import Title from '@/components/title'
import { useAuthJWT } from '@/hooks/use-auth-jwt'
import axios from 'axios'
import Swal from 'sweetalert2'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useRouter } from 'next/router'

export default function MemberCenter() {
 
  const { authJWT } = useAuthJWT()
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [passwordsMatch, setPasswordsMatch] = useState(true)
  // 新增頭像狀態
  const [avatar, setAvatar] = useState('')
  const imageBaseUrl = 'http://localhost:3005/public/img/member/'

  // 元件掛載時取得目前使用者的頭像URL
  useEffect(() => {
    const fetchAvatar = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3005/api/imgupload/${authJWT.userData.member_id}`
        )
        const result = response.data
        console.log(result)
        if (result.code === '200') {
          setAvatar(result.avatar) // 假設後端返回頭像URL作為 "avatar" 屬性
        }
      } catch (error) {
        console.error('取得頭像失敗', error)
      }
    }

    fetchAvatar()
  }, [authJWT])

  // 這個函式用於處理圖片上傳// 在 handleUpload 函数内部进行图片上传并更新 avatar 状态
  const handleUpload = async (e) => {
    const file = e.target.files[0]

    if (file) {
      // 預覽頭像
      const reader = new FileReader()
      reader.onloadend = () => {
        setAvatar(reader.result) // 用於立即預覽
      }
      reader.readAsDataURL(file)

      const formData = new FormData()
      formData.append('avatar', file) // 注意這裡的資料欄名應與後端匹配

      try {
        // 這裡我們使用了會員ID作為URL的一部分
        const response = await axios.post(
          `http://localhost:3005/api/imgupload/${authJWT.userData.member_id}`,
          formData
        )
        const result = response.data
        if (result.code === '200') {
          setAvatar(result.avatar) // 更新 avatar 為服務器上的圖片路徑
          Swal.fire('上傳成功', '頭像已成功上傳。', 'success')
        } else {
          Swal.fire('上傳失敗', '上傳頭像時出現問題，請稍後再試。', 'error')
        }
      } catch (error) {
        Swal.fire('上傳失敗', '哭哭上傳頭像時出現問題，請稍後再試。', 'error')
      }
    }
  }

  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value)
  }

  // 密碼匹配驗證
  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value)
    setPasswordsMatch(e.target.value === newPassword)
  }

  // 密码修改页面中的handleSubmit函数
  const handlePasswordSubmit = async (e) => {
    e.preventDefault()

    if (passwordsMatch) {
      try {
        const response = await axios.post(
          'http://localhost:3005/api/formupdate/updatePassword',
          {
            member_id: authJWT.userData.member_id,
            new_password: newPassword,
          }
        )

        const result = response.data
        if (result.message === '密碼更新成功') {
          Swal.fire('密碼更新成功！', '你的密碼已成功修改。', 'success')
          // 清空输入框
          setNewPassword('')
          setConfirmPassword('')
        } else {
          Swal.fire('密碼更新失败', '密碼更新時出現問題，請稍后再試。', 'error')
        }
      } catch (error) {
        Swal.fire('密碼更新失败', '密码更新时出現問題，請稍后再試。', 'error')
      }
    } else {
      Swal.fire('密碼不匹配', '請確保兩次输入的密码相同。', 'error')
    }
  }

  // State 用於存放輸入的資料
  const [birthday, setBirthday] = useState('')
  const [userData, setUserData] = useState({
    email: '',
    first_name: '',
    last_name: '',
    birth_date: '',
    phone: '',
    country: '',
  })

  useEffect(() => {
    // 當組件掛載時，從資料庫抓取會員資料
    const fetchMemberData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3005/api/member/${authJWT.userData.member_id}`
        )
        const result = response.data[0]
        console.log(result)
        // 將資料庫的會員資料設置為 userData 的預設值
        setUserData({
          email: result.email,
          first_name: result.first_name,
          last_name: result.last_name,
          birth_date: result.birth_date,
          phone: result.phone,
          country: result.country,
        })
        // 將資料庫的生日設置為 birthday 的預設值
        setBirthday(result.birth_date)
      } catch (error) {
        console.error('取得會員資料失敗', error)
      }
    }

    fetchMemberData()
  }, [authJWT])

  // Handler 函式用於處理輸入欄位的變化
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setUserData((prevData) => ({ ...prevData, [name]: value }))
    // setUserData({
    //   ...userData,
    //   [name]: value,
    // })
  }
  console.log(avatar)
  console.log(imageBaseUrl)

  // // 函式用於處理表單的送出
  // const handleSubmit = (e) => {
  //   e.preventDefault()
  //   // 選擇性地，你可以在此處加入驗證邏輯
  //   // ...

  //   // 送出表單資料，例如透過 axios 發送 POST 請求
  //   // 包括 member_id
  //   const dataToSend = {
  //     ...userData,
  //     member_id: authJWT.userData.member_id,
  //   }
  //   axios
  //     .post('http://localhost:3005/api/formupdate/edit', {
  //       ...userData,
  //       member_id: authJWT.userData.member_id,
  //     })
  //     .then((response) => {
  //       // 處理成功的情況
  //       Swal.fire({
  //         icon: 'success',
  //         title: '修改成功',
  //         text: '你的個人資料已成功更新！',
  //         confirmButtonText: '確定',
  //       })
  //     })
  //     .catch((error) => {
  //       // 處理失敗的情況
  //       Swal.fire({
  //         icon: 'error',
  //         title: '出錯了！',
  //         text: '無法更新你的資料。請稍後再試。',
  //         confirmButtonText: '確定',
  //       })
  //     })
  // }
  
  const router = useRouter()

  useEffect(() => {
    if (!authJWT.isAuth) {
      Swal.fire({
        title: '請登入會員',
        text: '您必須登入才能訪問此頁面。',
        icon: 'warning',
      }).then((result) => {
        if (result.isConfirmed || result.isDismissed) {
          // 用戶確認後，重定向到會員登入頁
          router.push('/member/login')
        }
      })
    }
  }, [authJWT.isAuth, router])

  if (!authJWT.isAuth) return <></>
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
              <div className="">
                <Avatar />
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
                  title="會員資料修改"
                  style="title_box_dark"
                  fontSize="30px"
                />
                <nav>
                  <div className="nav nav-tabs" id="nav-tab" role="tablist">
                    <button
                      className="nav-link active edit "
                      id="nav-profile-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#nav-profile"
                      type="button"
                      role="tab"
                      aria-controls="nav-profile"
                      aria-selected="true"
                    >
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
                      會員帳號設定
                    </button>
                  </div>
                </nav>

                <div className="tab-content" id="nav-tabContent">
                  <div
                    className="tab-pane fade show active get-in-touch "
                    id="nav-profile"
                    role="tabpanel"
                    aria-labelledby="nav-profile-tab"
                  >
                    {/* 編輯個人資料的內容 */}
                    <section class="get-in-touch">
                      <form
                        className="contact-form row"
                        onSubmit={async (e) => {
                          e.preventDefault() // 阻止表單的默認提交行為

                          const formData = new FormData(e.target)
                          formData.append(
                            'member_id',
                            authJWT.userData.member_id
                          ) // 添加member_id

                          // 在提交表單之前處理空值欄位
                          if (!formData.get('first_name')) {
                            formData.set('first_name', userData.first_name)
                          }
                          if (!formData.get('email')) {
                            formData.set('email', userData.email)
                          }
                          if (!formData.get('phone')) {
                            formData.set('phone', userData.phone)
                          }
                          if (!formData.get('birth_date')) {
                            formData.set('birth_date', birthday)
                          }
                          if (!formData.get('country')) {
                            formData.set('country', userData.country)
                          }

                          const response = await fetch(
                            'http://localhost:3005/api/formupdate/edit',
                            {
                              method: 'POST',
                              body: formData,
                            }
                          )

                          // 你可以在這裡處理伺服器的回應
                          const result = await response.json()
                          console.log(result) // 根據 result 的內容來判斷是否成功
                          if (result.message === '修改成功') {
                            // 這裡你需要根據實際回傳的結果來判斷
                            Swal.fire(
                              '修改成功！',
                              '你的資料已成功修改。',
                              'success'
                            )
                            // 觸發一個名為 'updateUserData' 的自定義事件
                            const updateEvent = new Event('updateUserData')
                            window.dispatchEvent(updateEvent)
                          } else {
                            Swal.fire(
                              '修改失敗',
                              '資料修改時出現問題，請稍後再試。',
                              'error'
                            )
                          }
                        }}
                        // className="form-container d-flex justify-content-center "
                      >
                        {/*  */}

                        <div className="form-field col-lg-6">
                          <input
                            id="name"
                            className="input-text js-input"
                            type="text"
                            name="first_name"
                            onChange={handleInputChange}
                            placeholder={`${userData.first_name || '預設名稱'}`} // 使用預設值
                          />
                          <label className="label" htmlFor="name">
                            姓名 Name
                          </label>
                        </div>
                        <div className="form-field col-lg-6">
                          <input
                            id="email"
                            className="input-text js-input"
                            type="email"
                            name="email"
                            placeholder={userData.email || '預設電子郵件'} // 使用預設值
                            disabled="true"
                          />
                          <label className="label" htmlFor="email">
                            電子郵箱 E-mail{' '}
                          </label>
                        </div>
                        <div className="form-field col-lg-6">
                          <input
                            id="company"
                            className="input-text js-input"
                            type="text"
                            name="phone"
                            placeholder={userData.phone || '預設手機號碼'}
                            onChange={handleInputChange}
                          />
                          <label className="label" htmlFor="company">
                            手機 Phone
                          </label>
                        </div>
                        <div className="form-field col-lg-6">
                          <input
                            id="phone"
                            className="input-text js-input"
                            type="date"
                            name="birth_date"
                            value={birthday}
                            onChange={(e) => setBirthday(e.target.value)}
                          />
                          <label className="label" htmlFor="phone">
                            生日 Birthday
                          </label>
                        </div>
                        <div className="form-field col-lg-12">
                          <input
                            id="message"
                            className="input-text js-input"
                            type="text"
                            name="country"
                            placeholder={
                              userData.country
                                ? userData.country
                                : '請手動輸入地址'
                            }
                          />
                          <label className="label" htmlFor="message">
                            聯絡地址 Address
                          </label>
                        </div>
                        <div className="form-field col-lg-12">
                          <button
                            className="btn btn-confirm"
                            type="submit"
                            // onClick={handleSubmit}
                          >
                            確定修改
                          </button>
                        </div>
                      </form>
                    </section>
                  </div>

                  <div
                    className="tab-pane fade  get-in-touch "
                    id="nav-password"
                    role="tabpanel"
                    aria-labelledby="nav-password-tab"
                  >
                    {/* 編輯個人資料的內容 */}
                    <section class="get-in-touch">
                      <form
                        className="contact-form row"

                        // className="form-container d-flex justify-content-center "
                      >
                        {/*  */}

                        <div className="form-field col-lg-12">
                          <input
                            id="newpwd"
                            className="input-text js-input"
                            type="password"
                            placeholder="請輸入新密碼"
                            value={newPassword}
                            onChange={handleNewPasswordChange}
                            required
                          />
                          <label className="label" htmlFor="newpwd">
                            新密碼 NewPassword
                          </label>
                        </div>

                        <div className="form-field col-lg-12">
                          <input
                            id="pwdconfirm"
                            className={`input-text js-input ${
                              passwordsMatch ? '' : 'is-invalid'
                            }`}
                            type="text"
                            placeholder="再次輸入新密碼"
                            value={confirmPassword}
                            onChange={handleConfirmPasswordChange}
                            required
                          />
                          <label className="label" htmlFor="pwdconfirm">
                            密碼確認 PasswordConfirm
                          </label>
                        </div>

                        <div className="form-field col-lg-12">
                          <button
                            className="btn btn-confirm"
                            type="button"
                            onClick={handlePasswordSubmit}
                          >
                            確定修改
                          </button>
                        </div>
                      </form>
                    </section>
                  </div>
                  {/* <div
                    className="tab-pane fade get-in-touch"
                    id="nav-password"
                    role="tabpanel"
                    aria-labelledby="nav-password-tab"
                  >
                
                    <div className="form-container">
                      <section class="get-in-touch">
                      <form>
                        <div className="form-group">
                          <label>新密碼</label>
                          <input
                            type="password"
                            className="form-control"
                            placeholder="請輸入新密碼"
                            value={newPassword}
                            onChange={handleNewPasswordChange}
                          />
                        </div>
                        <div className="form-group">
                          <label>密碼確認</label>
                          <input
                            type="password"
                            className={`form-control ${passwordsMatch ? '' : 'is-invalid'
                              }`}
                            placeholder="再次輸入新密碼"
                            value={confirmPassword}
                            onChange={handleConfirmPasswordChange}
                          />
                          {!passwordsMatch && (
                            <div className="invalid-feedback">
                              密碼不匹配，请确保两次输入的密码相同。
                            </div>
                          )}
                        </div>
                        <div className="text-center">
                          <button
                            className="btn btn-primary"
                            type="button"
                            onClick={handlePasswordSubmit}
                          >
                            確定修改
                          </button>
                        </div>
                      </form>
                      </section> */}
                  {/* </div>
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="m-space"></div>
      </div>
      <style jsx>
        {`
          .contact-form .form-field {
            position: relative;
            margin: 32px 0;
          }
          .contact-form .input-text {
            display: block;
            width: 100%;
            height: 36px;
             {
              /* border-width: 0 0 2px 0; */
            }

            border-bottom: 3px solid black;
            border-color: #7fb8b6;
             {
              /* 輸入框被景色 */
            }
            background-color: #ffffff;
            font-size: 18px;
            line-height: 26px;
            font-weight: 400;
            padding-left: 16px;
          }
          .contact-form .input-text:focus {
            outline: none;
          }
           {
            /* label 彈跳動畫 */
          }
           {
            /* .contact-form .input-text:focus + .label,
          .contact-form .input-text.not-empty + .label {
            -webkit-transform: translateY(-14px);
            transform: translateY(-14px);
          } */
          }
          .contact-form .label {
            position: absolute;
            left: 20px;
            bottom: 30px;
            font-size: 18px;
            line-height: 26px;
            font-weight: 400;
             {
              /* color: #5543ca; */
            }
             {
              /* label 標題顏色 */
            }
            color: #000;
            cursor: text;
            transition: -webkit-transform 0.2s ease-in-out;
            transition: transform 0.2s ease-in-out;
            transition: transform 0.2s ease-in-out,
              -webkit-transform 0.2s ease-in-out;
          }

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

             {
              /* 被景色 */
            }
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
            width: 430px;

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
             {
              /* border-radius: 5px; */
            }
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
