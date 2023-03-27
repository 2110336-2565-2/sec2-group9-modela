import { UserType } from '@modela/dtos'
import { Typography } from '@mui/material'
import withGuard from 'common/hoc/withGuard'
import TransactionLayout from 'modules/transaction/components/TransactionLayout'
import React from 'react'

import TransactionDetailCard from './components/transactionDetailCard'
import { useTransactionDetail } from './hooks/useTransactionDetail'

const TransactionDetailPage = () => {
  const { transactionDetail, markAccepted } = useTransactionDetail()

  return (
    <TransactionLayout focus="โอนเงินให้นักแสดง">
      <Typography variant="h6" sx={{ marginBottom: '1rem' }}>
        งาน: {transactionDetail?.title}
      </Typography>
      {transactionDetail &&
        transactionDetail.actorList.map((actor) => (
          <TransactionDetailCard
            key={actor.actorId}
            data={actor}
            markAccepted={markAccepted}
          />
        ))}
    </TransactionLayout>
  )
}

export default withGuard(TransactionDetailPage, 'verified', [UserType.ADMIN])
