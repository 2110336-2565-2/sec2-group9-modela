import { Button, Modal, Typography } from '@mui/material'
import useSwitch from 'common/hooks/useSwitch'
import React from 'react'
import { useCallback } from 'react'

import UserConfirmationModal from '../../UserConfirmationModal'
import UserRejectionModal from '../../UserRejectionModal'
import { FooterContainer } from './styled'
import { PendingUserCardFooterProps } from './type'

const PendingUserCardFooter = ({
  userId,
  acceptUser,
  rejectUser,
  setModalId,
  setModalReason,
}: PendingUserCardFooterProps) => {
  const {
    isOpen: isOpenAccept,
    open: openAccept,
    close: closeAccept,
  } = useSwitch()

  const handleOpenAccept = useCallback(() => {
    setModalId(userId)
    openAccept()
  }, [userId, setModalId, openAccept])

  const handleAccept = useCallback(() => {
    closeAccept()
    acceptUser()
  }, [closeAccept, acceptUser])

  const {
    isOpen: isOpenReject,
    open: openReject,
    close: closeReject,
  } = useSwitch()

  const handleOpenReject = useCallback(() => {
    setModalId(userId)
    openReject()
  }, [userId, setModalId, openReject])

  const handleReject = useCallback(() => {
    closeReject()
    rejectUser()
  }, [closeReject, rejectUser])

  return (
    <FooterContainer>
      <Button color="reject" onClick={handleOpenReject}>
        <Typography variant="button">ปฏิเสธ</Typography>
      </Button>
      <Modal open={isOpenReject} onClose={closeReject}>
        <UserRejectionModal setReason={setModalReason} reject={handleReject} />
      </Modal>
      <Button color="success" onClick={handleOpenAccept}>
        <Typography variant="button">อนุมัติ</Typography>
      </Button>
      <Modal open={isOpenAccept} onClose={closeAccept}>
        <UserConfirmationModal
          userId={userId}
          close={closeAccept}
          confirm={handleAccept}
        />
      </Modal>
    </FooterContainer>
  )
}

export default PendingUserCardFooter
