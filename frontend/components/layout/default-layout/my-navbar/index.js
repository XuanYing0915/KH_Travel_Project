import Image from 'next/image'
import Link from 'next/link'

// 組合以下區塊
import Menubar from './menubar'
import Toolbar from './toolbar'

import { useRouter } from 'next/router'

export default function MyNavbar() {
  // currentRoute是用來套用active樣式(目前區域對應選單項目)，需傳入MainMenu中
  const router = useRouter()
  const currentRoute = router.pathname

  return (
    <>
      <header>
        <div className="container">
          <nav className="navbar navbar-expand-lg fixed-top " id="navbar" style={{ boxShadow: '3px 0.2px #000', background: '#fff' ,width:'100vw'}}>
            <div className='d-flex' id="navbar-title">
              <Link className="navbar-brand" href="/">
                <Image src="/logo.png" alt="" width={80} height={80} priority />
              </Link>
              <div className='brand-name' style={
                { maxWidth: '160px', height: '100%', marginBlock: 'auto' }
              }>
                <span id="nav-title-main" >高雄旅遊網</span>
                <span id="nav-title-sub" className='text-primary' style={
                  { fontSize: '15px', lineHeight: '16px', whiteSpace: 'pre' }}>KAOHSIUNG TRAVEL</span>
              </div>
            </div>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasNavbar"
              aria-controls="offcanvasNavbar"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="offcanvas offcanvas-end"
              tabIndex="-1"
              id="offcanvasNavbar"
              aria-labelledby="offcanvasNavbarLabel"
            >
              <div className="offcanvas-header">
                <h5 className="offcanvas-title" id="offcanvasNavbarLabel">
                  <Image
                    src="/logo.png"
                    alt=""
                    width={80}
                    height={80}
                    priority
                  />
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="offcanvas"
                  aria-label="Close"
                ></button>
              </div>
              <div className="offcanvas-body">
                <div id="menubar">
                  <Menubar currentRoute={currentRoute} />

                </div>
                <div id="toolbar">
                  <Toolbar currentRoute={currentRoute} />

                </div>
              </div>
            </div>
          </nav>
        </div>
      </header>
      {/* hover動畫(下底線)，需要覆蓋原本global.scss樣式 */}
      <style jsx>{`
      .nav{
        position: relative;
        height: 100px;
      }
      #navbar #menubar{
          flex:1
        }
      .offcanvas{
        background: #7fb8b6;
        font-weight:500
      }
      {/* .offcanvas li:hover{
      } */}
      @media screen and (max-width: 991px) {
      
        #navbar #nav-title-main{
          font-weight: 700;
          font-size: 24px;
          text-align:center;
          width: 100%;

        }
        #navbar #nav-title-sub{
          font-size: 10px;

        }
        #navbar .brand-name{
          position: absolute;
          left:50%;
          transform:translateX(-50%);
          height: 100px;
          padding-block:10px;
          text-align:center

        }
        {/* #navbar .nav-link:hover{
          background: #fff;

        } */}
      }
      @media screen and (min-width: 992px) {
        #navbar .brand-name{
          position: relative;

        }
        #navbar .navbar {
            height:100px;
            width: 100vw;
            
            background-color: white;
          }
          #navbar .navbar .navbar-nav .nav-link {
            padding: 0 ;
          }
          #navbar .navbar .navbar-nav .nav-item {
            margin: 0 20px;
            position: relative;
          }
          #navbar #navbar-title{
          padding-left: 5%;
        }
        #navbar .offcanvas-body{
          position: relative;
          width: 100%;
          display: flex;
          justify-content:space-between
        }
        #navbar #toolbar{
          position: relative;
          padding-right:11.5% ;
          
        }
        #navbar #nav-title-main{
          font-size: 24px;
          font-weight: 700
        }
        #navbar #nav-title-sub{
          font-size: 12px;
        }
        }
        @media screen and (min-width: 1440px) {
          #navbar #navbar-title{
          padding-left: 120px;
        }
        #navbar #menubar{
          position: relative;
          padding-left:10%;
        }
        #navbar #toolbar{
          position: relative;
          padding-right:120px ;
          
        }
        #navbar #nav-title-main{
          font-size: 28px;
          font-weight: 700
        }
        }


        #navbar .navbar .navbar-nav .nav-item::after {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          margin: 0 auto;
          content: '';
          
        }
        #navbar .navbar .navbar-nav .nav-item:hover::after {
          width: 100%;
        }

        
      `}</style>
    </>
  )
}
