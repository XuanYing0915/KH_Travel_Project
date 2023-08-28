import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import styles from './member.module.css'
import Link from 'next/link'
import { useAuthJWT } from '@/hooks/use-auth-jwt'
import LineLogo from '@/components/icons/line-logo'
import GoogleLogo from '@/components/icons/google-logo'
import FacebookLogo from '@/components/icons/facebook-logo'
import useFirebase from '@/hooks/use-firebase'
import axios from 'axios'
import Swal from 'sweetalert2'

export default function LoginForm() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [emailError, setEmailError] = useState(false)
  const [passwordError, setPasswordError] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [loginError, setLoginError] = useState('');
  // loginGoogleRedirect無callback，要改用initApp在頁面初次渲染後監聽google登入狀態
  const { loginGoogleRedirect, initApp, logoutFirebase, loginGoogle } =
    useFirebase()
  const { authJWT, setAuthJWT } = useAuthJWT()

  useEffect(() => {
    initApp(callbackGoogleLoginRedirect)
  }, [])
  // 解析jwt access token
  const parseJwt = (token) => {
    const base64Payload = token.split('.')[1]
    const payload = Buffer.from(base64Payload, 'base64')
    return JSON.parse(payload.toString())
  }

  // 處理line登入後，要向伺服器進行登入動作
  const callbackLineLogin = async (cUrl) => {
    const res = await axios.get(cUrl, {
      withCredentials: true, // 注意: 必要的，儲存 cookie 在瀏覽器中
    })

    console.log(res.data)

    if (res.data.message === 'success') {
      setAuthJWT({
        isAuth: true,
        userData: parseJwt(res.data.accessToken), // jwt use
      })
      router.push('/member/member-center')
    } else {
      console.log('login fail or not from login page')
    }
  }
  // 處理登入
  const goLineLogin = () => {
    // 向後端(express/node)伺服器要求line登入的網址
    axios
      .get('http://localhost:3005/api/line-login/login', {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data.url)
        // 重定向到line 登入頁
        if (res.data.url) window.location.href = res.data.url
      })

  }
  // 從line登入畫面後回調到本頁面用
  useEffect(() => {
    // 水合作用(hydration)保護，以免得不到window全域物件
    if (router.isReady) {
      // 判斷是否有query.code(網址上沒有code是進登入頁的時候)
      if (!router.query.code) return

      const qs = new URLSearchParams({
        ...router.query,
      }).toString()

      const cbUrl = `http://localhost:3005/api/line-login/callback?${qs}`

      // 發送至後端伺服器得到line會員資料
      callbackLineLogin(cbUrl)
    }
    // eslint-disable-next-line
  }, [router.isReady, router.query])
  // 處理google登入後，要向伺服器進行登入動作
  const callbackGoogleLoginRedirect = async (providerData) => {
    console.log(providerData)

    if (authJWT.isAuth) return

    const res = await axios.post(
      'http://localhost:3005/api/google-login/jwt',
      providerData,
      {
        withCredentials: true, // 注意: 必要的，儲存 cookie 在瀏覽器中
      }
    )

    console.log(res.data)

    console.log(parseJwt(res.data.accessToken))

    if (res.data.message === 'success') {
      setAuthJWT({
        isAuth: true,
        userData: parseJwt(res.data.accessToken),
      })
    } else {
      alert('有錯誤')
    }
  }




  const handleLogin = async (e) => {
    e.preventDefault()
    // const data = [111, 222, 33]
    // console.log(data)
    try {
      const res = await axios.post(
        'http://localhost:3005/api/auth-jwt/login',
        {
          email: email,
          password: password,
        },
        {
          withCredentials: true, // save cookie in browser
        }
      )

      console.log(res.data)
      console.log(parseJwt(res.data.accessToken))
      if (res.data.email) {
        setIsLoggedIn(true);

      } else {
        if (res.data.message === 'success') {
          setAuthJWT({
            isAuth: true,
            userData: parseJwt(res.data.accessToken),
          })
          setIsLoggedIn(true)
          // 使用 SweetAlert2 显示成功登录消息
          Swal.fire({
            icon: 'success',
            title: '成功登入',

            timer: 2000, // 延迟2秒
            showConfirmButton: false, // 不显示确认按钮
          }).then(() => {
            router.push('/member/member-center'); // 成功登录后跳转
          });
        } else {
          console.error('Login failed:', res.data.error)

        }
      }

      // 在這裡檢查 res.data，如果登入成功，則顯示成功訊息
      // 如果登入失敗，則顯示錯誤訊息
    } catch (error) {
      console.log(error);
      setLoginError('登入失敗：無效的電子郵件或密碼'); // 设置登录错误消息
      // 在這裡處理其他錯誤，例如連接問題等
      // 使用 SweetAlert2 显示登录错误消息
      // 在这里处理登录失败的情况，并显示 SweetAlert2 消息
      showLoginErrorAlert();
    }
  }
  const showLoginErrorAlert = () => {
    // 使用 SweetAlert2 显示登录失败消息
    Swal.fire({
      icon: 'error',
      title: '登入失敗',
      text: '無效的電子郵件或密碼',
    });
  }
  useEffect(() => {
    setEmailError(!/\S+@\S+\.\S+/.test(email))
  }, [email])

  useEffect(() => {
    setPasswordError(!password)
  }, [password])

  return (
    <>
      {isLoggedIn && <p>成功登入！</p>}

      <div className="container col-xl-10 col-xxl-8 px-4 py-5 ">
        <div class="row align-items-center g-lg-5 py-5">
          <div class="col-lg-7 text-center text-lg-start">
            <h1 class="display-4 fw-bold lh-1 text-color  mb-3 ">
              高雄旅遊，說走就走

            </h1>
            <h1 class="display-4 fw-bold lh-1 text-color  mb-3 ">

              Visit Formosa
            </h1>
            <p class="col-lg-10 fs-4 text-color">探訪福爾摩沙之美，就從高雄開始！</p>
          </div>

          <div className="col-md-10 mx-auto col-lg-5 form-member w-100 m-auto text-center border border-dark ggg sidebar-frame p-4">
            <h2 className="text-center mb-5 ">會員登入</h2>

            <form onSubmit={handleLogin} >
              <div className="row mb-3">
                <div className="col-sm-12">
                  <input
                    type="email"
                    className={`form-control w-100 ${styles['form-control']}
                `}
                    // ${emailError ? styles['invalid'] : ''}
                    placeholder="電子郵件地址"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                {/* {emailError && <div className={`${styles['error']} my-2 text-start`}>請輸入有效的電子郵件地址。</div>} */}
              </div>
              <div className="row mb-3">
                <div className="col-sm-12">
                  <input
                    type="password"
                    className={`form-control w-100 ${styles['form-control']} `}
                    // ${passwordError ? styles['invalid'] : ''}
                    placeholder="密碼"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                {/* {passwordError && <div className={`${styles['error']} my-2 text-start`}>請輸入密碼。</div>} */}
              </div>
              <div className="row mb-3">
                <div className="col-sm-6 text-start">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="gridCheck1"
                    />
                    <label
                      className={`form-check-label  ${styles['notice']}`}
                      htmlFor="gridCheck1"
                    >
                      保持登入狀態
                    </label>
                  </div>
                </div>
                <div className="col-sm-4 offset-sm-2 test-end">
                  <Link
                    href="/member/forget-password"
                    className={`${styles['notice']} font-size`}
                  >
                    忘記密碼？
                  </Link>
                </div>
              </div>
              <div className="row mb-2">
                <p className={`${styles['notice']}`}>
                  如登入，即代表同意本站
                  <Link href="/about">隱私權政策</Link>和
                  <Link href="/about">使用條款</Link>。
                </p>
              </div>

              <button type="submit" className="btn btn-primary w-100 ">
                登入
              </button>

              <div className="row mt-2">
                <p className={`${styles['notice']}`}>
                  還不是會員？
                  <Link href="/member/register" className='font-size'>加入我們</Link>。
                </p>
              </div>

              <div className={`mb-3 ${styles['hr-sect']}`}>快速登入</div>
              <div className="row mb-2">
                <div className="col-sm-12 text-start">
                  <div className="d-flex justify-content-center">
                    <button type='button'
                      className=" btn btn-light  btn-block"
                      onClick={goLineLogin}
                    >
                      <LineLogo />
                    </button>
                    {/* <p>會員狀態:{authJWT.isAuth ? '已登入' : '未登入'}</p> */}
                    <button type='button'
                      className="btn btn-light btn-block"
                      onClick={() =>
                        loginGoogleRedirect(callbackGoogleLoginRedirect)
                      }
                    >
                      <GoogleLogo />
                    </button>
                    {/* <br />
                    <button onClick={logout}>登出</button>
                    <br /> */}
                    {/* <button
                      onClick={async () => {
                        const res = await axios.get(
                          'http://localhost:3005/api/auth-jwt/check-login',
                          {
                            withCredentials: true, // save cookie in browser
                          }
                        )

                        console.log(res.data)
                      }}
                    >
                      向伺服器檢查登入狀態
                    </button> */}
                    {/* <FacebookLogo className="mx-3" /> */}
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>


    </>
  )
}
