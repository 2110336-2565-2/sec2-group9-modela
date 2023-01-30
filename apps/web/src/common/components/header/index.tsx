import { Typography } from '@mui/material'
import Image from 'next/image'
import logo from 'public/logo.png'
import React from 'react'

import { HeaderContainer, LeftGroup, RightGroup } from './styled'

export default function Header() {
  const username = 'username'
  return (
    <HeaderContainer>
      <LeftGroup>
        <Image src={logo} alt="logo" width={108} height={48} />
        <Typography color="white">งานของฉัน</Typography>
        <Typography color="white">การแจ้งเตือน</Typography>
      </LeftGroup>
      <RightGroup>
        <Typography color="white">โปรไฟล์</Typography>
        <Typography color="white">สวัสดี คุณ {username}</Typography>
        <Typography color="white">ออกจากระบบ</Typography>
      </RightGroup>
    </HeaderContainer>
  )
}
