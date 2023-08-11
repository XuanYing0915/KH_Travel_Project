import useFirebase from '@/hooks/use-firebase'
import axios from 'axios'
import { useAuthJWT } from '@/hooks/use-auth-jwt'
import GoogleLogo from '@/components/icons/google-logo'
import Link from 'next/link'

export default function GoogleLoginJWT() {
  const { loginGoogle, logoutFirebase } = useFirebase()
  const { authJWT, setAuthJWT } = useAuthJWT()

  const parseJwt = (token) => {
    const base64Payload = token.split('.')[1]
    const payload = Buffer.from(base64Payload, 'base64')
    return JSON.parse(payload.toString())
  }

  const callbackGoogleLogin = async (providerData) => {
    console.log(providerData)

    const res = await axios.post(
      'http://localhost:3005/api/google-login/jwt',
      providerData,
      {
        withCredentials: true, // 注意: 必要的，儲存 cookie 在瀏覽器中
      }
    )

    console.log(res.data)

    console.log(res.data)
    console.log(parseJwt(res.data.accessToken))

    if (res.data.message === 'success') {
      setAuthJWT({
        isAuth: true,
        userData: parseJwt(res.data.accessToken),
      })
    }
  }

  const checkLogin = async () => {
    const res = await axios.get(
      'http://localhost:3005/api/auth-jwt/check-login',
      {
        withCredentials: true, // 從瀏覽器獲取cookie
      }
    )

    console.log(res.data)
  }

  const logout = async () => {
    // firebase logout(注意，並不會登出google帳號)
    logoutFirebase()

    // 伺服器logout
    const res = await axios.post(
      'http://localhost:3005/api/auth-jwt/logout',
      {},
      {
        withCredentials: true, // save cookie in browser
      }
    )

    if (res.data.message === 'success') {
      setAuthJWT({
        isAuth: false,
        userData: {
          id: 0,
          name: '',
          username: '',
          r_date: '',
        },
      })
    }
  }

  return (
    <>
      <h1>google-login測試頁(jwt)</h1>
      <p>會員狀態:{authJWT.isAuth ? '已登入' : '未登入'}</p>
      <button onClick={() => loginGoogle(callbackGoogleLogin)}>
        <GoogleLogo /> 用google登入
      </button>
      <br />
      <button onClick={logout}>登出</button>
      <br />
      <button
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
      </button>
      <hr />
      <Link href="/user-test/jwt">會員測試頁(jwt)</Link>
      <br />
      <Link href="/user-test/login-status-jwt">登入狀態頁(未登入無法觀看)</Link>
    </>
  )
}
