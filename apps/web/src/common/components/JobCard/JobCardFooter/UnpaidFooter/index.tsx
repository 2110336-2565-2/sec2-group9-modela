import Button from '@mui/material/Button/Button'
import React from 'react'

import withJobCardFooter from '../hoc/withJobCardFooter'
import { UnpaidFooterProps } from './types'

const UnpaidFooter = ({ jobId }: UnpaidFooterProps) => {
  return (
    <Button
      href={'/job/' + jobId + '/send-proof'}
      color="success"
      sx={{ cursor: 'pointer', marginLeft: 'auto' }}
      onClick={(e) => {
        e.stopPropagation()
      }}
    >
      ส่งหลักฐานการโอนเงิน
    </Button>
  )
}

export default withJobCardFooter<UnpaidFooterProps>(UnpaidFooter)
