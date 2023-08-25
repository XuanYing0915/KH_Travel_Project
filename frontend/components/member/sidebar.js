import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import axios from 'axios'
import { useAuthJWT } from '@/hooks/use-auth-jwt'

export default function SideBar() {
  const parseJwt = (token) => {
    const base64Payload = token.split('.')[1]
    const payload = Buffer.from(base64Payload, 'base64')
    return JSON.parse(payload.toString())
  }
  const { authJWT, setAuthJWT } = useAuthJWT()
  const [userData, setUserData] = useState({
    email: '',
    first_name: '',
    last_name: '',
    birth_date: '',
    phone: '',
    country: '',
  })
  useEffect(() => {
    // 當組件掛載時，從資料庫抓取會員資料
    const fetchMemberData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3005/api/member/${authJWT.userData.member_id}`
        )
        const result = response.data[0]
        console.log(result)
        // 將資料庫的會員資料設置為 userData 的預設值
        setUserData({
          email: result.email,
          first_name: result.first_name,
          last_name: result.last_name,
          birth_date: result.birth_date,
          phone: result.phone,
          country: result.country,
        })
        // 將資料庫的生日設置為 birthday 的預設值
        setBirthday(result.birth_date)
      } catch (error) {
        console.error('取得會員資料失敗', error)
      }
    }

   // 定义事件处理程序
  const handleUpdateEvent = () => {
    fetchMemberData();
  };

  // 监听自定义事件
  window.addEventListener('updateUserData', handleUpdateEvent);

  // 初始抓取数据
  fetchMemberData();

  // 清理函数，以便在组件卸载时移除事件监听器
  return () => {
    window.removeEventListener('updateUserData', handleUpdateEvent);
  };
}, [authJWT]);
 
  return (
    <>
      <div className="sidebar-frame " id="tv">
        <h3 className="mt-4 mb-4 head px-3 d-flex  flex-column justify-content-center align-items-center">
          <span className="userName  d-flex justify-content-between  align-items-center">
            {/* <i className="fa-regular fa-circle-user  d-flex justify-content-between  align-items-center"></i> */}

            {userData.first_name}
            

            {/* <span className="userHello">,您好</span> */}
          </span>
        </h3>

        <aside className="d-flex justify-content-center " id="aside-bar">
          <nav className="nav flex-column align-items-center mx-4">
            <Link
              className="nav-link btn from-top"
              aria-current="page"
              href="./member-center"
            >
              <p>個人資料</p>
            </Link>
            <Link className="nav-link" href="./favorite-product">
              <p>我的收藏</p>
            </Link>
            <Link className="nav-link" href="./member-order">
              <p>訂單查詢</p>
            </Link>
            <button
              className="nav-link "
              href="#"
              onClick={async () => {
                const res = await axios.post(
                  'http://localhost:3005/api/auth-jwt/logout',
                  {},
                  {
                    withCredentials: true, // save cookie in browser
                  }
                )

                console.log(res.data)

                if (res.data.message === 'success') {
                  setAuthJWT({
                    isAuth: false,
                    userData: {
                      member_id: 0,
                      first_name: '',
                      email: '',
                      username: '',
                      r_date: '',
                    },
                  })
                }
              }}
            >
              <p>登出</p>
            </button>
          </nav>
        </aside>
      </div>

      <style jsx>
        {`
          @import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css');
          i {
            margin-bottom: 15px;
          }
          h3 {
            border-bottom: 3px solid#7d7a76;
          }
          .sidebar-frame {
            position: relative;
            width: 250px;
            height: 370px;
            background-color:rgba(255, 255, 255, 0.5);
            border-radius: 0% 0% 0% 0% / 0% 0% 0% 0%;
            
            box-shadow: 20px 20px rgba(0, 0, 0, 0.15);
            transition: all 0.4s ease;
            display: inline-block;
            border-right: 3px solid #abadac;
            {/* border-bottom: 3px solid #a7a6a6; */}
             {
              /* font-size: 1rem; */
            }
            border-radius: 0% 0% 0% 0% / 1% 1% 2% 4%;
            text-transform: ;
            letter-spacing: 0.3ch;
            background: ;
            position: relative;

             {
              /* &::before { */
            }
             {
              /* content: ''; */
            }
             {
              /* border: 2px solid #353535; */
            }
             {
              /* display: block; */
            }
             {
              /* width: 100%;
        height: 100%;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate3d(-50%, -50%, 0) scale(1.015) rotate(0.5deg); */
            }
             {
              /* border-radius: 1% 1% 2% 4% / 2% 6% 5% 4%; */
            }
             {
              /* } */
            }
          }
          .sidebar-frame:hover {
            border-radius: 0% 0% 50% 50% / 0% 0% 5% 5%;
            box-shadow: 10px 10px rgba(0, 0, 0, 0.25);
          }

          
          p {
            font-size: 20px;
            color: #272727;
          }
          p:hover {
            color: #1a9da7;
            border-bottom: 3px solid#ffd367;
            font-weight: 700;
          }
          .head {
            font-size: 20px;
            color: black;
          }
          .userName {
            font-size: 18px;
            font-weight: 700;
            display: flex;
            justify-content: center;
            align-item: center;
            margin-bottom: 15px;
          }
          .userHello {
            font-size: 18px;
          }

           {
            /* .sidebar-frame {
            background-color: 	#D0D0D0;
            width: 250px;
            height: 350px;
            box-shadow: 10px 10px 10px #e0e0e0;
            border-spacing: 15px;
            
            
          } */
          }
           {
            /* .nav-ink {
            color: #ffffff;
          } */
          }

          .btn {
            position: relative;
            padding: 1.4rem 4.2rem;
            padding-right: 3.1rem;
            font-size: 1.4rem;
            color: var(--inv);
            letter-spacing: 1.1rem;
            text-transform: uppercase;
            transition: all 500ms cubic-bezier(0.77, 0, 0.175, 1);
            cursor: pointer;
            user-select: none;
          }

          .btn:before,
          .btn:after {
            content: '';
            position: absolute;
            transition: inherit;
            z-index: -1;
          }

          .btn:hover {
            color: var(--def);
            transition-delay: 0.5s;
          }

          .btn:hover:before {
            transition-delay: 0s;
          }

          .btn:hover:after {
            background: var(--inv);
            transition-delay: 0.35s;
          }

         
             
            
          
        `}
      </style>
    </>
  )
}
