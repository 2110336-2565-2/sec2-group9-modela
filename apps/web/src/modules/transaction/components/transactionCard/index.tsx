import { GetPendingJobsDebitsDto } from '@modela/dtos'
import { Typography } from '@mui/material'
import BaseHeader from 'common/components/JobCard/JobCardHeader/BaseHeader'
import theme from 'common/config/theme'
import Link from 'next/link'
import React from 'react'

import { CardContainer } from './styled'

const TransactionCard = (props: GetPendingJobsDebitsDto) => {
  const { title, jobId, castingId, firstname, companyName, profileImageUrl } =
    props

  return (
    <Link
      passHref
      href={`/transaction/${jobId}`}
      style={{ textDecoration: 'none', color: 'inherit' }}
    >
      <CardContainer>
        <BaseHeader
          title={title}
          castingId={castingId}
          castingName={firstname}
          companyName={companyName}
          jobCastingImageUrl={profileImageUrl}
        />
        <Typography
          variant="subtitle2"
          sx={{
            color: 'rgba(0, 0, 0, 0.6)',
          }}
        >
          รายละเอียดงาน:{' '}
          <Link
            href={`job/${jobId}`}
            style={{
              textDecoration: 'none',
              color: theme.palette.primary.main,
            }}
          >
            {title}
          </Link>
        </Typography>
      </CardContainer>
    </Link>
  )
}

export default TransactionCard
