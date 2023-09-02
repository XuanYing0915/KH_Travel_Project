// import MyNavbar from './my-navbar-nouse'
import MyNavbarBS5 from './my-navbar'
import MyFooter from './my-footer'
import Head from 'next/head'
import { CartContext } from '@/components/hotel/CartContext' //0809引入要儲存訊息
import { useState } from 'react'

export default function DefaultLayout({ title = '高雄旅遊網', children }) {

  const [adults, setAdults] = useState(0);
  const [childrens, setChildrens] = useState(0);

  //測試用
  const [discount, setDiscount] = useState('1111');   //類別優惠
  const [times, setTimes] = useState({ 'name': 'qaz2.0', 'time': null });//會員名稱,創建時間
  const [open, setOpen] = useState(false);//是否開啟開關






  return (
    <>
      {/* 0809引入要儲存訊息，讓每一頁都能使用 */}
      <CartContext.Provider value={{ adults, setAdults, childrens, setChildrens, discount, setDiscount, times, setTimes, open, setOpen }}>
        <Head>
          <link href='/logo.png' rel="shortcut icon" />
          <title >{title}</title>
          <meta name="viewport" content="width=device-width" />
          
        </Head>
        <MyNavbarBS5 />
        <main className="flex-shrink-0 " style={{ minHeight: 'calc(100% - 180px)', paddingTop: '100px' }}>
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
