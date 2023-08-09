import React, { useState, useContext, createContext, useEffect } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    isAuth: false,
    userData: {
      id: 0,
      name: '',
      email: '',
      username: '',
      r_date: '',
    },
  })
  // 如果使用google登入會多幾個欄位(iat, exp是由jwt token來的)
  // {
  //     "id": 8,
  //     "name": "",
  //     "email": "",
  //     "username": null,
  //     "r_date": "",
  //     "google_uid": "109150685961710971645",
  //     "photo_url": "",
  // }

  const router = useRouter()

  // 登入頁路由
  const loginRoute = '/user-test'
  // 隱私頁面路由，未登入時會，檢查後跳轉至登入頁
  const protectedRoutes = ['/user-test/login-status', '/xxxx/xxxx']

  // 檢查會員認証用
  const checkAuth = async () => {
    const res = await axios.get('http://localhost:3005/api/auth/check-login', {
      withCredentials: true,
    })

    if (res.data.message === 'authorized') {
      setAuth({ isAuth: true, userData: res.data.user })
    }
    // 可以在這裡實作跳轉
    else {
      if (protectedRoutes.includes(router.pathname)) {
        router.push(loginRoute)
      }
    }
  }

  // didMount(初次渲染)後，向伺服器要求檢查會員是否登入中
  useEffect(() => {
    if (router.isReady && !auth.isAuth) {
      checkAuth()
    }
    // 下面加入router.pathname，是為了要在向伺服器檢查後，
    // 如果有比對到是隱私路由，就執行跳轉到登入頁面工作
    // 注意有可能會造成向伺服器要求多次
    // eslint-disable-next-line
  }, [router.isReady, router.pathname])

  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
