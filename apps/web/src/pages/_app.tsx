import { EmotionCache } from '@emotion/cache'
import { CacheProvider } from '@emotion/react'
import { CssBaseline, ThemeProvider } from '@mui/material'
import theme, { createEmotionCache } from 'common/config/theme'
import type { AppProps } from 'next/app'

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache()

interface AppPropsWithCache extends AppProps {
  emotionCache?: EmotionCache
}

function MyApp(props: AppPropsWithCache) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props
  return (
    <CacheProvider value={emotionCache}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Component {...pageProps} style={{ flex: 1 }} />
      </ThemeProvider>
    </CacheProvider>
  )
}

export default MyApp
