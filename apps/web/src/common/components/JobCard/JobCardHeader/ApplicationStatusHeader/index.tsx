import { ApplicationStatus } from '@modela/dtos'
import Chip from 'common/components/Chip'
import { CHIP_VARIANTS } from 'common/constants/ApplicationStatusChip'
import React from 'react'

import PaidIcon from '../components/PaidIcon'
import withJobCardHeader from '../hoc/withJobCardHeader'
import { ApplicationStatusHeaderProps } from './types'

const ApplicationStatusHeader = (props: ApplicationStatusHeaderProps) => {
  const { appliedStatus, status, isPaid } = props

  return (
    <>
      {appliedStatus === ApplicationStatus.OFFER_ACCEPTED && (
        <PaidIcon status={status} isPaid={isPaid} />
      )}
      <Chip {...CHIP_VARIANTS[appliedStatus!]} />
    </>
  )
}

export default withJobCardHeader<ApplicationStatusHeaderProps>(
  ApplicationStatusHeader,
)
