import { useEffect } from 'react'
import '@/styles/globals.scss'
import '@/styles/product.scss'
import '@/styles/cart.scss'
// 組員scss/css 全域放置處
import '@/styles/attraction.scss'
import '@/styles/hotel.scss'

import DefaultLayout from '@/components/layout/default-layout'
import { CartProvider } from '@/hooks/use-cart'

export default function MyApp({ Component, pageProps }) {
  // 導入bootstrap的JS函式庫
  useEffect(() => {
    import('bootstrap/dist/js/bootstrap')
  }, [])

  // 使用預設排版檔案
  // 對應`components/layout/default-layout/index.js`(或components/layout/default-layout.js)
  const getLayout =
    Component.getLayout || ((page) => <DefaultLayout>{page}</DefaultLayout>)

  return <CartProvider>{getLayout(<Component {...pageProps} />)}</CartProvider>
}
