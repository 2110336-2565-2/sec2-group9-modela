import { ApplicationStatus } from '@modela/dtos'
import { Button, Typography } from '@mui/material'
import { useErrorHandler } from 'common/hooks/useErrorHandler'
import useSwitch from 'common/hooks/useSwitch'
import { apiClient } from 'common/utils/api'
import AcceptOfferModal from 'modules/notification/components/AcceptOfferModal'
import RejectOfferModal from 'modules/notification/components/RejectOfferModal'
import React, { useCallback } from 'react'

import { JobOfferActions } from './styled'
import { OfferActionProps } from './types'

const OfferAction = ({ appliedStatus, title, jobId }: OfferActionProps) => {
  const rejectModal = useSwitch()
  const acceptModal = useSwitch()
  const { handleError } = useErrorHandler()

  const handleAccept = useCallback(async () => {
    try {
      await apiClient.put<string>(`/jobs/${jobId}/offer/accept`)
      window.location.reload()
    } catch (err) {
      handleError(err)
    }
    acceptModal.close()
  }, [acceptModal, jobId, handleError])

  const handleReject = useCallback(async () => {
    try {
      await apiClient.put<string>(`/jobs/${jobId}/offer/reject`)
      window.location.reload()
    } catch (err) {
      handleError(err)
    }
    rejectModal.close()
  }, [jobId, handleError, rejectModal])
  if (appliedStatus !== ApplicationStatus.OFFER_SENT) return null

  return (
    <>
      <JobOfferActions>
        <Button
          color="reject"
          onClick={(e) => {
            e.stopPropagation()
            e.preventDefault()
            rejectModal.open()
          }}
        >
          <Typography variant="button">ปฏิเสธข้อเสนอ</Typography>
        </Button>
        <Button
          color="success"
          onClick={(e) => {
            e.stopPropagation()
            e.preventDefault()
            acceptModal.open()
          }}
        >
          <Typography variant="button">ยอมรับข้อเสนอ</Typography>
        </Button>
      </JobOfferActions>
      {acceptModal.isOpen && (
        <AcceptOfferModal
          isOpen={true}
          title={title}
          handleClose={acceptModal.close}
          handleSubmit={handleAccept}
        />
      )}
      {rejectModal.isOpen && (
        <RejectOfferModal
          isOpen={true}
          title={title}
          handleClose={rejectModal.close}
          handleSubmit={handleReject}
        />
      )}
    </>
  )
}

export default OfferAction
