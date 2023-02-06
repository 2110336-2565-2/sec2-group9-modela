import { Menu, Search } from '@mui/icons-material'
import useSwitch from 'common/hooks/useSwitch'
import Image from 'next/image'
import logo from 'public/logo.svg'
import React from 'react'

import NavbarMenu from '../NavbarMenu'
import { NavbarContainer } from './styled'

const NavbarMobile = () => {
  const menu = useSwitch()

  return (
    <NavbarContainer>
      <Image src={logo} alt="logo" width={67.5} height={30} />
      <div style={{ flexGrow: 1 }} />
      <Search />
      <Menu onClick={menu.open} />
      <NavbarMenu isOpen={menu.isOpen} onClose={menu.close} />
    </NavbarContainer>
  )
}

export default NavbarMobile
