import styles from './member.module.css'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'
// countdown use
import useInterval from '@/hooks/use-interval'

export default function ForgetPasswordForm() {
  const [email, setEmail] = useState('')
  const [token, setToken] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState(
    ' 輸入你的會員電子郵件地址，按下"取得驗証碼"按鈕後，我們會將密碼重設指示寄送給你。'
  )
  const [hasConfirmed, setHasConfirmed] = useState(false)
  const [showError, setShowError] = useState(false)

  // countdown use
  const [count, setCount] = useState(10) // 60s
  const [delay, setDelay] = useState(null) // delay=null to stop, delay=1000 to start
  const [hasError, setHasError] = useState(false)
  // countdown use
  const [hasTouchedConfirm, setHasTouchedConfirm] = useState(false) // 是否碰觸或修改過確認密碼
  // 新增倒數計時狀態
  const [redirectCountdown, setRedirectCountdown] = useState(null)
  // 增加一個用於重定向倒數的 useEffect
  useEffect(() => {
    if (redirectCountdown === 0) {
      // 這裡填寫跳轉到登錄頁面的程式碼
      window.location.href = 'http://localhost:3000/member/login' // 假設登錄頁面的路徑是 /login
    }
  }, [redirectCountdown])
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
      setHasError(true)
    } else {
      setHasError(false)
    }

    if (res.data.message === 'email sent') {
      setMessage('驗証碼已寄送到你填寫的Email信箱中')
      setCount(60) // reset countdown
      setDelay(1000) // 1000ms = 1s
    }
  }

  const resetPassword = async () => {
    if (!token) {
      setShowError(true)
      return
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
      setShowError(false)
      setMessage('密碼已成功修改!')
      let timerInterval = setInterval(() => {
        setRedirectCountdown((prev) => prev - 1);
      }, 1000);
    
      Swal.fire({
        title: '即將跳轉',
        html: '3 秒後將自動跳轉到登錄頁面。',
        timer: 3000,
        timerProgressBar: true,
        didOpen: () => {
          Swal.showLoading();
          const b = Swal.getHtmlContainer().querySelector('b');
          timerInterval = setInterval(() => {
            if (b) b.textContent = redirectCountdown;
          }, 1000);
        },
        willClose: () => {
          clearInterval(timerInterval);
        }
      }).then((result) => {
        if (result.dismiss === Swal.DismissReason.timer) {
          window.location.href = "http://localhost:3000/member/login";
        }
      });
    }else {
      setShowError(true)
      setMessage('密碼修改失敗!')
    }
    console.log(res.data)
  }

  // 增加一個倒數計時的 useEffect
  useEffect(() => {
    if (redirectCountdown > 0) {
      const timer = setTimeout(() => {
        setRedirectCountdown(redirectCountdown - 1)
      }, 1000)
      return () => clearTimeout(timer) // 清理計時器
    }
  }, [redirectCountdown])
  return (
    <><div className='d-flex '>
      <main
        className={`sidebar-frame form-member w-100 m-auto text-center border border-dark my-5 ggg p-4`}
      >
        <h2 className="text-center mb-5">重設密碼</h2>
        <p className={`text-center mb-3 ${styles['text-note']}`}>
          訊息: {message}
        </p>
        {redirectCountdown !== null && (
          <p>即將跳轉，剩餘 {redirectCountdown} 秒</p>
        )}
        <div className="row mb-3">
          <div className="col-sm-12">
            <input
              type="email"
              className={`form-control w-100 ${styles['form-control']} ${
                hasError ? styles['invalid'] : ''
              } `}
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
                className={`form-control ${styles['form-control']}  ${
                  showError && !token ? styles['invalid'] : ''
                } `}
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
              className={`form-control w-100  ${styles['form-control']} ${
                hasTouchedConfirm && password !== confirmPassword
                  ? styles['invalid']
                  : ''
              } `}
              placeholder="密碼"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {hasTouchedConfirm && password && password !== confirmPassword && (
              <div className={`${styles['error']} my-2 text-start`}>
                請輸入新密碼。
              </div>
            )}
          </div>
        </div>
        <div className="row mb-3">
          <div className={` my-2 text-start col-sm-12`}>
            <input
              type="password"
              className={`form-control w-100 ${styles['form-control']}  ${
                hasTouchedConfirm && password !== confirmPassword
                  ? styles['invalid']
                  : ''
              }`}
              placeholder="確認密碼"
              value={confirmPassword}
              onChange={(e) => {
                setHasTouchedConfirm(true)
                setConfirmPassword(e.target.value)
              }}
            />
            {hasTouchedConfirm && password !== confirmPassword && (
              <div className={`${styles['error']} my-2 text-start`}>
                請輸入新密碼。
              </div>
            )}
          </div>
        </div>

        <button className="btn btn-primary w-100" onClick={resetPassword}>
          重設密碼
        </button>

        <div className="row mt-2">
          <p className={`${styles['notice']}`}>
            還不是會員？
            <Link href="/member/register" className='font-size'>加入我們</Link>。
          </p>
        </div>
      </main>
      </div>
    </>
  )
}
