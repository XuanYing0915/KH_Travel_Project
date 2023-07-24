import React from 'react'
import Link from 'next/link'
import { useAuth } from '@/hooks/use-auth'

export default function Profile() {
  const { auth } = useAuth()

  return (
    <>
      <h1>會員資料</h1>
      <p>id:{auth.id}</p>
      <p>姓名:{auth.name}</p>
      <p>token:{auth.token}</p>
      <hr />
      {/* 要用Link元件取代a連結，才能保持住狀態，不然在連結時會刷新頁面，狀態會重新初始化變為初始值 */}
      <Link href="/course/user/login">登入</Link>
    </>
  )
}
