import { Divider, Typography } from '@mui/material'
import Footer from 'modules/job/components/JobCardFooter'
import Header from 'modules/job/components/JobCardHeader'
import React from 'react'

import goJobDetail from './hooks/useJobCard'
import { CardContainer } from './styled'
import { CardProps } from './types'

export default function JobCard(prop: CardProps) {
  const {
    actorCount,
    jobCastingImageUrl,
    companyName,
    description,
    applicationDeadline,
    gender,
    title,
    wage,
    jobId,
    status,
  } = prop
  const { viewDetail } = goJobDetail()

  return (
    <CardContainer onClick={() => viewDetail(jobId)}>
      <Header
        title={title}
        companyName={companyName}
        castingImage={jobCastingImageUrl}
      />
      <Typography variant="subtitle2" sx={{ color: 'rgba(0,0,0,0.6)' }}>
        {description}
      </Typography>

      <Divider variant="middle" sx={{ width: '90%' }} />
      <Footer
        dueDate={applicationDeadline}
        gender={gender}
        wage={wage}
        actorCount={actorCount}
        status={status}
      />
    </CardContainer>
  )
}
