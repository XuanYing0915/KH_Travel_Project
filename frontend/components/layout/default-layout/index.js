// import MyNavbar from './my-navbar-nouse'
import MyNavbarBS5 from './my-navbar'
import MyFooter from './my-footer'
import Head from 'next/head'
import NextBreadCrumb from '@/components/common/next-breadcrumb'

export default function DefaultLayout({ title = '', children }) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="viewport" content="width=device-width" />
      </Head>
      <MyNavbarBS5 />
      <main className="flex-shrink-0 mt-3">
        <div className="container">
          <NextBreadCrumb isHomeIcon isChevron bgClass="" />
          {children}
        </div>
      </main>
      <MyFooter />
    </>
  )
}
