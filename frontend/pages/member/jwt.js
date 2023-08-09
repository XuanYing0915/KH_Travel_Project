import React from 'react'
import axios from 'axios'
import Link from 'next/link'
import { useAuthJWT } from '@/hooks/use-auth-jwt'

export default function UserTestJWT() {
  const parseJwt = (token) => {
    const base64Payload = token.split('.')[1]
    const payload = Buffer.from(base64Payload, 'base64')
    return JSON.parse(payload.toString())
  }

  const { setAuthJWT } = useAuthJWT()

  return (
    <>
      <h1>JWT授權&登入測試</h1>
      <hr />
      <button
        onClick={async () => {
          const res = await axios.post(
            'http://localhost:3005/api/auth-jwt/login',
            {
              username: 'ginny132',
              password: '12345',
            },
            {
              withCredentials: true, // save cookie in browser
            }
          )

          console.log(res.data)
          console.log(parseJwt(res.data.accessToken))

          if (res.data.message === 'success') {
            setAuthJWT({
              isAuth: true,
              userData: parseJwt(res.data.accessToken),
            })
          }
        }}
      >
        login
      </button>
      <button
        onClick={async () => {
          const res = await axios.post(
            'http://localhost:3005/api/auth-jwt/logout',
            {},
            {
              withCredentials: true, // save cookie in browser
            }
          )

          console.log(res.data)

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
        }}
      >
        logout
      </button>
      <button
        onClick={async () => {
          const res = await axios.get(
            'http://localhost:3005/api/auth-jwt/check-login',
            {
              withCredentials: true,
            }
          )

          console.log(res.data)
        }}
      >
        check login
      </button>
      <button
        onClick={async () => {
          const res = await axios.get(
            'http://localhost:3005/api/auth-jwt/private',
            {
              withCredentials: true,
            }
          )

          console.log(res.data)
        }}
      >
        access private
      </button>
      <hr />
      <Link href="/user-test/google-login-jwt">google-login測試頁(jwt)</Link>
      <br />
      <Link href="/user-test/login-status-jwt">會員登入狀態頁</Link>
    </>
  )
}
