import React , { useState ,useEffect}from 'react'
import styles from './member.module.css'
import Link from 'next/link'
import LineLogo from '@/components/icons/line-logo'
import GoogleLogo from '@/components/icons/google-logo'
import FacebookLogo from '@/components/icons/facebook-logo'

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  (async () => {
    try {
        let response = await axios.post(`${API_URL}/auth/login`, member, {
          withCredentials: true,
        });
        console.log(response.data);
    } catch (error) {
        console.log(error);
    }
})();

  useEffect(() => {
    setEmailError(!/\S+@\S+\.\S+/.test(email));
  }, [email]);

  useEffect(() => {
    setPasswordError(!password);
  }, [password]);

  return (<>  
   <div class="container col-xl-10 col-xxl-8 px-4 py-5">
  <div class="row align-items-center g-lg-5 py-5">
    <div class="col-lg-7 text-center text-lg-start">
      <h1 class="display-4 fw-bold lh-1 text-body-emphasis mb-3">
        Vertically centered hero sign-up form
      </h1>
      <p class="col-lg-10 fs-4">
        Below is an example form built entirely with Bootstrap’s form
        controls. Each required form group has a validation state that can
        be triggered by attempting to submit the form without completing
        it.
      </p>
    </div>
    <div class="col-md-10 mx-auto col-lg-5 form-member w-100 m-auto text-center border border-dark">
    <h2 className="text-center mb-5">會員登入</h2>
      <form>
        <div className="row mb-3">
          <div className="col-sm-12">
            <input
              type="email"
              className={`form-control w-100 ${styles['form-control']}
                `}
                // ${emailError ? styles['invalid'] : ''}
              placeholder="電子郵件地址"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          {/* {emailError && <div className={`${styles['error']} my-2 text-start`}>請輸入有效的電子郵件地址。</div>} */}
        </div>
        <div className="row mb-3">
          <div className="col-sm-12">
            <input
              type="password"
              className={`form-control w-100 ${styles['form-control']} `}
              // ${passwordError ? styles['invalid'] : ''}
              placeholder="密碼"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {/* {passwordError && <div className={`${styles['error']} my-2 text-start`}>請輸入密碼。</div>} */}
        </div>
        <div className="row mb-3">
          <div className="col-sm-6 text-start">
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
                保持登入狀態
              </label>
            </div>
          </div>
          <div className="col-sm-4 offset-sm-2 test-end">
            <Link
              href="/member/forget-password"
              className={`${styles['notice']}`}
            >
              忘記密碼？
            </Link>
          </div>
        </div>
        <div className="row mb-2">
          <p className={`${styles['notice']}`}>
            如登入，即代表同意本站
            <Link href="/about">隱私權政策</Link>和
            <Link href="/about">使用條款</Link>。
          </p>
        </div>

        <button type="submit" className="btn btn-primary w-100">
          登入
        </button>

        <div className="row mt-2">
          <p className={`${styles['notice']}`}>
            還不是會員？
            <Link href="/member/register">加入我們</Link>。
          </p>
        </div>

        <div className={`mb-3 ${styles['hr-sect']}`}>快速登入</div>
        <div className="row mb-2">
          <div className="col-sm-12 text-start">
            <div className="d-flex justify-content-center">
              <LineLogo className="mx-3" />
              <GoogleLogo className="mx-3" />
              <FacebookLogo className="mx-3" />
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</div>
    
  </>)
}
