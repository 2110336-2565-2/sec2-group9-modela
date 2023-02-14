import { Divider, Typography } from '@mui/material'
import Footer from 'modules/job/components/JobCardFooter'
import Header from 'modules/job/components/JobCardHeader'
import Link from 'next/link'
import React from 'react'

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

  return (
    <Link href={`/job/${jobId}`} passHref>
      <CardContainer>
        <Header
          title={title}
          companyName={companyName}
          castingImage={jobCastingImageUrl}
          status={status}
        />
        <Typography
          variant="subtitle2"
          sx={{ color: 'rgba(0,0,0,0.6)', paddingBottom: '12px' }}
        >
          {description}
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
