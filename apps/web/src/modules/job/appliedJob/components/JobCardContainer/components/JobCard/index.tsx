import { GetAppliedJobDto } from '@modela/dtos'
import { Divider, Typography } from '@mui/material'
import Footer from 'modules/job/components/JobCardFooter'
import Header from 'modules/job/components/JobCardHeader'
import Link from 'next/link'
import React from 'react'

import { CardContainer } from './styled'

export default function JobCard(prop: GetAppliedJobDto) {
  const {
    actorCount,
    description,
    applicationDeadline,
    gender,
    wage,
    jobId,
    status,
    appliedStatus,
    ...headerProps
  } = prop
  console.log(appliedStatus)
  return (
    <Link
      href={`/job/${jobId}`}
      passHref
      style={{ textDecoration: 'none', color: 'inherit' }}
    >
      <CardContainer>
        <Header
          status={status}
          jobId={jobId}
          appliedStatus={appliedStatus}
          {...headerProps}
        />
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
          isApplied={true}
        />
      </CardContainer>
    </Link>
  )
}
