import { useEffect } from 'react'
import useFirebase from '@/hooks/use-firebase'
import { useAuthJWT } from '@/hooks/use-auth-jwt'
import axios from 'axios'
import FacebookLogo from '@/components/icons/facebook-logo'

export default function FBLogin() {
  const { loginFBRedirect, logoutFirebase, initApp } = useFirebase()
  const { authJWT, setAuthJWT } = useAuthJWT()

  // 這裡要設定initApp，讓這個頁面能監聽firebase的google登入狀態
  useEffect(() => {
    initApp(callbackFBLoginRedirect)
  }, [])

  // 處理fb登入後，要向伺服器進行登入動作
  const callbackFBLoginRedirect = async (providerData) => {
    console.log(providerData)

    // 如果目前react(next)已經登入中，不需要再作登入動作
    if (authJWT.isAuth) return

    const res = await axios.post(
      'http://localhost:3005/api/facebook-login/jwt',
      providerData,
      {
        withCredentials: true, // 注意: 必要的，儲存 cookie 在瀏覽器中
      }
    )

    console.log(res.data)

    if (res.data.message === 'success') {
      setAuthJWT({
        isAuth: true,
        userData: res.data.user,
      })
    } else {
      alert('有錯誤')
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
      'http://localhost:3005/api/auth-jwt/logout-ssl-proxy',
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
      <h1>facebbok-login重定向測試頁(JWT)</h1>
      <p>會員狀態:{authJWT.isAuth ? '已登入' : '未登入'}</p>
      <button onClick={() => loginFBRedirect()}>
        <FacebookLogo /> facebbok登入(重定向)
      </button>
      <br />
      <button onClick={logout}>登出</button>
      <br />
      <button onClick={checkLogin}>向伺服器檢查登入狀態</button>
      <hr />
      <h1>FBLogin</h1>
    </>
  )
}
