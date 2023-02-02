import { useUser } from 'common/context/UserContext'
import Image from 'next/image'
import { useRouter } from 'next/router'
import logo from 'public/logo.svg'
import React from 'react'

import { HeaderContainer, HeaderItem } from './styled'
import { HeaderProps } from './types'

const Header = ({ focus }: HeaderProps) => {
  const user = useUser()
  const router = useRouter()
  return (
    <HeaderContainer>
      <Image src={logo} alt="logo" width={108} height={48} />
      {user ? (
        <>
          <HeaderItem focus={focus == 'jobs'}>งานของฉัน</HeaderItem>
          <HeaderItem focus={focus == 'notification'}>การแจ้งเตือน</HeaderItem>
          <div style={{ flexGrow: 1 }} />
          <HeaderItem focus={focus == 'profile'}>โปรไฟล์</HeaderItem>
          <HeaderItem sx={{ pointerEvents: 'none' }}>
            สวัสดี คุณ {user?.firstName}
          </HeaderItem>
          <HeaderItem>ออกจากระบบ</HeaderItem>
        </>
      ) : (
        <>
          <div style={{ flexGrow: 1 }} />
          <HeaderItem onClick={() => router.push('/login')}>
            เข้าสู่ระบบ
          </HeaderItem>
        </>
      )}
    </HeaderContainer>
  )
}

export default Header
