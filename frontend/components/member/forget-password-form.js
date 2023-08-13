import styles from './member.module.css'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import axios from 'axios'
// countdown use
import useInterval from '@/hooks/use-interval'

export default function ForgetPasswordForm() {
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
    if (res.data.message === 'fail') {
      setMessage('驗証碼取得失敗，請確認Email是否已經註冊')
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
  return (<>
    <main className={`form-member w-100 m-auto text-center border border-dark my-5`}>
      <h2 className="text-center mb-5">重設密碼</h2>
      <p className={`text-center mb-3 ${styles['text-note']}`}>
        輸入你的會員電子郵件地址，按下&quot;取得驗証碼&ldquo;按鈕後，我們會將密碼重設指示寄送給你。
      </p>
      <form>
        <div className="row mb-3">
          <div className="col-sm-12">
            <input
              type="email"
              className={`form-control w-100 ${styles['form-control']} ${styles['invalid']} `}
              placeholder="電子郵件地址"
            />
          </div>
          <div className={`${styles['error']} my-2 text-start`}>
            請輸入有效的註冊會員電子郵件地址。
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-sm-12">
            <div className="input-group">
              <input
                type="text"
                className={`form-control ${styles['form-control']} ${styles['invalid']} `}
                placeholder="電子郵件驗證碼"
              />
              <button
                className="btn btn-outline-secondary"
                type="button"
                id="button-addon2"
              >
                取得驗証碼
              </button>
            </div>
          </div>
          <div className={`${styles['error']} my-2 text-start`}>
            請輸入驗証碼。
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-sm-12">
            <input
              type="password"
              className={`form-control w-100 ${styles['form-control']} ${styles['invalid']} `}
              placeholder="密碼"
            />
          </div>
          <div className={`${styles['error']} my-2 text-start`}>
            請輸入新密碼。
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-sm-12">
            <input
              type="password"
              className={`form-control w-100 ${styles['form-control']} ${styles['invalid']} `}
              placeholder="確認密碼"
            />
          </div>
          <div className={`${styles['error']} my-2 text-start`}>
            請輸入確認密碼。
          </div>
        </div>

        <button type="submit" className="btn btn-primary w-100" onClick={resetPassword}>
        重設密碼
        </button>

        <div className="row mt-2">
          <p className={`${styles['notice']}`}>
            還不是會員？
            <Link href="/member/register">加入我們</Link>。
          </p>
        </div>
      </form>
    </main>
  </>)
}
