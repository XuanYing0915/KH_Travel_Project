import React from 'react'
import Link from 'next/link'

export default function SideBar() {
  return (
    <>
      <div className='sidebar-frame'>
        <h3 className="mt-4 mb-4 head">
          <i className="fa-solid fa-user me-4"></i>XXX您好
        </h3>
        <aside className="d-flex justify-content-center " id='aside-bar'>
          <nav className="nav flex-column ">
            <Link
              className="nav-link active"
              aria-current="page"
              href="./member-center"
            >
              <p className="ms-4">
                <i
                  className="fa-regular fa-pen-to-square"
                  style={{ marginRight: '12px' }}
                ></i>
                個人資料修改
              </p>
            </Link>
            <Link className="nav-link" href="./favorite-product">
              <p className="ms-4">
                <i className="fa-solid fa-bookmark" style={{ marginRight: '17px' }}></i>
                我的收藏
              </p>
            </Link>
            <Link className="nav-link" href="./member-order">
              <p className="ms-4">
                <i className="fa-regular fa-clipboard " style={{ marginRight: '10px' }}></i>
                訂單查詢
              </p>
            </Link>
            {/* <Link className="nav-link " href="./order-list">
              <p className="ms-4">
                <i className="fa-regular fa-clipboard" style={{ marginRight: '14px' }}></i>
                購買清單
              </p>
            </Link> */}
            <Link className="nav-link " href="#">
              <p className="ms-4">
                <i className="fa-solid fa-arrow-right-from-bracket" style={{ marginRight: '14px' }}></i>
                登出
              </p>
            </Link>
          </nav>
        </aside>
      </div>

      <style jsx>
        {`
          @import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css');
        
        {/* .aside-bar{
            height:250px
        } */}
          p {
            font-size: 20px;
            color: #777777;
          }
          .head {
            padding-left: 30px;
          }
          .sidebar-frame {
            background-color: #e6e6e6;
            width: 250px;
            height: 350px;
          }
          .nav-ink {
            color: #777777;
          }
        `}
      </style>
    </>
  )
}