import { Typography } from '@mui/material'
import theme from 'common/config/theme'
import JobCardHeader from 'modules/job/components/JobCardHeader'
import Link from 'next/link'
import React from 'react'

import { CardContainer } from './styled'
import { TransactionCardProps } from './types'

const TransactionCard = (props: TransactionCardProps) => {
  const { jobId } = props

  return (
    <Link
      passHref
      href={'/transaction/' + jobId}
      style={{ textDecoration: 'none', color: 'inherit' }}
    >
      <CardContainer>
        <JobCardHeader
          title="P"
          castingId={1}
          castingName="P"
          companyName="company"
          jobCastingImageUrl=""
          jobId={1}
          status="OPEN"
        />
        <Typography>
          รายละเอียดงาน:{' '}
          <Link
            href={'job/' + jobId}
            style={{
              textDecoration: 'none',
              color: theme.palette.primary.main,
            }}
          >
            job title
          </Link>
        </Typography>
      </CardContainer>
    </Link>
  )
}

export default TransactionCard
