import { useState } from 'react'
import styles from './member.module.css'
import Link from 'next/link'
import dynamic from 'next/dynamic'

// Datepicker relies on browser APIs like document
// dynamically load a component on the client side,
// use the ssr option to disable server-rendering.
const InputDatePicker = dynamic(() => import('../common/input-date-picker'), {
  ssr: false,
})

export default function RegisterForm() {
  const [showDatepicker, setShowDatepicker] = useState(false)
  const [date, setDate] = useState('')

  return (
    <>
      <main className={`w-100 m-auto text-center form-member`}>
        <h2 className="text-center mb-3">加入會員</h2>
        <p className={`text-center mb-3 ${styles['text-note']}`}>
          建立 Next
          會員個人檔案，學習最新開發技術與得到啟發，立即加入這個大家族。
        </p>
        <form>
          <div className="row mb-3">
            <div className="col-sm-12">
              <input
                type="email"
                className={`form-control w-100 ${styles['form-control']} `}
                placeholder="電子郵件地址"
              />
            </div>
            <div className={`${styles['error']} my-2 text-start`}>
              請輸入有效的電子郵件地址。
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
              請輸入密碼。
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-sm-6">
              <input
                type="firstname"
                className={`form-control  ${styles['form-control']} ${styles['invalid']} `}
                placeholder="姓氏"
              />
              <div className={`${styles['error']} my-2 text-start`}>
                請輸入有效的姓氏。
              </div>
            </div>

            <div className="col-sm-6">
              <input
                type="firstname"
                className={`form-control  ${styles['form-control']} ${styles['invalid']} `}
                placeholder="名字"
              />
              <div className={`${styles['error']} my-2 text-start`}>
                請輸入有效的名字。
              </div>
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-sm-12">
              <div className="input-group position-relative d-inline-flex align-items-center">
                <InputDatePicker
                  showDatepicker={showDatepicker}
                  setFormat="yyyy-mm-dd"
                  showFormat="yyyy/mm/dd"
                  setDate={setDate}
                  className={`form-control w-100 ${styles['form-control']} `}
                  style={{
                    borderRadius: 2.8,
                  }}
                  placeholder="出生年月日"
                />
                <i
                  className="bi bi-calendar4 position-absolute"
                  role="presentation"
                  style={{ right: 10, cursor: 'pointer', zIndex: 100 }}
                  onClick={() => setShowDatepicker(!showDatepicker)}
                ></i>
              </div>
            </div>
            <div className={`${styles['error']} my-2 text-start`}>
              請輸入出生年月日。
            </div>
            <p className={`text-center mb-1 ${styles['text-note2']}`}>
              每年生日將獲得專屬會員慶生禮。
            </p>
          </div>
          <div className="row mb-3">
            <div className={`col-sm-12" ${styles['label-left']}`}>
              <label htmlFor="country" className="form-label">
                國家/地區
              </label>
              <select id="country" className="form-select">
                <option>台灣</option>
                <option>日本</option>
                <option>韓國</option>
                <option>中國</option>
              </select>
            </div>
          </div>
          <div className="row mb-3">
            <div className="btn-group">
              <input
                type="radio"
                className="btn-check"
                name="sex"
                id="option1"
                autoComplete="off"
              />
              <label className="btn btn-outline-primary" htmlFor="option1">
                男
              </label>
              <input
                type="radio"
                className="btn-check"
                name="sex"
                id="option2"
                autoComplete="off"
              />
              <label className="btn btn-outline-primary" htmlFor="option2">
                女
              </label>
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-sm-12 text-start">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="gridCheck1"
                />
                <label
                  className={`form-check-label  ${styles['notice']}`}
                  htmlFor="gridCheck1"
                >
                  訂閱電子郵件就能收到產品、優惠以及會員福利的最新消息
                </label>
              </div>
            </div>
          </div>
          <div className="row mb-2">
            <p className={`${styles['notice']}`}>
              如建立帳號，即代表同意本站
              <Link href="/about">隱私權政策</Link>和
              <Link href="/about">使用條款</Link>。
            </p>
          </div>
          <button type="submit" className="btn btn-primary w-100">
            加入
          </button>

          <div className="row mt-2">
            <p className={`${styles['notice']}`}>
              已經是會員了嗎？ <Link href="/member/login">登入</Link>。
            </p>
          </div>
        </form>
      </main>
    </>
  )
}
