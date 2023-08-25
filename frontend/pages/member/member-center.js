import React, { useEffect } from 'react'
import MemberCenter from '@/components/member/member-center'
import { useAuthJWT } from '@/hooks/use-auth-jwt'
import Swal from 'sweetalert2'
import { useRouter } from 'next/router'

export default function Login() {
  // const { authJWT } = useAuthJWT()
  // const router = useRouter()

  // useEffect(() => {
  //   if (!authJWT.isAuth) {
  //     Swal.fire({
  //       title: '請登入會員',
  //       text: '您必須登入才能訪問此頁面。',
  //       icon: 'warning',
  //     }).then((result) => {
  //       if (result.isConfirmed || result.isDismissed) {
  //         // 用戶確認後，重定向到會員登入頁
  //         router.push('/member/login')
  //       }
  //     })
  //   }
  // }, [authJWT.isAuth, router])

  // if (!authJWT.isAuth) return null

  return <MemberCenter />
}
