import { UserType } from '@modela/dtos'
import { Typography } from '@mui/material'
import MenuBar from 'common/components/MenuBar'
import withGuard from 'common/hoc/withGuard'
import useNavbarFocus from 'common/hooks/useNavbarFocus'
import React from 'react'

import { MENU_ITEM } from '../const'
import { JobCardContainer, PageContainer, SideDiv } from '../styled'
import TransactionDetailCard from './components/transactionDetailCard'
import { useTransactionDetail } from './hooks/useTransactionDetail'

const TransactionDetailPage = () => {
  useNavbarFocus('transaction')
  const { transactionDetail, markAccepted } = useTransactionDetail()

  return (
    <PageContainer>
      <MenuBar
        menu={MENU_ITEM}
        sx={{ width: '17vw' }}
        focus="โอนเงินให้นักแสดง"
      />
      <JobCardContainer>
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
      </JobCardContainer>
      <SideDiv />
    </PageContainer>
  )
}

export default withGuard(TransactionDetailPage, 'verified', [UserType.ADMIN])
