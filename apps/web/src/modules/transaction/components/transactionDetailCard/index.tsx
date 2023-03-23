import { Divider, Typography } from '@mui/material'
import theme from 'common/config/theme'
import JobCardHeader from 'modules/job/components/JobCardHeader'
import { useRouter } from 'next/router'
import React from 'react'

import { CardContainer } from './styled'

const TransactionDetailCard = () => {
  const router = useRouter()
  const { jobId } = router.query

  return (
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
      <Typography>ธนาคาร: </Typography>
      <Typography>เลขบัญชี: </Typography>
      <Divider sx={{ width: '100%', margin: '1rem 0' }} />
      <Typography
        sx={{
          color: theme.palette.success.main,
          cursor: 'pointer',
          alignSelf: 'center',
        }}
        onClick={() => alert(jobId)}
      >
        เสร็จสิ้น
      </Typography>
    </CardContainer>
  )
}

export default TransactionDetailCard
