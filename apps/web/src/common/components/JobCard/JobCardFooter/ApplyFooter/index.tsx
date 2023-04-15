import { JobStatus } from '@modela/dtos'
import { Button } from '@mui/material'
import React from 'react'

import withJobCardFooter from '../hoc/withJobCardFooter'
import { ApplyFooterProps } from './types'

const ApplyFooter = ({ jobId, isApplied, status }: ApplyFooterProps) => {
  if (status !== JobStatus.OPEN || isApplied) return null

  return (
    <Button
      href={`/job/${jobId}/apply`}
      color="primary"
      sx={{ cursor: 'pointer', marginLeft: 'auto' }}
      onClick={(e) => e.stopPropagation()}
    >
      สมัครงาน
    </Button>
  )
}

export default withJobCardFooter<ApplyFooterProps>(ApplyFooter)
