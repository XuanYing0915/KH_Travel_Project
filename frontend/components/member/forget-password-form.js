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
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState(' 輸入你的會員電子郵件地址，按下"取得驗証碼"按鈕後，我們會將密碼重設指示寄送給你。')
  const [hasConfirmed, setHasConfirmed] = useState(false);
  const [showError, setShowError] = useState(false);
  
  // countdown use
  const [count, setCount] = useState(10) // 60s
  const [delay, setDelay] = useState(null) // delay=null to stop, delay=1000 to start
  const [hasError, setHasError] = useState(false);
  // countdown use
  const [hasTouchedConfirm, setHasTouchedConfirm] = useState(false); // 是否碰觸或修改過確認密碼
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
      setMessage('驗証碼取得失敗，請確認Email是否已經註冊')
      setHasError(true);
    }else {
      setHasError(false);
  }

    if (res.data.message === 'email sent') {
      setMessage('驗証碼已寄送到你填寫的Email信箱中')
      setCount(60) // reset countdown
      setDelay(1000) // 1000ms = 1s
    }
  }

  const resetPassword = async () => {
    if (!token) {
      setShowError(true);
      return;
  }
    const res = await axios.post(
      'http://localhost:3005/api/reset-password/reset',
      {
        email,
        token,
        password,
      }
    )

    if (res.data.message === 'success') {
      setShowError(false);
      setMessage('密碼已成功修改!');
    } else {
      setShowError(true);
      setMessage('密碼修改失敗!');
    }
    console.log(res.data)
  }
  return (<>
    <main className={`form-member w-100 m-auto text-center border border-dark my-5`}>
      <h2 className="text-center mb-5">重設密碼</h2>
      <p className={`text-center mb-3 ${styles['text-note']}`}>
      訊息: {message}
      </p>
      
        <div className="row mb-3">
          <div className="col-sm-12">
            <input
              type="email"
              className={`form-control w-100 ${styles['form-control']} ${hasError ? styles['invalid'] : ''} `}
              placeholder="電子郵件地址"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          {hasError && (
          <div className={`${styles['error']} my-2 text-start`}>
              請輸入有效的註冊會員電子郵件地址。
          </div>
      )}
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-sm-12">
            <div className="input-group">
              <input
                type="text"
                className={`form-control ${styles['form-control']}  ${showError && !token ? styles['invalid'] : ''} `}
                placeholder="電子郵件驗證碼"
                value={token}
                onChange={(e) => setToken(e.target.value)}
              />
              <button
                className="btn btn-outline-secondary"
                type="button"
                id="button-addon2"
                onClick={getOtp}
              >
                取得驗証碼
              </button>
            </div>
          </div>
          <div className={`${styles['error']} my-2 text-start`}>
          {delay ? count + '秒後可以再次取得驗証碼' : ''} 
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-sm-12">
            <input
              type="password"
              className={`form-control w-100  ${styles['form-control']} ${hasTouchedConfirm && password !== confirmPassword ? styles['invalid'] : ''} `}
              placeholder="密碼"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
     {
      hasTouchedConfirm && password && password !== confirmPassword && (
        <div className={`${styles['error']} my-2 text-start`}>
          請輸入新密碼。
        </div>
      )
    }
          </div>
        </div>
        <div className="row mb-3">
          <div className={` my-2 text-start col-sm-12`}>
            <input
              type="password"
              className={`form-control w-100 ${styles['form-control']}  ${hasTouchedConfirm && password !== confirmPassword ? styles['invalid'] : ''}`}
              placeholder="確認密碼"
              value={confirmPassword}
              onChange={(e) => {
                setHasTouchedConfirm(true);
                setConfirmPassword(e.target.value);
              }}
           
            />
           {
      hasTouchedConfirm && password !== confirmPassword && (
        <div className={`${styles['error']} my-2 text-start`}>
          請輸入新密碼。
        </div>
      )
    }
          </div>
        </div>

        <button className="btn btn-primary w-100" onClick={resetPassword}>
        重設密碼
        </button>

        <div className="row mt-2">
          <p className={`${styles['notice']}`}>
            還不是會員？
            <Link href="/member/register">加入我們</Link>。
          </p>
        </div>
      
    </main>
  </>)
}
