import { UserType } from '@modela/dtos'
import { Typography } from '@mui/material'
import Modal from 'common/components/Modal'
import withGuard from 'common/hoc/withGuard'
import TransactionLayout from 'modules/transaction/components/TransactionLayout'

import ConfirmModalBody from './components/ConfirmModalBody'
import PendingCastingCard from './components/PendingCastingCard'
import usePendingList from './hooks/usePendingList'
import { CardContainer } from './styled'

const PendingCastingTransaction = () => {
  const {
    pendingTransaction,
    jobModalDetails,
    isOpen,
    handleClickFinish,
    handleClickReject,
    handleCloseModal,
    handleConfirmModal,
  } = usePendingList()

  return (
    <>
      <TransactionLayout focus="ผู้กำกับโอนเงินเข้า">
        <CardContainer>
          {pendingTransaction.map((tx) => (
            <PendingCastingCard
              handleClickFinish={handleClickFinish}
              handleClickReject={handleClickReject}
              key={`${tx.jobId} ${tx.castingId}`}
              {...tx}
            />
          ))}
          {pendingTransaction.length === 0 && (
            <Typography
              variant="subtitle1"
              sx={{
                width: '100%',
                textAlign: 'center',
                color: 'rgba(0, 0, 0, 0.38)',
                paddingBottom: '12px',
              }}
            >
              ไม่มีรายการโอนเงิน
            </Typography>
          )}
        </CardContainer>
      </TransactionLayout>
      <Modal open={isOpen} contentSx={{ maxWidth: '500px' }}>
        <ConfirmModalBody
          modalType={jobModalDetails?.modalType || 'accept'}
          handleCancel={handleCloseModal}
          handleConfirm={handleConfirmModal}
        />
      </Modal>
    </>
  )
}

export default withGuard(PendingCastingTransaction, 'verified', [
  UserType.ADMIN,
])
