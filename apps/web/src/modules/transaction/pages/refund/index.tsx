import { UserType } from '@modela/dtos'
import { Typography } from '@mui/material'
import Modal from 'common/components/Modal'
import withGuard from 'common/hoc/withGuard'
import TransactionLayout from 'modules/transaction/components/TransactionLayout'

import PendingModalBody from './components/PendingModalBody'
import PendingRefundCard from './components/PendingRefundCard'
import usePendingRefundList from './hooks/usePendingRefundList'
import { CardContainer } from './styled'

const PendingRefundPages = () => {
  const {
    pendingRefunds,
    refundModalDetails,
    isOpen,
    handleClickFinish,
    handleClickReject,
    handleCloseModal,
    handleConfirmModal,
  } = usePendingRefundList()

  return (
    <>
      <TransactionLayout focus="ผู้กำกับโอนเงินเข้า">
        <CardContainer>
          {pendingRefunds.map((tx) => (
            <PendingRefundCard
              handleClickFinish={handleClickFinish}
              handleClickReject={handleClickReject}
              key={`${tx.jobId} ${tx.actor.actorId}`}
              {...tx}
            />
          ))}
          {pendingRefunds.length === 0 && (
            <Typography
              variant="subtitle1"
              sx={{
                width: '100%',
                textAlign: 'center',
                color: 'rgba(0, 0, 0, 0.38)',
                paddingBottom: '12px',
              }}
            >
              ไม่มีรายการขอคืนเงิน
            </Typography>
          )}
        </CardContainer>
      </TransactionLayout>
      <Modal open={isOpen} contentSx={{ maxWidth: '500px' }}>
        <PendingModalBody
          modalType={refundModalDetails?.modalType || 'accept'}
          handleCancel={handleCloseModal}
          handleConfirm={handleConfirmModal}
        />
      </Modal>
    </>
  )
}

export default withGuard(PendingRefundPages, 'verified', [UserType.ADMIN])
