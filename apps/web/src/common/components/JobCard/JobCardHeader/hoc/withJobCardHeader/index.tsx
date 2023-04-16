import { Typography } from '@mui/material'
import { getTitle } from 'common/components/JobCard/utils'
import ProfileImage from 'common/components/ProfileImage'
import Link from 'next/link'
import React from 'react'

import { HeaderRow, TitleContainer } from './styled'
import { WithJobCardHeaderProps } from './types'

const withJobCardHeader = <T extends Record<string, any>>(
  WrappedComponent: React.ComponentType<T>,
) => {
  const WithJobCardHeader = (props: T & WithJobCardHeaderProps) => {
    const {
      jobCastingImageUrl,
      companyName,
      title,
      castingId,
      castingName,
      fullTitle,
    } = props

    return (
      <HeaderRow>
        <Link
          href={`/profile/${castingId}`}
          passHref
          style={{ textDecoration: 'none', color: 'inherit' }}
        >
          <ProfileImage
            src={jobCastingImageUrl}
            firstName={castingName}
            userId={castingId}
            sx={{ marginTop: '4px' }}
          />
        </Link>
        <TitleContainer>
          <Typography variant="h6" sx={{ wordBreak: 'break-word' }}>
            {fullTitle ? title : getTitle(title)}
          </Typography>
          <Typography fontWeight={400} sx={{ wordBreak: 'break-word' }}>
            {companyName}
          </Typography>
        </TitleContainer>
        <WrappedComponent {...props} />
      </HeaderRow>
    )
  }
  return WithJobCardHeader
}

export default withJobCardHeader
