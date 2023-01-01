import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ThemeProvider } from 'theme-ui'
import theme from '../src/theme'

import { SessionProvider } from "next-auth/react"

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </SessionProvider>
  )
}
