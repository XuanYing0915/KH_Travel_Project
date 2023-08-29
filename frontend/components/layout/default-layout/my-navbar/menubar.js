import Link from 'next/link'
// import MegaMenu from './mega-menu'
import styles from './menubar.module.scss'

// 說明:
// 選單客製化以靜態方式、移至config檔案或寫死(hard code)來產生是常見
// 選單項目定義在這裡，下面元件程式碼會自動產生對應的dom
// MegaMenu比複雜，獨立定義自己的項目(在下面的megaMenuItems)
// id是作key用的，不重覆即可
// 有下拉的選單需要加一個children的陣列屬性
const menuItems = [
  {
    id: 1,
    label: '首頁',
    href: '/',
  },
  {
    id: 2,
    label: '旅遊景點',
    href: '/news',
    children: [
      { id: 21, label: '探索景點', href: '/attraction' },
      { id: 22, label: '旅程安排', href: '/attraction/itinerary' },
    ],
  },
  {
    id: 3,
    label: '特色美食',
    href: '/food',
  },
  {
    id: 4,
    label: '票券訂購',
    href: '/ticket',
  },
  {
    id: 5,
    label: '當地住宿',
    href: '/hotel',
  },
]


export default function MainMenu({ currentRoute = '/' }) {
  return (
    <>
      <ul className="navbar-nav flex-grow-1  ps-xs-0">
        {menuItems.map((v) => {
          // 用children判斷是否有下拉選單
          if (!v.children) {
            return (
              <li className="nav-item" key={v.id} >
                <Link
                  className={`nav-link ${currentRoute === v.href
                    ? 'active ' + styles['custom-active']
                    : ''
                    }`}
                  aria-current="page"
                  href={v.href}
                  style={{
                    fontFamily: 'YuGothic, Yu Gothic Regular',
                    fontSize: '20px',
                    color: '#5F5F5F',
                  }}
                >
                  {v.label}
                </Link>
              </li>
            )
          }

          // 以下為有dropmenu(下拉選單)的選單項目的jsx
          return (
            <li
              className={`nav-item dropdown ${styles['dropdown']}`}
              key={v.id}
            >
              <Link
                // 尋找是否有符合 currentRoute 的 children href
                className={`nav-link dropdown-toggle ${v.children.find((v) => v.href === currentRoute)
                  ? 'active ' + styles['custom-active']
                  : ''
                  }`}
                href={v.href}
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                style={{
                  fontFamily: 'YuGothic, Yu Gothic Regular',
                  fontSize: '20px',
                  color: '#5F5F5F',
                }}
              >
                {v.label}
              </Link>
              <ul
                className={`dropdown-menu ${styles['slideIn']} ${styles['dropdown-menu']}`}
              >
                {v.children.map((v2) => {
                  return (
                    <li key={v2.id}>
                      <Link
                        className={`dropdown-item ${currentRoute === v2.href ? 'active' : ''
                          }`}
                        href={v2.href}
                      >
                        {v2.label}
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </li>
          )
        })}
        {/* 這裡附加上MegaMenu */}
        {/* currentRoute是目前的路由位置，為了要套用選單項目的active類別用 */}
        {/* <MegaMenu megaMenuItems={megaMenuItems} currentRoute={currentRoute} /> */}
      </ul>
    </>
  )
}
