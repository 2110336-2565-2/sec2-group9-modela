import { UserType } from '@modela/dtos'
import { Typography } from '@mui/material'
import MenuBar from 'common/components/MenuBar'
import withGuard from 'common/hoc/withGuard'
import useNavbarFocus from 'common/hooks/useNavbarFocus'
import React from 'react'

import TransactionCard from '../components/transactionCard'
import { MENU_ITEM } from './const'
import { useTransaction } from './hooks/useTransaction'
import { JobCardContainer, PageContainer, SideDiv } from './styled'

const TransactionPage = () => {
  useNavbarFocus('transaction')
  const { transactionData } = useTransaction()

  return (
    <PageContainer>
      <MenuBar
        menu={MENU_ITEM}
        sx={{ width: '17vw' }}
        focus="โอนเงินให้นักแสดง"
      />
      <JobCardContainer>
        {transactionData &&
          transactionData.map((transaction) => (
            <TransactionCard key={transaction.jobId} {...transaction} />
          ))}
        {transactionData && transactionData.length === 0 && (
          <Typography>ไม่มีรายการโอนเงินที่ค้างอยู่</Typography>
        )}
      </JobCardContainer>
      <SideDiv />
    </PageContainer>
  )
}

export default withGuard(TransactionPage, 'verified', [UserType.ADMIN])