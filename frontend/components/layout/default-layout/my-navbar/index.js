import Image from 'next/image'
import Link from 'next/link'

// 組合以下區塊
import Menubar from './menubar'
import SearchForm from './search-form'
import Toolbar from './toolbar'

import { useRouter } from 'next/router'

export default function MyNavbar() {
  // currentRoute是用來套用active樣式(目前區域對應選單項目)，需傳入MainMenu中
  const router = useRouter()
  const currentRoute = router.pathname

  return (
    <>
      <header>
        <nav className="navbar navbar-expand-lg fixed-top navbar-light bg-light">
          <div className="container-fluid">
            <Link className="navbar-brand" href="/">
              <Image src="/next.svg" alt="" width={100} height={24} priority />
            </Link>
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
                    src="/next.svg"
                    alt=""
                    width={80}
                    height={20}
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
                <Menubar currentRoute={currentRoute} />
                <SearchForm />
                <Toolbar currentRoute={currentRoute} />
              </div>
            </div>
          </div>
        </nav>
      </header>
      {/* hover動畫(下底線)，需要覆蓋原本global.scss樣式 */}
      <style global jsx>{`
        @media screen and (min-width: 992px) {
          .navbar {
            padding: 0;
          }
          .navbar .navbar-nav .nav-link {
            padding: 1em 0;
          }
          .navbar .navbar-nav .nav-item {
            margin: 0 1em;
          }
        }

        .navbar .navbar-nav .nav-item {
          position: relative;
        }

        .navbar .navbar-nav .nav-item::after {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          margin: 0 auto;
          content: '';
          background-color: black;
          width: 0%;
          height: 2px;
          transition: all 0.5s;
        }
        .navbar .navbar-nav .nav-item:hover::after {
          width: 100%;
        }
      `}</style>
    </>
  )
}
