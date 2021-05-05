import { Global } from '@emotion/react'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { FC } from 'react'
import { customProperty } from '../styles/cssCustomProperty'
import { global } from '../styles/global'
import 'what-input'

const MyApp: FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;700"
          rel="stylesheet"
        />
      </Head>
      <Global styles={[customProperty, global]} />
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
