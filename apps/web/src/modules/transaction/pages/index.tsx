import { UserType } from '@modela/dtos'
import MenuBar from 'common/components/MenuBar'
import withGuard from 'common/hoc/withGuard'
import useNavbarFocus from 'common/hooks/useNavbarFocus'
import React from 'react'

import TransactionCard from '../components/transactionCard'
import { MENU_ITEM } from './const'
import { useTransaction } from './hooks/useTransaction'
import { JobCardContainer, PageContainer } from './styled'

const TransactionPage = () => {
  useNavbarFocus('transaction')
  const { transactionData } = useTransaction()
  console.log(transactionData)

  return (
    <PageContainer>
      <MenuBar menu={MENU_ITEM} focus="โอนเงินให้นักแสดง" />
      <JobCardContainer>
        {transactionData &&
          transactionData.map((transaction) => (
            <TransactionCard {...transaction} />
          ))}
      </JobCardContainer>
    </PageContainer>
  )
}

export default withGuard(TransactionPage, 'verified', [UserType.ADMIN])
