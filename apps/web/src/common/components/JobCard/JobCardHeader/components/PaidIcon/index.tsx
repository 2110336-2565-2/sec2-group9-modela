import { JobStatus } from '@modela/dtos'
import { AttachMoneyOutlined, MoneyOffOutlined } from '@mui/icons-material'
import { Tooltip } from '@mui/material'
import React from 'react'

import { PaidIconProps } from './types'

const PaidIcon = ({ isPaid, status }: PaidIconProps) => {
  if (status !== JobStatus.SELECTION_ENDED) return null

  return (
    <div style={{ padding: '8px' }}>
      {isPaid ? (
        <Tooltip title="งานนี้จ่ายเงินแล้ว">
          <AttachMoneyOutlined fontSize="small" color="success" />
        </Tooltip>
      ) : (
        <Tooltip title="งานนี้ยังไม่จ่ายเงิน">
          <MoneyOffOutlined fontSize="small" color="error" />
        </Tooltip>
      )}
    </div>
  )
}

export default PaidIcon
