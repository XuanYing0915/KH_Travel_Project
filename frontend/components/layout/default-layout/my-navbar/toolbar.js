import Image from 'next/image'
import Link from 'next/link'
import styles from './toolbar.module.scss'
import { useAuthJWT } from '@/hooks/use-auth-jwt'
import useFirebase from '@/hooks/use-firebase'

export default function Toolbar({ currentRoute ,memberInfo, onLogout }) {
  const { logoutFirebase } = useFirebase()
  const { authJWT, setAuthJWT } = useAuthJWT()
  const logout = async () => {
    // firebase logout(注意，並不會登出google帳號)
    logoutFirebase()
      // 伺服器logout
      const res = await axios.post(
        'http://localhost:3005/api/auth-jwt/logout',
        {},
        {
          withCredentials: true, // save cookie in browser
        }
      )
      if (res.data.message === 'success') {
        setAuthJWT({
          isAuth: false,
          userData: {
            id: 0,
            customerName: '',
            customerEmail: '',
            r_date: '',
          },
        })
      }
    }
    if (!authJWT.isAuth){return (
    <ul className="navbar-nav pe-2 ms-auto">
      <li className="nav-item me-4">
        <Link
          className="nav-link  btn btn-outline-light"
          href="/cart"
          role="button"
        >
          <i className="bi  bi-cart-fill " style={{ color: '#137976', fontSize: '25px' }}></i>
          <p className=" d-md-inline d-lg-none"> 購物車</p>
        </Link>
      </li>
      <li className="nav-item">
      {/* 會員註冊/登入按鈕 */}
      {/* {memberInfo ? (
          // 顯示會員頭像、名稱和登出按鈕
          <div>
            <Image src={memberInfo.avatar} alt="Member Avatar" width={40} height={40} />
            <span>{memberInfo.name}</span>
            <button onClick={onLogout}>登出</button>
          </div>
        ) : ( */}
          {/* // 顯示登入及註冊按鈕 */}
        <Link
          className="nav-link  btn btn-outline-light"
          href="/member"
          role="button"
        >
        <i className="bi  bi-person-circle d-md-inline d-lg-none text-secondary" style={{ color: '#137976', fontSize: '25px' }}></i>
          <button className="btn btn-secondary d-md-none d-lg-inline" style={{ maxHeight: '80px', fontSize: '18px', borderRadius: '25px', color: 'white', paddingInline: '20px', }} >
            <span >會員註冊 / 登入</span></button>
          


        </Link>
        {/* )} */}
      </li>
      {/* <li
        // className="nav-item dropdown"
        className={`nav-item dropdown ${styles['dropdown']}`}
      >
        <Link
          className="nav-link dropdown-toggle btn btn-outline-light"
          href="#/"
          role="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <i className="bi bi-person-circle"></i>
          <p className="d-none d-md-inline d-lg-none">會員中心</p>
        </Link>
        <ul
          className={`dropdown-menu dropdown-menu-end p-4 mw-100 ${styles['slideIn']} ${styles['dropdown-menu']}`}
        >
          <li>
            <p className="text-center">
              <Image
                src="/avatar.jpg"
                className="rounded-circle d-block mx-auto"
                alt="..."
                width={80}
                height={80}
              />
            </p>
            <p className="text-center">
              會員姓名: 小草
              <br />
              帳號: eula123
            </p>
          </li>
          <li>
            <Link className="dropdown-item text-center" href="/admin">
              會員管理區
            </Link>
          </li>
          <li>
            <hr className="dropdown-divider" />
          </li>
          <li>
            <Link className="dropdown-item text-center " href="/about">
              客服中心
            </Link>
          </li>
        </ul>
      </li> */}
    </ul>

  )
}
