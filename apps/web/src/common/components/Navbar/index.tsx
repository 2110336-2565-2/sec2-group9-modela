import { Theme, useMediaQuery } from '@mui/material'
import React from 'react'

import NavbarDesktop from './components/NavbarDesktop'
import NavbarMobile from './components/NavbarMobile'

const Navbar = () => {
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'))
  if (isMobile) return <NavbarMobile />
  return <NavbarDesktop />
}

export default Navbar
