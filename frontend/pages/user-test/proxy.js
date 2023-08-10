import React from 'react'
import axios from 'axios'

export default function UserTestIndex() {
  return (
    <>
      <button
        onClick={async () => {
          const res = await axios.get('/node-api/users')
          console.log(res.data)
        }}
      >
        get users
      </button>
      <button
        onClick={async () => {
          const res = await axios.get('/node-api/users/1')
          console.log(res.data)
        }}
      >
        get user by id =1
      </button>
      <button
        onClick={async () => {
          const res = await axios.post('/node-api/users', {
            name: '金妮',
            email: 'ginny11@test.com',
            username: 'ginny',
            password: '12345',
          })

          console.log(res.data)
        }}
      >
        post user
      </button>
      <button
        onClick={async () => {
          const res = await axios.put('/node-api/users/3', {
            name: '金妮',
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
            '/node-api/auth/login',
            {
              username: 'ginny123',
              password: '12345',
            },
            {
              withCredentials: true, // save cookie in browser
            }
          )

          console.log(res.data)
        }}
      >
        login
      </button>
      <button
        onClick={async () => {
          const res = await axios.post(
            '/node-api/auth/logout',
            {},
            {
              withCredentials: true, // save cookie in browser
            }
          )

          console.log(res.data)
        }}
      >
        logout
      </button>
      <button
        onClick={async () => {
          const res = await axios.get('/node-api/auth/check-login', {
            withCredentials: true, // save cookie in browser
          })

          console.log(res.data)
        }}
      >
        check login
      </button>
      <button
        onClick={async () => {
          const res = await axios.get('/node-api/auth/private', {
            withCredentials: true, // save cookie in browser
          })

          console.log(res.data)
        }}
      >
        access private
      </button>
    </>
  )
}
