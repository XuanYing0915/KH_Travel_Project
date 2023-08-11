import React from 'react'
import axios from 'axios'
import Link from 'next/link'
import { useAuth } from '@/hooks/use-auth'

// 模擬 session-cookie
export default function UserTestIndex() {
  const { auth, setAuth } = useAuth()

  return (
    <>
      <h1>會員登出入測試頁(session-cookie)</h1>
      <button
        onClick={async () => {
          const res = await axios.get('http://localhost:3005/api/users')
          console.log(res.data)
        }}
      >
        get users
      </button>
      <button
        onClick={async () => {
          const res = await axios.get('http://localhost:3005/api/users/1')
          console.log(res.data)
        }}
      >
        get user by id =1
      </button>
      <button
        onClick={async () => {
          const res = await axios.post('http://localhost:3005/api/users', {
            name: '金妮12132',
            email: 'ginny11132@test.com',
            username: 'ginny132',
            password: '12345',
          })

          console.log(res.data)
        }}
      >
        post user
      </button>
      <button
        onClick={async () => {
          const res = await axios.put('http://localhost:3005/api/users/3', {
            name: '金妮妮',
            email: 'ginny123@test.com',
            username: 'ginny123',
            password: '12345',
          })

          console.log(res.data)
        }}
      >
        put user
      </button>
      <hr />
      <button
        onClick={async () => {
          const res = await axios.post(
            'http://localhost:3005/api/auth/login',
            {
              username: 'ginny132',
              password: '12345',
            },
            {
              withCredentials: true, // save cookie in browser
            }
          )

          console.log(res.data)

          if (res.data.message === 'success' && res.data.user.id) {
            setAuth({
              isAuth: true,
              userData: res.data.user,
            })
          }

          // const res = await fetch('http://localhost:3005/api/auth/login', {
          //   method: 'POST',
          //   credentials: 'include',
          //   headers: {
          //     'Content-Type': 'application/json',
          //   },
          //   body: JSON.stringify({
          //     username: 'ginny132',
          //     password: '12345',
          //   }),
          // })
          // const data = await res.json()
          // console.log(data)
        }}
      >
        login
      </button>
      <button
        onClick={async () => {
          const res = await axios.post(
            'http://localhost:3005/api/auth/logout',
            {},
            {
              withCredentials: true, // save cookie in browser
            }
          )

          console.log(res.data)

          if (res.data.message === 'success') {
            setAuth({
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
            'http://localhost:3005/api/auth/check-login',
            {
              withCredentials: true, // save cookie in browser
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
            'http://localhost:3005/api/auth/private',
            {
              withCredentials: true, // save cookie in browser
            }
          )

          console.log(res.data)
        }}
      >
        access private
      </button>
      <hr />
      <Link href="/user-test/login-status">登入狀態頁(未登入無法觀看)</Link>
      <br />
      <Link href="/user-test/google-login">
        google-login測試頁(session-cookie)
      </Link>
    </>
  )
}
