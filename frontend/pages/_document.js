import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="zh-TW" className="h-150">
      <Head>123</Head>
      <body>
        {/* <body className="d-flex flex-column h-100"> */}
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
