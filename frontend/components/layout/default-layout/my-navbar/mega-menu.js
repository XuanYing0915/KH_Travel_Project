import React from 'react'
import styles from './mega-menu.module.scss'
import Link from 'next/link'

export default function MegaMenu({ megaMenuItems = {}, currentRoute }) {
  if (!megaMenuItems.id) return <></>

  return (
    <>
      <li className={`nav-item dropdown ${styles['dropdown']}`}>
        <Link
          //class="nav-link dropdown-toggle"
          // 尋找是否有符合 currentRoute 的 section與 section.children href
          className={`nav-link dropdown-toggle ${
            megaMenuItems.sections.find((v) => {
              // find section(first) href
              if (v.href === currentRoute) {
                return true
              }

              // else find children
              return !!v.children.find((v2) => v2.href === currentRoute)
            })
              ? 'active ' + styles['custom-active']
              : ''
          }`}
          href={megaMenuItems.href}
          id="navbarDropdown"
          role="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          {megaMenuItems.label}
        </Link>
        <div
          className={`dropdown-menu ${styles['dropdown-menu']} ${styles['slideIn']}`}
          aria-labelledby="navbarDropdown"
        >
          {megaMenuItems.sections.map((v) => {
            return (
              <ul key={v.id}>
                <li>
                  <Link
                    className={`dropdown-item ${
                      currentRoute === v.href ? 'active' : ''
                    }`}
                    href={v.href}
                  >
                    {v.label}
                  </Link>
                </li>
                {/* iterate children(array) */}
                {v.children &&
                  v.children.map((v2) => {
                    return (
                      <li key={v2.id}>
                        <Link
                          className={`dropdown-item ${
                            currentRoute === v2.href ? 'active' : ''
                          }`}
                          href={v2.href}
                        >
                          {v2.label}
                        </Link>
                      </li>
                    )
                  })}
              </ul>
            )
          })}
        </div>
      </li>
    </>
  )
}
