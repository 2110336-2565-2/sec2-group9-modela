/* eslint-disable react-hooks/exhaustive-deps */
import useSwitch from 'common/hooks/useSwitch'
import { useCallback } from 'react'

const useModalData = () => {
  const {
    isOpen: isAcceptModalOpen,
    close: closeAcceptModal,
    open: openAcceptModal,
  } = useSwitch()
  const {
    isOpen: isRejectModalOpen,
    close: closeRejecttModal,
    open: openRejectModal,
  } = useSwitch()

  const handleAcceptModalOpen = useCallback(() => {
    openAcceptModal()
  }, [openAcceptModal])

  const handleAcceptCloseModal = useCallback(() => {
    closeAcceptModal()
  }, [closeAcceptModal])

  const handleAcceptModalSubmit = useCallback(async () => {
    console.log('Accept')
  }, [])

  const handleRejectModalOpen = useCallback(() => {
    openRejectModal()
  }, [openRejectModal])

  const handleRejectCloseModal = useCallback(() => {
    closeRejecttModal()
  }, [closeRejecttModal])

  const handleRejectModalSubmit = useCallback(async () => {
    console.log('Reject')
  }, [])

  return {
    isAcceptModalOpen,
    isRejectModalOpen,
    handleAcceptCloseModal,
    handleAcceptModalOpen,
    handleAcceptModalSubmit,
    handleRejectCloseModal,
    handleRejectModalOpen,
    handleRejectModalSubmit,
  }
}

export default useModalData
