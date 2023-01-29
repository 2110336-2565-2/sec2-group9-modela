import { createTheme } from '@mui/material'

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
})

export default theme
