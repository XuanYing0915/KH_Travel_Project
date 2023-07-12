import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en" className="h-100">
      <Head />
      <body className="d-flex flex-column h-100">
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
