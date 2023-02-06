import { Login, Menu, Search } from '@mui/icons-material'
import { useUser } from 'common/context/UserContext'
import useSwitch from 'common/hooks/useSwitch'
import Image from 'next/image'
import { useRouter } from 'next/router'
import logo from 'public/logo.svg'
import React from 'react'

import NavbarMenu from '../NavbarMenu'
import { LoginButton, NavbarContainer } from './styled'

const NavbarMobile = () => {
  const menu = useSwitch()
  const user = useUser()
  const router = useRouter()

  return (
    <NavbarContainer>
      <Image src={logo} alt="logo" width={67.5} height={30} />
      <div style={{ flexGrow: 1 }} />
      {user ? (
        <>
          <Search />
          <Menu onClick={menu.open} />
          <NavbarMenu isOpen={menu.isOpen} onClose={menu.close} />
        </>
      ) : (
        <LoginButton onClick={() => router.push('/login')}>
          <Login />
          เข้าสู่ระบบ
        </LoginButton>
      )}
    </NavbarContainer>
  )
}

export default NavbarMobile
