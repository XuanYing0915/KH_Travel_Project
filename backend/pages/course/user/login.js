import React from 'react'
import Link from 'next/link'
import { useAuth } from '@/hooks/use-auth'

export default function Login() {
  const { auth, setAuth } = useAuth()

  const loginButton = (
    <button
      onClick={() => {
        setAuth({
          id: 123,
          name: 'Eddy',
          token: 'xxxxx',
        })
      }}
    >
      登入
    </button>
  )

  const logoutButton = (
    <button
      onClick={() => {
        setAuth({
          id: 0,
          name: '',
          token: '',
        })
      }}
    >
      登出
    </button>
  )

  return (
    <>
      <h1>會員登入</h1>
      {auth.id === 0 ? loginButton : logoutButton}
      <hr />
      {/* 要用Link元件取代a連結，才能保持住狀態，不然在連結時會刷新頁面，狀態會重新初始化變為初始值 */}
      <Link href="/course/user/profile">會員資料</Link>
    </>
  )
}
