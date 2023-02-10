import { EmotionCache } from '@emotion/cache'
import { CacheProvider } from '@emotion/react'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import theme, { createEmotionCache } from 'common/config/theme'
import { LayoutProvider } from 'common/context/LayoutContext'
import { NotiProvider } from 'common/context/NotiContext'
import { UserProvider } from 'common/context/UserContext'
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
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <UserProvider>
            <CssBaseline />
            <LayoutProvider>
              <NotiProvider>
                <Component {...pageProps} />
              </NotiProvider>
            </LayoutProvider>
          </UserProvider>
        </LocalizationProvider>
      </ThemeProvider>
    </CacheProvider>
  )
}

export default MyApp
