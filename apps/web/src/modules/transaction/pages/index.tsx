import { UserType } from '@modela/dtos'
import MenuBar from 'common/components/MenuBar'
import withGuard from 'common/hoc/withGuard'
import useNavbarFocus from 'common/hooks/useNavbarFocus'
import React from 'react'

import TransactionCard from '../components/transactionCard'
import { MENU_ITEM } from './const'
import { JobCardContainer, PageContainer } from './styled'

const TransactionPage = () => {
  useNavbarFocus('transaction')

  return (
    <PageContainer>
      <MenuBar menu={MENU_ITEM} focus="โอนเงินให้นักแสดง" />
      <JobCardContainer>
        <TransactionCard />
        <TransactionCard />
        <TransactionCard />
      </JobCardContainer>
    </PageContainer>
  )
}

export default withGuard(TransactionPage, 'verified', [UserType.ADMIN])
