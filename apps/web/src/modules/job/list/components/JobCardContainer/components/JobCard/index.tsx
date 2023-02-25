import { GetJobCardDto, JobStatus } from '@modela/dtos'
import { Divider, Typography } from '@mui/material'
import Footer from 'modules/job/components/JobCardFooter'
import Header from 'modules/job/components/JobCardHeader'
import Link from 'next/link'
import React from 'react'

import { CardContainer } from './styled'

export default function JobCard(prop: GetJobCardDto) {
  const {
    actorCount,
    description,
    applicationDeadline,
    gender,
    wage,
    jobId,
    status,
    ...headerProps
  } = prop

  return (
    <Link
      href={`/job/${jobId}`}
      passHref
      style={{ textDecoration: 'none', color: 'inherit' }}
    >
      <CardContainer
        sx={{
          backgroundColor:
            status === JobStatus.CANCELLED ? 'rgba(33, 33, 33, 0.08)' : '',
        }}
      >
        <Header status={status} jobId={jobId} {...headerProps} />
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
        <Footer
          dueDate={applicationDeadline}
          gender={gender}
          wage={wage}
          actorCount={actorCount}
          status={status}
        />
      </CardContainer>
    </Link>
  )
}
