import styles from './member.module.css'
import Link from 'next/link'

export default function ForgetPasswordForm() {
  return (
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

        <button type="submit" className="btn btn-primary w-100">
          確定
        </button>

        <div className="row mt-2">
          <p className={`${styles['notice']}`}>
            還不是會員？
            <Link href="/member/register">加入我們</Link>。
          </p>
        </div>
      </form>
    </main>
  )
}
