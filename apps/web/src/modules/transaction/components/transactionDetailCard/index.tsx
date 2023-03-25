import { Divider, Typography } from '@mui/material'
import theme from 'common/config/theme'
import ActorCardHeader from 'modules/job/appliedActor/components/ActorCardHeader'
import React from 'react'

import { CardContainer } from './styled'
import { transactionDetailCardProps } from './types'

const TransactionDetailCard = (props: transactionDetailCardProps) => {
  console.log(props.data)
  const {
    actorId,
    firstName,
    lastName,
    bankAccount,
    bankName,
    middleName,
    profileImageUrl,
  } = props.data

  return (
    <CardContainer>
      <ActorCardHeader
        actorId={actorId}
        firstName={firstName}
        lastName={lastName}
        middleName={middleName}
        profileImageUrl={profileImageUrl}
      />
      <div style={{ height: '1rem' }} />

      <Typography sx={{ color: 'rgba(0,0,0,0.6)' }}>
        ธนาคาร: {bankName}
      </Typography>
      <Typography sx={{ color: 'rgba(0,0,0,0.6)' }}>
        เลขบัญชี: {bankAccount}
      </Typography>
      <Divider sx={{ width: '100%', margin: '1rem 0' }} />
      <Typography
        sx={{
          color: theme.palette.success.main,
          cursor: 'pointer',
          alignSelf: 'center',
        }}
        onClick={() => props.markAccepted(actorId)}
      >
        เสร็จสิ้น
      </Typography>
    </CardContainer>
  )
}

export default TransactionDetailCard
