import Chip from 'common/components/Chip'

import {
  APPLICATION_COLOR,
  APPLICATION_LABEL,
  APPLICATION_OUTLINE,
} from './constants'
import { ApplicationStatusChipProps } from './types'

export default function ApplicationStatusChip(
  props: ApplicationStatusChipProps,
) {
  const { applicationStatus } = props
  return (
    <Chip
      label={APPLICATION_LABEL[applicationStatus]}
      variant={APPLICATION_COLOR[applicationStatus]}
      outlined={APPLICATION_OUTLINE[applicationStatus]}
    />
  )
}
