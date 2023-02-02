import { useUser } from 'common/context/UserContext'
import Image from 'next/image'
import { useRouter } from 'next/router'
import logo from 'public/logo.svg'
import React from 'react'

import { NavbarContainer, NavbarItem } from './styled'
import { NavbarProps } from './types'

const Navbar = ({ focus }: NavbarProps) => {
  const user = useUser()
  const router = useRouter()
  return (
    <NavbarContainer>
      <Image src={logo} alt="logo" width={108} height={48} />
      {user ? (
        <>
          <NavbarItem focus={focus == 'jobs'}>งานของฉัน</NavbarItem>
          <NavbarItem focus={focus == 'notification'}>การแจ้งเตือน</NavbarItem>
          <div style={{ flexGrow: 1 }} />
          <NavbarItem focus={focus == 'profile'}>โปรไฟล์</NavbarItem>
          <NavbarItem sx={{ pointerEvents: 'none' }}>
            สวัสดี คุณ {user?.firstName}
          </NavbarItem>
          <NavbarItem>ออกจากระบบ</NavbarItem>
        </>
      ) : (
        <>
          <div style={{ flexGrow: 1 }} />
          <NavbarItem onClick={() => router.push('/login')}>
            เข้าสู่ระบบ
          </NavbarItem>
        </>
      )}
    </NavbarContainer>
  )
}

export default Navbar
