import { useEffect } from 'react'
import Link from 'next/link'
import { useAuthJWT } from '@/hooks/use-auth-jwt'

export default function LoginStatusJWT() {
  const { authJWT } = useAuthJWT()

  // 未登入時，不會出現頁面內容
  if (!authJWT.isAuth) return <></>

  return (
    <>
      <h1>會員專用頁面(未登入無法觀看)</h1>
      <p>會員姓名:{authJWT.userData.name}</p>
      <Link href="/user-test/jwt">JWT授權&登入測試</Link>
    </>
  )
}
