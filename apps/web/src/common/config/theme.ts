import createCache from '@emotion/cache'
import { createTheme } from '@mui/material'
import { Roboto } from '@next/font/google'

export const roboto = Roboto({
  weight: ['300', '400', '500'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
})

const theme = createTheme({
  palette: {
    primary: {
      main: '#5B85AA',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#C3DCF1',
      contrastText: '#000000',
    },
    background: {
      default: '#FFFFFF',
      paper: '#FFFFFF',
    },
    error: {
      main: '#B00020',
      contrastText: '#FFFFFF',
    },
    common: {
      black: '#000000',
      white: '#FFFFFF',
    },
  },
  typography: {
    fontFamily: roboto.style.fontFamily,
  },
})

export function createEmotionCache() {
  let insertionPoint

  if (typeof document !== 'undefined') {
    const emotionInsertionPoint = document.querySelector<HTMLMetaElement>(
      'meta[name="emotion-insertion-point"]',
    )
    insertionPoint = emotionInsertionPoint ?? undefined
  }

  return createCache({ key: 'mui-style', insertionPoint })
}

export default theme
