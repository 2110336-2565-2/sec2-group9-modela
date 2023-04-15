import Chip from 'common/components/Chip'
import { CHIP_VARIANTS } from 'common/constants/ApplicationStatusChip'
import React from 'react'

import withJobCardHeader from '../hoc/withJobCardHeader'
import { ApplicationStatusHeaderProps } from './types'

const ApplicationStatusHeader = (props: ApplicationStatusHeaderProps) => {
  const { appliedStatus } = props

  return <Chip {...CHIP_VARIANTS[appliedStatus!]} />
}

export default withJobCardHeader<ApplicationStatusHeaderProps>(
  ApplicationStatusHeader,
)
