import { Divider, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import React from 'react'

import Footer from '../../../../../components/JobCardFooter'
import Header from '../../../../../components/JobCardHeader'
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
  const router = useRouter()
  const viewDetail = () => {
    router.push(`/job/${jobId}`)
  }

  return (
    <CardContainer onClick={viewDetail}>
      <Header
        title={title}
        companyName={companyName}
        castingImage={jobCastingImageUrl}
      />
      <Typography variant="subtitle2" sx={{ color: 'rgba(0,0,0,0.6)' }}>
        {description}
      </Typography>

      <Divider variant="middle" style={{ width: '90%' }} />
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
