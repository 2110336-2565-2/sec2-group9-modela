import { Menu, Search } from '@mui/icons-material'
import Image from 'next/image'
import logo from 'public/logo.svg'
import React from 'react'

import { NavbarContainer } from './styled'

const NavbarMobile = () => {
  return (
    <NavbarContainer>
      <Image src={logo} alt="logo" width={67.5} height={30} />
      <div style={{ flexGrow: 1 }} />
      <Search />
      <Menu />
    </NavbarContainer>
  )
}

export default NavbarMobile
