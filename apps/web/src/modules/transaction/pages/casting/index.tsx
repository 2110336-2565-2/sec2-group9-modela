import { UserType } from '@modela/dtos'
import withGuard from 'common/hoc/withGuard'
import PendingCastingCard from 'modules/transaction/components/PendingCastingCard'
import TransactionLayout from 'modules/transaction/components/TransactionLayout'

import usePendingList from './hooks/usePendingList'
import { CardContainer } from './styled'

const PendingCastingTransaction = () => {
  const { pendingTransaction } = usePendingList()

  return (
    <TransactionLayout focus="ผู้กำกับโอนเงินเข้า">
      <CardContainer>
        {pendingTransaction.map((tx) => (
          <PendingCastingCard key={`${tx.jobId} ${tx.castingId}`} {...tx} />
        ))}
      </CardContainer>
    </TransactionLayout>
  )
}

export default withGuard(PendingCastingTransaction, 'verified', [
  UserType.ADMIN,
])
