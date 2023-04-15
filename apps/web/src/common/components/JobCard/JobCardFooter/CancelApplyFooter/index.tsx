import { ApplicationStatus, JobStatus } from '@modela/dtos'
import { Button, Modal } from '@mui/material'
import useSwitch from 'common/hooks/useSwitch'
import React, { MouseEvent } from 'react'

import CancelAppliedModal from './CancelAppliedModal'
import { CancelApplyFooterProps } from './types'

const CancelApplyFooter = ({
  jobId,
  status,
  appliedStatus,
}: CancelApplyFooterProps) => {
  const modal = useSwitch()
  if (status !== JobStatus.OPEN || appliedStatus !== ApplicationStatus.PENDING)
    return null

  const handleCancel = (e: MouseEvent) => {
    e.stopPropagation()
    e.preventDefault()
    modal.open()
  }

  return (
    <>
      <Button
        color="reject"
        sx={{ cursor: 'pointer', marginLeft: 'auto' }}
        onClick={handleCancel}
      >
        ยกเลิกสมัครงาน
      </Button>
      {modal.isOpen && (
        <Modal open={modal.isOpen}>
          <CancelAppliedModal jobId={jobId} close={modal.close} />
        </Modal>
      )}
    </>
  )
}

export default CancelApplyFooter
