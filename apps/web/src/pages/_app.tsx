import { ThemeProvider } from '@mui/material'
import theme from 'common/config/theme'
import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <Component {...pageProps} style={{ flex: 1 }} />
    </ThemeProvider>
  )
}

export default MyApp
