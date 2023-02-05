import { ReportOutlined } from '@mui/icons-material'
import { Typography } from '@mui/material'
import { useUser } from 'common/context/UserContext'
import Image from 'next/image'
import React from 'react'

import { HeaderRow, ProfileImageContainer } from './styled'
import { HeaderProps } from './type'

const JobCardHeader = (prop: HeaderProps) => {
  const { castingImage, companyName, title } = prop
  const user = useUser()

  const report = () => {
    window.alert('reported')
  }

  return (
    <HeaderRow>
      <ProfileImageContainer>
        <Image
          fill
          loader={() => castingImage}
          src={castingImage}
          sizes={'100%'}
          alt="casting pic"
        />
      </ProfileImageContainer>
      <div>
        <Typography variant="h6">{title}</Typography>
        <Typography fontWeight={400}>{companyName}</Typography>
      </div>
      {user?.type == 'ACTOR' && (
        <ReportOutlined
          fontSize="small"
          color="error"
          style={{ cursor: 'pointer', marginLeft: 'auto' }}
          onClick={() => report()}
        />
      )}
    </HeaderRow>
  )
}
export default JobCardHeader
