import { UserType } from '@modela/dtos'
import { Typography } from '@mui/material'
import withGuard from 'common/hoc/withGuard'
import React from 'react'

import TransactionCard from '../components/transactionCard'
import TransactionLayout from '../components/TransactionLayout'
import { useTransaction } from './hooks/useTransaction'

const TransactionPage = () => {
  const { transactionData } = useTransaction()

  return (
    <TransactionLayout focus="โอนเงินให้นักแสดง">
      {transactionData &&
        transactionData.map((transaction) => (
          <TransactionCard key={transaction.jobId} {...transaction} />
        ))}
      {transactionData && transactionData.length === 0 && (
        <Typography>ไม่มีรายการโอนเงินที่ค้างอยู่</Typography>
      )}
    </TransactionLayout>
  )
}

export default withGuard(TransactionPage, 'verified', [UserType.ADMIN])
