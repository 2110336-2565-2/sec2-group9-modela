import { ArrowBackIos, Login, Menu, Search } from '@mui/icons-material'
import { useLayout } from 'common/context/LayoutContext'
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
  const { onSearch, override } = useLayout()

  if (override)
    return (
      <NavbarContainer sx={{ gap: '5px', padding: '8px 24px' }}>
        <ArrowBackIos onClick={override.onBack} sx={{ cursor: 'pointer' }} />
        {override.title}
      </NavbarContainer>
    )

  return (
    <NavbarContainer>
      <Image src={logo} alt="logo" width={67.5} height={30} />
      <div style={{ flexGrow: 1 }} />
      {user ? (
        <>
          {onSearch && (
            <Search
              onClick={() => {
                onSearch?.()
              }}
              sx={{ cursor: 'pointer' }}
            />
          )}
          <Menu onClick={menu.open} sx={{ cursor: 'pointer' }} />
          <NavbarMenu isOpen={menu.isOpen} onClose={menu.close} />
        </>
      ) : (
        <LoginButton
          onClick={() => router.push('/login')}
          sx={{ cursor: 'pointer' }}
        >
          <Login />
          เข้าสู่ระบบ
        </LoginButton>
      )}
    </NavbarContainer>
  )
}

export default NavbarMobile
