import { Divider, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import React from 'react'

import Footer from '../../../../../detail/components/JobCard/components/JobCardFooter'
import Header from '../../../../../detail/components/JobCard/components/JobCardHeader'
import { CardContainer } from './styled'
import { CardProps } from './type'

export default function JobCard(prop: CardProps) {
  const {
    actorCount,
    castingImage,
    companyName,
    description,
    dueDate,
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
        castingImage={castingImage}
      />
      <Typography variant="subtitle2" sx={{ color: 'rgba(0,0,0,0.6)' }}>
        {description}
      </Typography>

      <Divider variant="middle" style={{ width: '90%' }} />
      <Footer
        dueDate={dueDate}
        gender={gender}
        wage={wage}
        actorCount={actorCount}
        status={status}
      />
    </CardContainer>
  )
}
