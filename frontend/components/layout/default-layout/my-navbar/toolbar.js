import Image from 'next/image'
import Link from 'next/link'
import { useContext, useEffect } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import { useAuthJWT } from '@/hooks/use-auth-jwt'
import useFirebase from '@/hooks/use-firebase'
import { useFoodCart } from '@/hooks/use-food-cart'
import { useTicketCart } from '@/hooks/use-ticket-cart'
import NoSSR from '@/components/NoSSR'

export default function Toolbar({ currentRoute, memberInfo, onLogout }) {
  const { foodItems } = useFoodCart()
  const { ticketItems } = useTicketCart()
  let productTotal = 0

  for (let i = 0; i < foodItems.length; i++) {
    productTotal += foodItems[i].quantity
  }
  for (let i = 0; i < ticketItems.length; i++) {
    productTotal += ticketItems[i].quantity
  }
  // console.log(foodItems.length)
  // console.log(ticketItems.length)
  // console.log(productTotal)

  const { logoutFirebase } = useFirebase()
  const { authJWT, setAuthJWT } = useAuthJWT()
  const router = useRouter()
  // 解析jwt access token
  const parseJwt = (token) => {
    const base64Payload = token.split('.')[1]
    const payload = Buffer.from(base64Payload, 'base64')
    return JSON.parse(payload.toString())
  }
  // 處理登出
  const lineLogout = async () => {
    if (!authJWT.isAuth) return
    if (!authJWT.userData.line_uid) return

    const line_uid = authJWT.userData.line_uid

    const res = await axios.get(
      `http://localhost:3005/api/line-login/logout?line_uid=${line_uid}`,
      {
        withCredentials: true, // 注意: 必要的
      }
    )

    console.log(res.data)

    if (res.data.message === 'success') {
      setAuthJWT({
        isAuth: false,
        userData: {
          member_id: 0,
          last_name: '',
          first_name: '',
          email: '',
          r_date: '',
        },
      })
    }
  }

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
          member_id: 0,
          last_name: '',
          email: '',
          r_date: '',
        },
      })
    }
  }
  if (!authJWT.isAuth) {
    return (
      <NoSSR><ul className="navbar-nav pe-2 ms-auto">
        <li className="nav-item me-4">
          <Link
            className="nav-link  btn btn-outline-light"
            href="/cart"
            role="button"
          >
            <span className={productTotal == 0 ? "d-none" : "bg-secondary"} style={{ position: 'absolute', width: '20px', height: '20px', borderRadius: '50%', fontSize: '14px', color: '#fff', right: '-10px', top: '-2px' }}>{productTotal}</span>
            <i
              className="bi  bi-cart-fill "
              style={{ color: '#137976', fontSize: '25px' }}
            ></i>
            <p className=" d-md-inline d-lg-none"> 購物車</p>
          </Link>
        </li>
        <li className="nav-item">
          <Link
            className="nav-link  btn btn-outline-light"
            href="/member"
            role="button"
          >
            <i
              className="bi  bi-person-circle d-md-inline d-lg-none text-secondary"
              style={{ color: '#137976', fontSize: '25px' }}
            ></i>
            <button
              className="btn btn-secondary d-md-none d-lg-inline"
              style={{
                maxHeight: '80px',
                fontSize: '18px',
                borderRadius: '25px',
                color: 'white',
                paddingInline: '20px',
              }}
            >
              <span>會員註冊 / 登入</span>
            </button>
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
      </ul></NoSSR>

    )
  } else {
    return (
      <>
        <NoSSR>
          <ul className="navbar-nav pe-2 ms-auto">
            <li className="nav-item me-4">
              <Link
                className="nav-link  btn btn-outline-light"
                href="/cart"
                role="button"
              >
                <span className={productTotal == 0 ? "d-none" : "bg-secondary"} style={{ position: 'absolute', width: '20px', height: '20px', borderRadius: '50%', fontSize: '14px', color: '#fff', right: '-10px', top: '-2px' }}>{productTotal}</span>
                <i
                  className="bi  bi-cart-fill "
                  style={{ color: '#137976', fontSize: '30px' }}
                ></i>

                <p className=" d-md-inline d-lg-none"> 購物車</p>
              </Link>
            </li>
            <li className="nav-item">
              {/* 顯示會員姓名和登出按鈕 */}

              <div style={{ display: 'flex' }}>
                <div className="dropdown">
                  <p style={{ marginTop: '12px' }}>
                    {authJWT.userData.first_name} {authJWT.userData.last_name}{' '}
                    您好!
                  </p>

                  <div className="dropdown-menu">
                    <Link href="http://localhost:3000/member/member-center">
                      <div className="dropdown-item">個人資料</div>
                    </Link>
                    <Link href="http://localhost:3000/member/favorite-product">
                      <div className="dropdown-item">我的收藏</div>
                    </Link>
                    <Link href="http://localhost:3000/member/member-order">
                      <div className="dropdown-item">訂單查詢</div>
                    </Link>
                    <Link href="#" onClick={logout}>
                      <div className="dropdown-item">登出</div>
                    </Link>
                  </div>
                </div>
                {/* <button
              onClick={logout}
              className="btn btn-secondary"
              style={{
                fontSize: '18px',
                borderRadius: '50px',
                color: 'white',
                padding: '0 20px',
                marginLeft: '15px',
              }}
            >
              登出
            </button> */}
              </div>
            </li>
          </ul>
        </NoSSR>


        <style jsx>{`
          .dropdown-menu {
            display: none;
            position: absolute;
            background-color: #f9f9f9;
            min-width: 160px;
            box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
            z-index: 1;
          }
          .dropdown-menu div {
            color: black;
            padding: 12px 16px;
            text-decoration: none;
            display: block;
          }
          .dropdown-menu div:hover {
            background-color: #f1f1f1;
          }
          .dropdown:hover .dropdown-menu {
            display: block;
          }
        `}</style>
      </>
    )
  }
}
