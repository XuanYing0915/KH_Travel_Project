import { useEffect } from 'react'
import '@/styles/globals.scss'
import '@/styles/product.scss'
import '@/styles/cart.scss'

// 組員scss/css 全域放置處
import '@/styles/attraction.scss'
import '@/styles/hotel.scss'
import '@/styles/footer.scss'
import '@/styles/ticket.scss'
import '@/styles/homepage.scss'

import { AuthProviderJWT } from '@/hooks/use-auth-jwt'

import DefaultLayout from '@/components/layout/default-layout'
import { CartProvider } from '@/hooks/use-cart'
import { FoodCartProvider } from '@/hooks/use-food-cart'
import { TicketCartProvider } from '@/hooks/use-ticket-cart'


// AuthProvider一樣需要加到_app.js中，它是全站分享的會員登入狀態Context:


//...


export default function MyApp({ Component, pageProps }) {
  // 導入bootstrap的JS函式庫
  useEffect(() => {
    import('bootstrap/dist/js/bootstrap')
  }, [])

  // 使用預設排版檔案
  // 對應`components/layout/default-layout/index.js`(或components/layout/default-layout.js)
  const getLayout =
    Component.getLayout || ((page) => <DefaultLayout>{page}</DefaultLayout>)

  return (

    <AuthProviderJWT>
      <FoodCartProvider>
        <TicketCartProvider>
          {/* <CartProvider> */}
            {getLayout(<Component {...pageProps} />)}
          {/* </CartProvider> */}
        </TicketCartProvider>
      </FoodCartProvider>
    </AuthProviderJWT>

  )
}
