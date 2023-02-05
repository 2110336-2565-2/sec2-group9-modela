import { ReportOutlined } from '@mui/icons-material'
import { Typography } from '@mui/material'
import Image from 'next/image'
import React from 'react'

import { HeaderRow, ProfileImageContainer } from './styled'
import { HeaderProps } from './type'

const JobCardHeader = (prop: HeaderProps) => {
  const { castingImage, companyName, title } = prop

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
        <Typography>{companyName}</Typography>
      </div>
      <ReportOutlined
        fontSize="small"
        color="error"
        style={{ cursor: 'pointer', marginLeft: 'auto' }}
        onClick={() => report()}
      />
    </HeaderRow>
  )
}
export default JobCardHeader
