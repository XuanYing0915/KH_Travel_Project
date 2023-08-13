import { useState, useEffect } from 'react'
import axios from 'axios'
// countdown use
import useInterval from '@/hooks/use-interval'

export default function ForgetPassword() {
  const [email, setEmail] = useState('')
  const [token, setToken] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')

  // countdown use
  const [count, setCount] = useState(10) // 60s
  const [delay, setDelay] = useState(null) // delay=null to stop, delay=1000 to start

  // countdown use
  useInterval(() => {
    setCount(count - 1)
  }, delay)

  useEffect(() => {
    if (count <= 0) {
      setDelay(null)
    }
  }, [count])

  const getOtp = async () => {
    if (delay !== null) {
      setMessage('60s內無法重新獲得驗証碼')
      return
    }

    const res = await axios.post(
      'http://localhost:3005/api/reset-password/otp',
      {
        email,
      }
    )

    console.log(res.data)
    if (res.data.code === '400') {
      setMessage('驗証碼取得失敗，請確認Email是否已經註冊測')
    }

    if (res.data.message === 'email sent') {
      setMessage('驗証碼已寄送到你填寫的Email信箱中')
      setCount(60) // reset countdown
      setDelay(1000) // 1000ms = 1s
    }
  }

  const resetPassword = async () => {
    const res = await axios.post(
      'http://localhost:3005/api/reset-password/reset',
      {
        email,
        token,
        password,
      }
    )

    if (res.data.message === 'success') {
      setMessage('密碼已成功修改!')
    } else {
      setMessage('密碼修改失敗!')
    }
    console.log(res.data)
  }
  return (
    <>
      <h5 style={{ color: '#ff6600' }}>訊息: {message}</h5>
      <label>
        Email:
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>
      <br />
      <button onClick={getOtp}>
        {delay ? count + '秒後可以再次取得驗証碼' : '取得驗証碼'}
      </button>
      <br />
      <label>
        電子郵件驗証碼:
        <input
          type="text"
          value={token}
          onChange={(e) => setToken(e.target.value)}
        />
      </label>
      <br />
      <label>
        新密碼:
        <input
          type="text"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      <br />
      <button onClick={resetPassword}>重設密碼</button>
    </>
  )
}
