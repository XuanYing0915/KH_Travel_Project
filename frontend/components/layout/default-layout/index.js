// import MyNavbar from './my-navbar-nouse'
import MyNavbarBS5 from './my-navbar'
import MyFooter from './my-footer'
import Head from 'next/head'
import NextBreadCrumb from '@/components/common/next-breadcrumb'
import {CartContext} from '@/components/hotel/CartContext' //0809引入要儲存訊息
import { useState } from 'react'

export default function DefaultLayout({ title = '高雄旅遊網', children }) {

  const [adults, setAdults] = useState(0); 
  const [childrens, setChildrens] = useState(0); 

  return (
    <>
      {/* 0809引入要儲存訊息，讓每一頁都能使用 */}
      <CartContext.Provider value={{adults, setAdults,childrens, setChildrens}}>
        <Head>
          <link href='/logo.png' rel="shortcut icon"/>
          <title >{title}</title>
          <meta name="viewport" content="width=device-width" />
          {/* 引用icon */}
          <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
          />
        </Head>
        <MyNavbarBS5 />
        <main className="flex-shrink-0 " style={{minHeight:'calc(100% - 180px)', paddingTop:'100px'}}>
          {/* <div className="container"> */}
          {/* <NextBreadCrumb isHomeIcon isChevron bgClass="" /> */}
          {children}
          {/* </div> */}
        </main>
      </CartContext.Provider>
      <MyFooter />
    </>
  )
}
