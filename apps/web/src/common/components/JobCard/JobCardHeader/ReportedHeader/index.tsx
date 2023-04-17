import Chip from 'common/components/Chip'
import React from 'react'

import withJobCardHeader from '../hoc/withJobCardHeader'
import { ReportedHeaderProps } from './types'

const ReportedHeader = (props: ReportedHeaderProps) => {
  const { isReported } = props

  if (!isReported) return null

  return <Chip label="ถูกแจ้งปัญหา" variant="red" />
}

export default withJobCardHeader<ReportedHeaderProps>(ReportedHeader)
