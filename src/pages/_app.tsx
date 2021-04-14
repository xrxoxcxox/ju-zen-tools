import { Global } from '@emotion/react'
import type { AppProps } from 'next/app'
import { FC } from 'react'
import { customProperty } from '../styles/cssCustomProperty'
import { global } from '../styles/global'

const MyApp: FC<AppProps> = ({ Component, pageProps }: AppProps) => (
  <>
    <Global styles={[customProperty, global]} />
    <Component {...pageProps} />
  </>
)

export default MyApp
