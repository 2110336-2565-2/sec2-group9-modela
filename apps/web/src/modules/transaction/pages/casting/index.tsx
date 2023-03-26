import { UserType } from '@modela/dtos'
import withGuard from 'common/hoc/withGuard'
import useNavbarFocus from 'common/hooks/useNavbarFocus'
import PendingCastingCard from 'modules/transaction/components/PendingCastingCard'

import usePendingList from './hooks/usePendingList'

const PendingCastingTransaction = () => {
  useNavbarFocus('transaction')
  const { pendingTransaction } = usePendingList()

  return (
    <div style={{ margin: '24px', width: '100%' }}>
      <div
        style={{
          display: 'flex',
          gap: '16px',
          margin: 'auto',
          alignItems: 'center',
          flexDirection: 'column',
        }}
      >
        {pendingTransaction.map((tx) => (
          <PendingCastingCard key={`${tx.jobId} ${tx.castingId}`} {...tx} />
        ))}
      </div>
    </div>
  )
}

export default withGuard(PendingCastingTransaction, 'verified', [
  UserType.ADMIN,
])
