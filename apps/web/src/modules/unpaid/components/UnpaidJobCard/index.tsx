import { GetJobCardDto } from '@modela/dtos'
import { Divider, Typography } from '@mui/material'
import React from 'react'

import { CardContainer } from './styled'
import UnpaidJobCardFooter from './UnpaidJobCardFooter'
import UnpaidJobCardHeader from './UnpaidJobCardHeader'

export default function UnpaidJobCard(props: GetJobCardDto) {
  const {
    actorCount,
    description,
    applicationDeadline,
    gender,
    wage,
    jobId,
    status,
    isApplied,
    ...headerProps
  } = props

  return (
    <CardContainer>
      <UnpaidJobCardHeader status={status} jobId={jobId} {...headerProps} />
      <Typography
        variant="subtitle2"
        sx={{
          color: 'rgba(0,0,0,0.6)',
          paddingBottom: '12px',
          wordBreak: 'break-word',
        }}
      >
        {`${description.substring(0, 200)}${
          description.length >= 200 ? '...' : ''
        }`}
      </Typography>

      <Divider variant="fullWidth" sx={{ width: '100%' }} />
      <UnpaidJobCardFooter
        dueDate={applicationDeadline}
        gender={gender}
        wage={wage}
        actorCount={actorCount}
        status={status}
        jobId={jobId}
        isApplied={isApplied}
      />
    </CardContainer>
  )
}
