import React from 'react'
import Link from 'next/link'

export default function SideBar() {
  return (
    <>
       <div className="sidebar-frame" id="tv">
        <h3 className="mt-4 mb-4 head d-flex justify-content-center">
          <i className="fa-regular fa-circle-user me-4">XXX您好</i>
        </h3>
        <aside className="d-flex justify-content-center" id="aside-bar">
          <nav className="nav flex-column">
          <li className="nav-item">
              <Link className="nav-link active" href="./member-center">
                <p className="ms-4">
                    個人資料修改
                </p>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" href="./favorite-product">
                <p className="ms-4">
                    我的收藏
                </p>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" href="./member-order">
                <p className="ms-4">
                    訂單查詢
                </p>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" href="#">
                <p className="ms-4">
                    登出
                </p>
              </Link>
            </li>
          </nav>
        </aside>
      </div>

      <style jsx>
        {`
          @import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css');

    //       #tv {
    //         position: relative;
    //         width: 250px;
    //         height: 350px;
    //         background: white;
    //         border-radius: 0% 0% 0% 0% / 0% 0% 0% 0%;
    //         color: white;
    //         box-shadow: 20px 20px rgba(0, 0, 0, 0.15);
    //         transition: all 0.4s ease;
    //         {/* display: inline-block; */}
    // border: 3px solid #333333;
    // {/* font-size: 1rem; */}
    // border-radius: 2% 6% 5% 4% / 1% 1% 2% 4%;
    // {/* text-transform: ; */}
    // {/* letter-spacing: 0.3ch; */}
    // background: #ffffff;
    // position: relative;
    
    // &::before {
    //     content: '';
    //     border: 2px solid #353535;
    //     {/* display: block; */}
    //     {/* width: 100%;
    //     height: 100%;
    //     position: absolute;
    //     top: 50%;
    //     left: 50%;
    //     transform: translate3d(-50%, -50%, 0) scale(1.015) rotate(0.5deg); */}
    //     border-radius: 1% 1% 2% 4% / 2% 6% 5% 4%;
    // }
    //       }
    //       #tv:hover {
    //         border-radius: 0% 0% 50% 50% / 0% 0% 5% 5%;
    //         box-shadow: 10px 10px rgba(0, 0, 0, 0.25);
    //       }
           {
            /* .aside-bar{
            height:250px
        } */
          }
          p {
            font-size: 20px;
            color: #777777;
          }
          .head {
            padding-left: 30px;
            color:black
          }
          .sidebar-frame {
            background-color: #ffffff;
            width: 250px;
            height: 350px;
            box-shadow: 10px 10px 10px #e0e0e0;
            border-spacing: 15px;
            
            
          }
          .nav-ink {
            color: #ffffff;
          }
          li {
            font-size: 25px;
            width: 8em;
            height: 2em;
            text-align: center;
            line-height: 2em;
            font-family: sans-serif;
            text-transform: capitalize;
            position: relative;
            transition: 0.5s;
            margin: 0.8em;
        }
        
          li::before,
          li::after {
              content: '';
              position: absolute;
              width: 0.6em;
              height: 0.6em;
              background-color: gainsboro;
              border-radius: 50%;
              transition: 0.5s cubic-bezier(0.5, -0.5, 0.25, 1.5);
              top: calc(50% - 0.6em / 2);
          }
          
          li::before {left: 0; z-index: -1;}
          li::after {right: 0; z-index: -2;}
          
          li:hover {
              color: white;
          }
          
          li:hover::before,
          li:hover::after {
              width: 100%;
              height: 100%;
              border-radius: 0;
              background-color: dodgerblue;
          }
          
          li:hover::before {
              top: 0;
          }
          
          li:hover::after {
              right: -0.4em;
              filter: brightness(0.8);
          }
        `}
      </style>
    </>
  )
}
