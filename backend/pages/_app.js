// import '@/styles/globals.css'
//import '@/styles/product-table.css'
// import '@/styles/menu.css'
// import '@/styles/book-list.css'
import { AuthProvider } from '@/hooks/use-auth'

export default function MyApp({ Component, pageProps }) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout || ((page) => page)

  return <AuthProvider>{getLayout(<Component {...pageProps} />)}</AuthProvider>
}
