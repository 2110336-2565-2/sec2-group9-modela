import { Typography } from '@mui/material'
import ProfileImage from 'common/components/ProfileImage'
import React from 'react'

import { HeaderRow, TitleContainer } from './styled'
import { HeaderProps } from './types'

const UnpaidJobCardHeader = (props: HeaderProps) => {
  const {
    jobCastingImageUrl,
    companyName,
    title,
    isDetail,
    castingId,
    castingName,
  } = props

  return (
    <HeaderRow>
      <ProfileImage
        src={jobCastingImageUrl}
        firstName={castingName}
        userId={castingId}
        sx={{ marginTop: '4px' }}
      />
      <TitleContainer>
        <Typography variant="h6" sx={{ wordBreak: 'break-word' }}>
          {!isDetail &&
            `${title.substring(0, 50)}${title.length >= 50 ? '...' : ''}`}
          {isDetail && title}
        </Typography>
        <Typography fontWeight={400} sx={{ wordBreak: 'break-word' }}>
          {companyName}
        </Typography>
      </TitleContainer>
    </HeaderRow>
  )
}
export default UnpaidJobCardHeader
