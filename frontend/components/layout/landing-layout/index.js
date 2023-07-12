import MyNavbarBS5 from '@/components/layout/default-layout//my-navbar'
// import MyFooter from '@/components/layout/default-layout/my-footer'
import Head from 'next/head'
// import NextBreadCrumb from '@/components/common/next-breadcrumb'

export default function LandingLayout({ title = '', children }) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="viewport" content="width=device-width" />
      </Head>
      <MyNavbarBS5 />
      <main className="flex-shrink-0 mt-3">
        <div className="container-fluid m-0 p-0">{children}</div>
      </main>
    </>
  )
}
