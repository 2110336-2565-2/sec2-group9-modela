import { ApplicationStatus, JobStatus } from '@modela/dtos'
import { ReportOutlined } from '@mui/icons-material'
import { IconButton, Typography } from '@mui/material'
import Chip from 'common/components/Chip'
import ProfileImage from 'common/components/ProfileImage'
import { useRouter } from 'next/router'
import React from 'react'

import { CHIP_VARINTS } from './constants'
import { HeaderContainer } from './styled'
import { ActorCardHeaderProps } from './types'

const ActorCardHeader = (props: ActorCardHeaderProps) => {
  const { firstName, middleName, lastName, profileImageUrl, actorId, status } =
    props

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
      {props.jobStatus === JobStatus.SELECTION_ENDED &&
      props.status === ApplicationStatus.OFFER_ACCEPTED ? (
        <IconButton
          href={`/job/${jobId}/actor/${actorId}/refund`}
          onClick={(ev) => ev.stopPropagation()}
        >
          <ReportOutlined fontSize="medium" color="error" />
        </IconButton>
      ) : (
        <>{status && <Chip {...CHIP_VARINTS[status]} />}</>
      )}
    </HeaderContainer>
  )
}

export default ActorCardHeader
