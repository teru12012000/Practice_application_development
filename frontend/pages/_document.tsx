import Header from '@/components/Header/Header'
import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="ja">
      <Head />
      <body
        style={{
          padding:0,
          margin:0,
        }}
      >
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
