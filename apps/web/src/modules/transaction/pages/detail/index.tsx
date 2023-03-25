import { UserType } from '@modela/dtos'
import { Typography } from '@mui/material'
import MenuBar from 'common/components/MenuBar'
import withGuard from 'common/hoc/withGuard'
import useNavbarFocus from 'common/hooks/useNavbarFocus'
import TransactionDetailCard from 'modules/transaction/components/transactionDetailCard'
import React from 'react'

import { MENU_ITEM } from '../const'
import { JobCardContainer, PageContainer } from '../styled'
import { useTransactionDetail } from './hooks/useTransactionDetail'

const TransactionDetailPage = () => {
  useNavbarFocus('transaction')
  const { transactionDetail } = useTransactionDetail()

  return (
    <PageContainer>
      <MenuBar menu={MENU_ITEM} focus="โอนเงินให้นักแสดง" />
      <JobCardContainer>
        <Typography variant="h6">งาน: {transactionDetail?.title}</Typography>
        {transactionDetail &&
          transactionDetail.actorList.map((actor) => (
            <TransactionDetailCard {...actor} />
          ))}
      </JobCardContainer>
    </PageContainer>
  )
}

export default withGuard(TransactionDetailPage, 'verified', [UserType.ADMIN])
