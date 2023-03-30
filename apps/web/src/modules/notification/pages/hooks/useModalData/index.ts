import { useErrorHandler } from 'common/hooks/useErrorHandler'
import useSwitch from 'common/hooks/useSwitch'
import { apiClient } from 'common/utils/api'
import { useCallback, useState } from 'react'

const useModalData = () => {
  const [focusId, setFocusId] = useState(0)
  const [title, setTitle] = useState('')
  const { handleError } = useErrorHandler()
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
    try {
      await apiClient.put<string>(`/jobs/${focusId}/offer/accept`)
    } catch (err) {
      handleError(err)
    }
    handleAcceptCloseModal()
  }, [focusId, handleAcceptCloseModal, handleError])

  const handleRejectModalOpen = useCallback(() => {
    openRejectModal()
  }, [openRejectModal])

  const handleRejectCloseModal = useCallback(() => {
    closeRejecttModal()
  }, [closeRejecttModal])

  const handleRejectModalSubmit = useCallback(async () => {
    try {
      await apiClient.put<string>(`/jobs/${focusId}/offer/reject`)
    } catch (err) {
      handleError(err)
    }
    handleRejectCloseModal()
  }, [focusId, handleError, handleRejectCloseModal])

  return {
    isAcceptModalOpen,
    isRejectModalOpen,
    handleAcceptCloseModal,
    handleAcceptModalOpen,
    handleAcceptModalSubmit,
    handleRejectCloseModal,
    handleRejectModalOpen,
    handleRejectModalSubmit,
    setFocusId,
    title,
    setTitle,
  }
}

export default useModalData
