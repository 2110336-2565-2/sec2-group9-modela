import { PendingActorDebitDto } from '@modela/dtos'
import { Divider, Typography } from '@mui/material'
import theme from 'common/config/theme'
import JobCardHeader from 'modules/job/components/JobCardHeader'
import { useRouter } from 'next/router'
import React from 'react'

import { CardContainer } from './styled'

const TransactionDetailCard = (props: PendingActorDebitDto) => {
  const router = useRouter()
  const { jobId } = router.query
  const {
    actorId,
    firstName,
    lastName,
    bankAccount,
    bankName,
    middleName,
    profileImageUrl,
  } = props

  return (
    <CardContainer>
      <JobCardHeader
        title={firstName + ' ' + middleName + ' ' + lastName}
        castingId={actorId}
        castingName="P"
        companyName="company"
        jobCastingImageUrl={profileImageUrl}
        jobId={1}
        status="OPEN"
      />
      <Typography>ธนาคาร: {bankName}</Typography>
      <Typography>เลขบัญชี: {bankAccount}</Typography>
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
