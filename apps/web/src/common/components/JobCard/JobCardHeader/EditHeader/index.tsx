import { JobStatus } from '@modela/database'
import { EditOutlined } from '@mui/icons-material'
import { IconButton, Tooltip } from '@mui/material'
import React from 'react'

import PaidIcon from '../components/PaidIcon'
import withJobCardHeader from '../hoc/withJobCardHeader'
import { EditHeaderProps } from './types'

const EditHeader = (props: EditHeaderProps) => {
  const { jobId, status, isPaid } = props

  if (status !== JobStatus.OPEN) return null

  return (
    <>
      <PaidIcon status={status} isPaid={isPaid} />
      <Tooltip title="แก้ไขงาน">
        <IconButton
          href={`/job/${jobId}/edit`}
          onClick={(ev) => ev.stopPropagation()}
        >
          <EditOutlined fontSize="small" color="primary" />
        </IconButton>
      </Tooltip>
    </>
  )
}

export default withJobCardHeader<EditHeaderProps>(EditHeader)
