import { JobStatus } from '@modela/dtos'
import { Divider } from '@mui/material'
import Link from 'next/link'
import React from 'react'

import { JobCardComponents } from './constants'
import { CardContainer, Description } from './styled'
import { JobCardProps } from './types'
import { getDescription } from './utils'

export default function JobCard(props: JobCardProps) {
  const { type, description, jobId, status, isReported } = props

  const { Header, Footer, Action } = JobCardComponents[type]

  return (
    <Link
      href={
        isReported && type === 'reported'
          ? `/job/${jobId}/reports`
          : `/job/${jobId}`
      }
      passHref
      style={{ textDecoration: 'none', color: 'inherit' }}
    >
      <CardContainer
        sx={{
          backgroundColor:
            status === JobStatus.CANCELLED ? 'rgba(33, 33, 33, 0.08)' : '',
        }}
      >
        <Header {...props} />
        <Description variant="subtitle2">
          {getDescription(description)}
        </Description>

        <Divider variant="fullWidth" sx={{ width: '100%' }} />
        <Footer {...props} />
        {Action && <Action />}
      </CardContainer>
    </Link>
  )
}
