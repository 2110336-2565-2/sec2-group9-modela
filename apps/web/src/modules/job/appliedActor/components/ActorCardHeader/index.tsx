import { JobStatus } from '@modela/database'
import { ReportOutlined } from '@mui/icons-material'
import { IconButton, Typography } from '@mui/material'
import Chip from 'common/components/Chip'
import ProfileImage from 'common/components/ProfileImage'
import { CHIP_VARIANTS } from 'common/constants/ApplicationStatusChip'
import { useRouter } from 'next/router'
import React from 'react'

import { HeaderContainer } from './styled'
import { ActorCardHeaderProps } from './types'

const ActorCardHeader = (props: ActorCardHeaderProps) => {
  const {
    firstName,
    middleName,
    lastName,
    profileImageUrl,
    actorId,
    status,
    isRefundable,
    jobStatus,
  } = props

  const router = useRouter()
  const { jobId } = router.query

  return (
    <HeaderContainer>
      <ProfileImage
        src={profileImageUrl}
        userId={actorId}
        firstName={firstName}
        sx={{
          width: '40px',
          height: '40px',
        }}
      />
      <Typography variant="h6" sx={{ flexGrow: 1 }}>
        {firstName} {middleName} {lastName}
      </Typography>
      {isRefundable && jobStatus === JobStatus.SELECTION_ENDED ? (
        <IconButton
          href={`/job/${jobId}/actor/${actorId}/refund`}
          onClick={(ev) => ev.stopPropagation()}
        >
          <ReportOutlined fontSize="medium" color="error" />
        </IconButton>
      ) : (
        <>{status && <Chip {...CHIP_VARIANTS[status]} />}</>
      )}
    </HeaderContainer>
  )
}

export default ActorCardHeader
