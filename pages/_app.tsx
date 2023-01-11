import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ThemeProvider } from 'theme-ui'
import theme from '../src/theme'

import { SessionProvider } from "next-auth/react"

import { ModalProvider } from "../src/contexts/modalContext";
import { UnitListProvider } from "../src/contexts/unitListContext";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <ThemeProvider theme={theme}>
        <ModalProvider>
          <UnitListProvider>
            <Component {...pageProps} />

          </UnitListProvider>
        </ModalProvider>
      </ThemeProvider>
    </SessionProvider>
  )
}
