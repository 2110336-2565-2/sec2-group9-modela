import { createTheme } from '@mui/material'

const theme = createTheme({
  palette: {
    primary: {
      main: '#5B85AA',
    },
    secondary: {
      main: '#D5BF86',
    },
    background: {
      default: '#FFFFFF',
      paper: '#FFFFFF',
    },
    error: {
      main: '#B00020',
    },
    common: {
      black: '#000000',
      white: '#FFFFFF',
    },
  },
})

export { theme }
