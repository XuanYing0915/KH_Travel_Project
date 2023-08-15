import React from 'react'
import Link from 'next/link'
import axios from 'axios'
import { useAuthJWT } from '@/hooks/use-auth-jwt'

export default function SideBar() {
  const parseJwt = (token) => {
    const base64Payload = token.split('.')[1]
    const payload = Buffer.from(base64Payload, 'base64')
    return JSON.parse(payload.toString())
  }

  const { authJWT,setAuthJWT } = useAuthJWT()
  return (
    <>
      <div className="sidebar-frame " id="tv">
        <h3 className="mt-4 mb-4 head d-flex justify-content-center">
          <i className="fa-regular fa-circle-user me-4 ">{authJWT.userData.last_name}您好</i>
        </h3>
        <aside className="d-flex justify-content-center " id="aside-bar">
          <nav className="nav flex-column ">
            <Link
              className="nav-link btn from-top"
              aria-current="page"
              href="./member-center"
            >
              <p className="ms-4 ">
              
                個人資料修改
              </p>
            </Link>
            <Link className="nav-link" href="./favorite-product">
              <p className="ms-4 ">
              
                我的收藏
              </p>
            </Link>
            <Link className="nav-link" href="./member-order">
              <p className="ms-4 ">
                
                訂單查詢
              </p>
            </Link>
            <button className="nav-link " href="#" onClick={async () => {
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
        }}>
              <p className="ms-4 ">
              
                登出
              </p>
            </button>
          </nav>
        </aside>
      </div>

      <style jsx>
        {`
          @import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css');
          i{
            margin-bottom: 15px;
          }
          h3{
            border-bottom: 3px solid#7d7a76
          }
          .sidebar-frame {
            position: relative;
            width: 250px;
            height: 350px;
            background: white;
            border-radius: 0% 0% 0% 0% / 0% 0% 0% 0%;
            color: white;
            box-shadow: 20px 20px rgba(0, 0, 0, 0.15);
            transition: all 0.4s ease;
            display: inline-block;
            border: 3px solid #333333;
            {/* font-size: 1rem; */}
            border-radius: 2% 6% 5% 4% / 1% 1% 2% 4%;
            text-transform: ;
            letter-spacing: 0.3ch;
            background:	#ffffff;
            position: relative;
    
    {/* &::before { */}
        {/* content: ''; */}
        {/* border: 2px solid #353535; */}
        {/* display: block; */}
        {/* width: 100%;
        height: 100%;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate3d(-50%, -50%, 0) scale(1.015) rotate(0.5deg); */}
        {/* border-radius: 1% 1% 2% 4% / 2% 6% 5% 4%; */}
    {/* } */}
          }
          .sidebar-frame:hover {
            border-radius: 0% 0% 50% 50% / 0% 0% 5% 5%;
            box-shadow: 10px 10px rgba(0, 0, 0, 0.25);
          }
           {
            /* .aside-bar{
            height:250px
        } */
          }
          p {
            font-size: 20px;
            color:#272727;
          }
          p:hover {
            color: #1a9da7; 
            border-bottom: 3px solid#ffd367
          }
          .head {
            padding-left: 30px;
            color:black
          }
          {/* .sidebar-frame {
            background-color: 	#D0D0D0;
            width: 250px;
            height: 350px;
            box-shadow: 10px 10px 10px #e0e0e0;
            border-spacing: 15px;
            
            
          } */}
          {/* .nav-ink {
            color: #ffffff;
          } */}
          
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
          
          .btn:before, .btn:after {
            content: '';
            position: absolute;	
            transition: inherit;
            z-index: -1;
          }
          
          .btn:hover {
            color: var(--def);
            transition-delay: .5s;
          }
          
          .btn:hover:before {
            transition-delay: 0s;
          }
          
          .btn:hover:after {
            background: var(--inv);
            transition-delay: .35s;
          }
          
          /* From Top */
          
          .from-top:before, 
          .from-top:after {
            left: 0;
            height: 0;
            width: 100%;
          }
          
          .from-top:before {
            bottom: 0;	
            border: 1px solid var(--inv);
            border-top: 0;
            border-bottom: 0;
          }
          
          .from-top:after {
            top: 0;
            height: 0;
          }
          
          .from-top:hover:before,
          .from-top:hover:after {
            height: 100%;
          }
          
          /* From Left */
          
          .from-left:before, 
          .from-left:after {
            top: 0;
            width: 0;
            height: 100%;
          }
          
          .from-left:before {
            right: 0;
            border: 1px solid var(--inv);
            border-left: 0;
            border-right: 0;	
          }
          
          .from-left:after {
            left: 0;
          }
          
          .from-left:hover:before,
          .from-left:hover:after {
            width: 100%;
          }
          
          /* From Right */
          
          .from-right:before, 
          .from-right:after {
            top: 0;
            width: 0;
            height: 100%;
          }
          
          .from-right:before {
            left: 0;
            border: 1px solid var(--inv);
            border-left: 0;
            border-right: 0;	
          }
          
          .from-right:after {
            right: 0;
          }
          
          .from-right:hover:before,
          .from-right:hover:after {
            width: 100%;
          }
          
          /* From center */
          
          .from-center:before {
            top: 0;
            left: 50%;
            height: 100%;
            width: 0;
            border: 1px solid var(--inv);
            border-left: 0;
            border-right: 0;
          }
          
          .from-center:after {
            bottom: 0;
            left: 0;
            height: 0;
            width: 100%;
            background: var(--inv);
          }
          
          .from-center:hover:before {
            left: 0;
            width: 100%;
          }
          
          .from-center:hover:after {
            top: 0;
            height: 100%;
          }
          
          /* From Bottom */
          
          .from-bottom:before, 
          .from-bottom:after {
            left: 0;
            height: 0;
            width: 100%;
          }
          
          .from-bottom:before {
            top: 0;	
            border: 1px solid var(--inv);
            border-top: 0;
            border-bottom: 0;
          }
          
          .from-bottom:after {
            bottom: 0;
            height: 0;
          }
          
          .from-bottom:hover:before,
          .from-bottom:hover:after {
            height: 100%;
          @import url('https://fonts.googleapis.com/css?family=Lato:100,300,400');
          @import url('https://fonts.googleapis.com/css?family=Roboto:100');

          @mixin button($bcolor,
          $url,
          $x1,
          $y1,
          $bor,
          $col) {
          background: $bcolor;
          -webkit-mask: url($url);
          mask: url($url);
          -webkit-mask-size: $x1 $y1;
          mask-size: $x1 $y1;
          border: $bor;
          color: $col;
          }

          .header {
          text-align: center;
          font-family: 'Roboto', sans-serif;
          font-size: 34px;
          margin-top: 12vh;
          }

          .footer {
          text-align: center;
          font-family: 'Lato', sans-serif;
          font-weight: 300;
          font-size: 20px;
          margin-top: 15vh;
          }

          .button-container-1 {
          position: relative;
          width: 100px;
          height: 50px;
          margin-left: auto;
          margin-right: auto;
          margin-top: 6vh;
          overflow: hidden;
          border: 1px solid;
          font-family: 'Lato', sans-serif;
          font-weight: 300;
          font-size: 20px;
          transition: 0.5s;
          letter-spacing: 1px;
            border-radius: 8px;

          button {
            width: 101%;
            height: 100%;
            font-family: 'Lato', sans-serif;
            font-weight: 300;
            font-size: 11px;
            letter-spacing: 1px;
            font-weight: bold;

            @include button(#000,
            "https://raw.githubusercontent.com/robin-dela/css-mask-animation/master/img/nature-sprite.png",
            2300%,
            100%,
            none,
            #fff);
            cursor: pointer;
            -webkit-animation: ani2 0.7s steps(22) forwards;
            animation: ani2 0.7s steps(22) forwards;

            &:hover {
            -webkit-animation: ani 0.7s steps(22) forwards;
            animation: ani 0.7s steps(22) forwards;
            }
          }
          }

          .button-container-2 {
          position: relative;
          width: 100px;
          height: 50px;
          margin-left: auto;
          margin-right: auto;
          margin-top: 7vh;
          overflow: hidden;
          border: 1px solid #000;
          font-family: 'Lato', sans-serif;
          font-weight: 300;
          transition: 0.5s;
          letter-spacing: 1px;
          border-radius: 8px;

          button {
            width: 101%;
            height: 100%;
            font-family: 'Lato', sans-serif;
            font-weight: 300;
            font-size: 11px;
            letter-spacing: 1px;
            font-weight: bold;

            @include button(#000, "https://raw.githubusercontent.com/robin-dela/css-mask-animation/master/img/urban-sprite.png",
            3000%,
            100%,
            none,
            #fff);
            cursor: pointer;
            -webkit-animation: ani2 0.7s steps(29) forwards;
            animation: ani2 0.7s steps(29) forwards;

            &:hover {
            -webkit-animation: ani 0.7s steps(29) forwards;
            animation: ani 0.7s steps(29) forwards;
            }
          }
          }


          .mas {
              position: absolute;
              color: #000;
              text-align: center;
              width: 101%;
              font-family: 'Lato', sans-serif;
              font-weight: 300;
              position: absolute;
              font-size: 11px;
              margin-top: 17px;
              overflow: hidden;
              font-weight: bold;

          }

          @-webkit-keyframes ani {
          from {
            -webkit-mask-position: 0 0;
            mask-position: 0 0;
          }

          to {
            -webkit-mask-position: 100% 0;
            mask-position: 100% 0;
          }
          }

          @keyframes ani {
          from {
            -webkit-mask-position: 0 0;
            mask-position: 0 0;
          }

          to {
            -webkit-mask-position: 100% 0;
            mask-position: 100% 0;
          }
          }

          @-webkit-keyframes ani2 {
          from {
            -webkit-mask-position: 100% 0;
            mask-position: 100% 0;
          }

          to {
            -webkit-mask-position: 0 0;
            mask-position: 0 0;
          }
          }

          @keyframes ani2 {
          from {
            -webkit-mask-position: 100% 0;
            mask-position: 100% 0;
          }

          to {
            -webkit-mask-position: 0 0;
            mask-position: 0 0;
          }
          }

          a{
            color:#00ff95;
          }

          .button-container-3 {
          position: relative;
          width: 100px;
          height: 50px;
          margin-left: auto;
          margin-right: auto;
          margin-top: 8vh;
          overflow: hidden;
          border: 1px solid #000;
          font-family: 'Lato', sans-serif;
          font-weight: 300;
          transition: 0.5s;
          letter-spacing: 1px;
          border-radius: 8px;

          button {
            width: 101%;
            height: 100%;
            font-family: 'Lato', sans-serif;
            font-weight: 300;
            font-size: 11px;
            letter-spacing: 1px;
            font-weight: bold;


            @include button(#000, "https://raw.githubusercontent.com/pizza3/asset/master/natureSmaller.png",
            7100%,
            100%,
            none,
            #fff);
            cursor: pointer;
            -webkit-animation: ani2 0.7s steps(70) forwards;
            animation: ani2 0.7s steps(70) forwards;

            &:hover {
            -webkit-animation: ani 0.7s steps(70) forwards;
            animation: ani 0.7s steps(70) forwards;
            }
          }
          }}
 

        `}
      </style>
    </>
  )
}
