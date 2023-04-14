import { UserType } from '@modela/dtos'
import { ReportOutlined } from '@mui/icons-material'
import { IconButton, Tooltip } from '@mui/material'
import { useUser } from 'common/context/UserContext'
import React from 'react'

import withJobCardHeader from '../hoc/withJobCardHeader'
import { ReportHeaderProps } from './types'

const ReportHeader = (props: ReportHeaderProps) => {
  const { jobId } = props
  const { user } = useUser()

  if (user?.type !== UserType.ACTOR) return null
  return (
    <Tooltip title="แจ้งปัญหางาน">
      <IconButton
        href={`/report/${jobId}`}
        onClick={(ev) => ev.stopPropagation()}
      >
        <ReportOutlined fontSize="small" color="error" />
      </IconButton>
    </Tooltip>
  )
}
export default withJobCardHeader<ReportHeaderProps>(ReportHeader)
